'use client';

import { useState, useCallback } from 'react';
import { ClockSettings, THEMES, TIMEZONES, Theme } from '@/lib/types';
import { generateShareableUrl } from '@/lib/hooks';

interface SettingsPanelProps {
  settings: ClockSettings;
  onUpdate: (updates: Partial<ClockSettings>) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function SettingsPanel({ 
  settings, 
  onUpdate, 
  isFullscreen, 
  onToggleFullscreen 
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTheme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];

  const handleCopyUrl = useCallback(async () => {
    const url = generateShareableUrl(settings);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Erreur lors de la copie:', e);
    }
  }, [settings]);

  return (
    <>
      {/* Bouton pour ouvrir les paramètres */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 right-4 z-50 p-3 rounded-full
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          ${isOpen ? 'rotate-90' : ''}
        `}
        style={{
          backgroundColor: `${currentTheme.primary}20`,
          color: currentTheme.foreground,
          border: `1px solid ${currentTheme.primary}40`,
        }}
        aria-label={isOpen ? 'Fermer les paramètres' : 'Ouvrir les paramètres'}
        aria-expanded={isOpen}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {/* Bouton plein écran */}
      <button
        onClick={onToggleFullscreen}
        className={`
          fixed top-4 right-16 z-50 p-3 rounded-full
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
        `}
        style={{
          backgroundColor: `${currentTheme.primary}20`,
          color: currentTheme.foreground,
          border: `1px solid ${currentTheme.primary}40`,
        }}
        aria-label={isFullscreen ? 'Quitter le plein écran' : 'Passer en plein écran'}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>

      {/* Panneau de paramètres */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 z-40
          settings-panel transform transition-transform duration-300 ease-out
          overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          backgroundColor: `${currentTheme.background}f0`,
          color: currentTheme.foreground,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Paramètres de l'horloge"
      >
        <div className="p-6 pt-20 space-y-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: currentTheme.primary }}>
            Paramètres
          </h2>

          {/* Type d'horloge */}
          <section aria-labelledby="clock-type-label">
            <h3 id="clock-type-label" className="text-lg font-semibold mb-3">
              Type d&apos;horloge
            </h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onUpdate({ clockType: 'digital' })}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium
                  transition-all duration-200 min-w-[80px]
                `}
                style={{
                  backgroundColor: settings.clockType === 'digital' 
                    ? currentTheme.primary 
                    : `${currentTheme.secondary}30`,
                  color: settings.clockType === 'digital' 
                    ? currentTheme.background 
                    : currentTheme.foreground,
                }}
                aria-pressed={settings.clockType === 'digital'}
              >
                Numérique
              </button>
              <button
                onClick={() => onUpdate({ clockType: 'analog' })}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium
                  transition-all duration-200 min-w-[80px]
                `}
                style={{
                  backgroundColor: settings.clockType === 'analog' 
                    ? currentTheme.primary 
                    : `${currentTheme.secondary}30`,
                  color: settings.clockType === 'analog' 
                    ? currentTheme.background 
                    : currentTheme.foreground,
                }}
                aria-pressed={settings.clockType === 'analog'}
              >
                Analogique
              </button>
              <button
                onClick={() => onUpdate({ clockType: 'flip' })}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium
                  transition-all duration-200 min-w-[80px]
                `}
                style={{
                  backgroundColor: settings.clockType === 'flip' 
                    ? currentTheme.primary 
                    : `${currentTheme.secondary}30`,
                  color: settings.clockType === 'flip' 
                    ? currentTheme.background 
                    : currentTheme.foreground,
                }}
                aria-pressed={settings.clockType === 'flip'}
              >
                À bascule
              </button>
            </div>
          </section>

