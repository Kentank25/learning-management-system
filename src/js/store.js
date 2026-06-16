const STATE_KEY = 'sekolahmu_state';

function saveState(stateObj) {
  localStorage.setItem(STATE_KEY, JSON.stringify(stateObj));
}

function runMigration() {
  const newState = {};
  
  const legacyKeys = [
    'edu-level',
    'username',
    'custom-agendas'
  ];

  // Typical course IDs in db.js are 1 to 4, but we migration-check up to 10 to be safe
  for (let id = 1; id <= 10; id++) {
    legacyKeys.push(`progress-course-${id}`);
    legacyKeys.push(`kuis-stars-${id}`);
    legacyKeys.push(`modules-course-${id}`);
    legacyKeys.push(`tugas-status-${id}`);
    legacyKeys.push(`forum-course-${id}`);
  }

  legacyKeys.push('personal-files-sd');
  legacyKeys.push('personal-files-smk');
  legacyKeys.push('personal-files-kuliah');

  let migratedAny = false;
  legacyKeys.forEach(key => {
    const val = localStorage.getItem(key);
    if (val !== null) {
      migratedAny = true;
      try {
        newState[key] = JSON.parse(val);
      } catch (e) {
        newState[key] = val;
      }
      localStorage.removeItem(key);
    }
  });

  if (migratedAny) {
    saveState(newState);
  }
  return newState;
}

function loadState() {
  const raw = localStorage.getItem(STATE_KEY);
  if (!raw) {
    return runMigration();
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse sekolahmu_state", e);
    return {};
  }
}

// Pre-load state and trigger migration if needed
loadState();

/**
 * Get a value from the centralized state.
 * @param {string} key - The state key to retrieve.
 * @param {*} defaultValue - The fallback value if key doesn't exist.
 * @returns {*} The retrieved value or defaultValue.
 */
export function getState(key, defaultValue = null) {
  const currentState = loadState();
  return currentState[key] !== undefined ? currentState[key] : defaultValue;
}

/**
 * Set a value in the centralized state and dispatch a global change event.
 * @param {string} key - The state key to update.
 * @param {*} value - The value to save.
 */
export function setState(key, value) {
  const currentState = loadState();
  currentState[key] = value;
  saveState(currentState);
  
  // Dispatch a custom event to notify other scripts of state changes
  window.dispatchEvent(new CustomEvent('sekolahmu_state_change', {
    detail: { key, value }
  }));
}
