/**
 * jabatan.js - CRUD, Filter, Search, Pagination, & State Logic untuk Manajemen Jabatan Takumi Festival 2025
 */

(function () {
  'use strict';

  // ─── 1. DATA STORE (In-Memory Dataset Jabatan) ─────────────────────────────
  let jabatanList = [
    {
      id: 'JBT-01',
      name: 'Koordinator Utama',
      sub: 'Ketua Pelaksana',
      level: 'pimpinan',
      menjabat: 1,
      deskripsi: 'Penanggung jawab penuh seluruh jalannya festival, otorisasi keputusan strategis, alokasi anggaran utama, dan perizinan instansi eksternal.'
    },
    {
      id: 'JBT-02',
      name: 'Wakil Koordinator Utama',
      sub: 'Wakil Ketua Pelaksana',
      level: 'pimpinan',
      menjabat: 1,
      deskripsi: 'Pendamping pimpinan, pengendalian kepatuhan operasional, pengawas internal lintas divisi lapangan, dan mitigasi risiko darurat.'
    },
    {
      id: 'JBT-03',
      name: 'Sekretaris',
      sub: 'BPH Administrasi',
      level: 'bph',
      menjabat: 2,
      deskripsi: 'Administrasi formal, surat-menyurat resmi, pengarsipan kontrak kemitraan, perizinan venue, dan notulensi rapat akbar festival.'
    },
    {
      id: 'JBT-04',
      name: 'Bendahara',
      sub: 'BPH Finansial',
      level: 'bph',
      menjabat: 2,
      deskripsi: 'Manajemen perputaran anggaran dana festival, verifikasi bukti transaksi pengeluaran pos panitia, dan pelaporan neraca keuangan.'
    },
    {
      id: 'JBT-05',
      name: 'Koordinator Divisi',
      sub: 'Kepala Bidang Divisi',
      level: 'bidang',
      menjabat: 8,
      deskripsi: 'Memimpin koordinasi teknis, pendelegasian tugas anggota, serta evaluasi harian pos kerja masing-masing dari 8 divisi festival.'
    },
    {
      id: 'JBT-06',
      name: 'Anggota Divisi',
      sub: 'Staf Operasional',
      level: 'pelaksana',
      menjabat: 42,
      deskripsi: 'Eksekutor operasional lapangan, pengelolaan logistik di panggung/booth, dan pelayanan langsung terhadap pengunjung festival.'
    },
    {
      id: 'JBT-07',
      name: 'Stage Manager & Show Director',
      sub: 'Pengarah Panggung & Artis',
      level: 'bidang',
      menjabat: 2,
      deskripsi: 'Mengendalikan tata urutan penampilan musisi dan penampil panggung utama agar presisi sesuai master rundown dan time sheet.'
    },
    {
      id: 'JBT-08',
      name: 'Koordinator Liaison Officer (LO)',
      sub: 'Koordinator Pendamping VIP',
      level: 'bidang',
      menjabat: 2,
      deskripsi: 'Memimpin tim pendamping pengawalan guest star artis dan tamu kehormatan dari bandara, hotel, hingga area panggung.'
    },
    {
      id: 'JBT-09',
      name: 'Tim Keamanan Khusus (Quick Response)',
      sub: 'Reaksi Cepat Ketertiban',
      level: 'pelaksana',
      menjabat: 2,
      deskripsi: 'Patroli perimeter luar, evakuasi medis darurat, pengawasan gate masuk, dan penertiban kerumunan penonton barricade pit.'
    },
    {
      id: 'JBT-10',
      name: 'Operator Sistem & Multimedia Live',
      sub: 'Teknisi Siaran & Visual',
      level: 'pelaksana',
      menjabat: 2,
      deskripsi: 'Mengoperasikan video feed LED screen panggung, livestreaming multi-platform, dan infrastruktur server scanner tiket QR.'
    }
  ];

  // State Variables
  let filteredJabatan = [...jabatanList];
  let currentPage = 1;
  const itemsPerPage = 5;
  let rowToDelete = null;

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const tableBody = document.getElementById('tableBody');
  const tableEmptyState = document.getElementById('tableEmptyState');
  const btnResetFilter = document.getElementById('btnResetFilter');
  const badgeRowCount = document.getElementById('badgeRowCount');
  const paginationNotice = document.getElementById('jabatanPaginationNotice');
  const paginationButtons = document.getElementById('jabatanPaginationButtons');

  // Stats Elements
  const statTotalJabatan = document.getElementById('statTotalJabatan');
  const statTierHierarki = document.getElementById('statTierHierarki');
  const statTotalPanitiaMenjabat = document.getElementById('statTotalPanitiaMenjabat');
  const statPosisiPimpinan = document.getElementById('statPosisiPimpinan');

  // Modal Form Elements
  const btnOpenAddModal = document.getElementById('btnOpenAddModal');
  const modalJabatan = document.getElementById('modalJabatan');
  const modalCard = document.getElementById('modalCard');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const formJabatan = document.getElementById('formJabatan');
  const modalTitle = document.getElementById('modalTitle');
  const fieldIdJabatan = document.getElementById('fieldIdJabatan');
  const namaJabatan = document.getElementById('namaJabatan');
  const subJabatan = document.getElementById('subJabatan');
  const jumlahMenjabat = document.getElementById('jumlahMenjabat');
  const levelHierarki = document.getElementById('levelHierarki');
  const deskripsiJabatan = document.getElementById('deskripsiJabatan');

  // Modal Delete Elements
  const modalDelete = document.getElementById('modalDelete');
  const modalDeleteCard = document.getElementById('modalDeleteCard');
  const btnCancelDelete = document.getElementById('btnCancelDelete');
  const btnConfirmDelete = document.getElementById('btnConfirmDelete');
  const delTargetName = document.getElementById('delTargetName');
  const delTargetId = document.getElementById('delTargetId');

  // Modal Detail Elements
  const modalDetailJabatan = document.getElementById('modalDetailJabatan');
  const modalDetailCard = document.getElementById('modalDetailCard');
  const detailTitle = document.getElementById('detailJabatanTitle');
  const detailId = document.getElementById('detailJabatanId');
  const detailSub = document.getElementById('detailJabatanSub');
  const detailLevel = document.getElementById('detailJabatanLevel');
  const detailMenjabat = document.getElementById('detailJabatanMenjabat');
  const detailDesc = document.getElementById('detailJabatanDesc');

  // ─── 2. TOAST HELPER ───────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-space-sm px-4 py-3 rounded-xl shadow-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-surface-container transition-all duration-300 transform translate-y-2 opacity-0';

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
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ─── 3. LEVEL BADGE HELPER ─────────────────────────────────────────────────
  function getLevelConfig(levelVal) {
    if (levelVal === 'pimpinan') {
      return {
        label: 'Level 1 (Pimpinan)',
        badgeClass: 'bg-surface-container-high text-on-primary-container',
        dotColor: 'bg-primary'
      };
    } else if (levelVal === 'bph') {
      return {
        label: 'Level 2 (BPH)',
        badgeClass: 'bg-secondary-container text-on-secondary-fixed',
        dotColor: 'bg-secondary'
      };
    } else if (levelVal === 'bidang') {
      return {
        label: 'Level 3 (Kepala Bidang)',
        badgeClass: 'bg-surface-container text-on-surface-variant',
        dotColor: 'bg-tertiary'
      };
    } else {
      return {
        label: 'Level 4 (Pelaksana Teknis)',
        badgeClass: 'bg-surface-container-low text-on-surface-variant',
        dotColor: 'bg-outline'
      };
    }
  }

  // ─── 4. STATS & METRICS SYNC ───────────────────────────────────────────────
  function updateMetrics() {
    const total = jabatanList.length;
    const totalMenjabat = jabatanList.reduce((sum, j) => sum + (parseInt(j.menjabat) || 0), 0);
    const pimpinanCount = jabatanList.filter(j => j.level === 'pimpinan').length;
    const tierCount = new Set(jabatanList.map(j => j.level)).size;

    if (statTotalJabatan) statTotalJabatan.textContent = total;
    if (statTierHierarki) statTierHierarki.textContent = `${tierCount} Tier Hierarki Aktif`;
    if (statTotalPanitiaMenjabat) statTotalPanitiaMenjabat.textContent = totalMenjabat;
    if (statPosisiPimpinan) statPosisiPimpinan.textContent = pimpinanCount;
    if (badgeRowCount) badgeRowCount.textContent = `${filteredJabatan.length} Record`;
  }

  // ─── 5. RENDER TABLE & ROWS ────────────────────────────────────────────────
  function renderTable() {
    if (!tableBody) return;

    const total = filteredJabatan.length;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, total);
    const pageItems = filteredJabatan.slice(startIdx, endIdx);

    if (badgeRowCount) {
      badgeRowCount.textContent = `${total} Record`;
    }

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
        const levelConfig = getLevelConfig(item.level);

        return `
          <tr class="hover:bg-surface-container-low/40 transition-colors group" data-id="${item.id}" data-level="${item.level}">
            <td class="py-3.5 px-space-md text-center font-label-sm text-label-sm text-outline">${rowNumber}</td>
            <td class="py-3.5 px-space-md">
              <span class="font-label-md text-label-md px-2 py-1 rounded bg-surface-container text-primary font-mono font-semibold">${item.id}</span>
            </td>
            <td class="py-3.5 px-space-md">
              <div class="font-title-sm text-title-sm text-on-surface font-semibold name-field">${item.name}</div>
              <div class="font-body-sm text-body-sm text-on-surface-variant sub-field">${item.sub || 'Peran Fungsional'}</div>
            </td>
            <td class="py-3.5 px-space-md">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${levelConfig.badgeClass} font-label-sm text-label-sm font-semibold">
                <span class="w-1.5 h-1.5 rounded-full ${levelConfig.dotColor}"></span>
                ${levelConfig.label}
              </span>
            </td>
            <td class="py-3.5 px-space-md text-center">
              <span class="inline-flex items-center justify-center min-w-8 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-bold">
                ${item.menjabat || 0} Orang
              </span>
            </td>
            <td class="py-3.5 px-space-md text-on-surface-variant font-body-sm text-body-sm desc-field">
              ${item.deskripsi}
            </td>
            <td class="py-3.5 px-space-md text-right">
              <div class="flex items-center justify-end gap-1">
                <button type="button" class="btn-detail p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" data-id="${item.id}" title="Lihat Detail">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">visibility</span>
                </button>
                <button type="button" class="btn-edit p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" data-id="${item.id}" title="Ubah Data">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">edit</span>
                </button>
                <button type="button" class="btn-delete p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" data-id="${item.id}" title="Hapus Data">
                  <span class="material-symbols-outlined text-body-lg pointer-events-none">delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Update Pagination Notice
    if (paginationNotice) {
      if (total === 0) {
        paginationNotice.innerHTML = 'Menampilkan <span class="font-bold text-on-surface">0</span> dari <span class="font-bold text-on-surface">0</span> entri jabatan';
      } else {
        paginationNotice.innerHTML = `Menampilkan <span class="font-bold text-on-surface">${startIdx + 1} - ${endIdx}</span> dari <span class="font-bold text-on-surface">${total}</span> entri jabatan`;
      }
    }

    renderPaginationButtons(totalPages);
  }

  // ─── 6. RENDER PAGINATION BUTTONS ──────────────────────────────────────────
  function renderPaginationButtons(totalPages) {
    if (!paginationButtons) return;

    if (totalPages <= 1) {
      paginationButtons.innerHTML = '';
      return;
    }

    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;

    let html = `
      <button id="btnJabatanPagePrev" class="px-2.5 py-1 rounded bg-surface-container text-on-surface transition-colors font-medium flex items-center gap-1 ${prevDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container-high'}" ${prevDisabled ? 'disabled' : ''} type="button">
        <span class="material-symbols-outlined text-body-sm pointer-events-none">chevron_left</span>
        <span class="pointer-events-none">Sebelumnya</span>
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === currentPage;
      if (isActive) {
        html += `<button data-page="${p}" class="w-8 h-8 rounded bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm" type="button">${p}</button>`;
      } else {
        html += `<button data-page="${p}" class="w-8 h-8 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" type="button">${p}</button>`;
      }
    }

    html += `
      <button id="btnJabatanPageNext" class="px-2.5 py-1 rounded bg-surface-container text-on-surface transition-colors font-medium flex items-center gap-1 ${nextDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container-high'}" ${nextDisabled ? 'disabled' : ''} type="button">
        <span class="pointer-events-none">Selanjutnya</span>
        <span class="material-symbols-outlined text-body-sm pointer-events-none">chevron_right</span>
      </button>
    `;

    paginationButtons.innerHTML = html;

    const btnPrev = paginationButtons.querySelector('#btnJabatanPagePrev');
    if (btnPrev && !prevDisabled) {
      btnPrev.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      });
    }

    const btnNext = paginationButtons.querySelector('#btnJabatanPageNext');
    if (btnNext && !nextDisabled) {
      btnNext.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderTable();
        }
      });
    }

    paginationButtons.querySelectorAll('button[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
        if (targetPage && targetPage !== currentPage) {
          currentPage = targetPage;
          renderTable();
        }
      });
    });
  }

  // ─── 7. FILTER & SEARCH ────────────────────────────────────────────────────
  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();

    if (clearSearch) {
      clearSearch.classList.toggle('hidden', query === '');
    }

    filteredJabatan = jabatanList.filter(item => {
      return !query ||
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        (item.sub && item.sub.toLowerCase().includes(query)) ||
        item.level.toLowerCase().includes(query) ||
        item.deskripsi.toLowerCase().includes(query);
    });

    currentPage = 1;
    renderTable();
  }

  // ─── 8. MODAL HANDLERS (ANIMATED) ──────────────────────────────────────────
  function openModal(modal, card) {
    if (!modal) return;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    });
  }

  function closeModal(modal, card) {
    if (!modal) return;
    modal.classList.add('opacity-0');
    if (card) {
      card.classList.remove('scale-100');
      card.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }

  function openAddModal() {
    if (!formJabatan) return;
    formJabatan.reset();
    if (fieldIdJabatan) fieldIdJabatan.value = '';
    if (modalTitle) modalTitle.textContent = 'Tambah Jabatan Baru';
    if (jumlahMenjabat) jumlahMenjabat.value = '1';
    openModal(modalJabatan, modalCard);
  }

  function openEditModal(id) {
    const item = jabatanList.find(j => j.id === id);
    if (!item) return;

    if (fieldIdJabatan) fieldIdJabatan.value = item.id;
    if (modalTitle) modalTitle.textContent = `Ubah Jabatan (${item.id})`;
    if (namaJabatan) namaJabatan.value = item.name;
    if (subJabatan) subJabatan.value = item.sub || '';
    if (levelHierarki) levelHierarki.value = item.level;
    if (jumlahMenjabat) jumlahMenjabat.value = item.menjabat || 1;
    if (deskripsiJabatan) deskripsiJabatan.value = item.deskripsi;

    openModal(modalJabatan, modalCard);
  }

  function openDeleteModal(id) {
    const item = jabatanList.find(j => j.id === id);
    if (!item) return;

    rowToDelete = item.id;
    if (delTargetName) delTargetName.textContent = item.name;
    if (delTargetId) delTargetId.textContent = item.id;

    openModal(modalDelete, modalDeleteCard);
  }

  function openDetailModal(id) {
    const item = jabatanList.find(j => j.id === id);
    if (!item || !modalDetailJabatan) return;

    const levelConfig = getLevelConfig(item.level);

    if (detailTitle) detailTitle.textContent = item.name;
    if (detailId) detailId.textContent = item.id;
    if (detailSub) detailSub.textContent = item.sub || 'Peran Fungsional';
    if (detailLevel) {
      detailLevel.textContent = levelConfig.label;
      detailLevel.className = `inline-flex items-center px-2.5 py-1 rounded-full text-label-sm font-semibold ${levelConfig.badgeClass}`;
    }
    if (detailMenjabat) detailMenjabat.textContent = `${item.menjabat || 0} Panitia Menjabat`;
    if (detailDesc) detailDesc.textContent = item.deskripsi;

    openModal(modalDetailJabatan, modalDetailCard);
  }

  // ─── 9. FORM SUBMIT (ADD / EDIT) ───────────────────────────────────────────
  function handleFormSubmit(e) {
    e.preventDefault();
    const isEdit = fieldIdJabatan && fieldIdJabatan.value !== '';
    const nameVal = namaJabatan ? namaJabatan.value.trim() : '';
    const subVal = subJabatan ? subJabatan.value.trim() : '';
    const levelVal = levelHierarki ? levelHierarki.value : 'pelaksana';
    const menjabatVal = jumlahMenjabat ? parseInt(jumlahMenjabat.value, 10) || 1 : 1;
    const descVal = deskripsiJabatan ? deskripsiJabatan.value.trim() : '';

    if (!nameVal || !levelVal || !descVal) {
      showToast('Harap lengkapi semua bidang bertanda bintang!', 'error');
      return;
    }

    if (isEdit) {
      const id = fieldIdJabatan.value;
      const idx = jabatanList.findIndex(j => j.id === id);
      if (idx !== -1) {
        jabatanList[idx].name = nameVal;
        jabatanList[idx].sub = subVal || 'Peran Fungsional';
        jabatanList[idx].level = levelVal;
        jabatanList[idx].menjabat = menjabatVal;
        jabatanList[idx].deskripsi = descVal;
        showToast(`Jabatan ${nameVal} (${id}) berhasil diperbarui!`, 'success');
      }
    } else {
      const maxNum = jabatanList.reduce((max, item) => {
        const num = parseInt(item.id.replace(/[^0-9]/g, ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      const nextNum = maxNum + 1;
      const newId = 'JBT-' + String(nextNum).padStart(2, '0');

      const newItem = {
        id: newId,
        name: nameVal,
        sub: subVal || 'Jabatan Tambahan',
        level: levelVal,
        menjabat: menjabatVal,
        deskripsi: descVal
      };

      jabatanList.unshift(newItem);
      showToast(`Jabatan baru ${nameVal} (${newId}) berhasil ditambahkan!`, 'success');
    }

    closeModal(modalJabatan, modalCard);
    updateMetrics();
    applyFilters();
  }

  // Confirm Delete
  function handleConfirmDelete() {
    if (!rowToDelete) return;

    const idx = jabatanList.findIndex(j => j.id === rowToDelete);
    if (idx !== -1) {
      const deleted = jabatanList[idx];
      jabatanList.splice(idx, 1);
      showToast(`Jabatan ${deleted.name} (${deleted.id}) berhasil dihapus.`, 'error');
      closeModal(modalDelete, modalDeleteCard);
      rowToDelete = null;
      updateMetrics();
      applyFilters();
    }
  }

  // ─── 10. INITIALIZATION ────────────────────────────────────────────────────
  function init() {
    filteredJabatan = [...jabatanList];
    updateMetrics();
    renderTable();

    // Table Row Action Event Delegation
    if (tableBody) {
      tableBody.addEventListener('click', (e) => {
        const btnDetail = e.target.closest('.btn-detail');
        if (btnDetail) {
          const id = btnDetail.getAttribute('data-id');
          if (id) openDetailModal(id);
          return;
        }

        const btnEdit = e.target.closest('.btn-edit');
        if (btnEdit) {
          const id = btnEdit.getAttribute('data-id');
          if (id) openEditModal(id);
          return;
        }

        const btnDelete = e.target.closest('.btn-delete');
        if (btnDelete) {
          const id = btnDelete.getAttribute('data-id');
          if (id) openDeleteModal(id);
          return;
        }
      });
    }

    // Search and Clear
    if (searchInput) searchInput.addEventListener('input', applyFilters);

    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          applyFilters();
          searchInput.focus();
        }
      });
    }

    if (btnResetFilter) {
      btnResetFilter.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          applyFilters();
        }
      });
    }

    // Modal Add Button
    if (btnOpenAddModal) btnOpenAddModal.addEventListener('click', openAddModal);

    // Form Submit
    if (formJabatan) formJabatan.addEventListener('submit', handleFormSubmit);

    // Modal Close Buttons
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => closeModal(modalJabatan, modalCard));
    if (btnCancelModal) btnCancelModal.addEventListener('click', () => closeModal(modalJabatan, modalCard));

    // Delete Modal Buttons
    if (btnCancelDelete) {
      btnCancelDelete.addEventListener('click', () => {
        closeModal(modalDelete, modalDeleteCard);
        rowToDelete = null;
      });
    }

    if (btnConfirmDelete) {
      btnConfirmDelete.addEventListener('click', handleConfirmDelete);
    }

    // Detail Modal Close Buttons
    const btnCloseDetail = document.getElementById('btnCloseDetailJabatan');
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', () => closeModal(modalDetailJabatan, modalDetailCard));
    const btnDoneDetail = document.getElementById('btnDoneDetailJabatan');
    if (btnDoneDetail) btnDoneDetail.addEventListener('click', () => closeModal(modalDetailJabatan, modalDetailCard));

    // Backdrop Click handlers
    [modalJabatan, modalDelete, modalDetailJabatan].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (modal === modalJabatan) closeModal(modalJabatan, modalCard);
          if (modal === modalDelete) { closeModal(modalDelete, modalDeleteCard); rowToDelete = null; }
          if (modal === modalDetailJabatan) closeModal(modalDetailJabatan, modalDetailCard);
        }
      });
    });

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modalJabatan, modalCard);
        closeModal(modalDelete, modalDeleteCard);
        if (modalDetailJabatan) closeModal(modalDetailJabatan, modalDetailCard);
        rowToDelete = null;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
