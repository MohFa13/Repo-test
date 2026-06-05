/* ============================================================
   Layout — background scene, mission-control nav, topbar, hero
   ============================================================ */

/* ---------- Generated hero key-art (base layer under the live WebGL) ---------- */
.keyart {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: url("../assets/keyart-hero.png") center/cover no-repeat;
  will-change: opacity, transform;
}

/* ---------- Per-chapter ambient tint (animated custom props) ---------- */
@property --tint-a { syntax: "<color>"; inherits: true; initial-value: #4d8dff; }
@property --tint-b { syntax: "<color>"; inherits: true; initial-value: #a06bff; }
:root { --tint-a: #4d8dff; --tint-b: #a06bff; }
.scene-tint {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(75% 55% at 28% 18%, color-mix(in oklch, var(--tint-a) 16%, transparent), transparent 62%),
    radial-gradient(70% 60% at 80% 88%, color-mix(in oklch, var(--tint-b) 15%, transparent), transparent 64%);
  transition: --tint-a 1.1s var(--ease-out), --tint-b 1.1s var(--ease-out);
}
:root.no-motion .scene-tint { transition: none; }

/* ---------- Cursor spotlight ---------- */
.spotlight {
  position: fixed; left: 0; top: 0; width: 520px; height: 520px; z-index: 1;
  margin: -260px 0 0 -260px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, color-mix(in oklch, var(--accent-a) 14%, transparent), transparent 65%);
  opacity: 0; transition: opacity 0.6s ease; mix-blend-mode: screen;
  transform: translate3d(0,0,0); will-change: transform;
}
@media (hover: hover) and (pointer: fine) { .spotlight.live { opacity: 1; } }

/* ---------- Fixed WebGL background ---------- */
#bg-scene {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s ease;
}
#bg-scene.ready { opacity: 1; }

/* vignette + grain over everything for cinematic depth */
.atmosphere {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(120% 80% at 50% -10%, transparent 40%, rgba(5,6,13,0.55) 100%),
    radial-gradient(100% 60% at 50% 110%, color-mix(in oklch, var(--accent-b) 9%, transparent), transparent 60%);
  mix-blend-mode: normal;
}

main, .topbar, .chapter-nav, footer { position: relative; z-index: 2; }

/* ---------- Topbar ---------- */
.topbar {
  position: fixed; top: 0; left: 0; right: 0; height: 72px; z-index: 60;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(18px, 4vw, 48px);
  transition: background 0.5s var(--ease-out), border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.topbar.scrolled {
  background: color-mix(in oklch, var(--bg-0) 72%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--glass-border);
}
.brand { display: flex; align-items: center; gap: 12px; }
.brand-mark {
  width: 34px; height: 34px; border-radius: 10px;
  background: var(--accent-grad);
  display: grid; place-items: center;
  font-family: var(--font-display); font-weight: 700; color: #fff;
  box-shadow: 0 6px 22px -8px var(--glow-a);
  font-size: 1.05rem;
}
.brand-name { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; letter-spacing: -0.01em; }
.brand-name small { display: block; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.28em; color: var(--text-faint); font-weight: 500; margin-top: 1px; }
.topbar .btn { font-size: 0.9rem; padding: 0.7em 1.3em; }
.topbar-cta { display: flex; align-items: center; gap: 18px; }
.affil-tag { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.18em; color: var(--text-faint); }
@media (max-width: 720px) { .affil-tag { display: none; } }

/* ---------- Mission-control chapter nav ---------- */
.chapter-nav {
  position: fixed; top: 50%; right: clamp(14px, 2.2vw, 30px);
  transform: translateY(-50%); z-index: 55;
  display: flex; flex-direction: column; gap: 2px;
  padding: 14px 12px;
  border-radius: 20px;
  background: color-mix(in oklch, var(--bg-1) 55%, transparent);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  opacity: 0; transform: translateY(-50%) translateX(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.chapter-nav.show { opacity: 1; transform: translateY(-50%) translateX(0); }
.chapter-nav::before {
  content: "MISSION"; position: absolute; top: -22px; left: 0; right: 0;
  text-align: center; font-family: var(--font-mono); font-size: 0.55rem;
  letter-spacing: 0.34em; color: var(--text-faint);
}

.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 12px;
  background: transparent; border: 0; color: var(--text-faint);
  position: relative; transition: color 0.35s var(--ease-out), background 0.35s;
}
.nav-item:hover { color: var(--text-dim); background: var(--glass); }
.nav-num { font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.06em; width: 18px; text-align: right; }
.nav-ico { width: 18px; height: 18px; flex: 0 0 18px; opacity: 0.7; transition: opacity 0.35s; }
.nav-label {
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.16em;
  text-transform: uppercase; white-space: nowrap;
  max-width: 0; overflow: hidden; opacity: 0;
  transition: max-width 0.4s var(--ease-out), opacity 0.4s var(--ease-out);
}
.chapter-nav:hover .nav-label { max-width: 90px; opacity: 1; }
.nav-item[aria-current="true"] {
  color: var(--text);
  background: var(--glass-2);
}
.nav-item[aria-current="true"] .nav-ico { opacity: 1; }
.nav-item[aria-current="true"]::before {
  content: ""; position: absolute; left: -12px; top: 50%; transform: translateY(-50%);
  width: 3px; height: 60%; border-radius: 3px; background: var(--accent-grad);
  box-shadow: 0 0 14px var(--glow-a);
}
.nav-item[aria-current="true"] .nav-ico { color: var(--accent-a); }

/* scroll progress ring on nav top */
.nav-progress { height: 3px; border-radius: 3px; background: var(--glass-border); margin: 4px 6px 8px; overflow: hidden; }
.nav-progress > i { display: block; height: 100%; width: 0%; background: var(--accent-grad); }

@media (max-width: 860px) {
  .chapter-nav {
    top: auto; bottom: 14px; right: 50%; transform: translateX(50%) translateY(20px);
    flex-direction: row; gap: 0; padding: 8px 10px; border-radius: 16px;
    max-width: calc(100vw - 28px); overflow-x: auto;
  }
  .chapter-nav.show { transform: translateX(50%) translateY(0); }
  .chapter-nav::before { display: none; }
  .nav-progress { display: none; }
  .nav-label { display: none; }
  .nav-item[aria-current="true"]::before { left: 50%; top: auto; bottom: -6px; transform: translateX(-50%); width: 60%; height: 3px; }
}

/* ---------- Section frame ---------- */
.section {
  position: relative;
  padding: clamp(90px, 13vh, 170px) clamp(20px, 6vw, 90px);
  scroll-margin-top: 84px;
}
.wrap { max-width: var(--maxw); margin: 0 auto; width: 100%; }

.chapter-tag {
  display: inline-flex; align-items: center; gap: 12px; margin-bottom: 26px;
}
.chapter-tag .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent-grad); box-shadow: 0 0 12px var(--glow-a); }
.chapter-tag .line { width: 46px; height: 1px; background: linear-gradient(90deg, var(--accent-a), transparent); }

.eyebrow { /* mono chapter index */ }

.section-title {
  font-size: clamp(2.4rem, 6vw, 5.4rem);
  letter-spacing: -0.03em;
  margin-bottom: 0.4em;
}
.section-lead {
  font-size: clamp(1.05rem, 1.5vw, 1.4rem);
  color: var(--text-dim);
  max-width: 60ch;
  line-height: 1.6;
}

/* reveal helpers (GSAP toggles .in) */
.reveal { opacity: 0; transform: translateY(34px); }
.reveal.in { opacity: 1; transform: none; transition: opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out); }
.reveal-d1.in { transition-delay: 0.08s; }
.reveal-d2.in { transition-delay: 0.16s; }
.reveal-d3.in { transition-delay: 0.24s; }

