# Kitaplık — Manga & Novel Okuma Sitesi

GitHub Pages üzerinde çalışan, derleme adımı gerektirmeyen statik bir okuma sitesi.

## Özellikler
- **Keşfet:** Günün serisi, manga/novel ve türe göre filtre, anlık arama
- **Seri sayfası:** Özet, bölüm listesi, okunma yüzdesi, favorilere ekleme
- **Novel okuyucu:** Yazı boyutu, satır aralığı, serif/sans, tema/sepya/gece sayfası, kaldığın yeri hatırlama
- **Manga okuyucu:** Dikey kaydırma veya sayfa sayfa mod, sağdan sola / soldan sağa yön, klavye okları, sayfa genişliği
- **Kütüphanem:** Okumaya devam et listesi ve favoriler (tarayıcıda `localStorage` ile saklanır)
- Açık/koyu tema, mobil uyumlu

## Yeni seri eklemek
Tüm içerik `data.js` dosyasındaki `CATALOG` dizisinde. Novel için bölümlere `paragraphs`,
manga için kendi görsellerin varsa `images: ["sayfa1.jpg", ...]` ekle.

Örnek seriler bu site için yazılmış özgün içeriklerdir.
