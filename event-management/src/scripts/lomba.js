/**
 * lomba.js - CRUD, Filter, Search, Pagination & Statistik Dinamis
 * untuk Modul Manajemen Lomba (Takumi Festival).
 * Logic in-memory frontend sesuai arsitektur project.
 */

// ─── 1. SUMBER DATA UTAMA (IN-MEMORY DATA STORE) ────────────────────────────
let lombaList = [
  {
    id: 'LMB-01',
    nama: 'Cosplay Walk Competition',
    kategori: 'Cosplay & Performance',
    subdeskripsi: 'Kategori individu costume player karakter anime, game, & manga',
    kuotaTerdaftar: 45,
    kuotaTotal: 50,
    jadwal: '2025-10-18T11:00',
    lokasi: 'Hall A - Indoor',
    pic: 'Siti Rahma',
    role: 'Koord. Divisi Lomba',
    deskripsi: 'Lomba peragaan kostum karakter Jepang dengan durasi jalan panggung 60 detik per peserta. Penilaian meliputi akurasi kostum, gesture panggung, dan interaksi audiens.',
    hadiah: 4000000
  },
  {
    id: 'LMB-02',
    nama: 'J-Song Acoustic Cover Competition',
    kategori: 'Musik & Band',
    subdeskripsi: 'Format akustik maksimal 4 personel membawakan lagu Jepang',
    kuotaTerdaftar: 16,
    kuotaTotal: 16,
    jadwal: '2025-10-18T14:30',
    lokasi: 'Panggung Utama',
    pic: 'Farah Nabila',
    role: 'Staf Panggung & Musik',
    deskripsi: 'Kompetisi cover lagu anime atau J-Rock format akustik 2-4 orang. Waktu tampil 12 menit termasuk cek suara ringkas.',
    hadiah: 3000000
  },
  {
    id: 'LMB-03',
    nama: 'Anime Fanart & Digital Illustration',
    kategori: 'Seni Visual',
    subdeskripsi: 'Lomba live drawing digital bertema Maskot Takumi Matsuri',
    kuotaTerdaftar: 32,
    kuotaTotal: 40,
    jadwal: '2025-10-19T10:00',
    lokasi: 'Ruang Workshop 2',
    pic: 'Kevin Sanjaya',
    role: 'Staf Teknis Kreatif',
    deskripsi: 'Live drawing 180 menit menggunakan perangkat tablet masing-masing. Tema diberikan saat acara dimulai.',
    hadiah: 2500000
  },
  {
    id: 'LMB-04',
    nama: 'Anisong Dance Cover Showcase',
    kategori: 'Dance & Performance',
    subdeskripsi: 'Kompetisi dance cover grup idol atau anisong soundtrack',
    kuotaTerdaftar: 20,
    kuotaTotal: 20,
    jadwal: '2025-10-19T15:00',
    lokasi: 'Panggung Utama',
    pic: 'Siti Rahma',
    role: 'Koord. Divisi Lomba',
    deskripsi: 'Dance cover grup (3-7 orang), penilaian mencakup sinkronisasi gerakan, ekspresi, serta kostum representatif.',
    hadiah: 3000000
  },
  {
    id: 'LMB-05',
    nama: 'Shodo (Kaligrafi Tradisional Jepang)',
    kategori: 'Kebudayaan Jepang',
    subdeskripsi: 'Penulisan karakter Kanji menggunakan kuas dan tinta tradisional',
    kuotaTerdaftar: 24,
    kuotaTotal: 30,
    jadwal: '2025-10-19T13:00',
    lokasi: 'Ruang Workshop 1',
    pic: 'Siti Rahma',
    role: 'Koord. Divisi Lomba',
    deskripsi: 'Disediakan kertas hanshi dan tinta sumi. Tiga kanji wajib ditentukan oleh juri tamu dari Konsulat Jepang.',
    hadiah: 1500000
  },
  {
    id: 'LMB-06',
    nama: 'Karaoke Sing-Off Anisong Battle',
    kategori: 'Musik & Vokal',
    subdeskripsi: 'Turnamen duel vokal 1 lawan 1 sistem gugur instan',
    kuotaTerdaftar: 25,
    kuotaTotal: 30,
    jadwal: '2025-10-20T11:30',
    lokasi: 'Stage Outdoor Mini',
    pic: 'Farah Nabila',
    role: 'Staf Panggung & Musik',
    deskripsi: 'Sistem pertarungan panggung live skor karaoke mesin JOYSOUND dan votum juri panggung.',
    hadiah: 2000000
  },
  {
    id: 'LMB-07',
    nama: 'Cosplay Team Skit & Performance',
    kategori: 'Cosplay & Teater',
    subdeskripsi: 'Teater kabaret panggung dengan alur cerita dan efek koreografi',
    kuotaTerdaftar: 12,
    kuotaTotal: 12,
    jadwal: '2025-10-20T14:00',
    lokasi: 'Main Stage',
    pic: 'Siti Rahma',
    role: 'Koord. Divisi Lomba',
    deskripsi: 'Durasi drama 10 menit dengan dukungan soundscape audio prerecorded dan lighting panggung utama festival.',
    hadiah: 1500000
  },
  {
    id: 'LMB-08',
    nama: 'Japanese Trivia & Pop Culture Quiz',
    kategori: 'Trivia Quiz',
    subdeskripsi: 'Kuis cepat tepat seputar sejarah, pop culture anime, & kuliner Jepang',
    kuotaTerdaftar: 10,
    kuotaTotal: 15,
    jadwal: '2025-10-20T16:30',
    lokasi: 'Ruang Workshop 2',
    pic: 'Siti Rahma',
    role: 'Koord. Divisi Lomba',
    deskripsi: 'Kuis cerdas cermat berkelompok 3 orang. Mencakup materi sejarah feodal hingga anime musim gugur 2025.',
    hadiah: 1000000
  }
];

