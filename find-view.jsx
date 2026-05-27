const findStyles = {
  shell: {
    flex: 1, height: '100vh', overflowY: 'auto',
    background: '#FFFFFF', position: 'relative'
  },
  inner: {
    maxWidth: 720, margin: '0 auto', padding: '10vh 32px 80px'
  },
  title: {
    fontFamily: 'var(--serif)',
    fontSize: 56, fontWeight: 500,
    textAlign: 'center', letterSpacing: '-0.012em',
    margin: '0 0 12px', color: '#0e1116'
  },
  sub: {
    textAlign: 'center', color: '#8a8f98', fontSize: 14.5,
    margin: '0 0 26px', lineHeight: 1.5
  },
  tabsWrap: {
    display: 'flex', justifyContent: 'center', marginBottom: 26
  },
  tabs: {
    display: 'inline-flex', padding: 0,
    background: '#fff', borderRadius: 12,
    border: '1px solid #E5E5E5',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(15,18,25,0.05), 0 1px 3px rgba(15,18,25,0.06)'
  },
  tab: (active, isFirst, isLast) => ({
    padding: '12px 36px',
    borderRadius: active ?
    `${isFirst ? 10 : 0}px ${isLast ? 10 : 0}px ${isLast ? 10 : 0}px ${isFirst ? 10 : 0}px` :
    0,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: active ? '#fff' : '#000',
    background: active ? '#4A60A8' : 'transparent',
    border: 'none',
    borderLeft: !active && !isFirst ? '1px solid #E5E5E5' : 'none',
    cursor: 'pointer',
    transition: 'all 140ms',
    textTransform: 'uppercase',
    fontFamily: 'inherit',
    margin: active ? '-1px' : 0
  }),
  inputCard: {
    background: '#FAFAFA',
    border: '1px solid #E5E5E5',
    borderRadius: 14,
    padding: '18px 18px 20px',
    transition: 'box-shadow 200ms, border-color 200ms',
    position: 'relative'
  },
  inputCardFocus: {
    borderColor: '#9aa6c8',
    boxShadow: '0 0 0 4px rgba(74,96,168,0.07)'
  },
  hint: {
    color: '#3a4150', fontSize: 13, marginBottom: 12, marginLeft: 4
  },
  hintU: {
    textDecoration: 'underline', textDecorationStyle: 'dotted',
    textUnderlineOffset: 3, color: '#5a6377', cursor: 'help'
  },
  textareaWrap: {
    position: 'relative',
    background: '#E5E5E5',
    border: '1px solid #E5E5E5',
    borderRadius: 10,
    padding: '14px 16px',
    minHeight: 120
  },
  textarea: {
    width: '100%', border: 'none', outline: 'none',
    background: 'transparent', fontFamily: 'inherit',
    fontSize: 14.5, color: '#1f242c',
    resize: 'none', minHeight: 92, lineHeight: 1.55,
    paddingRight: 48,
    display: 'block'
  },
  submit: (disabled) => ({
    position: 'absolute', right: 12, bottom: 12,
    width: 34, height: 34, borderRadius: '50%',
    background: '#4A60A8',
    opacity: disabled ? 0.75 : 1,
    color: '#fff', border: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'opacity 140ms, background 140ms, transform 80ms',
    boxShadow: '0 1px 3px rgba(30,45,77,0.3)'
  }),
  chipsRow: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
    marginTop: 14
  },
  chip: {
    background: '#fff',
    border: '1px solid #e7e5df',
    borderRadius: 999,
    padding: '7px 14px',
    fontSize: 12.5,
    color: '#3a4150',
    cursor: 'pointer',
    transition: 'all 140ms',
    fontFamily: 'inherit'
  },
  sliderRow: {
    display: 'flex', alignItems: 'center', gap: 14,
    marginTop: 26, padding: '0 4px'
  },
  sliderLabel: { fontSize: 13.5, color: '#3a4150', flexShrink: 0 },
  sliderTrack: { flex: 1, position: 'relative', height: 6 },
  sliderValue: {
    fontSize: 14, fontWeight: 500, color: '#3a4150',
    minWidth: 28, textAlign: 'right',
    fontVariantNumeric: 'tabular-nums'
  },
  creditPill: {
    color: '#4A60A8',
    fontSize: 12, fontWeight: 500,
    flexShrink: 0
  },
  actionsRow: {
    display: 'flex', justifyContent: 'center', gap: 12,
    marginTop: 22
  },
  btnSecondary: {
    background: '#fff', color: '#3a4150',
    border: '1px solid #e7e5df', borderRadius: 9,
    padding: '11px 18px',
    fontWeight: 500, fontSize: 13.5,
    display: 'flex', alignItems: 'center', gap: 7,
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(15,18,25,0.06), 0 1px 3px rgba(15,18,25,0.08)',
    transition: 'background 120ms, box-shadow 120ms'
  }
};

