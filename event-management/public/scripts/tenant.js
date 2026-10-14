/**
 * tenant.js - CRUD & Pagination Logic untuk halaman Manajemen Tenant
 * Semua data disimpan in-memory (frontend only, tidak ada backend).
 */

// ─── 1. DATA STORE ─────────────────────────────────────────────────────────
let tenants = [
  { id: 'TNT-01', name: 'Osaka Takoyaki Master',         type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-01', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0812-3456-7890', email: 'takoyaki@osaka-fest.id',  status: 'Terverifikasi' },
  { id: 'TNT-02', name: 'Kyoto Matcha & Taiyaki House',  type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-02', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0813-2345-6789', email: 'kyoto.matcha@fest.id',    status: 'Terverifikasi' },
  { id: 'TNT-03', name: 'Akiba Figure & Nendoroid Hub',  type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-01', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0877-9876-5432', email: 'halo@akibahub.co.id',      status: 'Terverifikasi' },
  { id: 'TNT-04', name: 'Tokyo Manga & Artbook Corner',  type: 'Komunitas Kreatif',   zone: 'Zona C - Creative Market',  booth: 'C-03', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0856-1234-5678', email: 'manga@tokyocorner.id',     status: 'Terverifikasi' },
  { id: 'TNT-05', name: 'Ramen Bar Sanuki',              type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-05', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0821-9988-7766', email: 'ramen@sanuki-bar.id',      status: 'Terverifikasi' },
  { id: 'TNT-06', name: 'Kimono & Yukata Photobooth',    type: 'Game & Hiburan',      zone: 'Zona A - Selasar Utama',    booth: 'A-04', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0838-5544-3322', email: 'kimono@photobooth.id',     status: 'Terverifikasi' },
  { id: 'TNT-07', name: 'Gashapon & Arcade Alley',       type: 'Game & Hiburan',      zone: 'Zona C - Creative Market',  booth: 'C-06', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0815-6677-8899', email: 'gashapon@arcade.id',       status: 'Terverifikasi' },
  { id: 'TNT-08', name: 'Sakura Souvenir Official',      type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-06', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0819-1122-3344', email: 'sakura@souvenir.id',       status: 'Terverifikasi' },
  { id: 'TNT-09', name: 'Natto & Soba Delight',          type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-03', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0851-2233-4455', email: 'natto.soba@delight.id',    status: 'Terverifikasi' },
  { id: 'TNT-10', name: 'Gundam & Model Kit Studio',     type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-02', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0823-3344-5566', email: 'gundam@modelkit.id',       status: 'Terverifikasi' },
  { id: 'TNT-11', name: 'Harajuku Fashion Corner',        type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-03', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0812-4455-6677', email: 'harajuku@fashion.id',      status: 'Terverifikasi' },
  { id: 'TNT-12', name: 'Mochi Mochi Dessert Bar',        type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-04', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0857-6677-8899', email: 'mochi@dessert.id',         status: 'Terverifikasi' },
  { id: 'TNT-13', name: 'Doujinshi Art Collective',       type: 'Komunitas Kreatif',   zone: 'Zona C - Creative Market',  booth: 'C-01', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0818-7788-9900', email: 'doujin@artcollective.id',  status: 'Terverifikasi' },
  { id: 'TNT-14', name: 'VTuber Merch Pavilion',          type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-05', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0831-8899-0011', email: 'vtuber@merch.id',          status: 'Terverifikasi' },
  { id: 'TNT-15', name: 'Onigiri & Yakitori Express',     type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-06', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0845-9900-1122', email: 'onigiri@yakitori.id',      status: 'Terverifikasi' },
  { id: 'TNT-16', name: 'Chibi Character Workshop',       type: 'Komunitas Kreatif',   zone: 'Zona C - Creative Market',  booth: 'C-02', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0852-0011-2233', email: 'chibi@workshop.id',        status: 'Terverifikasi' },
  { id: 'TNT-17', name: 'Karaoke Anime Live Stage',       type: 'Game & Hiburan',      zone: 'Zona C - Creative Market',  booth: 'C-04', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0878-1122-3344', email: 'karaoke@anime-live.id',    status: 'Terverifikasi' },
  { id: 'TNT-18', name: 'Takoyaki & Okonomiyaki House',   type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-07', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0811-2233-4455', email: 'okonomi@house.id',         status: 'Terverifikasi' },
  { id: 'TNT-19', name: 'Cosplay Props & Accessories',    type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-07', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0824-3344-5566', email: 'cosplay@props.id',         status: 'Terverifikasi' },
  { id: 'TNT-20', name: 'Shaved Ice & Kakigori Lounge',   type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-08', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0858-4455-6677', email: 'kakigori@lounge.id',       status: 'Terverifikasi' },
  { id: 'TNT-21', name: 'Anime Poster & Print Store',     type: 'Merchandise',         zone: 'Zona A - Selasar Utama',    booth: 'A-08', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0832-5566-7788', email: 'poster@anime-print.id',    status: 'Terverifikasi' },
  { id: 'TNT-22', name: 'J-Pop & OST Music Booth',        type: 'Komunitas Kreatif',   zone: 'Zona C - Creative Market',  booth: 'C-05', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0869-6677-8899', email: 'jpop@ost-music.id',        status: 'Terverifikasi' },
  { id: 'TNT-23', name: 'Bubble Tea & Boba Festival',     type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-09', pic: 'Rian Ardiansyah',   role: 'Tenant & Bazaar',    contact: '0846-7788-9900', email: 'boba@bubble-fest.id',      status: 'Terverifikasi' },
  { id: 'TNT-24', name: 'Washi & Origami Craft Studio',   type: 'Komunitas Kreatif',   zone: 'Zona C - Creative Market',  booth: 'C-07', pic: 'Hendra Kurniawan',  role: 'Logistik & Stan',    contact: '0813-8899-0011', email: 'washi@origami.id',         status: 'Terverifikasi' },
  { id: 'TNT-25', name: 'Ichiban Crepe & Waffle',         type: 'Kuliner (F&B)',       zone: 'Zona B - Outdoor Kuliner',  booth: 'B-10', pic: 'Amalia Putri',      role: 'Koordinator Utama',  contact: '0879-9900-1122', email: 'ichiban@crepe.id',         status: 'Terverifikasi' },
];

// ─── 2. STATE ───────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;
const MAX_CAPACITY = 25;
let currentPage = 1;
let filteredTenants = [...tenants];

// ─── 3. UTILITAS ────────────────────────────────────────────────────────────
function getInitials(name) {
  return name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}
function getAvatarClass(zone) {
  if (zone.startsWith('Zona A')) return 'bg-surface-container text-primary';
  if (zone.startsWith('Zona B')) return 'bg-primary-container/30 text-on-primary-container';
  return 'bg-surface-container-high text-on-tertiary-container';
}
function getBoothBadgeClass(zone) {
  if (zone.startsWith('Zona A')) return 'bg-surface-container text-primary';
  if (zone.startsWith('Zona B')) return 'bg-secondary-container text-on-secondary-container';
  return 'bg-surface-container-high text-on-tertiary-container';
}
function getZoneShort(zone) {
  const m = zone.match(/^Zona [A-Z]/);
  return m ? m[0] : zone;
}
function generateNextId() {
  if (tenants.length === 0) return 'TNT-01';
  const max = Math.max(...tenants.map(t => parseInt(t.id.replace('TNT-', ''), 10)));
  return 'TNT-' + String(max + 1).padStart(2, '0');
}

// ─── 4. RINGKASAN KAPASITAS ────────────────────────────────────────────────
function updateCapacitySummary() {
  const occupied = Math.min(MAX_CAPACITY, Math.max(0, tenants.length));
  const remaining = Math.max(0, MAX_CAPACITY - occupied);
  const percentage = Math.round((occupied / MAX_CAPACITY) * 100);

  // 1. Nilai Terisi & Maksimum
  const occupiedEl = document.getElementById('capacityOccupied');
  if (occupiedEl) {
    occupiedEl.textContent = String(occupied);
  }

  const maxEl = document.getElementById('capacityMax');
  if (maxEl) {
    maxEl.textContent = String(MAX_CAPACITY);
  }

  const ratioEl = document.getElementById('capacityRatio');
  if (ratioEl) {
    ratioEl.dataset.occupied = String(occupied);
    ratioEl.dataset.max = String(MAX_CAPACITY);
    ratioEl.setAttribute('aria-label', `${occupied} dari ${MAX_CAPACITY}`);
  }

  // 2. Status Badge & Persentase
  const badgeTextEl = document.getElementById('capacityBadgeText');
  if (badgeTextEl) {
    badgeTextEl.textContent = occupied >= MAX_CAPACITY ? '100% Penuh' : `${percentage}% Terisi`;
  }

  // 3. Deskripsi Kapasitas
  const descEl = document.getElementById('capacityDescription');
  if (descEl) {
    if (occupied >= MAX_CAPACITY) {
      descEl.textContent = `Seluruh ${MAX_CAPACITY} unit stan bazar telah terverifikasi & teralokasi.`;
    } else {
      descEl.textContent = `${occupied} dari ${MAX_CAPACITY} unit stan bazar telah teralokasi (${remaining} stan tersisa).`;
    }
  }

  // 4. Progress Bar & Unit per Zona
  const zoneACount = tenants.filter(t => t.zone && t.zone.startsWith('Zona A')).length;
  const zoneBCount = tenants.filter(t => t.zone && t.zone.startsWith('Zona B')).length;
  const zoneCCount = tenants.filter(t => t.zone && t.zone.startsWith('Zona C')).length;

  const barA = document.getElementById('zoneABar');
  const barB = document.getElementById('zoneBBar');
  const barC = document.getElementById('zoneCBar');
  if (barA) barA.style.width = `${(zoneACount / MAX_CAPACITY) * 100}%`;
  if (barB) barB.style.width = `${(zoneBCount / MAX_CAPACITY) * 100}%`;
  if (barC) barC.style.width = `${(zoneCCount / MAX_CAPACITY) * 100}%`;

  const countA = document.getElementById('zoneACount');
  const countB = document.getElementById('zoneBCount');
  const countC = document.getElementById('zoneCCount');
  if (countA) countA.textContent = String(zoneACount);
  if (countB) countB.textContent = String(zoneBCount);
  if (countC) countC.textContent = String(zoneCCount);
}

window.updateCapacitySummary = updateCapacitySummary;
window.MAX_CAPACITY = MAX_CAPACITY;
window.getTenants = () => tenants;

// ─── 5. RENDER TABEL ────────────────────────────────────────────────────────
function renderTable() {
  const tbody = document.getElementById('tenantTableBody');
  if (!tbody) return;

  const total      = filteredTenants.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1)          currentPage = 1;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx   = Math.min(startIdx + ITEMS_PER_PAGE, total);
  const pageData = filteredTenants.slice(startIdx, endIdx);

  if (pageData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="py-16 text-center text-on-surface-variant font-body-md text-body-md">
      <div class="flex flex-col items-center gap-2">
        <span class="material-symbols-outlined" style="font-size:2.5rem;opacity:.3">storefront</span>
        <span>Tidak ada data tenant yang ditemukan.</span>
      </div></td></tr>`;
  } else {
    tbody.innerHTML = pageData.map((t, i) => {
      const n        = startIdx + i + 1;
      const initials = getInitials(t.name);
      const avatarCls= getAvatarClass(t.zone);
      const boothCls = getBoothBadgeClass(t.zone);
      const safeName = t.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      return `<tr class="hover:bg-surface-container-low/60 transition-colors group"
                  data-category="${t.type}" data-zone="${getZoneShort(t.zone)}" data-id="${t.id}">
        <td class="py-3.5 px-space-md text-center text-on-surface-variant font-label-sm">${n}</td>
        <td class="py-3.5 px-space-md font-semibold text-primary font-label-md">${t.id}</td>
        <td class="py-3.5 px-space-md font-medium text-on-surface">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg ${avatarCls} flex items-center justify-center font-bold text-xs">${initials}</span>
            <span>${t.name}</span>
          </div>
        </td>
        <td class="py-3.5 px-space-md">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container-high text-on-surface-variant">${t.type}</span>
        </td>
        <td class="py-3.5 px-space-md text-on-surface-variant font-body-sm">${t.zone}</td>
        <td class="py-3.5 px-space-md">
          <span class="px-2 py-0.5 rounded ${boothCls} font-label-sm text-label-sm font-semibold">Booth ${t.booth}</span>
        </td>
        <td class="py-3.5 px-space-md font-body-sm">
          <div class="text-on-surface font-medium">${t.pic}</div>
          <div class="text-xs text-on-surface-variant">${t.role}</div>
        </td>
        <td class="py-3.5 px-space-md text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span> ${t.status}
          </span>
        </td>
        <td class="py-3.5 px-space-md text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1">
            <button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                    data-action="edit" data-id="${t.id}" title="Edit Data" type="button">
              <span class="material-symbols-outlined text-body-md">edit</span>
            </button>
            <button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors"
                    data-action="delete" data-id="${t.id}" data-name="${safeName}" title="Hapus Tenant" type="button">
              <span class="material-symbols-outlined text-body-md">delete</span>
            </button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  const notice = document.getElementById('paginationNotice');
  if (notice) {
    notice.innerHTML = total === 0
      ? 'Tidak ada tenant yang cocok dengan filter.'
      : `Menampilkan <span class="font-semibold text-on-surface">${startIdx + 1} - ${endIdx}</span> dari <span class="font-semibold text-on-surface">${total}</span> tenant terdaftar`;
  }

  renderPagination(totalPages);
}

// ─── 5. RENDER PAGINATION ───────────────────────────────────────────────────
function renderPagination(totalPages) {
  const container = document.getElementById('paginationButtons');
  if (!container) return;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const delta = 2;
  const left  = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);
  let range = [];
  for (let i = left; i <= right; i++) range.push(i);

  let pages = [];
  if (left > 1)  { pages.push(1); if (left > 2) pages.push('...'); }
  pages = pages.concat(range);
  if (right < totalPages) { if (right < totalPages - 1) pages.push('...'); pages.push(totalPages); }

  const prevBtn = `<button id="pagePrev"
    class="p-1.5 rounded-lg text-on-surface-variant transition-colors ${prevDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:text-on-surface hover:bg-surface-container'}"
    ${prevDisabled ? 'disabled' : ''} type="button"><span class="material-symbols-outlined text-body-md">chevron_left</span></button>`;

  const nextBtn = `<button id="pageNext"
    class="p-1.5 rounded-lg text-on-surface-variant transition-colors ${nextDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:text-on-surface hover:bg-surface-container'}"
    ${nextDisabled ? 'disabled' : ''} type="button"><span class="material-symbols-outlined text-body-md">chevron_right</span></button>`;

  const pageButtons = pages.map(p => {
    if (p === '...') return `<span class="px-1 text-on-surface-variant font-label-md">...</span>`;
    const isActive = p === currentPage;
    return `<button data-page="${p}"
      class="w-8 h-8 rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors font-semibold ${isActive ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}"
      type="button">${p}</button>`;
  }).join('');

  container.innerHTML = prevBtn + pageButtons + nextBtn;

  container.querySelector('#pagePrev')?.addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderTable(); }
  });
  container.querySelector('#pageNext')?.addEventListener('click', () => {
    if (currentPage < totalPages) { currentPage++; renderTable(); }
  });
  container.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page, 10);
      renderTable();
    });
  });
}

