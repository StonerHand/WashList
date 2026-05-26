# WashList Security Notes

WashList is a static frontend app that talks directly to Spotify. This keeps the product simple, but it also means several enterprise controls must be handled by deployment infrastructure or a backend if the product grows.

## Implemented Frontend Hardening

- PKCE OAuth is used for Spotify authorization.
- Spotify email scope is not requested.
- The Spotify client id is public PKCE configuration. No Spotify client secret is stored in the frontend.
- Spotify access token is session-scoped instead of long-lived local storage.
- Logout clears token data from both session and legacy local storage.
- Direct app entry without auth renders a connect gate instead of private data or broken controls.
- OAuth uses a canonical directory redirect URI (`/WashList/`) to avoid `/index.html` mismatches in Spotify configuration.
- If profile auth succeeds but playlist loading fails, the UI keeps the session visible and offers retry/sign-out instead of starting a second OAuth attempt.
- Duplicate removal accepts empty successful Spotify DELETE responses and shows permission-specific errors for stale scopes or playlists the user cannot edit.
- User/API data is escaped before HTML rendering.
- Landing HTML translations are sanitized to a small allowlist.
- Duplicate removal is guarded against repeated clicks.
- Basic CSP and referrer meta tags are present in static HTML.
- App page is marked `noindex,nofollow`.
- Runtime app scripts avoid console logging of API failures or private data.
- Static CSS/JS references are cache-busted so GitHub Pages deploys do not leave users on stale auth logic.

## Remaining Frontend Risks

| Risk | Severity | Notes |
| --- | --- | --- |
| Access token exists in browser storage | Medium | Static frontend cannot use HttpOnly cookies. Move OAuth to a backend for enterprise production. |
| CSP requires inline scripts/styles | Medium | The project has inline scripts/styles and no build step. A build pipeline would allow nonces or external bundles. |
| Full HTTP security headers are not controlled by GitHub Pages | Medium | Use an edge host for production headers. |
| Client-side deletion is not an authorization boundary | Medium | Spotify enforces authorization; a backend would add app-level audit/idempotency. |

## Recommended Production Headers

Use these as a baseline at the edge/proxy layer:

```http
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'self' https://accounts.spotify.com https://api.spotify.com; img-src 'self' https: data:; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; script-src 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

If inline scripts remain, use CSP nonces or hashes rather than broad `unsafe-inline`.

## Backend Recommendations

- Exchange Spotify code server-side.
- Store tokens in encrypted server storage or HttpOnly Secure SameSite cookies.
- Add token refresh and revocation.
- Add server-side audit log for destructive actions.
- Add idempotency keys for removal requests.
- Add rate limiting per user.
- Return normalized scan result payloads from a typed API.

## Security QA Checklist

- No committed `.env` files.
- No private Spotify secret in frontend code.
- No raw API error or stack trace shown to users.
- No token or private user data logged to console.
- Logout removes token state.
- External links use `rel="noopener noreferrer"`.
- Direct `app.html` without auth shows connect state, not private data.
- `app.html?connect=1` preserves OAuth intent and redirects to the landing PKCE flow.
- Spotify authorize requests use the same redirect URI configured in the Spotify dashboard.
- Fast repeated clicks do not repeat destructive UI actions.
