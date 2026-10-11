(() => {
  "use strict";

  // Demo mangalar (data.js) + content/ klasöründen üretilen catalog.json
  const CATALOG = (window.CATALOG || []).slice();
  const app = document.getElementById("app");
  const searchInput = document.getElementById("search");

  // ---------- Storage (her şey bu tarayıcıda saklanır) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("kitaplik:" + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("kitaplik:" + key, JSON.stringify(value)); } catch { /* yok say */ }
    }
  };
  const state = {
    q: "",
    type: "all",
    genre: null,
    favs: new Set(store.get("favs", [])),
    progress: store.get("progress", {}),   // { seriesId: { ch, pos, t } }
    read: store.get("read", {}),           // { seriesId: [chapterIndex, ...] }
    novel: Object.assign({ fs: 19, lh: 1.8, font: "serif", paper: "auto" }, store.get("novel", {})),
    manga: Object.assign({ mode: "vertical", dir: "rtl", width: 760 }, store.get("manga", {}))
  };
  const saveProgress = () => store.set("progress", state.progress);
  const saveRead = () => store.set("read", state.read);

  // ---------- Helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (id) => CATALOG.find((s) => s.id === id);
  const typeLabel = (t) => (t === "manga" ? "Manga" : "Novel");
  const unitLabel = (s) => (s.type === "manga" ? "Bölüm" : "Bölüm");
  const allGenres = () => [...new Set(CATALOG.flatMap((s) => s.genres))].sort((a, b) => a.localeCompare(b, "tr"));
  const norm = (s) => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Novel metni için küçük biçimlendirme: **kalın**, *italik*, _italik_
  const inline = (t) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/(^|[\s(])_(?!\s)(.+?)_(?=[\s.,;:!?)]|$)/g, "$1<em>$2</em>");

  const chapterText = (c) => (c.html != null ? c.html.replace(/<[^>]+>/g, " ") : c.paragraphs.join(" "));

  // catalog.json'dan gelen seriyi eksik alanlara karşı tamamla
  function normalize(s) {
    const type = s.type === "manga" ? "manga" : "novel";
    const chapters = (s.chapters || []).filter((c) => (type === "manga" ? c.images && c.images.length : c.html || c.paragraphs));
    return {
      id: String(s.id), type, title: String(s.title || s.id), author: String(s.author || "Bilinmeyen yazar"),
      genres: [].concat(s.genres || []).map(String), status: s.status || "Devam ediyor",
      year: s.year || new Date().getFullYear(),
      palette: [(s.palette && s.palette[0]) || "#3d405b", (s.palette && s.palette[1]) || "#f2cc8f"],
      cover: s.cover || null, synopsis: s.synopsis || "",
      chapters: chapters.map((c) => ({ ...c, title: c.title || `Bölüm ${c.number}`, images: c.images && c.images.map((i) => (typeof i === "string" ? i : i.image)) }))
    };
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    let a = seed || 1;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function wrap(text, maxChars) {
    const words = text.split(/\s+/); const lines = []; let line = "";
    for (const w of words) {
      if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; }
      else line = (line + " " + w).trim();
    }
    if (line) lines.push(line);
    return lines;
  }
  function readPct(s) {
    const r = state.read[s.id] || [];
    return Math.round((r.length / s.chapters.length) * 100);
  }
  function markRead(s, i) {
    const r = new Set(state.read[s.id] || []);
    if (!r.has(i)) { r.add(i); state.read[s.id] = [...r].sort((a, b) => a - b); saveRead(); }
  }

  // ---------- Generated art ----------
  function coverSVG(s) {
    const [c1, c2] = s.palette;
    const r = rng(hash(s.id));
    const gid = "g" + hash(s.id).toString(36);
    let shapes = "";
    for (let i = 0; i < 7; i++) {
      const cx = r() * 300, cy = r() * 450, rad = 30 + r() * 120;
      shapes += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${c2}" opacity="${(0.06 + r() * 0.14).toFixed(2)}"/>`;
    }
    for (let i = 0; i < 14; i++) {
      const y = 40 + i * 30;
      shapes += `<line x1="0" y1="${y}" x2="300" y2="${y - 60}" stroke="${c2}" stroke-width="1" opacity=".08"/>`;
    }
    const lines = wrap(s.title.toLocaleUpperCase("tr"), 11).slice(0, 3);
    const fs = lines.some((l) => l.length > 9) ? 34 : 40;
    const startY = 330 - (lines.length - 1) * fs * 1.05;
    const title = lines.map((l, i) => `<text x="22" y="${(startY + i * fs * 1.05).toFixed(0)}" font-size="${fs}" font-weight="800" fill="${c2}" font-family="Inter, sans-serif" letter-spacing="-1">${esc(l)}</text>`).join("");
    return `<svg viewBox="0 0 300 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(s.title)} kapağı" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c1}" stop-opacity=".78"/></linearGradient></defs>
      <rect width="300" height="450" fill="#111"/><rect width="300" height="450" fill="url(#${gid})"/>${shapes}
      <rect x="22" y="22" width="34" height="4" fill="${c2}"/>
      <text x="22" y="48" font-size="12" font-weight="700" letter-spacing="2" fill="${c2}" font-family="Inter, sans-serif" opacity=".85">${typeLabel(s.type).toUpperCase()}</text>
      ${title}
      <text x="22" y="420" font-size="13" fill="${c2}" font-family="Inter, sans-serif" opacity=".8">${esc(s.author)}</text>
    </svg>`;
  }

  // Seride kapak görseli varsa onu, yoksa üretilen kapağı kullan
  const coverArt = (s) => (s.cover ? `<img src="${esc(s.cover)}" alt="${esc(s.title)} kapağı" loading="lazy">` : coverSVG(s));

  // Basit, özgün manga sayfası çizimi: paneller + sahne + konuşma balonu
  function scene(kind, x, y, w, h, r) {
    const ink = "#151515";
    let g = "";
    const line = (x1, y1, x2, y2, sw = 1.5, op = 1) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${ink}" stroke-width="${sw}" opacity="${op}"/>`;
    switch (kind) {
      case "night": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a2a2e"/>`;
        for (let i = 0; i < 30; i++) g += `<circle cx="${(x + r() * w).toFixed(1)}" cy="${(y + r() * h * 0.6).toFixed(1)}" r="${(0.8 + r() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
        g += `<circle cx="${x + w * 0.78}" cy="${y + h * 0.28}" r="${Math.min(w, h) * 0.13}" fill="#f4f1e8"/>`;
        let bx = x;
        while (bx < x + w) { const bw = 30 + r() * 60, bh = h * (0.18 + r() * 0.3); g += `<rect x="${bx.toFixed(1)}" y="${(y + h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="#0c0c0e"/>`; bx += bw - 2; }
        break;
      }
      case "city": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e9e9e6"/>`;
        let bx = x - 10;
        while (bx < x + w) {
          const bw = 50 + r() * 70, bh = h * (0.35 + r() * 0.45), by = y + h - bh;
          g += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="#fff" stroke="${ink}" stroke-width="2"/>`;
          for (let wy = by + 12; wy < y + h - 14; wy += 22) for (let wx = bx + 10; wx < bx + bw - 14; wx += 18) if (r() > 0.25) g += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="9" height="12" fill="${r() > 0.6 ? "#555" : "#ccc"}"/>`;
          bx += bw + 6;
        }
        break;
      }
      case "forest": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#dcdcd6"/>`;
        for (let i = 0; i < 14; i++) {
          const tx = x + r() * w, base = y + h * (0.55 + r() * 0.5), th = h * (0.35 + r() * 0.5), tw = 30 + r() * 50;
          const shade = ["#2b2b2b", "#555", "#888"][Math.floor(r() * 3)];
          g += `<path d="M${tx.toFixed(1)} ${(base - th).toFixed(1)} L${(tx - tw / 2).toFixed(1)} ${base.toFixed(1)} L${(tx + tw / 2).toFixed(1)} ${base.toFixed(1)}Z" fill="${shade}"/>`;
        }
        break;
      }
      case "sea": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2f2f0"/>`;
        const hz = y + h * 0.42;
        g += `<rect x="${x}" y="${hz}" width="${w}" height="${y + h - hz}" fill="#cfd3d6"/>`;
        for (let wy = hz + 14; wy < y + h; wy += 16) {
          let d = `M${x} ${wy}`;
          for (let wx = x; wx < x + w + 30; wx += 30) d += ` q 7.5 -6 15 0 t 15 0`;
          g += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="1.3" opacity="${(0.25 + (wy - hz) / h).toFixed(2)}"/>`;
        }
        g += `<circle cx="${x + w * 0.25}" cy="${hz - 2}" r="${h * 0.12}" fill="none" stroke="${ink}" stroke-width="2"/>`;
        break;
      }
      case "room": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f7f7f5"/>`;
        const floor = y + h * 0.72;
        g += line(x, floor, x + w, floor, 2);
        for (let i = 1; i < 8; i++) g += line(x + (w / 8) * i, floor, x + (w / 8) * i - (i - 4) * 30, y + h, 1, 0.4);
        const wx = x + w * 0.55, wy = y + h * 0.12, ww = w * 0.3, wh = h * 0.38;
        g += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#e2e4e6" stroke="${ink}" stroke-width="2.5"/>`;
        g += line(wx + ww / 2, wy, wx + ww / 2, wy + wh, 2) + line(wx, wy + wh / 2, wx + ww, wy + wh / 2, 2);
        for (let i = 0; i < 40; i++) { const sx = x + r() * w * 0.45; g += line(sx, y + r() * h * 0.6, sx + 6, y + r() * h * 0.6 + 6, 0.8, 0.25); }
        break;
      }
      case "sky": {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fafafa"/>`;
        const cx = x + w / 2, cy = y + h / 2;
        for (let i = 0; i < 70; i++) {
          const a = r() * Math.PI * 2, r1 = Math.max(w, h) * (0.32 + r() * 0.15), r2 = Math.max(w, h);
          g += line(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, 0.6 + r() * 1.4, 0.55);
        }
        for (let i = 0; i < 3; i++) g += `<ellipse cx="${(x + r() * w).toFixed(1)}" cy="${(y + h * (0.15 + r() * 0.3)).toFixed(1)}" rx="${(40 + r() * 50).toFixed(1)}" ry="${(14 + r() * 10).toFixed(1)}" fill="#fff" stroke="${ink}" stroke-width="1.5"/>`;
        break;
      }
      case "fire":
      default: {
        g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
        const cx = x + w / 2, cy = y + h / 2;
        let d = "";
        const spikes = 22;
        for (let i = 0; i <= spikes * 2; i++) {
          const a = (i / (spikes * 2)) * Math.PI * 2, rr = (i % 2 ? 0.28 : 0.5 + r() * 0.2) * Math.min(w, h);
          d += (i ? "L" : "M") + (cx + Math.cos(a) * rr).toFixed(1) + " " + (cy + Math.sin(a) * rr).toFixed(1);
        }
        g += `<path d="${d}Z" fill="#1b1b1b"/>`;
        g += `<circle cx="${cx}" cy="${cy}" r="${Math.min(w, h) * 0.2}" fill="#fff"/>`;
        for (let i = 0; i < 50; i++) {
          const a = r() * Math.PI * 2, r1 = Math.min(w, h) * 0.55, r2 = Math.max(w, h);
          g += line(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, 1 + r() * 2, 0.8);
        }
      }
    }
    return g;
  }

  function figure(x, y, w, h, r, dark) {
    // Sade, yüzsüz bir karakter silueti
    const s = Math.min(w, h) * (0.5 + r() * 0.15);
    const fx = x + w * (0.18 + r() * 0.2), fy = y + h;
    const fill = dark ? "#f2f2f2" : "#fff", stroke = "#151515";
    return `<g>
      <path d="M${fx - s * 0.32} ${fy} C${fx - s * 0.3} ${fy - s * 0.42} ${fx + s * 0.3} ${fy - s * 0.42} ${fx + s * 0.32} ${fy}Z" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      <circle cx="${fx}" cy="${fy - s * 0.58}" r="${s * 0.2}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      <path d="M${fx - s * 0.21} ${fy - s * 0.6} Q${fx} ${fy - s * 0.95} ${fx + s * 0.22} ${fy - s * 0.62} L${fx + s * 0.1} ${fy - s * 0.7} L${fx + s * 0.02} ${fy - s * 0.62} L${fx - s * 0.08} ${fy - s * 0.7}Z" fill="${stroke}"/>
    </g>`;
  }

  function bubble(p, x, y, w, h, r) {
    const fs = Math.max(18, Math.min(26, w / 18));
    if (!p.speaker) { // efekt yazısı
      const big = Math.min(w / (p.text.length * 0.62), h * 0.35, 96);
      return `<text x="${x + w / 2}" y="${y + h * 0.62}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="${big.toFixed(0)}" fill="#fff" stroke="#111" stroke-width="${(big / 12).toFixed(1)}" paint-order="stroke" transform="rotate(-8 ${x + w / 2} ${y + h / 2})">${esc(p.text)}</text>`;
    }
    const narr = p.speaker === "Anlatıcı";
    const maxW = Math.min(w * 0.62, 360);
    const lines = wrap(p.text, Math.max(10, Math.floor(maxW / (fs * 0.55))));
    const bw = Math.min(maxW, Math.max(...lines.map((l) => l.length)) * fs * 0.56 + 36);
    const bh = lines.length * fs * 1.25 + (narr ? 26 : 34);
    const bx = narr ? x + 14 : x + w - bw - 18 - r() * Math.max(0, w * 0.1);
    const by = y + 16 + r() * Math.max(0, h * 0.06);
    let out = "";
    if (narr) {
      out += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#fff" stroke="#111" stroke-width="2.5"/>`;
    } else {
      const tx = bx + bw * 0.3, ty = by + bh;
      out += `<path d="M${tx} ${ty - 6} L${tx - 26} ${ty + 30} L${tx + 22} ${ty - 6}Z" fill="#fff" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>`;
      out += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${Math.min(bh / 2, 40)}" fill="#fff" stroke="#111" stroke-width="2.5"/>`;
      out += `<rect x="${tx - 22}" y="${ty - 8}" width="40" height="6" fill="#fff"/>`;
    }
    const ty0 = by + (bh - lines.length * fs * 1.25) / 2 + fs * 0.95;
    out += lines.map((l, i) => `<text x="${bx + bw / 2}" y="${(ty0 + i * fs * 1.25).toFixed(1)}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${fs.toFixed(0)}" font-weight="${narr ? 500 : 600}" ${narr ? 'font-style="italic"' : ""} fill="#111">${esc(l)}</text>`).join("");
    return out;
  }

  function mangaPageSVG(s, chIndex, pIndex, panels) {
    const W = 800, H = 1160, M = 28, G = 16;
    const r = rng(hash(`${s.id}-${chIndex}-${pIndex}`));
    const iw = W - M * 2, ih = H - M * 2;
    let rects;
    if (panels.length === 1) rects = [[M, M, iw, ih]];
    else if (panels.length === 2) { const h1 = ih * (0.42 + r() * 0.12); rects = [[M, M, iw, h1], [M, M + h1 + G, iw, ih - h1 - G]]; }
    else if (panels.length === 3) {
      const h1 = ih * 0.4, w1 = iw * (0.45 + r() * 0.12);
      rects = [[M, M, iw, h1], [M, M + h1 + G, w1, ih - h1 - G], [M + w1 + G, M + h1 + G, iw - w1 - G, ih - h1 - G]];
    } else {
      const h1 = ih / 2 - G / 2, w1 = iw * (0.4 + r() * 0.2);
      rects = [[M, M, w1, h1], [M + w1 + G, M, iw - w1 - G, h1], [M, M + h1 + G, iw - w1 - G, h1], [M + iw - w1, M + h1 + G, w1, h1]];
    }
    const uid = `p${hash(`${s.id}${chIndex}${pIndex}`).toString(36)}`;
    let defs = "", body = "";
    panels.slice(0, 4).forEach((p, i) => {
      const [x, y, w, h] = rects[i];
      const cid = `${uid}c${i}`;
      defs += `<clipPath id="${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`;
      const showFig = p.speaker && p.speaker !== "Anlatıcı" && !["fire", "sky"].includes(p.scene);
      body += `<g clip-path="url(#${cid})">${scene(p.scene, x, y, w, h, r)}${showFig ? figure(x, y, w, h, r, p.scene === "night") : ""}${bubble(p, x, y, w, h, r)}</g>`;
      body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#111" stroke-width="4"/>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sayfa ${pIndex + 1}"><defs>${defs}</defs><rect width="${W}" height="${H}" fill="#fff"/>${body}</svg>`;
  }

  // ---------- Theme ----------
  const root = document.documentElement;
  const savedTheme = store.get("theme", null);
  if (savedTheme) root.dataset.theme = savedTheme;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });

  // ---------- Views ----------
  function card(s) {
    const pct = readPct(s);
    return `<a class="card" href="#/seri/${s.id}">
      <div class="cover">${coverArt(s)}<span class="badge">${typeLabel(s.type)}</span></div>
      <h3>${esc(s.title)}</h3>
      <div class="meta">${esc(s.author)} · ${s.chapters.length} bölüm</div>
      ${pct ? `<div class="progress" title="%${pct} okundu"><span style="width:${pct}%"></span></div>` : ""}
    </a>`;
  }

  function continueList(limit) {
    return Object.entries(state.progress)
      .map(([id, p]) => ({ s: byId(id), p }))
      .filter((x) => x.s && x.s.chapters[x.p.ch])
      .sort((a, b) => b.p.t - a.p.t)
      .slice(0, limit);
  }
  function continueHTML(items) {
    return `<div class="continue">${items.map(({ s, p }) => `
      <a class="continue-item" href="#/oku/${s.id}/${p.ch + 1}">
        <div class="cover">${coverArt(s)}</div>
        <div><h3>${esc(s.title)}</h3>
          <div class="meta">${unitLabel(s)} ${p.ch + 1} · ${esc(s.chapters[p.ch].title)}</div>
          <div class="progress"><span style="width:${readPct(s)}%"></span></div>
        </div>
      </a>`).join("")}</div>`;
  }

  function filtered() {
    const q = norm(state.q.trim());
    return CATALOG.filter((s) =>
      (state.type === "all" || s.type === state.type) &&
      (!state.genre || s.genres.includes(state.genre)) &&
      (!q || norm([s.title, s.author, ...s.genres].join(" ")).includes(q))
    );
  }

  function renderGrid() {
    const list = filtered();
    const el = document.getElementById("grid");
    if (!el) return;
    el.innerHTML = list.length ? list.map(card).join("") : `<div class="empty" style="grid-column:1/-1">Aramana uygun seri bulunamadı.</div>`;
    document.getElementById("gridCount").textContent = `${list.length} seri`;
    document.querySelectorAll("[data-type]").forEach((b) => b.classList.toggle("active", b.dataset.type === state.type));
    document.querySelectorAll("[data-genre]").forEach((b) => b.classList.toggle("active", b.dataset.genre === (state.genre || "")));
  }

  function viewHome() {
    const day = Math.floor(Date.now() / 864e5);
    const f = CATALOG[day % CATALOG.length];
    const cont = continueList(3);
    app.innerHTML = `<div class="wrap">
      <section class="hero">
        <div class="hero-body">
          <span class="eyebrow">Günün serisi · ${typeLabel(f.type)}</span>
          <h1>${esc(f.title)}</h1>
          <p>${esc(f.synopsis)}</p>
          <div class="btn-row">
            <a class="btn primary" href="#/oku/${f.id}/${(state.progress[f.id]?.ch ?? 0) + 1}">${state.progress[f.id] ? "Okumaya devam et" : "Okumaya başla"}</a>
            <a class="btn" href="#/seri/${f.id}">Detaylar</a>
          </div>
        </div>
        <div class="hero-art" style="background:linear-gradient(135deg, ${f.palette[1]}, ${f.palette[0]})">${coverArt(f)}</div>
      </section>
      ${cont.length ? `<section class="section"><div class="section-head"><h2>Okumaya devam et</h2><a class="count" href="#/kutuphane">Tümü →</a></div>${continueHTML(cont)}</section>` : ""}
      <section class="section">
        <div class="section-head"><h2>Tüm seriler</h2><span class="count" id="gridCount"></span></div>
        <div class="filters">
          <button class="chip" data-type="all">Tümü</button>
          <button class="chip" data-type="manga">Manga</button>
          <button class="chip" data-type="novel">Novel</button>
          <span class="sep"></span>
          <button class="chip" data-genre="">Her tür</button>
          ${allGenres().map((g) => `<button class="chip" data-genre="${esc(g)}">${esc(g)}</button>`).join("")}
        </div>
        <div class="grid" id="grid"></div>
      </section>
    </div>`;
    app.querySelectorAll("[data-type]").forEach((b) => b.addEventListener("click", () => { state.type = b.dataset.type; renderGrid(); }));
    app.querySelectorAll("[data-genre]").forEach((b) => b.addEventListener("click", () => { state.genre = b.dataset.genre || null; renderGrid(); }));
    renderGrid();
  }

  function viewLibrary() {
    const favs = CATALOG.filter((s) => state.favs.has(s.id));
    const cont = continueList(50);
    app.innerHTML = `<div class="wrap">
      <section class="section">
        <div class="section-head"><h2>Okumaya devam et</h2><span class="count">${cont.length} seri</span></div>
        ${cont.length ? continueHTML(cont) : `<div class="empty">Henüz bir şey okumadın. <a href="#/" style="color:var(--accent)">Keşfet</a> sayfasından bir seri seç.</div>`}
      </section>
      <section class="section">
        <div class="section-head"><h2>Favoriler</h2><span class="count">${favs.length} seri</span></div>
        ${favs.length ? `<div class="grid">${favs.map(card).join("")}</div>` : `<div class="empty">Seri sayfalarındaki ♥ butonuyla favori ekleyebilirsin.</div>`}
      </section>
    </div>`;
  }

  function viewSeries(id) {
    const s = byId(id);
    if (!s) return notFound();
    const p = state.progress[s.id];
    const read = new Set(state.read[s.id] || []);
    const fav = state.favs.has(s.id);
    const words = s.type === "novel" ? s.chapters.reduce((n, c) => n + chapterText(c).split(/\s+/).length, 0) : 0;
    const pages = s.type === "manga" ? s.chapters.reduce((n, c) => n + (c.images || c.pages).length, 0) : 0;
    app.innerHTML = `<div class="wrap"><div class="detail">
      <div><div class="cover">${coverArt(s)}</div></div>
      <div>
        <span class="eyebrow">${typeLabel(s.type)} · ${esc(s.status)}</span>
        <h1>${esc(s.title)}</h1>
        <div class="author">${esc(s.author)} · ${s.year}</div>
        <div class="tags">${s.genres.map((g) => `<span class="tag">${esc(g)}</span>`).join("")}</div>
        <p class="synopsis">${esc(s.synopsis)}</p>
        <div class="stats">
          <div><b>${s.chapters.length}</b>bölüm</div>
          ${s.type === "novel" ? `<div><b>~${Math.max(1, Math.round(words / 200))} dk</b>okuma süresi</div>` : `<div><b>${pages}</b>sayfa</div>`}
          <div><b>%${readPct(s)}</b>okundu</div>
        </div>
        <div class="btn-row" style="margin-bottom:24px">
          <a class="btn primary" href="#/oku/${s.id}/${(p?.ch ?? 0) + 1}">${p ? `Devam et · ${unitLabel(s)} ${p.ch + 1}` : "Okumaya başla"}</a>
          <button class="btn ${fav ? "on" : ""}" id="favBtn" aria-pressed="${fav}">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
            <span>${fav ? "Favorilerde" : "Favorilere ekle"}</span>
          </button>
        </div>
        <ul class="chapters">${s.chapters.map((c, i) => `
          <li class="${p?.ch === i ? "current" : ""} ${read.has(i) ? "done" : ""}"><a href="#/oku/${s.id}/${i + 1}">
            <span class="num">${i + 1}</span><span class="ch-title">${esc(c.title)}</span>
            <span class="read-mark">${p?.ch === i ? "Kaldığın yer" : read.has(i) ? "Okundu ✓" : ""}</span>
          </a></li>`).join("")}
        </ul>
      </div>
    </div></div>`;
    document.getElementById("favBtn").addEventListener("click", () => {
      state.favs.has(s.id) ? state.favs.delete(s.id) : state.favs.add(s.id);
      store.set("favs", [...state.favs]);
      viewSeries(id);
    });
  }

  function notFound() {
    app.innerHTML = `<div class="wrap"><div class="empty" style="margin:48px 0">Aradığın sayfa bulunamadı. <a href="#/" style="color:var(--accent)">Ana sayfaya dön</a></div></div>`;
  }

  // ---------- Reader ----------
  let readerCleanup = null;

  function readerBar(s, ci, settingsHTML) {
    return `<div class="reader-bar">
      <a class="icon-btn" href="#/seri/${s.id}" title="Seriye dön" aria-label="Seriye dön"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></a>
      <div class="title"><a href="#/seri/${s.id}">${esc(s.title)}</a><span>${unitLabel(s)} ${ci + 1}: ${esc(s.chapters[ci].title)}</span></div>
      <select id="chSelect" aria-label="Bölüm seç">${s.chapters.map((c, i) => `<option value="${i}" ${i === ci ? "selected" : ""}>${i + 1}. ${esc(c.title)}</option>`).join("")}</select>
      <button class="icon-btn" id="settingsBtn" title="Okuma ayarları" aria-label="Okuma ayarları" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg></button>
      <div class="panel-pop" id="settingsPop">${settingsHTML}</div>
    </div>`;
  }
  function chapterNav(s, ci) {
    const prev = ci > 0, next = ci < s.chapters.length - 1;
    return `<nav class="chapter-nav">
      <a class="btn" href="#/oku/${s.id}/${ci}" aria-disabled="${!prev}">← Önceki bölüm</a>
      ${next ? `<a class="btn primary" href="#/oku/${s.id}/${ci + 2}">Sonraki bölüm →</a>` : `<a class="btn primary" href="#/seri/${s.id}">Seriyi bitirdin ✓</a>`}
    </nav>`;
  }
  const seg = (key, opts, cur) => `<div class="seg" data-key="${key}">${opts.map(([v, l]) => `<button data-v="${v}" class="${String(cur) === String(v) ? "active" : ""}">${l}</button>`).join("")}</div>`;

  function wireReaderCommon(s, ci, onSetting) {
    document.body.classList.add("reading");
    document.getElementById("chSelect").addEventListener("change", (e) => { location.hash = `#/oku/${s.id}/${+e.target.value + 1}`; });
    const btn = document.getElementById("settingsBtn"), pop = document.getElementById("settingsPop");
    btn.addEventListener("click", (e) => { e.stopPropagation(); const o = pop.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
    pop.addEventListener("click", (e) => e.stopPropagation());
    const closePop = () => { pop.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
    document.addEventListener("click", closePop);
    pop.querySelectorAll(".seg").forEach((sg) => sg.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      sg.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
      onSetting(sg.dataset.key, b.dataset.v);
    }));
    pop.querySelectorAll("input[type=range]").forEach((inp) => inp.addEventListener("input", () => onSetting(inp.dataset.key, +inp.value)));

    // Aşağı kaydırınca üst barları gizle
    let lastY = scrollY;
    const bar = document.createElement("div"); bar.className = "read-progress"; document.body.appendChild(bar);
    const onScroll = () => {
      const y = scrollY;
      document.body.classList.toggle("chrome-hidden", y > lastY && y > 120);
      lastY = y;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : "0";
    };
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", closePop);
      removeEventListener("scroll", onScroll);
      bar.remove();
      document.body.classList.remove("reading", "chrome-hidden", "paper-sepia", "paper-dark");
    };
  }

  function saveSpot(s, ci, pos) {
    state.progress[s.id] = { ch: ci, pos, t: Date.now() };
    saveProgress();
  }

  function viewNovel(s, ci) {
    const c = s.chapters[ci], N = state.novel;
    const settings = `
      <div class="setting"><label>Yazı boyutu</label><input type="range" min="15" max="26" step="1" value="${N.fs}" data-key="fs"></div>
      <div class="setting"><label>Satır aralığı</label><input type="range" min="1.4" max="2.2" step="0.1" value="${N.lh}" data-key="lh"></div>
      <div class="setting"><label>Yazı tipi</label>${seg("font", [["serif", "Serif"], ["sans", "Sans"]], N.font)}</div>
      <div class="setting"><label>Sayfa</label>${seg("paper", [["auto", "Tema"], ["sepia", "Sepya"], ["dark", "Gece"]], N.paper)}</div>`;
    app.innerHTML = readerBar(s, ci, settings) + `
      <article class="novel" id="novel">
        <h1>${unitLabel(s)} ${ci + 1}</h1>
        <h2>${esc(c.title)}</h2>
        ${c.html != null ? c.html.replace(/<hr\s*\/?>/g, '<hr class="scene-break">') : c.paragraphs.map((p) => (p === "***" ? `<hr class="scene-break">` : `<p>${inline(p)}</p>`)).join("")}
      </article>` + chapterNav(s, ci);
    const art = document.getElementById("novel");
    const apply = () => {
      art.style.setProperty("--fs", N.fs + "px");
      art.style.setProperty("--lh", N.lh);
      art.classList.toggle("sans", N.font === "sans");
      document.body.classList.toggle("paper-sepia", N.paper === "sepia");
      document.body.classList.toggle("paper-dark", N.paper === "dark");
    };
    apply();
    const cleanup = wireReaderCommon(s, ci, (k, v) => { N[k] = v; store.set("novel", N); apply(); });

    const prev = state.progress[s.id];
    requestAnimationFrame(() => {
      if (prev && prev.ch === ci && prev.pos > 0) {
        const max = document.documentElement.scrollHeight - innerHeight;
        scrollTo(0, prev.pos * max);
      } else scrollTo(0, 0);
    });
    saveSpot(s, ci, prev && prev.ch === ci ? prev.pos : 0);

    let timer;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const pos = max > 0 ? scrollY / max : 1;
        saveSpot(s, ci, pos);
        if (pos > 0.92) markRead(s, ci);
      }, 200);
    };
    addEventListener("scroll", onScroll, { passive: true });
    if (document.documentElement.scrollHeight <= innerHeight + 10) markRead(s, ci);
    return () => { cleanup(); clearTimeout(timer); removeEventListener("scroll", onScroll); };
  }

  function viewManga(s, ci) {
    const c = s.chapters[ci], M = state.manga;
    const pages = c.images
      ? c.images.map((src, i) => `<img src="${esc(src)}" alt="Sayfa ${i + 1}" loading="lazy">`)
      : c.pages.map((panels, i) => mangaPageSVG(s, ci, i, panels));
    const settings = `
      <div class="setting"><label>Okuma modu</label>${seg("mode", [["vertical", "Dikey kaydır"], ["paged", "Sayfa sayfa"]], M.mode)}</div>
      <div class="setting"><label>Yön (sayfa modu)</label>${seg("dir", [["rtl", "Sağdan sola"], ["ltr", "Soldan sağa"]], M.dir)}</div>
      <div class="setting"><label>Sayfa genişliği</label><input type="range" min="420" max="1100" step="20" value="${M.width}" data-key="width"></div>`;
    app.innerHTML = readerBar(s, ci, settings) + `<section class="manga" id="manga"><div class="pages" id="pages"></div><div class="page-counter" id="pageCounter"></div></section>` + chapterNav(s, ci);

    const wrapEl = document.getElementById("manga"), pagesEl = document.getElementById("pages"), counter = document.getElementById("pageCounter");
    const prev = state.progress[s.id];
    let page = prev && prev.ch === ci ? Math.min(prev.pos | 0, pages.length - 1) : 0;
    let io = null;

    const go = (n) => {
      if (n < 0) { if (ci > 0) location.hash = `#/oku/${s.id}/${ci}`; return; }
      if (n >= pages.length) { markRead(s, ci); if (ci < s.chapters.length - 1) location.hash = `#/oku/${s.id}/${ci + 2}`; return; }
      page = n; render();
    };
    const render = () => {
      if (io) { io.disconnect(); io = null; }
      wrapEl.className = `manga ${M.mode}`;
      wrapEl.style.setProperty("--pw", M.width + "px");
      if (M.mode === "paged") {
        pagesEl.innerHTML = `<button class="tap-zone left" aria-label="${M.dir === "rtl" ? "Sonraki sayfa" : "Önceki sayfa"}"></button><div class="page">${pages[page]}</div><button class="tap-zone right" aria-label="${M.dir === "rtl" ? "Önceki sayfa" : "Sonraki sayfa"}"></button>`;
        const fwd = M.dir === "rtl" ? -1 : 1;
        pagesEl.querySelector(".left").onclick = () => go(page - fwd);
        pagesEl.querySelector(".right").onclick = () => go(page + fwd);
        counter.textContent = `${page + 1} / ${pages.length}  ·  ${M.dir === "rtl" ? "← ileri" : "ileri →"}`;
        saveSpot(s, ci, page);
        if (page === pages.length - 1) markRead(s, ci);
      } else {
        pagesEl.innerHTML = pages.map((p, i) => `<div class="page" data-i="${i}">${p}</div>`).join("");
        counter.textContent = `${pages.length} sayfa`;
        io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const i = +e.target.dataset.i;
            page = i; saveSpot(s, ci, i);
            if (i === pages.length - 1) markRead(s, ci);
          });
        }, { threshold: 0.5 });
        pagesEl.querySelectorAll(".page").forEach((el) => io.observe(el));
      }
    };
    render();
    requestAnimationFrame(() => {
      if (M.mode === "vertical" && page > 0) pagesEl.children[page]?.scrollIntoView();
      else scrollTo(0, 0);
    });

    const onKey = (e) => {
      if (e.target.closest("input, select, textarea")) return;
      if (M.mode !== "paged") return;
      const fwd = M.dir === "rtl" ? -1 : 1;
      if (e.key === "ArrowRight") go(page + fwd);
      else if (e.key === "ArrowLeft") go(page - fwd);
      else if (e.key === " ") { e.preventDefault(); go(page + 1); }
    };
    addEventListener("keydown", onKey);
    const cleanup = wireReaderCommon(s, ci, (k, v) => {
      M[k] = k === "width" ? +v : v; store.set("manga", M);
      if (k === "width") wrapEl.style.setProperty("--pw", v + "px"); else render();
    });
    return () => { cleanup(); removeEventListener("keydown", onKey); if (io) io.disconnect(); };
  }

  function viewReader(id, n) {
    const s = byId(id);
    const ci = (parseInt(n, 10) || 1) - 1;
    if (!s || !s.chapters[ci]) return notFound();
    document.title = `${s.title} · ${s.chapters[ci].title} — Kitaplık`;
    readerCleanup = s.type === "novel" ? viewNovel(s, ci) : viewManga(s, ci);
  }

  // ---------- Router ----------
  function route() {
    if (readerCleanup) { readerCleanup(); readerCleanup = null; }
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    document.title = "Kitaplık — Manga & Novel Okuma";
    let nav = null;
    if (!parts.length) { nav = "home"; viewHome(); }
    else if (parts[0] === "kutuphane") { nav = "library"; viewLibrary(); }
    else if (parts[0] === "seri") viewSeries(parts[1]);
    else if (parts[0] === "oku") viewReader(parts[1], parts[2]);
    else notFound();
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === nav));
    if (parts[0] !== "oku") scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  searchInput.addEventListener("input", () => {
    state.q = searchInput.value;
    if (location.hash && location.hash !== "#/") location.hash = "#/";
    else renderGrid();
  });
  addEventListener("hashchange", route);

  fetch("catalog.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => [])
    .then((extra) => {
      for (const raw of Array.isArray(extra) ? extra : []) {
        const s = normalize(raw);
        if (!s.chapters.length) continue;
        const i = CATALOG.findIndex((x) => x.id === s.id);
        if (i >= 0) CATALOG[i] = s; else CATALOG.push(s);
      }
      route();
    });
})();