/* ---------- HERO ---------- */
#hero {
  min-height: 100svh; display: flex; flex-direction: column; justify-content: center;
  padding-top: 72px; text-align: center; align-items: center;
}
.hero-inner { max-width: 1000px; }
.hero-kicker {
  display: inline-flex; align-items: center; gap: 10px; margin-bottom: 30px;
  padding: 8px 16px; border-radius: 999px;
  background: var(--glass); border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}
.hero-kicker .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.3; } }
.hero-kicker span { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; color: var(--text-dim); }

#hero h1 {
  font-size: clamp(2.9rem, 8.5vw, 7.4rem);
  line-height: 0.98; letter-spacing: -0.04em; margin-bottom: 0.32em;
}
#hero h1 .grad-text { display: inline-block; }
.hero-sub {
  font-size: clamp(1.05rem, 1.7vw, 1.5rem);
  color: var(--text-dim); max-width: 60ch; margin: 0 auto 2.4em;
  line-height: 1.6;
}
.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.hero-words span { display: inline-block; }

.scroll-cue {
  position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.28em; color: var(--text-faint);
}
.scroll-cue .track { width: 1px; height: 46px; background: linear-gradient(var(--accent-a), transparent); position: relative; overflow: hidden; }
.scroll-cue .track::after { content:""; position:absolute; top:-50%; left:0; width:100%; height:50%; background: #fff; animation: cueDrop 2.2s var(--ease-io) infinite; }
@keyframes cueDrop { 0%{ transform: translateY(-100%);} 60%,100%{ transform: translateY(300%);} }

/* hero floating stat chips */
.hero-stats { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; margin-top: 3.4em; }
.hero-stat { text-align: center; }
.hero-stat b { display: block; font-family: var(--font-display); font-size: clamp(1.5rem,2.4vw,2.2rem); }
.hero-stat span { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.18em; color: var(--text-faint); text-transform: uppercase; }

/* ---------- Footer ---------- */
footer {
  padding: 70px clamp(20px, 6vw, 90px) 60px;
  border-top: 1px solid var(--glass-border);
  background: var(--bg-1);
}
.footer-grid { max-width: var(--maxw); margin: 0 auto; display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.affil-disclosure {
  max-width: var(--maxw); margin: 38px auto 0; padding-top: 26px;
  border-top: 1px solid var(--glass-border);
  font-size: 0.82rem; color: var(--text-faint); line-height: 1.6;
}
.affil-disclosure b { color: var(--text-dim); font-weight: 600; }
footer .foot-links { display: flex; gap: 22px; flex-wrap: wrap; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.08em; color: var(--text-faint); }
footer .foot-links a:hover { color: var(--text); }

/* tweaks: motion off */
:root.no-motion .scroll-cue .track::after,
:root.no-motion .hero-kicker .pulse,
:root.no-motion .ai-core,
:root.no-motion .writer-caret { animation: none !important; }
:root.no-motion .ai-core { transform: none !important; }

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; }
  .scroll-cue .track::after, .hero-kicker .pulse { animation: none !important; }
  * { scroll-behavior: auto !important; }
}
