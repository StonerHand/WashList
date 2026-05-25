/* WashList — Library, Compare, Graph, History, Settings */
const { useState: useStateV, useEffect: useEffectV, useRef: useRefV, useMemo: useMemoV } = React;
const Iv = window.WashListIcons;
const { PLAYLISTS: PLs, HISTORY: HIST, GRAPH: GR } = window.WashListData;

/* ─── LIBRARY ─── */
function LibraryView({ onRoute }) {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('lib.summary')}</div>
          <h1 className="vh-title"><em>{t('lib.title_a')}</em><br /><span className="thin">{t('lib.title_b')}</span></h1>
          <p className="vh-sub">{t('lib.sub')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-app"><Iv.Filter width="14" height="14" /> {t('lib.filter')}</button>
          <button className="btn-app primary" onClick={() => onRoute('scan')}><Iv.Scan width="14" height="14" /> {t('lib.scanAll')}</button>
        </div>
      </div>

      <div className="filter-bar">
        <span className="chip active">{t('lib.chips.all')}</span>
        <span className="chip">{t('lib.chips.owned')}</span>
        <span className="chip">{t('lib.chips.followed')}</span>
        <span className="chip">{t('lib.chips.collab')}</span>
        <span className="sep"></span>
        <span className="chip">{t('lib.chips.recent')}</span>
        <span className="chip">{t('lib.chips.largest')}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--ink-3)' }}>9 of 9</span>
      </div>

      <div className="lib-grid">
        {PLs.map(p => (
          <div key={p.id} className="lib-card" onClick={() => onRoute('scan')}>
            <div className="art" style={{ background: `linear-gradient(135deg, ${p.color[0]}, ${p.color[1]})` }}>
              <div className="glyph">{p.glyph}</div>
            </div>
            <div className="t">{p.name}</div>
            <div className="m">{p.count.toLocaleString()} tracks · {p.hours} · {p.updated}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── COMPARE ─── */
function CompareView() {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  const [a, setA] = useStateV('drive');
  const [b, setB] = useStateV('focus');
  const pa = PLs.find(p => p.id === a);
  const pb = PLs.find(p => p.id === b);

  const sharedTracks = [
    { name: 'Midnight Drive — Hiroshi Kawai', dur: '4:32', match: true },
    { name: 'Northbound — Cale Atlas',       dur: '3:48', match: true },
    { name: 'Slow Tide — Aria Vey',          dur: '3:42', match: true },
    { name: 'Velvet Sky — Mira Lune',        dur: '4:02', match: true },
    { name: 'Tinder Box — Junewave',         dur: '3:21', match: true },
  ];
  const onlyA = [
    { name: 'Cardamom Smoke — Lev Park',     dur: '5:01' },
    { name: 'Reverie — North Crane',         dur: '6:14' },
    { name: 'Salt Sun — Tycho Vey',          dur: '4:18' },
  ];
  const onlyB = [
    { name: 'Argon Loop — Iri',              dur: '3:55' },
    { name: 'Black Vermouth — Hael',         dur: '4:42' },
    { name: 'Marlon — Soft Static',          dur: '5:20' },
  ];

  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('cmp.eyebrow')}</div>
          <h1 className="vh-title"><em>{t('cmp.title_a')}</em><br /><span className="thin">{t('cmp.title_b')}</span></h1>
          <p className="vh-sub">{t('cmp.sub')}</p>
        </div>
      </div>

      <div className="filter-bar">
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em' }}>A</span>
        <select value={a} onChange={e => setA(e.target.value)}
                style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', color: 'var(--ink)', borderRadius: 8, padding: '6px 10px', fontFamily: 'inherit', fontSize: 13 }}>
          {PLs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginLeft: 16 }}>B</span>
        <select value={b} onChange={e => setB(e.target.value)}
                style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', color: 'var(--ink)', borderRadius: 8, padding: '6px 10px', fontFamily: 'inherit', fontSize: 13 }}>
          {PLs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--ink-3)' }}>{sharedTracks.length} overlap · Jaccard 0.31</span>
      </div>

      <div className="compare-grid">
        <div className="compare-col">
          <h4>{t('cmp.onlyA')} {pa?.name}</h4>
          <div className="pl">
            {onlyA.map((t, i) => (
              <div key={i} className="track-row">
                <span className="tk">{String(i+1).padStart(2,'0')}</span>
                <span className="name">{t.name}</span>
                <span className="dur">{t.dur}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="compare-mid">
          <div className="venn" aria-hidden="true">
            <div className="c a"></div>
            <div className="c b"></div>
          </div>
          <div className="num">{sharedTracks.length}</div>
          <div className="lbl">{t('cmp.shared')}</div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
            {sharedTracks.map((t, i) => (
              <div key={i} className="track-row match">
                <span className="tk">●</span>
                <span className="name"><b>{t.name}</b></span>
                <span className="dur">{t.dur}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            <button className="btn-app">{t('cmp.save')}</button>
            <button className="btn-app primary">{t('cmp.dedupe')}</button>
          </div>
        </div>

        <div className="compare-col">
          <h4>{t('cmp.onlyB')} {pb?.name}</h4>
          <div className="pl">
            {onlyB.map((t, i) => (
              <div key={i} className="track-row">
                <span className="tk">{String(i+1).padStart(2,'0')}</span>
                <span className="name">{t.name}</span>
                <span className="dur">{t.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GRAPH ─── */
function GraphView() {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  const ref = useRefV(null);
  const ttRef = useRefV(null);
  const [selected, setSelected] = useStateV(null);

  useEffectV(() => {
    if (!window.d3) {
      // fallback: render static SVG
      return;
    }
    const svgEl = ref.current; if (!svgEl) return;
    const W = svgEl.clientWidth, H = svgEl.clientHeight;
    const d3 = window.d3;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    GR.nodes.forEach(n => {
      const g = defs.append('radialGradient').attr('id', 'g-' + n.id).attr('cx', '30%').attr('cy', '30%');
      g.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', 0.4);
      g.append('stop').attr('offset', '100%').attr('stop-color', n.c).attr('stop-opacity', 1);
    });

    const linkData = GR.edges.map(([s, t, v, kind]) => ({ source: s, target: t, value: v, kind }));
    const nodeData = GR.nodes.map(n => ({ ...n }));

    const simulation = d3.forceSimulation(nodeData)
      .force('link', d3.forceLink(linkData).id(d => d.id).distance(d => 220 - d.value * 1.8).strength(0.4))
      .force('charge', d3.forceManyBody().strength(-260))
      .force('center', d3.forceCenter(W/2, H/2))
      .force('collide', d3.forceCollide(d => d.size / 2 + 18));

    // group for zoom
    const root = svg.append('g');
    const zoom = d3.zoom().scaleExtent([0.4, 3]).on('zoom', (e) => root.attr('transform', e.transform));
    svg.call(zoom);

    const linkSel = root.append('g').selectAll('line').data(linkData).enter().append('line')
      .attr('stroke', d => d.kind === 'related' ? 'rgba(184,156,255,.45)' : 'rgba(94,255,168,.22)')
      .attr('stroke-width', d => 0.6 + d.value / 14);

    const nodeG = root.append('g').selectAll('g').data(nodeData).enter().append('g').style('cursor', 'pointer');

    nodeG.append('circle')
      .attr('r', d => d.size / 2)
      .attr('fill', d => `url(#g-${d.id})`)
      .attr('stroke', 'rgba(255,255,255,.15)')
      .attr('stroke-width', 1)
      .style('filter', 'drop-shadow(0 6px 20px rgba(0,0,0,.5))');

    nodeG.append('text')
      .text(d => d.name)
      .attr('fill', 'rgba(247,250,252,.85)')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.size / 2 + 16)
      .style('font-family', 'var(--f-mono)')
      .style('font-size', '10.5px')
      .style('letter-spacing', '0.04em')
      .style('text-transform', 'uppercase');

    nodeG.on('mouseenter', function (e, d) {
      d3.select(this).select('circle').transition().duration(160).attr('r', d.size / 2 + 6).attr('stroke-width', 2).attr('stroke', d.c);
      linkSel.attr('opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15);
      // tooltip
      const tt = ttRef.current;
      if (tt) {
        tt.style.opacity = 1;
        tt.style.left = (e.offsetX + 14) + 'px';
        tt.style.top = (e.offsetY + 14) + 'px';
        tt.querySelector('.name').textContent = d.name;
        const linkCount = linkData.filter(l => l.source.id === d.id || l.target.id === d.id).length;
        tt.querySelector('.meta').textContent = `${linkCount} connections · ${d.size} tracks`;
      }
    }).on('mouseleave', function (e, d) {
      d3.select(this).select('circle').transition().duration(160).attr('r', d.size / 2).attr('stroke-width', 1).attr('stroke', 'rgba(255,255,255,.15)');
      linkSel.attr('opacity', 1);
      const tt = ttRef.current; if (tt) tt.style.opacity = 0;
    }).on('mousemove', function (e) {
      const tt = ttRef.current;
      if (tt) { tt.style.left = (e.offsetX + 14) + 'px'; tt.style.top = (e.offsetY + 14) + 'px'; }
    }).on('click', (e, d) => { setSelected(d); });

    simulation.on('tick', () => {
      linkSel
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, []);

  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('gr.eyebrow')}</div>
          <h1 className="vh-title"><em>{t('gr.title_a')}</em><br /><span className="thin">{t('gr.title_b')}</span></h1>
          <p className="vh-sub">{t('gr.sub')}</p>
        </div>
      </div>

      <div className="filter-bar">
        <span className="chip active">{t('gr.allEdges')}</span>
        <span className="chip">{t('gr.shared')}</span>
        <span className="chip">{t('gr.related')}</span>
        <span className="sep"></span>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{t('gr.minShared')}</span>
        <input type="range" min="0" max="50" step="1" defaultValue="0" style={{ width: 120, accentColor: 'var(--mint)' }} />
      </div>

      <div className="graph-shell">
        <svg ref={ref}></svg>
        <div className="graph-legend" aria-label="Legend">
          <div className="lg-row"><span className="d" style={{ background: 'var(--mint)' }}></span>{t('gr.l.root')}</div>
          <div className="lg-row"><span className="d" style={{ background: 'var(--cyan)' }}></span>{t('gr.l.std')}</div>
          <div className="lg-row"><span className="d" style={{ background: 'var(--violet)' }}></span>{t('gr.l.auto')}</div>
          <div className="lg-row"><span className="d" style={{ background: 'rgba(94,255,168,.4)', height: 2, borderRadius: 1 }}></span>{t('gr.shared')}</div>
          <div className="lg-row"><span className="d" style={{ background: 'rgba(184,156,255,.5)', height: 2, borderRadius: 1 }}></span>{t('gr.related')}</div>
        </div>
        <div ref={ttRef} className="graph-tt">
          <div className="name">—</div>
          <div className="meta">—</div>
        </div>
      </div>
    </div>
  );
}

/* ─── HISTORY ─── */
function HistoryView() {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('hist.eyebrow')}</div>
          <h1 className="vh-title"><em>{t('hist.title_a')}</em><br /><span className="thin">{t('hist.title_b')}</span></h1>
          <p className="vh-sub">{t('hist.sub')}</p>
        </div>
        <button className="btn-app"><Iv.Filter width="14" height="14" /> {t('hist.filter')}</button>
      </div>

      <div>
        {HIST.map((h, i) => (
          <div key={i} className="hist-row">
            <div className="when">{h.when}</div>
            <div className="desc">{h.what}<small>{h.detail}</small></div>
            <span className={`tag ${h.kind}`}><span className="b"></span>{h.count}</span>
            <button className="chip">{t('hist.details')}</button>
            <button className="chip">{t('hist.restore')}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SETTINGS ─── */
function Toggle({ on, onChange }) {
  return <div className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)} role="switch" aria-checked={on}></div>;
}

function SettingsView() {
  const t = (window.WL && window.WL.t) || (k=>k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  const [autoScan, setAutoScan] = useStateV(true);
  const [strictMode, setStrictMode] = useStateV(false);
  const [keepRemixes, setKeepRemixes] = useStateV(true);
  const [reducedMotion, setReducedMotion] = useStateV(false);
  const [advanced, setAdvanced] = useStateV(false);
  const [threshold, setThreshold] = useStateV(0.78);

  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow">{t('set.eyebrow')}</div>
          <h1 className="vh-title">{t('set.title')}</h1>
          <p className="vh-sub">{t('set.sub')}</p>
        </div>
      </div>

      <div style={{ maxWidth: 720 }}>
        <div className="set-section">
          <h3>{t('set.general')}</h3>
          <div className="sd">{t('set.generalSub')}</div>
          <div className="set-row">
            <div className="l">{t('set.autoScan')}<small>{t('set.autoScanSub')}</small></div>
            <Toggle on={autoScan} onChange={setAutoScan} />
          </div>
          <div className="set-row">
            <div className="l">{t('set.interval')}<small>{t('set.intervalSub')}</small></div>
            <select style={{ background:'var(--bg-2)', color:'var(--ink)', border:'1px solid var(--line-2)', borderRadius:8, padding:'6px 10px', fontFamily:'inherit', fontSize: 13 }}>
              <option>Every 15 min</option><option>Hourly</option><option>Daily</option>
            </select>
          </div>
        </div>

        <div className="set-section">
          <h3>{t('set.dup')}</h3>
          <div className="sd">{t('set.dupSub')}</div>
          <div className="set-row">
            <div className="l">{t('set.threshold')}<small>{t('set.thresholdSub')}</small><span className="default">{t('set.default')} 0.78</span></div>
            <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
              <input type="range" min="0.5" max="1" step="0.01" value={threshold} onChange={e => setThreshold(+e.target.value)} style={{ width: 160, accentColor:'var(--mint)' }} />
              <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--mint)', minWidth: 38 }}>{threshold.toFixed(2)}</span>
            </div>
          </div>
          <div className="set-row">
            <div className="l">{t('set.strict')}<small>{t('set.strictSub')}</small></div>
            <Toggle on={strictMode} onChange={setStrictMode} />
          </div>
          <div className="set-row">
            <div className="l">{t('set.remix')}<small>{t('set.remixSub')}</small></div>
            <Toggle on={keepRemixes} onChange={setKeepRemixes} />
          </div>
        </div>

        <div className="set-section">
          <h3>{t('set.appearance')}</h3>
          <div className="sd">{t('set.appearanceSub')}</div>
          <div className="set-row">
            <div className="l">{t('set.reduced')}<small>{t('set.reducedSub')}</small></div>
            <Toggle on={reducedMotion} onChange={setReducedMotion} />
          </div>
        </div>

        <div className="set-section">
          <div className={'set-advanced-toggle' + (advanced ? ' open' : '')} onClick={() => setAdvanced(!advanced)}>
            <Iv.Chev className="chev" width="12" height="12" />
            {t('set.advanced')}
          </div>
          {advanced && (
            <div style={{ marginTop: 16, paddingLeft: 12, borderLeft: '1px solid var(--line)' }}>
              <div className="set-row" style={{ borderTop: 'none' }}>
                <div className="l">{t('set.window')}<small>{t('set.windowSub')}</small><span className="default">{t('set.default')} 4096</span></div>
                <input defaultValue="4096" style={{ background:'var(--bg-2)', color:'var(--ink)', border:'1px solid var(--line-2)', borderRadius:8, padding:'6px 10px', fontFamily:'var(--f-mono)', fontSize: 12, width: 100 }} />
              </div>
              <div className="set-row">
                <div className="l">{t('set.export')}<small>{t('set.exportSub')}</small></div>
                <button className="btn-app">{t('set.exportBtn')}</button>
              </div>
              <div className="set-row">
                <div className="l" style={{ color: 'var(--coral)' }}>{t('set.reset')}<small>{t('set.resetSub')}</small></div>
                <button className="btn-app danger">{t('set.resetBtn')}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.WashListViews = { LibraryView, CompareView, GraphView, HistoryView, SettingsView };
