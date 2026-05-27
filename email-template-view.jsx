// Email Template configuration page

const tmplStyles = {
  shell: { flex: 1, height: '100vh', overflowY: 'auto', background: '#FFFFFF' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '40px 40px 80px' },
  h1: {
    fontFamily: 'var(--serif)',
    fontSize: 36, fontWeight: 500,
    color: '#0e1116', letterSpacing: '-0.01em',
    margin: '0 0 6px'
  },
  intro: {
    color: '#5a6377', fontSize: 13.5, lineHeight: 1.55,
    margin: '0 0 30px',
    maxWidth: 700
  },
  back: {
    background: 'transparent', border: 'none', color: '#4A60A8',
    fontSize: 13.5, cursor: 'pointer', padding: 0,
    marginBottom: 26, display: 'inline-flex', alignItems: 'center', gap: 6,
    fontWeight: 500
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 56
  },
  label: {
    fontSize: 11, letterSpacing: '0.16em', fontWeight: 700,
    color: '#3a4150', textTransform: 'uppercase',
    marginBottom: 12
  },
  pillRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 },
  pill: (active) => ({
    border: 'none',
    background: active ? '#4A60A8' : '#fff',
    color: active ? '#fff' : '#3a4150',
    borderRadius: 999,
    padding: '7px 16px',
    fontSize: 13, fontWeight: 500,
    cursor: 'pointer',
    boxShadow: active ? 'none' : 'inset 0 0 0 1px #e7e5df',
    transition: 'all 120ms'
  }),
  textarea: {
    width: '100%',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: 14, fontFamily: 'inherit',
    color: '#64748B',
    resize: 'vertical',
    minHeight: 90,
    outline: 'none',
    marginBottom: 24
  },
  applyRow: { display: 'flex', gap: 10 },
  apply: {
    background: '#1E2D4D', color: '#fff',
    border: 'none', borderRadius: 9,
    padding: '11px 18px', fontWeight: 600, fontSize: 13.5,
    cursor: 'pointer'
  },
  reset: {
    background: '#fff', color: '#3a4150',
    border: '1px solid #e7e5df', borderRadius: 9,
    padding: '11px 18px', fontWeight: 500, fontSize: 13.5,
    cursor: 'pointer'
  },

  previewHeader: {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8
  },
  previewTitle: {
    fontSize: 11.5, letterSpacing: '0.16em', fontWeight: 700,
    color: '#3a4150', textTransform: 'uppercase'
  },
  aiBadge: {
    background: '#ff8a3d', color: '#fff',
    fontSize: 10.5, fontWeight: 700,
    padding: '3px 9px', borderRadius: 5,
    display: 'inline-flex', alignItems: 'center', gap: 4
  },
  previewNote: {
    fontSize: 12, color: '#8a8f98',
    marginBottom: 18
  },
  field: {
    display: 'grid', gridTemplateColumns: '60px 1fr',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f3f1ec',
    fontSize: 13.5
  },
  fieldLabel: { color: '#8a8f98', fontWeight: 500 },
  fieldValue: { color: '#1f242c' },
  contactChip: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#eef1fb', color: '#4A60A8',
    borderRadius: 999, padding: '3px 9px 3px 4px',
    fontSize: 12.5, fontWeight: 500
  },
  contactDot: {
    width: 18, height: 18, borderRadius: '50%',
    background: '#4A60A8', color: '#fff',
    fontSize: 9.5, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  body: {
    marginTop: 18,
    fontSize: 13.5,
    lineHeight: 1.7,
    color: '#1f242c',
    whiteSpace: 'pre-wrap',
    paddingBottom: 18,
    borderBottom: '1px solid #E5E5E5'
  }
};

const SAVED = ['Networking', 'Referral Request', 'Follow Up'];
const SIGNOFFS = ['Best,', 'Thanks', 'Yours Truly,'];

