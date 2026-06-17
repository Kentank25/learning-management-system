import { supabase } from './supabaseClient.js';
import { getState, setState } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';

document.addEventListener('DOMContentLoaded', async () => {
  const usersTableBody = document.getElementById('users-table-body');
  const searchInput = document.getElementById('search-users');
  const filterLevel = document.getElementById('filter-level');
  const filterRole = document.getElementById('filter-role');
  const toastContainer = document.getElementById('toast-container');

  let allUsers = [];
  let filteredUsers = [];
  let currentUserId = null;

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
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold pointer-events-auto shadow-lg transition-all duration-300 transform translate-y-2 opacity-0 glass-panel`;
    
    let iconName = 'check';
    if (type === 'success') {
      toast.classList.add('border-emerald-500/30', 'bg-emerald-50/80', 'text-emerald-700');
      iconName = 'check-circle-2';
    } else {
      toast.classList.add('border-red-500/30', 'bg-red-50/80', 'text-red-700');
      iconName = 'alert-triangle';
    }

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 shrink-0"></i>
      <span class="flex-1">${message}</span>
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

  // 3. Load Users from Supabase Profiles Table
  const loadUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('username', { ascending: true });

      if (error) throw error;

      allUsers = profiles || [];
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
          <select 
            data-user-id="${user.id}" 
            class="edu-level-select px-3 py-1.5 bg-white/70 border border-surface-200/50 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-accent-100 transition-all cursor-pointer"
          >
            <option value="sd" ${user.edu_level === 'sd' ? 'selected' : ''}>SD (Sekolah Dasar)</option>
            <option value="smk" ${user.edu_level === 'smk' ? 'selected' : ''}>SMK (Sekolah Menengah)</option>
            <option value="kuliah" ${user.edu_level === 'kuliah' ? 'selected' : ''}>Kuliah (Universitas)</option>
          </select>
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

  // 5. Setup Action Listeners for Table Rows
  const setupTableListeners = () => {
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
          // Reload local list
          const uIdx = allUsers.findIndex(u => u.id === userId);
          if (uIdx !== -1) {
            allUsers[uIdx].edu_level = newLevel;
            allUsers[uIdx].is_admin = newIsAdmin;
          }
        } catch (err) {
          console.error('Failed to save profile changes:', err);
          showToast('Gagal menyimpan perubahan: ' + err.message, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i><span>Simpan</span>`;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
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

  // Initialize
  await loadUsers();
});
