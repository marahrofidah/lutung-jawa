export const levelsData = [
  {
    level: 1,
    theme: "Habitat & Distribusi",
    title: "Penjelajah Rimba",
    material: "Lutung Jawa (Trachypithecus auratus) adalah satwa endemik Indonesia yang hanya ditemukan di pulau Jawa, Bali, dan Lombok. Mereka sangat menyukai hutan primer dan sekunder, mulai dari hutan bakau pesisir pantai hingga hutan pegunungan tinggi. Satwa ini sangat bergantung pada tajuk pohon tinggi sebagai ruang gerak, tidur, dan berlindung dari predator.",
    caseStudy: {
      title: "Studi Kasus: Perubahan di Habitat Lutung Jawa",
      instruction: "Bacalah cerita berikut dengan seksama!",
      story: "Beberapa tahun yang lalu, kawasan hutan tempat hidup Lutung Jawa masih dipenuhi oleh berbagai jenis pohon. Di hutan tersebut terdapat pohon-pohon besar sebagai tempat berpindah dan beristirahat, serta pohon Ficus yang menghasilkan buah sebagai salah satu sumber makanan Lutung Jawa.\n\nNamun, dalam beberapa bulan terakhir, sebagian kawasan hutan mulai berubah. Beberapa pohon ditebang untuk membuka lahan perkebunan dan permukiman. Akibatnya, jumlah pohon di beberapa bagian hutan semakin berkurang. Kanopi pohon yang sebelumnya saling terhubung kini menjadi terputus.\n\nLutung Jawa mulai kesulitan berpindah dari satu pohon ke pohon lainnya. Ketersediaan makanan juga semakin berkurang karena jumlah tumbuhan yang menjadi sumber pakan menurun. Beberapa kelompok Lutung Jawa bahkan terlihat berpindah ke wilayah lain untuk mencari habitat yang lebih sesuai. Masyarakat di sekitar hutan mulai khawatir karena semakin jarang melihat Lutung Jawa di habitat alaminya.",
      conclusion: "Setelah membaca studi kasus dan mengamati kondisi habitat, jawablah pertanyaan berikut."
    },
    question: "Menurutmu, apa masalah utama yang sedang terjadi pada habitat Lutung Jawa? Jelaskan alasanmu berdasarkan informasi yang terdapat pada studi kasus dan hasil pengamatan habitat.",
    options: [
      { key: "A", text: "Populasi Lutung Jawa meningkat sehingga habitat menjadi terlalu padat." },
      { key: "B", text: "Terjadi kerusakan habitat akibat penebangan pohon dan pembukaan lahan." },
      { key: "C", text: "Curah hujan yang tinggi menyebabkan Lutung Jawa meninggalkan habitatnya." },
      { key: "D", text: "Jumlah predator di hutan meningkat sehingga Lutung Jawa berpindah tempat." }
    ],
    correctAnswer: "B",
    videoUrl: "https://www.youtube.com/embed/9gM63ZixU_A",
    discussion: "Hebat! Kamu telah berhasil mengidentifikasi masalah pada habitat Lutung Jawa.\n\nDalam suatu ekosistem, setiap komponen saling berhubungan. Berkurangnya vegetasi tidak hanya memengaruhi tumbuhan, tetapi juga berdampak pada ketersediaan makanan, tempat berlindung, dan kelangsungan hidup satwa yang tinggal di dalamnya. Pada level berikutnya, kamu akan menganalisis lebih dalam bagaimana perubahan tersebut memengaruhi hubungan antar makhluk hidup dalam ekosistem.",
    badgeName: "Sobat Hutan (Forest Friend)",
    badgeDescription: "Lencana atas keberhasilan mengidentifikasi dan mengelompokkan komponen biotik dan abiotik di habitat Lutung Jawa."
  },
  {
    level: 2,
    theme: "Makanan & Pencernaan",
    title: "Ahli Nutrisi Rimba",
    material: "Lutung Jawa termasuk satwa herbivora yang dominan memakan dedaunan (folivora) serta buah-buahan (frugivora). Sekitar 60-80% makanan mereka adalah daun muda, kuncup bunga, dan biji-bijian. Mereka memiliki lambung yang besar dan kompleks dengan bakteri pembantu khusus (mirip sistem pencernaan sapi) untuk memecah serat kasar dari daun hutan yang keras.",
    caseStudy: {
      title: "Studi Kasus: Mengapa Populasi Lutung Jawa Menurun?",
      instruction: "Bacalah cerita berikut dengan saksama!",
      story: "Petugas di Kawasan Konservasi Gunung Lestari melakukan pemantauan terhadap populasi Lutung Jawa selama tiga tahun terakhir. Hasil pengamatan menunjukkan bahwa jumlah Lutung Jawa di kawasan tersebut terus menurun.\n\nBerdasarkan hasil survei, diketahui bahwa sebagian kawasan hutan mengalami perubahan akibat aktivitas manusia, seperti pembukaan lahan di sekitar hutan. Akibatnya, beberapa pohon yang menjadi sumber makanan dan tempat berlindung Lutung Jawa semakin berkurang. Kanopi pohon yang sebelumnya saling terhubung kini mulai terpisah sehingga Lutung Jawa lebih sulit berpindah untuk mencari makan.\n\nMeskipun sungai di kawasan tersebut masih mengalir dengan baik dan cahaya matahari tetap tersedia, petugas sering menemukan kelompok Lutung Jawa berpindah ke wilayah lain untuk mencari makanan yang lebih banyak.\n\nPetugas konservasi ingin mengetahui penyebab utama menurunnya populasi Lutung Jawa agar dapat menentukan langkah pelestarian yang tepat. Pemerintah daerah berencana membuka lahan baru di sekitar kawasan hutan untuk meningkatkan kegiatan ekonomi masyarakat. Di sisi lain, petugas konservasi khawatir pembukaan lahan tersebut dapat mempercepat penurunan populasi Lutung Jawa.",
      conclusion: "Setelah membaca studi kasus dan mengamati kondisi habitat, jawablah pertanyaan berikut.",
      tableData: [
        { component: "Populasi Lutung Jawa", condition: "Menurun dari tahun ke tahun" },
        { component: "Pohon Ficus", condition: "Jumlahnya berkurang" },
        { component: "Pohon besar", condition: "Sebagian ditebang sehingga kanopi terputus" },
        { component: "Vegetasi hutan", condition: "Semakin sedikit" },
        { component: "Sungai", condition: "Kondisinya masih baik" },
        { component: "Cahaya matahari", condition: "Tetap tersedia" }
      ],
      chartData: [
        { year: "2023", population: 40 },
        { year: "2024", population: 34 },
        { year: "2025", population: 27 }
      ]
    },
    question: "Berdasarkan studi kasus, hasil eksplorasi, dan data pengamatan, analisislah penyebab utama menurunnya populasi Lutung Jawa di kawasan konservasi tersebut. Jelaskan hubungan antara sumber pakan, tempat berlindung, dan kondisi habitat dengan penurunan populasi Lutung Jawa.",
    options: [
      { key: "A", text: "Penurunan populasi Lutung Jawa disebabkan oleh berkurangnya sumber pakan, tempat berlindung, dan terputusnya kanopi hutan akibat pembukaan lahan." },
      { key: "B", text: "Penurunan populasi Lutung Jawa disebabkan oleh kondisi sungai yang tidak lagi mampu memenuhi kebutuhan satwa." },
      { key: "C", text: "Penurunan populasi Lutung Jawa disebabkan oleh berkurangnya cahaya matahari yang masuk ke kawasan hutan." },
      { key: "D", text: "Penurunan populasi Lutung Jawa disebabkan oleh pertambahan jumlah Lutung Jawa sehingga terjadi persaingan antarkelompok." }
    ],
    correctAnswer: "A",
    videoUrl: "https://www.youtube.com/embed/Pj196Yh2KSc",
    discussion: "Bagus! Kamu telah berhasil menganalisis penyebab permasalahan berdasarkan hubungan antar komponen dalam ekosistem.\n\nPopulasi Lutung Jawa tidak menurun begitu saja. Berkurangnya vegetasi menyebabkan sumber makanan dan tempat berlindung menjadi terbatas. Kanopi pohon yang terputus juga menghambat pergerakan Lutung Jawa saat mencari makan. Kondisi tersebut membuat habitat menjadi kurang sesuai sehingga sebagian Lutung Jawa berpindah ke wilayah lain dan jumlah populasinya di kawasan tersebut terus menurun.",
    badgeName: "Pecinta Daun (Leaf Lover)",
    badgeIcon: "🍃",
    badgeDescription: "Lencana atas keberhasilan menganalisis hubungan antar-komponen ekosistem dan penyebab penurunan populasi Lutung Jawa."
  },
  {
    level: 3,
    theme: "Status Konservasi & Ancaman",
    title: "Pelindung Satwa",
    material: "Lutung Jawa diklasifikasikan sebagai satwa 'Vulnerable' (Rentan) oleh IUCN Red List dan termasuk dalam Appendix II CITES. Ancaman terbesar kepunahan mereka adalah fragmentasi habitat akibat alih fungsi hutan menjadi lahan pertanian, pemukiman, serta perburuan liar untuk dijadikan hewan peliharaan rumah tangga.",
    question: "Apa ancaman terbesar utama yang mendorong kepunahan populasi Lutung Jawa di alam liar saat ini?",
    options: [
      { key: "A", text: "Perubahan cuaca ekstrem akibat pemanasan global" },
      { key: "B", text: "Persaingan ketat dalam berburu makanan dengan monyet ekor panjang" },
      { key: "C", text: "Fragmentasi/kerusakan habitat dan maraknya perburuan liar untuk perdagangan peliharaan" },
      { key: "D", text: "Serangan wabah virus musiman di dalam ekosistem hutan" }
    ],
    correctAnswer: "C",
    videoUrl: "https://www.youtube.com/embed/tM03S3-l-n4",
    discussion: "Jawaban yang benar adalah C. Kerusakan dan penyusutan luas hutan memisahkan kelompok-kelompok lutung (fragmentasi), sedangkan perburuan liar untuk perdagangan ilegal hewan peliharaan secara langsung memotong rantai populasi produktif mereka di alam bebas.",
    badgeName: "Penjaga Kehidupan (Life Guard)",
    badgeDescription: "Lencana atas kesadaran tinggi mengenai ancaman kepunahan Lutung Jawa."
  },
  {
    level: 4,
    theme: "Perilaku Sosial & Reproduksi",
    title: "Pengamat Sosial",
    material: "Lutung Jawa hidup berkelompok dengan sistem sosial 'harem'—satu kelompok biasanya dipimpin oleh satu jantan dominan dengan beberapa betina dewasa (5-15 ekor) serta anak-anak mereka. Yang unik, bayi Lutung Jawa lahir dengan rambut berwarna oranye keemasan terang. Warna mencolok ini akan berubah perlahan menjadi hitam pekat saat mereka berusia 3-5 bulan.",
    question: "Apa fungsi adaptif utama dari rambut bayi Lutung Jawa yang berwarna oranye terang mencolok?",
    options: [
      { key: "A", text: "Untuk menyamar (kamuflase) di antara daun-daun kering musim gugur" },
      { key: "B", text: "Menarik perhatian anggota kelompok lain agar ikut menjaga dan mengasuhnya (alloparental care)" },
      { key: "C", text: "Merupakan kelainan warna bawaan dari pejantan dominan" },
      { key: "D", text: "Untuk menakuti predator malam seperti macan tutul" }
    ],
    correctAnswer: "B",
    videoUrl: "https://www.youtube.com/embed/5_7t72B9k0I",
    discussion: "Jawaban yang benar adalah B. Warna oranye terang pada bayi lutung merangsang naluri keibuan dan kepedulian seluruh betina dalam kelompok untuk mengasuhnya bersama (alloparenting), serta mempermudah pengawasan posisi bayi di kerimbunan hutan.",
    badgeName: "Penjaga Bayi Oranye (Baby Guardian)",
    badgeDescription: "Lencana atas pemahaman perilaku sosial dan reproduksi keluarga Lutung."
  },
  {
    level: 5,
    theme: "Aksi Konservasi & Penyelamatan",
    title: "Pahlawan Reintroduksi",
    material: "Upaya penyelamatan Lutung Jawa melibatkan pusat rehabilitasi khusus seperti Javan Langur Center (JLC). Lutung hasil sitaan dipulihkan kesehatannya, dilatih kembali di 'Sekolah Hutan' untuk memulihkan insting liar mereka (memanjat, mencari makan alami, bersosialisasi), sebelum akhirnya dilepaskan kembali (reintroduksi) ke kawasan hutan lindung.",
    question: "Mengapa Lutung Jawa hasil sitaan dari peliharaan manusia tidak boleh langsung dilepaskan ke hutan liar?",
    options: [
      { key: "A", text: "Mereka harus dijinakkan dulu agar tidak menyerang tim pelepasliaran" },
      { key: "B", text: "Supaya mereka terbiasa bersahabat dengan manusia pemburu di dalam hutan" },
      { key: "C", text: "Untuk mengembalikan insting liar mereka, melatih cara bertahan hidup, dan memastikan bebas dari penularan penyakit manusia" },
      { key: "D", text: "Mereka dilatih untuk melakukan pertunjukan edukasi wisata alam terlebih dahulu" }
    ],
    correctAnswer: "C",
    videoUrl: "https://www.youtube.com/embed/uGvV9N6j_L8",
    discussion: "Jawaban yang benar adalah C. Lutung peliharaan sering kali kehilangan insting bertahan hidup dan dapat membawa virus/penyakit dari manusia. Sekolah hutan memulihkan insting liarnya dan proses karantina memastikan mereka tidak menyebarkan penyakit ke populasi liar.",
    badgeName: "Pahlawan Konservasi (Conservation Hero)",
    badgeDescription: "Lencana tertinggi atas kelulusan materi aksi nyata konservasi Lutung Jawa!"
  }
];
