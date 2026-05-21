// General Helper Functions & Theme Loading
document.addEventListener('DOMContentLoaded', () => {
  // 1. Session & Theme Check
  const eduLevel = localStorage.getItem('edu-level');
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

  // 3. Notification Bell Interaction
  const bellBtn = document.getElementById('notification-btn');
  if (bellBtn) {
    bellBtn.addEventListener('click', () => {
      const badge = bellBtn.querySelector('.bg-red-500');
      if (badge) {
        badge.classList.add('animate-ping');
        setTimeout(() => badge.remove(), 500);
        alert("Tidak ada notifikasi baru.");
      } else {
        alert("Semua notifikasi sudah dibaca.");
      }
    });
  }

  // 4. Logout Interaction
  const logoutBtns = document.querySelectorAll('#logout-btn');
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
});
