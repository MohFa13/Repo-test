/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSlider */
const { useEffect } = React;

const ACCENTS = {
  balanced: ['#4d8dff', '#a06bff'],
  blue:     ['#3f7bff', '#6fb6ff'],
  purple:   ['#8a5bff', '#c06bff'],
  green:    ['#14d6c4', '#4ce08a']
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "balanced",
  "motion": true,
  "scene3d": true,
  "glassBlur": 18,
  "glow": 1
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Accent
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', t.accent);
    const [a, b] = ACCENTS[t.accent] || ACCENTS.balanced;
    if (window.WPS_SCENE) window.WPS_SCENE.setAccent(a, b);
  }, [t.accent]);

  // Cinematic motion
  useEffect(() => {
    document.documentElement.classList.toggle('no-motion', !t.motion);
    if (window.WPS_SCENE) window.WPS_SCENE.setMotion(!!t.motion);
    if (window.WPS_AIVIDEO) window.WPS_AIVIDEO.setMotion(!!t.motion);
  }, [t.motion]);

  // 3D background
  useEffect(() => {
    const bg = document.getElementById('bg-scene');
    if (bg) bg.style.display = t.scene3d ? '' : 'none';
  }, [t.scene3d]);

  // Glass blur
  useEffect(() => {
    document.documentElement.style.setProperty('--glass-blur', t.glassBlur + 'px');
  }, [t.glassBlur]);

  // Glow intensity (scales accent glow alpha via a root multiplier)
  useEffect(() => {
    const pct = Math.round(40 + t.glow * 25);
    document.documentElement.style.setProperty('--glow-a', `color-mix(in oklch, var(--accent-a) ${pct}%, transparent)`);
    document.documentElement.style.setProperty('--glow-b', `color-mix(in oklch, var(--accent-b) ${pct}%, transparent)`);
  }, [t.glow]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent system" />
      <TweakRadio label="Accent" value={t.accent}
        options={['balanced', 'blue', 'purple', 'green']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSlider label="Glow" value={t.glow} min={0} max={2} step={0.1}
        onChange={(v) => setTweak('glow', v)} />

      <TweakSection label="Motion & depth" />
      <TweakToggle label="Cinematic motion" value={t.motion}
        onChange={(v) => setTweak('motion', v)} />
      <TweakToggle label="3D background" value={t.scene3d}
        onChange={(v) => setTweak('scene3d', v)} />
      <TweakSlider label="Glass blur" value={t.glassBlur} min={2} max={30} step={1} unit="px"
        onChange={(v) => setTweak('glassBlur', v)} />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.getElementById('tweaks-root');
  if (el && window.ReactDOM) ReactDOM.createRoot(el).render(<TweaksApp />);
})();
