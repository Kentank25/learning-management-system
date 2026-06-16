import { setState } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.level-card');
  const submitBtn = document.getElementById('submit-btn');
  const loginForm = document.getElementById('login-form');
  
  // Default selected level
  let selectedLevel = 'smk';

  // Level config details for dynamic submit button color and hover effect
  const levelThemes = {
    sd: {
      colorClass: 'bg-sky-500',
      hoverClass: 'hover:bg-sky-600',
      activeBorderClass: 'border-sky-500',
      activeBgClass: 'bg-sky-50/20'
    },
    smk: {
      colorClass: 'bg-amber-500',
      hoverClass: 'hover:bg-amber-600',
      activeBorderClass: 'border-amber-500',
      activeBgClass: 'bg-amber-50/20'
    },
    kuliah: {
      colorClass: 'bg-indigo-500',
      hoverClass: 'hover:bg-indigo-600',
      activeBorderClass: 'border-indigo-500',
      activeBgClass: 'bg-indigo-50/20'
    }
  };

  // Card Selection Handler
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Get selected level
      selectedLevel = card.getAttribute('data-level');
      
      // Remove active states from all cards
      cards.forEach(c => {
        c.classList.remove(
          'border-sky-500', 'bg-sky-50/20',
          'border-amber-500', 'bg-amber-50/20',
          'border-indigo-500', 'bg-indigo-50/20'
        );
        c.classList.add('border-surface-200', 'bg-white/50');
      });

      // Apply active states to clicked card
      const theme = levelThemes[selectedLevel];
      card.classList.remove('border-surface-200', 'bg-white/50');
      card.classList.add(theme.activeBorderClass, theme.activeBgClass);

      // Dynamically change submit button colors
      submitBtn.className = `w-full py-3 text-white rounded-xl font-semibold shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer mt-6 active:scale-98 ${theme.colorClass} ${theme.hoverClass}`;
    });
  });

  // Form Submit Handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Store in centralized state
      setState('edu-level', selectedLevel);
      setState('username', document.getElementById('username').value);

      // Redirect to Dashboard
      window.location.href = 'index.html';
    });
  }
});
