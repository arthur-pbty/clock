# Clock

Horloge en ligne construite avec Next.js, React et TypeScript.

## Site public

https://clock.arthurp.fr

## Lancer en local

Prerequis:

- Node.js 22+
- npm

Commandes:

```bash
npm install
npm run dev
```

## Build production local

```bash
npm run build
npm start
```

## Docker

Mode developpement:

```bash
docker compose --profile dev up --build
```

Mode production:

```bash
docker compose --profile prod up --build -d
```

Services compose:

- `clock-dev`: serveur dev sur `http://localhost:3000`
- `clock-prod`: serveur prod sur `http://localhost:3007`

Variables `.env` utilisees:

- `SITE_URL`
- `CONTACT_URL`
- `CONTACT_EMAIL`
- `NODE_ENV`
- `PORT`
- `HOSTNAME`
- `TZ`
- `NEXT_TELEMETRY_DISABLED`

## Pages legales

- `/mentions-legales`
- `/politique-confidentialite`

## Licence

Tous droits reserves - © 2026 Arthur P.
