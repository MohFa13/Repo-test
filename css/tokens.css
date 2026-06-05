/* ============================================================
   WPS OFFICE — "Build Your Smart Office Workflow"
   Design system tokens — deep-space / mission-control
   ============================================================ */

:root {
  /* ---- Surfaces (cool near-black, low saturation) ---- */
  --bg-0: #05060d;   /* deepest void */
  --bg-1: #090b16;
  --bg-2: #0f1120;
  --bg-3: #161a2e;

  /* ---- Glass ---- */
  --glass: rgba(255, 255, 255, 0.035);
  --glass-2: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.09);
  --glass-border-strong: rgba(255, 255, 255, 0.16);
  --glass-blur: 18px;

  /* ---- Text ---- */
  --text: #eef1ff;
  --text-dim: #a7adcc;
  --text-faint: #686f96;

  /* ---- Accent system (blue -> purple lead, green = "go") ---- */
  --blue: #4d8dff;
  --purple: #a06bff;
  --green: #2fe3a6;
  --cyan: #4fd9ff;

  /* Tweakable accent pair — drives every gradient on the page */
  --accent-a: #4d8dff;
  --accent-b: #a06bff;
  --accent-grad: linear-gradient(115deg, var(--accent-a), var(--accent-b));
  --accent-grad-soft: linear-gradient(115deg,
                        color-mix(in oklch, var(--accent-a) 70%, transparent),
                        color-mix(in oklch, var(--accent-b) 70%, transparent));

  /* Glows */
  --glow-a: color-mix(in oklch, var(--accent-a) 55%, transparent);
  --glow-b: color-mix(in oklch, var(--accent-b) 55%, transparent);

  /* ---- Type ---- */
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Manrope", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* ---- Spacing / shape ---- */
  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 22px;
  --r-xl: 32px;
  --maxw: 1280px;
  --nav-w: 84px;

  /* motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-io: cubic-bezier(0.65, 0, 0.35, 1);
}

/* ---- Accent presets (set by Tweaks via [data-accent]) ---- */
:root[data-accent="blue"]    { --accent-a: #3f7bff; --accent-b: #6fb6ff; }
:root[data-accent="purple"]  { --accent-a: #8a5bff; --accent-b: #c06bff; }
:root[data-accent="green"]   { --accent-a: #14d6c4; --accent-b: #4ce08a; }
:root[data-accent="balanced"]{ --accent-a: #4d8dff; --accent-b: #a06bff; }

/* ============================================================ */
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; overflow-x: clip; }

body {
  margin: 0;
  background: var(--bg-0);
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: 0.01em;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin: 0;
  text-wrap: balance;
}

p { margin: 0; text-wrap: pretty; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }
img { display: block; max-width: 100%; }

::selection { background: color-mix(in oklch, var(--accent-b) 45%, transparent); color: #fff; }

/* ---- HUD / mono label ---- */
.hud {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.hud-accent {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.grad-text {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---- Reusable glass panel ---- */
.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-lg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

/* ---- Primary / secondary CTA buttons ---- */
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.01em;
  padding: 0.95em 1.6em;
  border-radius: 999px;
  border: 1px solid transparent;
  color: #fff;
  white-space: nowrap;
  transition: transform 0.45s var(--ease-out), box-shadow 0.45s var(--ease-out), background 0.3s, border-color 0.3s;
  will-change: transform;
}
.btn:active { transform: translateY(1px) scale(0.98); transition-duration: 0.08s; }
.btn--primary {
  background: var(--accent-grad);
  box-shadow: 0 8px 30px -8px var(--glow-a), 0 0 0 0 var(--glow-b);
}
.btn--primary:hover {
  box-shadow: 0 14px 50px -10px var(--glow-b), 0 0 60px -20px var(--glow-a);
}
.btn--ghost {
  background: var(--glass-2);
  border-color: var(--glass-border-strong);
  color: var(--text);
  backdrop-filter: blur(10px);
}
.btn--ghost:hover { border-color: color-mix(in oklch, var(--accent-a) 60%, transparent); }
.btn .arrow { transition: transform 0.4s var(--ease-out); }
.btn:hover .arrow { transform: translateX(4px); }

/* keep CTAs visibly focusable */
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
  border-radius: 6px;
}

/* themed scrollbar */
* { scrollbar-color: color-mix(in oklch, var(--accent-a) 50%, var(--bg-2)) transparent; scrollbar-width: thin; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg-1); }
::-webkit-scrollbar-thumb { background: color-mix(in oklch, var(--accent-a) 38%, var(--bg-3)); border-radius: 999px; border: 2px solid var(--bg-1); }
::-webkit-scrollbar-thumb:hover { background: color-mix(in oklch, var(--accent-b) 50%, var(--bg-3)); }

/* skip link */
.skip {
  position: fixed; left: 12px; top: -60px; z-index: 9999;
  background: var(--bg-2); color: var(--text); padding: 10px 16px;
  border-radius: 10px; border: 1px solid var(--glass-border);
  transition: top 0.25s var(--ease-out);
}
.skip:focus { top: 12px; }
