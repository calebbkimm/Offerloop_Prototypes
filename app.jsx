const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#4A60A8",
  "headingFont": "Cormorant Garamond"
}/*EDITMODE-END*/;

// ---------------- Claude integration ----------------

async function findContacts({ query, tab, count, template }) {
  const subjectByTab = tab === 'companies'
    ? 'companies'
    : tab === 'managers'
    ? 'hiring managers / recruiters'
    : 'individual professionals';

  const tone = template?.saved || 'Networking';
  const sig = template?.signature || 'Alex Chen';
  const signOff = template?.signOff || 'Best,';

  const peopleSchema = `{
  "name": "<full name>",
  "role": "<job title>",
  "company": "<company name>",
  "location": "<City, State or 'Remote'>",
  "email": "<plausible work email>",
  "handle": "<linkedin slug>",
  "match": <integer 70-99>,
  "draft": "<a 4-6 sentence cold outreach email — tone: ${tone}. Use real specific hooks based on the role/company. Sign with '${signOff}\\n${sig}'. Plain text, no markdown.>"
}`;

  const companySchema = `{
  "name": "<company name>",
  "website": "<url like example.com>",
  "linkedin": "<linkedin slug or company/example>",
  "industry": "<industry>",
  "location": "<HQ city>",
  "stage": "<e.g. Series B, Public>"
}`;

  const managerSchema = `{
  "name": "<full name>",
  "role": "Hiring Manager",
  "company": "<company name>",
  "location": "<City, State>",
  "email": "<plausible work email>",
  "handle": "<linkedin slug>",
  "match": <integer 70-99>,
  "draft": "<a 4-6 sentence email asking about the open role. Tone: ${tone}. Sign with '${signOff}\\n${sig}'.>"
}`;

  const schema = tab === 'companies' ? companySchema : tab === 'managers' ? managerSchema : peopleSchema;

  const prompt = `You are powering a contact-finder tool for a college student named Alex Chen, a junior at UC San Diego studying Cognitive Science.

QUERY: "${query}"
TYPE: ${subjectByTab}
COUNT: ${count}

Generate ${count} REALISTIC-SOUNDING but FICTIONAL results. Names, emails, and details are simulated for a demo.

Return ONLY a JSON array (no markdown, no preamble). Each item must follow this shape:
${schema}

Vary the names, companies and locations widely. Return ONLY the JSON array — no prose before or after.`;

  const raw = await window.claude.complete(prompt);
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start === -1 || end === -1) throw new Error('No JSON array in response');
  return JSON.parse(cleaned.slice(start, end + 1));
}

// Fallback mock
function mockResults(query, count, tab) {
  const peopleNames = ['Priya Anand', 'Marcus Chen', 'Sarah Liu', 'David Okafor',
    'Elena Vasquez', 'James Park', 'Aisha Rahman', 'Tom Wright',
    'Maya Patel', 'Chris Nguyen', 'Sofia Romano', 'Jordan Kim'];
  const companies = ['Linear', 'Figma', 'Anthropic', 'Stripe', 'Notion', 'Ramp', 'Vercel', 'Vanta',
    'Plaid', 'Modern Treasury', 'Mercury', 'Brex', 'Pulley', 'Replit', 'Retool', 'Census',
    'Hex', 'Airbyte', 'Dagster', 'Prisma'];
  const roles = ['Senior Product Designer', 'Product Manager', 'Software Engineer',
                 'Engineering Manager', 'Founding Engineer', 'Design Lead'];
  const industries = ['Fintech', 'AI/ML', 'DevTools', 'Climate', 'Healthtech',
                      'Consumer', 'Enterprise SaaS', 'Marketplaces'];
  const cities = ['NYC', 'San Francisco', 'Remote', 'Brooklyn', 'Seattle', 'Austin', 'Boston'];

  if (tab === 'companies') {
    return [...Array(count)].map((_, i) => ({
      name: companies[i % companies.length] + (i >= companies.length ? ' ' + Math.floor(i / companies.length) : ''),
      website: companies[i % companies.length].toLowerCase() + '.com',
      linkedin: 'company/' + companies[i % companies.length].toLowerCase(),
      industry: industries[i % industries.length],
      location: cities[i % cities.length],
      stage: ['Seed', 'Series A', 'Series B', 'Series C'][i % 4],
    }));
  }

  return [...Array(count)].map((_, i) => {
    const name = peopleNames[i % peopleNames.length];
    const co = companies[i % companies.length];
    const role = tab === 'managers' ? 'Hiring Manager' : roles[i % roles.length];
    const first = name.split(' ')[0].toLowerCase();
    const last = name.split(' ')[1].toLowerCase();
    return {
      name, role, company: co,
      location: cities[i % cities.length],
      email: `${first}.${last}@${co.toLowerCase()}.com`,
      handle: `${first}${last}`,
      match: 95 - (i % 10) * 2,
      draft: `Hi ${first},\n\nI'm Alex, a junior at UC San Diego studying Cognitive Science. I came across your work at ${co} and was struck by your team's recent direction.\n\nWould you be open to a brief 15-minute chat about your path into ${role.toLowerCase()}?\n\nBest,\nAlex`,
    };
  });
}