// ─── 6. FILTER & SEARCH ─────────────────────────────────────────────────────
function applyFilters() {
  const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const catVal    = document.getElementById('categoryFilter')?.value || 'all';
  const zoneVal   = document.getElementById('zoneFilter')?.value    || 'all';

  filteredTenants = tenants.filter(t => {
    const text = `${t.id} ${t.name} ${t.type} ${t.zone} ${t.booth} ${t.pic}`.toLowerCase();
    return (!searchVal || text.includes(searchVal)) &&
           (catVal === 'all' || t.type === catVal) &&
           (zoneVal === 'all' || getZoneShort(t.zone) === zoneVal);
  });

  currentPage = 1;
  renderTable();
}

window.filterTenantTable = applyFilters;

window.resetFilters = function () {
  const si = document.getElementById('searchInput');
  const cf = document.getElementById('categoryFilter');
  const zf = document.getElementById('zoneFilter');
  if (si) si.value = '';
  if (cf) cf.value = 'all';
  if (zf) zf.value = 'all';
  applyFilters();
  showToast('Filter pencarian telah dibersihkan.');
};

window.quickFilterBooth = function (boothCode) {
  const si = document.getElementById('searchInput');
  if (si) si.value = boothCode;
  applyFilters();
  showToast('Memfilter stan: ' + boothCode);
};

