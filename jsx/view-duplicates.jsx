/* WashList — Duplicates View */
const { useState: useStateD, useMemo: useMemoD, useEffect: useEffectD } = React;
const Id = window.WashListIcons;
const { CLUSTERS: CLUSTERS_D, STATUS_META: SM_D } = window.WashListData;

const FILTERS = [
  { id: 'all', key: 'dup.f.all' },
  { id: 'exact', key: 'dup.f.exact' },
  { id: 'probable', key: 'dup.f.probable' },
  { id: 'possible', key: 'dup.f.possible' },
  { id: 'related', key: 'dup.f.related' },
  { id: 'review', key: 'dup.f.review' },
];

function ClusterTrack({ t: tk, role, diff, onPlay }) {
  const isB = role === 'b';
  const tt = (window.WL && window.WL.t) || (k=>k);
  return (
    <div className={'cluster-track' + (isB ? ' b' : '')}>
      <div className="cov" style={{ background: `linear-gradient(135deg, ${tk.cover[0]}, ${tk.cover[1]})` }}></div>
      <div className="info">
        <div className="t" style={diff?.includes('title') ? { color: 'var(--amber)' } : null}>{tk.title}</div>
        <div className="a">{tk.artist}</div>
        <div className="meta">
          <span className={diff?.includes('album') ? 'diff' : ''}>{tk.album}</span>
          <span>•</span>
          <span className={diff?.includes('duration') ? 'diff' : ''}>{tk.duration}</span>
          <span>•</span>
          <span>added {tk.added}</span>
          <span>•</span>
          <span>ISRC {tk.isrc}</span>
        </div>
        {!isB && <span className="keep-badge">{tt('dup.keep')}</span>}
      </div>
      <button className="chip" onClick={() => onPlay && onPlay(tk)} title="Preview">
        <Id.Play width="12" height="12" />
      </button>
    </div>
  );
}

