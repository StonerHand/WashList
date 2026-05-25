/* WashList — App root */
const { useState: useStateApp, useEffect: useEffectApp } = React;
const { Sidebar, Topbar } = window.WashListShell;
const ScanView = window.WashListScanView;
const DuplicatesView = window.WashListDuplicatesView;
const { LibraryView, CompareView, GraphView, HistoryView, SettingsView } = window.WashListViews;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "violet",
  "displayWeight": 600,
  "showBackgroundWaves": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_COLORS = {
  mint:   { primary: '#5EFFA8', dim: 'rgba(94,255,168,0.10)',   brd: 'rgba(94,255,168,0.28)' },
  cyan:   { primary: '#6FE8FF', dim: 'rgba(111,232,255,0.10)',  brd: 'rgba(111,232,255,0.28)' },
  violet: { primary: '#B89CFF', dim: 'rgba(184,156,255,0.12)',  brd: 'rgba(184,156,255,0.32)' },
  amber:  { primary: '#FFC369', dim: 'rgba(255,195,105,0.10)',  brd: 'rgba(255,195,105,0.30)' },
};

function applyAccent(value) {
  const a = ACCENT_COLORS[value] || ACCENT_COLORS.mint;
  const root = document.documentElement;
  root.style.setProperty('--mint', a.primary);
  root.style.setProperty('--mint-bg', a.dim);
  root.style.setProperty('--mint-brd', a.brd);
}

function applyDensity(value) {
  document.documentElement.dataset.density = value;
}

function App() {
  const initial = (() => {
    const hash = location.hash.replace('#', '');
    return ['library','scan','duplicates','compare','graph','history','settings'].includes(hash) ? hash : 'scan';
  })();
  const [route, setRoute] = useStateApp(initial);
  const lang = window.WL ? window.WL.useLang() : 'en'; // forces re-render on lang change
  const [tweaks, setTweaks] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  useEffectApp(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffectApp(() => {
    applyAccent(tweaks.accent);
    document.documentElement.style.setProperty('--display-weight', tweaks.displayWeight);
    applyDensity(tweaks.density);
  }, [tweaks.accent, tweaks.displayWeight, tweaks.density]);

  useEffectApp(() => {
    location.hash = route;
  }, [route]);

  useEffectApp(() => {
    const c = document.getElementById('bg-canvas');
    if (c) c.style.display = tweaks.showBackgroundWaves ? 'block' : 'none';
  }, [tweaks.showBackgroundWaves]);

  let body = null;
  switch (route) {
    case 'library':    body = <LibraryView onRoute={setRoute} />; break;
    case 'scan':       body = <ScanView />; break;
    case 'duplicates': body = <DuplicatesView />; break;
    case 'compare':    body = <CompareView />; break;
    case 'graph':      body = <GraphView />; break;
    case 'history':    body = <HistoryView />; break;
    case 'settings':   body = <SettingsView />; break;
    default:           body = <ScanView />;
  }

  return (
    <div className="app">
      <Sidebar route={route} onRoute={setRoute} />
      <div className="main">
        <Topbar route={route} />
        {body}
      </div>

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Accent" />
          <window.TweakRadio
            label="Color"
            value={tweaks.accent}
            onChange={(v) => setTweaks('accent', v)}
            options={[
              { value: 'mint', label: 'Mint' },
              { value: 'cyan', label: 'Cyan' },
              { value: 'violet', label: 'Violet' },
              { value: 'amber', label: 'Amber' },
            ]}
          />
          <window.TweakSection label="Typography" />
          <window.TweakRadio
            label="Display weight"
            value={tweaks.displayWeight}
            onChange={(v) => setTweaks('displayWeight', v)}
            options={[
              { value: 400, label: 'Reg' },
              { value: 500, label: 'Med' },
              { value: 600, label: 'Semi' },
              { value: 700, label: 'Bold' },
            ]}
          />
          <window.TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweaks('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Comfy' },
            ]}
          />
          <window.TweakSection label="Background" />
          <window.TweakToggle
            label="Mouse waveform"
            value={tweaks.showBackgroundWaves}
            onChange={(v) => setTweaks('showBackgroundWaves', v)}
          />
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
