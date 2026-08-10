# Andean Ski Guides

Marketing website for a ski-guiding operation running trips in the Andes around
Mendoza, Argentina. It presents the trips and terrain, maps the destinations,
and puts prospective clients in touch with the guides by email — in English,
Spanish and German.

Production: [andeanskiguides.com](https://andeanskiguides.com)

## What the site does

- **Single-page main site.** `/` is a tabbed page — Home, Trip Description,
  Contact — where sections are switched by tab state rather than by routing, so
  most of the site lives at one URL.
- **Photo carousel** of the terrain and previous trips.
- **Destinations map.** An interactive Leaflet map with three pins around
  Mendoza — Puente del Inca, Las Leñas and Paso Pehuenche — whose viewport is
  fitted to the markers rather than to a fixed center and zoom.
- **Trip itineraries** at `/itinerary`, the one real sub-route, listing the
  bookable trips and their durations: Paso Pehuenche (4 days), Las Leñas +
  Pehuenche (8 days), Aconcagua (3–4 days) and the full Andean ski trip
  (12 days).
- **Contact form** that emails the guides directly, with validation, spam
  protection and rate limiting.
- **Three languages**, detected from the visitor's browser, switchable from the
  header, and remembered between visits.
- **SEO**: page metadata, Open Graph and Twitter cards, JSON-LD structured data,
  a generated sitemap and `robots.txt`.
- **Security headers** — a Content Security Policy and related headers applied
  to every route.

## Tools

| Tool | Role |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router, Turbopack) | Framework: rendering, routing, the contact API route, security headers |
| [React 19](https://react.dev) | UI runtime |
| [TypeScript 5](https://www.typescriptlang.org) | Types, in `strict` mode |
| [MUI 7](https://mui.com) + [Emotion](https://emotion.sh) | Component library and theming — effectively all of the UI |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility layer via PostCSS; used lightly, mainly for the tokens in `app/globals.css` |
| [i18next](https://www.i18next.com) + react-i18next + browser-languagedetector | Translations and language detection |
| [Leaflet 1.9](https://leafletjs.com) + [react-leaflet 5](https://react-leaflet.js.org) | The destinations map |
| [OpenStreetMap](https://www.openstreetmap.org) | Map tiles — no API key, attribution required |
| [Resend](https://resend.com) | Transactional email for the contact form |
| escape-html | Escapes user input placed into the outgoing email |
| [ESLint 9](https://eslint.org) + eslint-config-next | Linting |
| [@netlify/plugin-nextjs](https://github.com/netlify/next-runtime) | Only used when the site is built by Netlify |

There is no test suite.

## Requirements

**Node.js 20.9 or newer.** Next 16 refuses to build on anything older, and the
error is about the Node version rather than the code:

```bash
nvm use 20
```

## Getting started

```bash
npm install
```

Create `.env.local` in the project root (it is gitignored, and the repo ships no
`.env.example`):

```bash
RESEND_API_KEY=your_key_here
```

- Get the key from [Resend → API Keys](https://resend.com/api-keys). The free
  tier covers 100 emails/day and 3,000/month.
- `NEXT_PUBLIC_SITE_URL` is optional and overrides the canonical site URL used
  for metadata and CSRF origin checks — useful on preview deployments.

For production email, verify your domain in the
[Resend dashboard](https://resend.com/domains) and replace the sandbox sender
`onboarding@resend.dev` in `app/api/contact/route.ts` with an address on that
domain. Mail from the sandbox sender is far more likely to be filtered as spam.

Then:

```bash
npm run dev
```

and open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build (needs Node 20) |
| `npm start` | Serve a production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck on its own — faster than a full build |

## Project structure

```
app/
├── page.tsx              # tabbed single page (Home / Trip Description / Contact)
├── layout.tsx            # metadata, SEO, providers
├── itinerary/            # /itinerary route
├── components/           # all UI, including the map and contact form
├── lib/                  # contact-form security helpers
├── locales/              # en.json, es.json, de.json
├── i18n.ts               # i18next setup
├── sitemap.ts            # generated sitemap
└── api/contact/route.ts  # the only API route
public/images/carousel/   # carousel photography
```

## Implementation notes

A few behaviours are deliberate and easy to undo by accident. `CLAUDE.md` covers
them in full; briefly:

- **The map** derives its viewport from the marker coordinates, and rebuilds
  Leaflet's default icons from bundled assets because the stock icon URLs break
  under bundlers. Editing `app/components/destinations.ts` is the whole workflow
  for changing pins. The OpenStreetMap attribution is required by their terms,
  and their tile policy prohibits heavy use — significant traffic means moving
  to a tile provider with an SLA.
- **Language** is pinned to English at initialisation and switched after
  hydration, because detection is impossible during server rendering and
  detecting on the client at init caused hydration failures.
- **Security**: the contact route layers CSRF origin checking, IP and email rate
  limiting, input validation and email-header-injection protection, all from
  `app/lib/`.
- **`next.config.ts` is the single source of truth for security headers** on
  every host. `netlify.toml` deliberately does not restate them.
  `SECURITY-HEADERS.md` documents the policy.

## Deployment

Host-agnostic; it runs on Vercel or Netlify with no code changes. `netlify.toml`
is inert unless Netlify is doing the build. Set `RESEND_API_KEY` in the host's
environment — it is read at runtime, not at build time — and optionally
`NEXT_PUBLIC_SITE_URL`.

## Known gaps

- The sitemap advertises `?lang=en|es|de` alternates, but nothing reads that
  query parameter; language comes from the browser or the selector only.
- Only English is server-rendered, so translated content is not indexable.
  Non-English visitors also see a brief flash of English before the switch.
- Marker popups on the map show the destination name with no description yet.