// ─── 7. TOAST NOTIFICATION ──────────────────────────────────────────────────
function showToast(message, isSuccess = true) {
  const toast     = document.getElementById('liveToast');
  const toastMsg  = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast || !toastMsg || !toastIcon) return;

  toastMsg.textContent  = message;
  toastIcon.textContent = isSuccess ? 'check_circle' : 'info';
  toastIcon.className   = isSuccess
    ? 'material-symbols-outlined text-primary-fixed-dim'
    : 'material-symbols-outlined text-error';

  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  clearTimeout(toast._toastTimer);
  toast._toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3200);
}
window.showToast = showToast;

// ─── 8. MODAL TAMBAH / EDIT ──────────────────────────────────────────────────
window.openTenantModal = function (mode, tenantId = null) {
  if (mode !== 'edit' && tenants.length >= MAX_CAPACITY) {
    showToast('Kapasitas tenant sudah penuh (maksimum ' + MAX_CAPACITY + ' stan). Penambahan tenant baru tidak dapat dilakukan.', false);
    return;
  }

  const modal   = document.getElementById('tenantModal');
  const title   = document.getElementById('modalTitle');
  const form    = document.getElementById('tenantForm');
  const idField = document.getElementById('editTenantId');
  if (!modal || !title || !form || !idField) return;

  clearFormErrors();

  if (mode === 'edit' && tenantId) {
    const tenant = tenants.find(t => t.id === tenantId);
    if (!tenant) { showToast('Data tenant tidak ditemukan.', false); return; }
    title.textContent = 'Edit Data Stan ' + tenantId;
    idField.value     = tenantId;
    document.getElementById('tenantName').value    = tenant.name;
    document.getElementById('boothType').value     = tenant.type;
    document.getElementById('boothZone').value     = tenant.zone;
    document.getElementById('boothNumber').value   = tenant.booth;
    document.getElementById('panitiaPIC').value    = tenant.pic;
    document.getElementById('tenantContact').value = tenant.contact || '';
    document.getElementById('tenantEmail').value   = tenant.email   || '';
    const sb = form.querySelector('[type="submit"]');
    if (sb) sb.textContent = 'Simpan Perubahan';
  } else {
    title.textContent = 'Tambah Data Tenant Baru';
    idField.value     = '';
    form.reset();
    const sb = form.querySelector('[type="submit"]');
    if (sb) sb.textContent = 'Simpan Tenant';
  }

  modal.classList.remove('hidden');
};

