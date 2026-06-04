import { useState, useEffect } from 'react';

const CONSENT_KEY = 'gdpr_consent';

const i18n = {
  en: {
    title: 'Privacy Notice',
    body: 'This website stores your theme and language preferences in your browser\'s localStorage. This is strictly necessary for the site to function as you choose and requires no consent under TTDSG § 25(2). We do not use tracking cookies, analytics, or any third-party data processors. Full details are in our',
    privacyLink: 'Privacy Policy',
    necessary: 'Only Necessary',
    acceptAll: 'Accept & Close',
    settings: 'Cookie Settings',
    settingsTitle: 'Cookie Preferences',
    catNecessaryLabel: 'Strictly Necessary',
    catNecessaryDesc: 'Theme (dark/light) and language (EN/DE) preferences stored in localStorage. Cannot be disabled — required for core site functionality. Legal basis: TTDSG § 25(2) No. 2.',
    catNecessaryAlways: 'Always active',
    saveSettings: 'Save Settings',
  },
  de: {
    title: 'Datenschutzhinweis',
    body: 'Diese Website speichert Ihre Theme- und Spracheinstellungen im localStorage Ihres Browsers. Dies ist technisch notwendig und erfordert gemäß TTDSG § 25 Abs. 2 keine Einwilligung. Wir verwenden keine Tracking-Cookies, keine Analyse-Tools und keine Drittanbieter-Dienste. Alle Details finden Sie in unserer',
    privacyLink: 'Datenschutzerklärung',
    necessary: 'Nur Notwendige',
    acceptAll: 'Akzeptieren & Schließen',
    settings: 'Cookie-Einstellungen',
    settingsTitle: 'Cookie-Einstellungen',
    catNecessaryLabel: 'Technisch Notwendig',
    catNecessaryDesc: 'Theme (Dark/Light) und Spracheinstellungen (DE/EN) im localStorage gespeichert. Kann nicht deaktiviert werden – erforderlich für die grundlegende Funktionalität. Rechtsgrundlage: TTDSG § 25 Abs. 2 Nr. 2.',
    catNecessaryAlways: 'Immer aktiv',
    saveSettings: 'Einstellungen speichern',
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    const currentLang = localStorage.getItem('lang') || 'en';
    setLang(currentLang === 'de' ? 'de' : 'en');

    if (!stored) {
      // Small delay so page content loads first
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  // Keep language in sync with the site's language toggle
  useEffect(() => {
    const handler = (e) => setLang(e.detail === 'de' ? 'de' : 'en');
    document.addEventListener('langchange', handler);
    return () => document.removeEventListener('langchange', handler);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'all');
    setVisible(false);
  }

  function acceptNecessary() {
    localStorage.setItem(CONSENT_KEY, 'necessary');
    setVisible(false);
  }

  if (!visible) return null;

  const t = i18n[lang];

  return (
    <>
      {/* Backdrop for settings panel */}
      {showSettings && (
        <div
          onClick={() => setShowSettings(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 9998,
          }}
        />
      )}

      {/* Settings panel */}
      {showSettings && (
        <div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '520px',
          width: 'calc(100% - 40px)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          fontFamily: 'var(--font-mono)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t.settingsTitle}
            </span>
            <button
              onClick={() => setShowSettings(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px' }}
              aria-label="Close"
            >×</button>
          </div>

          {/* Necessary category */}
          <div style={{
            background: 'var(--card-bg-high)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700 }}>
                {t.catNecessaryLabel}
              </span>
              <span style={{
                fontSize: '10px',
                background: 'rgba(88,166,255,0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(88,166,255,0.3)',
                borderRadius: '4px',
                padding: '2px 8px',
              }}>
                {t.catNecessaryAlways}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
              {t.catNecessaryDesc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={acceptNecessary}
              style={{
                background: 'none',
                border: '1px solid var(--card-border)',
                color: 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '10px 18px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
              }}
            >
              {t.necessary}
            </button>
            <button
              onClick={accept}
              style={{
                background: 'var(--primary)',
                border: 'none',
                color: 'var(--card-bg-lowest)',
                borderRadius: '6px',
                padding: '10px 18px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              {t.saveSettings}
            </button>
          </div>
        </div>
      )}

      {/* Main banner strip */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label={t.title}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9997,
          background: 'var(--card-bg-lowest)',
          borderTop: '1px solid var(--card-border)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.35)',
          fontFamily: 'var(--font-mono)',
          animation: 'slideUp 0.35s ease',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>

        {/* Left: icon + text */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: '1 1 300px', minWidth: 0 }}>
          <span
            className="material-symbols-outlined"
            style={{ color: 'var(--primary)', fontSize: '22px', flexShrink: 0, marginTop: '1px' }}
          >
            shield
          </span>
          <div>
            <div style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
              {t.title}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
              {t.body}{' '}
              <a href="/datenschutz" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                {t.privacyLink}
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right: buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              background: 'none',
              border: '1px solid var(--card-border)',
              color: 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '9px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              whiteSpace: 'nowrap',
            }}
          >
            {t.settings}
          </button>
          <button
            onClick={acceptNecessary}
            style={{
              background: 'none',
              border: '1px solid rgba(88,166,255,0.35)',
              color: 'var(--primary)',
              borderRadius: '6px',
              padding: '9px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              whiteSpace: 'nowrap',
            }}
          >
            {t.necessary}
          </button>
          <button
            onClick={accept}
            style={{
              background: 'var(--primary)',
              border: 'none',
              color: 'var(--card-bg-lowest)',
              borderRadius: '6px',
              padding: '9px 16px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </>
  );
}
