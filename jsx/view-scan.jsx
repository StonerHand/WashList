/* WashList — Scan View */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;
const Is = window.WashListIcons;
const { STAGES: STAGES_S, CLUSTERS: CLUSTERS_S, STATUS_META: SM_S } = window.WashListData;

// Mini waveform canvas — track being analyzed
function ScanWaveform({ running }) {
  const ref = useRefS(null);
  useEffectS(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0; let t = 0;
    function fit() {
      const r = c.getBoundingClientRect();
      c.width = r.width * DPR; c.height = r.height * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    fit();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function draw() {
      const W = c.clientWidth, H = c.clientHeight;
      ctx.clearRect(0,0,W,H);
      const bars = 128;
      const bw = W / bars;
      const cx = W * 0.5;
      // bar field — denser near center, like analysing focus
      for (let i = 0; i < bars; i++) {
        const x = i * bw;
        const distFromCenter = Math.abs(i - bars/2) / (bars/2);
        const phase = i * 0.22 + t * 0.05;
        const energy = (Math.sin(phase) * 0.35 + Math.sin(phase * 2.4) * 0.2 + 0.55);
        const base = energy * (H * 0.4) * (1 - distFromCenter * 0.3) + 6;
        const isPeak = (i % 9 === 0);
        ctx.fillStyle = isPeak ? 'rgba(94,255,168,0.95)' : 'rgba(94,255,168,0.32)';
        ctx.fillRect(x + 1, H/2 - base/2, bw - 2, base);
      }
      // duplicate-overlay waveform (cyan)
      ctx.strokeStyle = 'rgba(111,232,255,.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const phase = x * 0.022 + t * 0.06;
        const y = H/2 + Math.sin(phase) * H * 0.20 + Math.sin(phase * 1.7) * H * 0.08;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (running && !reduced) {
        t += 1;
        raf = requestAnimationFrame(draw);
      }
    }
    draw();
    window.addEventListener('resize', fit);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', fit); };
  }, [running]);
  return <canvas ref={ref} />;
}

