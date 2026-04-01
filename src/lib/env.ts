const FALLBACK_SITE_URL = 'https://clock.arthurp.fr';
const FALLBACK_CONTACT_URL = 'https://contact.arthurp.fr';
const FALLBACK_CONTACT_EMAIL = 'contact@arthurp.fr';

function normalizeUrl(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = new URL(value);
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export const SITE_URL = normalizeUrl(process.env.SITE_URL, FALLBACK_SITE_URL);
export const CONTACT_URL = normalizeUrl(process.env.CONTACT_URL, FALLBACK_CONTACT_URL);
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim() || FALLBACK_CONTACT_EMAIL;
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;