(() => {
  const CLIENT_ID = '5ce8326e147f46b3b11ebc24ac37bf7c';
  const TOKEN_KEY = 'wl_t';
  const EXPIRES_KEY = 'wl_e';
  const HISTORY_KEY = 'wl_h';
  const LANG_KEY = 'washlist:lang';
  const THEME_KEY = 'washlist:theme';
  const TRANSITION_KEY = 'washlist:app-transition';

  const LANGS = [
    { code: 'en', flag: '🇬🇧', name: 'English', short: 'EN', locale: 'en-GB' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский', short: 'RU', locale: 'ru-RU' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch', short: 'DE', locale: 'de-DE' },
    { code: 'es', flag: '🇪🇸', name: 'Español', short: 'ES', locale: 'es-ES' },
    { code: 'fr', flag: '🇫🇷', name: 'Français', short: 'FR', locale: 'fr-FR' },
  ];

  const I18N = {
    en: {
      'tag.intelligence': 'music intelligence',
      'nav.workspace': 'Workspace',
      'nav.system': 'System',
      'nav.library': 'Library',
      'nav.duplicates': 'Duplicates',
      'nav.compare': 'Compare',
      'nav.overlap': 'Overlap',
      'nav.graph': 'Graph',
      'nav.history': 'History',
      'nav.settings': 'Settings',
      'top.workspace': 'WashList',
      'top.search': 'Search',
      'top.logout': 'Log out',
      'state.loading': 'Loading',
      'state.empty': 'No data yet',
      'state.error': 'Something went wrong',
      'lib.eyebrow': 'Library scanner',
      'lib.titleA': 'Clean',
      'lib.titleB': 'your playlists',
      'lib.sub': 'Scan Spotify playlists, keep real songs, and review duplicates with clear reasons.',
      'lib.scanAll': 'Scan all',
      'lib.reload': 'Reload',
      'lib.search': 'Search playlists',
      'lib.playlists': 'Playlists',
      'lib.scan': 'Scan',
      'lib.rescan': 'Rescan',
      'lib.review': 'Review',
      'lib.open': 'Open',
      'scan.ready': 'Ready',
      'scan.live': 'Scanning',
      'scan.done': 'Scan complete',
      'scan.pipeline': 'Fingerprint pipeline',
      'scan.title': 'Metadata-safe scan.',
      'scan.rules': 'Match rules',
      'rule.id': 'Exact ID / URI / ISRC is a duplicate',
      'rule.idSub': 'Safe for bulk removal',
      'rule.meta': 'Title + artists + duration is review',
      'rule.metaSub': 'Shown with confidence, not auto-deleted',
      'rule.version': 'Live/remix/acoustic stays visible',
      'rule.versionSub': 'Related version, not hidden',
      'rule.artist': 'Artist-only never counts',
      'rule.artistSub': 'Different songs stay separate',
      'stats.playlists': 'Playlists',
      'stats.tracks': 'Tracks',
      'stats.unique': 'Unique',
      'stats.duplicates': 'Duplicates',
      'stats.review': 'Review',
      'stats.artists': 'Artists',
      'stats.albums': 'Albums',
      'filter.all': 'All',
      'filter.unique': 'Unique',
      'filter.dupes': 'Duplicates',
      'filter.review': 'Review',
      'filter.artists': 'Artists',
      'filter.albums': 'Albums',
      'filter.errors': 'Errors',
      'status.idle': 'Not scanned',
      'status.scan': 'Scanning',
      'status.clean': 'Clean',
      'status.dirty': '{count} dupes',
      'status.review': 'Review',
      'status.error': 'Error',
      'dup.eyebrow': 'Duplicate review',
      'dup.titleA': 'Real dupes',
      'dup.titleB': 'with reasons',
      'dup.sub': 'Exact matches can be removed. Possible matches and versions stay in review.',
      'dup.applyExact': 'Apply exact',
      'dup.export': 'Export',
      'dup.exact': 'Exact',
      'dup.probable': 'Probable',
      'dup.version': 'Versions',
      'dup.keep': 'Keep',
      'dup.remove': 'Remove',
      'dup.removeOne': 'Remove this track',
      'dup.removeGroup': 'Remove duplicate in this group',
      'dup.keepBoth': 'Keep both',
      'dup.reason.uri': 'Same Spotify URI',
      'dup.reason.isrc': 'Same ISRC',
      'dup.reason.metadata': 'Same title, artists and close duration',
      'dup.reason.version': 'Related version detected',
      'dup.reason.weak': 'Similar metadata, needs review',
      'dup.conf': '{count}% confidence',
      'dup.duration': 'Duration {value}',
      'dup.source': 'Source {value}',
      'dup.added': 'Added',
      'dup.noAction': 'No exact duplicate to remove',
      'dup.rming': 'Removing...',
      'dup.dry': 'Dry run is enabled. Nothing was removed.',
      'cmp.eyebrow': 'Playlist comparison',
      'cmp.titleA': 'Compare',
      'cmp.titleB': 'two playlists',
      'cmp.sub': 'See shared tracks and what exists only on each side.',
      'cmp.run': 'Compare',
      'cmp.shared': 'Shared tracks',
      'cmp.only': '{count} only here',
      'cmp.both': '{count} shared',
      'ov.eyebrow': 'Overlap map',
      'ov.titleA': 'Tracks living',
      'ov.titleB': 'in many playlists',
      'ov.sub': 'Find tracks that appear in three or more playlists.',
      'ov.min': 'Minimum playlists',
      'ov.run': 'Build overlap',
      'ov.none': 'Scan playlists first, then overlap will appear here.',
      'gph.eyebrow': 'Library graph',
      'gph.titleA': 'Playlist',
      'gph.titleB': 'connections',
      'gph.sub': 'Visualize playlist overlap without leaving the app.',
      'gph.build': 'Build graph',
      'gph.nodata': 'Scan at least two playlists first.',
      'hist.eyebrow': 'History',
      'hist.titleA': 'Cleanup',
      'hist.titleB': 'log',
      'hist.sub': 'Local history of duplicate removals and exports.',
      'hist.export': 'Export CSV',
      'hist.clear': 'Clear',
      'hist.empty': 'No cleanup history yet.',
      'set.eyebrow': 'Settings',
      'set.titleA': 'Scanning',
      'set.titleB': 'controls',
      'set.sub': 'Keep basic controls visible and advanced matching options tucked away.',
      'set.matching': 'Matching',
      'set.matchingSub': 'Balanced mode is conservative and keeps metadata-only matches in review.',
      'set.mode': 'Scan mode',
      'set.modeSub': 'Strict only uses exact IDs. Balanced adds safe review groups. Fuzzy is for manual analysis.',
      'set.remasters': 'Treat remasters as duplicates',
      'set.remastersSub': 'Off by default to prevent accidental version loss.',
      'set.live': 'Allow live/acoustic review',
      'set.liveSub': 'Keeps versions visible but never auto-removes them.',
      'set.dry': 'Dry run',
      'set.drySub': 'Show removal actions without touching Spotify.',
      'set.performance': 'Performance',
      'set.performanceSub': 'Playlist pages are fetched in parallel with API backoff.',
      'set.playlistWorkers': 'Parallel playlist scans',
      'set.playlistWorkersSub': 'Higher values are faster but can hit API rate limits.',
      'set.pageWorkers': 'Parallel page fetches',
      'set.pageWorkersSub': 'Used inside a single large playlist.',
      'auth.required': 'Connect Spotify to load your real playlists.',
      'auth.connect': 'Connect Spotify',
      'toast.done': 'Scanning complete.',
      'toast.removed': 'Removed {count} from {playlist}.',
      'toast.loadErr': 'Could not load playlists. Try again.',
      'toast.scanErr': 'Could not scan {playlist}.',
      'toast.apiErr': 'Spotify request failed. Try again in a few seconds.',
      'toast.out': 'Signed out.',
    },
    ru: {
      'tag.intelligence': 'музыкальный интеллект',
      'nav.workspace': 'Рабочая область',
      'nav.system': 'Система',
      'nav.library': 'Библиотека',
      'nav.duplicates': 'Дубли',
      'nav.compare': 'Сравнение',
      'nav.overlap': 'Пересечения',
      'nav.graph': 'Граф',
      'nav.history': 'История',
      'nav.settings': 'Настройки',
      'top.workspace': 'WashList',
      'top.search': 'Поиск',
      'top.logout': 'Выйти',
      'state.loading': 'Загрузка',
      'state.empty': 'Пока нет данных',
      'state.error': 'Что-то пошло не так',
      'lib.eyebrow': 'Сканер библиотеки',
      'lib.titleA': 'Очисти',
      'lib.titleB': 'свои плейлисты',
      'lib.sub': 'Сканируй Spotify-плейлисты, сохраняй нужные треки и проверяй дубли с понятными причинами.',
      'lib.scanAll': 'Сканировать все',
      'lib.reload': 'Обновить',
      'lib.search': 'Поиск плейлистов',
      'lib.playlists': 'Плейлисты',
      'lib.scan': 'Сканировать',
      'lib.rescan': 'Пересканировать',
      'lib.review': 'Проверить',
      'lib.open': 'Открыть',
      'scan.ready': 'Готово',
      'scan.live': 'Сканирую',
      'scan.done': 'Сканирование завершено',
      'scan.pipeline': 'Fingerprint pipeline',
      'scan.title': 'Безопасное сканирование метаданных.',
      'scan.rules': 'Правила совпадений',
      'rule.id': 'Точный ID / URI / ISRC = дубль',
      'rule.idSub': 'Можно удалять массово',
      'rule.meta': 'Название + исполнители + длительность = проверка',
      'rule.metaSub': 'Показываем уверенность, не удаляем автоматически',
      'rule.version': 'Live/remix/acoustic остаются видимыми',
      'rule.versionSub': 'Связанная версия, не скрываем',
      'rule.artist': 'Один исполнитель ничего не значит',
      'rule.artistSub': 'Разные песни остаются раздельно',
      'stats.playlists': 'Плейлисты',
      'stats.tracks': 'Треки',
      'stats.unique': 'Уникальные',
      'stats.duplicates': 'Дубли',
      'stats.review': 'Проверка',
      'stats.artists': 'Исполнители',
      'stats.albums': 'Альбомы',
      'filter.all': 'Все',
      'filter.unique': 'Уникальные',
      'filter.dupes': 'Дубли',
      'filter.review': 'Проверка',
      'filter.artists': 'Исполнители',
      'filter.albums': 'Альбомы',
      'filter.errors': 'Ошибки',
      'status.idle': 'Не сканировалось',
      'status.scan': 'Сканирую',
      'status.clean': 'Чисто',
      'status.dirty': '{count} дуб.',
      'status.review': 'Проверка',
      'status.error': 'Ошибка',
      'dup.eyebrow': 'Проверка дублей',
      'dup.titleA': 'Настоящие дубли',
      'dup.titleB': 'с причинами',
      'dup.sub': 'Точные совпадения можно удалить. Возможные совпадения и версии остаются на проверке.',
      'dup.applyExact': 'Применить точные',
      'dup.export': 'Экспорт',
      'dup.exact': 'Точные',
      'dup.probable': 'Вероятные',
      'dup.version': 'Версии',
      'dup.keep': 'Оставить',
      'dup.remove': 'Удалить',
      'dup.removeOne': 'Удалить этот трек',
      'dup.removeGroup': 'Удалить дубль в группе',
      'dup.keepBoth': 'Оставить оба',
      'dup.reason.uri': 'Одинаковый Spotify URI',
      'dup.reason.isrc': 'Одинаковый ISRC',
      'dup.reason.metadata': 'Совпали название, исполнители и близкая длительность',
      'dup.reason.version': 'Похоже на связанную версию',
      'dup.reason.weak': 'Похожие метаданные, нужна проверка',
      'dup.conf': 'уверенность {count}%',
      'dup.duration': 'Длительность {value}',
      'dup.source': 'Источник {value}',
      'dup.added': 'Добавлено',
      'dup.noAction': 'Нет точных дублей для удаления',
      'dup.rming': 'Удаляю...',
      'dup.dry': 'Включен dry run. Ничего не удалено.',
      'cmp.eyebrow': 'Сравнение плейлистов',
      'cmp.titleA': 'Сравнить',
      'cmp.titleB': 'два плейлиста',
      'cmp.sub': 'Показывает общие треки и то, что есть только с одной стороны.',
      'cmp.run': 'Сравнить',
      'cmp.shared': 'Общие треки',
      'cmp.only': '{count} только здесь',
      'cmp.both': '{count} общих',
      'ov.eyebrow': 'Карта пересечений',
      'ov.titleA': 'Треки',
      'ov.titleB': 'в нескольких плейлистах',
      'ov.sub': 'Найди треки, которые встречаются в трех и более плейлистах.',
      'ov.min': 'Минимум плейлистов',
      'ov.run': 'Построить',
      'ov.none': 'Сначала просканируй плейлисты, потом здесь появятся пересечения.',
      'gph.eyebrow': 'Граф библиотеки',
      'gph.titleA': 'Связи',
      'gph.titleB': 'плейлистов',
      'gph.sub': 'Визуализируй пересечения плейлистов внутри приложения.',
      'gph.build': 'Построить граф',
      'gph.nodata': 'Сначала просканируй хотя бы два плейлиста.',
      'hist.eyebrow': 'История',
      'hist.titleA': 'Журнал',
      'hist.titleB': 'очистки',
      'hist.sub': 'Локальная история удалений и экспортов.',
      'hist.export': 'Экспорт CSV',
      'hist.clear': 'Очистить',
      'hist.empty': 'Истории очистки пока нет.',
      'set.eyebrow': 'Настройки',
      'set.titleA': 'Управление',
      'set.titleB': 'сканированием',
      'set.sub': 'Основные настройки видны сразу, сложные параметры убраны ниже.',
      'set.matching': 'Сравнение',
      'set.matchingSub': 'Balanced работает консервативно и оставляет совпадения по метаданным на проверке.',
      'set.mode': 'Режим сканирования',
      'set.modeSub': 'Strict использует только точные ID. Balanced добавляет безопасную проверку. Fuzzy нужен для ручного анализа.',
      'set.remasters': 'Считать ремастеры дублями',
      'set.remastersSub': 'По умолчанию выключено, чтобы не потерять версии.',
      'set.live': 'Показывать live/acoustic на проверке',
      'set.liveSub': 'Версии остаются видимыми и не удаляются автоматически.',
      'set.dry': 'Dry run',
      'set.drySub': 'Показывает удаления, но не трогает Spotify.',
      'set.performance': 'Производительность',
      'set.performanceSub': 'Страницы плейлистов грузятся параллельно с учетом API backoff.',
      'set.playlistWorkers': 'Параллельные сканы',
      'set.playlistWorkersSub': 'Больше быстрее, но можно упереться в rate limit.',
      'set.pageWorkers': 'Параллельные страницы',
      'set.pageWorkersSub': 'Используется внутри большого плейлиста.',
      'auth.required': 'Подключи Spotify, чтобы загрузить реальные плейлисты.',
      'auth.connect': 'Подключить Spotify',
      'toast.done': 'Сканирование завершено.',
      'toast.removed': 'Удалено {count} из {playlist}.',
      'toast.loadErr': 'Не удалось загрузить плейлисты. Попробуй еще раз.',
      'toast.scanErr': 'Не удалось просканировать {playlist}.',
      'toast.apiErr': 'Spotify не ответил. Попробуй через несколько секунд.',
      'toast.out': 'Вы вышли.',
    },
  };

  const state = {
    lang: resolveLang(),
    playlists: [],
    playlistData: {},
    filter: 'all',
    dupFilter: 'all',
    accessToken: null,
    scanMode: 'balanced',
    scanning: false,
    currentTab: 'tLib',
  };

  function t(key, vars = {}) {
    const dict = I18N[state.lang] || I18N.en;
    const raw = dict[key] || I18N.en[key] || key;
    return String(raw).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
  }

  function resolveLang() {
    const stored = safeStorage(() => localStorage.getItem(LANG_KEY));
    if (stored && LANGS.some((l) => l.code === stored)) return stored;
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.some((l) => l.code === browser) ? browser : 'en';
  }

  function locale() {
    return (LANGS.find((l) => l.code === state.lang) || LANGS[0]).locale;
  }

  function fmtNum(value, decimals = 0) {
    return new Intl.NumberFormat(locale(), { maximumFractionDigits: decimals }).format(value || 0);
  }

  function fmtDate(value) {
    if (!value) return '-';
    return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
  }

  function fmtMs(ms) {
    if (!ms) return '-';
    const total = Math.round(ms / 1000);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function attr(value) {
    return esc(value).replace(/'/g, '&#39;');
  }

  function safeStorage(fn, fallback = null) {
    try {
      return fn();
    } catch {
      return fallback;
    }
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    updateLangTrigger();
    updateCrumb();
    renderAll();
  }

  function initTheme() {
    const theme = safeStorage(() => localStorage.getItem(THEME_KEY), 'dark') || 'dark';
    document.documentElement.dataset.theme = theme;
    document.getElementById('themeBtn')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
    });
  }

  function updateLangTrigger() {
    const lang = LANGS.find((l) => l.code === state.lang) || LANGS[0];
    const trigger = document.querySelector('#langDd .lang-dd-trigger');
    if (!trigger) return;
    trigger.querySelector('.flag').textContent = lang.flag;
    trigger.querySelector('.code').textContent = lang.short;
  }

  function initLangDropdown() {
    const dd = document.getElementById('langDd');
    const trigger = dd?.querySelector('.lang-dd-trigger');
    if (!dd || !trigger) return;

    const close = () => {
      dd.querySelector('.lang-dd-menu')?.remove();
      trigger.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    const open = () => {
      if (dd.querySelector('.lang-dd-menu')) return;
      const menu = document.createElement('div');
      menu.className = 'lang-dd-menu';
      menu.setAttribute('role', 'listbox');
      menu.innerHTML = LANGS.map((lang) => `
        <button class="lang-dd-item${lang.code === state.lang ? ' active' : ''}" type="button" role="option" aria-selected="${lang.code === state.lang}" data-lang="${lang.code}">
          <span class="flag">${lang.flag}</span>
          <span class="name">${lang.name}</span>
          <span class="code">${lang.short}</span>
        </button>
      `).join('');
      dd.appendChild(menu);
      trigger.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      menu.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.lang = btn.dataset.lang;
          localStorage.setItem(LANG_KEY, state.lang);
          close();
          applyI18n();
        });
      });
      menu.querySelector('[data-lang]')?.focus();
    };

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      trigger.classList.contains('open') ? close() : open();
    });

    dd.addEventListener('keydown', (event) => {
      const items = [...dd.querySelectorAll('.lang-dd-item')];
      const index = items.indexOf(document.activeElement);
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        (items[index + 1] || items[0])?.focus();
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        (items[index - 1] || items[items.length - 1])?.focus();
      }
      if ((event.key === 'Enter' || event.key === ' ') && document.activeElement?.dataset.lang) {
        event.preventDefault();
        document.activeElement.click();
      }
    });

    document.addEventListener('click', (event) => {
      if (!dd.contains(event.target)) close();
    });
  }

  function chkToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = parseInt(localStorage.getItem(EXPIRES_KEY) || '0', 10);
    if (token && expires > Date.now() + 60000) {
      state.accessToken = token;
      return true;
    }
    return false;
  }

  async function spotify(url, options = {}, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          },
        });
        clearTimeout(timeout);
        if (response.status === 429) {
          const wait = (parseInt(response.headers.get('Retry-After'), 10) || (attempt + 1)) * 1000;
          await sleep(wait);
          continue;
        }
        if (response.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(EXPIRES_KEY);
          throw new Error('401');
        }
        if (!response.ok) throw new Error(String(response.status));
        if (response.status === 204) return null;
        return response.json();
      } catch (error) {
        clearTimeout(timeout);
        if (attempt === retries - 1) throw error;
        await sleep(350 * (attempt + 1));
      }
    }
    throw new Error('retries');
  }

  async function pages(url) {
    let result = [];
    let next = url;
    while (next) {
      const data = await spotify(next);
      result = result.concat(data.items || []);
      next = data.next;
      await sleep(50);
    }
    return result;
  }

  async function initApp() {
    document.getElementById('authMode').textContent = 'live';
    setLoading(true);
    try {
      const me = await spotify('https://api.spotify.com/v1/me');
      const avatar = document.getElementById('uAv');
      if (me.images?.[0]?.url) {
        avatar.innerHTML = `<img src="${attr(me.images[0].url)}" alt="">`;
      } else {
        avatar.textContent = (me.display_name || 'W')[0].toUpperCase();
      }
      document.getElementById('uName').textContent = me.display_name || 'Spotify user';
      document.getElementById('uPlan').textContent = me.product || 'spotify';
      await loadPlaylists();
    } catch (error) {
      console.warn('init failed', error);
      toast(t('toast.loadErr'), 'err');
      showSignedOut();
    } finally {
      setLoading(false);
    }
  }

  async function loadPlaylists() {
    setLoading(true);
    const items = await pages('https://api.spotify.com/v1/me/playlists?limit=50');
    state.playlists = [
      { id: 'liked', name: 'Liked Songs', images: [], tracks: { total: 0 }, isLiked: true },
      ...items.filter((playlist) => playlist && playlist.id).map((playlist) => ({
        ...playlist,
        tracks: playlist.tracks || { total: 0 },
      })),
    ];
    try {
      const liked = await spotify('https://api.spotify.com/v1/me/tracks?limit=1');
      state.playlists[0].tracks = { total: liked.total || 0 };
    } catch {
      state.playlists[0].tracks = { total: 0 };
    }
    setLoading(false);
    renderAll();
    populateCompare();
  }

  function showSignedOut() {
    state.accessToken = null;
    state.playlists = [];
    state.playlistData = {};
    setText('authMode', 'offline');
    setText('uAv', 'W');
    setText('uName', 'WashList');
    setText('uPlan', 'spotify');
    setScanHeader(t('scan.ready'), 0);
    setLoading(false);
    renderAll();
  }

  function setLoading(value) {
    const el = document.getElementById('plLoading');
    if (!el) return;
    el.textContent = value ? t('state.loading') : `${fmtNum(state.playlists.length)} ${t('stats.playlists').toLowerCase()}`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function switchTab(id) {
    state.currentTab = id;
    document.querySelectorAll('.tb').forEach((panel) => panel.classList.toggle('on', panel.id === id));
    document.querySelectorAll('.atab').forEach((button) => {
      const active = button.dataset.tabTarget === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    updateCrumb();
    if (id === 'tDup') renderAllDuplicates();
    if (id === 'tHist') renderHistory();
    if (id === 'tOv') renderOverlap();
    if (id === 'tGph') renderGraph();
  }

  function updateCrumb() {
    const map = {
      tLib: 'nav.library',
      tDup: 'nav.duplicates',
      tCmp: 'nav.compare',
      tOv: 'nav.overlap',
      tGph: 'nav.graph',
      tHist: 'nav.history',
      tSettings: 'nav.settings',
    };
    const el = document.getElementById('crumbCurrent');
    if (el) el.textContent = t(map[state.currentTab] || 'nav.library');
  }

  function renderAll() {
    renderStats();
    renderPlaylists();
    renderScanSummary();
    renderAllDuplicates();
    populateCompare();
  }

  function renderStats() {
    const done = Object.values(state.playlistData).filter((data) => data.status === 'done');
    const totals = done.reduce((acc, data) => {
      acc.tracks += data.tc || 0;
      acc.unique += data.uc || 0;
      acc.dupes += data.dc || 0;
      acc.review += data.rc || 0;
      return acc;
    }, { tracks: 0, unique: 0, dupes: 0, review: 0 });

    setText('sPl', fmtNum(state.playlists.length));
    setText('sSc', fmtNum(totals.tracks));
    setText('sDu', fmtNum(totals.dupes));
    setText('mPlaylists', fmtNum(state.playlists.length));
    setText('mDupes', fmtNum(totals.dupes));
    setText('mReview', fmtNum(totals.review));
    setText('kPlaylists', fmtNum(state.playlists.length));
    setText('kTracks', fmtNum(totals.tracks));
    setText('kUnique', fmtNum(totals.unique));
    setText('kReview', fmtNum(totals.review));
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function renderScanSummary() {
    const el = document.getElementById('scanSummary');
    if (!el) return;
    const done = Object.values(state.playlistData).filter((data) => data.status === 'done');
    const totals = done.reduce((acc, data) => {
      acc.tracks += data.tc || 0;
      acc.unique += data.uc || 0;
      acc.dupes += data.dc || 0;
      acc.review += data.rc || 0;
      (data.artists || []).forEach((artist) => acc.artists.add(artist));
      (data.albums || []).forEach((album) => acc.albums.add(album));
      return acc;
    }, { tracks: 0, unique: 0, dupes: 0, review: 0, artists: new Set(), albums: new Set() });

    const cards = [
      ['stats.tracks', totals.tracks, ''],
      ['stats.unique', totals.unique, 'good'],
      ['stats.duplicates', totals.dupes, 'bad'],
      ['stats.review', totals.review, 'warn'],
      ['stats.artists', totals.artists.size, ''],
    ];
    el.innerHTML = cards.map(([key, value, klass]) => `
      <div class="metric-card">
        <div class="metric-v ${klass}">${fmtNum(value)}</div>
        <div class="metric-l">${t(key)}</div>
      </div>
    `).join('');
  }

  function renderPlaylists() {
    const root = document.getElementById('plList');
    if (!root) return;
    if (!state.accessToken && !state.playlists.length) {
      root.innerHTML = `
        <div class="empty">
          <h3>${t('state.empty')}</h3>
          <p>${t('auth.required')}</p>
          <p style="margin-top:16px"><a class="btn-app primary" href="index.html">${t('auth.connect')}</a></p>
        </div>
      `;
      return;
    }
    const search = (document.getElementById('srch')?.value || '').toLowerCase();
    let list = state.playlists.filter((playlist) => !search || playlist.name.toLowerCase().includes(search));
    const data = state.playlistData;

    if (state.filter === 'unique') list = list.filter((playlist) => data[playlist.id]?.status === 'done' && !(data[playlist.id]?.dc) && !(data[playlist.id]?.rc));
    if (state.filter === 'dupes') list = list.filter((playlist) => (data[playlist.id]?.dc || 0) > 0).sort((a, b) => (data[b.id]?.dc || 0) - (data[a.id]?.dc || 0));
    if (state.filter === 'review') list = list.filter((playlist) => (data[playlist.id]?.rc || 0) > 0);
    if (state.filter === 'artists') list = [...list].sort((a, b) => (data[b.id]?.ac || 0) - (data[a.id]?.ac || 0));
    if (state.filter === 'albums') list = [...list].sort((a, b) => (data[b.id]?.alc || 0) - (data[a.id]?.alc || 0));
    if (state.filter === 'errors') list = list.filter((playlist) => data[playlist.id]?.status === 'error');

    if (!list.length) {
      root.innerHTML = `<div class="empty"><h3>${t('state.empty')}</h3><p>${t('ov.none')}</p></div>`;
      return;
    }

    root.innerHTML = list.map((playlist, index) => {
      const d = data[playlist.id] || {};
      const cover = playlist.images?.[0]?.url;
      const art = cover ? `<div class="playlist-art"><img src="${attr(cover)}" alt=""></div>` : `<div class="playlist-art">${playlist.isLiked ? '♥' : '♪'}</div>`;
      const status = playlistStatus(d);
      const progress = d.status === 'scanning' ? `<div class="progress-line"><span id="pg-${attr(playlist.id)}" style="width:${d.prog || 0}%"></span></div>` : '';
      const action = d.status === 'scanning'
        ? `<button class="btn-app" type="button" disabled>${t('status.scan')}</button>`
        : `<button class="btn-app primary" type="button" data-scan="${attr(playlist.id)}">${d.status === 'done' ? t('lib.rescan') : t('lib.scan')}</button>`;
      const review = d.status === 'done' && ((d.dc || 0) || (d.rc || 0))
        ? `<button class="btn-app" type="button" data-open-dupes="${attr(playlist.id)}">${t('lib.review')}</button>`
        : '';
      return `
        <article class="playlist-row ${status.row}" style="animation-delay:${Math.min(index, 12) * 24}ms">
          <div class="playlist-main">
            ${art}
            <div style="min-width:0">
              <div class="playlist-title">${esc(playlist.name)}</div>
              <div class="playlist-meta">${fmtNum(playlist.tracks?.total || d.tc || 0)} ${t('stats.tracks').toLowerCase()} · ${fmtNum(d.ac || 0)} ${t('stats.artists').toLowerCase()}${progress}</div>
            </div>
          </div>
          <div class="playlist-num">${fmtNum(playlist.tracks?.total || d.tc || 0)}</div>
          <div class="playlist-num">${d.dc != null ? fmtNum(d.dc) : '-'}</div>
          <span class="pill-status ${status.kind}">${status.text}</span>
          <div class="playlist-actions">${review}${action}</div>
        </article>
      `;
    }).join('');
  }

  function playlistStatus(data) {
    if (data.status === 'scanning') return { kind: 'scan', row: 'scanning', text: t('status.scan') };
    if (data.status === 'error') return { kind: 'bad', row: 'dirty', text: t('status.error') };
    if (data.status === 'done' && (data.dc || 0) > 0) return { kind: 'warn', row: 'dirty', text: t('status.dirty', { count: data.dc }) };
    if (data.status === 'done' && (data.rc || 0) > 0) return { kind: 'warn', row: 'dirty', text: t('status.review') };
    if (data.status === 'done') return { kind: 'clean', row: 'clean', text: t('status.clean') };
    return { kind: '', row: '', text: t('status.idle') };
  }

  async function scanAll() {
    if (!state.accessToken) {
      toast(t('auth.required'), 'inf');
      return;
    }
    if (state.scanning) return;
    const button = document.getElementById('scanAllBtn');
    button.disabled = true;
    state.scanning = true;
    setScanHeader(t('scan.live'), 0);
    const queue = state.playlists.filter((playlist) => state.playlistData[playlist.id]?.status !== 'done');
    let cursor = 0;
    const workerCount = Math.min(parseInt(document.getElementById('workerSel')?.value || '3', 10), queue.length || 1);
    const workers = Array.from({ length: workerCount }, async () => {
      while (cursor < queue.length) {
        const playlist = queue[cursor];
        cursor += 1;
        await scanPlaylist(playlist.id, { quiet: true });
        setScanHeader(t('scan.live'), queue.length ? Math.round(cursor / queue.length * 100) : 100);
      }
    });
    await Promise.all(workers);
    state.scanning = false;
    button.disabled = false;
    setScanHeader(t('scan.done'), 100);
    toast(t('toast.done'), 'ok');
  }

  async function scanPlaylist(id, options = {}) {
    const playlist = state.playlists.find((item) => item.id === id);
    if (!playlist) return;
    state.playlistData[id] = { status: 'scanning', prog: 0, dc: 0, rc: 0 };
    renderPlaylists();
    setScanHeader(`${t('scan.live')}: ${playlist.name}`, 2);
    try {
      const url = playlist.isLiked
        ? 'https://api.spotify.com/v1/me/tracks?limit=50'
        : `https://api.spotify.com/v1/playlists/${id}/tracks?limit=100`;
      const tracks = await pagesParallel(url, id, playlist.tracks?.total || 0);
      const result = findDupes(tracks);
      state.playlistData[id] = { status: 'done', tracks, tc: tracks.length, ...result };
      setScanHeader(t('scan.done'), 100);
    } catch (error) {
      console.warn('scan failed', error);
      state.playlistData[id] = { status: 'error', err: error.message };
      if (!options.quiet) toast(t('toast.scanErr', { playlist: playlist.name }), 'err');
    }
    renderAll();
  }

  async function pagesParallel(url, id, total) {
    const first = await spotify(url);
    const firstItems = (first.items || []).filter((item) => item && item.track && item.track.id);
    const limit = first.limit || parseInt(new URL(url).searchParams.get('limit') || '50', 10);
    const apiTotal = first.total || total || firstItems.length;
    const chunks = [{ offset: first.offset || 0, items: firstItems }];
    let fetched = firstItems.length;
    setPlaylistProgress(id, apiTotal ? Math.min(98, Math.round(fetched / apiTotal * 100)) : 50);

    const offsets = [];
    for (let offset = limit; offset < apiTotal; offset += limit) offsets.push(offset);
    let cursor = 0;
    const pageWorkers = Math.min(parseInt(document.getElementById('pageWorkerSel')?.value || '6', 10), offsets.length || 1);
    const makeUrl = (offset) => {
      const next = new URL(url);
      next.searchParams.set('offset', String(offset));
      next.searchParams.set('limit', String(limit));
      return next.toString();
    };

    const workers = Array.from({ length: pageWorkers }, async () => {
      while (cursor < offsets.length) {
        const offset = offsets[cursor];
        cursor += 1;
        const data = await spotify(makeUrl(offset));
        const items = (data.items || []).filter((item) => item && item.track && item.track.id);
        chunks.push({ offset, items });
        fetched += items.length;
        const progress = apiTotal ? Math.min(99, Math.round(fetched / apiTotal * 100)) : 90;
        setPlaylistProgress(id, progress);
        setScanHeader(t('scan.live'), progress);
      }
    });
    await Promise.all(workers);
    setPlaylistProgress(id, 100);
    return chunks.sort((a, b) => a.offset - b.offset).flatMap((chunk) => chunk.items);
  }

  function setPlaylistProgress(id, progress) {
    if (state.playlistData[id]) state.playlistData[id].prog = progress;
    const bar = document.getElementById(`pg-${id}`);
    if (bar) bar.style.width = `${progress}%`;
  }

  function setScanHeader(text, progress) {
    setText('scanState', text);
    const pct = Math.max(0, Math.min(100, progress || 0));
    const fill = document.getElementById('scanProgress');
    const label = document.getElementById('scanProgressText');
    const beam = document.getElementById('scanBeam');
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${Math.round(pct)}%`;
    if (beam) beam.style.left = `${pct}%`;
  }

  function norm(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function versionTags(value) {
    const text = String(value || '').toLowerCase();
    const tags = [];
    if (/remaster|remastered|\d{4}\s*remaster/.test(text)) tags.push('remaster');
    if (/\blive\b|live at|live from|session/.test(text)) tags.push('live');
    if (/acoustic|unplugged/.test(text)) tags.push('acoustic');
    if (/remix|mix\b|club edit/.test(text)) tags.push('remix');
    if (/sped\s*up|speed\s*up|nightcore/.test(text)) tags.push('sped');
    if (/slowed|reverb|slowed\s*\+\s*reverb/.test(text)) tags.push('slowed');
    if (/instrumental|karaoke/.test(text)) tags.push('instrumental');
    return [...new Set(tags)];
  }

  function stripVersionTitle(value) {
    return norm(String(value || '')
      .replace(/\s*[\(\[](remaster(ed)?|remastered \d{4}|\d{4} remaster|live[^\)\]]*|acoustic|unplugged|remix|mix|sped\s*up|slowed|reverb|instrumental|radio edit|single version|album version|explicit|clean|edit)[^\)\]]*[\)\]]/gi, '')
      .replace(/\s*-\s*(remaster(ed)?(\s+\d{4})?|live.*|acoustic|unplugged|remix|mix|sped\s*up|slowed|reverb|instrumental|radio edit|single version|album version|explicit|clean|edit)$/gi, ''));
  }

  function sameSet(a, b) {
    return a.length === b.length && a.every((item) => b.includes(item));
  }

  function overlapScore(a, b) {
    const left = new Set(a);
    const right = new Set(b);
    if (!left.size || !right.size) return 0;
    let hits = 0;
    left.forEach((item) => {
      if (right.has(item)) hits += 1;
    });
    return hits / Math.max(left.size, right.size);
  }

  function similarity(a, b) {
    const left = norm(a).split(' ').filter((word) => word.length > 1);
    const right = norm(b).split(' ').filter((word) => word.length > 1);
    if (!left.length || !right.length) return 0;
    const A = new Set(left);
    const B = new Set(right);
    let hits = 0;
    A.forEach((word) => {
      if (B.has(word)) hits += 1;
    });
    return hits / new Set([...A, ...B]).size;
  }

  function trackEntity(item, index) {
    const track = item.track || {};
    const artists = (track.artists || [])
      .map((artist) => ({ id: artist.id || '', name: artist.name || '', key: norm(artist.name || artist.id) }))
      .filter((artist) => artist.key);
    const album = track.album || {};
    const tags = versionTags(`${track.name || ''} ${album.name || ''}`);
    return {
      pos: index,
      item,
      track,
      id: track.id || '',
      uri: track.uri || '',
      url: track.external_urls?.spotify || '',
      isrc: (track.external_ids?.isrc || '').toUpperCase(),
      name: track.name || '',
      baseName: stripVersionTitle(track.name || ''),
      nameKey: norm(track.name || ''),
      artists,
      artistKey: artists.map((artist) => artist.key).sort().join('|'),
      album: album.name || '',
      albumKey: norm(album.name || ''),
      albumId: album.id || '',
      duration: track.duration_ms || 0,
      added: item.added_at,
      source: 'Spotify',
      tags,
      art: album.images?.[1]?.url || album.images?.[0]?.url || '',
    };
  }

  function fmtInst(entity) {
    return {
      pos: entity.pos,
      at: entity.added,
      album: entity.album,
      name: entity.name,
      artist: entity.artists.map((artist) => artist.name).join(', '),
      uri: entity.uri,
      tid: entity.id,
      duration: entity.duration,
      isrc: entity.isrc,
      art: entity.art,
    };
  }

  function makeGroup(type, reasonKey, entries, confidence, actionable = true) {
    const first = entries[0];
    return {
      id: `${type}-${first.pos}-${entries.length}-${first.id || first.uri}`,
      type,
      reasonKey,
      confidence,
      actionable,
      name: first.name,
      artist: first.artists.map((artist) => artist.name).join(', '),
      art: first.art,
      duration: first.duration,
      source: first.source,
      insts: entries.map(fmtInst),
    };
  }

  function optionOn(id) {
    return document.getElementById(id)?.classList.contains('on');
  }

  function versionCompatible(entries) {
    const remasters = optionOn('optR');
    const hardVersions = ['live', 'acoustic', 'remix', 'sped', 'slowed', 'instrumental'];
    const tagSets = entries.map((entry) => entry.tags.filter((tag) => tag !== 'remaster').sort());
    if (tagSets.some((tags) => tags.some((tag) => hardVersions.includes(tag)))) return false;
    if (!remasters && entries.some((entry) => entry.tags.includes('remaster'))) return false;
    return tagSets.every((tags) => sameSet(tags, tagSets[0]));
  }

  function closeDuration(entries, tolerance = 3500) {
    const durations = entries.map((entry) => entry.duration).filter(Boolean);
    if (durations.length < entries.length) return false;
    return Math.max(...durations) - Math.min(...durations) <= tolerance;
  }

  function countArtists(entries) {
    const artists = new Set();
    entries.forEach((entry) => entry.artists.forEach((artist) => artists.add(artist.name || artist.key)));
    return [...artists];
  }

  function findDupes(items) {
    const entries = items.map(trackEntity).filter((entry) => entry.id || entry.uri);
    const groups = [];
    const used = new Set();
    let duplicateCount = 0;
    let reviewCount = 0;

    const addExact = (keyFn, reasonKey) => {
      const map = new Map();
      entries.forEach((entry) => {
        const key = keyFn(entry);
        if (!key) return;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(entry);
      });
      map.forEach((group) => {
        const fresh = group.filter((entry) => !used.has(entry.pos));
        if (fresh.length < 2) return;
        fresh.forEach((entry) => used.add(entry.pos));
        duplicateCount += fresh.length - 1;
        groups.push(makeGroup('exact', reasonKey, fresh, 100, true));
      });
    };

    addExact((entry) => entry.uri || entry.url, 'dup.reason.uri');
    addExact((entry) => entry.isrc, 'dup.reason.isrc');

    if (state.scanMode !== 'strict') {
      const bySong = new Map();
      entries.filter((entry) => !used.has(entry.pos)).forEach((entry) => {
        if (!entry.baseName || !entry.artistKey) return;
        const key = `${entry.baseName}||${entry.artistKey}`;
        if (!bySong.has(key)) bySong.set(key, []);
        bySong.get(key).push(entry);
      });

      bySong.forEach((group) => {
        if (group.length < 2) return;
        let distinct = [...new Map(group.map((entry) => [entry.uri || entry.id, entry])).values()];
        if (!optionOn('optL')) {
          distinct = distinct.filter((entry) => !entry.tags.some((tag) => tag === 'live' || tag === 'acoustic'));
        }
        if (distinct.length < 2) return;
        const sameArtists = distinct.every((entry) => overlapScore(entry.artists.map((artist) => artist.key), distinct[0].artists.map((artist) => artist.key)) >= 0.9);
        const exactTitle = distinct.every((entry) => entry.baseName === distinct[0].baseName);
        const similarNames = distinct.every((entry) => similarity(entry.baseName, distinct[0].baseName) >= (state.scanMode === 'fuzzy' ? 0.72 : 0.88));
        if (!sameArtists || !exactTitle || !similarNames) return;

        const compatible = versionCompatible(distinct);
        distinct.forEach((entry) => used.add(entry.pos));
        reviewCount += distinct.length;
        if (compatible && closeDuration(distinct, state.scanMode === 'fuzzy' ? 6000 : 3500)) {
          groups.push(makeGroup('probable', 'dup.reason.metadata', distinct, state.scanMode === 'fuzzy' ? 82 : 88, false));
        } else {
          groups.push(makeGroup(compatible ? 'review' : 'version', compatible ? 'dup.reason.weak' : 'dup.reason.version', distinct, compatible ? 68 : 74, false));
        }
      });

      if (state.scanMode === 'fuzzy') {
        const remaining = entries.filter((entry) => !used.has(entry.pos));
        for (let i = 0; i < remaining.length; i += 1) {
          if (used.has(remaining[i].pos)) continue;
          const group = [remaining[i]];
          for (let j = i + 1; j < remaining.length; j += 1) {
            if (used.has(remaining[j].pos)) continue;
            const sameArtist = overlapScore(remaining[i].artists.map((artist) => artist.key), remaining[j].artists.map((artist) => artist.key)) >= 0.9;
            const titleClose = similarity(remaining[i].baseName, remaining[j].baseName) >= 0.82;
            if (sameArtist && titleClose && closeDuration([remaining[i], remaining[j]], 6000)) group.push(remaining[j]);
          }
          if (group.length > 1) {
            group.forEach((entry) => used.add(entry.pos));
            reviewCount += group.length;
            groups.push(makeGroup('review', 'dup.reason.weak', group, 64, false));
          }
        }
      }
    }

    const artists = countArtists(entries);
    const albums = [...new Set(entries.map((entry) => entry.album).filter(Boolean))];
    const groupedPositions = new Set(groups.flatMap((group) => group.insts.map((inst) => inst.pos)));
    const uniqueCount = entries.filter((entry) => !groupedPositions.has(entry.pos)).length + groups.length;
    groups.sort((a, b) => (b.actionable ? 1 : 0) - (a.actionable ? 1 : 0) || b.confidence - a.confidence || b.insts.length - a.insts.length);
    return {
      dg: groups,
      dc: duplicateCount,
      rc: reviewCount,
      uc: uniqueCount,
      ac: artists.length,
      alc: albums.length,
      artists,
      albums,
    };
  }

  function renderAllDuplicates() {
    const root = document.getElementById('dupList');
    if (!root) return;
    const groups = collectDuplicateGroups().filter((entry) => state.dupFilter === 'all' || entry.group.type === state.dupFilter);
    if (!groups.length) {
      root.innerHTML = `<div class="empty"><h3>${t('state.empty')}</h3><p>${t('dup.sub')}</p></div>`;
      return;
    }
    root.innerHTML = groups.map(({ playlist, group }, index) => renderGroup(playlist, group, index)).join('');
  }

  function collectDuplicateGroups() {
    return state.playlists.flatMap((playlist) => {
      const data = state.playlistData[playlist.id];
      if (!data?.dg?.length) return [];
      return data.dg.map((group) => ({ playlist, group }));
    });
  }

  function renderGroup(playlist, group, index) {
    const tagClass = group.type === 'exact' ? 'mint' : group.type === 'probable' ? 'amber' : group.type === 'version' ? 'violet' : 'coral';
    const label = group.type === 'exact' ? t('dup.exact') : group.type === 'probable' ? t('dup.probable') : group.type === 'version' ? t('dup.version') : t('filter.review');
    const insts = group.insts.map((inst, instIndex) => renderInstance(playlist, group, inst, instIndex)).join('');
    const actions = group.actionable
      ? `<button class="btn-app primary" type="button" data-remove-cluster="${attr(playlist.id)}" data-group="${attr(group.id)}">${t('dup.removeGroup')}</button>`
      : `<button class="btn-app" type="button" data-keep-group="${attr(group.id)}">${t('dup.keepBoth')}</button>`;
    return `
      <article class="cluster live" style="animation-delay:${Math.min(index, 10) * 28}ms">
        <div class="cluster-h">
          <span class="tag ${tagClass}"><span class="b"></span>${label}</span>
          <span class="reason">${esc(playlist.name)} · ${esc(t(group.reasonKey))}</span>
          <div class="conf"><small>conf</small><span>${group.confidence.toFixed(1)}%</span><div class="bar"><div class="fill" style="width:${group.confidence}%"></div></div></div>
        </div>
        <div>${insts}</div>
        <div class="cluster-actions">
          ${actions}
          <button class="btn-app ghost" type="button" data-scan="${attr(playlist.id)}">${t('lib.rescan')}</button>
          <span class="cluster-action-note">${group.actionable ? t('dup.reason.uri') + ' / ISRC' : t('dup.reason.weak')}</span>
        </div>
      </article>
    `;
  }

  function renderInstance(playlist, group, inst, index) {
    const keep = index === 0;
    const cover = inst.art ? `<div class="cluster-cover"><img src="${attr(inst.art)}" alt=""></div>` : '<div class="cluster-cover">♪</div>';
    const removeButton = !keep && group.actionable
      ? `<button class="btn-app danger" type="button" data-remove-one="${attr(playlist.id)}" data-pos="${inst.pos}">${t('dup.removeOne')}</button>`
      : `<span class="keep-badge">${keep ? t('dup.keep') : t('filter.review')}</span>`;
    return `
      <div class="cluster-track live ${keep ? '' : 'b'}">
        ${cover}
        <div class="info">
          <div class="t">${esc(inst.name || group.name)}</div>
          <div class="a">${esc(inst.artist || group.artist)}</div>
          <div class="meta">
            <span>${esc(inst.album || '')}</span>
            <span>${fmtMs(inst.duration)}</span>
            ${inst.isrc ? `<span>ISRC ${esc(inst.isrc)}</span>` : ''}
            <span>${t('dup.added')} ${fmtDate(inst.at)}</span>
          </div>
          <div class="reason-list">
            <span class="reason-chip">${t('dup.conf', { count: group.confidence.toFixed(0) })}</span>
            <span class="reason-chip">${t('dup.duration', { value: fmtMs(inst.duration) })}</span>
            <span class="reason-chip">${t('dup.source', { value: group.source })}</span>
          </div>
        </div>
        <div class="track-actions">${removeButton}</div>
      </div>
    `;
  }

  async function removeCluster(playlistId, groupId) {
    const playlist = state.playlists.find((item) => item.id === playlistId);
    const data = state.playlistData[playlistId];
    const group = data?.dg?.find((item) => item.id === groupId);
    if (!playlist || !data || !group?.actionable) return;
    const toRemove = group.insts.slice(1);
    await removeInstances(playlist, toRemove);
  }

  async function removeExactAll() {
    const groups = collectDuplicateGroups().filter(({ group }) => group.actionable);
    if (!groups.length) {
      toast(t('dup.noAction'), 'inf');
      return;
    }
    if (!confirm(`Remove exact duplicates from ${groups.length} groups?`)) return;
    for (const { playlist, group } of groups) {
      await removeInstances(playlist, group.insts.slice(1), { quiet: true });
    }
    toast(t('toast.done'), 'ok');
  }

  async function removeOne(playlistId, pos) {
    const button = document.querySelector(`[data-remove-one="${CSS.escape(playlistId)}"][data-pos="${pos}"]`);
    if (button) {
      button.disabled = true;
      button.textContent = t('dup.rming');
    }
    const playlist = state.playlists.find((item) => item.id === playlistId);
    const data = state.playlistData[playlistId];
    const item = data?.tracks?.[pos];
    const track = item?.track;
    if (!playlist || !track) return;
    await removeInstances(playlist, [{ pos, uri: track.uri, tid: track.id }]);
  }

  async function removeInstances(playlist, instances, options = {}) {
    if (!instances.length) {
      toast(t('dup.noAction'), 'inf');
      return;
    }
    if (optionOn('optDry')) {
      toast(t('dup.dry'), 'inf');
      return;
    }
    try {
      if (!state.accessToken) {
        toast(t('auth.required'), 'inf');
        return;
      }
      if (playlist.isLiked) {
        const ids = [...new Set(instances.map((inst) => inst.tid).filter(Boolean))];
        for (let i = 0; i < ids.length; i += 50) {
          await spotify('https://api.spotify.com/v1/me/tracks', {
            method: 'DELETE',
            body: JSON.stringify({ ids: ids.slice(i, i + 50) }),
          });
          await sleep(160);
        }
      } else {
        const snap = await spotify(`https://api.spotify.com/v1/playlists/${playlist.id}`);
        const tracks = instances.map((inst) => ({ uri: inst.uri, positions: [inst.pos] })).filter((item) => item.uri);
        for (let i = 0; i < tracks.length; i += 100) {
          await spotify(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'DELETE',
            body: JSON.stringify({ tracks: tracks.slice(i, i + 100), snapshot_id: snap.snapshot_id }),
          });
          await sleep(160);
        }
      }
      applyLocalRemoval(playlist.id, instances);
      addHistory({ date: new Date().toISOString(), playlist: playlist.name, removed: instances.length, kept: state.playlistData[playlist.id]?.tc || 0, mode: state.scanMode });
      if (!options.quiet) toast(t('toast.removed', { count: instances.length, playlist: playlist.name }), 'ok');
      if (!options.quiet) {
        window.setTimeout(() => {
          if (state.accessToken) scanPlaylist(playlist.id, { quiet: true });
        }, 1800);
      }
    } catch (error) {
      console.warn('remove failed', error);
      toast(t('toast.apiErr'), 'err');
    }
  }

  function applyLocalRemoval(playlistId, instances) {
    const data = state.playlistData[playlistId];
    if (!data?.tracks?.length) return;
    const positions = new Set(instances.map((inst) => Number(inst.pos)).filter(Number.isFinite));
    if (!positions.size) return;
    const tracks = data.tracks.filter((_, index) => !positions.has(index));
    state.playlistData[playlistId] = { ...data, tracks, tc: tracks.length, status: 'done', ...findDupes(tracks) };
    const playlist = state.playlists.find((item) => item.id === playlistId);
    if (playlist?.tracks) playlist.tracks.total = Math.max(0, tracks.length);
    renderAll();
  }

  function populateCompare() {
    ['cmpL', 'cmpR'].forEach((id) => {
      const select = document.getElementById(id);
      if (!select) return;
      const previous = select.value;
      select.innerHTML = state.playlists.map((playlist) => `<option value="${attr(playlist.id)}">${esc(playlist.name)}</option>`).join('');
      if (previous && state.playlists.some((playlist) => playlist.id === previous)) select.value = previous;
    });
  }

  function runCompare() {
    const leftId = document.getElementById('cmpL')?.value;
    const rightId = document.getElementById('cmpR')?.value;
    if (!leftId || !rightId || leftId === rightId) return;
    const left = state.playlistData[leftId];
    const right = state.playlistData[rightId];
    if (!left?.tracks?.length || !right?.tracks?.length) {
      toast(t('ov.none'), 'inf');
      return;
    }
    const leftMap = new Map();
    const rightMap = new Map();
    left.tracks.forEach((item) => item.track && leftMap.set(item.track.uri, item.track));
    right.tracks.forEach((item) => item.track && rightMap.set(item.track.uri, item.track));
    const shared = [...leftMap.keys()].filter((uri) => rightMap.has(uri));
    const sharedSet = new Set(shared);
    setText('cmpN', fmtNum(shared.length));
    setText('cmpLF', t('cmp.only', { count: fmtNum(leftMap.size - shared.length) }));
    setText('cmpRF', t('cmp.only', { count: fmtNum(rightMap.size - shared.length) }));
    renderTrackRows(leftMap, sharedSet, document.getElementById('cmpLL'));
    renderTrackRows(rightMap, sharedSet, document.getElementById('cmpRL'));
  }

  function renderTrackRows(map, sharedSet, root) {
    if (!root) return;
    root.innerHTML = [...map.entries()].slice(0, 120).map(([uri, track], index) => `
      <div class="track-row ${sharedSet.has(uri) ? 'match' : ''}">
        <span class="tk">${String(index + 1).padStart(2, '0')}</span>
        <span class="name"><b>${esc(track.name)}</b><small>${esc(track.artists?.map((artist) => artist.name).join(', ') || '')}</small></span>
        <span class="dur">${fmtMs(track.duration_ms)}</span>
      </div>
    `).join('');
  }

  function renderOverlap() {
    const root = document.getElementById('ovGrid');
    if (!root) return;
    const min = parseInt(document.getElementById('ovMin')?.value || '3', 10);
    const scanned = state.playlists.filter((playlist) => state.playlistData[playlist.id]?.tracks?.length);
    if (!scanned.length) {
      root.innerHTML = `<div class="empty"><h3>${t('state.empty')}</h3><p>${t('ov.none')}</p></div>`;
      return;
    }
    const trackMap = new Map();
    scanned.forEach((playlist) => {
      state.playlistData[playlist.id].tracks.forEach((item) => {
        if (!item.track?.uri) return;
        if (!trackMap.has(item.track.uri)) trackMap.set(item.track.uri, { track: item.track, playlists: [] });
        trackMap.get(item.track.uri).playlists.push(playlist.name);
      });
    });
    const rows = [...trackMap.values()].filter((row) => row.playlists.length >= min).sort((a, b) => b.playlists.length - a.playlists.length);
    if (!rows.length) {
      root.innerHTML = `<div class="empty"><h3>${t('state.empty')}</h3><p>${t('ov.none')}</p></div>`;
      return;
    }
    root.innerHTML = rows.slice(0, 80).map((row) => `
      <article class="overlap-card">
        <div class="overlap-title">${esc(row.track.name)}</div>
        <div class="tiny-meta">${esc(row.track.artists?.map((artist) => artist.name).join(', ') || '')} · ${fmtNum(row.playlists.length)} ${t('stats.playlists').toLowerCase()}</div>
        <div class="overlap-tags">${row.playlists.map((name) => `<span class="tag cyan">${esc(name)}</span>`).join('')}</div>
      </article>
    `).join('');
  }

  function renderGraph() {
    const svg = document.getElementById('graphCanvas');
    const status = document.getElementById('gphSt');
    if (!svg) return;
    svg.innerHTML = '';
    const scanned = state.playlists.filter((playlist) => state.playlistData[playlist.id]?.tracks?.length);
    if (scanned.length < 2) {
      if (status) status.textContent = t('gph.nodata');
      return;
    }
    const width = svg.clientWidth || 900;
    const height = svg.clientHeight || 520;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const nodes = scanned.slice(0, 24).map((playlist, index) => {
      const angle = (index / Math.max(1, scanned.length)) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.34;
      return {
        id: playlist.id,
        name: playlist.name,
        size: Math.max(14, Math.min(34, Math.sqrt(playlist.tracks?.total || 20) * 1.8)),
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
      };
    });
    const edges = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = new Set((state.playlistData[nodes[i].id].tracks || []).map((item) => item.track?.uri).filter(Boolean));
        const shared = (state.playlistData[nodes[j].id].tracks || []).filter((item) => item.track?.uri && a.has(item.track.uri)).length;
        if (shared) edges.push({ a: nodes[i], b: nodes[j], shared });
      }
    }
    const max = Math.max(...edges.map((edge) => edge.shared), 1);
    svg.innerHTML = `
      <g>
        ${edges.map((edge) => `<line class="graph-line" x1="${edge.a.x}" y1="${edge.a.y}" x2="${edge.b.x}" y2="${edge.b.y}" stroke-width="${Math.max(1, edge.shared / max * 5)}"></line>`).join('')}
        ${nodes.map((node, index) => `
          <g class="graph-node" transform="translate(${node.x},${node.y})">
            <circle r="${node.size}" fill="${index % 3 === 0 ? 'var(--mint-bg)' : index % 3 === 1 ? 'var(--cyan-bg)' : 'var(--violet-bg)'}" stroke="var(--mint)" stroke-width="1.2"></circle>
            <text y="${node.size + 16}">${esc(node.name.length > 15 ? node.name.slice(0, 14) + '…' : node.name)}</text>
          </g>
        `).join('')}
      </g>
    `;
    if (status) status.textContent = `${nodes.length} nodes · ${edges.length} edges`;
  }

  function getHistory() {
    return safeStorage(() => JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'), []);
  }

  function addHistory(entry) {
    const history = getHistory();
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 200)));
  }

  function renderHistory() {
    const root = document.getElementById('histRows');
    if (!root) return;
    const history = getHistory();
    if (!history.length) {
      root.innerHTML = `<div class="empty"><h3>${t('state.empty')}</h3><p>${t('hist.empty')}</p></div>`;
      return;
    }
    root.innerHTML = history.map((entry) => `
      <div class="hist-row live">
        <div class="when">${fmtDate(entry.date)}</div>
        <div class="desc">${esc(entry.playlist)}<small>${esc(entry.mode)}</small></div>
        <span class="tag coral">-${fmtNum(entry.removed)}</span>
        <span class="tag mint">${fmtNum(entry.kept)}</span>
        <button class="btn-app ghost" type="button" data-export-history>${t('hist.export')}</button>
      </div>
    `).join('');
  }

  function exportHistory() {
    const history = getHistory();
    if (!history.length) return;
    const rows = [
      'date,playlist,removed,kept,mode',
      ...history.map((entry) => [entry.date, `"${String(entry.playlist).replace(/"/g, '""')}"`, entry.removed, entry.kept, entry.mode].join(',')),
    ];
    download(rows.join('\n'), 'washlist-history.csv', 'text/csv');
  }

  function exportDuplicates() {
    const rows = collectDuplicateGroups().flatMap(({ playlist, group }) => group.insts.map((inst, index) => ({
      playlist: playlist.name,
      track: inst.name || group.name,
      artist: inst.artist || group.artist,
      type: group.type,
      confidence: group.confidence,
      reason: t(group.reasonKey),
      position: inst.pos + 1,
      album: inst.album || '',
      duration_ms: inst.duration || '',
      isrc: inst.isrc || '',
      added: inst.at || '',
      action: group.actionable ? (index === 0 ? 'keep' : 'remove') : 'review',
    })));
    if (!rows.length) return;
    const header = Object.keys(rows[0]);
    const csv = [
      header.join(','),
      ...rows.map((row) => header.map((key) => `"${String(row[key]).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    download(csv, 'washlist-duplicates.csv', 'text/csv');
  }

  function download(content, filename, type) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function toast(message, type = 'inf') {
    const root = document.getElementById('toasts');
    if (!root) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${esc(message)}</span><span class="x" aria-hidden="true">×</span>`;
    root.appendChild(el);
    el.querySelector('.x').addEventListener('click', () => el.remove());
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 260);
    }, 4200);
  }

  function initScanWave() {
    const canvas = document.getElementById('scanWave');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let tick = 0;
    const readAccent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '184, 156, 255';
    function fit() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const accent = readAccent();
      ctx.clearRect(0, 0, width, height);
      const bars = 120;
      const barWidth = width / bars;
      for (let i = 0; i < bars; i += 1) {
        const phase = i * 0.20 + tick * 0.045;
        const amp = (Math.sin(phase) * 0.34 + Math.sin(phase * 2.2) * 0.22 + 0.56) * (height * 0.42) + 6;
        ctx.fillStyle = i % 11 === 0 ? `rgba(${accent},.86)` : `rgba(${accent},.26)`;
        ctx.fillRect(i * barWidth + 1, height / 2 - amp / 2, Math.max(1, barWidth - 2), amp);
      }
      ctx.strokeStyle = 'rgba(111,232,255,.48)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const phase = x * 0.024 + tick * 0.052;
        const y = height / 2 + Math.sin(phase) * height * 0.18 + Math.sin(phase * 1.7) * height * 0.07;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      tick += 1;
      requestAnimationFrame(draw);
    }
    fit();
    window.addEventListener('resize', fit, { passive: true });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
  }

  function bindEvents() {
    document.querySelectorAll('[data-tab-target]').forEach((button) => {
      button.addEventListener('click', () => switchTab(button.dataset.tabTarget));
    });
    document.getElementById('scanAllBtn')?.addEventListener('click', scanAll);
    document.getElementById('reloadBtn')?.addEventListener('click', () => state.accessToken ? loadPlaylists().catch(() => toast(t('toast.loadErr'), 'err')) : showSignedOut());
    document.getElementById('runCmpBtn')?.addEventListener('click', runCompare);
    document.getElementById('runOvBtn')?.addEventListener('click', renderOverlap);
    document.getElementById('buildGraphBtn')?.addEventListener('click', renderGraph);
    document.getElementById('applyExactBtn')?.addEventListener('click', removeExactAll);
    document.getElementById('exportDupBtn')?.addEventListener('click', exportDuplicates);
    document.getElementById('exportHistBtn')?.addEventListener('click', exportHistory);
    document.getElementById('clearHistBtn')?.addEventListener('click', () => {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
    });
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRES_KEY);
      state.accessToken = null;
      showSignedOut();
      toast(t('toast.out'), 'inf');
    });
    document.getElementById('srch')?.addEventListener('input', renderPlaylists);
    document.getElementById('focusSearch')?.addEventListener('click', () => {
      switchTab('tLib');
      document.getElementById('srch')?.focus();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) {
        event.preventDefault();
        switchTab('tLib');
        document.getElementById('srch')?.focus();
      }
    });
    document.querySelectorAll('[data-sort]').forEach((button) => {
      button.addEventListener('click', () => {
        state.filter = button.dataset.sort;
        document.querySelectorAll('[data-sort]').forEach((item) => item.classList.toggle('active', item === button));
        renderPlaylists();
      });
    });
    document.querySelectorAll('[data-dup-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.dupFilter = button.dataset.dupFilter;
        document.querySelectorAll('[data-dup-filter]').forEach((item) => item.classList.toggle('active', item === button));
        renderAllDuplicates();
      });
    });
    document.querySelectorAll('.toggle').forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('on');
        button.setAttribute('aria-pressed', String(button.classList.contains('on')));
        recomputeScanned();
      });
    });
    document.getElementById('modeSel')?.addEventListener('change', (event) => {
      state.scanMode = event.target.value;
      recomputeScanned();
    });
    document.addEventListener('click', (event) => {
      const scan = event.target.closest('[data-scan]');
      const openDupes = event.target.closest('[data-open-dupes]');
      const removeGroup = event.target.closest('[data-remove-cluster]');
      const removeOneButton = event.target.closest('[data-remove-one]');
      if (scan) scanPlaylist(scan.dataset.scan);
      if (openDupes) {
        state.dupFilter = 'all';
        switchTab('tDup');
        renderAllDuplicates();
      }
      if (removeGroup) removeCluster(removeGroup.dataset.removeCluster, removeGroup.dataset.group);
      if (removeOneButton) removeOne(removeOneButton.dataset.removeOne, Number(removeOneButton.dataset.pos));
    });
  }

  function recomputeScanned() {
    Object.keys(state.playlistData).forEach((id) => {
      const data = state.playlistData[id];
      if (data?.tracks?.length) {
        state.playlistData[id] = { ...data, ...findDupes(data.tracks), status: 'done' };
      }
    });
    renderAll();
  }

  function bootBackground() {
    if (window.WashListWaveform) {
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '184, 156, 255';
      window.WashListWaveform.init(document.getElementById('bg-canvas'), {
        lineColor: `rgba(${accent}, 0.55)`,
        lineDim: 'rgba(255, 255, 255, 0.045)',
        accentColor: 'rgba(111, 232, 255, 0.62)',
        glowColor: `rgba(${accent}, 0.10)`,
        density: 24,
        amplitude: 8,
        mouseAmp: 44,
        mouseRadius: 280,
        speed: 0.3,
        thickness: 1.0,
        eventTarget: window,
      });
    }
  }

  function playWorkspaceEntry() {
    let shouldPlay = false;
    try {
      shouldPlay = sessionStorage.getItem(TRANSITION_KEY) === '1';
      sessionStorage.removeItem(TRANSITION_KEY);
    } catch {}
    if (!shouldPlay) return;

    const layer = document.createElement('div');
    layer.className = 'workspace-transition';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = `
      <div class="workspace-transition-card">
        <span class="workspace-transition-mark">•</span>
        <span class="workspace-transition-copy">
          <b>WashList</b>
          <span>workspace ready</span>
        </span>
      </div>
    `;
    document.body.appendChild(layer);
    document.body.classList.add('app-entering');
    setTimeout(() => {
      document.body.classList.remove('app-entering');
      layer.remove();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 900);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLangDropdown();
    applyI18n();
    bindEvents();
    initScanWave();
    bootBackground();
    playWorkspaceEntry();

    const params = new URLSearchParams(location.search);
    if (params.get('connect') === '1') {
      location.replace('index.html');
      return;
    }
    if (chkToken()) {
      initApp();
    } else {
      showSignedOut();
    }
  });
})();
