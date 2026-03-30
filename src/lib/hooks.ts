'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClockSettings, TimeData, DEFAULT_SETTINGS } from './types';

const STORAGE_KEY = 'clock-settings';

// Hook personnalisé pour gérer le temps
export function useTime(timezone: string, updateInterval: number = 100): TimeData {
  const [time, setTime] = useState<TimeData>(() => getTimeInTimezone(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeInTimezone(timezone));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [timezone, updateInterval]);

  return time;
}

// Fonction pour obtenir l'heure dans un fuseau horaire spécifique
export function getTimeInTimezone(timezone: string): TimeData {
  const now = new Date();
  
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const parts = formatter.formatToParts(now);
    
    const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
    const milliseconds = now.getMilliseconds();
    
    const period = hours >= 12 ? 'PM' : 'AM';
    
    return {
      hours,
      minutes,
      seconds,
      milliseconds,
      period,
      formattedTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      date: now,
    };
  } catch {
    // Fallback si le fuseau horaire n'est pas valide
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
      period: now.getHours() >= 12 ? 'PM' : 'AM',
      formattedTime: now.toLocaleTimeString('fr-FR'),
      date: now,
    };
  }
}

// Hook pour gérer les paramètres avec persistance
export function useClockSettings(initialSettings?: Partial<ClockSettings>) {
  const [settings, setSettings] = useState<ClockSettings>(() => {
    return { ...DEFAULT_SETTINGS, ...initialSettings };
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Charger les paramètres depuis localStorage au montage (une seule fois)
  useEffect(() => {
    if (typeof window !== 'undefined' && !hasInitialized) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setSettings(prev => ({ ...prev, ...parsed, ...initialSettings }));
        } else if (initialSettings) {
          setSettings(prev => ({ ...prev, ...initialSettings }));
        }
      } catch (e) {
        console.error('Erreur lors du chargement des paramètres:', e);
      }
      setHasInitialized(true);
      setIsLoaded(true);
    }
  }, [initialSettings, hasInitialized]);

  // Sauvegarder les paramètres dans localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (e) {
        console.error('Erreur lors de la sauvegarde des paramètres:', e);
      }
    }
  }, [settings, isLoaded]);

  const updateSettings = useCallback((updates: Partial<ClockSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  return { settings, updateSettings, isLoaded };
}

// Hook pour le mode plein écran
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error('Erreur plein écran:', e);
    }
  }, []);

  return { isFullscreen, toggleFullscreen };
}

// Formater l'heure selon le format choisi
export function formatTime(
  time: TimeData,
  format: '12h' | '24h',
  showSeconds: boolean
): string {
  let hours = time.hours;
  
  if (format === '12h') {
    hours = hours % 12 || 12;
  }
  
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = time.minutes.toString().padStart(2, '0');
  const secondsStr = time.seconds.toString().padStart(2, '0');
  
  let result = `${hoursStr}:${minutesStr}`;
  
  if (showSeconds) {
    result += `:${secondsStr}`;
  }
  
  return result;
}

// Générer l'URL partageable avec les paramètres
export function generateShareableUrl(settings: ClockSettings): string {
  if (typeof window === 'undefined') return '';
  
  const params = new URLSearchParams();
  params.set('tz', settings.timezone);
  params.set('type', settings.clockType);
  params.set('format', settings.timeFormat);
  params.set('seconds', settings.showSeconds.toString());
  params.set('theme', settings.themeId);
  
  return `${window.location.origin}?${params.toString()}`;
}

// Parser les paramètres depuis l'URL
export function parseUrlParams(): Partial<ClockSettings> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const settings: Partial<ClockSettings> = {};
  
  const tz = params.get('tz');
  if (tz) settings.timezone = tz;
  
  const type = params.get('type');
  if (type === 'digital' || type === 'analog') settings.clockType = type;
  
  const format = params.get('format');
  if (format === '12h' || format === '24h') settings.timeFormat = format;
  
  const seconds = params.get('seconds');
  if (seconds !== null) settings.showSeconds = seconds === 'true';
  
  const theme = params.get('theme');
  if (theme) settings.themeId = theme;
  
  return settings;
}
