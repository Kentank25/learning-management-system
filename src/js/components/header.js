import { getState } from '../store.js';

/**
 * Renders the header HTML content dynamically based on user and educational level.
 * @returns {string} The HTML string for the header.
 */
export function renderHeader() {
  const username = getState('username', 'Keane');
  const eduLevel = getState('edu-level', 'smk');
  const isAdmin = getState('is-admin') === true;
  
  let avatarColor = '2563eb'; // Default blue for SMK
  let roleName = 'Siswa Kejuruan RPL 💻';
  
  if (isAdmin) {
    avatarColor = '9333ea'; // Purple 600 untuk Admin
    roleName = 'Administrator Sistem 🛡️';
  } else if (eduLevel === 'sd') {
    avatarColor = '0ea5e9'; // Sky blue untuk SD
    roleName = 'Murid Sekolah Dasar 🌟';
  } else if (eduLevel === 'kuliah') {
    avatarColor = '6366f1'; // Indigo untuk College
    roleName = 'Mahasiswa Universitas 🎓';
  }
  
  const avatarBg = isAdmin ? 'f3e8ff' : 'dbeafe'; // Background purple 100 untuk avatar admin
  const profileImgSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${avatarBg}&color=${avatarColor}`;
  const isSD = eduLevel === 'sd';

  return `
    <div class="flex items-center gap-4">
      <button
        id="mobile-menu-btn"
        class="p-2 text-surface-500 hover:bg-white/50 rounded-lg md:hidden transition-colors"
      >
        <i data-lucide="menu" class="w-5 h-5"></i>
      </button>
      
      <!-- Search Bar (hidden in SD & Admin) -->
      ${(!isSD && !isAdmin) ? `
      <div class="hidden sm:flex items-center relative">
        <i data-lucide="search" class="w-4 h-4 absolute left-3 text-surface-400"></i>
        <input
          type="text"
          placeholder="Cari materi, tugas, atau kelas..."
          class="pl-9 pr-4 py-2 w-64 md:w-80 bg-white/50 border border-surface-200/50 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-100 rounded-full text-sm outline-none transition-all"
        />
      </div>
      ` : ''}
    </div>

    <!-- Header Right: Notifications & Profile -->
    <div class="flex items-center gap-3">
      <!-- Notification Bell Wrapper -->
      <div class="relative">
        <button
          id="notification-btn"
          class="relative p-2 text-surface-500 hover:bg-white/50 rounded-full transition-colors cursor-pointer"
        >
          <i data-lucide="bell" class="w-5 h-5"></i>
          <span
            id="notification-badge"
            class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse hidden"
          ></span>
        </button>
        
        <!-- Notification Dropdown Panel -->
        <div
          id="notification-dropdown"
          class="hidden absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm glass-panel rounded-2xl p-4 z-50 text-sm space-y-3 dropdown-menu"
        >
          <div class="flex items-center justify-between border-b border-surface-100/50 pb-2">
            <h4 class="font-bold text-surface-900">Pemberitahuan</h4>
            <button id="mark-all-read" class="text-xs text-accent-600 hover:text-accent-700 font-semibold cursor-pointer">Tandai semua dibaca</button>
          </div>
          <div id="notification-list" class="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            <!-- Notifications dynamically rendered by main.js -->
          </div>
        </div>
      </div>

      <!-- Chat Icon (hidden in SD) -->
      ${!isSD ? `
      <button
        class="relative p-2 text-surface-500 hover:bg-white/50 rounded-full transition-colors cursor-pointer"
      >
        <i data-lucide="message-square" class="w-5 h-5"></i>
      </button>
      ` : ''}
      
      <div class="h-8 w-px bg-surface-200/50 mx-1"></div>
      
      <!-- Profile Wrapper -->
      <div class="relative">
        <button
          id="profile-menu-btn"
          class="flex items-center gap-2 p-1 pl-2 hover:bg-white/50 rounded-full transition-colors cursor-pointer"
        >
          <span id="profile-name" class="text-sm font-medium text-surface-700 hidden sm:block">${username}</span>
          <img
            id="profile-img"
            src="${profileImgSrc}"
            alt="Profile"
            class="w-8 h-8 rounded-full border border-surface-200"
          />
          <i data-lucide="chevron-down" class="w-4 h-4 text-surface-500"></i>
        </button>
        
        <!-- Profile Dropdown Menu -->
        <div
          id="profile-dropdown"
          class="hidden absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-56 glass-panel rounded-2xl p-2 z-50 text-sm space-y-1 dropdown-menu"
        >
          <div class="px-3 py-2 border-b border-surface-100/50">
            <span class="font-bold text-surface-900 block" id="dropdown-username">${username}</span>
            <span class="text-[10px] uppercase tracking-wider font-extrabold text-surface-400 block mt-0.5" id="dropdown-role">${roleName}</span>
          </div>
          <div class="border-t border-surface-150 py-1">
            <a
              href="#"
              id="dropdown-logout-btn"
              class="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-750 rounded-lg font-medium transition-colors"
            >
              <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> Keluar
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
