# Spotless 🎵

> Clean your Spotify library — properly.

A modern, feature-rich alternative to spotify-dedup. Finds and removes duplicate tracks across all your playlists — including the same song from different releases.

## Features

- 🔍 **Smart matching** — detects exact URI duplicates AND the same track from different albums/releases
- 🎯 **Keep control** — choose to keep the oldest or newest copy
- 💜 **Liked Songs** — scans your saved tracks library too
- 📊 **Full stats** — per-playlist analytics
- ⚡ **Rate-limit safe** — throttled requests, won't get you banned
- 🔒 **No data stored** — runs entirely in your browser
- 🌍 **5 languages** — English, Русский, Deutsch, Español, Türkçe

## Setup

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) and create an app
2. Set Redirect URI to your deployment URL
3. Paste your Client ID into the app

## Live Demo

👉 [stonerhand.github.io/Spotless](https://stonerhand.github.io/Spotless)

## Tech

Plain HTML + Vanilla JS. No frameworks, no build step, no backend.  
Uses Spotify Web API with PKCE OAuth flow.

---

Made with ♥ by [StonerHand](https://github.com/StonerHand)
