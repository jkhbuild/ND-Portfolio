/* global React */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "grain": true
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.classList.toggle("show-grain", !!t.grain);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Atmosphere" />
      <TweakToggle label="Film grain" value={t.grain} onChange={(v) => setTweak("grain", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<PortfolioTweaks />);
