/* WashList — App shell (sidebar + topbar) */
const { useState, useRef, useEffect } = React;
const I = window.WashListIcons;
const t = () => (window.WL ? window.WL.t : (k) => k);

const NAV_ITEMS = [
  { id: 'library',    key: 'nav.library',    Icon: I.Library,    count: '9' },
  { id: 'scan',       key: 'nav.scan',       Icon: I.Scan,       countKey: 'nav.live', live: true },
  { id: 'duplicates', key: 'nav.duplicates', Icon: I.Dupes,      count: '42', warn: true },
  { id: 'compare',    key: 'nav.compare',    Icon: I.Compare,    count: null },
  { id: 'graph',      key: 'nav.graph',      Icon: I.Graph,      count: null },
  { id: 'history',    key: 'nav.history',    Icon: I.History,    count: null },
  { id: 'settings',   key: 'nav.settings',   Icon: I.Settings,   count: null },
];

const LANGS = [
  { code: 'en', flag: '🇬🇧', name: 'English',  short: 'EN' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский',  short: 'RU' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch',  short: 'DE' },
  { code: 'es', flag: '🇪🇸', name: 'Español',  short: 'ES' },
  { code: 'fr', flag: '🇫🇷', name: 'Français', short: 'FR' },
];

function LangSwitch() {
  const lang = window.WL ? window.WL.useLang() : 'en';
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const cur = LANGS.find(l => l.code === lang) || LANGS[0];
  return (
    <div className="lang-dd" ref={ref}>
      <button className={"lang-dd-trigger" + (open ? ' open' : '')} onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className="flag">{cur.flag}</span>
        <span className="code">{cur.short}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 180ms var(--ease-base)' }}><path d="M3 4.5l3 3 3-3"/></svg>
      </button>
      {open && (
        <div className="lang-dd-menu" role="listbox">
          {LANGS.map(l => (
            <button key={l.code} role="option" aria-selected={l.code === lang}
                    className={"lang-dd-item" + (l.code === lang ? ' active' : '')}
                    onClick={() => { window.WL && window.WL.setLang(l.code); setOpen(false); }}>
              <span className="flag">{l.flag}</span>
              <span className="name">{l.name}</span>
              <span className="code">{l.short}</span>
              {l.code === lang && <I.Check width="12" height="12" style={{ marginLeft: 'auto', color: 'var(--mint)' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ route, onRoute }) {
  const tt = t();
  return (
    <aside className="side">
      <a className="side-logo" href="WashList — Landing.html">
        <span className="logo-mark">
          <svg viewBox="0 0 16 16" fill="#051209">
            <path d="M2 8c0-3 2.5-5 5-5s5 2 5 5-2.2 5-5 5c-1.5 0-2.6-.4-3.5-1L2 13l1-1.5C2.4 10.6 2 9.4 2 8z" opacity=".25"/>
            <path d="M4.5 8c0-1.8 1.5-3 3-3s3 1.2 3 3-1.5 3-3 3-3-1.2-3-3z"/>
          </svg>
        </span>
        <div>
          <div className="name">washlist</div>
          <div className="ver">{tt('tag.intelligence')}</div>
        </div>
      </a>

      <div className="side-section">{tt('nav.workspace')}</div>
      <nav className="side-nav">
        {NAV_ITEMS.slice(0, 6).map(item => (
          <a key={item.id}
             className={"side-link" + (route === item.id ? ' active' : '') + (item.warn ? ' warn' : '')}
             onClick={() => onRoute(item.id)}>
            <item.Icon />
            <span>{tt(item.key)}</span>
            {(item.count || item.countKey) && <span className="count">{item.countKey ? tt(item.countKey) : item.count}</span>}
          </a>
        ))}
      </nav>

      <div className="side-section">{tt('nav.system')}</div>
      <nav className="side-nav">
        {NAV_ITEMS.slice(6).map(item => (
          <a key={item.id}
             className={"side-link" + (route === item.id ? ' active' : '')}
             onClick={() => onRoute(item.id)}>
            <item.Icon />
            <span>{tt(item.key)}</span>
          </a>
        ))}
      </nav>

      <div className="side-bottom">
        <div className="user-row">
          <div className="user-avatar"></div>
          <div className="who">aleks<small>{tt('user.role')}</small></div>
          <span className="demo">{tt('user.demo')}</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ route }) {
  const tt = t();
  const labels = {
    library: tt('nav.library'), scan: tt('nav.scan'), duplicates: tt('nav.duplicates'),
    compare: tt('nav.compare'), graph: tt('nav.graph'), history: tt('nav.history'), settings: tt('nav.settings')
  };
  return (
    <header className="topbar">
      <div className="crumb">
        <span>{tt('top.workspace')}</span>
        <span className="sep">/</span>
        <b>{labels[route]}</b>
      </div>
      <button className="topbar-cmd">
        <I.Search width="13" height="13" />
        <span>{tt('top.search')}</span>
        <kbd>⌘K</kbd>
      </button>
      <LangSwitch />
    </header>
  );
}

window.WashListShell = { Sidebar, Topbar };
