/* ============================================================
   interactions.js — tactile micro-interactions
   3D tilt cards · cursor spotlight · clickable nodes · chapter tint
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function go(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.WPS_SCROLL_TO) window.WPS_SCROLL_TO(id);
    else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ---------- Clickable product nodes ---------- */
  document.querySelectorAll('.node[data-target]').forEach(function (node) {
    node.addEventListener('click', function () { go(node.dataset.target); });
    node.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(node.dataset.target); }
    });
  });

  /* ---------- 3D tilt on .tilt cards ---------- */
  if (fine && !reduceMotion) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      const MAX = 9, lift = card.classList.contains('node') ? 6 : 5;
      let raf = null, tx = 0, ty = 0;
      function apply() {
        card.style.transform = 'perspective(900px) rotateX(' + ty + 'deg) rotateY(' + tx + 'deg) translateY(-' + lift + 'px)';
        raf = null;
      }
      card.addEventListener('pointermove', function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tx = px * MAX; ty = -py * MAX;
        // glossy light position
        card.style.setProperty('--mx', (px * 100 + 50) + '%');
        card.style.setProperty('--my', (py * 100 + 50) + '%');
        if (!raf) raf = requestAnimationFrame(apply);
      });
      card.addEventListener('pointerleave', function () {
        if (raf) cancelAnimationFrame(raf), raf = null;
        card.style.transform = '';
      });
    });
  }

  /* ---------- Cursor spotlight ---------- */
  const spot = document.getElementById('spotlight');
  if (spot && fine && !reduceMotion) {
    let sx = window.innerWidth / 2, sy = window.innerHeight / 2, cx = sx, cy = sy, on = false;
    window.addEventListener('pointermove', function (e) {
      sx = e.clientX; sy = e.clientY;
      if (!on) { on = true; spot.classList.add('live'); }
    });
    (function loop() {
      cx += (sx - cx) * 0.12; cy += (sy - cy) * 0.12;
      spot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Per-chapter ambient tint ---------- */
  const TINT = {
    hero:     ['#4d8dff', '#a06bff'],
    chaos:    ['#ff6a6a', '#7a6bff'],
    suite:    ['#4d8dff', '#a06bff'],
    writer:   ['#4d8dff', '#6fb6ff'],
    sheets:   ['#2fe3a6', '#4d8dff'],
    slides:   ['#ffb45e', '#a06bff'],
    pdf:      ['#ff7a7a', '#a06bff'],
    ai:       ['#a06bff', '#4fd9ff'],
    workflow: ['#4d8dff', '#a06bff'],
    usecases: ['#4fd9ff', '#a06bff'],
    why:      ['#4d8dff', '#a06bff'],
    faq:      ['#7a6bff', '#4d8dff'],
    cta:      ['#a06bff', '#4d8dff']
  };
  window.WPS_SET_TINT = function (id) {
    const t = TINT[id]; if (!t) return;
    document.documentElement.style.setProperty('--tint-a', t[0]);
    document.documentElement.style.setProperty('--tint-b', t[1]);
  };

  /* ---------- Magnetic chapter-nav items ---------- */
  if (fine && !reduceMotion) {
    document.querySelectorAll('.chapter-nav .nav-item').forEach(function (it) {
      it.addEventListener('pointermove', function (e) {
        const r = it.getBoundingClientRect();
        it.style.transform = 'translate(' + (e.clientX - (r.left + r.width / 2)) * 0.15 + 'px,' + (e.clientY - (r.top + r.height / 2)) * 0.25 + 'px)';
      });
      it.addEventListener('pointerleave', function () { it.style.transform = ''; });
    });
  }
})();
