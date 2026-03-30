'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClockDisplay } from '@/components/Clock';
import { SettingsPanel } from '@/components/SettingsPanel';
import { useTime, useClockSettings, useFullscreen, parseUrlParams } from '@/lib/hooks';
import { THEMES, TIMEZONES } from '@/lib/types';

function ClockAppContent() {
  const searchParams = useSearchParams();
  const [urlSettings, setUrlSettings] = useState<ReturnType<typeof parseUrlParams>>({});
  
  // Parser les paramètres URL au montage
  useEffect(() => {
    const params = parseUrlParams();
    setUrlSettings(params);
  }, [searchParams]);
  
  const { settings, updateSettings, isLoaded } = useClockSettings(urlSettings);
  const time = useTime(settings.timezone);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  
  const currentTheme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];
  const currentTimezone = TIMEZONES.find(tz => tz.value === settings.timezone);

  // Appliquer le thème au body
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  // Mettre à jour l'URL quand les paramètres changent
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.set('tz', settings.timezone);
      params.set('type', settings.clockType);
      params.set('format', settings.timeFormat);
      params.set('seconds', settings.showSeconds.toString());
      params.set('theme', settings.themeId);
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [settings, isLoaded]);

  if (!isLoaded) {
    return (
      <div 
        className="fullscreen-container"
        style={{ backgroundColor: currentTheme.background }}
        aria-busy="true"
        aria-label="Chargement de l'horloge"
      >
        <div className="flex flex-col items-center justify-center">
          <div 
            className="animate-pulse font-mono font-bold tracking-tight"
            style={{ 
              color: currentTheme.secondary,
              fontSize: 'clamp(3rem, 15vw, 12rem)',
              letterSpacing: '-0.02em',
            }}
          >
            --:--:--
          </div>
          <div 
            className="mt-8 text-center"
            style={{ color: currentTheme.secondary, opacity: 0.5 }}
          >
            <p className="text-lg md:text-xl font-medium">&nbsp;</p>
            <p className="text-sm mt-1">&nbsp;</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fullscreen-container theme-transition"
      style={{ backgroundColor: currentTheme.background }}
    >
      {/* Horloge principale */}
      <div id="main-clock" className="flex-1 flex flex-col items-center justify-center w-full" role="main">
        <ClockDisplay
          time={time}
          clockType={settings.clockType}
          format={settings.timeFormat}
          showSeconds={settings.showSeconds}
          themeId={settings.themeId}
        />
        
        {/* Information sur le fuseau horaire */}
        <div 
          className="mt-8 text-center animate-fade-in"
          style={{ color: currentTheme.secondary }}
        >
          <p className="text-lg md:text-xl font-medium">
            {currentTimezone?.label || settings.timezone}
          </p>
          <p className="text-sm mt-1 opacity-75">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              timeZone: settings.timezone 
            })}
          </p>
        </div>
      </div>

      {/* Panneau de paramètres */}
      <SettingsPanel
        settings={settings}
        onUpdate={updateSettings}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}

// Wrapper avec Suspense pour useSearchParams
export function ClockApp() {
  return (
    <Suspense fallback={
      <div 
        className="fullscreen-container" 
        style={{ backgroundColor: '#0f172a' }}
        aria-busy="true"
        aria-label="Chargement de l'horloge"
      >
        <div className="flex flex-col items-center justify-center">
          <div 
            className="animate-pulse font-mono font-bold tracking-tight text-slate-500"
            style={{ 
              fontSize: 'clamp(3rem, 15vw, 12rem)',
              letterSpacing: '-0.02em',
            }}
          >
            --:--:--
          </div>
          <div className="mt-8 text-center text-slate-600">
            <p className="text-lg md:text-xl font-medium">&nbsp;</p>
            <p className="text-sm mt-1">&nbsp;</p>
          </div>
        </div>
      </div>
    }>
      <ClockAppContent />
    </Suspense>
  );
}
