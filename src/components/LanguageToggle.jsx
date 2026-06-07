import { useState, useEffect } from 'react';
import { getLanguage, setLanguage } from '../stores/languageStore';

export default function LanguageToggle() {
  const [lang, setLang] = useState(() => getLanguage());

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    document.addEventListener('langchange', handler);
    return () => document.removeEventListener('langchange', handler);
  }, []);

  function changeLang(next) {
    setLang(next);
    setLanguage(next);
  }

  const base = {
    border: 'none',
    padding: '5px 12px',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.06em',
    transition: 'background 150ms, color 150ms',
    lineHeight: 1,
    outline: 'none',
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--card-border)',
        borderRadius: '6px',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      title="Switch language / Sprache wechseln"
    >
      <button
        onClick={() => changeLang('en')}
        aria-label="Switch to English"
        aria-pressed={lang === 'en'}
        style={{
          ...base,
          background: lang === 'en' ? 'var(--primary)' : 'transparent',
          color: lang === 'en' ? 'var(--card-bg-lowest)' : 'var(--text-muted)',
        }}
      >
        EN
      </button>
      <button
        onClick={() => changeLang('de')}
        aria-label="Auf Deutsch wechseln"
        aria-pressed={lang === 'de'}
        style={{
          ...base,
          background: lang === 'de' ? 'var(--primary)' : 'transparent',
          color: lang === 'de' ? 'var(--card-bg-lowest)' : 'var(--text-muted)',
          borderLeft: '1px solid var(--card-border)',
        }}
      >
        DE
      </button>
    </div>
  );
}
