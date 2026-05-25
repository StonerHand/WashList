/* Waveform / audio-spectrum background — Canvas2D, mouse-reactive
   Renders a field of horizontal "track" lines that animate as sine waves.
   Mouse acts as a magnet: nearby waves rise in amplitude. */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(canvas, opts = {}) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;

    const cfg = Object.assign({
      lineColor: 'rgba(94, 255, 168, 0.55)',  // mint
      lineDim:   'rgba(255, 255, 255, 0.05)',
      accentColor: 'rgba(111, 232, 255, 0.7)', // cyan
      density: 36,           // number of lines
      mouseRadius: 280,
      amplitude: 14,
      mouseAmp: 64,
      speed: 0.35,
      thickness: 1.2,
    }, opts);

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let mx = -9999, my = -9999;
    let targetMx = -9999, targetMy = -9999;
    let t = 0;
    let raf = 0;
    let running = true;

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      targetMx = e.clientX - r.left;
      targetMy = e.clientY - r.top;
    }
    function onLeave() {
      targetMx = -9999;
      targetMy = -9999;
    }
    function onTouch(e) {
      if (!e.touches.length) return;
      const r = canvas.getBoundingClientRect();
      targetMx = e.touches[0].clientX - r.left;
      targetMy = e.touches[0].clientY - r.top;
    }

    function draw() {
      if (!running) return;
      // smooth mouse
      mx += (targetMx - mx) * 0.12;
      my += (targetMy - my) * 0.12;
      t += reduceMotion ? 0 : 0.014 * cfg.speed * 6;

      ctx.clearRect(0, 0, W, H);

      const lines = cfg.density;
      const gap = H / lines;

      for (let i = 0; i < lines; i++) {
        const baseY = gap * i + gap * 0.5;
        const distFromMouseY = Math.abs(baseY - my);
        const verticalFalloff = Math.max(0, 1 - distFromMouseY / cfg.mouseRadius);

        // segments
        const segments = 64;
        const segW = W / segments;
        ctx.beginPath();

        for (let s = 0; s <= segments; s++) {
          const x = s * segW;
          const dx = x - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / cfg.mouseRadius);
          const ampMouse = proximity * proximity * cfg.mouseAmp;

          // base sine + secondary harmonic
          const phase = t + i * 0.42;
          const f = 0.012;
          const baseSine = Math.sin(x * f + phase) * cfg.amplitude
                         + Math.sin(x * f * 2.1 + phase * 1.7) * cfg.amplitude * 0.4;

          // mouse-driven bulge (gaussian-ish)
          const bulge = Math.sin(x * 0.05 - t * 2) * ampMouse;

          const y = baseY + baseSine * (0.5 + verticalFalloff * 0.5) + bulge;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // color: dim base, intensify near mouse
        const intensity = Math.min(1, verticalFalloff * 1.4);
        const alpha = 0.05 + intensity * 0.55;
        ctx.strokeStyle = blendColor(cfg.lineDim, cfg.lineColor, intensity);
        ctx.globalAlpha = alpha + 0.05;
        ctx.lineWidth = cfg.thickness + intensity * 1.2;
        ctx.stroke();
      }

      // mouse glow halo
      if (mx > -1000) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, cfg.mouseRadius * 0.9);
        g.addColorStop(0, 'rgba(94, 255, 168, 0.10)');
        g.addColorStop(0.5, 'rgba(111, 232, 255, 0.04)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, cfg.mouseRadius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function blendColor(c1, c2, t) {
      // very rough — just return c2 if t > .5 else c1; good enough for stroke
      return t > 0.25 ? c2 : c1;
    }

    function start() {
      if (reduceMotion) {
        // draw one static frame
        draw();
        running = false;
        return;
      }
      running = true;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    const target = opts.eventTarget || window;
    target.addEventListener('mousemove', onMove, { passive: true });
    target.addEventListener('mouseleave', onLeave, { passive: true });
    target.addEventListener('touchmove', onTouch, { passive: true });
    start();

    return { stop, resize, setMouse: (x,y) => { targetMx = x; targetMy = y; } };
  }

  window.WashListWaveform = { init };
})();
