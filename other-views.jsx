const otherStyles = {
  shell: { flex: 1, height: '100vh', overflowY: 'auto', background: '#FFFFFF' },
  inner: { maxWidth: 980, margin: '0 auto', padding: '40px 32px 80px' },
  h1: {
    fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 500,
    margin: '0 0 6px', color: '#0e1116', letterSpacing: '-0.01em',
  },
  sub: { color: 'var(--muted)', fontSize: 14.5, margin: '0 0 28px' },
  card: {
    background: 'var(--card)', border: '1px solid var(--line)',
    borderRadius: 14, padding: 20, marginBottom: 12,
  },
  thead: {
    display: 'grid',
    gridTemplateColumns: '1.6fr 1.2fr 1fr 0.9fr 0.8fr',
    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--muted)', fontWeight: 600,
    padding: '12px 16px', borderBottom: '1px solid var(--line)',
  },
  trow: {
    display: 'grid',
    gridTemplateColumns: '1.6fr 1.2fr 1fr 0.9fr 0.8fr',
    fontSize: 13.5, color: '#1f242c',
    padding: '14px 16px', borderBottom: '1px solid var(--line-soft)',
    alignItems: 'center',
  },
  status: (s) => {
    const map = {
      'Reached out': { bg: '#eaf2fb', fg: '#2c5b8c' },
      'Replied': { bg: '#eaf4ec', fg: '#2d6840' },
      'Coffee scheduled': { bg: '#fbf3e1', fg: '#7a5a18' },
      'No response': { bg: '#f3f1ec', fg: '#5b6878' },
      'Saved': { bg: '#f3f1ec', fg: '#5b6878' },
    };
    const c = map[s] || map['Saved'];
    return {
      background: c.bg, color: c.fg,
      borderRadius: 999, padding: '3px 10px',
      fontSize: 11.5, fontWeight: 600,
      display: 'inline-block',
    };
  },
};

function PageHeader({ title, sub }) {
  return (
    <>
      <h1 style={otherStyles.h1}>{title}</h1>
      <p style={otherStyles.sub}>{sub}</p>
    </>
  );
}

