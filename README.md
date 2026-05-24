# WashList 🫧

> Wash your Spotify playlists clean.

A modern, feature-rich Spotify duplicate cleaner by [StonerHand](https://github.com/StonerHand). Finds and removes duplicate tracks across all your playlists — including the same song from different releases.

## Live

👉 **[stonerhand.github.io/WashList](https://stonerhand.github.io/WashList)**

## Features

- 🔍 **Smart dedup** — URI + name/artist fuzzy match
- 🎯 **Keep control** — keep oldest or newest copy
- 💜 **Liked Songs** — scans saved tracks too
- 📊 **Compare playlists** — see shared tracks
- 🔍 **Overlap finder** — tracks in 3+ playlists
- 🕸 **D3 connection graph** — zoomable, draggable
- 📁 **Export** — CSV or JSON per playlist
- 📋 **Clean history** — log with export
- 🌍 **4 languages** — EN, RU, DE, ES
- ⚡ **Rate-limit safe** — won't get you banned
- 🔒 **No data stored** — runs in your browser

## Setup

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) — create an app
2. Set Redirect URI to `https://stonerhand.github.io/WashList/`
3. Paste your Client ID into the app

## Tech

Plain HTML + Vanilla JS + D3. No frameworks, no build step, no backend.
Uses Spotify Web API with PKCE OAuth.

---

made by [StonerHand](https://github.com/StonerHand)
