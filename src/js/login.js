import { setState } from './store.js';
import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  const loginForm = document.getElementById('login-form');
  
  // Default selected level (fixed to SMK)
  const selectedLevel = 'smk';

  // Helper to format email prefix to a friendly name (e.g., "keane.arazaan@gmail.com" -> "Keane Arazaan")
  const formatUsernameFromEmail = (email) => {
    const prefix = email.split('@')[0];
    return prefix
      .replace(/[\._-]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper to detect education level from email domain
  const detectLevelFromEmail = (email) => {
    const domain = email.split('@')[1] || '';
    const lowerDomain = domain.toLowerCase();
    
    if (lowerDomain.includes('sd.')) {
      return 'sd';
    } else if (lowerDomain.includes('kuliah.') || lowerDomain.includes('univ.') || lowerDomain.includes('ac.id')) {
      return 'kuliah';
    } else if (lowerDomain.includes('smk.') || lowerDomain.includes('smp.') || lowerDomain.includes('sma.')) {
      return 'smk';
    }
    return 'smk'; // Default fallback
  };

  // Dynamic Error Alert Container
  let errorAlert = document.getElementById('error-alert');
  if (loginForm && !errorAlert) {
    errorAlert = document.createElement('div');
    errorAlert.id = 'error-alert';
    errorAlert.className = 'p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold hidden mb-4 text-center';
    loginForm.parentNode.insertBefore(errorAlert, loginForm);
  }

  const showError = (msg, isSuccess = false) => {
    if (!errorAlert) return;
    errorAlert.textContent = msg;
    if (isSuccess) {
      errorAlert.className = 'p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-semibold mb-4 text-center';
    } else {
      errorAlert.className = 'p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold mb-4 text-center';
    }
    errorAlert.classList.remove('hidden');
  };

  // State variable to toggle between login and signup mode
  let isLoginMode = true;

  const loginTitle = document.getElementById('login-title');
  const loginSubtitle = document.getElementById('login-subtitle');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitBtnIcon = document.getElementById('submit-btn-icon');
  const toggleText = document.getElementById('toggle-text');
  const toggleModeBtn = document.getElementById('toggle-mode-btn');

  // Toggle mode event listener
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      errorAlert.classList.add('hidden');
      
      if (isLoginMode) {
        if (loginTitle) loginTitle.textContent = 'Selamat Datang';
        if (loginSubtitle) loginSubtitle.textContent = 'Masuk untuk memulai perjalanan belajarmu hari ini!';
        if (submitBtnText) submitBtnText.textContent = 'Masuk Sekarang';
        if (submitBtnIcon) {
          submitBtnIcon.setAttribute('data-lucide', 'arrow-right');
        }
        if (toggleText) toggleText.textContent = 'Belum punya akun?';
        if (toggleModeBtn) toggleModeBtn.textContent = 'Daftar Baru';
      } else {
        if (loginTitle) loginTitle.textContent = 'Daftar Akun Baru';
        if (loginSubtitle) loginSubtitle.textContent = 'Buat akun baru untuk mulai menjelajahi materi belajar!';
        if (submitBtnText) submitBtnText.textContent = 'Daftar Akun';
        if (submitBtnIcon) {
          submitBtnIcon.setAttribute('data-lucide', 'user-plus');
        }
        if (toggleText) toggleText.textContent = 'Sudah punya akun?';
        if (toggleModeBtn) toggleModeBtn.textContent = 'Masuk di sini';
      }
      
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Form Submit Handler
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('email').value.trim();
      const passwordInput = document.getElementById('password').value;
      const detectedLevel = detectLevelFromEmail(emailInput);

      // Disable button & show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Memproses...`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      errorAlert.classList.add('hidden');

      try {
        if (isLoginMode) {
          // 1. LOGIN MODE ONLY: Try to login
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput
          });

          if (signInError) {
            // Translate common Supabase Auth errors to Indonesian for better UX
            let friendlyError = signInError.message;
            if (signInError.message.includes('Invalid login credentials')) {
              friendlyError = 'Email atau kata sandi salah. Silakan coba lagi.';
            } else if (signInError.message.includes('Email not confirmed')) {
              friendlyError = 'Alamat email Anda belum terkonfirmasi. Silakan periksa email Anda.';
            }
            throw new Error(friendlyError);
          }

          // Login success
          if (signInData.user) {
            // Fetch user profile to get saved edu-level and username
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('username, edu_level, is_admin')
              .eq('id', signInData.user.id)
              .single();

            if (profileError) {
              console.error('Failed to fetch profile, using local selection:', profileError);
              setState('edu-level', detectedLevel);
              setState('username', formatUsernameFromEmail(emailInput));
              setState('is-admin', false);
              window.location.href = 'index.html';
            } else {
              setState('edu-level', profileData.edu_level);
              setState('username', profileData.username);
              setState('is-admin', profileData.is_admin === true);
              
              if (profileData.is_admin === true) {
                window.location.href = 'admin.html';
              } else {
                window.location.href = 'index.html';
              }
            }
          }
        } else {
          // 2. SIGN UP MODE ONLY: Register new user
          const fallbackUsername = formatUsernameFromEmail(emailInput);
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: emailInput,
            password: passwordInput,
            options: {
              data: {
                username: fallbackUsername,
                edu_level: detectedLevel
              }
            }
          });

          if (signUpError) {
            let friendlyError = signUpError.message;
            if (signUpError.message.includes('User already registered')) {
              friendlyError = 'Alamat email ini sudah terdaftar. Silakan masuk menggunakan akun Anda.';
            }
            throw new Error(`Pendaftaran gagal: ${friendlyError}`);
          }

          // Check if login session is automatically available after signup
          if (signUpData.session) {
            setState('edu-level', detectedLevel);
            setState('username', fallbackUsername);
            window.location.href = 'index.html';
            return;
          } else {
            showError('Pendaftaran sukses! Silakan periksa email Anda untuk memverifikasi akun Anda.', true);
            submitBtn.disabled = false;
            // Restore button content depending on current mode
            submitBtn.innerHTML = `<span id="submit-btn-text">Daftar Akun</span><i id="submit-btn-icon" data-lucide="user-plus" class="w-4 h-4"></i>`;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
          }
        }
      } catch (err) {
        showError(err.message || 'Terjadi kesalahan sistem saat mencoba masuk.');
        submitBtn.disabled = false;
        // Restore button content depending on current mode
        if (isLoginMode) {
          submitBtn.innerHTML = `<span id="submit-btn-text">Masuk Sekarang</span><i id="submit-btn-icon" data-lucide="arrow-right" class="w-4 h-4"></i>`;
        } else {
          submitBtn.innerHTML = `<span id="submit-btn-text">Daftar Akun</span><i id="submit-btn-icon" data-lucide="user-plus" class="w-4 h-4"></i>`;
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }
});
