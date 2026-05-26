(() => {
  const CLIENT_ID = '5ce8326e147f46b3b11ebc24ac37bf7c';
  const SCOPES = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-read-private',
  ].join(' ');
  const TOKEN_KEY = 'wl_t';
  const EXPIRES_KEY = 'wl_e';
  const VERIFIER_KEY = 'wl_v';
  const STATE_KEY = 'wl_state';
  const REDIRECT_URI = canonicalRedirectUri();

  const style = document.createElement('style');
  style.textContent = `
    .auth-status {
      position: fixed;
      left: 50%;
      bottom: 24px;
      z-index: 300;
      transform: translateX(-50%);
      padding: 10px 14px;
      border: 1px solid var(--line-2);
      border-radius: 999px;
      background: rgba(20, 24, 31, .86);
      color: var(--ink);
      font: 600 12px var(--f-mono);
      letter-spacing: .04em;
      box-shadow: var(--shadow-2);
      backdrop-filter: blur(16px);
    }
    .auth-status[data-type="error"] { color: var(--coral); border-color: var(--coral-brd); }
    .auth-status[data-type="warn"] { color: var(--amber); border-color: var(--amber-brd); }
  `;
  document.head.appendChild(style);

  function canonicalRedirectUri() {
    const path = location.pathname.endsWith('/')
      ? location.pathname
      : location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);
    return `${location.origin}${path || '/'}`;
  }

  function readAuthItem(key) {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeAuthItem(key, value) {
    try {
      sessionStorage.setItem(key, value);
      localStorage.removeItem(key);
    } catch {
      try { localStorage.setItem(key, value); } catch {}
    }
  }

  function removeAuthItem(key) {
    try { sessionStorage.removeItem(key); } catch {}
    try { localStorage.removeItem(key); } catch {}
  }

  function goToApp(url = 'app.html') {
    location.href = url;
  }

  function resetTransitionState(clearStatus = false) {
    if (clearStatus) document.querySelectorAll('.auth-status').forEach((el) => el.remove());
  }

  function status(text, type = 'info') {
    let el = document.querySelector('.auth-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'auth-status';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.dataset.type = type;
  }

  function base64Url(bytes) {
    return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  async function makeVerifier() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return base64Url(bytes);
  }

  async function makeChallenge(verifier) {
    const encoded = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return base64Url(new Uint8Array(digest));
  }

  async function startAuth() {
    const existingToken = readAuthItem(TOKEN_KEY);
    const expires = parseInt(readAuthItem(EXPIRES_KEY) || '0', 10);
    if (existingToken && expires > Date.now() + 60000) {
      goToApp('app.html');
      return;
    }

    const verifier = await makeVerifier();
    const challenge = await makeChallenge(verifier);
    const state = crypto.randomUUID();
    writeAuthItem(VERIFIER_KEY, verifier);
    writeAuthItem(STATE_KEY, state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: challenge,
      state,
    });

    status('Opening Spotify...');
    location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async function handleCallback() {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');
    if (!code && !error) return false;

    if (error) {
      history.replaceState({}, '', REDIRECT_URI);
      removeAuthItem(VERIFIER_KEY);
      removeAuthItem(STATE_KEY);
      status('Spotify connection was cancelled.', 'warn');
      return true;
    }

    const expectedState = readAuthItem(STATE_KEY);
    if (!expectedState || params.get('state') !== expectedState) {
      history.replaceState({}, '', REDIRECT_URI);
      removeAuthItem(VERIFIER_KEY);
      removeAuthItem(STATE_KEY);
      status('Spotify returned an invalid state. Try connecting again.', 'error');
      return true;
    }

    const verifier = readAuthItem(VERIFIER_KEY);
    if (!verifier) {
      history.replaceState({}, '', REDIRECT_URI);
      status('Auth session expired. Try connecting again.', 'error');
      return true;
    }

    status('Connecting Spotify...');

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: verifier,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      writeAuthItem(TOKEN_KEY, data.access_token);
      writeAuthItem(EXPIRES_KEY, String(Date.now() + data.expires_in * 1000));
      removeAuthItem(VERIFIER_KEY);
      removeAuthItem(STATE_KEY);
      location.replace('app.html');
    } catch {
      history.replaceState({}, '', REDIRECT_URI);
      status('Could not connect Spotify. Please try again.', 'error');
    }
    return true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    handleCallback().then((handled) => {
      if (!handled && params.get('connect') === '1') {
        history.replaceState({}, '', REDIRECT_URI);
        startAuth();
      }
    });
    document.querySelectorAll('a[href^="app.html"]').forEach((link) => {
      if (link.hasAttribute('data-auth-connect')) return;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        goToApp(link.getAttribute('href') || 'app.html');
      });
    });
    document.querySelectorAll('[data-auth-connect]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        startAuth();
      });
    });
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      resetTransitionState(true);
    }
  });
})();
