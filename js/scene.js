/* ============================================================
   scene.js — Three.js cinematic background (hero)
   Floating documents + particle field + perspective grid.
   Exposes window.WPS_SCENE.setAccent(a,b)
   ============================================================ */
(function () {
  const canvas = document.getElementById('bg-scene');
  if (!canvas || typeof THREE === 'undefined') { if (canvas) canvas.style.display = 'none'; return; }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cssColor(varName, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return new THREE.Color(v || fallback);
  }
  let accentA = cssColor('--accent-a', '#4d8dff');
  let accentB = cssColor('--accent-b', '#a06bff');

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060d, 0.055);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.PointLight(accentA.getHex(), 1.4, 60); key.position.set(-6, 6, 8); scene.add(key);
  const fill = new THREE.PointLight(accentB.getHex(), 1.2, 60); fill.position.set(7, -4, 6); scene.add(fill);

  const root = new THREE.Group();
  scene.add(root);

  /* ---------- document texture ---------- */
  function docTexture(stripe) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 340;
    const x = c.getContext('2d');
    x.fillStyle = '#10131f'; x.fillRect(0, 0, 256, 340);
    const g = x.createLinearGradient(0, 0, 256, 340);
    g.addColorStop(0, '#1a2036'); g.addColorStop(1, '#0d1020');
    x.fillStyle = g; x.fillRect(0, 0, 256, 340);
    x.strokeStyle = 'rgba(255,255,255,0.10)'; x.lineWidth = 2; x.strokeRect(2, 2, 252, 336);
    x.fillStyle = stripe; x.fillRect(28, 30, 120, 14);              // title bar (accent)
    x.fillStyle = 'rgba(255,255,255,0.16)';
    const ws = [200, 180, 210, 150, 190, 120, 200, 160];
    ws.forEach(function (w, i) { x.fillRect(28, 70 + i * 26, w, 8); });
    x.fillStyle = stripe; x.globalAlpha = 0.5; x.fillRect(28, 70 + 8 * 26, 90, 8); x.globalAlpha = 1;
    const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
  }
  const stripes = ['#4d8dff', '#2fe3a6', '#ff7a7a', '#ffb45e', '#4fd9ff', '#a06bff'];
  const texCache = stripes.map(docTexture);

  /* ---------- floating documents ---------- */
  const docs = [];
  const DOC_N = window.innerWidth < 720 ? 7 : 12;
  for (let i = 0; i < DOC_N; i++) {
    const geo = new THREE.PlaneGeometry(1.5, 2.0);
    const mat = new THREE.MeshStandardMaterial({
      map: texCache[i % texCache.length], roughness: 0.65, metalness: 0.1,
      transparent: true, opacity: 0.96, side: THREE.DoubleSide
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 10 - 2);
    m.rotation.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.35);
    m.userData = {
      spin: (Math.random() - 0.5) * 0.18,
      bob: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      baseY: m.position.y
    };
    root.add(m); docs.push(m);
  }

  /* ---------- particle field ---------- */
  const P = 700;
  const pgeo = new THREE.BufferGeometry();
  const pos = new Float32Array(P * 3);
  const col = new Float32Array(P * 3);
  for (let i = 0; i < P; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 34;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 4;
    const cc = Math.random() < 0.5 ? accentA : accentB;
    col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
  }
  pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pgeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pmat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
  const points = new THREE.Points(pgeo, pmat);
  scene.add(points);

  /* ---------- perspective grid floor ---------- */
  const grid = new THREE.GridHelper(60, 60, accentA.getHex(), 0x2a2f4a);
  grid.material.transparent = true; grid.material.opacity = 0.18;
  grid.position.y = -6.5; scene.add(grid);
  const grid2 = new THREE.GridHelper(60, 60, accentB.getHex(), 0x2a2f4a);
  grid2.material.transparent = true; grid2.material.opacity = 0.12;
  grid2.position.y = 7.5; scene.add(grid2);

  /* ---------- interaction / scroll ---------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', function (e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5);
    mouse.ty = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  let scrollProg = 0; // 0..1 across hero
  function updateScroll() {
    scrollProg = Math.min(window.scrollY / (window.innerHeight * 1.1), 1.4);
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let running = true;

  function frame() {
    if (!running) return;
    const t = clock.getElapsedTime();
    // camera parallax + scroll dolly
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    camera.position.x = mouse.x * 2.2;
    camera.position.y = -mouse.y * 1.4 + scrollProg * 2.0;
    camera.position.z = 9 - scrollProg * 4.5;
    camera.lookAt(0, scrollProg * 1.2, 0);

    root.rotation.y = t * 0.02 + mouse.x * 0.1;
    docs.forEach(function (m) {
      m.rotation.y += m.userData.spin * 0.01;
      m.position.y = m.userData.baseY + Math.sin(t * 0.6 + m.userData.phase) * m.userData.bob;
    });
    points.rotation.y = t * 0.012;
    grid.position.z = ((t * 0.6) % 2) - 1;
    grid2.position.z = ((t * 0.5) % 2) - 1;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(frame);
  }

  let rafId = null;
  function start() { if (!running) { running = true; clock.start(); } if (!rafId) rafId = requestAnimationFrame(frame); }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId), rafId = null; }

  // pause when tab hidden or scrolled far past hero (perf)
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight * 2.4) { if (running) stop(); }
    else { if (!running) start(); }
  }, { passive: true });

  // reveal
  requestAnimationFrame(function () { canvas.classList.add('ready'); });

  if (reduceMotion) {
    renderer.render(scene, camera);   // single static frame
  } else {
    start();
  }

  /* ---------- public API (tweaks) ---------- */
  window.WPS_SCENE = {
    setAccent: function (a, b) {
      accentA = new THREE.Color(a); accentB = new THREE.Color(b);
      key.color = accentA.clone(); fill.color = accentB.clone();
      grid.material.color = accentA.clone(); grid2.material.color = accentB.clone();
      const arr = pgeo.attributes.color.array;
      for (let i = 0; i < P; i++) {
        const cc = Math.random() < 0.5 ? accentA : accentB;
        arr[i * 3] = cc.r; arr[i * 3 + 1] = cc.g; arr[i * 3 + 2] = cc.b;
      }
      pgeo.attributes.color.needsUpdate = true;
      if (reduceMotion) renderer.render(scene, camera);
    },
    setMotion: function (on) { if (reduceMotion) return; on ? start() : (stop(), renderer.render(scene, camera)); }
  };
})();