// Counter that animates to value
function Counter({ value, format = (n) => n.toLocaleString() }) {
  const [v, setV] = useStateS(0);
  useEffectS(() => {
    const start = performance.now();
    const from = v, to = value, dur = 700;
    let raf = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{format(v)}</span>;
}

// Found-duplicate ticker — items appear as scan progresses
function FoundList({ items }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="card-h">
        <span className="ttl">{((window.WL && window.WL.t) || (k=>k))('scan.surfacing')}</span>
        <span className="sub">{((window.WL && window.WL.t) || (k=>k))('scan.streaming')}</span>
      </div>
      <div className="card-b" style={{ padding: 0 }}>
        {items.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>{((window.WL && window.WL.t) || (k=>k))('scan.waiting')}</div>
            <div>{((window.WL && window.WL.t) || (k=>k))('scan.waitingSub')}</div>
          </div>
        ) : items.map((c, i) => {
          const sm = SM_S[c.status];
          const tt = (window.WL && window.WL.t) || (k=>k);
          const label = tt('st.' + c.status);
          return (
            <div key={c.id}
                 style={{
                   padding: '14px 18px',
                   display: 'grid',
                   gridTemplateColumns: '32px 1fr auto',
                   gap: 14,
                   alignItems: 'center',
                   borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                   animation: 'foundIn .5s var(--ease-out)',
                 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: `linear-gradient(135deg, ${c.a.cover[0]}, ${c.a.cover[1]})`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 4, borderRadius: 4, background: 'var(--bg-2)' }} />
                <div style={{ position: 'absolute', inset: 9, borderRadius: '50%', background: c.a.cover[0], opacity: .8 }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.a.title}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--ink-3)', marginTop: 2 }}>{c.a.artist} · {c.reason}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span className={`tag ${sm.tag}`}><span className="b"></span>{label}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ink-2)', fontVariantNumeric: 'tabular-nums' }}>{c.confidence.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScanView({ onComplete }) {
  const t = (window.WL && window.WL.t) || ((k) => k);
  const lang = window.WL ? window.WL.useLang() : 'en';
  const [running, setRunning] = useStateS(true);
  const [progress, setProgress] = useStateS(0); // 0..1
  const [stageIdx, setStageIdx] = useStateS(0);
  const [counts, setCounts] = useStateS({ tracks: 0, processed: 0, dupes: 0, review: 0 });
  const [found, setFound] = useStateS([]); // clusters surfaced so far

  // total duration in seconds
  const totalDur = useMemoS(() => STAGES_S.reduce((a,s) => a + s.duration, 0), []);

  // Drive the scan timeline
  useEffectS(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const startT = performance.now();

    function tick(now) {
      const dt = (now - last) / 1000;
      last = now;
      const elapsed = (now - startT) / 1000;
      const p = Math.min(1, elapsed / totalDur);
      setProgress(p);

      // determine stage by cumulative duration
      let acc = 0; let si = 0;
      for (let i = 0; i < STAGES_S.length; i++) {
        acc += STAGES_S[i].duration;
        if (elapsed < acc) { si = i; break; }
        if (i === STAGES_S.length - 1) si = STAGES_S.length;
      }
      setStageIdx(si);

      // animate counters tied to progress
      const tracks = Math.round(2847 * Math.min(1, p * 1.05));
      const processed = Math.round(2847 * Math.min(1, p * 0.96));
      // dupes appear during stage 4+
      const dupeRel = Math.max(0, (p - 0.55) / 0.4);
      const dupes = Math.round(Math.min(1, dupeRel) * 42);
      const review = Math.round(Math.min(1, dupeRel) * 11);
      setCounts({ tracks, processed, dupes, review });

      // surface clusters at thresholds
      const desiredFound = Math.min(CLUSTERS_S.length, Math.floor(Math.max(0, (p - 0.5) / 0.45 * CLUSTERS_S.length)));
      setFound(prev => prev.length < desiredFound ? CLUSTERS_S.slice(0, desiredFound) : prev);

      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setRunning(false);
        if (onComplete) onComplete();
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, totalDur, onComplete]);

  function restart() {
    setProgress(0); setStageIdx(0); setCounts({ tracks: 0, processed: 0, dupes: 0, review: 0 }); setFound([]); setRunning(true);
  }

  const stage = STAGES_S[Math.min(stageIdx, STAGES_S.length - 1)];

  return (
    <div className="view">
      <div className="vh">
        <div>
          <div className="vh-eyebrow"><span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'var(--mint)', animation: running ? 'pulseDot 1.4s infinite' : 'none' }}></span> {running ? t('scan.eyebrowLive') : t('scan.eyebrowDone')}</div>
          <h1 className="vh-title">
            {running
              ? <>{t('scan.titleLive_a')} <em>{t('scan.titleLive_b')}</em></>
              : <>{t('scan.titleDone_a')} <em>{t('scan.titleDone_b')}</em></>
            }<br />
            <span className="thin">{t('scan.titleTail')}</span>
          </h1>
          <p className="vh-sub">{running ? t('scan.subLive') : t('scan.subDone')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {running
            ? <button className="btn-app" onClick={() => setRunning(false)}><Is.Pause width="14" height="14" /> {t('scan.pause')}</button>
            : <button className="btn-app" onClick={restart}><Is.Scan width="14" height="14" /> {t('scan.restart')}</button>}
          <button className="btn-app primary"><Is.Dupes width="14" height="14" /> {t('scan.view')}</button>
        </div>
      </div>

      <div className="counter-row">
        <div className="counter-card">
          <div className="k">{t('scan.k1')}</div>
          <div className="v"><Counter value={counts.tracks} /></div>
        </div>
        <div className="counter-card cyan">
          <div className="k">{t('scan.k2')}</div>
          <div className="v"><Counter value={counts.processed} /></div>
        </div>
        <div className="counter-card mint">
          <div className="k">{t('scan.k3')}</div>
          <div className="v"><Counter value={counts.dupes} /></div>
        </div>
        <div className="counter-card amber">
          <div className="k">{t('scan.k4')}</div>
          <div className="v"><Counter value={counts.review} /></div>
        </div>
      </div>

      <div className="scan-hero">
        <div className="scan-bigboard">
          <div className="corner-mono"><span className="pulse"></span>{running ? t('scan.cornerAnalyzing') : t('scan.cornerIdle')}</div>
          <div className="scan-board-eyebrow">{t('scan.stageNow')} · {String(Math.min(stageIdx + 1, STAGES_S.length)).padStart(2, '0')} / 06</div>
          <h2 className="scan-board-title">
            <em>{t(`scan.stage.${stage.id}.t`)}.</em>
          </h2>
          <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 6 }}>{t(`scan.stage.${stage.id}.d`)}</div>
          <div className="scan-board-meta">
            <span><b>{t('scan.eta')}</b> {Math.max(0, Math.round((1 - progress) * totalDur))}s</span>
            <span><b>{t('scan.throughput')}</b> ~{Math.round(2400 + Math.random() * 200)} tracks/s</span>
            <span><b>{t('scan.threshold')}</b> 0.78 cosine</span>
            <span><b>{t('scan.mode')}</b> {t('scan.modeVal')}</span>
          </div>

          <div className="scan-canvas-wrap">
            <ScanWaveform running={running} />
            <div className="scan-beam" style={{ left: `${progress * 100}%`, transition: 'left .25s linear', opacity: running ? 1 : 0 }} />
          </div>

          <div className="scan-progress-row">
            <div className="scan-progress"><div className="fill" style={{ width: `${progress * 100}%` }}></div></div>
            <div className="scan-progress-text">{Math.round(progress * 100)}%</div>
          </div>
        </div>

        <div className="stage-list" aria-live="polite">
          <h4>{t('scan.pipeline')}</h4>
          {STAGES_S.map((s, i) => {
            const isDone = i < stageIdx;
            const isActive = i === stageIdx && running;
            return (
              <div key={s.id} className={'stage' + (isDone ? ' done' : '') + (isActive ? ' active' : '')}>
                <div className="num">{String(s.id).padStart(2, '0')}</div>
                <div className="info">
                  <div className="l">{t(`scan.stage.${s.id}.t`)}</div>
                  <div className="d">{t(`scan.stage.${s.id}.d`)}</div>
                </div>
                <div className="dur">{s.duration.toFixed(1)}s</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <FoundList items={found} />
      </div>
    </div>
  );
}

window.WashListScanView = ScanView;
