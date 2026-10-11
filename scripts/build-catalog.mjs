// content/ klasöründeki Markdown dosyalarından catalog.json üretir.
//
//   content/series/<seri-id>.md      → seri bilgileri (frontmatter)
//   content/chapters/<seri-id>-<n>.md → bölümler (frontmatter + metin)
//
// Kullanım: npm run build
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CONTENT = path.join(ROOT, "content");
const DEFAULT_COLORS = ["#3d405b", "#f2cc8f"];

const errors = [];
const warn = (msg) => console.warn("⚠ " + msg);

async function readMarkdownDir(dir) {
  let files = [];
  try { files = (await readdir(dir)).filter((f) => f.endsWith(".md")).sort(); }
  catch { return []; }
  return Promise.all(files.map(async (file) => {
    const raw = (await readFile(path.join(dir, file), "utf8")).replace(/^﻿/, "").replace(/\r\n/g, "\n");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) { errors.push(`${file}: dosya '---' ile başlayan bir frontmatter bloğu içermiyor`); return null; }
    try {
      return { file, data: yaml.load(m[1]) || {}, body: m[2].trim() };
    } catch (e) {
      errors.push(`${file}: frontmatter okunamadı (${e.reason || e.message})`);
      return null;
    }
  })).then((list) => list.filter(Boolean));
}

// Metni paragraflara böler. "***" veya "* * *" tek başına satırda sahne geçişidir.
function toParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map((p) => (/^(\*\s*){3,}$|^-{3,}$/.test(p) ? "***" : p));
}

const seriesFiles = await readMarkdownDir(path.join(CONTENT, "series"));
const chapterFiles = await readMarkdownDir(path.join(CONTENT, "chapters"));

const series = new Map();
for (const { file, data } of seriesFiles) {
  const id = file.replace(/\.md$/, "");
  if (!data.title) { errors.push(`${file}: 'title' alanı eksik`); continue; }
  const type = data.type === "manga" ? "manga" : "novel";
  series.set(id, {
    id,
    type,
    title: String(data.title),
    author: String(data.author || "Bilinmeyen yazar"),
    genres: [].concat(data.genres || []).map(String),
    status: String(data.status || "Devam ediyor"),
    year: Number(data.year) || new Date().getFullYear(),
    palette: [data.color || DEFAULT_COLORS[0], data.accent || DEFAULT_COLORS[1]],
    cover: data.cover || null,
    synopsis: String(data.synopsis || ""),
    chapters: []
  });
}

for (const { file, data, body } of chapterFiles) {
  if (data.draft) continue;
  const s = series.get(String(data.series || ""));
  if (!s) { errors.push(`${file}: 'series' alanı (${data.series}) content/series içinde bulunamadı`); continue; }
  const number = Number(data.number);
  if (!Number.isFinite(number)) { errors.push(`${file}: 'number' alanı bir sayı olmalı`); continue; }
  const chapter = { number, title: String(data.title || `Bölüm ${number}`) };
  if (s.type === "manga") {
    chapter.images = [].concat(data.pages || []).map((p) => (typeof p === "string" ? p : p && p.image)).filter(Boolean);
    if (!chapter.images.length) { warn(`${file}: manga bölümünde hiç sayfa görseli yok, atlandı`); continue; }
  } else {
    chapter.paragraphs = toParagraphs(body);
    if (!chapter.paragraphs.length) { warn(`${file}: bölüm metni boş, atlandı`); continue; }
  }
  s.chapters.push(chapter);
}

const catalog = [];
for (const s of series.values()) {
  s.chapters.sort((a, b) => a.number - b.number);
  const dup = s.chapters.find((c, i) => i && c.number === s.chapters[i - 1].number);
  if (dup) errors.push(`${s.id}: ${dup.number} numaralı bölüm birden fazla dosyada var`);
  if (!s.chapters.length) { warn(`${s.id}: yayınlanmış bölümü yok, sitede gösterilmeyecek`); continue; }
  catalog.push(s);
}

if (errors.length) {
  console.error("Katalog oluşturulamadı:\n" + errors.map((e) => "  ✗ " + e).join("\n"));
  process.exit(1);
}

await writeFile(path.join(ROOT, "catalog.json"), JSON.stringify(catalog));
const total = catalog.reduce((n, s) => n + s.chapters.length, 0);
console.log(`✓ catalog.json: ${catalog.length} seri, ${total} bölüm`);
