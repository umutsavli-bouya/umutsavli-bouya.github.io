// Site ayarları. Boş bırakılan bağlantılar sitede gösterilmez.
window.SITE = {
  name: "HopeScans",
  tagline: "Manga & novel okuma",
  discord: "",          // ör. "https://discord.gg/davet-kodu"
  twitter: "",          // ör. "https://x.com/kullanici"
  instagram: "",        // ör. "https://instagram.com/kullanici"
  donate: "",           // ör. Patreon / Kreosus / Buy Me a Coffee bağlantısı
  contact: "",          // telif ve iletişim e-postası, ör. "iletisim@ornek.com"

  // "Ekibe Katıl!" sayfası
  join: {
    url: "",            // başvuru formu (ör. Google Form) veya Discord daveti
    text: "Çeviri, editörlük ve redaksiyon için gönüllü ekip arkadaşları arıyoruz. Deneyim şart değil; öğrenmeye istekli olman yeterli.",
    roles: [
      { name: "Çevirmen", desc: "İngilizce veya Japonca'dan Türkçe'ye bölüm çevirisi." },
      { name: "Editör", desc: "Temizleme (clean) ve dizgi (typeset) işleri." },
      { name: "Redaktör", desc: "Çevirilerin imla ve anlatım kontrolü." }
    ]
  },

  // Sıkça Sorulan Sorular sayfası
  faq: [
    { q: "Yeni bölümler ne zaman çıkıyor?", a: "Belirli bir takvimimiz yok; bölümler hazır oldukça yayınlanır. Duyurular kutusunu ve Discord sunucumuzu takip edebilirsin." },
    { q: "Okuma geçmişim nerede saklanıyor?", a: "Okuma geçmişin ve favorilerin bu tarayıcıda saklanır. Tarayıcı verilerini silersen veya başka cihaza geçersen sıfırlanır." },
    { q: "Ekibe nasıl katılabilirim?", a: "Üst menüdeki \"Ekibe Katıl!\" butonundan başvuru sayfasına ulaşabilirsin." },
    { q: "Bir içeriğin hakları bana ait, ne yapmalıyım?", a: "Sayfanın en altındaki iletişim adresinden bize yaz; içerik incelenip en kısa sürede kaldırılır." }
  ],

  // Yorumlar: GitHub Discussions tabanlı Giscus (https://giscus.app).
  // Kurulum adımları README'de. Dört alan da doluysa yorumlar açılır.
  giscus: {
    repo: "umutsavli-bouya/umutsavli-bouya.github.io",
    repoId: "",
    category: "Yorumlar",
    categoryId: ""
  }
};
