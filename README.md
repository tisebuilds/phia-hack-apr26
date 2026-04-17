# Phia Starter (Next.js)

Interactive pitch prototype for **Phia Starter** — nine screens, two capsule layouts, URL-gated dev tools. Layout is **mobile web first** (full viewport, safe areas, scrollable app surface — no device chrome).

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm test` — Vitest (`deriveCapsule` budget invariants)

## URL flags

- `?tweaks=1` — floating tweaks panel (budget, vibe, company, resale mix, accent)
- `?dev=1` — screen jumper strip (hidden from the default judge URL)
- `?pitch=1` — faint bottom caption with per-screen VO notes

## Persistence

App state is mirrored to `localStorage` under `phia-starter-state-v1` after the first client hydrate so refresh keeps your place.

## Product imagery (optional)

Drop PNGs at `public/products/{id}.png` (`1`–`12`). When a file is missing, tiles fall back to the striped placeholder treatment.

## Standalone HTML

The exported judge bundle lives in `prototype-standalone/Phia Starter Prototype _standalone_.html` (open locally in a browser; not part of the Next build).

## Deploy

Connect this repository to Vercel with **project root = repository root** (default). Set `metadataBase` in `app/layout.tsx` if the production hostname differs from `starter.phia-demo.vercel.app`.
