/* ============================================================
   story.js — scroll engine, chapter nav, scene choreography
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Lenis smooth scroll ---------------- */
  let lenis = null;
  if (!reduceMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 1, smoothWheel: true });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      // Pins (#slides, #pdf) + dynamically-built content grow the page AFTER
      // Lenis init. Recompute Lenis's scroll limit on every ScrollTrigger refresh,
      // otherwise the bottom of the page becomes unreachable by smooth scroll.
      ScrollTrigger.addEventListener('refresh', function () { lenis.resize(); });
    } else {
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  }
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 8, behavior: 'auto' });
  }
  window.WPS_SCROLL_TO = scrollToId;

  /* ---------------- Topbar + nav reveal + progress ---------------- */
  const topbar = document.getElementById('topbar');
  const nav = document.getElementById('chapter-nav');
  const bgScene = document.getElementById('bg-scene');
  const keyart = document.getElementById('keyart');
  if (bgScene && !reduceMotion) bgScene.style.transition = 'opacity 0.35s linear';
  if (keyart) keyart.style.transition = 'opacity 0.5s linear';
  const progress = nav ? nav.querySelector('.nav-progress > i') : null;
  function onScroll() {
    const y = window.pageYOffset;
    topbar.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('show', y > window.innerHeight * 0.6);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = Math.min(100, (y / max) * 100) + '%';
    }
    // fade the WebGL backdrop + key-art out as we leave the hero (clamped: full at top)
    const s = window.innerHeight * 0.55, e = window.innerHeight * 1.15;
    const k = Math.min(1, Math.max(0, (y - s) / (e - s)));
    if (bgScene && bgScene.classList.contains('ready')) bgScene.style.opacity = (1 - k * 0.86).toFixed(3);
    if (keyart) { keyart.style.opacity = (1 - k).toFixed(3); keyart.style.transform = 'translateY(' + (k * -6) + '%)'; }
    if (y < window.innerHeight * 0.5 && window.WPS_SET_TINT) window.WPS_SET_TINT('hero');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Nav clicks + active state ---------------- */
  const navItems = Array.prototype.slice.call(nav.querySelectorAll('.nav-item'));
  navItems.forEach(function (it) {
    it.addEventListener('click', function () { scrollToId(it.dataset.target); });
  });
  function setActive(id) {
    navItems.forEach(function (it) {
      it.setAttribute('aria-current', it.dataset.target === id ? 'true' : 'false');
    });
    if (window.WPS_SET_TINT) window.WPS_SET_TINT(id);
  }
  // smooth-scroll all in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      if (id && document.getElementById(id)) { e.preventDefault(); scrollToId(id); }
    });
  });

  if (hasGSAP) {
    (window.WPS_CHAPTERS || []).forEach(function (c) {
      ScrollTrigger.create({
        trigger: '#' + c.id, start: 'top 55%', end: 'bottom 45%',
        onToggle: function (self) { if (self.isActive) setActive(c.id); }
      });
    });
  }

  /* ---------------- Reveals (rAF-driven, layout-based — bulletproof) ---------------- */
  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('in'); });
  } else {
    const revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal:not(.in)'));
    function checkReveals() {
      const trig = window.innerHeight * 0.9;
      for (let i = revealEls.length - 1; i >= 0; i--) {
        const r = revealEls[i].getBoundingClientRect();
        if (r.top < trig && r.bottom > -200) { revealEls[i].classList.add('in'); revealEls.splice(i, 1); }
      }
      if (revealEls.length) requestAnimationFrame(checkReveals);
    }
    requestAnimationFrame(checkReveals);
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (!reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + mx * 0.22 + 'px,' + my * 0.32 + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------------- Background fade after hero ---------------- */
  /* ---------------- Background handled in onScroll (clamped fade) ---------------- */

  /* ====================================================================
     Scene-specific animations
     ==================================================================== */
  if (hasGSAP && !reduceMotion) {

    /* CH01 chaos parallax */
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      const s = parseFloat(el.dataset.parallax || '12');
      gsap.to(el, {
        yPercent: s, ease: 'none',
        scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    gsap.utils.toArray('#chaos-stage .file-card').forEach(function (card) {
      const depth = parseFloat(card.dataset.depth || '1');
      gsap.to(card, {
        yPercent: -depth * 26, xPercent: (depth - 1.5) * 8, ease: 'none',
        scrollTrigger: { trigger: '#chaos', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    gsap.from('#chaos-stage .friction-tag', {
      opacity: 0, scale: 0.7, stagger: 0.12, duration: 0.6,
      scrollTrigger: { trigger: '#chaos-stage', start: 'top 70%' }
    });

    /* CH02 suite nodes */
    gsap.from('#node-grid .node', {
      y: 46, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '#node-grid', start: 'top 82%' }
    });

    /* CH03 writer lines draw */
    gsap.from('.writer-doc .doc-line', {
      scaleX: 0, transformOrigin: 'left', stagger: 0.1, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: '#writer', start: 'top 65%' }
    });
    gsap.from('.ai-suggest', {
      y: 16, opacity: 0, duration: 0.6, delay: 0.6,
      scrollTrigger: { trigger: '#writer', start: 'top 65%' }
    });

    /* CH04 sheets: fill cells + chart rise */
    gsap.from('#sheet-mock .sheet-cell.fill', {
      backgroundColor: 'rgba(255,255,255,0)', stagger: 0.08, duration: 0.5,
      scrollTrigger: { trigger: '#sheet-mock', start: 'top 72%' }
    });
    document.querySelectorAll('#chart-rise .bar').forEach(function (b) {
      b.style.height = b.style.getPropertyValue('--h') || '60%';
    });
    gsap.fromTo('#chart-rise .bar', { scaleY: 0 }, {
      scaleY: 1, transformOrigin: 'bottom', stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '#chart-rise', start: 'top 80%' }
    });

    /* CH05 slides — horizontal pinned scroll (desktop) */
    const track = document.getElementById('slides-track');
    if (track && window.matchMedia('(min-width: 760px)').matches) {
      gsap.to(track, {
        x: function () { return -(track.scrollWidth - window.innerWidth + 90); },
        ease: 'none',
        scrollTrigger: {
          trigger: '#slides', start: 'top top', pin: true, anticipatePin: 1, scrub: 1,
          end: function () { return '+=' + (track.scrollWidth - window.innerWidth + 200); },
          invalidateOnRefresh: true
        }
      });
    } else if (track) {
      track.parentElement.style.overflowX = 'auto';
      track.parentElement.style.paddingInline = 'clamp(20px,6vw,90px)';
    }

    /* CH06 pdf — pinned sequence */
    setupPdf();

    /* CH07 ai prompts */
    gsap.from('.ai-prompt', {
      y: 22, opacity: 0, scale: 0.92, stagger: 0.1, duration: 0.55, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: '#ai-prompts', start: 'top 84%' }
    });

    /* CH08 workflow connect */
    setupWorkflow();

  } else {
    // reduced-motion static fallbacks
    const track = document.getElementById('slides-track');
    if (track) { track.parentElement.style.overflowX = 'auto'; track.parentElement.style.paddingInline = '20px'; }
    document.querySelectorAll('#chart-rise .bar').forEach(function (b) { b.style.height = b.style.getPropertyValue('--h') || '60%'; b.style.transform = 'none'; });
    const hl = document.getElementById('pdf-hl'); if (hl) { hl.style.opacity = 1; }
    const sign = document.getElementById('pdf-sign'); if (sign) sign.style.opacity = 1;
    document.querySelectorAll('.flow-node').forEach(function (n) { n.classList.add('lit'); });
    layoutFlow(true);
  }

  /* ---------------- PDF sequence ---------------- */
  function setupPdf() {
    const steps = Array.prototype.slice.call(document.querySelectorAll('#pdf-steps .pdf-step'));
    function setStep(i) {
      steps.forEach(function (s, k) { s.classList.toggle('active', k <= i); });
    }
    const signPath = document.querySelector('#pdf-sign path');
    let len = 200;
    if (signPath && signPath.getTotalLength) {
      len = signPath.getTotalLength();
      signPath.style.strokeDasharray = len; signPath.style.strokeDashoffset = len;
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#pdf', start: 'top top', end: '+=2600', scrub: 1,
        pin: '#pdf-pin', anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: function (self) { setStep(Math.min(4, Math.floor(self.progress * 5))); }
      }
    });
    tl.fromTo('#pdf-hl', { opacity: 0, scaleX: 0, transformOrigin: 'left' }, { opacity: 1, scaleX: 1, duration: 1 })
      .to('#pdf-convert', { opacity: 1, duration: 0.8 }, '+=0.4')
      .to('#pdf-convert', { opacity: 0, duration: 0.5 }, '+=0.5')
      .to('#pdf-sign', { opacity: 1, duration: 0.2 }, '<')
      .to(signPath, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut' }, '<')
      .to('#pdf-doc', { scale: 0.94, boxShadow: '0 0 80px -10px var(--glow-a)', duration: 0.8 }, '+=0.4');
  }

  /* ---------------- Workflow connect ---------------- */
  function layoutFlow(staticAll) {
    const stage = document.getElementById('flow-stage');
    if (!stage) return;
    const nodes = Array.prototype.slice.call(stage.querySelectorAll('.flow-node'));
    nodes.forEach(function (n) {
      n.style.left = n.dataset.x + '%';
      n.style.top = n.dataset.y + '%';
    });
    const svg = document.getElementById('flow-svg');
    const core = nodes.find(function (n) { return n.classList.contains('core'); });
    const cx = parseFloat(core.dataset.x) * 10, cy = parseFloat(core.dataset.y) * 4.6;
    // clear existing paths
    svg.querySelectorAll('path').forEach(function (p) { p.remove(); });
    const outers = nodes.filter(function (n) { return !n.classList.contains('core'); });
    return outers.map(function (n) {
      const x = parseFloat(n.dataset.x) * 10, y = parseFloat(n.dataset.y) * 4.6;
      const mx = (x + cx) / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M ' + x + ' ' + y + ' C ' + mx + ' ' + y + ', ' + mx + ' ' + cy + ', ' + cx + ' ' + cy);
      path.setAttribute('pathLength', '1');
      svg.appendChild(path);
      if (staticAll) path.style.strokeDashoffset = '0';
      return { path: path, node: n };
    });
  }
  function setupWorkflow() {
    const pairs = layoutFlow(false);
    if (!pairs) return;
    const core = document.querySelector('.flow-node.core');
    gsap.set(core, { opacity: 1 });
    gsap.set(core, { boxShadow: '0 0 40px -6px var(--glow-b)' });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#workflow', start: 'top 68%', end: 'bottom 70%', scrub: 1 }
    });
    pairs.forEach(function (p) {
      tl.to(p.node, { opacity: 1, borderColor: 'color-mix(in oklch, var(--accent-a) 55%, transparent)', boxShadow: '0 0 30px -8px var(--glow-a)', duration: 0.6 })
        .to(p.path, { strokeDashoffset: 0, duration: 0.9 }, '<0.1');
    });
  }

  /* keep ScrollTrigger + Lenis honest after fonts/images settle */
  if (hasGSAP) {
    function syncScroll() { ScrollTrigger.refresh(); if (lenis) lenis.resize(); }
    window.addEventListener('load', syncScroll);
    setTimeout(syncScroll, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncScroll);
  }
})();
