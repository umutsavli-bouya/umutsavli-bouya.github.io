// Örnek manga serileri. Tüm seriler bu site için yazılmış özgün içeriklerdir.
//
// Novel'lar ve görsel sayfalı mangalar artık content/ klasöründe Markdown olarak duruyor
// (bkz. README). Bu dosya sadece kodla çizilen demo mangaları tutar.
//
// chapters[].pages: her sayfa bir panel listesidir.
//   Panel: { scene, text, speaker }  (scene: night | city | forest | sea | room | sky | fire)

window.CATALOG = [
  {
    id: "ay-bekcisi",
    type: "manga",
    title: "Ay Bekçisi",
    author: "Deniz Kaya",
    genres: ["Fantastik", "Macera"],
    status: "Devam ediyor",
    year: 2025,
    palette: ["#1b2a6b", "#f2c14e"],
    synopsis:
      "Her gece aya bir fener yakılmazsa şehir karanlığa gömülür. On altı yaşındaki Ela, kuledeki son bekçinin kaybolduğu gece feneri yakmak zorunda kalır — ve ışığın gölgede bir şeyleri uyandırdığını fark eder.",
    chapters: [
      {
        title: "Fener",
        pages: [
          [
            { scene: "night", text: "Bu şehirde kimse geceleri yukarı bakmaz.", speaker: "Anlatıcı" },
            { scene: "city", text: "Ela! Kule yine karanlık!", speaker: "Mert" }
          ],
          [
            { scene: "room", text: "Dedem dönmedi mi hâlâ?", speaker: "Ela" },
            { scene: "room", text: "Üç gündür kimse görmedi onu.", speaker: "Mert" },
            { scene: "night", text: "O zaman feneri ben yakarım.", speaker: "Ela" }
          ],
          [
            { scene: "sky", text: "Yüz yirmi basamak. Dedem her gece çıkardı bunları…", speaker: "Ela" },
            { scene: "fire", text: "FSSSHH!", speaker: "" }
          ],
          [
            { scene: "night", text: "Işık… gölgeleri hareket ettiriyor.", speaker: "Ela" },
            { scene: "night", text: "Sonunda biri yaktı. Uzun zamandır bekliyordum.", speaker: "???" }
          ]
        ]
      },
      {
        title: "Gölgedeki Ses",
        pages: [
          [
            { scene: "night", text: "Kimsin sen? Çık ortaya!", speaker: "Ela" },
            { scene: "fire", text: "Ben fenerin gölgesiyim. Deden bana Kül derdi.", speaker: "Kül" }
          ],
          [
            { scene: "room", text: "Dedemi tanıyor musun? Nerede o?", speaker: "Ela" },
            { scene: "sky", text: "Ayın öbür yüzünde. Ve sen onu geri getirmeden fener sönerse…", speaker: "Kül" }
          ],
          [
            { scene: "city", text: "…bu şehir bir daha sabahı görmez.", speaker: "Kül" }
          ]
        ]
      },
      {
        title: "Basamaklar",
        pages: [
          [
            { scene: "sky", text: "Ayın öbür yüzüne nasıl gidilir ki?", speaker: "Ela" },
            { scene: "fire", text: "Basamaklardan. Ama bu sefer yukarı değil.", speaker: "Kül" },
            { scene: "night", text: "Aşağı.", speaker: "Kül" }
          ],
          [
            { scene: "forest", text: "Kulenin altında bir orman mı var?!", speaker: "Ela" },
            { scene: "forest", text: "Fenerin ışığı ne kadar yukarı gidiyorsa, kökleri de o kadar aşağı iner.", speaker: "Kül" }
          ]
        ]
      }
    ]
  },
  {
    id: "demir-sef",
    type: "manga",
    title: "Demir Şef",
    author: "Burak Yıldız",
    genres: ["Komedi", "Yemek"],
    status: "Tamamlandı",
    year: 2024,
    palette: ["#b23a48", "#fcb9b2"],
    synopsis:
      "Emekli bir mutfak robotu, kapanmak üzere olan bir mahalle lokantasında ikinci bir şans bulur. Tek sorun: tat almıyor ve tarifleri kendi kafasına göre 'optimize' ediyor.",
    chapters: [
      {
        title: "Yeniden Başlatılıyor",
        pages: [
          [
            { scene: "room", text: "Lokantayı kurtarmak için bir aşçıya ihtiyacımız var, Zehra Abla.", speaker: "Can" },
            { scene: "room", text: "Parası olan aşçı çalıştırır, oğlum.", speaker: "Zehra" }
          ],
          [
            { scene: "city", text: "Hurdacıda 200 liraya robot mu?!", speaker: "Can" },
            { scene: "fire", text: "SİSTEM BAŞLATILIYOR… MERHABA. BEN KAZAN-3000.", speaker: "Robot" }
          ],
          [
            { scene: "room", text: "Menemen yapabilir misin?", speaker: "Zehra" },
            { scene: "fire", text: "MENEMEN: %94 VERİM. SOĞAN EKLENSİN Mİ?", speaker: "Robot" },
            { scene: "room", text: "…işte şimdi kavga çıkacak.", speaker: "Can" }
          ]
        ]
      },
      {
        title: "Soğan Meselesi",
        pages: [
          [
            { scene: "city", text: "Mahallede iki parti var artık: Soğanlılar ve soğansızlar.", speaker: "Can" },
            { scene: "room", text: "UZLAŞMA ÖNERİSİ: YARIM SOĞAN.", speaker: "Robot" }
          ],
          [
            { scene: "room", text: "Herkesi kızdırdın, tebrikler.", speaker: "Zehra" },
            { scene: "fire", text: "AMA LOKANTA DOLU. 47 MÜŞTERİ. REKOR.", speaker: "Robot" }
          ]
        ]
      }
    ]
  },
  {
    id: "dalga-kiran",
    type: "manga",
    title: "Dalgakıran",
    author: "Kerem Öz",
    genres: ["Spor", "Dram"],
    status: "Devam ediyor",
    year: 2026,
    palette: ["#0077b6", "#90e0ef"],
    synopsis:
      "Küçük bir Ege kasabasında, takımı dağılmak üzere olan lise yüzme kulübü. Denizden korkan yeni öğrenci Arda, takımın son umudu olduğunu öğrenince işler karışır.",
    chapters: [
      {
        title: "Tuzlu Su",
        pages: [
          [
            { scene: "sea", text: "Bu kasabada herkes yüzmeyi bilir.", speaker: "Anlatıcı" },
            { scene: "city", text: "…ben hariç.", speaker: "Arda" }
          ],
          [
            { scene: "sea", text: "Kulübe dördüncü kişi lazım, yoksa kapatıyorlar!", speaker: "İpek" },
            { scene: "room", text: "Yüzemiyorum ki ben.", speaker: "Arda" },
            { scene: "sea", text: "Öğretiriz! Ne kadar zor olabilir?", speaker: "İpek" }
          ],
          [
            { scene: "sea", text: "ŞLAP!", speaker: "" },
            { scene: "sky", text: "…çok zor olabilirmiş.", speaker: "İpek" }
          ]
        ]
      },
      {
        title: "Nefes",
        pages: [
          [
            { scene: "sea", text: "Suyun altında ne duyuyorsun?", speaker: "Koç Sinan" },
            { scene: "sea", text: "Hiçbir şey. Sadece kalbimi.", speaker: "Arda" }
          ],
          [
            { scene: "sky", text: "İşte o ses, senin ritmin. Onu takip et.", speaker: "Koç Sinan" }
          ]
        ]
      }
    ]
  }
];