window.closeTenantModal = function () {
  document.getElementById('tenantModal')?.classList.add('hidden');
  clearFormErrors();
};

// ─── 9. VALIDASI FORM ───────────────────────────────────────────────────────
function clearFormErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.remove());
  document.querySelectorAll('.ring-error').forEach(el => el.classList.remove('ring-2', 'ring-error'));
}

function showFieldError(inputEl, message) {
  if (!inputEl) return;
  inputEl.parentElement?.querySelector('.field-error')?.remove();
  inputEl.classList.add('ring-2', 'ring-error');
  const err = document.createElement('p');
  err.className   = 'field-error text-xs text-error mt-1';
  err.textContent = message;
  inputEl.insertAdjacentElement('afterend', err);
}

function validateForm() {
  clearFormErrors();
  let valid = true;
  const fields = {
    tenantName:  { el: document.getElementById('tenantName'),  msg: 'Nama tenant wajib diisi.' },
    boothType:   { el: document.getElementById('boothType'),   msg: 'Pilih jenis kategori booth.' },
    boothZone:   { el: document.getElementById('boothZone'),   msg: 'Pilih zona lokasi booth.' },
    boothNumber: { el: document.getElementById('boothNumber'), msg: 'Nomor booth wajib diisi.' },
    panitiaPIC:  { el: document.getElementById('panitiaPIC'),  msg: 'Pilih panitia PIC.' },
  };

  Object.values(fields).forEach(({ el, msg }) => {
    if (!el?.value.trim()) { showFieldError(el, msg); valid = false; }
  });

  const bn = document.getElementById('boothNumber');
  if (bn?.value.trim() && !/^[A-Z]-\d{2}$/i.test(bn.value.trim())) {
    showFieldError(bn, 'Format nomor booth tidak valid. Contoh: B-03.');
    valid = false;
  }

  const email = document.getElementById('tenantEmail');
  if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showFieldError(email, 'Format email tidak valid.');
    valid = false;
  }
  return valid;
}

