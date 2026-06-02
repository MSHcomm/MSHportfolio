// Language is stored in localStorage and broadcast via CustomEvent.
// Using the DOM event bus means all Astro islands (separate bundles) receive changes
// without needing a shared module singleton.

export function getLanguage() {
  if (typeof localStorage === 'undefined') return 'en';
  return localStorage.getItem('lang') || 'en';
}

export function setLanguage(lang) {
  if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lang);
  if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
}