          {/* Format de l'heure */}
          <section aria-labelledby="time-format-label">
            <h3 id="time-format-label" className="text-lg font-semibold mb-3">
              Format de l&apos;heure
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate({ timeFormat: '24h' })}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium
                  transition-all duration-200
                `}
                style={{
                  backgroundColor: settings.timeFormat === '24h' 
                    ? currentTheme.primary 
                    : `${currentTheme.secondary}30`,
                  color: settings.timeFormat === '24h' 
                    ? currentTheme.background 
                    : currentTheme.foreground,
                }}
                aria-pressed={settings.timeFormat === '24h'}
              >
                24 heures
              </button>
              <button
                onClick={() => onUpdate({ timeFormat: '12h' })}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-medium
                  transition-all duration-200
                `}
                style={{
                  backgroundColor: settings.timeFormat === '12h' 
                    ? currentTheme.primary 
                    : `${currentTheme.secondary}30`,
                  color: settings.timeFormat === '12h' 
                    ? currentTheme.background 
                    : currentTheme.foreground,
                }}
                aria-pressed={settings.timeFormat === '12h'}
              >
                12 heures
              </button>
            </div>
          </section>

          {/* Afficher les secondes */}
          <section className="flex items-center justify-between">
            <label htmlFor="show-seconds" className="text-lg font-semibold">
              Afficher les secondes
            </label>
            <button
              id="show-seconds"
              role="switch"
              aria-checked={settings.showSeconds}
              onClick={() => onUpdate({ showSeconds: !settings.showSeconds })}
              className={`
                relative w-14 h-7 rounded-full
                transition-colors duration-200
              `}
              style={{
                backgroundColor: settings.showSeconds 
                  ? currentTheme.primary 
                  : `${currentTheme.secondary}50`,
              }}
            >
              <span
                className={`
                  absolute top-1 left-1 w-5 h-5 rounded-full bg-white
                  transition-transform duration-200
                  ${settings.showSeconds ? 'translate-x-7' : 'translate-x-0'}
                `}
              />
            </button>
          </section>

          {/* Fuseau horaire */}
          <section aria-labelledby="timezone-label">
            <h3 id="timezone-label" className="text-lg font-semibold mb-3">
              Fuseau horaire
            </h3>
            <select
              value={settings.timezone}
              onChange={(e) => onUpdate({ timezone: e.target.value })}
              className="w-full py-3 px-4 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: `${currentTheme.secondary}30`,
                color: currentTheme.foreground,
                border: `1px solid ${currentTheme.secondary}50`,
              }}
              aria-label="Sélectionner un fuseau horaire"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value} style={{ backgroundColor: currentTheme.background }}>
                  {tz.label} (UTC{tz.offset})
                </option>
              ))}
            </select>
          </section>

          {/* Thème */}
          <section aria-labelledby="theme-label">
            <h3 id="theme-label" className="text-lg font-semibold mb-3">
              Thème visuel
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {THEMES.map((theme: Theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdate({ themeId: theme.id })}
                  className={`
                    relative w-full aspect-square rounded-lg
                    transition-transform duration-200
                    hover:scale-105 active:scale-95
                  `}
                  style={{
                    backgroundColor: theme.background,
                    border: `2px solid ${theme.primary}`,
                    boxShadow: settings.themeId === theme.id 
                      ? `0 0 0 2px ${currentTheme.background}, 0 0 0 4px ${theme.primary}` 
                      : 'none',
                  }}
                  aria-label={`Thème ${theme.name}`}
                  aria-pressed={settings.themeId === theme.id}
                  title={theme.name}
                >
                  <span 
                    className="absolute inset-2 rounded"
                    style={{ backgroundColor: theme.primary }}
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm" style={{ color: currentTheme.secondary }}>
              Thème actuel : {currentTheme.name}
            </p>
          </section>

          {/* Partager */}
          <section aria-labelledby="share-label">
            <h3 id="share-label" className="text-lg font-semibold mb-3">
              Partager cette horloge
            </h3>
            <button
              onClick={handleCopyUrl}
              className={`
                w-full py-3 px-4 rounded-lg font-medium
                flex items-center justify-center gap-2
                transition-all duration-200
                hover:opacity-90
              `}
              style={{
                backgroundColor: copied ? '#22c55e' : currentTheme.primary,
                color: currentTheme.background,
              }}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Copié !
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  Copier le lien
                </>
              )}
            </button>
          </section>

          {/* Info */}
          <section className="pt-4 border-t" style={{ borderColor: `${currentTheme.secondary}30` }}>
            <p className="text-sm" style={{ color: currentTheme.secondary }}>
              Les paramètres sont automatiquement sauvegardés dans votre navigateur.
            </p>
          </section>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
