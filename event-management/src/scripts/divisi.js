/**
 * divisi.js - CRUD, Filter, Search, Pagination, & State Logic untuk Manajemen Divisi Takumi Festival 2025
 */

(function () {
  'use strict';

  // ─── 1. DATA STORE (In-Memory Dataset Divisi) ─────────────────────────────
  let divisiList = [
    {
      id: 'DIV-01',
      name: 'Divisi Acara',
      anggota: 12,
      kuota: 15,
      koordinator: 'Budi Santoso',
      deskripsi: 'Bertanggung jawab atas penyusunan master rundown panggung utama, kurasi pengisi acara bintang tamu, gladi resik, dan flow acara festival.',
      status: 'Aktif'
    },
    {
      id: 'DIV-02',
      name: 'Divisi Logistik & Perlengkapan',
      anggota: 14,
      kuota: 15,
      koordinator: 'Dimas Pratama',
      deskripsi: 'Mengelola tata panggung, sistem tata suara line-array, pencahayaan panggung, genset cadangan 100kVA, tenda sarnafil, dan barikade penonton.',
      status: 'Aktif'
    },
    {
      id: 'DIV-03',
      name: 'Divisi Sponsorship & Dana',
      anggota: 6,
      kuota: 8,
      koordinator: 'Farah Nabila',
      deskripsi: 'Menggalang kemitraan komersial, penyusunan kontrak benefit sponsor platinum/gold, dan aktivasi booth promosi brand pendukung.',
      status: 'Aktif'
    },
    {
      id: 'DIV-04',
      name: 'Divisi Lomba & Kompetisi',
      anggota: 8,
      kuota: 10,
      koordinator: 'Siti Rahma',
      deskripsi: 'Menyelenggarakan registrasi peserta lomba Cosplay Walk, Anisong Singing Contest, dan kompetisi E-Sports serta rekapitulasi penilaian dewan juri.',
      status: 'Aktif'
    },
    {
      id: 'DIV-05',
      name: 'Divisi Tenant & Bazaar',
      anggota: 7,
      kuota: 8,
      koordinator: 'Hendra Kurniawan',
      deskripsi: 'Mengatur penempatan 25 stan kuliner Jepang dan merchandise komunitas, perizinan kelistrikan, serta ketertiban zona bazaar.',
      status: 'Aktif'
    },
    {
      id: 'DIV-06',
      name: 'Divisi Publikasi & Dokumentasi',
      anggota: 6,
      kuota: 8,
      koordinator: 'Jessica Tan',
      deskripsi: 'Publikasi media sosial resmi festival, siaran pers, peliputan fotografi panggung, aftermovie, dan siaran langsung multi-platform.',
      status: 'Aktif'
    },
    {
      id: 'DIV-07',
      name: 'Divisi Keamanan & Ketertiban',
      anggota: 6,
      kuota: 6,
      koordinator: 'Ahmad Fauzi',
      deskripsi: 'Pengamanan gerbang tiket, metal detector, pengendalian massa penonton, pengawalan artis, dan sterilisasi jalur evakuasi darurat.',
      status: 'Aktif'
    },
    {
      id: 'DIV-08',
      name: 'Divisi Konsumsi & Medis',
      anggota: 5,
      kuota: 6,
      koordinator: 'Gita Savitri',
      deskripsi: 'Distribusi konsumsi 250 porsi kru & pengisi acara per shift, penyediaan air minum posko panitia, serta posko pertolongan pertama (P3K).',
      status: 'Aktif'
    },
    {
      id: 'DIV-09',
      name: 'Divisi Desain Kreatif & IT',
      anggota: 5,
      kuota: 6,
      koordinator: 'Kevin Sanjaya',
      deskripsi: 'Pembuatan visual projection mapping panggung, desain banner festival, aplikasi web sistem manajemen acara, dan jaringan internet panitia.',
      status: 'Aktif'
    },
    {
      id: 'DIV-10',
      name: 'Divisi Hubungan Masyarakat & VIP',
      anggota: 4,
      kuota: 5,
      koordinator: 'Zaskia Sungkar',
      deskripsi: 'Penyambutan tamu kehormatan rektorat dan delegasi budaya Jepang, protokoler seremonial pembukaan, serta koordinasi liaison officer.',
      status: 'Aktif'
    }
  ];

  // State Variables
  let filteredDivisi = [...divisiList];
  let currentPage = 1;
  const itemsPerPage = 5;
  let activeDivisiToDelete = null;

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const btnTambahDivisi = document.getElementById('btnTambahDivisi');
  const tableBody = document.querySelector('#divisiTable tbody');
  const tableEmptyState = document.getElementById('divisiEmptyState');
  const btnClearSearchDivisi = document.getElementById('btnClearSearchDivisi');
  const divisiCountLabel = document.getElementById('divisiCountLabel');
  const paginationNotice = document.getElementById('divisiPaginationNotice');
  const paginationButtons = document.getElementById('divisiPaginationButtons');

  // Stats Elements
  const statTotalDivisi = document.getElementById('statTotalDivisi');
  const statAvgAnggota = document.getElementById('statAvgAnggota');
  const statDivisiTerbesar = document.getElementById('statDivisiTerbesar');
  const statMaxAnggota = document.getElementById('statMaxAnggota');
  const statTotalKebutuhan = document.getElementById('statTotalKebutuhan');
  const divisionAllocationList = document.getElementById('divisionAllocationList');

  // Modals Elements
  const modalTambahDivisi = document.getElementById('modalTambahDivisi');
  const modalConfirmDelete = document.getElementById('modalConfirmDelete');
  const modalDetailDivisi = document.getElementById('modalDetailDivisi');
  const divisiForm = document.getElementById('divisiForm');

  // Form Fields
  const formActionType = document.getElementById('formActionType');
  const editDivisiId = document.getElementById('editDivisiId');
  const modalTitle = document.getElementById('modalTitle');
  const namaDivisiInput = document.getElementById('namaDivisi');
  const koordinatorDivisiInput = document.getElementById('koordinatorDivisi');
  const targetKuotaInput = document.getElementById('targetKuota');
  const deskripsiTugasInput = document.getElementById('deskripsiTugas');

  // Delete Prompt
  const deletePromptText = document.getElementById('deletePromptText');

  // Detail Fields
  const detailModalTitle = document.getElementById('detailModalTitle');
  const detailId = document.getElementById('detailId');
  const detailKoor = document.getElementById('detailKoor');
  const detailAnggota = document.getElementById('detailAnggota');
  const detailQuotaText = document.getElementById('detailQuotaText');
  const detailPercent = document.getElementById('detailPercent');
  const detailProgressBar = document.getElementById('detailProgressBar');
  const detailDeskripsi = document.getElementById('detailDeskripsi');

  // ─── 2. TOAST MANAGER ──────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-space-sm px-4 py-3 rounded-xl shadow-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-surface-container transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto';

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
    }, 3800);
  }

  // ─── 3. STATS & LIVE MONITOR SYNC ──────────────────────────────────────────
  function updateMetrics() {
    const totalDiv = divisiList.length;
    const totalAnggota = divisiList.reduce((sum, d) => sum + (parseInt(d.anggota) || 0), 0);
    const totalKuota = divisiList.reduce((sum, d) => sum + (parseInt(d.kuota) || 0), 0);
    const avg = totalDiv > 0 ? Math.round(totalAnggota / totalDiv) : 0;

    // Find largest division
    let largest = divisiList[0] || null;
    divisiList.forEach(d => {
      if (!largest || d.anggota > largest.anggota) largest = d;
    });

    if (statTotalDivisi) {
      statTotalDivisi.innerHTML = `${totalDiv} <span class="font-body-sm text-body-sm text-on-surface-variant font-normal">Divisi Resmi</span>`;
    }
    if (statAvgAnggota) {
      statAvgAnggota.innerHTML = `${avg} <span class="font-body-sm text-body-sm text-on-surface-variant font-normal">Panitia / Divisi</span>`;
    }
    if (statDivisiTerbesar && largest) {
      statDivisiTerbesar.textContent = largest.name;
    }
    if (statMaxAnggota && largest) {
      statMaxAnggota.textContent = `${largest.anggota} Panitia`;
    }
    if (statTotalKebutuhan) {
      statTotalKebutuhan.textContent = `${totalAnggota} dari ${totalKuota} Panitia`;
    }

    renderAllocationMonitor();
  }

  function renderAllocationMonitor() {
    if (!divisionAllocationList) return;

    // Take top 4 or all items
    const displayList = divisiList.slice(0, 4);
    divisionAllocationList.innerHTML = displayList.map(item => {
      const pct = Math.round(((parseInt(item.anggota) || 0) / (parseInt(item.kuota) || 1)) * 100);
      const isFull = pct >= 100;
      const badgeClass = isFull
        ? 'bg-primary text-on-primary'
        : (pct >= 85 ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface');

      return `
        <div class="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
          <div class="flex items-center justify-between mb-1">
            <span class="font-title-sm text-title-sm text-on-surface text-sm font-semibold truncate mr-2">${item.name}</span>
            <span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full ${badgeClass} font-bold whitespace-nowrap">${pct}%${isFull ? ' Penuh' : ''}</span>
          </div>
          <div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1.5">
            <span>${item.anggota} Panitia Aktif</span>
            <span>Target: ${item.kuota}</span>
          </div>
          <div class="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div class="bg-primary h-2 rounded-full transition-all duration-300" style="width: ${Math.min(pct, 100)}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── 4. RENDER TABLE & ROWS ────────────────────────────────────────────────
  function renderTable() {
    if (!tableBody) return;

    const total = filteredDivisi.length;
    const totalPages = Math.ceil(total / itemsPerPage) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, total);
    const pageItems = filteredDivisi.slice(startIdx, endIdx);

    if (divisiCountLabel) {
      divisiCountLabel.textContent = total + ' Divisi';
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
        const ang = parseInt(item.anggota) || 0;
        const kuota = parseInt(item.kuota) || 1;
        const pct = Math.round((ang / kuota) * 100);
        const isFull = ang >= kuota;

        return `
          <tr class="hover:bg-surface-container-low/60 transition-colors group" data-id="${item.id}">
            <td class="py-space-sm px-space-md text-center text-on-surface-variant font-label-md">${rowNumber}</td>
            <td class="py-space-sm px-space-md">
              <span class="px-2 py-0.5 rounded bg-surface-container text-primary font-mono font-label-sm text-label-sm font-semibold">${item.id}</span>
            </td>
            <td class="py-space-sm px-space-md font-medium text-on-surface">${item.name}</td>
            <td class="py-space-sm px-space-md">
              <span class="inline-flex items-center gap-1 font-label-md text-label-md text-on-surface">
                <span class="material-symbols-outlined text-body-sm text-primary">person</span>
                ${ang} Panitia
              </span>
            </td>
            <td class="py-space-sm px-space-md">
              <div class="space-y-1">
                <div class="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>${ang}/${kuota} Kuota ${isFull ? '(Penuh)' : ''}</span>
                  <span class="font-semibold text-primary">${pct}%</span>
                </div>
                <div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div class="bg-primary h-1.5 rounded-full transition-all duration-300" style="width: ${Math.min(pct, 100)}%"></div>
                </div>
              </div>
            </td>
            <td class="py-space-sm px-space-md text-on-surface-variant">${item.koordinator || 'Belum Ditunjuk'}</td>
            <td class="py-space-sm px-space-md text-right">
              <div class="flex items-center justify-end gap-space-xs">
                <button type="button" class="btn-action-detail p-1.5 rounded-lg text-primary hover:bg-surface-container transition-colors" data-id="${item.id}" title="Detail Divisi">
                  <span class="material-symbols-outlined text-body-md pointer-events-none">visibility</span>
                </button>
                <button type="button" class="btn-action-edit p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors" data-id="${item.id}" title="Edit Divisi">
                  <span class="material-symbols-outlined text-body-md pointer-events-none">edit</span>
                </button>
                <button type="button" class="btn-action-delete p-1.5 rounded-lg text-error hover:bg-error-container/30 transition-colors" data-id="${item.id}" title="Hapus Divisi">
                  <span class="material-symbols-outlined text-body-md pointer-events-none">delete</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Update Pagination Notice Text
    if (paginationNotice) {
      if (total === 0) {
        paginationNotice.innerHTML = 'Menampilkan <span class="font-semibold text-on-surface">0</span> dari <span class="font-semibold text-on-surface">0</span> divisi';
      } else {
        paginationNotice.innerHTML = `Menampilkan <span class="font-semibold text-on-surface">${startIdx + 1} - ${endIdx}</span> dari <span class="font-semibold text-on-surface">${total}</span> divisi`;
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
      <button id="btnDivisiPagePrev" class="px-2.5 py-1 rounded bg-surface-container text-on-surface transition-colors font-medium flex items-center gap-1 ${prevDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container-high'}" ${prevDisabled ? 'disabled' : ''} type="button">
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
      <button id="btnDivisiPageNext" class="px-2.5 py-1 rounded bg-surface-container text-on-surface transition-colors font-medium flex items-center gap-1 ${nextDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container-high'}" ${nextDisabled ? 'disabled' : ''} type="button">
        <span class="pointer-events-none">Selanjutnya</span>
        <span class="material-symbols-outlined text-body-sm pointer-events-none">chevron_right</span>
      </button>
    `;

    paginationButtons.innerHTML = html;

    const btnPrev = paginationButtons.querySelector('#btnDivisiPagePrev');
    if (btnPrev && !prevDisabled) {
      btnPrev.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      });
    }

    const btnNext = paginationButtons.querySelector('#btnDivisiPageNext');
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

  // ─── 6. FILTER & SEARCH LOGIC ──────────────────────────────────────────────
  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();

    if (searchClear) {
      searchClear.classList.toggle('hidden', q.length === 0);
    }

    filteredDivisi = divisiList.filter(item => {
      return !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.koordinator && item.koordinator.toLowerCase().includes(q)) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(q));
    });

    currentPage = 1;
    renderTable();
  }

  // ─── 7. MODALS ANIMATION & ACTIONS ─────────────────────────────────────────
  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const card = modal.querySelector('div[id$="Card"]');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    }, 10);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('opacity-0');
    const card = modal.querySelector('div[id$="Card"]');
    if (card) {
      card.classList.remove('scale-100');
      card.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 200);
  }

  function openAddModal() {
    if (!divisiForm) return;
    divisiForm.reset();
    if (formActionType) formActionType.value = 'add';
    if (editDivisiId) editDivisiId.value = '';
    if (modalTitle) modalTitle.textContent = 'Tambah Divisi Baru';

    openModal(modalTambahDivisi);
  }

  function openEditModal(id) {
    const item = divisiList.find(d => d.id === id);
    if (!item) return;

    if (modalTitle) modalTitle.textContent = 'Ubah Data Divisi: ' + item.id;
    if (formActionType) formActionType.value = 'edit';
    if (editDivisiId) editDivisiId.value = item.id;
    if (namaDivisiInput) namaDivisiInput.value = item.name;
    if (koordinatorDivisiInput) koordinatorDivisiInput.value = item.koordinator || '';
    if (targetKuotaInput) targetKuotaInput.value = item.kuota;
    if (deskripsiTugasInput) deskripsiTugasInput.value = item.deskripsi || '';

    openModal(modalTambahDivisi);
  }

  function openDeleteModal(id) {
    const item = divisiList.find(d => d.id === id);
    if (!item) return;

    activeDivisiToDelete = id;
    if (deletePromptText) {
      deletePromptText.textContent = `Apakah Anda yakin ingin menghapus "${item.name}" (${item.id})? Tindakan ini akan menghapus alokasi anggota terkait.`;
    }
    openModal(modalConfirmDelete);
  }

  function executeDelete() {
    if (!activeDivisiToDelete) return;

    const idx = divisiList.findIndex(d => d.id === activeDivisiToDelete);
    if (idx !== -1) {
      const deleted = divisiList[idx];
      divisiList.splice(idx, 1);
      showToast(`Data divisi "${deleted.name}" (${deleted.id}) berhasil dihapus.`, 'success');
      closeModal(modalConfirmDelete);
      activeDivisiToDelete = null;
      updateMetrics();
      applyFilters();
    }
  }

  function openDetailModal(id) {
    const item = divisiList.find(d => d.id === id);
    if (!item || !modalDetailDivisi) return;

    const ang = parseInt(item.anggota) || 0;
    const kuota = parseInt(item.kuota) || 1;
    const pct = Math.round((ang / kuota) * 100);

    if (detailModalTitle) detailModalTitle.textContent = item.name;
    if (detailId) detailId.textContent = item.id;
    if (detailKoor) detailKoor.textContent = item.koordinator || 'Belum Ditunjuk';
    if (detailAnggota) detailAnggota.textContent = ang + ' Panitia';
    if (detailQuotaText) detailQuotaText.textContent = `${ang} dari ${kuota} Kuota`;
    if (detailPercent) detailPercent.textContent = pct + '%';
    if (detailProgressBar) detailProgressBar.style.width = Math.min(pct, 100) + '%';
    if (detailDeskripsi) detailDeskripsi.textContent = item.deskripsi || 'Tidak ada deskripsi khusus.';

    openModal(modalDetailDivisi);
  }

  // Form Submit Handler
  function handleFormSubmit(e) {
    e.preventDefault();
    const nama = namaDivisiInput ? namaDivisiInput.value.trim() : '';
    const koor = koordinatorDivisiInput ? koordinatorDivisiInput.value.trim() : '';
    const kuota = targetKuotaInput ? parseInt(targetKuotaInput.value) : 10;
    const deskripsi = deskripsiTugasInput ? deskripsiTugasInput.value.trim() : '';
    const action = formActionType ? formActionType.value : 'add';

    if (!nama || !kuota) {
      showToast('Harap lengkapi nama divisi dan target kuota!', 'error');
      return;
    }

    if (action === 'add') {
      const maxNum = divisiList.reduce((max, item) => {
        const num = parseInt(item.id.replace(/[^0-9]/g, ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 0);
      const nextNum = maxNum + 1;
      const newId = 'DIV-' + String(nextNum).padStart(2, '0');

      const newItem = {
        id: newId,
        name: nama,
        anggota: 0,
        kuota: kuota,
        koordinator: koor || 'Belum Ditunjuk',
        deskripsi: deskripsi || ('Divisi ini bertanggung jawab atas operasional aspek ' + nama + '.'),
        status: 'Aktif'
      };

      divisiList.unshift(newItem);
      showToast(`Divisi baru "${nama}" (${newId}) berhasil ditambahkan!`, 'success');
    } else {
      const id = editDivisiId ? editDivisiId.value : '';
      const idx = divisiList.findIndex(d => d.id === id);
      if (idx !== -1) {
        divisiList[idx].name = nama;
        divisiList[idx].kuota = kuota;
        if (koor) divisiList[idx].koordinator = koor;
        if (deskripsi) divisiList[idx].deskripsi = deskripsi;
        showToast(`Divisi ${id} ("${nama}") berhasil diperbarui!`, 'success');
      }
    }

    closeModal(modalTambahDivisi);
    updateMetrics();
    applyFilters();
  }

  // ─── 8. INITIALIZATION ────────────────────────────────────────────────────
  function init() {
    filteredDivisi = [...divisiList];
    updateMetrics();
    renderTable();

    // Table Row Action Delegation
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

    // Search input
    if (searchInput) searchInput.addEventListener('input', applyFilters);

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          applyFilters();
          searchInput.focus();
        }
      });
    }

    if (btnClearSearchDivisi) {
      btnClearSearchDivisi.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        applyFilters();
      });
    }

    // Tambah Divisi Button
    if (btnTambahDivisi) btnTambahDivisi.addEventListener('click', openAddModal);

    // Form Submit
    if (divisiForm) divisiForm.addEventListener('submit', handleFormSubmit);

    // Delete Modal Confirm & Cancel
    const btnCancelDelete = modalConfirmDelete ? modalConfirmDelete.querySelector('button[onclick*="closeModal"]') : null;
    if (btnCancelDelete) {
      btnCancelDelete.removeAttribute('onclick');
      btnCancelDelete.addEventListener('click', () => closeModal(modalConfirmDelete));
    }

    const btnExecDelete = modalConfirmDelete ? modalConfirmDelete.querySelector('button[onclick*="executeDelete"]') : null;
    if (btnExecDelete) {
      btnExecDelete.removeAttribute('onclick');
      btnExecDelete.addEventListener('click', executeDelete);
    }

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-close-modal');
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
      });
    });

    // Backdrop Click Handlers
    [modalTambahDivisi, modalConfirmDelete, modalDetailDivisi].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Keyboard ESC Listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modalTambahDivisi);
        closeModal(modalConfirmDelete);
        closeModal(modalDetailDivisi);
      }
    });

    // Expose needed globals for any legacy handlers
    window.closeDivisiModal = function(id) {
      const modal = document.getElementById(id);
      if (modal) closeModal(modal);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
