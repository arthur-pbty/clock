// Types pour l'application d'horloge

export type ClockType = 'digital' | 'analog' | 'flip';

export type TimeFormat = '12h' | '24h';

export interface Theme {
  id: string;
  name: string;
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface ClockSettings {
  clockType: ClockType;
  timeFormat: TimeFormat;
  showSeconds: boolean;
  timezone: string;
  themeId: string;
}

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  period: 'AM' | 'PM';
  formattedTime: string;
  date: Date;
}

// Themes disponibles
export const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Minuit',
    background: '#0f172a',
    foreground: '#f8fafc',
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
  },
  {
    id: 'ocean',
    name: 'Océan',
    background: '#0c4a6e',
    foreground: '#f0f9ff',
    primary: '#0ea5e9',
    secondary: '#7dd3fc',
    accent: '#38bdf8',
  },
  {
    id: 'forest',
    name: 'Forêt',
    background: '#14532d',
    foreground: '#f0fdf4',
    primary: '#22c55e',
    secondary: '#86efac',
    accent: '#4ade80',
  },
  {
    id: 'sunset',
    name: 'Coucher de soleil',
    background: '#7c2d12',
    foreground: '#fff7ed',
    primary: '#f97316',
    secondary: '#fdba74',
    accent: '#fb923c',
  },
  {
    id: 'lavender',
    name: 'Lavande',
    background: '#4c1d95',
    foreground: '#f5f3ff',
    primary: '#a78bfa',
    secondary: '#c4b5fd',
    accent: '#8b5cf6',
  },
  {
    id: 'rose',
    name: 'Rose',
    background: '#831843',
    foreground: '#fdf2f8',
    primary: '#ec4899',
    secondary: '#f9a8d4',
    accent: '#f472b6',
  },
  {
    id: 'charcoal',
    name: 'Charbon',
    background: '#18181b',
    foreground: '#fafafa',
    primary: '#a1a1aa',
    secondary: '#71717a',
    accent: '#d4d4d8',
  },
  {
    id: 'snow',
    name: 'Neige',
    background: '#f8fafc',
    foreground: '#0f172a',
    primary: '#1e293b',
    secondary: '#64748b',
    accent: '#334155',
  },
  {
    id: 'amber',
    name: 'Ambre',
    background: '#78350f',
    foreground: '#fffbeb',
    primary: '#f59e0b',
    secondary: '#fcd34d',
    accent: '#fbbf24',
  },
  {
    id: 'emerald',
    name: 'Émeraude',
    background: '#064e3b',
    foreground: '#ecfdf5',
    primary: '#10b981',
    secondary: '#6ee7b7',
    accent: '#34d399',
  },
  {
    id: 'ruby',
    name: 'Rubis',
    background: '#7f1d1d',
    foreground: '#fef2f2',
    primary: '#ef4444',
    secondary: '#fca5a5',
    accent: '#f87171',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    background: '#0a0a0a',
    foreground: '#00ff9f',
    primary: '#ff00ff',
    secondary: '#00ffff',
    accent: '#ffff00',
  },
];

// Liste des fuseaux horaires populaires
export const TIMEZONES = [
  { value: 'Europe/Paris', label: 'Paris (CET)', offset: '+1:00' },
  { value: 'Europe/London', label: 'Londres (GMT)', offset: '+0:00' },
  { value: 'America/New_York', label: 'New York (EST)', offset: '-5:00' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: '-8:00' },
  { value: 'America/Chicago', label: 'Chicago (CST)', offset: '-6:00' },
  { value: 'America/Toronto', label: 'Toronto (EST)', offset: '-5:00' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: '-3:00' },
  { value: 'America/Mexico_City', label: 'Mexico (CST)', offset: '-6:00' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)', offset: '+1:00' },
  { value: 'Europe/Madrid', label: 'Madrid (CET)', offset: '+1:00' },
  { value: 'Europe/Rome', label: 'Rome (CET)', offset: '+1:00' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam (CET)', offset: '+1:00' },
  { value: 'Europe/Brussels', label: 'Bruxelles (CET)', offset: '+1:00' },
  { value: 'Europe/Zurich', label: 'Zurich (CET)', offset: '+1:00' },
  { value: 'Europe/Moscow', label: 'Moscou (MSK)', offset: '+3:00' },
  { value: 'Europe/Istanbul', label: 'Istanbul (TRT)', offset: '+3:00' },
  { value: 'Asia/Dubai', label: 'Dubaï (GST)', offset: '+4:00' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: '+5:30' },
  { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', offset: '+7:00' },
  { value: 'Asia/Singapore', label: 'Singapour (SGT)', offset: '+8:00' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', offset: '+8:00' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+8:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+9:00' },
  { value: 'Asia/Seoul', label: 'Séoul (KST)', offset: '+9:00' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', offset: '+10:00' },
  { value: 'Australia/Melbourne', label: 'Melbourne (AEST)', offset: '+10:00' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST)', offset: '+12:00' },
  { value: 'Pacific/Honolulu', label: 'Honolulu (HST)', offset: '-10:00' },
  { value: 'Africa/Cairo', label: 'Le Caire (EET)', offset: '+2:00' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', offset: '+2:00' },
  { value: 'UTC', label: 'UTC', offset: '+0:00' },
];

// Paramètres par défaut
export const DEFAULT_SETTINGS: ClockSettings = {
  clockType: 'digital',
  timeFormat: '24h',
  showSeconds: true,
  timezone: 'Europe/Paris',
  themeId: 'midnight',
};