function EmailTemplateView({ onBack, template, setTemplate }) {
  const [saved, setSaved] = React.useState(template.saved || 'Networking');
  const [signOff, setSignOff] = React.useState(template.signOff || 'Best,');
  const [signature, setSignature] = React.useState(template.signature || '');

  const apply = () => {
    setTemplate({ saved, signOff, signature });
    onBack();
  };
  const reset = () => {
    setSaved('Networking');setSignOff('Best,');setSignature('');
  };

  // Live preview body — changes copy based on intent
  const bodyByIntent = {
    'Networking':
    `Dear Contact,
I'm a junior at UC San Diego reaching out because I admire the work you've been doing on the team — particularly the recent product launches.
I'm exploring careers in product and design, and your trajectory really resonates with where I'd like to head.

Would you be open to a quick 15-minute chat sometime in the next couple of weeks? I'd love to hear how you think about the next stage of your work, and what advice you'd give someone trying to break in.`,
    'Referral Request':
    `Dear Contact,
I'm a junior at UC San Diego exploring new-grad opportunities at your company. I came across your work and was struck by how directly it overlaps with what I want to learn.

If it's not too forward, I'd love to ask whether you'd be open to referring me for an open role on your team. I've attached my resume and would be happy to share more context on a quick call.`,
    'Follow Up':
    `Dear Contact,
Following up on my earlier note — I know inboxes get noisy. I wanted to flag that I'm still very interested in chatting and would value even 10 minutes of your time.

Happy to come prepared with specific questions. Let me know what works.`
  };

  return (
    <main style={tmplStyles.shell}>
      <div style={tmplStyles.inner}>
        <h1 style={{ ...tmplStyles.h1, fontFamily: "Lora", fontSize: "30px" }}>Email Template</h1>
        <p style={{ ...tmplStyles.intro, fontSize: "16px", color: "rgb(100, 116, 139)" }}>
          This controls how your outreach emails are written.<br />
          Pick what you're asking for and how you want it to sound — check the preview below to see exactly what you'll get.
        </p>

        <div style={tmplStyles.grid}>
          {/* LEFT */}
          <div>
            <button style={{ ...tmplStyles.back, fontSize: "16px", color: "rgb(71, 85, 105)" }} onClick={onBack}>← Back to Find People</button>

            <div style={{ ...tmplStyles.label, fontSize: "14px", color: "rgb(30, 45, 77)" }}>Saved</div>
            <div style={tmplStyles.pillRow}>
              {SAVED.map((s) =>
              <button key={s} style={{ ...tmplStyles.pill(saved === s), fontSize: "14px" }} onClick={() => setSaved(s)}>
                  {s}
                </button>
              )}
            </div>

            <div style={{ ...tmplStyles.label, fontSize: "14px", color: "rgb(30, 45, 77)" }}>Sign Off</div>
            <div style={tmplStyles.pillRow}>
              {SIGNOFFS.map((s) =>
              <button key={s} style={{ ...tmplStyles.pill(signOff === s), fontSize: "14px" }} onClick={() => setSignOff(s)}>
                  {s}
                </button>
              )}
            </div>

            <div style={{ ...tmplStyles.label, fontSize: "14px", color: "rgb(30, 45, 77)" }}>Signature</div>
            <textarea
              style={{ ...tmplStyles.textarea, background: "rgb(248, 250, 252)", border: "1px solid rgb(226, 232, 240)" }}
              placeholder={"e.g. John Smith\nUSC\n2005"}
              value={signature}
              onChange={(e) => setSignature(e.target.value)} />
            

            <div style={tmplStyles.applyRow}>
              <button style={{ ...tmplStyles.apply, fontWeight: "500" }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2a3d68'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1E2D4D'}
              onClick={apply}>
                Apply to this Search
              </button>
              <button style={tmplStyles.reset}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
              onClick={reset}>
                Reset
              </button>
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: 16 }}>
            <div style={tmplStyles.previewHeader}>
              <span style={{ ...tmplStyles.previewTitle, fontSize: "14px", color: "rgb(30, 45, 77)" }}>Preview</span>
              <span style={{ ...tmplStyles.aiBadge, color: "rgb(224, 122, 62)", background: "rgb(251, 230, 214)" }}>
                <IconSparkle size={10} /> AI Draft
              </span>
            </div>
            <p style={{ ...tmplStyles.previewNote, color: "rgb(148, 163, 184)" }}>
              This is a preview, actual emails will be personalized to each contact.
            </p>

            <div style={tmplStyles.field}>
              <div style={{ ...tmplStyles.fieldLabel, color: "rgb(0, 0, 0)", fontSize: "12px" }}>To</div>
              <div>
                <span style={{ ...tmplStyles.contactChip, padding: "8px 6px", fontSize: "11px" }}>
                  <span style={{ ...tmplStyles.contactDot, fontSize: "6px", width: "21px", height: "21px" }}>CN</span>
                  Contact Name
                </span>
              </div>
            </div>
            <div style={tmplStyles.field}>
              <div style={{ ...tmplStyles.fieldLabel, color: "rgb(0, 0, 0)", fontSize: "12px" }}>From</div>
              <div style={tmplStyles.fieldValue}><span style={{ color: 'rgb(118, 118, 118)', fontSize: '12px', fontWeight: 300 }}>useremail@gmail.com</span></div>
            </div>
            <div style={tmplStyles.field}>
              <div style={{ ...tmplStyles.fieldLabel, color: "rgb(0, 0, 0)", fontSize: "12px" }}>Subject</div>
              <div style={{ ...tmplStyles.fieldValue, color: "rgb(118, 118, 118)", fontSize: "12px", fontWeight: "300" }}>auto generated subject line</div>
            </div>

            <div style={{ ...tmplStyles.body, fontSize: "12px" }}>
              {bodyByIntent[saved]}

              {'\n\n'}{signOff}
              {'\n'}{signature || 'User Name'}
            </div>
          </div>
        </div>
      </div>
    </main>);

}

window.EmailTemplateView = EmailTemplateView;