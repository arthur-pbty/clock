# Clock - Horloge En Ligne

Application d'horloge en ligne (Next.js + TypeScript) avec affichage plein ecran, modes digital/analogique/flip, fuseaux horaires et themes.

## Projet en ligne

Lien public: https://clock.arthurp.fr

Ce lien est volontairement present dans ce README pour renforcer le backlink vers le projet en production.

## Fonctionnalites

- Horloge en temps reel (rafraichissement fin)
- Modes: `digital`, `analog`, `flip`
- Format horaire: `12h` / `24h`
- Affichage optionnel des secondes
- Selection de fuseau horaire (liste IANA)
- Themes visuels
- Parametres persistants dans le navigateur
- URL partageable avec les parametres

## SEO

- `robots.ts` et `sitemap.ts` configures
- Pages `loading`, `error`, `not-found`
- Balises et structure optimisees pour l'indexation

## Parametres URL

| Parametre | Valeurs | Description |
|---|---|---|
| `tz` | ex: `Europe/Paris` | Fuseau horaire |
| `type` | `digital`, `analog`, `flip` | Type d'horloge |
| `format` | `12h`, `24h` | Format horaire |
| `seconds` | `true`, `false` | Afficher les secondes |
| `theme` | id du theme | Theme visuel |

Exemple:

`https://clock.arthurp.fr?tz=Europe/Paris&type=analog&format=24h&seconds=true&theme=midnight`

## Lancer le projet

Prerequis:

- Node.js 18+
- npm

Installation et dev:

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm start
```


## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Licence

MIT
