import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date('2026-03-01');
  
  // Page principale
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Pages par type d'horloge
  const clockTypePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}?type=digital`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}?type=analog`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Pages pour chaque fuseau horaire populaire
  const timezones = [
    'Europe/Paris',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'America/Toronto',
    'America/Sao_Paulo',
    'America/Mexico_City',
    'America/Argentina/Buenos_Aires',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Seoul',
    'Asia/Bangkok',
    'Asia/Jakarta',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Amsterdam',
    'Europe/Brussels',
    'Europe/Zurich',
    'Europe/Moscow',
    'Europe/Istanbul',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Pacific/Auckland',
    'Pacific/Honolulu',
  ];

  const timezonePages: MetadataRoute.Sitemap = timezones.map((tz) => ({
    url: `${baseUrl}?tz=${encodeURIComponent(tz)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Pages par thème
  const themes = [
    'midnight', 'ocean', 'forest', 'sunset', 'lavender', 'rose',
    'charcoal', 'snow', 'amber', 'emerald', 'ruby', 'cyberpunk',
  ];

  const themePages: MetadataRoute.Sitemap = themes.map((theme) => ({
    url: `${baseUrl}?theme=${theme}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...clockTypePages, ...timezonePages, ...themePages];
}