// ─── 10. SUBMIT FORM (CREATE & UPDATE) ──────────────────────────────────────
window.handleFormSubmit = function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  const editId  = document.getElementById('editTenantId').value;
  const name    = document.getElementById('tenantName').value.trim();
  const type    = document.getElementById('boothType').value;
  const zone    = document.getElementById('boothZone').value;
  const booth   = document.getElementById('boothNumber').value.trim().toUpperCase();
  const pic     = document.getElementById('panitiaPIC').value;
  const contact = document.getElementById('tenantContact').value.trim();
  const email   = document.getElementById('tenantEmail').value.trim();

  const roleMap = {
    'Rian Ardiansyah':  'Tenant & Bazaar',
    'Hendra Kurniawan': 'Logistik & Stan',
    'Amalia Putri':     'Koordinator Utama',
  };

  if (editId) {
    const idx = tenants.findIndex(t => t.id === editId);
    if (idx !== -1) tenants[idx] = { ...tenants[idx], name, type, zone, booth, pic, role: roleMap[pic] || '', contact, email };
    window.closeTenantModal();
    applyFilters();
    updateCapacitySummary();
    showToast('Perubahan data tenant ' + editId + ' berhasil disimpan.');
  } else {
    if (tenants.length >= MAX_CAPACITY) {
      showToast('Kapasitas tenant sudah penuh (maksimum ' + MAX_CAPACITY + ' stan). Penambahan tenant baru tidak dapat dilakukan.', false);
      return;
    }
    const newId = generateNextId();
    tenants.push({ id: newId, name, type, zone, booth, pic, role: roleMap[pic] || '', contact, email, status: 'Terverifikasi' });
    window.closeTenantModal();
    // Terapkan filter ulang dan pergi ke halaman terakhir agar data baru terlihat
    const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const catVal    = document.getElementById('categoryFilter')?.value || 'all';
    const zoneVal   = document.getElementById('zoneFilter')?.value    || 'all';
    filteredTenants = tenants.filter(t => {
      const text = `${t.id} ${t.name} ${t.type} ${t.zone} ${t.booth} ${t.pic}`.toLowerCase();
      return (!searchVal || text.includes(searchVal)) &&
             (catVal === 'all' || t.type === catVal) &&
             (zoneVal === 'all' || getZoneShort(t.zone) === zoneVal);
    });
    currentPage = Math.max(1, Math.ceil(filteredTenants.length / ITEMS_PER_PAGE));
    renderTable();
    updateCapacitySummary();
    showToast('Tenant baru "' + name + '" sukses ditambahkan ke daftar.');
  }
};

