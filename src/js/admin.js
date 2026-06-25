import { supabase } from './supabaseClient.js';
import { getState, setState } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { Chart } from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', async () => {
  const usersTableBody = document.getElementById('users-table-body');
  const searchInput = document.getElementById('search-users');
  const filterLevel = document.getElementById('filter-level');
  const filterRole = document.getElementById('filter-role');
  const toastContainer = document.getElementById('toast-container');

  // Elements for Courses Tab
  const tabUsers = document.getElementById('tab-users');
  const tabCourses = document.getElementById('tab-courses');
  const usersTabContent = document.getElementById('users-tab-content');
  const coursesTabContent = document.getElementById('courses-tab-content');
  const openAddUserBtn = document.getElementById('open-add-user-btn');
  const openAddCourseBtn = document.getElementById('open-add-course-btn');
  const searchCoursesInput = document.getElementById('search-courses');
  const filterCourseLevel = document.getElementById('filter-course-level');
  const coursesTableBody = document.getElementById('courses-table-body');

  let allUsers = [];
  let filteredUsers = [];
  let allFiles = [];
  let allCourses = [];
  let filteredCourses = [];
  let currentUserId = null;
  let pendingUpdate = null;
  let editingCourseId = null;
  let activeTab = 'users';

  // Variabel Grafik modul
  let userDistributionChart = null;
  let fileUploadsChart = null;

  // 1. Authenticate and verify Admin Status
  const checkAdminAuthorization = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    
    currentUserId = session.user.id;

    // Check admin status in database
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', currentUserId)
      .single();

    if (error || !profile || !profile.is_admin) {
      // Force redirect non-admins
      window.location.href = 'index.html';
      return null;
    }

    return session;
  };

  const session = await checkAdminAuthorization();
  if (!session) return;

  // 2. Custom Elegant Toast Notifications
  const showToast = (message, type = 'success') => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-sm font-semibold shadow-md active:scale-95 transition-all duration-300 transform translate-y-2 opacity-0 cursor-pointer ${
      type === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' 
        : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
    }`;
    
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Trigger animation
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Auto-remove
    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };

  // Fungsi Inisialisasi & Update Grafik Analitik
  const updateCharts = (users, files) => {
    // 1. Hitung data distribusi pengguna (Admin = is_admin, Siswa = edu_level dan bukan admin)
    const adminCount = users.filter(u => u.is_admin).length;
    const sdCount = users.filter(u => u.edu_level === 'sd' && !u.is_admin).length;
    const smkCount = users.filter(u => u.edu_level === 'smk' && !u.is_admin).length;
    const kuliahCount = users.filter(u => u.edu_level === 'kuliah' && !u.is_admin).length;

    // 2. Hitung data unggah berkas per jenjang
    const sdFilesCount = files.filter(f => f.edu_level === 'sd').length;
    const smkFilesCount = files.filter(f => f.edu_level === 'smk').length;
    const kuliahFilesCount = files.filter(f => f.edu_level === 'kuliah').length;

    const userChartCtx = document.getElementById('userDistributionChart');
    const fileChartCtx = document.getElementById('fileUploadsChart');

    if (userChartCtx) {
      if (userDistributionChart) {
        userDistributionChart.destroy();
      }
      userDistributionChart = new Chart(userChartCtx, {
        type: 'doughnut',
        data: {
          labels: ['Admin/Staf', 'Siswa SD', 'Siswa SMK', 'Mahasiswa'],
          datasets: [{
            data: [adminCount, sdCount, smkCount, kuliahCount],
            backgroundColor: [
              '#e11d48', // rose 600
              '#0ea5e9', // sky 500
              '#f59e0b', // amber 500
              '#6366f1'  // indigo 500
            ],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                font: {
                  family: 'Outfit, sans-serif',
                  size: 11,
                  weight: 'bold'
                },
                color: '#4b5563'
              }
            }
          },
          cutout: '65%'
        }
      });
    }

    if (fileChartCtx) {
      if (fileUploadsChart) {
        fileUploadsChart.destroy();
      }
      fileUploadsChart = new Chart(fileChartCtx, {
        type: 'bar',
        data: {
          labels: ['SD', 'SMK', 'Kuliah'],
          datasets: [{
            label: 'Jumlah Unggah Tugas/Berkas',
            data: [sdFilesCount, smkFilesCount, kuliahFilesCount],
            backgroundColor: [
              'rgba(14, 165, 233, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(99, 102, 241, 0.7)'
            ],
            borderColor: [
              '#0ea5e9',
              '#f59e0b',
              '#6366f1'
            ],
            borderWidth: 1.5,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: 'Outfit, sans-serif',
                  size: 11,
                  weight: 'bold'
                },
                color: '#4b5563'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                stepSize: 1,
                font: {
                  family: 'Outfit, sans-serif',
                  size: 11
                },
                color: '#9ca3af'
              }
            }
          }
        }
      });
    }
  };

  // 3. Load Users from Supabase Profiles Table and calculate stats
  const loadUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('username', { ascending: true });

      if (error) throw error;

      allUsers = profiles || [];
      
      // Ambil berkas secara aman untuk statistik
      try {
        const { data: files, error: filesError } = await supabase
          .from('user_files')
          .select('edu_level');
        if (!filesError) {
          allFiles = files || [];
        }
      } catch (fErr) {
        console.warn('Failed to load user_files data:', fErr);
      }
      
      // Update Stats Ringkas
      const statTotalUsers = document.getElementById('stat-total-users');
      const statTotalAdmins = document.getElementById('stat-total-admins');
      const statSdUsers = document.getElementById('stat-sd-users');
      const statSmkUsers = document.getElementById('stat-smk-users');
      const statKuliahUsers = document.getElementById('stat-kuliah-users');

      if (statTotalUsers) statTotalUsers.textContent = allUsers.length;
      if (statTotalAdmins) statTotalAdmins.textContent = allUsers.filter(u => u.is_admin).length;
      if (statSdUsers) statSdUsers.textContent = allUsers.filter(u => u.edu_level === 'sd').length;
      if (statSmkUsers) statSmkUsers.textContent = allUsers.filter(u => u.edu_level === 'smk').length;
      if (statKuliahUsers) statKuliahUsers.textContent = allUsers.filter(u => u.edu_level === 'kuliah').length;

      // Update charts
      updateCharts(allUsers, allFiles);

      applyFilters();
    } catch (err) {
      console.error('Error loading users:', err);
      showToast('Gagal memuat daftar pengguna: ' + err.message, 'error');
      if (usersTableBody) {
        usersTableBody.innerHTML = `
          <tr>
            <td colspan="5" class="px-6 py-12 text-center text-red-500 font-semibold">
              <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2"></i>
              Gagal memuat data pengguna. Silakan segarkan halaman.
            </td>
          </tr>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }
  };

  // 4. Render Table Dinamis
  const renderTable = (users) => {
    if (!usersTableBody) return;
    usersTableBody.innerHTML = '';

    if (users.length === 0) {
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-12 text-center text-surface-450 font-medium">
            Tidak ditemukan pengguna yang sesuai dengan pencarian/filter.
          </td>
        </tr>
      `;
      return;
    }

    users.forEach(user => {
      const isSelf = user.id === currentUserId;
      const emailText = user.email || `<span class="text-surface-400 italic">Tidak tersedia</span>`;
      
      const row = document.createElement('tr');
      row.className = 'hover:bg-white/20 transition-colors';
      row.innerHTML = `
        <!-- Nama Pengguna -->
        <td class="px-6 py-4 font-semibold text-surface-850">
          <div class="flex items-center gap-3">
            <img 
              src="${user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.username)}`}" 
              alt="Avatar ${user.username}" 
              class="w-8 h-8 rounded-full border border-surface-200/50 bg-white"
            />
            <span>
              ${user.username}
              ${isSelf ? '<span class="ml-1.5 px-2 py-0.5 bg-accent-100 text-accent-700 text-[10px] font-extrabold uppercase rounded-full">Anda</span>' : ''}
            </span>
          </div>
        </td>

        <!-- Alamat Email -->
        <td class="px-6 py-4 text-surface-600 font-medium font-sans">
          ${emailText}
        </td>

        <!-- Dropdown Jenjang Pendidikan (edu_level) -->
        <td class="px-6 py-4">
          ${user.is_admin ? `
            <select 
              data-user-id="${user.id}" 
              class="edu-level-select px-3 py-1.5 bg-white/50 border border-surface-200/50 rounded-xl text-xs font-semibold outline-none text-surface-450 opacity-75 pointer-events-none"
              disabled
            >
              <option value="" selected>Administrator (Staf)</option>
            </select>
          ` : `
            <select 
              data-user-id="${user.id}" 
              class="edu-level-select px-3 py-1.5 bg-white/70 border border-surface-200/50 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-accent-100 transition-all cursor-pointer"
            >
              <option value="sd" ${user.edu_level === 'sd' ? 'selected' : ''}>SD (Sekolah Dasar)</option>
              <option value="smk" ${user.edu_level === 'smk' ? 'selected' : ''}>SMK (Sekolah Menengah)</option>
              <option value="kuliah" ${user.edu_level === 'kuliah' ? 'selected' : ''}>Kuliah (Universitas)</option>
            </select>
          `}
        </td>

        <!-- Toggle Saklar Administrator (is_admin) -->
        <td class="px-6 py-4">
          <label class="relative inline-flex items-center cursor-pointer select-none">
            <input 
              type="checkbox" 
              data-user-id="${user.id}"
              class="is-admin-toggle sr-only peer" 
              ${user.is_admin ? 'checked' : ''}
            />
            <div class="w-9 h-5 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500"></div>
          </label>
        </td>

        <!-- Aksi / Tombol Perbarui -->
        <td class="px-6 py-4 text-center">
          <button 
            data-user-id="${user.id}" 
            class="save-user-btn p-1.5 hover:bg-accent-50 text-accent-600 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 font-bold text-xs"
            title="Simpan Perubahan"
          >
            <i data-lucide="save" class="w-4 h-4"></i>
            <span>Simpan</span>
          </button>
        </td>
      `;

      usersTableBody.appendChild(row);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
    setupTableListeners();
  };

  // 5. Execute User Profile Update in Supabase
  const executeUserUpdate = async (userId, newLevel, newIsAdmin, btn) => {
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          edu_level: newLevel,
          is_admin: newIsAdmin
        })
        .eq('id', userId);

      if (error) throw error;

      // Update local state in browser memory if it is the current logged-in user
      if (userId === currentUserId) {
        setState('edu-level', newLevel);
        setState('is-admin', newIsAdmin);

        // Re-apply theme dynamically
        document.documentElement.setAttribute('data-theme', newLevel);

        // Re-render layout
        const sidebar = document.getElementById('sidebar');
        const header = document.getElementById('header');
        if (sidebar) sidebar.innerHTML = renderSidebar();
        if (header) header.innerHTML = renderHeader();
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // If demoted self from admin, redirect
        if (!newIsAdmin) {
          showToast('Anda mendemosikan diri sendiri. Mengalihkan...', 'error');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
          return;
        }
      }

      showToast('Profil pengguna berhasil diperbarui!', 'success');
      
      // Reload local list values
      const uIdx = allUsers.findIndex(u => u.id === userId);
      if (uIdx !== -1) {
        allUsers[uIdx].edu_level = newLevel;
        allUsers[uIdx].is_admin = newIsAdmin;
      }
      
      // Update Stats Ringkas
      const statTotalAdmins = document.getElementById('stat-total-admins');
      const statSdUsers = document.getElementById('stat-sd-users');
      const statSmkUsers = document.getElementById('stat-smk-users');
      const statKuliahUsers = document.getElementById('stat-kuliah-users');

      if (statTotalAdmins) statTotalAdmins.textContent = allUsers.filter(u => u.is_admin).length;
      if (statSdUsers) statSdUsers.textContent = allUsers.filter(u => u.edu_level === 'sd').length;
      if (statSmkUsers) statSmkUsers.textContent = allUsers.filter(u => u.edu_level === 'smk').length;
      if (statKuliahUsers) statKuliahUsers.textContent = allUsers.filter(u => u.edu_level === 'kuliah').length;

      // Perbarui Grafik dan filter pencarian setelah update berhasil
      updateCharts(allUsers, allFiles);
      applyFilters();

    } catch (err) {
      console.error('Failed to save profile changes:', err);
      showToast('Gagal menyimpan perubahan: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i><span>Simpan</span>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  };

  // 6. Setup Action Listeners for Table Rows
  const setupTableListeners = () => {
    // Is admin toggle change event (interactive UI updates)
    const isAdminToggles = document.querySelectorAll('.is-admin-toggle');
    isAdminToggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const row = toggle.closest('tr');
        const tdSelect = row.cells[2]; // Kolom ke-3 (indeks 2) adalah Dropdown select
        const userId = toggle.getAttribute('data-user-id');
        
        if (toggle.checked) {
          tdSelect.innerHTML = `
            <select 
              data-user-id="${userId}" 
              class="edu-level-select px-3 py-1.5 bg-white/50 border border-surface-200/50 rounded-xl text-xs font-semibold outline-none text-surface-450 opacity-75 pointer-events-none"
              disabled
            >
              <option value="" selected>Administrator (Staf)</option>
            </select>
          `;
        } else {
          tdSelect.innerHTML = `
            <select 
              data-user-id="${userId}" 
              class="edu-level-select px-3 py-1.5 bg-white/70 border border-surface-200/50 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-accent-100 transition-all cursor-pointer"
            >
              <option value="sd">SD (Sekolah Dasar)</option>
              <option value="smk" selected>SMK (Sekolah Menengah)</option>
              <option value="kuliah">Kuliah (Universitas)</option>
            </select>
          `;
        }
      });
    });

    // Save button click
    const saveButtons = document.querySelectorAll('.save-user-btn');
    saveButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const userId = btn.getAttribute('data-user-id');
        const row = btn.closest('tr');
        const select = row.querySelector('.edu-level-select');
        const checkbox = row.querySelector('.is-admin-toggle');

        const newLevel = select.value;
        const newIsAdmin = checkbox.checked;

        // Cari status admin sebelumnya dari database/state
        const oldUser = allUsers.find(u => u.id === userId);
        const oldIsAdmin = oldUser ? oldUser.is_admin === true : false;

        // Keamanan: Jika status admin diubah (diaktifkan atau dimatikan), verifikasi password admin!
        if (newIsAdmin !== oldIsAdmin) {
          pendingUpdate = { userId, newLevel, newIsAdmin, btn, select, checkbox, oldIsAdmin };
          const confirmModal = document.getElementById('confirm-password-modal');
          if (confirmModal) confirmModal.classList.remove('hidden');
          return;
        }

        // Jika tidak ada perubahan peran (is_admin), langsung simpan saja
        await executeUserUpdate(userId, newLevel, newIsAdmin, btn);
      });
    });
  };

  // 6. Filtering & Search Logic
  const applyFilters = () => {
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const levelFilter = filterLevel ? filterLevel.value : 'all';
    const roleFilter = filterRole ? filterRole.value : 'all';

    filteredUsers = allUsers.filter(user => {
      // 1. Search filter
      const matchesSearch = 
        user.username.toLowerCase().includes(searchQuery) || 
        (user.email && user.email.toLowerCase().includes(searchQuery));

      // 2. Level filter
      const matchesLevel = levelFilter === 'all' || user.edu_level === levelFilter;

      // 3. Role filter
      const matchesRole = 
        roleFilter === 'all' || 
        (roleFilter === 'admin' && user.is_admin) || 
        (roleFilter === 'user' && !user.is_admin);

      return matchesSearch && matchesLevel && matchesRole;
    });

    renderTable(filteredUsers);
  };

  // Listeners for inputs
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (filterLevel) filterLevel.addEventListener('change', applyFilters);
  if (filterRole) filterRole.addEventListener('change', applyFilters);

  // 7. Modal Controls & Add User Logic
  const addUserModal = document.getElementById('add-user-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const cancelBtn = document.getElementById('cancel-modal-btn');
  const backdrop = document.getElementById('modal-backdrop');
  const addUserForm = document.getElementById('add-user-form');
  const newLevelSelect = document.getElementById('new-level');
  const newIsAdminCheckbox = document.getElementById('new-is-admin');
  const newAdminLabel = document.getElementById('new-admin-label');

  const showModal = () => {
    if (addUserModal) {
      addUserModal.classList.remove('hidden');
      if (addUserForm) addUserForm.reset();
      if (newIsAdminCheckbox && newAdminLabel) {
        newIsAdminCheckbox.checked = false;
        newIsAdminCheckbox.disabled = false;
        newAdminLabel.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
      }
    }
  };

  const hideModal = () => {
    if (addUserModal) addUserModal.classList.add('hidden');
  };

  if (openAddUserBtn) openAddUserBtn.addEventListener('click', showModal);
  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  if (cancelBtn) cancelBtn.addEventListener('click', hideModal);
  if (backdrop) backdrop.addEventListener('click', hideModal);

  // Handle admin checkbox change in modal (Disable level dropdown and set to admin)
  if (newIsAdminCheckbox) {
    newIsAdminCheckbox.addEventListener('change', () => {
      if (newIsAdminCheckbox.checked) {
        let adminOption = newLevelSelect.querySelector('option[value="admin"]');
        if (!adminOption) {
          adminOption = document.createElement('option');
          adminOption.value = 'admin';
          adminOption.textContent = 'Administrator (Staf)';
          newLevelSelect.appendChild(adminOption);
        }
        newLevelSelect.value = 'admin';
        newLevelSelect.disabled = true;
      } else {
        newLevelSelect.disabled = false;
        const adminOption = newLevelSelect.querySelector('option[value="admin"]');
        if (adminOption) adminOption.remove();
        newLevelSelect.value = 'smk';
      }
    });
  }

  // Handle Form Submit
  if (addUserForm) {
    addUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const usernameInput = document.getElementById('new-username').value.trim();
      const emailInput = document.getElementById('new-email').value.trim();
      const passwordInput = document.getElementById('new-password').value;
      const isAdminInput = newIsAdminCheckbox.checked;
      const levelInput = isAdminInput ? null : newLevelSelect.value;

      if (passwordInput.length < 6) {
        showToast('Kata sandi harus minimal 6 karakter.', 'error');
        return;
      }

      const submitBtn = document.getElementById('save-new-user-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Memproses...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      try {
        // Register user via Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: emailInput,
          password: passwordInput,
          options: {
            data: {
              username: usernameInput,
              edu_level: levelInput
            }
          }
        });

        if (error) throw error;

        // If newly registered user is NOT admin, but the admin ticked "Peran Admin", we must update their profile
        if (data.user && isAdminInput) {
          await new Promise(resolve => setTimeout(resolve, 500));
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('id', data.user.id);
          
          if (updateError) {
            console.warn('Failed to promote user to admin in DB:', updateError);
          }
        }

        showToast('Pengguna baru berhasil ditambahkan!', 'success');
        hideModal();
        await loadUsers();
      } catch (err) {
        console.error('Failed to add new user:', err);
        showToast('Gagal menambahkan pengguna: ' + err.message, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="user-plus" class="w-4 h-4"></i><span>Tambah User</span>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }

  // 8. Admin Confirm Password Logic for sensitive role changes
  const confirmPasswordModal = document.getElementById('confirm-password-modal');
  const confirmPasswordForm = document.getElementById('confirm-password-form');
  const closeConfirmBtn = document.getElementById('close-confirm-btn');
  const confirmBackdrop = document.getElementById('confirm-backdrop');
  const adminPasswordInput = document.getElementById('admin-confirm-password');

  const hideConfirmModal = () => {
    if (confirmPasswordModal) confirmPasswordModal.classList.add('hidden');
    if (confirmPasswordForm) confirmPasswordForm.reset();
    
    // Jika dibatalkan, reset toggle is_admin di baris tabel agar kembali ke semula!
    if (pendingUpdate) {
      pendingUpdate.checkbox.checked = pendingUpdate.oldIsAdmin;
      pendingUpdate = null;
    }
  };

  if (closeConfirmBtn) closeConfirmBtn.addEventListener('click', hideConfirmModal);
  if (confirmBackdrop) confirmBackdrop.addEventListener('click', hideConfirmModal);

  if (confirmPasswordForm) {
    confirmPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!pendingUpdate) return;

      const password = adminPasswordInput.value;
      const submitBtn = document.getElementById('submit-confirm-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Memverifikasi...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      try {
        // Dapatkan email admin aktif
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Sesi kedaluwarsa. Silakan masuk kembali.');

        const adminEmail = session.user.email;

        // Verifikasi sandi dengan mencoba login ulang singkat
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: password
        });

        if (authError) {
          throw new Error('Kata sandi administrator salah. Verifikasi gagal.');
        }

        // Jika verifikasi sandi berhasil, jalankan update tertunda
        const { userId, newLevel, newIsAdmin, btn } = pendingUpdate;
        pendingUpdate = null; // reset
        
        if (confirmPasswordModal) confirmPasswordModal.classList.add('hidden');
        if (confirmPasswordForm) confirmPasswordForm.reset();

        await executeUserUpdate(userId, newLevel, newIsAdmin, btn);

      } catch (err) {
        showToast(err.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="lock" class="w-3.5 h-3.5"></i><span>Konfirmasi</span>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }

  // =====================================================
  // KELOLA TABEL KELAS / MATA KULIAH (COURSES TAB LOGIC)
  // =====================================================

  const switchTab = (tab) => {
    activeTab = tab;
    if (tab === 'users') {
      tabUsers.classList.add('border-accent-500', 'text-accent-600');
      tabUsers.classList.remove('border-transparent', 'text-surface-500');
      tabCourses.classList.add('border-transparent', 'text-surface-500');
      tabCourses.classList.remove('border-accent-500', 'text-accent-600');
      
      usersTabContent.classList.remove('hidden');
      coursesTabContent.classList.add('hidden');
      
      openAddUserBtn.classList.remove('hidden');
      openAddCourseBtn.classList.add('hidden');
    } else {
      tabCourses.classList.add('border-accent-500', 'text-accent-600');
      tabCourses.classList.remove('border-transparent', 'text-surface-500');
      tabUsers.classList.add('border-transparent', 'text-surface-500');
      tabUsers.classList.remove('border-accent-500', 'text-accent-600');
      
      coursesTabContent.classList.remove('hidden');
      usersTabContent.classList.add('hidden');
      
      openAddCourseBtn.classList.remove('hidden');
      openAddUserBtn.classList.add('hidden');
      
      // Ambil data kelas
      loadCourses();
    }
  };

  if (tabUsers && tabCourses) {
    tabUsers.addEventListener('click', () => switchTab('users'));
    tabCourses.addEventListener('click', () => switchTab('courses'));
  }

  // Load kelas dari Supabase
  const loadCourses = async () => {
    try {
      if (coursesTableBody) {
        coursesTableBody.innerHTML = `
          <tr>
            <td colspan="6" class="px-6 py-12 text-center text-surface-500">
              <div class="flex flex-col items-center gap-3">
                <i data-lucide="loader-2" class="w-8 h-8 text-accent-500 animate-spin"></i>
                <span class="font-medium">Memuat data kelas...</span>
              </div>
            </td>
          </tr>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      allCourses = data || [];
      applyCoursesFilters();
    } catch (err) {
      console.error('Error loading courses:', err);
      showToast('Gagal memuat daftar kelas: ' + err.message, 'error');
      if (coursesTableBody) {
        coursesTableBody.innerHTML = `
          <tr>
            <td colspan="6" class="px-6 py-12 text-center text-red-500 font-semibold">
              <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2"></i>
              Gagal memuat data kelas. Silakan segarkan halaman.
            </td>
          </tr>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }
  };

  // Render tabel kelas
  const renderCoursesTable = (coursesList) => {
    if (!coursesTableBody) return;
    coursesTableBody.innerHTML = '';

    if (coursesList.length === 0) {
      coursesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-surface-450 font-medium">
            Tidak ditemukan kelas yang sesuai dengan pencarian/filter.
          </td>
        </tr>
      `;
      return;
    }

    coursesList.forEach(course => {
      const row = document.createElement('tr');
      row.className = 'hover:bg-white/20 transition-colors';
      
      const colorPreview = `
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded bg-gradient-to-tr ${course.color_class} shadow-sm border border-white/20"></span>
          <code class="text-[10px] text-surface-500 font-mono">${course.icon}</code>
        </div>
      `;

      row.innerHTML = `
        <!-- Nama Kelas -->
        <td class="px-6 py-4 font-semibold text-surface-850">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded-lg bg-gradient-to-tr ${course.color_class} text-white">
              <i data-lucide="${course.icon || 'book-open'}" class="w-4 h-4"></i>
            </div>
            <span>${course.title}</span>
          </div>
        </td>

        <!-- Pengajar -->
        <td class="px-6 py-4 text-surface-600 font-medium font-sans">
          ${course.teacher}
        </td>

        <!-- Jenjang -->
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
            course.edu_level === 'sd' ? 'bg-sky-100 text-sky-700' : (course.edu_level === 'kuliah' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700')
          }">
            ${course.edu_level === 'sd' ? 'SD' : (course.edu_level === 'kuliah' ? 'Kuliah' : 'SMK')}
          </span>
        </td>

        <!-- Tag / Keterangan -->
        <td class="px-6 py-4 text-surface-500 text-xs font-semibold">
          ${course.tag || '-'}
        </td>

        <!-- Representasi Visual -->
        <td class="px-6 py-4">
          ${colorPreview}
        </td>

        <!-- Aksi Edit & Hapus -->
        <td class="px-6 py-4 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button 
              data-course-id="${course.id}" 
              class="edit-course-btn p-1.5 hover:bg-accent-50 text-accent-650 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              title="Edit Kelas"
            >
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button 
              data-course-id="${course.id}" 
              class="delete-course-btn p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              title="Hapus Kelas"
            >
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      `;

      coursesTableBody.appendChild(row);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
    setupCoursesTableListeners();
  };

  // Filter & Search untuk Kelas
  const applyCoursesFilters = () => {
    const query = searchCoursesInput ? searchCoursesInput.value.toLowerCase().trim() : '';
    const level = filterCourseLevel ? filterCourseLevel.value : 'all';

    filteredCourses = allCourses.filter(c => {
      const matchesSearch = 
        c.title.toLowerCase().includes(query) || 
        c.teacher.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query));
      
      const matchesLevel = level === 'all' || c.edu_level === level;
      return matchesSearch && matchesLevel;
    });

    renderCoursesTable(filteredCourses);
  };

  if (searchCoursesInput) searchCoursesInput.addEventListener('input', applyCoursesFilters);
  if (filterCourseLevel) filterCourseLevel.addEventListener('change', applyCoursesFilters);

  // Modal Kelas DOM & Handlers
  const courseModal = document.getElementById('course-modal');
  const courseForm = document.getElementById('course-form');
  const courseModalTitle = document.getElementById('course-modal-title');
  const courseModalIcon = document.getElementById('course-modal-icon');
  const saveCourseBtn = document.getElementById('save-course-btn');
  
  const openCourseModal = (course = null) => {
    if (course) {
      // Mode Edit
      editingCourseId = course.id;
      courseModalTitle.textContent = 'Edit Kelas / Mata Pelajaran';
      if (courseModalIcon) {
        courseModalIcon.setAttribute('data-lucide', 'edit-3');
        courseModalIcon.className = 'w-6 h-6 text-accent-500';
      }
      saveCourseBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i><span>Simpan Perubahan</span>`;
      
      document.getElementById('course-id').value = course.id;
      document.getElementById('course-title').value = course.title;
      document.getElementById('course-teacher').value = course.teacher;
      document.getElementById('course-level').value = course.edu_level;
      document.getElementById('course-tag').value = course.tag || '';
      document.getElementById('course-description').value = course.description || '';
      document.getElementById('course-icon').value = course.icon || 'book-open';
      document.getElementById('course-color').value = course.color_class || 'from-sky-400 to-blue-600';
    } else {
      // Mode Tambah Baru
      editingCourseId = null;
      courseModalTitle.textContent = 'Tambah Kelas Baru';
      if (courseModalIcon) {
        courseModalIcon.setAttribute('data-lucide', 'plus-circle');
        courseModalIcon.className = 'w-6 h-6 text-accent-500';
      }
      saveCourseBtn.innerHTML = `<i data-lucide="plus-circle" class="w-4 h-4"></i><span>Simpan Kelas</span>`;
      
      if (courseForm) courseForm.reset();
      document.getElementById('course-id').value = '';
    }

    if (courseModal) courseModal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const hideCourseModal = () => {
    if (courseModal) courseModal.classList.add('hidden');
    editingCourseId = null;
  };

  if (openAddCourseBtn) openAddCourseBtn.addEventListener('click', () => openCourseModal(null));
  
  const closeCourseModalBtns = document.querySelectorAll('#close-course-modal, #close-course-modal-btn, #course-modal-backdrop');
  closeCourseModalBtns.forEach(btn => btn.addEventListener('click', hideCourseModal));

  // Handle submit form kelas
  if (courseForm) {
    courseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('course-title').value.trim();
      const teacher = document.getElementById('course-teacher').value.trim();
      const level = document.getElementById('course-level').value;
      const tag = document.getElementById('course-tag').value.trim();
      const description = document.getElementById('course-description').value.trim();
      const icon = document.getElementById('course-icon').value;
      const color_class = document.getElementById('course-color').value;

      saveCourseBtn.disabled = true;
      saveCourseBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Menyimpan...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      try {
        const payload = {
          title,
          teacher,
          edu_level: level,
          tag,
          description,
          icon,
          color_class,
          is_active: true
        };

        if (editingCourseId) {
          // Edit kelas di database
          const { error } = await supabase
            .from('courses')
            .update(payload)
            .eq('id', editingCourseId);

          if (error) throw error;
          showToast('Kelas berhasil diperbarui!', 'success');
        } else {
          // Tambah kelas baru di database
          const { error } = await supabase
            .from('courses')
            .insert(payload);

          if (error) throw error;
          showToast('Kelas baru berhasil ditambahkan!', 'success');
        }

        hideCourseModal();
        await loadCourses();
      } catch (err) {
        console.error('Failed to save course:', err);
        showToast('Gagal menyimpan kelas: ' + err.message, 'error');
      } finally {
        saveCourseBtn.disabled = false;
        if (editingCourseId) {
          saveCourseBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i><span>Simpan Perubahan</span>`;
        } else {
          saveCourseBtn.innerHTML = `<i data-lucide="plus-circle" class="w-4 h-4"></i><span>Simpan Kelas</span>`;
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }

  // Edit & Hapus listeners di tabel kelas
  const setupCoursesTableListeners = () => {
    // Tombol Edit
    const editBtns = document.querySelectorAll('.edit-course-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-course-id');
        const course = allCourses.find(c => c.id === parseInt(courseId));
        if (course) {
          openCourseModal(course);
        }
      });
    });

    // Tombol Hapus
    const deleteBtns = document.querySelectorAll('.delete-course-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const courseId = btn.getAttribute('data-course-id');
        const course = allCourses.find(c => c.id === parseInt(courseId));
        if (!course) return;

        if (confirm(`Apakah Anda yakin ingin menghapus kelas "${course.title}" secara permanen? Tindakan ini tidak dapat dibatalkan.`)) {
          btn.disabled = true;
          btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i>`;
          if (typeof lucide !== 'undefined') lucide.createIcons();

          try {
            const { error } = await supabase
              .from('courses')
              .delete()
              .eq('id', course.id);

            if (error) throw error;
            showToast('Kelas berhasil dihapus!', 'success');
            await loadCourses();
          } catch (err) {
            console.error('Failed to delete course:', err);
            showToast('Gagal menghapus kelas: ' + err.message, 'error');
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="trash-2" class="w-4 h-4"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
          }
        }
      });
    });
  };

  // Initialize
  await loadUsers();
});
