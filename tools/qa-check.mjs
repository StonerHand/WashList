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
const runtimeAll = [files.index, files.app, files.landingAuth, files.appJs, files.appCss, files.liveCss].join('\n');
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
check('app starts Spotify OAuth directly', /function startSpotifyAuth/.test(files.appJs) && /data-connect-spotify/.test(files.appJs) && /goToConnect\(\);/.test(files.appJs));
check('top auth button switches between connect and logout', /data-auth-action="connect"/.test(files.app) && /dataset\.authAction/.test(files.appJs));
check('OAuth redirect URI is canonical directory URL', /function canonicalRedirectUri/.test(files.landingAuth) && /function canonicalRedirectUri/.test(files.appJs) && !/location\.href\.split/.test(files.landingAuth + files.appJs));
check('signed-out app shows Spotify auth gate', /function authRequiredMarkup/.test(files.appJs) && /auth-gate/.test(files.liveCss));
check('connected playlist load failure stays signed in', /function loadErrorMarkup/.test(files.appJs) && /data-retry-load/.test(files.appJs));
check('auth gate strings are localized', /'auth\.title'/.test(files.appJs) && /'auth\.sub'/.test(files.appJs) && /'auth\.secure'/.test(files.appJs));
check('search input is debounced', /debounce\(renderPlaylists,\s*120\)/.test(files.appJs));
check('duplicate removals are idempotency guarded', /pendingRemovals/.test(files.appJs));
check('Spotify empty success responses are accepted', /response\.text\(\)/.test(files.appJs) && /!\s*raw\.trim\(\)/.test(files.appJs));
check('duplicate removal avoids pre-delete playlist fetch', !/spotify\(`https:\/\/api\.spotify\.com\/v1\/playlists\/\$\{playlist\.id\}`\)/.test(files.appJs));
check('duplicate removal errors are localized', /function removalErrorMessage/.test(files.appJs) && /toast\.removeScopeErr/.test(files.appJs));
check('compare rows render album artwork', /function albumArt/.test(files.appJs) && /track-art/.test(files.appJs) && /track-art/.test(files.appCss + files.liveCss));
check('metadata duplicate guard requires duration or version evidence', /hasVersionSignal/.test(files.appJs) && /!durationClose && !hasVersionSignal/.test(files.appJs));
check('static assets are cache busted', /washlist-app\.js\?v=/.test(files.app) && /landing-auth\.js\?v=/.test(files.index));
check('runtime app avoids console logging', !/console\.(log|warn|error|debug)/.test(files.appJs + files.landingAuth));
check('heavy cross-page transition is removed', !/route-transition|workspace-transition|app-entering|is-entering-app/.test(runtimeAll));

if (failures.length) {
  console.error('QA check failed:');
  failures.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

console.log('QA check passed');
