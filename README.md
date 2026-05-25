# WashList

Clean your Spotify library — properly.

---

## What it does

Finds and removes duplicate tracks across all your playlists. Detects exact copies and the same song from different releases. Built for Spotify power users.

---

## Features

| | |
|---|---|
| **Smart dedup** | URI match + fuzzy name/artist. Handles remasters, live versions |
| **Dry-run mode** | Preview everything before any changes are made |
| **Compare** | See shared tracks between any two playlists |
| **Overlap** | Find tracks living in 3+ playlists simultaneously |
| **Graph** | Interactive D3 force-graph of playlist connections |
| **Export** | CSV or JSON per playlist. Full history stored locally |
| **5 languages** | EN · RU · DE · ES · FR |
| **Dark / Light** | Both themes, fully consistent |

---

## Live

**[stonerhand.github.io/WashList](https://stonerhand.github.io/WashList)**

---

## Setup

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) — create an app
2. Set Redirect URI: `https://stonerhand.github.io/WashList/`
3. Hit **Connect Spotify** — no Client ID needed

---

## Tech

Single `index.html` · Vanilla JS · D3.js · Spotify Web API · PKCE OAuth · No backend · No tracking

---

made by [StonerHand](https://github.com/StonerHand)