// ─── 2. STATE APLIKASI ──────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let currentSearchQuery = '';
let currentCategoryFilter = 'all';
let itemToDeleteId = null;

// ─── 3. UTILITAS ────────────────────────────────────────────────────────────
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getInitials(name) {
  if (!name) return '??';
  return name.split(/[\s]+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

function getPicAvatarClass(picName) {
  if (!picName) return 'bg-primary-fixed text-on-primary-fixed';
  if (picName.includes('Farah')) return 'bg-secondary-container text-on-secondary-container';
  if (picName.includes('Kevin')) return 'bg-tertiary-fixed text-on-tertiary-fixed';
  return 'bg-primary-fixed text-on-primary-fixed';
}

function getLocationIcon(loc) {
  if (!loc) return 'apartment';
  if (loc.includes('Hall')) return 'apartment';
  if (loc.includes('Panggung') || loc.includes('Main Stage')) return 'language_chinese_quick';
  if (loc.includes('Workshop')) return 'meeting_room';
  if (loc.includes('Outdoor') || loc.includes('Stage')) return 'mic';
  if (loc.includes('Quiz')) return 'quiz';
  return 'place';
}

function formatSchedule(datetimeStr) {
  if (!datetimeStr) return { dateStr: '-', timeStr: '-' };
  const d = new Date(datetimeStr);
  if (isNaN(d.getTime())) {
    return { dateStr: datetimeStr, timeStr: '' };
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return {
    dateStr: `${day} ${month} ${year}`,
    timeStr: `${hours}:${minutes} WIB`
  };
}

function formatCurrency(amount) {
  return 'Rp ' + Number(amount || 0).toLocaleString('id-ID');
}

function generateNextId() {
  if (lombaList.length === 0) return 'LMB-01';
  const numbers = lombaList.map(item => {
    const match = item.id.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  });
  const maxNumber = Math.max(0, ...numbers);
  return 'LMB-' + String(maxNumber + 1).padStart(2, '0');
}

// ─── 4. FILTER & PENCARIAN ──────────────────────────────────────────────────
function getFilteredLomba() {
  const query = currentSearchQuery.toLowerCase().trim();
  const catFilter = currentCategoryFilter;

  return lombaList.filter(item => {
    // 1. Filter Pencarian: nama, id, kategori, pic, lokasi
    const matchSearch = !query ||
      item.nama.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.kategori.toLowerCase().includes(query) ||
      item.pic.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query);

    // 2. Filter Kategori Tab
    let matchCat = true;
    if (catFilter !== 'all') {
      const itemCat = item.kategori.toLowerCase();
      const filterKey = catFilter.toLowerCase();
      if (filterKey === 'cosplay') {
        matchCat = itemCat.includes('cosplay') || itemCat.includes('dance') || itemCat.includes('perf');
      } else if (filterKey === 'musik') {
        matchCat = itemCat.includes('musik') || itemCat.includes('song') || itemCat.includes('vokal') || itemCat.includes('band');
      } else if (filterKey === 'seni') {
        matchCat = itemCat.includes('seni') || itemCat.includes('visual') || itemCat.includes('illustration') || itemCat.includes('art');
      } else if (filterKey === 'kebudayaan') {
        matchCat = itemCat.includes('budaya') || itemCat.includes('jepang') || itemCat.includes('shodo') || itemCat.includes('trivia') || itemCat.includes('quiz');
      } else {
        matchCat = itemCat.includes(filterKey);
      }
    }

    return matchSearch && matchCat;
  });
}

// ─── 5. RINGKASAN STATISTIK DINAMIS ─────────────────────────────────────────
function updateLombaSummary() {
  // 1. Total Cabang (Jumlah Kategori Unik Aktif)
  const uniqueCategories = new Set(
    lombaList.map(item => item.kategori ? item.kategori.trim() : '').filter(Boolean)
  );
  const totalCabangEl = document.getElementById('stat-total-cabang');
  if (totalCabangEl) {
    totalCabangEl.textContent = String(uniqueCategories.size);
  }

  // 2. Peserta Terdaftar & Total Kuota
  let totalPeserta = 0;
  let totalKuota = 0;
  lombaList.forEach(item => {
    totalPeserta += Number(item.kuotaTerdaftar || 0);
    totalKuota += Number(item.kuotaTotal || 0);
  });

  const percentage = totalKuota > 0 ? ((totalPeserta / totalKuota) * 100) : 0;
  const percentageFormatted = (percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1)) + '%';

  const pesertaEl = document.getElementById('stat-total-peserta');
  if (pesertaEl) {
    pesertaEl.textContent = String(totalPeserta);
  }

  const kuotaEl = document.getElementById('stat-total-kuota');
  if (kuotaEl) {
    kuotaEl.textContent = `/ ${totalKuota} Slot`;
  }

  const progressEl = document.getElementById('stat-peserta-progress');
  if (progressEl) {
    progressEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  // 3. Paling Diminati (Lomba dengan Peserta Terbanyak)
  const popularNameEl = document.getElementById('stat-popular-name');
  const popularCountEl = document.getElementById('stat-popular-count');
  const popularDescEl = document.getElementById('stat-popular-desc');
  const popularLocEl = document.getElementById('stat-popular-location');

  if (lombaList.length > 0) {
    const mostPopular = [...lombaList].sort((a, b) => (b.kuotaTerdaftar || 0) - (a.kuotaTerdaftar || 0))[0];
    const popRatio = mostPopular.kuotaTotal > 0
      ? Math.round((mostPopular.kuotaTerdaftar / mostPopular.kuotaTotal) * 100)
      : 0;

    if (popularNameEl) popularNameEl.textContent = mostPopular.nama;
    if (popularCountEl) popularCountEl.textContent = String(mostPopular.kuotaTerdaftar);
    if (popularDescEl) popularDescEl.textContent = `Pendaftar (${popRatio}% Slot)`;
    if (popularLocEl) popularLocEl.textContent = mostPopular.lokasi;
  } else {
    if (popularNameEl) popularNameEl.textContent = 'Belum Ada Lomba';
    if (popularCountEl) popularCountEl.textContent = '0';
    if (popularDescEl) popularDescEl.textContent = '0 Slot Terisi';
    if (popularLocEl) popularLocEl.textContent = '-';
  }

  // 4. Total Hadiah Tunai (Jika ada akumulasi data hadiah)
  const totalHadiahEl = document.getElementById('stat-total-hadiah');
  if (totalHadiahEl) {
    const totalHadiah = lombaList.reduce((acc, curr) => acc + (Number(curr.hadiah) || 0), 0);
    // Pertahankan Rp 18.500.000 jika data hadiah lomba menjumlahkan nilai tersebut
    totalHadiahEl.textContent = totalHadiah > 0 ? formatCurrency(totalHadiah) : 'Rp 18.500.000';
  }
}

// ─── 6. RENDER TABEL & PAGINATION ───────────────────────────────────────────
function renderLombaTable() {
  const tbody = document.getElementById('lomba-tbody');
  if (!tbody) return;

  const filtered = getFilteredLomba();
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, total);
  const pageData = filtered.slice(startIdx, endIdx);

  if (pageData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="py-12 text-center text-on-surface-variant font-body-md">
          <div class="flex flex-col items-center justify-center gap-2">
            <span class="material-symbols-outlined text-4xl text-outline opacity-40">emoji_events</span>
            <p class="font-medium text-on-surface">Data perlombaan tidak ditemukan</p>
            <p class="text-body-sm text-on-surface-variant">Coba sesuaikan kata kunci pencarian atau filter kategori yang dipilih.</p>
          </div>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = pageData.map((item, idx) => {
      const n = startIdx + idx + 1;
      const initials = getInitials(item.pic);
      const avatarClass = getPicAvatarClass(item.pic);
      const locIcon = getLocationIcon(item.lokasi);
      const { dateStr, timeStr } = formatSchedule(item.jadwal);
      const isFull = item.kuotaTotal > 0 && item.kuotaTerdaftar >= item.kuotaTotal;
      const pct = item.kuotaTotal > 0 ? Math.round((item.kuotaTerdaftar / item.kuotaTotal) * 100) : 0;

      const kuotaHtml = isFull
        ? `<div class="flex items-center justify-between text-label-sm mb-1 font-medium">
             <span>${item.kuotaTerdaftar} / ${item.kuotaTotal}</span>
             <span class="text-error font-bold">Penuh 100%</span>
           </div>
           <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
             <div class="bg-error h-full rounded-full" style="width: 100%;"></div>
           </div>`
        : `<div class="flex items-center justify-between text-label-sm mb-1 font-medium">
             <span>${item.kuotaTerdaftar} / ${item.kuotaTotal}</span>
             <span class="text-primary font-bold">${pct}%</span>
           </div>
           <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
             <div class="bg-primary h-full rounded-full" style="width: ${pct}%;"></div>
           </div>`;

      const searchAttribute = `${item.id} ${item.nama} ${item.kategori} ${item.pic} ${item.lokasi}`.toLowerCase();

      return `
        <tr class="hover:bg-surface-container-low/60 transition-colors group" data-id="${escapeHtml(item.id)}" data-category="${escapeHtml(item.kategori)}" data-search="${escapeHtml(searchAttribute)}">
          <td class="px-space-md py-3 text-center text-on-surface-variant font-label-sm">${n}</td>
          <td class="px-space-md py-3 font-mono font-medium text-primary">${escapeHtml(item.id)}</td>
          <td class="px-space-md py-3">
            <div class="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors">${escapeHtml(item.nama)}</div>
            <div class="text-on-surface-variant text-label-sm line-clamp-1">${escapeHtml(item.subdeskripsi || item.deskripsi || '-')}</div>
          </td>
          <td class="px-space-md py-3">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container text-secondary">
              ${escapeHtml(item.kategori)}
            </span>
          </td>
          <td class="px-space-md py-3">
            ${kuotaHtml}
          </td>
          <td class="px-space-md py-3">
            <div class="font-medium text-on-surface">${escapeHtml(dateStr)}</div>
            <div class="text-on-surface-variant text-label-sm">${escapeHtml(timeStr)}</div>
          </td>
          <td class="px-space-md py-3">
            <span class="inline-flex items-center gap-1 text-on-surface-variant text-label-md">
              <span class="material-symbols-outlined text-body-sm text-outline">${locIcon}</span>
              ${escapeHtml(item.lokasi)}
            </span>
          </td>
          <td class="px-space-md py-3">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full ${avatarClass} font-bold flex items-center justify-center text-label-sm">${initials}</div>
              <span class="font-medium">${escapeHtml(item.pic)}</span>
            </div>
          </td>
          <td class="px-space-md py-3 text-right pr-space-lg">
            <div class="flex items-center justify-end gap-1">
              <button class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" data-action="detail" data-id="${escapeHtml(item.id)}" title="Detail" type="button">
                <span class="material-symbols-outlined text-body-md">visibility</span>
              </button>
              <button class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" data-action="edit" data-id="${escapeHtml(item.id)}" title="Edit" type="button">
                <span class="material-symbols-outlined text-body-md">edit</span>
              </button>
              <button class="p-1.5 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" data-action="delete" data-id="${escapeHtml(item.id)}" title="Hapus" type="button">
                <span class="material-symbols-outlined text-body-md">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Update Footer Notice & Pagination Controls
  renderPagination(total, totalPages, startIdx, endIdx);
}

function renderPagination(total, totalPages, startIdx, endIdx) {
  const noticeEl = document.getElementById('paginationNotice');
  if (noticeEl) {
    if (total === 0) {
      noticeEl.innerHTML = `<span>Tidak ada data lomba yang cocok</span>`;
    } else {
      noticeEl.innerHTML = `<span>Menampilkan <strong class="text-on-surface font-semibold">${startIdx + 1} - ${endIdx}</strong> dari <strong class="text-on-surface font-semibold">${total}</strong> kompetisi</span>`;
    }
  }

  const buttonsContainer = document.getElementById('paginationButtons');
  if (!buttonsContainer) return;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  let pageButtonsHtml = '';
  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === currentPage;
    pageButtonsHtml += `
      <button class="w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center font-bold transition-colors ${
        isActive ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'
      }" data-page="${p}" type="button">${p}</button>
    `;
  }

  buttonsContainer.innerHTML = `
    <button class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors" id="btn-page-prev" ${prevDisabled ? 'disabled=""' : ''} type="button">
      <span class="material-symbols-outlined text-body-md">chevron_left</span>
    </button>
    ${pageButtonsHtml}
    <button class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors" id="btn-page-next" ${nextDisabled ? 'disabled=""' : ''} type="button">
      <span class="material-symbols-outlined text-body-md">chevron_right</span>
    </button>
  `;

  // Attach event listener to page buttons
  buttonsContainer.querySelector('#btn-page-prev')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderLombaTable();
    }
  });

  buttonsContainer.querySelector('#btn-page-next')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderLombaTable();
    }
  });

  buttonsContainer.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageNum = parseInt(btn.getAttribute('data-page'), 10);
      if (pageNum && pageNum !== currentPage) {
        currentPage = pageNum;
        renderLombaTable();
      }
    });
  });
}

// ─── 7. MODAL & TOAST HELPER ────────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `p-3 px-4 rounded-xl shadow-lg flex items-center gap-2 text-body-sm font-label-md pointer-events-auto transition-all transform duration-200 translate-y-2 opacity-0 ${
    type === 'success' ? 'bg-inverse-surface text-inverse-on-surface' : 'bg-error text-on-error'
  }`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-body-md">${type === 'success' ? 'check_circle' : 'info'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (typeof toast.remove === 'function') {
        toast.remove();
      } else if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 3200);
}

// ─── 8. CRUD ACTIONS ────────────────────────────────────────────────────────
function handleAddLomba() {
  document.getElementById('modal-form-title').innerText = 'Tambah Cabang Lomba Baru';
  document.getElementById('form-lomba-id').value = '';
  document.getElementById('lomba-form')?.reset();
  openModal('modal-form-lomba');
}

function handleEditLomba(id) {
  const item = lombaList.find(l => l.id === id);
  if (!item) {
    showToast('Data lomba tidak ditemukan.', 'error');
    return;
  }

  document.getElementById('modal-form-title').innerText = `Sunting Data Lomba - ${item.id}`;
  document.getElementById('form-lomba-id').value = item.id;
  document.getElementById('nama_lomba').value = item.nama;

  // Pastikan kategori ada di pilihan select, jika belum ada buatkan option baru
  const catSelect = document.getElementById('kategori_lomba');
  if (catSelect) {
    const existingOpt = Array.from(catSelect.options).find(opt => opt.value === item.kategori);
    if (!existingOpt) {
      const newOpt = document.createElement('option');
      newOpt.value = item.kategori;
      newOpt.textContent = item.kategori;
      catSelect.appendChild(newOpt);
    }
    catSelect.value = item.kategori;
  }

  document.getElementById('kuota').value = item.kuotaTotal;
  document.getElementById('jadwal').value = item.jadwal;
  document.getElementById('lokasi').value = item.lokasi;
  document.getElementById('id_panitia').value = item.pic;
  document.getElementById('deskripsi').value = item.deskripsi || '';

  openModal('modal-form-lomba');
}

function handleViewDetail(id) {
  const item = lombaList.find(l => l.id === id);
  if (!item) return;

  const { dateStr, timeStr } = formatSchedule(item.jadwal);

  document.getElementById('detail-id').innerText = item.id;
  document.getElementById('detail-title').innerText = item.nama;
  document.getElementById('detail-badge').innerText = item.kategori;
  document.getElementById('detail-kuota').innerText = `${item.kuotaTerdaftar} / ${item.kuotaTotal} Peserta (${item.kuotaTotal > 0 ? Math.round((item.kuotaTerdaftar / item.kuotaTotal) * 100) : 0}% Terisi)`;
  document.getElementById('detail-jadwal').innerText = `${dateStr}, ${timeStr}`;
  document.getElementById('detail-lokasi').innerText = item.lokasi;
  document.getElementById('detail-pic').innerText = `${item.pic} (${item.role || 'Panitia'})`;
  document.getElementById('detail-desc').innerText = item.deskripsi || 'Tidak ada keterangan tambahan.';

  openModal('modal-detail-lomba');
}

function handleDeleteConfirmation(id) {
  const item = lombaList.find(l => l.id === id);
  if (!item) return;

  itemToDeleteId = id;
  const deleteNameEl = document.getElementById('delete-lomba-name');
  if (deleteNameEl) {
    deleteNameEl.innerText = `${item.nama} (${item.id})`;
  }
  openModal('modal-delete-lomba');
}

function executeDelete() {
  if (!itemToDeleteId) return;

  const targetId = itemToDeleteId;
  const idx = lombaList.findIndex(l => l.id === targetId);

  if (idx !== -1) {
    const deletedName = lombaList[idx].nama;
    lombaList.splice(idx, 1);

    closeModal('modal-delete-lomba');
    itemToDeleteId = null;

    // Refresh tabel & ringkasan statistik
    renderLombaTable();
    updateLombaSummary();
    showToast(`Perlombaan "${deletedName}" (${targetId}) berhasil dihapus.`, 'success');
  } else {
    closeModal('modal-delete-lomba');
    itemToDeleteId = null;
    showToast('Data lomba tidak ditemukan.', 'error');
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('form-lomba-id').value.trim();
  const nama = document.getElementById('nama_lomba').value.trim();
  const kategori = document.getElementById('kategori_lomba').value.trim();
  const kuota = parseInt(document.getElementById('kuota').value, 10);
  const jadwal = document.getElementById('jadwal').value.trim();
  const lokasi = document.getElementById('lokasi').value.trim();
  const pic = document.getElementById('id_panitia').value.trim();
  const deskripsi = document.getElementById('deskripsi').value.trim();

  // Validasi field wajib
  if (!nama || !kategori || isNaN(kuota) || !jadwal || !lokasi || !pic) {
    showToast('Harap lengkapi semua isian bertanda bintang (*).', 'error');
    return;
  }

  if (kuota <= 0) {
    showToast('Batas kuota peserta harus lebih dari 0.', 'error');
    return;
  }

  if (editId) {
    // Mode Update
    const idx = lombaList.findIndex(l => l.id === editId);
    if (idx === -1) {
      showToast('Data lomba tidak ditemukan.', 'error');
      return;
    }

    // Validasi kuota tidak boleh lebih kecil dari peserta yang sudah terdaftar
    if (kuota < lombaList[idx].kuotaTerdaftar) {
      showToast(`Batas kuota tidak boleh kurang dari jumlah peserta terdaftar (${lombaList[idx].kuotaTerdaftar}).`, 'error');
      return;
    }

    lombaList[idx] = {
      ...lombaList[idx],
      nama,
      kategori,
      subdeskripsi: deskripsi || lombaList[idx].subdeskripsi,
      kuotaTotal: kuota,
      jadwal,
      lokasi,
      pic,
      deskripsi: deskripsi || lombaList[idx].deskripsi
    };

    closeModal('modal-form-lomba');
    renderLombaTable();
    updateLombaSummary();
    showToast(`Perubahan data "${nama}" berhasil disimpan!`, 'success');
  } else {
    // Mode Create
    const newId = generateNextId();
    const newItem = {
      id: newId,
      nama,
      kategori,
      subdeskripsi: deskripsi || 'Cabang kompetisi resmi Takumi Festival',
      kuotaTerdaftar: 0,
      kuotaTotal: kuota,
      jadwal,
      lokasi,
      pic,
      deskripsi: deskripsi || 'Format kompetisi dan penilaian ditentukan oleh juri panitia.',
      hadiah: 0
    };

    lombaList.push(newItem);

    closeModal('modal-form-lomba');
    // Jika ada pencarian/filter yang menyembunyikan item baru, reset ke halaman tempat item berada
    const filtered = getFilteredLomba();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    currentPage = totalPages;

    renderLombaTable();
    updateLombaSummary();
    showToast(`Lomba baru "${nama}" (${newId}) berhasil didaftarkan!`, 'success');
  }
}

function selectCategory(categoryKey, btn) {
  currentCategoryFilter = categoryKey;
  currentPage = 1;

  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(p => {
    p.classList.remove('bg-primary', 'text-on-primary', 'active');
    p.classList.add('bg-surface-container-low', 'text-on-surface-variant');
  });

  if (btn) {
    btn.classList.add('bg-primary', 'text-on-primary', 'active');
    btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
  }

  renderLombaTable();
}

function filterLombaTable() {
  const searchInput = document.getElementById('search-input');
  currentSearchQuery = searchInput ? searchInput.value : '';
  currentPage = 1;
  renderLombaTable();
}

function printParticipantSummary() {
  showToast('Menyiapkan berkas cetak rekap peserta lomba...', 'success');
  setTimeout(() => {
    window.print();
  }, 600);
}

// ─── 9. EXPOSE KE GLOBAL WINDOW ─────────────────────────────────────────────
// Mendukung inline handler HTML di Astro maupun script eksternal
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.printParticipantSummary = printParticipantSummary;
window.selectCategory = selectCategory;
window.filterLombaTable = filterLombaTable;
window.handleFormSubmit = handleFormSubmit;
window.executeDelete = executeDelete;
window.viewDetail = handleViewDetail;
window.editLomba = handleEditLomba;
window.confirmDelete = handleDeleteConfirmation;
window.handleAddLomba = handleAddLomba;
window.getLombaList = () => lombaList;
window.updateLombaSummary = updateLombaSummary;
window.renderLombaTable = renderLombaTable;

// ─── 10. INISIALISASI & EVENT LISTENERS ──────────────────────────────────────
function initLomba() {
  renderLombaTable();
  updateLombaSummary();

  // Event delegation untuk tombol Aksi (Detail, Edit, Hapus) pada tabel
  const table = document.getElementById('table-lomba');
  if (table) {
    table.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      if (!id) return;

      if (action === 'detail') {
        handleViewDetail(id);
      } else if (action === 'edit') {
        handleEditLomba(id);
      } else if (action === 'delete') {
        handleDeleteConfirmation(id);
      }
    });
  }

  // Tombol Escape menutup semua modal yang terbuka
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('modal-form-lomba');
      closeModal('modal-detail-lomba');
      closeModal('modal-delete-lomba');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLomba);
} else {
  initLomba();
}
