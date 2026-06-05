/* ============================================================
   loops.js — generated looping "video" for the AI climax.
   Animated telemetry waveform + equalizer, brand-tinted.
   ============================================================ */
(function () {
  const canvas = document.getElementById('ai-video');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function accent(v, fb) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fb;
  }

  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener('resize', size);

  function draw(t) {
    const A = accent('--accent-a', '#4d8dff');
    const B = accent('--accent-b', '#a06bff');
    ctx.clearRect(0, 0, W, H);

    // equalizer bars (bottom)
    const bars = 42, bw = W / bars;
    for (let i = 0; i < bars; i++) {
      const n = Math.sin(t * 0.0016 + i * 0.5) * 0.5 + 0.5;
      const n2 = Math.sin(t * 0.0009 + i * 0.27) * 0.5 + 0.5;
      const h = (0.12 + n * n2 * 0.8) * H * 0.42;
      const g = ctx.createLinearGradient(0, H, 0, H - h);
      g.addColorStop(0, A); g.addColorStop(1, B);
      ctx.fillStyle = g; ctx.globalAlpha = 0.65;
      ctx.fillRect(i * bw + bw * 0.18, H - h, bw * 0.64, h);
    }
    ctx.globalAlpha = 1;

    // flowing waveforms (center)
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      const amp = 26 - w * 6, freq = 0.012 + w * 0.004, sp = t * (0.002 + w * 0.0007);
      for (let x = 0; x <= W; x += 6) {
        const y = H * 0.42 + Math.sin(x * freq + sp) * amp * Math.sin(x * 0.004 + t * 0.001);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = w % 2 ? B : A;
      ctx.globalAlpha = 0.5 - w * 0.12; ctx.lineWidth = 2 - w * 0.4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // scanning vertical beam
    const sx = ((t * 0.06) % (W + 120)) - 60;
    const beam = ctx.createLinearGradient(sx - 40, 0, sx + 40, 0);
    beam.addColorStop(0, 'rgba(255,255,255,0)');
    beam.addColorStop(0.5, B); beam.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalAlpha = 0.35; ctx.fillStyle = beam; ctx.fillRect(sx - 40, 0, 80, H * 0.5);
    ctx.globalAlpha = 1;
  }

  let raf = null, running = false;
  function loop(t) { if (!running) return; draw(t); raf = requestAnimationFrame(loop); }
  function start() { if (!running) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf), raf = null; }

  // only run while the AI section is on screen
  const io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (e.isIntersecting && !reduceMotion && !document.documentElement.classList.contains('no-motion')) start();
      else stop();
    });
  }, { threshold: 0.05 });
  io.observe(document.getElementById('ai'));

  // honor the Tweaks motion toggle
  window.WPS_AIVIDEO = {
    setMotion: function (on) {
      if (reduceMotion) { draw(0); return; }
      if (on && document.getElementById('ai').getBoundingClientRect().top < window.innerHeight) start();
      else { stop(); draw(0); }
    }
  };

  // static frame for reduced motion
  if (reduceMotion) draw(1200);
})();