// ─── 11. MODAL HAPUS ────────────────────────────────────────────────────────
let _targetDeleteId = null;

window.openDeleteDialog = function (id, name) {
  _targetDeleteId = id;
  const targetIdEl   = document.getElementById('deleteTargetId');
  const targetNameEl = document.getElementById('deleteTargetName');
  if (targetIdEl)   targetIdEl.textContent   = id;
  if (targetNameEl) targetNameEl.textContent = name;
  document.getElementById('deleteModal')?.classList.remove('hidden');
};

window.closeDeleteDialog = function () {
  document.getElementById('deleteModal')?.classList.add('hidden');
  _targetDeleteId = null;
};

window.confirmDeleteAction = function () {
  if (!_targetDeleteId) return;
  const idx = tenants.findIndex(t => t.id === _targetDeleteId);
  if (idx !== -1) tenants.splice(idx, 1);
  const deletedId = _targetDeleteId;
  window.closeDeleteDialog();
  applyFilters();
  updateCapacitySummary();
  showToast('Data tenant ' + deletedId + ' berhasil dihapus dari sistem.');
};

// ─── 12. MAP MODAL ──────────────────────────────────────────────────────────
window.toggleMapModal = function (show) {
  const map = document.getElementById('mapModal');
  if (!map) return;
  show ? map.classList.remove('hidden') : map.classList.add('hidden');
};

// ─── 13. INISIALISASI ───────────────────────────────────────────────────────
function init() {
  filteredTenants = [...tenants];
  renderTable();
  updateCapacitySummary();

  // Event delegation pada container tabel yang stabil
  const tableWrapper = document.querySelector('.overflow-x-auto');
  if (tableWrapper) {
    tableWrapper.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id     = btn.dataset.id;
      const name   = btn.dataset.name;
      if (action === 'edit')   window.openTenantModal('edit', id);
      if (action === 'delete') window.openDeleteDialog(id, name);
    });
  }

  // Escape key menutup semua modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeTenantModal();
      window.closeDeleteDialog();
      window.toggleMapModal(false);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}