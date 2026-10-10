// Örnek katalog. Tüm seriler bu site için yazılmış özgün içeriklerdir.
// Yeni seri eklemek için bu diziye aynı yapıda bir nesne eklemen yeterli.
//
// type: "manga" → chapters[].pages: her sayfa bir panel listesidir.
//   Panel: { scene, text, speaker }  (scene: night | city | forest | sea | room | sky | fire)
//   Gerçek görsellerin varsa pages yerine images: ["url1.jpg", "url2.jpg"] kullanabilirsin.
// type: "novel" → chapters[].paragraphs: düz metin paragrafları.

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
    id: "son-tren",
    type: "novel",
    title: "Son Tren 23:47",
    author: "Selin Aras",
    genres: ["Gizem", "Dram"],
    status: "Devam ediyor",
    year: 2026,
    palette: ["#2d3142", "#ef8354"],
    synopsis:
      "Her gece 23:47'de kalkan son trende hep aynı yolcular vardır. Kondüktör Orhan, bir gece listede olmayan bir yolcuyla karşılaşınca, otuz yıldır aynı geceyi yaşadığını fark etmeye başlar.",
    chapters: [
      {
        title: "Bilet",
        paragraphs: [
          "Orhan saatine baktı. 23:46. Peronun ucundaki lamba her zamanki gibi iki kez göz kırptı, sonra sabitlendi. Otuz yıldır bu lambanın tamir edilmesini bekliyordu ve otuz yıldır kimse tamir etmemişti.",
          "Vagonlar boştu, ya da boş görünüyordu. Üçüncü vagonda örgü ören yaşlı kadın, beşinci vagonda kulaklığını hiç çıkarmayan genç, son vagonda da gazetesini hep aynı sayfada tutan adam. Orhan onların adlarını bilmezdi ama yüzlerini kendi yüzünden iyi tanırdı.",
          "Düdüğü öttürdü. Tren sarsılarak hareket etti.",
          "Biletleri kontrol etmeye ikinci vagondan başladı, her zamanki gibi. Ama ikinci vagonda bu gece biri vardı.",
          "Kız pencereye yaslanmış, camdaki buğuya parmağıyla bir şeyler çiziyordu. Yirmi yaşlarında olmalıydı. Sırt çantası, rengi solmuş bir mont, bir de elinde — Orhan gözlerini kıstı — sarı, eski tip, delikli bir bilet.",
          "\"İyi akşamlar,\" dedi Orhan. \"Biletinizi görebilir miyim?\"",
          "Kız başını çevirdi. Gözlerinde şaşkınlıktan çok bir tür rahatlama vardı, sanki uzun süredir birinin bunu sormasını bekliyormuş gibi.",
          "\"Siz Orhan Bey'siniz, değil mi?\" dedi. \"Sonunda.\"",
          "Orhan bileti aldı. Üzerindeki tarih silikti ama okunabiliyordu: 14 Kasım 1994.",
          "Kendi ilk mesai gününün tarihi."
        ]
      },
      {
        title: "Yolcu Listesi",
        paragraphs: [
          "Kondüktör kulübesinde, çaydanlığın tıkırtısı arasında Orhan yolcu listesini üçüncü kez okudu. Liste her gece aynıydı: dört isim, dört koltuk numarası. Kızın adı yoktu.",
          "\"Adın ne?\" diye sordu kapıda bekleyen kıza.",
          "\"Nil.\"",
          "\"Nil ne?\"",
          "Kız omuz silkti. \"Sadece Nil. Soyadımı hatırlamıyorum. Aslında pek çok şeyi hatırlamıyorum. Ama sizi hatırlıyorum. Ve bu treni.\"",
          "Orhan çayı iki bardağa doldurdu, birini kıza uzattı. Elleri titremiyordu; otuz yıl insanı bazı şeylere alıştırıyordu. Ama içinde bir yerde, uzun zamandır kilitli duran bir kapının kolu yavaşça dönüyordu.",
          "\"Bu tren,\" dedi Nil, bardağı iki eliyle tutarak, \"hiçbir yere varmıyor, değil mi?\"",
          "Orhan pencereden dışarı baktı. Karanlıkta, rayların kenarında, her gece aynı yerde duran o tek ağaç geçti.",
          "\"Varıyor,\" dedi. \"Sadece hep aynı yere.\""
        ]
      },
      {
        title: "Gazete",
        paragraphs: [
          "Son vagondaki adam gazetesini indirmedi. Orhan otuz yıldır onun yüzünü sadece gazetenin üstünden, kaşlarına kadar görmüştü.",
          "\"Beyefendi,\" dedi Nil, Orhan'ın onu durdurmasına fırsat vermeden. \"Hangi sayfayı okuyorsunuz?\"",
          "Gazete hışırdadı. Adam yavaşça indirdi onu. Yüzü sıradandı; unutulmaya yazgılı, kalabalıkta kaybolacak bir yüz. Ama gözleri Orhan'ınkilere benziyordu. Fazla benziyordu.",
          "\"Hep aynı sayfayı,\" dedi adam. \"Kayıp ilanlarını.\"",
          "Nil gazeteyi aldı ve sayfayı Orhan'a çevirdi. Sayfanın ortasında, siyah beyaz, küçük bir fotoğraf vardı.",
          "Fotoğraftaki kız Nil'di."
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
    id: "yedinci-kat",
    type: "novel",
    title: "Yedinci Katın Kütüphanesi",
    author: "Ayşe Demirci",
    genres: ["Fantastik", "Romantik"],
    status: "Devam ediyor",
    year: 2025,
    palette: ["#344e41", "#dad7cd"],
    synopsis:
      "Altı katlı bir apartmanda yedinci kata çıkan bir merdiven bulan Defne, orada okunmamış hikâyelerin saklandığı bir kütüphane ve onu yüz yıldır bekleyen huysuz bir kütüphaneci bulur.",
    chapters: [
      {
        title: "Fazladan Bir Basamak",
        paragraphs: [
          "Apartman altı katlıydı. Defne bunu biliyordu, çünkü yeni taşındıkları bu binanın tabelasında açıkça yazıyordu: Gül Apartmanı, 6 kat, 12 daire. Asansör de altıya kadar gidiyordu. Ama merdivenler gitmiyordu.",
          "Bir pazar sabahı, annesi uyurken çöpü atmaya inmek yerine yanlışlıkla yukarı çıktığında fark etti bunu. Altıncı katın sahanlığından sonra merdiven devam ediyordu: dar, ahşap, cilası yer yer kalkmış basamaklarla.",
          "Defne saydı. On üç basamak. Sonunda yeşile boyanmış, pirinç tokmaklı bir kapı.",
          "Kapının üstünde, eski harflerle tek bir kelime yazıyordu: OKUNMAMIŞ.",
          "Tokmağa dokunduğunda kapı kendiliğinden açıldı. İçerisi mürekkep ve yağmur kokuyordu. Raflar tavana kadar uzanıyor, tavan da — Defne başını kaldırdı — görünmüyordu. Raflar sanki sonsuza kadar yukarı çıkıyordu.",
          "\"Geç kaldın,\" dedi bir ses. \"Yüz iki yıl, dört ay, on bir gün.\"",
          "Masanın arkasında, yuvarlak gözlüklü, kravatı tozlu bir genç adam oturuyordu. Ya da genç görünüyordu. Gözleri, yüzünden çok daha yaşlıydı.",
          "\"Ben… sadece çöpü atacaktım,\" dedi Defne."
        ]
      },
      {
        title: "Kütüphaneci",
        paragraphs: [
          "Adının Rüzgâr olduğunu söyledi, ama bunu söylerken yüzünü buruşturdu, sanki ismi ona sonradan yakıştırılmış bir ceketmiş gibi.",
          "\"Buradaki kitapların hepsi yazılmış ama hiç okunmamış hikâyeler,\" dedi, rafları göstererek. \"Biri bir hikâye düşünür, kafasında tamamlar, ama kimseye anlatmaz. Hikâye de buraya gelir. Ve bekler.\"",
          "\"Neyi bekler?\"",
          "\"Okunmayı tabii ki.\" Rüzgâr gözlüklerini düzeltti. \"Okunmayan hikâye yavaş yavaş solar. Sayfaları beyazlaşır. Sonunda tamamen kaybolur. Son yüz yılda kütüphanenin yarısını kaybettik.\"",
          "Defne en yakın raftan bir kitap aldı. Kapağı neredeyse şeffaftı. Açtığında sayfalarda sadece birkaç kelime kalmıştı: …ve sonra deniz…",
          "\"Peki neden ben?\"",
          "Rüzgâr ilk kez gülümsedi. Kısa, isteksiz, ama gerçek bir gülümseme.",
          "\"Çünkü merdiveni sadece hikâye okumayı gerçekten seven biri görebilir. Ve sen, bu binaya taşındığın gün, kutulardan ilk önce kitaplarını çıkardın.\""
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
  },
  {
    id: "kirk-kapi",
    type: "novel",
    title: "Kırk Kapılı Han",
    author: "Murat Ersoy",
    genres: ["Tarihi", "Macera", "Fantastik"],
    status: "Tamamlandı",
    year: 2023,
    palette: ["#7f5539", "#ede0d4"],
    synopsis:
      "İpek Yolu üzerindeki bir handa her kapı başka bir şehre açılır. Hancının kızı Gülbahar, babası öldükten sonra kapıların anahtarlarını devralır — ve otuz dokuzuncu kapının neden hiç açılmadığını öğrenmek ister.",
    chapters: [
      {
        title: "Anahtarlar",
        paragraphs: [
          "Babasının ölümünden üç gün sonra, Gülbahar anahtar halkasını ilk kez kendi beline taktı. Kırk anahtar vardı halkada; kırk kapı için kırk anahtar. Her biri ayrı bir metalden, ayrı bir ustanın elinden çıkmıştı.",
          "Birinci kapı Semerkant'a açılırdı. Gülbahar onu çocukken yüzlerce kez açmış, kapının ardındaki pazarın baharat kokusunu içine çekmişti. İkinci kapı Tebriz'e, üçüncüsü Halep'e. On yedinci kapının ardında hep kar yağardı; kimse oranın neresi olduğunu bilmezdi ama kürk tüccarları orayı çok severdi.",
          "Otuz dokuzuncu kapı ise hiç açılmamıştı.",
          "Anahtarı siyahtı, soğuktu, ve tuhaf biçimde ağırdı — diğer anahtarların üç katı. Babası onu asla kullanmamış, Gülbahar sorduğunda da yalnızca başını sallamıştı: \"Bazı kapılar kapalı kalmak için yapılır, kızım.\"",
          "Ama babası artık yoktu. Ve handa, avlunun ortasında, deveciler arasında fısıltılar dolaşıyordu: Kırkıncı kapının ardındaki şehir, otuz dokuzuncu kapı açılmadıkça bir daha ulaşılamayacakmış."
        ]
      },
      {
        title: "Otuz Dokuzuncu Kapı",
        paragraphs: [
          "Gece yarısı, han uyurken, Gülbahar fenerini aldı ve uzun koridorun sonuna yürüdü. Kapılar birer birer yanından geçti; bazılarının altından ışık sızıyordu, bazılarından müzik, birinden de deniz sesi.",
          "Otuz dokuzuncu kapı diğerlerinden farklı değildi. Aynı ceviz ağacı, aynı demir menteşeler. Sadece kilidin etrafında, tahtanın üzerinde, birinin tırnağıyla kazıdığı ince çizgiler vardı. Gülbahar fenerini yaklaştırdı.",
          "Çizgiler bir yazıydı. Babasının el yazısı.",
          "Açma. Ama açarsan, beni ara.",
          "Gülbahar siyah anahtarı kilide soktu. Çevirdi.",
          "Kapı açıldığında ardında bir şehir yoktu. Ardında, aynı koridor vardı — aynı kırk kapı, aynı fener ışığı. Ve koridorun en ucunda, sırtı ona dönük, anahtar halkasını belinde taşıyan bir adam duruyordu."
        ]
      }
    ]
  }
];
