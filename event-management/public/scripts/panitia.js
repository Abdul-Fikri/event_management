/**
 * panitia.js - CRUD, Filter, Search, Pagination, & State Logic untuk Manajemen Panitia Takumi Festival 2025
 */

(function () {
  'use strict';

  // ─── 1. DATA STORE (In-Memory 64 Data Panitia) ─────────────────────────────
  let panitiaList = [
    {
      id: 'PNT-001',
      name: 'Amalia Putri',
      role: 'Penanggung Jawab Harian',
      contact: '0812-3456-7890',
      divisi: 'Acara',
      jabatan: 'Koordinator Utama',
      status: 'Aktif',
      notes: 'Bertanggung jawab atas koordinasi master rundown panggung utama dan penyelarasan waktu gladi bersih seluruh artis pendukung.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKBgJi7WF-LYFKlBwCQnDs-su4qOP-ZqNu-d3ELPFI5Lv2ScfnO7CyQSDMusmP1huXCcgTmNrl_YRJ6jWnITnOoq8-_0MRSbKEbwbSs3QzXRI2Qn6tj3sCk5kc7ga2EAhQj8_hcZjzG7-h1Yk_eKqVJHrJchyCqXC27GHUTR_7PL90I1bxJqnWIilG7lwpdBzf4w0nd8jNHgSruS4lmQWvlQABbQ6d7JyvMU-CrGmjbg3-0XE1-XLw'
    },
    {
      id: 'PNT-002',
      name: 'Dimas Pratama',
      role: 'Stok & Gudang Utama',
      contact: '0813-9876-5432',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Mengatur alur inventaris rig panggung, sistem tata suara, genset cadangan 100kVA, dan perlengkapan stan festival.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDjYbZEFK3V3j-dekpiFJA-XQ_6RnaLYhF_jPiVSkMDKIILVryWenhxNMZr4j6TqGTputHYkJWrIG3ahfLxAKKBS0VNRB_kP_f6uJtvEJaTXuXIo47wyFsXJLtAtQIE2RQwrETMenSS1BWoJQwm-N2qCdmJFWvDQ9_OHAJC6PCgjjL-BeKJJgGeT-ysIYwBedOkYR1pUhKh5eP1qVA1gxgpqGptXS0VyomtykPyO2Wt_Fky2ATmMJx'
    },
    {
      id: 'PNT-003',
      name: 'Farah Nabila',
      role: 'Hubungan Mitra & Brand',
      contact: '0821-4567-8901',
      divisi: 'Sponsorship',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Memegang komunikasi dengan 12 sponsor komersial platinum dan media partner tier-1.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA8WaHg-GzrTRliKQcAVwKu-UROWFqzQ_UZYE45ruKgYDXVn-I2zszfsawebb8vUsiFxIvUGIrjS6e6GaUGJFX5JSOqSD4NSeR_oMcWvkfJnrF0G_zdwVKdYfxtAEa1OiiEB7GjFKvfPGoh1WuvtCWPwOuz1zW182fhhop3gskiHd1QeiZCkJm7NwS-klSMBDiWyhnAdFfKHdc229eghNyMmo3UfZ9b-kEXxGK3GCquGUItngqwWMJ'
    },
    {
      id: 'PNT-004',
      name: 'Rian Ardiansyah',
      role: 'Kurasi Stan Kuliner',
      contact: '0857-1122-3344',
      divisi: 'Lomba & Tenant',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Mengatur penempatan 25 tenant kuliner dan zonasi stan komunitas kreatif.',
      avatar: null
    },
    {
      id: 'PNT-005',
      name: 'Jessica Tan',
      role: 'Media Sosial & Press',
      contact: '0878-2233-4455',
      divisi: 'Humas & Publikasi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Operator liputan live Instagram Stories dan TikTok resmi Takumi Festival.',
      avatar: null
    },
    {
      id: 'PNT-006',
      name: 'Ahmad Fauzi',
      role: 'Gate Barat & Perimeter',
      contact: '0819-3344-5566',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Penanggung jawab pos penjagaan gerbang barat dan jalur evakuasi darurat.',
      avatar: null
    },
    {
      id: 'PNT-007',
      name: 'Gita Savitri',
      role: 'Logistik Makanan Artis & Kru',
      contact: '0812-9988-7766',
      divisi: 'Konsumsi',
      jabatan: 'Bendahara',
      status: 'Aktif',
      notes: 'Distribusi 250 porsi konsumsi artis, pengisi acara, dan relawan festival per shift.',
      avatar: null
    },
    {
      id: 'PNT-008',
      name: 'Kevin Sanjaya',
      role: 'LED Stage & Ticketing App',
      contact: '0852-6677-8899',
      divisi: 'Desain & IT',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Operator visuals resolusi 4K panggung utama dan pemeliharaan server scanner tiket.',
      avatar: null
    },
    {
      id: 'PNT-009',
      name: 'Budi Santoso',
      role: 'Stage Manager Panggung Utama',
      contact: '0812-1111-2222',
      divisi: 'Acara',
      jabatan: 'Wakil Koordinator',
      status: 'Aktif',
      notes: 'Memastikan kepatuhan waktu rundown tiap penampil tidak molor lebih dari 3 menit.',
      avatar: null
    },
    {
      id: 'PNT-010',
      name: 'Nadhira Zahra',
      role: 'Media Relations & Press Conference',
      contact: '0813-2222-3333',
      divisi: 'Humas & Publikasi',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Mengatur sesi wawancara jurnalis dengan bintang tamu dan siaran pers resmi.',
      avatar: null
    },
    {
      id: 'PNT-011',
      name: 'Bayu Nugroho',
      role: 'Audio System & Genset Crew',
      contact: '0856-3333-4444',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Teknisi kabel line array dan pemantauan beban watt audio system.',
      avatar: null
    },
    {
      id: 'PNT-012',
      name: 'Siti Rahmawati',
      role: 'Manajemen Katering & Distribusi',
      contact: '0821-4444-5555',
      divisi: 'Konsumsi',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'QC kebersihan makanan dan jadwal pengiriman makan siang & malam.',
      avatar: null
    },
    {
      id: 'PNT-013',
      name: 'Reza Pratama',
      role: 'Koordinator Ring 1 & VIP Escort',
      contact: '0877-5555-6666',
      divisi: 'Keamanan',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Pengawalan artis dari holding room ke bibir panggung dan koordinasi kepolisian.',
      avatar: null
    },
    {
      id: 'PNT-014',
      name: 'Cindy Clarissa',
      role: 'Rundown & Time Keeper Master',
      contact: '0818-6666-7777',
      divisi: 'Acara',
      jabatan: 'Sekretaris',
      status: 'Aktif',
      notes: 'Pengendali stopwatch panggung dan pencatat revisi rundown mendadak.',
      avatar: null
    },
    {
      id: 'PNT-015',
      name: 'Doni Setiawan',
      role: 'Web System & Network Infrastructure',
      contact: '0819-7777-8888',
      divisi: 'Desain & IT',
      jabatan: 'Koordinator Divisi',
      status: 'Aktif',
      notes: 'Menyediakan jaringan WiFi khusus panitia, live streaming, dan payment gateway.',
      avatar: null
    },
    {
      id: 'PNT-016',
      name: 'Eko Prasetyo',
      role: 'Rigging & Truss Panggung',
      contact: '0858-8888-9999',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Izin',
      notes: 'Izin kuliah sidang skripsi sampai jam 13:00 WIB, lanjut bertugas sore hari.',
      avatar: null
    },
    {
      id: 'PNT-017',
      name: 'Fani Anggraini',
      role: 'Registrasi Lomba Cosplay',
      contact: '0811-9999-0000',
      divisi: 'Lomba & Tenant',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Validasi nomor urut peserta cosplay dan pengecekan senjata properti tumpul.',
      avatar: null
    },
    {
      id: 'PNT-018',
      name: 'Gilang Ramadhan',
      role: 'Liaison Officer Guest Star',
      contact: '0822-1010-2020',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'LO artis band indie Tokyo Nights, memastikan rider terpenuhi tepat waktu.',
      avatar: null
    },
    {
      id: 'PNT-019',
      name: 'Hana Lestari',
      role: 'Aktivasi Booth Sponsor Platinum',
      contact: '0831-2020-3030',
      divisi: 'Sponsorship',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mendampingi perwakilan sponsor utama selama aktivasi booth interaktif.',
      avatar: null
    },
    {
      id: 'PNT-020',
      name: 'Indra Wijaya',
      role: 'Patroli Area Kreatif & Parkir',
      contact: '0859-3030-4040',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Monitoring ketertiban antrean parkir motor dan mencegah percaloan tiket.',
      avatar: null
    },
    {
      id: 'PNT-021',
      name: 'Jovita Aurelia',
      role: 'Visual Projection Mapping',
      contact: '0895-4040-5050',
      divisi: 'Desain & IT',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Operator laser dan visual opening ceremony di backdrop raksasa.',
      avatar: null
    },
    {
      id: 'PNT-022',
      name: 'Kuncoro Hadi',
      role: 'Tenda & Booth Constructor',
      contact: '0813-5050-6060',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Pengecekan kekokohan tiang tenda sarnafil terhadap hembusan angin kencang.',
      avatar: null
    },
    {
      id: 'PNT-023',
      name: 'Larasati Putri',
      role: 'Broadcast & Live Streaming',
      contact: '0821-6060-7070',
      divisi: 'Humas & Publikasi',
      jabatan: 'Sekretaris',
      status: 'Aktif',
      notes: 'Koordinator switcher multicam dan audio output untuk YouTube live stream.',
      avatar: null
    },
    {
      id: 'PNT-024',
      name: 'Muhammad Rizky',
      role: 'Floor Manager Hall B',
      contact: '0857-7070-8080',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menjaga alur keramaian penonton di Hall Workshop dan Pameran Komunitas.',
      avatar: null
    },
    {
      id: 'PNT-025',
      name: 'Nina Septiani',
      role: 'Penyediaan Air Mineral & Snack',
      contact: '0878-8080-9090',
      divisi: 'Konsumsi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menyediakan cooler box dan suplai hidrasi di 8 pos panitia setiap 2 jam.',
      avatar: null
    },
    {
      id: 'PNT-026',
      name: 'Oscar Darmawan',
      role: 'Regu Cadangan Crowd Control',
      contact: '0812-9090-1010',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Cadangan',
      notes: 'Siaga di posko pusat untuk penguatan mendadak bila terjadi penumpukan penonton.',
      avatar: null
    },
    {
      id: 'PNT-027',
      name: 'Priscilia Mega',
      role: 'Koordinator Lomba Anisong',
      contact: '0838-1122-4455',
      divisi: 'Lomba & Tenant',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memeriksa track minus-one lagu peserta dan lembar penilaian 3 dewan juri.',
      avatar: null
    },
    {
      id: 'PNT-028',
      name: 'Qory Sandioriva',
      role: 'Branding Banner & Backdrop',
      contact: '0852-2233-5566',
      divisi: 'Sponsorship',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memastikan logo seluruh sponsor terpasang sesuai benefit kontrak di photobooth.',
      avatar: null
    },
    {
      id: 'PNT-029',
      name: 'Rendy Saputra',
      role: 'Inventarisasi Alat HT & Megafon',
      contact: '0896-3344-6677',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Bendahara',
      status: 'Aktif',
      notes: 'Pengisian daya 40 unit baterai HT dan distribusi channel operasional tiap divisi.',
      avatar: null
    },
    {
      id: 'PNT-030',
      name: 'Sarah Melati',
      role: 'Pendamping MC & Q&A Session',
      contact: '0815-4455-7788',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menyerahkan microphone wireless dan hadiah kuis interaktif penonton.',
      avatar: null
    },
    {
      id: 'PNT-031',
      name: 'Taufik Hidayat',
      role: 'Pemeriksaan Tiket & Metal Detector',
      contact: '0877-5566-8899',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memastikan penonton tidak membawa benda tajam atau botol kaca ke venue.',
      avatar: null
    },
    {
      id: 'PNT-032',
      name: 'Utami Wulandari',
      role: 'Dokumentasi Fotografi & Aftermovie',
      contact: '0817-6677-9900',
      divisi: 'Humas & Publikasi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Fotografer resmi panggung utama dan pembuat kompilasi video recap harian.',
      avatar: null
    },
    {
      id: 'PNT-033',
      name: 'Viko Pratama',
      role: 'Desain Feed Instagram & Motion Graphic',
      contact: '0823-7788-1122',
      divisi: 'Desain & IT',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Membuat bumper video pengumuman juara lomba dan pamflet digital jadwal acara.',
      avatar: null
    },
    {
      id: 'PNT-034',
      name: 'Wahyu Triyono',
      role: 'Kelistrikan & Lighting Support',
      contact: '0851-8899-2233',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Operator dimmer moving head panggung dan lampu sorot area food court.',
      avatar: null
    },
    {
      id: 'PNT-035',
      name: 'Xavier Alexander',
      role: 'Kurasi Musik & BGM Operator',
      contact: '0831-9900-3344',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memutar playlist musik khas festival Jepang saat jeda perpindahan pengisi acara.',
      avatar: null
    },
    {
      id: 'PNT-036',
      name: 'Yasmin Maharani',
      role: 'Registrasi Stan Komunitas',
      contact: '0897-0011-4455',
      divisi: 'Lomba & Tenant',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Membagikan name tag tenant dan mengawasi batasan display stand komunitas.',
      avatar: null
    },
    {
      id: 'PNT-037',
      name: 'Zacky Kurnia',
      role: 'Distribusi Makan Siang Panitia Shift 1',
      contact: '0812-1234-9876',
      divisi: 'Konsumsi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mengirim 80 boks makanan ke posko medis, keamanan pintu, dan panggung.',
      avatar: null
    },
    {
      id: 'PNT-038',
      name: 'Aditya Rahman',
      role: 'Pengamanan Panggung Artis',
      contact: '0813-2345-8765',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Sterilisasi area barricade pit panggung utama dari desakan penonton.',
      avatar: null
    },
    {
      id: 'PNT-039',
      name: 'Bella Saphira',
      role: 'Pemandu Flashmob & Parade Cosplay',
      contact: '0821-3456-7654',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mengarahkan formasi 100 cosplayer dalam parade keliling selasar festival.',
      avatar: null
    },
    {
      id: 'PNT-040',
      name: 'Candra Kirana',
      role: 'Peralatan Barikade & Meja Registrasi',
      contact: '0856-4567-6543',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memasang pembatas antrean tiket dan 20 set meja registrasi masuk.',
      avatar: null
    },
    {
      id: 'PNT-041',
      name: 'Dwi Cahyo',
      role: 'Kemitraan Media Partner Kampus',
      contact: '0878-5678-5432',
      divisi: 'Humas & Publikasi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menyebarkan poster dan link registrasi ke 15 BEM universitas se-Jabodetabek.',
      avatar: null
    },
    {
      id: 'PNT-042',
      name: 'Eva Novita',
      role: 'Rekap Penilaian Juri Lomba',
      contact: '0819-6789-4321',
      divisi: 'Lomba & Tenant',
      jabatan: 'Sekretaris',
      status: 'Aktif',
      notes: 'Menginput skor lomba fotografi dan kaligrafi ke spreadsheet perhitungan juara.',
      avatar: null
    },
    {
      id: 'PNT-043',
      name: 'Fajar Nugraha',
      role: 'Pengawasan Pintu Masuk Evakuasi',
      contact: '0852-7890-3210',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memastikan pintu darurat selalu bebas dari halangan dan siap dibuka seketika.',
      avatar: null
    },
    {
      id: 'PNT-044',
      name: 'Galih Permana',
      role: 'Petugas Cue Card & Stage Timer',
      contact: '0811-8901-2109',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memberikan isyarat sisa waktu 5 menit dan 1 menit kepada pengisi panggung.',
      avatar: null
    },
    {
      id: 'PNT-045',
      name: 'Hesty Purwanti',
      role: 'Logistik Kopi & Teh Panitia',
      contact: '0822-9012-1098',
      divisi: 'Konsumsi',
      jabatan: 'Anggota',
      status: 'Izin',
      notes: 'Izin tugas shift pagi karena dinas kampus, masuk mulai pukul 14:30 WIB.',
      avatar: null
    },
    {
      id: 'PNT-046',
      name: 'Ilham Ramadhan',
      role: 'Pengangkutan Properti Panggung',
      contact: '0838-0123-0987',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mengatur troli drum set, amplifier gitar, dan keyboard stand antar performer.',
      avatar: null
    },
    {
      id: 'PNT-047',
      name: 'Julia Perez',
      role: 'Penyediaan Goodie Bag Sponsor',
      contact: '0857-1234-9870',
      divisi: 'Sponsorship',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mengemas 500 paket suvenir sponsor untuk pemegang tiket VIP dan tamu khusus.',
      avatar: null
    },
    {
      id: 'PNT-048',
      name: 'Kenzo Maulana',
      role: 'Penjemputan Artis dari Hotel',
      contact: '0877-2345-8769',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Driver kendaraan khusus rombongan cosplayer tamu internasional dari bandara.',
      avatar: null
    },
    {
      id: 'PNT-049',
      name: 'Linda Kusumawati',
      role: 'Kebersihan & Kerapian Area Tenant',
      contact: '0896-3456-7658',
      divisi: 'Lomba & Tenant',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Koordinasi pemilahan sampah basah/kering dengan tim kebersihan pengelola venue.',
      avatar: null
    },
    {
      id: 'PNT-050',
      name: 'Mario Teguh',
      role: 'Penyisiran Zona B & Parkir Barat',
      contact: '0814-4567-6547',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Patroli berkala memeriksa keamanan barang bawaan di area kuliner outdoor.',
      avatar: null
    },
    {
      id: 'PNT-051',
      name: 'Nadia Safitri',
      role: 'Konten Tik-Tok & Reels Live',
      contact: '0853-5678-5436',
      divisi: 'Humas & Publikasi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Membuat video wawancara keseruan pengunjung dan mengunggah highlight tren.',
      avatar: null
    },
    {
      id: 'PNT-052',
      name: 'Oki Lukman',
      role: 'Perbaikan AC Portable & Blower',
      contact: '0821-6789-4325',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memantau kecukupan air misty fan dan suhu ruang ganti artis tetap sejuk.',
      avatar: null
    },
    {
      id: 'PNT-053',
      name: 'Putri Ayuningtyas',
      role: 'Penyambutan Tamu Undangan VIP',
      contact: '0878-7890-3214',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menyematkan pita VIP dan mengantar tamu kedutaan ke baris kursi kehormatan.',
      avatar: null
    },
    {
      id: 'PNT-054',
      name: 'Qabil Firmansyah',
      role: 'Pengaturan Arus Keluar Penonton',
      contact: '0819-8901-2103',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Membuka gate tambahan saat konser penutup selesai untuk mencegah desak-desakan.',
      avatar: null
    },
    {
      id: 'PNT-055',
      name: 'Riko Simanjuntak',
      role: 'Operator Livestream YouTube',
      contact: '0838-9012-1092',
      divisi: 'Desain & IT',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memantau bitrate video 1080p60 dan moderasi chat interaktif live streaming.',
      avatar: null
    },
    {
      id: 'PNT-056',
      name: 'Siska Amelia',
      role: 'Distribusi Makanan Shift Malam',
      contact: '0852-0123-0981',
      divisi: 'Konsumsi',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Membagikan supper dan minuman hangat untuk seluruh kru saat proses loading out.',
      avatar: null
    },
    {
      id: 'PNT-057',
      name: 'Tommy Kurniawan',
      role: 'Pembongkaran & Packing Pasca Acara',
      contact: '0811-1234-8765',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memimpin loading out barang inventaris sewa masuk ke armada truk ekspedisi.',
      avatar: null
    },
    {
      id: 'PNT-058',
      name: 'Ulfa Dwiyanti',
      role: 'Asisten Koreografer Flashmob',
      contact: '0822-2345-7654',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memberi aba-aba musik intro tarian Bon Odori massal di lapangan tengah.',
      avatar: null
    },
    {
      id: 'PNT-059',
      name: 'Vina Panduwinata',
      role: 'Penyerahan Trofi & Piagam Lomba',
      contact: '0856-3456-6543',
      divisi: 'Lomba & Tenant',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Menyiapkan trofi akrilik dan plakat penghargaan di atas nampan seremonial.',
      avatar: null
    },
    {
      id: 'PNT-060',
      name: 'Wawan Hendrawan',
      role: 'Penjagaan Backstage & Ruang Ganti',
      contact: '0877-4567-5432',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Hanya memperbolehkan pemegang id card All Access masuk ke selasar backstage.',
      avatar: null
    },
    {
      id: 'PNT-061',
      name: 'Xena Warrior',
      role: 'Koordinator Workshop Origami & Kaligrafi',
      contact: '0818-5678-4321',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Mendampingi instruktur sensei Jepang dan menyediakan kertas washi peserta.',
      avatar: null
    },
    {
      id: 'PNT-062',
      name: 'Yayan Ruhian',
      role: 'Koordinator Tim Keamanan Khusus',
      contact: '0895-6789-3210',
      divisi: 'Keamanan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Penanganan cepat kendala medis atau gangguan ketertiban di area penonton.',
      avatar: null
    },
    {
      id: 'PNT-063',
      name: 'Zaskia Sungkar',
      role: 'MC Protokoler Pembukaan & Penutupan',
      contact: '0812-7890-2109',
      divisi: 'Acara',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memandu sesi sambutan rektorat, pemukulan gong taiko, dan doa bersama.',
      avatar: null
    },
    {
      id: 'PNT-064',
      name: 'Bima Satria',
      role: 'Monitoring Pemakaian Daya Listrik PLN',
      contact: '0813-8901-1098',
      divisi: 'Logistik & Perlengkapan',
      jabatan: 'Anggota',
      status: 'Aktif',
      notes: 'Memastikan panel distribusi trafo tidak mengalami overload ataupun trip MCB.',
      avatar: null
    }
  ];

  // State Variables
  let filteredPanitia = [...panitiaList];
  let currentPage = 1;
  const itemsPerPage = 8;
  let currentDeleteId = null;

  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const filterDivisi = document.getElementById('filter-divisi');
  const filterJabatan = document.getElementById('filter-jabatan');
  const btnResetFilter = document.getElementById('btn-reset-filter');
  const btnClearSearchEmpty = document.getElementById('btn-clear-search-empty');
  const tableBody = document.getElementById('panitia-table-body');
  const tableEmptyState = document.getElementById('table-empty-state');
  const paginationInfo = document.getElementById('panitia-pagination-info');
  const paginationButtons = document.getElementById('panitia-pagination-buttons');

  // Stats Elements
  const statTotalPanitia = document.getElementById('stat-total-panitia');
  const pillTotalPanitia = document.getElementById('pill-total-panitia');
  const statTotalDivisi = document.getElementById('stat-total-divisi');
  const statTotalHadir = document.getElementById('stat-total-hadir');
  const statTotalIzin = document.getElementById('stat-total-izin');

  // Modals Elements
  const modalPanitia = document.getElementById('modal-panitia');
  const modalPanitiaTitle = document.getElementById('modal-panitia-title');
  const modalPanitiaIcon = document.getElementById('modal-panitia-icon');
  const formPanitia = document.getElementById('form-panitia');
  const btnTambahPanitia = document.getElementById('btn-tambah-panitia');
  const btnModalClose = document.getElementById('btn-modal-close');
  const btnModalCancel = document.getElementById('btn-modal-cancel');
  const inputEditId = document.getElementById('input-edit-id');
  const inputNama = document.getElementById('input-nama');
  const inputKontak = document.getElementById('input-kontak');
  const inputDivisi = document.getElementById('input-divisi');
  const inputJabatan = document.getElementById('input-jabatan');
  const inputStatus = document.getElementById('input-status');
  const inputCatatan = document.getElementById('input-catatan');
  const inputPanitiaId = document.getElementById('input-panitia-id');

  // Delete Modal Elements
  const modalDelete = document.getElementById('modal-delete');
  const btnCancelDelete = document.getElementById('btn-cancel-delete');
  const btnConfirmDelete = document.getElementById('btn-confirm-delete');
  const deleteTargetId = document.getElementById('delete-target-id');
  const deleteTargetName = document.getElementById('delete-target-name');

  // Detail Modal Elements
  const modalDetail = document.getElementById('modal-detail');
  const btnCloseDetail = document.getElementById('btn-close-detail');
  const btnDoneDetail = document.getElementById('btn-done-detail');
  const detailAvatar = document.getElementById('detail-avatar');
  const detailId = document.getElementById('detail-id');
  const detailName = document.getElementById('detail-name');
  const detailTitle = document.getElementById('detail-title');
  const detailDivisi = document.getElementById('detail-divisi');
  const detailJabatan = document.getElementById('detail-jabatan');
  const detailKontak = document.getElementById('detail-kontak');
  const detailStatus = document.getElementById('detail-status');
  const detailCatatan = document.getElementById('detail-catatan');

  // Export Button
  const btnExport = document.getElementById('btn-export');

  // ─── 2. HELPER FUNCTIONS ──────────────────────────────────────────────────
  function getInitials(name) {
    if (!name) return 'PN';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function getDivisiBadgeClass(divisi) {
    switch (divisi) {
      case 'Acara':
        return 'bg-primary-fixed text-on-primary-fixed-variant';
      case 'Logistik & Perlengkapan':
      case 'Keamanan':
        return 'bg-secondary-fixed text-on-secondary-fixed-variant';
      case 'Sponsorship':
      case 'Desain & IT':
        return 'bg-tertiary-fixed text-on-tertiary-fixed-variant';
      case 'Medis':
        return 'bg-error-container text-on-error-container';
      default:
        return 'bg-surface-container-high text-primary';
    }
  }

  function getStatusBadge(status) {
    if (status === 'Aktif') {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold bg-surface-container-high text-primary">
        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
        Aktif
      </span>`;
    } else if (status === 'Izin') {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold bg-error-container/60 text-error">
        <span class="w-1.5 h-1.5 rounded-full bg-error"></span>
        Izin
      </span>`;
    } else {
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold bg-surface-container text-secondary">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        Cadangan
      </span>`;
    }
  }

  // Toast Notification
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container transition-all transform duration-300 translate-y-4 opacity-0';

    const icon = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
    const iconColor = type === 'success' ? 'text-primary' : (type === 'error' ? 'text-error' : 'text-secondary');

    toast.innerHTML = `
      <span class="material-symbols-outlined ${iconColor} text-headline-md">${icon}</span>
      <div class="flex flex-col">
        <span class="font-title-sm text-title-sm text-on-surface font-semibold">Pemberitahuan Sistem</span>
        <span class="font-body-sm text-body-sm text-on-surface-variant">${message}</span>
      </div>
      <button type="button" class="ml-2 text-outline hover:text-on-surface" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-body-md">close</span>
      </button>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  // ─── 3. UPDATE STATS / METRICS ─────────────────────────────────────────────
  function updateMetrics() {
    const total = panitiaList.length;
    const hadir = panitiaList.filter(p => p.status === 'Aktif').length;
    const izin = panitiaList.filter(p => p.status !== 'Aktif').length;
    const uniqueDivisi = new Set(panitiaList.map(p => p.divisi)).size;

    if (statTotalPanitia) statTotalPanitia.textContent = total;
    if (pillTotalPanitia) pillTotalPanitia.textContent = `${total} Personel Terdaftar`;
    if (statTotalDivisi) statTotalDivisi.textContent = uniqueDivisi;
    if (statTotalHadir) statTotalHadir.textContent = hadir;
    if (statTotalIzin) statTotalIzin.textContent = izin;
  }

  // ─── 4. RENDER TABLE & ROWS ────────────────────────────────────────────────
  function renderTable() {
    if (!tableBody) return;

    const total = filteredPanitia.length;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    if (currentPage < 1) {
      currentPage = 1;
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, total);
    const pageItems = filteredPanitia.slice(startIdx, endIdx);

    if (total === 0) {
      tableBody.innerHTML = '';
      if (tableEmptyState) {
        tableEmptyState.classList.remove('hidden');
        tableEmptyState.classList.add('flex');
      }
    } else {
      if (tableEmptyState) {
        tableEmptyState.classList.add('hidden');
        tableEmptyState.classList.remove('flex');
      }

      tableBody.innerHTML = pageItems.map((item, index) => {
        const rowNumber = startIdx + index + 1;
        const initials = getInitials(item.name);
        const divisiBadgeClass = getDivisiBadgeClass(item.divisi);
        const statusBadge = getStatusBadge(item.status);
        const cleanPhone = (item.contact || '').replace(/[^0-9]/g, '');
        const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;

        const avatarHtml = item.avatar
          ? `<img class="w-8 h-8 rounded-full object-cover shadow-sm" src="${item.avatar}" alt="${item.name}"/>`
          : `<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-sm shadow-sm">${initials}</div>`;

        return `
          <tr class="hover:bg-surface-container-low/60 transition-colors group" data-id="${item.id}">
            <td class="py-3.5 px-space-md text-center text-on-surface-variant font-medium">${rowNumber}</td>
            <td class="py-3.5 px-space-md">
              <span class="font-label-md text-label-md font-bold text-primary bg-surface-container-high px-2 py-0.5 rounded">${item.id}</span>
            </td>
            <td class="py-3.5 px-space-md">
              <div class="flex items-center gap-space-sm">
                ${avatarHtml}
                <div class="flex flex-col min-w-0">
                  <span class="font-title-sm text-title-sm text-on-surface font-semibold truncate name-field">${item.name}</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant truncate">${item.role || 'Personel Terjadwal'}</span>
                </div>
              </div>
            </td>
            <td class="py-3.5 px-space-md">
              <a class="inline-flex items-center gap-1 text-primary hover:underline font-label-md text-label-md contact-field" href="https://wa.me/${waNumber}" target="_blank">
                <span class="material-symbols-outlined text-body-sm text-primary">chat</span>
                <span>${item.contact}</span>
              </a>
            </td>
            <td class="py-3.5 px-space-md">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-semibold ${divisiBadgeClass} divisi-field">
                ${item.divisi}
              </span>
            </td>
            <td class="py-3.5 px-space-md">
              <span class="font-label-md text-label-md text-on-surface font-medium jabatan-field">${item.jabatan}</span>
            </td>
            <td class="py-3.5 px-space-md">
              ${statusBadge}
            </td>
            <td class="py-3.5 px-space-md text-center">
              <div class="flex items-center justify-center gap-1">
                <button class="btn-action-detail p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors" title="Lihat Detail" data-id="${item.id}" type="button">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">visibility</span>
                </button>
                <button class="btn-action-edit p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors" title="Edit Data" data-id="${item.id}" type="button">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">edit</span>
                </button>
                <button class="btn-action-delete p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded-lg transition-colors" title="Hapus Data" data-id="${item.id}" type="button">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Update Pagination Summary Text
    if (paginationInfo) {
      if (total === 0) {
        paginationInfo.innerHTML = 'Menampilkan <span class="font-semibold text-on-surface">0</span> dari <span class="font-semibold text-on-surface">0</span> panitia';
      } else {
        paginationInfo.innerHTML = `Menampilkan <span class="font-semibold text-on-surface">${startIdx + 1}</span> - <span class="font-semibold text-on-surface">${endIdx}</span> dari <span class="font-semibold text-on-surface">${total}</span> panitia`;
      }
    }

    renderPaginationButtons(totalPages);
  }

  // ─── 5. RENDER PAGINATION BUTTONS ──────────────────────────────────────────
  function renderPaginationButtons(totalPages) {
    if (!paginationButtons) return;

    if (totalPages <= 1) {
      paginationButtons.innerHTML = '';
      return;
    }

    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;

    let html = `
      <button id="btn-page-prev" class="h-9 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 shadow-sm ${prevDisabled ? 'opacity-40 cursor-not-allowed' : ''}" ${prevDisabled ? 'disabled' : ''} type="button">
        <span class="material-symbols-outlined text-body-md pointer-events-none">chevron_left</span>
        <span class="hidden sm:inline pointer-events-none">Prev</span>
      </button>
    `;

    // Calculate pages with ellipsis
    let pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    pages.forEach(p => {
      if (p === '...') {
        html += `<span class="px-1 text-outline font-label-md select-none">...</span>`;
      } else {
        const isActive = p === currentPage;
        if (isActive) {
          html += `<button data-page="${p}" class="h-9 w-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm" type="button">${p}</button>`;
        } else {
          html += `<button data-page="${p}" class="h-9 w-9 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors shadow-sm" type="button">${p}</button>`;
        }
      }
    });

    html += `
      <button id="btn-page-next" class="h-9 px-space-sm rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 shadow-sm ${nextDisabled ? 'opacity-40 cursor-not-allowed' : ''}" ${nextDisabled ? 'disabled' : ''} type="button">
        <span class="hidden sm:inline pointer-events-none">Next</span>
        <span class="material-symbols-outlined text-body-md pointer-events-none">chevron_right</span>
      </button>
    `;

    paginationButtons.innerHTML = html;

    // Attach Pagination Listeners
    const btnPrev = paginationButtons.querySelector('#btn-page-prev');
    if (btnPrev && !prevDisabled) {
      btnPrev.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
          scrollTableIntoView();
        }
      });
    }

    const btnNext = paginationButtons.querySelector('#btn-page-next');
    if (btnNext && !nextDisabled) {
      btnNext.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderTable();
          scrollTableIntoView();
        }
      });
    }

    paginationButtons.querySelectorAll('button[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
        if (targetPage && targetPage !== currentPage) {
          currentPage = targetPage;
          renderTable();
          scrollTableIntoView();
        }
      });
    });
  }

  function scrollTableIntoView() {
    const tableContainer = document.querySelector('.overflow-x-auto');
    if (tableContainer) {
      tableContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ─── 6. FILTER & SEARCH LOGIC ──────────────────────────────────────────────
  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const divisiVal = filterDivisi?.value || 'ALL';
    const jabatanVal = filterJabatan?.value || 'ALL';

    if (searchClear) {
      searchClear.classList.toggle('hidden', query.length === 0);
    }

    filteredPanitia = panitiaList.filter(item => {
      const matchQuery = !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.contact.toLowerCase().includes(query) ||
        (item.role && item.role.toLowerCase().includes(query)) ||
        item.jabatan.toLowerCase().includes(query) ||
        item.divisi.toLowerCase().includes(query);

      const matchDivisi = divisiVal === 'ALL' || item.divisi.toLowerCase() === divisiVal.toLowerCase();
      const matchJabatan = jabatanVal === 'ALL' || item.jabatan.toLowerCase() === jabatanVal.toLowerCase();

      return matchQuery && matchDivisi && matchJabatan;
    });

    currentPage = 1;
    renderTable();
  }

  // ─── 7. MODAL ACTIONS (ADD & EDIT) ─────────────────────────────────────────
  function openAddModal() {
    if (!formPanitia) return;
    formPanitia.reset();
    if (inputEditId) inputEditId.value = '';
    if (modalPanitiaTitle) modalPanitiaTitle.textContent = 'Tambah Data Panitia Baru';
    if (modalPanitiaIcon) modalPanitiaIcon.textContent = 'person_add';

    // Generate next ID
    const maxNumber = panitiaList.reduce((max, item) => {
      const num = parseInt(item.id.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num > max ? num : max;
    }, 0);
    const nextNum = maxNumber + 1;
    const autoId = 'PNT-' + String(nextNum).padStart(3, '0');
    if (inputPanitiaId) inputPanitiaId.value = `${autoId} (Otomatis)`;

    if (inputStatus) inputStatus.value = 'Aktif';

    if (modalPanitia) modalPanitia.classList.remove('hidden');
  }

  function openEditModal(id) {
    const item = panitiaList.find(p => p.id === id);
    if (!item) return;

    if (inputEditId) inputEditId.value = item.id;
    if (inputPanitiaId) inputPanitiaId.value = item.id;
    if (inputNama) inputNama.value = item.name;
    if (inputKontak) inputKontak.value = item.contact;
    if (inputDivisi) inputDivisi.value = item.divisi;
    if (inputJabatan) inputJabatan.value = item.jabatan;
    if (inputStatus) inputStatus.value = item.status || 'Aktif';
    if (inputCatatan) inputCatatan.value = item.notes || '';

    if (modalPanitiaTitle) modalPanitiaTitle.textContent = `Edit Data Panitia (${item.id})`;
    if (modalPanitiaIcon) modalPanitiaIcon.textContent = 'edit_note';

    if (modalPanitia) modalPanitia.classList.remove('hidden');
  }

  function closeModalPanitia() {
    if (modalPanitia) modalPanitia.classList.add('hidden');
    if (formPanitia) formPanitia.reset();
  }

  // ─── 8. DETAIL MODAL ───────────────────────────────────────────────────────
  function openDetailModal(id) {
    const item = panitiaList.find(p => p.id === id);
    if (!item || !modalDetail) return;

    const initials = getInitials(item.name);
    if (detailAvatar) {
      if (item.avatar) {
        detailAvatar.innerHTML = `<img src="${item.avatar}" alt="${item.name}" class="w-full h-full object-cover rounded-xl"/>`;
      } else {
        detailAvatar.textContent = initials;
      }
    }

    if (detailId) detailId.textContent = item.id;
    if (detailName) detailName.textContent = item.name;
    if (detailTitle) detailTitle.textContent = item.role ? `${item.role} - ${item.divisi}` : `Personel Divisi ${item.divisi}`;
    if (detailDivisi) detailDivisi.textContent = item.divisi;
    if (detailJabatan) detailJabatan.textContent = item.jabatan;
    if (detailKontak) detailKontak.textContent = item.contact;
    if (detailStatus) {
      detailStatus.textContent = item.status === 'Aktif' ? 'Siaga (Ready)' : (item.status === 'Izin' ? 'Izin (Dispensasi)' : 'Cadangan (Standby)');
    }
    if (detailCatatan) {
      detailCatatan.textContent = item.notes || 'Tidak ada catatan operasional khusus.';
    }

    modalDetail.classList.remove('hidden');
  }

  function closeDetailModal() {
    if (modalDetail) modalDetail.classList.add('hidden');
  }

  // ─── 9. DELETE MODAL ───────────────────────────────────────────────────────
  function openDeleteModal(id) {
    const item = panitiaList.find(p => p.id === id);
    if (!item || !modalDelete) return;

    currentDeleteId = item.id;
    if (deleteTargetId) deleteTargetId.textContent = item.id;
    if (deleteTargetName) deleteTargetName.textContent = item.name;

    modalDelete.classList.remove('hidden');
  }

  function closeDeleteModal() {
    if (modalDelete) modalDelete.classList.add('hidden');
    currentDeleteId = null;
  }

  function confirmDelete() {
    if (!currentDeleteId) return;

    const idx = panitiaList.findIndex(p => p.id === currentDeleteId);
    if (idx !== -1) {
      const deleted = panitiaList[idx];
      panitiaList.splice(idx, 1);
      showToast(`Data ${deleted.id} (${deleted.name}) berhasil dihapus!`, 'success');
      closeDeleteModal();
      updateMetrics();
      applyFilters();
    }
  }

  // ─── 10. EXPORT TO CSV ─────────────────────────────────────────────────────
  function exportToCsv() {
    const headers = ['ID Panitia', 'Nama Lengkap', 'Peran Operasional', 'Kontak WhatsApp', 'Divisi', 'Jabatan', 'Status', 'Catatan'];
    const rows = filteredPanitia.map(p => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${(p.role || '').replace(/"/g, '""')}"`,
      `"${p.contact}"`,
      `"${p.divisi}"`,
      `"${p.jabatan}"`,
      `"${p.status}"`,
      `"${(p.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Takumi_Panitia_Manifest_2025.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Manifest panitia berhasil diunduh (Takumi_Panitia_Manifest_2025.csv).', 'success');
  }

  // ─── 11. INITIALIZATION ────────────────────────────────────────────────────
  function init() {
    // Initial Render
    filteredPanitia = [...panitiaList];
    updateMetrics();
    renderTable();

    // Event Delegation for Table Row Action Buttons
    if (tableBody) {
      tableBody.addEventListener('click', (e) => {
        const btnDetail = e.target.closest('.btn-action-detail');
        if (btnDetail) {
          const id = btnDetail.getAttribute('data-id');
          if (id) openDetailModal(id);
          return;
        }

        const btnEdit = e.target.closest('.btn-action-edit');
        if (btnEdit) {
          const id = btnEdit.getAttribute('data-id');
          if (id) openEditModal(id);
          return;
        }

        const btnDelete = e.target.closest('.btn-action-delete');
        if (btnDelete) {
          const id = btnDelete.getAttribute('data-id');
          if (id) openDeleteModal(id);
          return;
        }
      });
    }

    // Search and Filters
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (filterDivisi) filterDivisi.addEventListener('change', applyFilters);
    if (filterJabatan) filterJabatan.addEventListener('change', applyFilters);

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          applyFilters();
          searchInput.focus();
        }
      });
    }

    if (btnResetFilter) {
      btnResetFilter.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (filterDivisi) filterDivisi.value = 'ALL';
        if (filterJabatan) filterJabatan.value = 'ALL';
        applyFilters();
        showToast('Semua filter berhasil disetel ulang.', 'info');
      });
    }

    if (btnClearSearchEmpty) {
      btnClearSearchEmpty.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (filterDivisi) filterDivisi.value = 'ALL';
        if (filterJabatan) filterJabatan.value = 'ALL';
        applyFilters();
      });
    }

    // Modal Add Open
    if (btnTambahPanitia) btnTambahPanitia.addEventListener('click', openAddModal);

    // Modal Add/Edit Close
    if (btnModalClose) btnModalClose.addEventListener('click', closeModalPanitia);
    if (btnModalCancel) btnModalCancel.addEventListener('click', closeModalPanitia);
    const modalPanitiaBackdrop = document.getElementById('modal-panitia-backdrop');
    if (modalPanitiaBackdrop) modalPanitiaBackdrop.addEventListener('click', closeModalPanitia);

    // Form Submit (Add or Edit)
    if (formPanitia) {
      formPanitia.addEventListener('submit', (e) => {
        e.preventDefault();
        const nama = inputNama ? inputNama.value.trim() : '';
        const kontak = inputKontak ? inputKontak.value.trim() : '';
        const divisi = inputDivisi ? inputDivisi.value : '';
        const jabatan = inputJabatan ? inputJabatan.value : '';
        const status = inputStatus ? inputStatus.value : 'Aktif';
        const catatan = inputCatatan ? inputCatatan.value.trim() : '';
        const editId = inputEditId ? inputEditId.value.trim() : '';

        if (!nama || !kontak || !divisi || !jabatan) {
          showToast('Harap lengkapi semua bidang bertanda bintang!', 'error');
          return;
        }

        if (editId) {
          // Edit existing
          const idx = panitiaList.findIndex(p => p.id === editId);
          if (idx !== -1) {
            panitiaList[idx].name = nama;
            panitiaList[idx].contact = kontak;
            panitiaList[idx].divisi = divisi;
            panitiaList[idx].jabatan = jabatan;
            panitiaList[idx].status = status;
            if (catatan) panitiaList[idx].notes = catatan;
            showToast(`Data panitia ${editId} (${nama}) berhasil diperbarui!`, 'success');
          }
        } else {
          // Add new
          const maxNumber = panitiaList.reduce((max, item) => {
            const num = parseInt(item.id.replace(/[^0-9]/g, ''), 10);
            return !isNaN(num) && num > max ? num : max;
          }, 0);
          const nextNum = maxNumber + 1;
          const newId = 'PNT-' + String(nextNum).padStart(3, '0');

          const newItem = {
            id: newId,
            name: nama,
            role: 'Personel Divisi ' + divisi,
            contact: kontak,
            divisi: divisi,
            jabatan: jabatan,
            status: status,
            notes: catatan || 'Personel baru ditambahkan ke sistem kepanitiaan.',
            avatar: null
          };

          panitiaList.unshift(newItem);
          showToast(`Data panitia baru ${newId} (${nama}) berhasil disimpan!`, 'success');
        }

        closeModalPanitia();
        updateMetrics();
        applyFilters();
      });
    }

    // Modal Detail Close
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeDetailModal);
    if (btnDoneDetail) btnDoneDetail.addEventListener('click', closeDetailModal);
    const modalDetailBackdrop = document.getElementById('modal-detail-backdrop');
    if (modalDetailBackdrop) modalDetailBackdrop.addEventListener('click', closeDetailModal);

    // Modal Delete Actions
    if (btnCancelDelete) btnCancelDelete.addEventListener('click', closeDeleteModal);
    if (btnConfirmDelete) btnConfirmDelete.addEventListener('click', confirmDelete);
    const modalDeleteBackdrop = document.getElementById('modal-delete-backdrop');
    if (modalDeleteBackdrop) modalDeleteBackdrop.addEventListener('click', closeDeleteModal);

    // Export Button
    if (btnExport) btnExport.addEventListener('click', exportToCsv);

    // Keyboard ESC to close all modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModalPanitia();
        closeDetailModal();
        closeDeleteModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