function Slider({ value, onChange, min = 1, max = 25 }) {
  const pct = (value - min) / (max - min) * 100;
  return (
    <div style={findStyles.sliderTrack}>
      <div style={{ position: 'absolute', inset: 0, top: '50%', transform: 'translateY(-50%)',
        height: 4, background: '#e3e1da', borderRadius: 99 }}></div>
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        left: 0, width: pct + '%', height: 4, background: '#4A60A8', borderRadius: 99 }}></div>
      <input type="range" min={min} max={max} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        width: '100%', position: 'absolute', inset: 0,
        appearance: 'none', WebkitAppearance: 'none',
        background: 'transparent', cursor: 'pointer', margin: 0
      }} />
      
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none; -webkit-appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #4A60A8; cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        }
        input[type=range]::-webkit-slider-thumb:hover {
          box-shadow: 0 1px 3px rgba(0,0,0,0.25), 0 0 0 6px rgba(49,70,204,0.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #4A60A8; border: none; cursor: pointer;
        }
      `}</style>
    </div>);

}

const COPY = {
  people: {
    title: 'Find People',
    placeholder: 'e.g. Stripe engineers who studied at Michigan, hiring for summer 2026 SWE interns',
    hint:
    <>For best results include <span style={{ ...findStyles.hintU, fontSize: "14px", color: "rgb(100, 116, 139)" }} title="e.g. Stripe, Figma">company</span>,{' '}
        <span style={{ ...findStyles.hintU, color: "rgb(100, 116, 139)", fontSize: "14px" }} title="e.g. Product Manager, SWE">role</span>, and{' '}
        <span style={{ ...findStyles.hintU, fontSize: "14px", color: "rgb(100, 116, 139)" }} title="e.g. NYC, remote">location</span> to get personalized email drafts
      </>,

    chips: [
    'Goldman investment banking analysts who went to Michigan',
    'PMs at seed-stage AI companies in SF',
    'Stripe engineers who studied CS at Berkeley'],

    sliderMin: 1, sliderMax: 20, sliderDefault: 20
  },
  companies: {
    title: 'Find Companies',
    placeholder: 'e.g. fintech startups in NYC hiring summer 2026 analysts',
    hint:
    <>For best results include <span style={findStyles.hintU} title="e.g. fintech, AI, climate">industry</span>,{' '}
        <span style={findStyles.hintU} title="Seed, Series A, public">stage</span>, and{' '}
        <span style={findStyles.hintU} title="e.g. NYC, remote">location</span>.
      </>,

    chips: [
    'fintech startups in NYC hiring summer analysts',
    'seed-stage AI companies in SF',
    'climate-tech companies Series A to B'],

    sliderMin: 5, sliderMax: 100, sliderDefault: 100
  },
  managers: {
    title: 'Find Hiring Managers',
    placeholder: 'e.g. linkedin.com/jobs/... or Greenhouse, Lever, etc.',
    hint: <>For best results enter <span style={findStyles.hintU} title="Greenhouse, Lever, LinkedIn URLs">job posting links.</span></>,
    chips: [
    'linkedin.com/jobs/view/3812240183',
    'boards.greenhouse.io/anthropic/jobs/4112',
    'jobs.lever.co/figma/swe-new-grad'],

    sliderMin: 1, sliderMax: 10, sliderDefault: 6
  }
};

function FindView({ tab, setTab, params, setParams, onSearch, loading, onOpenTemplate }) {
  const [focused, setFocused] = React.useState(false);
  const copy = COPY[tab];

  // sync slider bounds when tab changes
  React.useEffect(() => {
    setParams((p) => ({
      ...p,
      count: Math.min(Math.max(p.count, copy.sliderMin), copy.sliderMax)
    }));
    // eslint-disable-next-line
  }, [tab]);

  const tabs = [
  { id: 'people', label: 'People' },
  { id: 'companies', label: 'Companies' },
  { id: 'managers', label: 'Hiring Managers' }];


  const cost = params.count * 1; // 1 credit per (simplified)
  const canSubmit = params.query.trim().length > 0 && !loading;

  const submit = () => {if (canSubmit) onSearch();};

  return (
    <main style={findStyles.shell}>
      <div style={findStyles.inner}>
        <h1 style={{ ...findStyles.title, fontFamily: "Lora", fontSize: "36px" }}>{copy.title}</h1>
        <p style={{ ...findStyles.sub, color: "rgb(148, 163, 184)", fontFamily: "'Google Sans Flex', 'Google Sans', system-ui, sans-serif", fontSize: "16px" }}>
          Search people, companies, or hiring managers — we'll find contact info and draft outreach
        </p>

        <div style={findStyles.tabsWrap}>
          <div style={findStyles.tabs}>
            {tabs.map((tt, i) =>
            <button key={tt.id} style={{ ...findStyles.tab(tab === tt.id, i === 0, i === tabs.length - 1), fontSize: "10px" }} onClick={() => setTab(tt.id)}>
                {tt.label}
              </button>
            )}
          </div>
        </div>

        <div style={{ ...findStyles.inputCard, ...(focused ? findStyles.inputCardFocus : {}), border: "1px solid rgb(229, 229, 229)" }}>
          <div style={{ ...findStyles.hint, fontSize: "14px", color: "rgb(100, 116, 139)" }}>{copy.hint}</div>
          <div style={{ ...findStyles.textareaWrap, background: "rgb(255, 255, 255)" }}>
            <textarea
              style={findStyles.textarea}
              placeholder={copy.placeholder}
              value={params.query}
              onChange={(e) => setParams({ ...params, query: e.target.value })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
              }} />
            
            <button
              style={findStyles.submit(!canSubmit)}
              onClick={submit}
              title="Search"
              onMouseDown={(e) => canSubmit && (e.currentTarget.style.transform = 'scale(0.92)')}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              {loading ? <Spinner /> : <IconArrowUp />}
            </button>
          </div>

          <div style={findStyles.chipsRow}>
            {copy.chips.map((c, i) =>
            <button key={i} style={findStyles.chip}
            onClick={() => setParams({ ...params, query: c })}
            onMouseEnter={(e) => {e.currentTarget.style.background = '#f3f1ec';e.currentTarget.style.borderColor = '#cfcdc6';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = '#fff';e.currentTarget.style.borderColor = '#e7e5df';}}>
                {c}
              </button>
            )}
          </div>
        </div>

        <div style={findStyles.sliderRow}>
          <div style={{ ...findStyles.sliderLabel, fontSize: "12px", color: "rgb(100, 116, 139)" }}>How many?</div>
          <Slider value={params.count} onChange={(v) => setParams({ ...params, count: v })}
          min={copy.sliderMin} max={copy.sliderMax} />
          <div style={findStyles.sliderValue}>{params.count}</div>
          <div style={{ ...findStyles.creditPill, color: "rgb(100, 116, 139)" }}>{cost} credits</div>
        </div>

        <div style={findStyles.actionsRow}>
          <button style={{ ...findStyles.btnSecondary, fontSize: "6px", color: 'rgb(10, 10, 10)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
          onClick={onOpenTemplate}>
            <IconMail size={18} /> <span style={{ color: 'rgb(10, 10, 10)', fontSize: "18px" }}>Email Template</span>
          </button>
          <button style={{ ...findStyles.btnSecondary, fontSize: "6px", color: 'rgb(10, 10, 10)' }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
          onClick={() => alert('Upload your resume to personalize outreach (demo).')}>
            <IconUpload size={18} /> <span style={{ color: 'rgb(10, 10, 10)', fontSize: "18px" }}>Upload Resume</span>
          </button>
        </div>
      </div>
    </main>);

}

function Spinner() {
  return (
    <span style={{ display: 'inline-block', width: 14, height: 14, position: 'relative' }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.35)',
        borderTopColor: '#fff',
        animation: 'spin 0.7s linear infinite'
      }}></span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </span>);

}

function IconArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16V5" />
      <path d="M5 10l5-5 5 5" />
    </svg>);

}

window.FindView = FindView;
window.Spinner = Spinner;