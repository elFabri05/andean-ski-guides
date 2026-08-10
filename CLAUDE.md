# Andean Ski Guides

Marketing site for a ski-guiding operation in Mendoza, Argentina. Next.js 16
(App Router, Turbopack) + TypeScript + MUI, trilingual, with a contact form that
sends mail through Resend.

## Toolchain: Node 20 is required

Next 16 requires Node >= 20.9 and **refuses to build on anything older**. The
system Node on this machine is 18, so nvm must be activated first:

```bash
nvm use 20        # v20.20.2 is installed and is the nvm default alias
npm run build
```

A bare `npm run build` in a shell that hasn't sourced nvm fails immediately with
`You are using Node.js 18.19.1`. That is the toolchain, not the code.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build (needs Node 20, see above)
npm run lint    # eslint
npx tsc --noEmit  # typecheck alone; faster than a full build
```

There is no test suite.

## Layout

```
app/
├── page.tsx              # single-page site; tab state switches sections
├── layout.tsx            # metadata/SEO, wraps I18nProvider + ThemeRegistry
├── itinerary/            # the one real sub-route
├── components/           # all UI
├── lib/                  # contact-form security helpers (see below)
├── locales/{en,es,de}.json
├── i18n.ts               # i18next; detects via localStorage then navigator
└── api/contact/route.ts  # the only API route
```

`page.tsx` is a client component that renders sections by tab index rather than
by routing, so most "pages" are not URLs.

## The map

`app/components/DestinationMap.tsx` is the public entry point (default export,
no props) — imported by `TripDescription`. Keep that interface stable.

- **`destinations.ts`** holds the exported `DESTINATIONS` array. Editing it is
  the whole workflow for adding, moving or removing a pin; the viewport is
  derived from the coords via `fitBounds`, never a hardcoded center/zoom.
- **`DestinationMapLeaflet.tsx`** is the Leaflet map, loaded via `next/dynamic`
  with `ssr: false` because Leaflet touches `window` at import time.

Two things there look redundant but are not. The default marker icons are
rebuilt from imported PNGs because Leaflet's stock icon URLs resolve relative to
`leaflet.css` and 404 under every bundler. And the wrapper `Box` sets an
explicit height because Leaflet sizes itself to its container — a container with
no height collapses to 0px and renders nothing.

The `assetUrl()` helper next to those imports is load-bearing too. Next types a
PNG import as `StaticImageData`, but **Turbopack actually returns a plain URL
string**, so `markerIcon.src` typechecks and is `undefined` at runtime
(`iconUrl not set in Icon options`). `tsc` and `next build` both pass while the
page throws, so image imports cannot be trusted to be objects here.

Tiles come from OpenStreetMap. The `© OpenStreetMap contributors` attribution is
required by their terms; don't drop it. `tile.osm.org` is fine at current
traffic but the OSMF tile policy prohibits heavy use — a real traffic increase
means moving to a tile provider with an SLA.

## Internationalisation

`app/i18n.ts` pins `lng: 'en'` instead of letting the detector choose, and this
is deliberate. The module is imported by a client component, so it also runs
during SSR, where `localStorage` and `navigator` do not exist — detection there
always yields English. If the browser detects at init, the client's first render
disagrees with the server for every non-English visitor, which React reports as
a whole-tree hydration failure. `I18nProvider` applies the real language in an
effect, after hydration has committed.

Two consequences worth keeping intact:

- **Detector caching is off** (`caches: []`). i18next writes its cache during
  init, so with a pinned `lng` it stamped `"en"` into localStorage before the
  visitor was ever detected, and then read its own stamp back — every new
  visitor stuck on English. `I18nProvider` persists on `languageChanged`
  instead, which also covers the language selector.
- **`<html lang>` is server-rendered as `en`** and updated by that same handler.

Anything that changes language must go through `i18n.changeLanguage` so both
side effects fire.

## Security headers

`next.config.ts` `headers()` is the **single source of truth** for CSP and all
security headers, on every host. `netlify.toml` deliberately does not restate
them (`@netlify/plugin-nextjs` honours the Next config, as does Vercel);
duplicating them would set them twice and let the copies drift.

`SECURITY-HEADERS.md` documents the policy — update it alongside any CSP change.

Adding a third-party asset host usually means a CSP edit. The map needs the OSM
tile hosts in `img-src`; Google Fonts entries relate to `next/font`, not to any
Google Maps code, which is gone.

## Contact form

`app/api/contact/route.ts` layers CSRF origin checking, IP + email rate
limiting, input validation, and email-header-injection protection — all in
`app/lib/`. Route them through those helpers rather than validating inline.

`RESEND_API_KEY` is read lazily inside `getResend()`, not at module scope, and
that placement is deliberate: Next evaluates the module during `next build`, so
eager construction would turn the key into a build-time secret on every host.
Keep it lazy.

## Deployment

Host-agnostic. `netlify.toml` is inert unless the site is actually built by
Netlify. Environment: `RESEND_API_KEY` (required at runtime),
`NEXT_PUBLIC_SITE_URL` (optional; overrides the canonical URL in
`app/lib/deployEnv.ts`).
