// General Helper Functions & Theme Loading
(function() {
  // 1. Session & Theme Check
  const eduLevel = localStorage.getItem('edu-level');
  const username = localStorage.getItem('username') || 'Keane';
  const currentPath = window.location.pathname;

  // If session doesn't exist, redirect to login page (unless already on login.html)
  if (!eduLevel && !currentPath.includes('login.html')) {
    window.location.href = 'login.html';
    return;
  }

  // Apply theme class to body
  if (eduLevel === 'sd') {
    document.body.classList.add('theme-sd');
  } else if (eduLevel === 'kuliah') {
    document.body.classList.add('theme-kuliah');
  } // SMK is default (no class needed or we use current default styles)

  // Initialize Lucide Icons after the theme is set
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (mobileMenuBtn && sidebar) {
    const toggleMenu = () => {
      const isClosed = sidebar.classList.contains('-translate-x-full');
      
      if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('hidden');
          setTimeout(() => sidebarOverlay.classList.remove('opacity-0'), 10);
        }
      } else {
        sidebar.classList.add('-translate-x-full');
        if (sidebarOverlay) {
          sidebarOverlay.classList.add('opacity-0');
          setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
        }
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', toggleMenu);
    }
  }

  // 3. Profile Dropdown Panel Toggle & Switcher
  const profileMenuBtn = document.getElementById('profile-menu-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  const dropdownUsername = document.getElementById('dropdown-username');
  const dropdownRole = document.getElementById('dropdown-role');

  if (profileMenuBtn && profileDropdown) {
    // Populate username and role
    if (dropdownUsername) dropdownUsername.textContent = username;
    if (dropdownRole) {
      if (eduLevel === 'sd') dropdownRole.textContent = 'Murid Sekolah Dasar 🌟';
      else if (eduLevel === 'kuliah') dropdownRole.textContent = 'Mahasiswa Universitas 🎓';
      else dropdownRole.textContent = 'Siswa Kejuruan RPL 💻';
    }

    profileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
      // Close notifications if open
      if (notificationDropdown) notificationDropdown.classList.add('hidden');
    });
  }

  // Quick Level Switcher
  const levelSwitchBtns = document.querySelectorAll('[data-change-level]');
  levelSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newLevel = btn.getAttribute('data-change-level');
      localStorage.setItem('edu-level', newLevel);
      window.location.reload();
    });
  });

  // 4. Notification Dropdown Panel & Dynamic Rendering
  const bellBtn = document.getElementById('notification-btn');
  const notificationDropdown = document.getElementById('notification-dropdown');
  const notificationBadge = document.getElementById('notification-badge');
  const notificationList = document.getElementById('notification-list');
  const markAllReadBtn = document.getElementById('mark-all-read');

  const notificationsData = {
    sd: [
      { id: 1, text: 'Piko lapar nih! Yuk selesaikan kuis hari ini untuk kumpulkan Bintang! 🦖⭐', read: false, time: 'Baru saja' },
      { id: 2, text: 'Tugas kelas menggambar rumah impian belum dikirim. Ayo selesaikan! 🎨', read: false, time: '1 jam yang lalu' }
    ],
    smk: [
      { id: 1, text: 'Tenggat tugas \'Skema Database Toko Online\' tersisa 3 jam lagi! 🚀', read: false, time: 'Baru saja' },
      { id: 2, text: 'Modul baru \'Normalisasi Basis Data 1NF-3NF\' telah ditambahkan.', read: true, time: 'Kemarin' }
    ],
    kuliah: [
      { id: 1, text: 'Dr. Ir. Wahyu Wibowo membalas tanggapan Anda di Forum Diskusi RPL. 💬', read: false, time: '10 menit yang lalu' },
      { id: 2, text: 'Batas waktu pengumpulan Laporan SRS Bab 3 malam ini pukul 23:59 WIB.', read: false, time: '2 jam yang lalu' }
    ]
  };

  const renderNotifications = () => {
    if (!notificationList) return;
    notificationList.innerHTML = '';
    
    const items = notificationsData[eduLevel] || [];
    let hasUnread = false;

    if (items.length === 0) {
      notificationList.innerHTML = `
        <div class="text-center py-6 text-surface-400 text-xs">
          Tidak ada pemberitahuan baru.
        </div>
      `;
      if (notificationBadge) notificationBadge.classList.add('hidden');
      return;
    }

    items.forEach(notif => {
      if (!notif.read) hasUnread = true;
      const readBg = notif.read ? 'bg-white' : 'bg-surface-50 border-accent-100';
      const indicatorColor = eduLevel === 'sd' ? 'bg-sky-500' : (eduLevel === 'kuliah' ? 'bg-indigo-600' : 'bg-amber-500');
      const dot = notif.read ? '' : `<span class="w-1.5 h-1.5 rounded-full ${indicatorColor} shrink-0 mt-1.5"></span>`;
      
      const notifHTML = `
        <div class="p-2.5 rounded-xl border border-surface-100 flex items-start gap-2.5 transition-colors ${readBg}">
          ${dot}
          <div class="flex-1 space-y-0.5">
            <p class="text-xs text-surface-850 font-medium leading-relaxed">${notif.text}</p>
            <span class="text-[9px] text-surface-400 font-bold block">${notif.time}</span>
          </div>
        </div>
      `;
      notificationList.insertAdjacentHTML('beforeend', notifHTML);
    });

    if (notificationBadge) {
      if (hasUnread) notificationBadge.classList.remove('hidden');
      else notificationBadge.classList.add('hidden');
    }
  };

  if (bellBtn && notificationDropdown) {
    renderNotifications();

    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle('hidden');
      // Close profile dropdown if open
      if (profileDropdown) profileDropdown.classList.add('hidden');
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      const items = notificationsData[eduLevel] || [];
      items.forEach(n => n.read = true);
      renderNotifications();
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    if (profileDropdown) profileDropdown.classList.add('hidden');
    if (notificationDropdown) notificationDropdown.classList.add('hidden');
  });

  // 5. Logout Interaction
  const logoutBtns = document.querySelectorAll('#logout-btn, #dropdown-logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Clear session
      localStorage.removeItem('edu-level');
      localStorage.removeItem('username');
      
      // Redirect
      window.location.href = 'login.html';
    });
  });
})();

