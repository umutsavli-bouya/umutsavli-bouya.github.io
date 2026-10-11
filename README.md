# Kitaplık — Manga & Novel Okuma Sitesi

GitHub Pages üzerinde çalışan statik bir okuma sitesi. İçerik `content/` klasöründeki
Markdown dosyalarından GitHub Pages'in kendi derleyicisi (Jekyll) tarafından üretilir; ister yönetim panelinden, ister doğrudan GitHub'dan yüklenebilir.

## Özellikler
- **Keşfet:** Günün serisi, manga/novel ve türe göre filtre, anlık arama
- **Seri sayfası:** Özet, bölüm listesi, okunma yüzdesi, favoriler
- **Novel okuyucu:** Yazı boyutu, satır aralığı, serif/sans, sepya/gece sayfası, kaldığın yeri hatırlama
- **Manga okuyucu:** Dikey kaydırma veya sayfa sayfa, sağdan sola / soldan sağa, klavye okları
- **Kütüphanem:** Okumaya devam et ve favoriler (tarayıcıda saklanır)
- **Yönetim paneli:** `/admin` adresinden seri ve bölüm ekleme

## İçerik yapısı
```
content/
  _series/son-tren.md        ← seri bilgileri (dosya adı = seri kimliği)
  _chapters/son-tren-1.md    ← bölümler
  media/                    ← kapak ve manga sayfa görselleri
```

**Seri dosyası** (`content/_series/<seri-id>.md`):
```markdown
---
title: "Son Tren 23:47"
type: novel                 # novel veya manga
author: "Selin Aras"
genres: [Gizem, Dram]
status: Devam ediyor
year: 2026
synopsis: "Kısa özet…"
cover: /content/media/kapak.jpg   # isteğe bağlı; yoksa otomatik kapak üretilir
color: "#2d3142"                  # otomatik kapak rengi
accent: "#ef8354"                 # otomatik kapak yazı rengi
---
```

**Novel bölümü** (`content/_chapters/<seri-id>-<numara>.md`):
```markdown
---
series: son-tren
number: 4
title: "Bölüm başlığı"
draft: false                # true ise sitede görünmez
---
Paragraflar arasında boş satır bırak. **Kalın** ve *italik* desteklenir.

***

Tek başına *** yazılan satır sahne geçişidir.
```

**Manga bölümü:** Aynı frontmatter, metin yerine sayfa görselleri:
```yaml
pages:
  - /content/media/ay-bekcisi-4-01.jpg
  - /content/media/ay-bekcisi-4-02.jpg
```

## Bölüm yüklemenin 2 yolu

### A) Yönetim paneli (önerilen)
1. `https://umutsavli-bouya.github.io/admin/` adresini aç.
2. **Sign in with Token** seç. Token'ı GitHub → Settings → Developer settings →
   Fine-grained tokens bölümünden, sadece bu repo için **Contents: Read and write** izniyle oluştur.
3. "Seriler"den seriyi oluştur, "Bölümler"den bölüm ekle, **Yayınla**'ya bas.
   Panel dosyayı repoya kaydeder; site 1–2 dakika içinde güncellenir.

### B) GitHub'dan doğrudan
Repo sayfasında `content/_chapters` klasörüne gir → **Add file → Create new file / Upload files**,
yukarıdaki biçimde bir `.md` dosyası ekle ve commit et.

## Yayın nasıl çalışıyor
Site doğrudan `main` dalından yayınlanır; ek ayar veya GitHub Actions gerekmez. GitHub Pages
her push'ta siteyi Jekyll ile derler ve `catalog.json` şablonu `content/` içindeki tüm seri ve
bölümlerden kataloğu üretir. Yeni bir bölüm 1–2 dakika içinde sitede görünür.
Taslak (`draft: true`) bölümler ve hiç bölümü olmayan seriler gösterilmez.

## Bilgisayarda çalıştırmak
```bash
gem install jekyll -v 3.10.0 kramdown-parser-gfm webrick
jekyll serve      # http://localhost:4000
```

## İçerik hakları
Sitede yalnızca yayın hakkına sahip olduğun içerikleri paylaş: kendi eserlerin, izinli
çeviriler veya açık lisanslı eserler. Örnek seriler bu site için yazılmış özgün içeriklerdir;
`data.js` kodla çizilen demo mangaları içerir.
