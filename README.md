# WashList

Spotify library intelligence for finding real duplicates without hiding valid versions.

[Live site](https://stonerhand.github.io/WashList/)

## Product

WashList scans Spotify playlists, normalizes track metadata, groups exact duplicates, and keeps remixes, live versions, acoustic versions, remasters, sped-up/slowed variants, and weak matches visible for review.

The product rule is intentionally conservative:

- Same Spotify URI, URL, or ISRC: exact duplicate.
- Same title, same artist set, close duration: probable duplicate, review first.
- Same artist only: never a duplicate.
- Similar title only: review, never auto-remove.
- Different versions: related items, visible by default.

## Features

| Area | Details |
| --- | --- |
| Deduplication | Multi-factor match scoring with exact, probable, version, and review groups. |
| Safe cleanup | Dry-run mode, per-track removal, group removal, and local history. |
| Scanning | Parallel playlist/page loading with Spotify rate-limit backoff and progress UI. |
| Analysis | Playlist comparison, overlap map, graph view, exportable duplicate/history data. |
| UX | Dark/light themes, responsive app shell, keyboard-friendly language switcher. |
| Localization | EN, RU, DE, ES, FR with fallback language and locale-aware dates/numbers. |
| Privacy | No backend, no analytics, no tracking. Spotify access token is session-scoped. |

## Architecture

```text
index.html                  Landing page, localized marketing/product preview
app.html                    Authenticated app shell
js/landing-auth.js          Spotify PKCE OAuth callback and auth handoff
js/washlist-app.js          App state, Spotify API, scanning, dedup, rendering
js/waveform-bg.js           Canvas waveform background
styles/tokens.css           Shared design tokens and themes
styles/app.css              App layout/components
styles/live.css             Data-connected app states and responsive rules
styles/landing-transition.css
```

The app is intentionally static and backend-free. Sensitive enforcement, long-lived token storage, and security headers should be handled by an edge/backend deployment if WashList grows beyond GitHub Pages.

## Spotify Setup

1. Create an app in the Spotify Developer Dashboard.
2. Add redirect URI: `https://stonerhand.github.io/WashList/`.
3. Keep the public client id in `js/landing-auth.js`.
4. Use the app through **Connect Spotify**.

Current scopes are minimized to playlist/library read-write and private profile product information. Email is not requested.

## Local Development

```bash
python3 -m http.server 4173
```

Open:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/app.html`

## Static QA

```bash
node tools/qa-check.mjs
node --check js/landing-auth.js
node --check js/washlist-app.js
```

## QA Checklist

- Landing opens in light/dark theme without console errors.
- Language switcher updates landing preview, marquee, and app UI.
- App without auth shows a connect state, not demo data.
- `#library`, `#duplicates`, `#compare`, `#overlap`, `#graph`, `#history`, and `#settings` deep links select the correct app section.
- Search is debounced and does not cause visible lag.
- Duplicate removal disables repeated clicks and removes the track from local results after Spotify confirms.
- Logout clears session-scoped Spotify credentials and returns to the connect state.

See [docs/i18n.md](docs/i18n.md) and [docs/security.md](docs/security.md) for localization and hardening notes.

## Limitations

- GitHub Pages cannot set full HTTP security headers. Use Cloudflare Pages, Netlify, Vercel, or a backend edge layer for production-grade headers.
- A pure frontend Spotify app cannot use HttpOnly cookies for the access token. For enterprise production, move OAuth/token exchange to a backend.

## Author

Made by [StonerHand](https://github.com/StonerHand).
