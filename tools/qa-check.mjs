import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

const files = {
  index: read('index.html'),
  app: read('app.html'),
  landingAuth: read('js/landing-auth.js'),
  appJs: read('js/washlist-app.js'),
  appCss: read('styles/app.css'),
  liveCss: read('styles/live.css'),
};

const all = Object.values(files).join('\n');
const failures = [];

function check(name, condition) {
  if (!condition) failures.push(name);
}

check('demo mode is removed', !/app\.html\?demo|loadDemo|demoBtn/i.test(all));
check('custom cursor is removed', !/cursor-dot|cursor-ring|initCursor|cursor-active|cursor-action/.test(all));
check('Spotify email scope is not requested', !/user-read-email/.test(files.landingAuth));
check('OAuth token uses session-scoped storage', /sessionStorage\.setItem\(key,\s*value\)/.test(files.landingAuth) && /sessionStorage\.getItem\(key\)/.test(files.appJs));
check('landing has CSP metadata', /Content-Security-Policy/.test(files.index));
check('app has noindex and CSP metadata', /noindex,nofollow/.test(files.app) && /Content-Security-Policy/.test(files.app));
check('external blank links are noopener noreferrer', !/target="_blank"(?![^>]*rel="noopener noreferrer")/.test(files.index));
check('landing HTML translations are sanitized', /function safeI18nHtml/.test(files.index));
check('app supports hash deep links', /TAB_HASHES/.test(files.appJs) && /popstate/.test(files.appJs));
check('app connect route preserves OAuth intent', /index\.html\?connect=1/.test(files.appJs) && /params\.get\('connect'\) === '1'/.test(files.landingAuth));
check('signed-out app shows Spotify auth gate', /function authRequiredMarkup/.test(files.appJs) && /auth-gate/.test(files.liveCss));
check('search input is debounced', /debounce\(renderPlaylists,\s*120\)/.test(files.appJs));
check('duplicate removals are idempotency guarded', /pendingRemovals/.test(files.appJs));
check('compare rows render album artwork', /function albumArt/.test(files.appJs) && /track-art/.test(files.appJs) && /track-art/.test(files.appCss + files.liveCss));
check('metadata duplicate guard requires duration or version evidence', /hasVersionSignal/.test(files.appJs) && /!durationClose && !hasVersionSignal/.test(files.appJs));

if (failures.length) {
  console.error('QA check failed:');
  failures.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

console.log('QA check passed');