// ---------------- App ----------------

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [active, setActive] = React.useState('find');
  const [tab, setTab] = React.useState('people');
  // view: 'input' | 'results' | 'template'
  const [view, setView] = React.useState('input');
  const [resultViewKey, setResultViewKey] = React.useState('outbox'); // for top toolbar selection
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState({
    query: '', count: 1,
  });
  const [results, setResults] = React.useState([]);
  const [lastQuery, setLastQuery] = React.useState('');
  const [lastTab, setLastTab] = React.useState('people');
  const [trackerExtras, setTrackerExtras] = React.useState([]);

  const [emailTemplate, setEmailTemplate] = React.useState({
    saved: 'Networking', signOff: 'Best,', signature: '',
  });

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accentColor);
  }, [t.accentColor]);

  const onSearch = async () => {
    setLoading(true);
    setView('results');
    setLastQuery(params.query);
    setLastTab(tab);
    setResults([]);
    try {
      const data = await findContacts({ query: params.query, tab, count: params.count, template: emailTemplate });
      setResults(data);
    } catch (e) {
      console.warn('Claude call failed, using mock:', e);
      setResults(mockResults(params.query, params.count, tab));
    } finally {
      setLoading(false);
    }
  };

  const onAddToTracker = (rs) => {
    const added = rs.map(r => ({
      name: r.name, company: r.company, role: r.role || 'Contact',
      status: 'Reached out', date: 'just now',
    }));
    setTrackerExtras(prev => [...added, ...prev]);
  };

  const handleViewChange = (key) => {
    setResultViewKey(key);
    if (key === 'tracker') {
      onAddToTracker(results);
      setActive('tracker');
    } else if (key === 'outbox') {
      // stays on results
    }
  };

  const renderFindArea = () => {
    if (view === 'input') {
      return (
        <FindView
          tab={tab} setTab={setTab}
          params={params} setParams={setParams}
          onSearch={onSearch} loading={loading}
          onOpenTemplate={() => setView('template')}
        />
      );
    }
    if (view === 'template') {
      return (
        <EmailTemplateView
          onBack={() => setView('input')}
          template={emailTemplate}
          setTemplate={setEmailTemplate}
        />
      );
    }
    // results — pick based on lastTab
    if (lastTab === 'people') {
      return (
        <PeopleContactsView
          query={lastQuery}
          count={params.count}
          results={results}
          loading={loading}
          onBack={() => setView('input')}
          onDraftEmail={() => setView('template')}
          viewKey={resultViewKey}
          setViewKey={handleViewChange}
        />
      );
    }
    if (lastTab === 'companies') {
      return (
        <CompaniesSpreadsheetView
          count={params.count}
          results={results}
          loading={loading}
          onBack={() => setView('input')}
        />
      );
    }
    return (
      <ManagersListView
        count={params.count}
        results={results}
        loading={loading}
        onBack={() => setView('input')}
        viewKey={resultViewKey}
        setViewKey={handleViewChange}
      />
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar active={active} onNav={(id) => {
        setActive(id);
        if (id === 'find') {
          setView('input');
          setTab('people');
          setParams({ query: '', count: 1 });
        }
      }} />
      {active === 'find' && renderFindArea()}
      {active === 'coffee' && <CoffeeChatView />}
      {active === 'tracker' && <TrackerView contacts={trackerExtras} />}
      {active === 'board' && <JobBoardView />}
      {active === 'pricing' && <GenericView title="Pricing" sub="Plans and credit packages." />}
      {active === 'docs' && <GenericView title="Documentation" sub="Guides for getting the most out of Find." />}

      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand">
        <TweakColor
          label="Primary accent"
          value={t.accentColor}
          onChange={(v) => setTweak('accentColor', v)}
          options={['#4A60A8', '#1f3a5f', '#5b6878', '#3a5a3f', '#7a5a18']}
        />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakRadio
          label="Heading style"
          value={t.headingFont}
          onChange={(v) => setTweak('headingFont', v)}
          options={[
            { value: 'Cormorant Garamond', label: 'Serif' },
            { value: 'Inter', label: 'Sans' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