function TrackerView({ contacts }) {
  const seedContacts = [
    { name: 'Priya Anand', company: 'Linear', role: 'Senior Product Designer', status: 'Replied', date: '2d ago' },
    { name: 'Marcus Chen', company: 'Anthropic', role: 'University Recruiter', status: 'Coffee scheduled', date: '4d ago' },
    { name: 'Sarah Liu', company: 'Figma', role: 'Product Manager', status: 'Reached out', date: '5d ago' },
    { name: 'David Okafor', company: 'Stripe', role: 'Engineering Manager', status: 'No response', date: '12d ago' },
  ];
  const all = [...contacts, ...seedContacts];

  return (
    <main style={otherStyles.shell}>
      <div style={otherStyles.inner}>
        <PageHeader title="Tracker" sub="Every person you've reached out to, in one place." />
        <div style={{ ...otherStyles.card, padding: 0 }}>
          <div style={otherStyles.thead}>
            <div>Name</div>
            <div>Role · Company</div>
            <div>Status</div>
            <div>Last activity</div>
            <div></div>
          </div>
          {all.map((c, i) => (
            <div key={i} style={otherStyles.trow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: `linear-gradient(135deg, hsl(${i * 47 % 360} 35% 55%), hsl(${(i * 47 + 60) % 360} 40% 35%))`,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600,
                }}>{c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
              </div>
              <div style={{ color: 'var(--ink-soft)' }}>{c.role} · {c.company}</div>
              <div><span style={otherStyles.status(c.status)}>{c.status}</span></div>
              <div style={{ color: 'var(--muted)' }}>{c.date}</div>
              <div style={{ textAlign: 'right' }}>
                <button style={{
                  background: 'transparent', border: '1px solid var(--line)',
                  borderRadius: 7, padding: '5px 10px', fontSize: 12, color: '#3a4150',
                }}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function CoffeeChatView() {
  const [topic, setTopic] = React.useState('');
  const [briefing, setBriefing] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setBriefing(null);
    try {
      const text = await window.claude.complete(
        `You are helping a college student prepare for a coffee chat. The student is meeting: "${topic}".\n\n` +
        `Return ONLY valid JSON with this shape (no markdown, no preamble):\n` +
        `{\n  "background": "<2 sentence summary of who this person is and their likely path>",\n  "questions": ["<5 thoughtful, specific questions the student should ask>"],\n  "dontAsk": ["<3 generic questions they should avoid>"],\n  "closer": "<one strong sentence to ask at the end>"\n}`
      );
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
      setBriefing(parsed);
    } catch (e) {
      setBriefing({ background: 'Could not load briefing. ' + e.message, questions: [], dontAsk: [], closer: '' });
    } finally { setLoading(false); }
  };

  return (
    <main style={otherStyles.shell}>
      <div style={otherStyles.inner}>
        <PageHeader title="Coffee Chat Prep" sub="Tell us who you're meeting — we'll generate a briefing and questions." />

        <div style={{ ...otherStyles.card, padding: 16 }}>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            placeholder="e.g. Priya Anand, Senior PM at Linear"
            style={{
              width: '100%', border: 'none', outline: 'none', background: 'transparent',
              fontSize: 15, fontFamily: 'inherit', padding: '8px 4px',
            }}
          />
        </div>
        <button onClick={generate} disabled={!topic.trim() || loading}
          style={{
            marginTop: 12,
            background: !topic.trim() || loading ? '#a4adba' : '#5b6878',
            color: '#fff', border: 'none', borderRadius: 10,
            padding: '11px 18px', fontWeight: 600, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            cursor: !topic.trim() || loading ? 'not-allowed' : 'pointer',
          }}>
          {loading ? <Spinner /> : <IconSparkle size={14} />}
          {loading ? 'Drafting…' : 'Generate briefing'}
        </button>

        {briefing && (
          <div style={{ marginTop: 24 }}>
            <div style={otherStyles.card}>
              <div style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--muted)',
                            textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Background</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: '#1f242c' }}>{briefing.background}</div>
            </div>
            {briefing.questions?.length > 0 && (
              <div style={otherStyles.card}>
                <div style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--muted)',
                              textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>Questions to ask</div>
                <ol style={{ paddingLeft: 20, margin: 0, fontSize: 14, lineHeight: 1.7, color: '#1f242c' }}>
                  {briefing.questions.map((q, i) => <li key={i} style={{ marginBottom: 6 }}>{q}</li>)}
                </ol>
              </div>
            )}
            {briefing.dontAsk?.length > 0 && (
              <div style={otherStyles.card}>
                <div style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--muted)',
                              textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>Skip these</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  {briefing.dontAsk.map((q, i) => <li key={i} style={{ marginBottom: 4 }}>{q}</li>)}
                </ul>
              </div>
            )}
            {briefing.closer && (
              <div style={{ ...otherStyles.card, background: '#fbfaf7' }}>
                <div style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--muted)',
                              textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>Strong closer</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.4, color: '#0e1116' }}>
                  "{briefing.closer}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function JobBoardView() {
  const jobs = [
    { co: 'Anthropic', role: 'New Grad Software Engineer', loc: 'SF / Remote', tags: ['New grad', 'Full-time'], posted: '2d ago' },
    { co: 'Figma', role: 'Product Designer, Intern', loc: 'NYC', tags: ['Internship', 'Summer 2026'], posted: '3d ago' },
    { co: 'Linear', role: 'Founding Engineer (Recent Grad)', loc: 'Remote', tags: ['New grad', 'Full-time'], posted: '5d ago' },
    { co: 'Ramp', role: 'Associate PM, University', loc: 'NYC / Miami', tags: ['New grad', 'PM'], posted: '1w ago' },
    { co: 'Notion', role: 'APM Intern', loc: 'SF', tags: ['Internship', 'PM'], posted: '1w ago' },
  ];

  return (
    <main style={otherStyles.shell}>
      <div style={otherStyles.inner}>
        <PageHeader title="Job Board" sub="Curated new-grad and internship roles. Click any to find people there." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {jobs.map((j, i) => (
            <div key={i} style={{ ...otherStyles.card, marginBottom: 0, cursor: 'pointer', transition: 'border-color 140ms' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cfcdc6'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: '#0e1116' }}>{j.co}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{j.posted}</div>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, lineHeight: 1.2, marginBottom: 6 }}>
                {j.role}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>{j.loc}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {j.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 11.5, padding: '3px 9px', borderRadius: 999,
                    background: '#f3f1ec', color: '#3a4150',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function GenericView({ title, sub }) {
  return (
    <main style={otherStyles.shell}>
      <div style={otherStyles.inner}>
        <PageHeader title={title} sub={sub} />
        <div style={{ ...otherStyles.card, textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
          This view is a placeholder in the demo.
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { TrackerView, CoffeeChatView, JobBoardView, GenericView });
