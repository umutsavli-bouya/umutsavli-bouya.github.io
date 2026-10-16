# Kitaplık — Manga & Novel Okuma Sitesi

GitHub Pages üzerinde çalışan statik bir okuma sitesi. İçerik `content/` klasöründeki
Markdown dosyalarından GitHub Pages'in kendi derleyicisi (Jekyll) tarafından üretilir; ister yönetim panelinden, ister doğrudan GitHub'dan yüklenebilir.

## Özellikler
- **Keşfet:** Günün serisi, manga/novel ve türe göre filtre, anlık arama
- **Seri sayfası:** Özet, bölüm listesi, okunma yüzdesi, favoriler
- **Novel okuyucu:** Yazı boyutu, satır aralığı, serif/sans, sepya/gece sayfası, kaldığın yeri hatırlama
- **Manga okuyucu:** Dikey kaydırma veya sayfa sayfa, sağdan sola / soldan sağa, klavye okları
- **Kütüphanem:** Okumaya devam et ve favoriler (tarayıcıda saklanır)
- **Ana sayfa:** Öne çıkan seriler slider'ı, son eklenen bölümler (YENİ etiketi ve "2 gün önce" gibi zamanlar), haftalık/aylık/tüm zamanlar popüler listesi
- **Seri listesi:** Arama, tür, durum ve kategori filtreleri, sıralama (son güncellenen, puan, A–Z, bölüm sayısı)
- **Duyurular:** Ana sayfanın sağında (mobilde en üstte) duyuru kutusu; yönetim panelindeki "Duyurular"dan eklenir
- **Yorumlar:** Seri ve bölüm sayfalarında Giscus ile yorum (isteğe bağlı)
- **Yönetim paneli:** `/admin` adresinden seri ve bölüm ekleme

## Site ayarları (`config.js`)
Site adı, Discord, bağış ve iletişim bağlantıları `config.js` içinde. Boş bırakılan
bağlantılar sitede gösterilmez. İletişim adresi alt bilgide "İletişim & telif bildirimi"
olarak görünür.

### Yorumları açmak (Giscus, ücretsiz)
Yorumlar GitHub Discussions'ta saklanır; okurlar GitHub hesabıyla yorum yapar.
1. Repo → Settings → General → Features → **Discussions**'ı aç.
2. Discussions sekmesinde **"Yorumlar"** adlı bir kategori oluştur (tür: Announcement önerilir).
3. https://github.com/apps/giscus adresinden Giscus uygulamasını bu repoya kur.
4. https://giscus.app sayfasında repo adını gir, "Yorumlar" kategorisini seç. Sayfanın verdiği
   `data-repo-id` ve `data-category-id` değerlerini `config.js` içindeki `repoId` ve `categoryId` alanlarına yaz.

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
artist: "Çizer adı"               # isteğe bağlı (manga)
rating: 8.7                       # isteğe bağlı, 0–10
featured: true                    # ana sayfa slider'ında göster
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
released: 2026-10-16        # yayın tarihi; "son eklenenler" ve YENİ etiketi için
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

**Duyuru** (`content/_announcements/<tarih>-<ad>.md`):
```markdown
---
title: "Editör ve çevirmen alımları açık"
date: 2026-10-16T12:00:00+03:00
kind: important             # important = altın çerçeve, info = normal
link: "https://forms.gle/..." # isteğe bağlı
link_text: "Başvur"
active: true                # false ise gösterilmez
---
Kısa duyuru metni.
```
En yeni 4 duyuru gösterilir.

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