function Cluster({ c, state, onAction }) {
  const sm = SM_D[c.status];
  const tt = (window.WL && window.WL.t) || (k=>k);
  return (
    <div className={'cluster' + (state === 'removed' ? ' removed' : '') + (state === 'kept' ? ' kept' : '')}>
      <div className="cluster-h">
        <span className={`tag ${sm.tag}`}>
          <span className="b"></span>
          {tt('st.' + c.status)}
        </span>
        <span className="reason">{c.reason}</span>
        <div className="conf">
          <small>{tt('dup.conf')}</small>
          <span>{c.confidence.toFixed(1)}%</span>
          <div className="bar"><div className="fill" style={{ width: `${c.confidence}%` }}></div></div>
        </div>
      </div>
      <div className="cluster-pair">
        <ClusterTrack t={c.a} role="a" diff={c.diff} />
        <div className="divider"></div>
        <ClusterTrack t={c.b} role="b" diff={c.diff} />
      </div>
      <div className="cluster-actions">
        {state === 'removed' ? (
          <>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)' }}>● {tt('dup.state.removed')}</span>
            <button className="btn-app ghost" onClick={() => onAction('undo')}>{tt('dup.undo')}</button>
          </>
        ) : state === 'kept' ? (
          <>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mint)' }}>{tt('dup.state.kept')}</span>
            <button className="btn-app ghost" onClick={() => onAction('undo')}>{tt('dup.undo')}</button>
          </>
        ) : (
          <>
            <button className="btn-app primary" onClick={() => onAction('remove')}>
              <Id.Check width="14" height="14" /> {tt('dup.a.remove')}
            </button>
            <button className="btn-app" onClick={() => onAction('keep-both')}>{tt('dup.a.keepBoth')}</button>
            <button className="btn-app" onClick={() => onAction('split')}><Id.Split width="14" height="14" /> {tt('dup.a.split')}</button>
            <button className="btn-app" onClick={() => onAction('merge')}><Id.Merge width="14" height="14" /> {tt('dup.a.merge')}</button>
            <button className="btn-app ghost" onClick={() => onAction('later')}>{tt('dup.a.later')}</button>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--ink-4)' }}>
              {c.diff.length === 0 ? tt('dup.identical') : `${tt('dup.diffIn')} ${c.diff.join(', ')}`}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function DuplicatesView() {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  const [filter, setFilter] = useStateD('all');
  const [confMin, setConfMin] = useStateD(50);
  const [states, setStates] = useStateD({}); // id -> 'removed' | 'kept' | undefined
  const [toasts, setToasts] = useStateD([]);

  const filtered = useMemoD(() => {
    return CLUSTERS_D.filter(c => {
      if (filter !== 'all' && c.status !== filter) return false;
      if (c.confidence < confMin) return false;
      return true;
    });
  }, [filter, confMin]);

  function pushToast(text) {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }

  function action(c, kind) {
    if (kind === 'remove') {
      setStates(s => ({ ...s, [c.id]: 'removed' }));
      pushToast(`Removed "${c.b.title}" — kept "${c.a.title}"`);
    } else if (kind === 'keep-both') {
      setStates(s => ({ ...s, [c.id]: 'kept' }));
      pushToast('Kept both — marked as related');
    } else if (kind === 'undo') {
      setStates(s => { const n = { ...s }; delete n[c.id]; return n; });
    } else if (kind === 'later') {
      pushToast('Moved to "Review later" queue');
    } else if (kind === 'split') {
      setStates(s => ({ ...s, [c.id]: 'kept' }));
      pushToast('Cluster split — both tracks remain independent');
    } else if (kind === 'merge') {
      setStates(s => ({ ...s, [c.id]: 'removed' }));
      pushToast('Tracks merged');
    }
  }

  const counts = useMemoD(() => {
    const byStatus = {};
    CLUSTERS_D.forEach(c => {
      byStatus[c.status] = (byStatus[c.status] || 0) + 1;
    });
    return byStatus;
  }, []);

  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('dup.summary')}</div>
          <h1 className="vh-title">
            <em>{t('dup.title_a')}</em><br />
            <span className="thin">{t('dup.title_b')}</span>
          </h1>
          <p className="vh-sub">{t('dup.sub')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-app"><Id.Filter width="14" height="14" /> {t('dup.bulk')}</button>
          <button className="btn-app primary"><Id.Check width="14" height="14" /> {t('dup.applyExact')}</button>
        </div>
      </div>

      <div className="filter-bar" role="toolbar" aria-label="Filter clusters">
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginRight: 4 }}>{t('dup.filter.status')}</span>
        {FILTERS.map(f => (
          <button key={f.id} className={'chip' + (filter === f.id ? ' active' : '')} onClick={() => setFilter(f.id)}>
            {t(f.key)}
            {f.id !== 'all' && counts[f.id] != null && (
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .6 }}>{counts[f.id]}</span>
            )}
          </button>
        ))}
        <span className="sep"></span>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{t('dup.filter.min')}</span>
        <input type="range" min="0" max="100" step="5" value={confMin}
               onChange={e => setConfMin(+e.target.value)}
               style={{ width: 140, accentColor: 'var(--mint)' }} />
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--mint)', minWidth: 38 }}>{confMin}%</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--ink-3)' }}>{filtered.length} of {CLUSTERS_D.length} {t('dup.filter.shown')}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <div className="ic">
            <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="28" cy="28" r="22" />
              <path d="M18 28h6l2-6 4 12 2-6h6" />
            </svg>
          </div>
          <h3>{t('dup.empty.t')}</h3>
          <p>{t('dup.empty.p')}</p>
        </div>
      ) : (
        <div>
          {filtered.map(c => (
            <Cluster key={c.id} c={c} state={states[c.id]} onAction={(kind) => action(c, kind)} />
          ))}
        </div>
      )}

      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className="toast mint">
            <span>{t.text}</span>
            <span className="x" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.WashListDuplicatesView = DuplicatesView;
