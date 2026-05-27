// ─── Shared chrome ────────────────────────────────────────────────────────────

const resStyles = {
  shell: { flex: 1, height: '100vh', overflowY: 'auto', background: '#FFFFFF' },
  inner: { maxWidth: 1080, margin: '0 auto', padding: '38px 40px 80px' },
  h1: {
    fontFamily: 'var(--serif)',
    fontSize: 36, fontWeight: 500,
    color: '#0e1116', letterSpacing: '-0.01em',
    margin: '0 0 4px'
  },
  sub: { color: '#8a8f98', fontSize: 14, margin: '0 0 18px', paddingBottom: 18, borderBottom: '1px solid #E2E8F0' },
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 18
  },
  toolbarLabel: {
    fontSize: 18, letterSpacing: '0.14em', fontWeight: 700,
    color: '#3a4150', textTransform: 'uppercase'
  },
  toolbarBtns: { display: 'flex', gap: 8 },
  btn: (variant = 'default') => ({
    background: variant === 'primary' ? '#4A60A8' : '#fff',
    color: variant === 'primary' ? '#fff' : '#3a4150',
    border: variant === 'primary' ? 'none' : '1px solid #e7e5df',
    borderRadius: 9,
    padding: '8px 14px',
    fontSize: 13, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 6,
    cursor: 'pointer',
    transition: 'background 120ms'
  })
};

function ResultsHeader({ title, count, label, viewKey, onViewChange, onBack, hideViewButtons }) {
  return (
    <>
      <h1 style={resStyles.h1}>{title}</h1>
      <p style={{ ...resStyles.sub, fontSize: "16px", color: "rgb(100, 116, 139)" }}>{count} total ({label})</p>
      <div style={resStyles.toolbar}>
        <div style={{ ...resStyles.toolbarLabel, fontSize: "18px" }}>{label.toUpperCase()}:</div>
        {!hideViewButtons &&
        <div style={{ ...resStyles.toolbarBtns, gap: "24px" }}>
            <button style={{ ...resStyles.btn(viewKey === 'outbox' ? 'primary' : 'default'), width: "171px", height: "47px", fontSize: "18px", justifyContent: "center" }}
          onClick={() => onViewChange('outbox')}>View in Outbox</button>
            <button style={{ ...resStyles.btn(viewKey === 'tracker' ? 'primary' : 'default'), fontSize: "18px", width: "171px", justifyContent: "center" }}
          onClick={() => onViewChange('tracker')}>View in Tracker</button>
            <button style={{ ...resStyles.btn(), fontSize: "18px", justifyContent: "center", width: "171px" }} onClick={onBack}>Back to Search</button>
          </div>
        }
      </div>
    </>);

}

function Avatar({ name, seed }) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg, hsl(${seed * 47 % 360} 35% 55%), hsl(${(seed * 47 + 60) % 360} 40% 35%))`,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11.5, fontWeight: 600, letterSpacing: '0.02em'
    }}>{initials}</div>);

}

function Pagination({ page, perPage, total, onPage, onPerPage }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      gap: 18, marginTop: 18, fontSize: 13, color: '#3a4150'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Rows per page</span>
        <select value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}
        style={{
          border: '1px solid #e7e5df', borderRadius: 7, padding: '4px 8px',
          fontSize: 13, color: '#3a4150', background: '#fff', cursor: 'pointer'
        }}>
          {[6, 12, 24, 50].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div style={{ color: '#5a6377' }}>Page {page} of {totalPages}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {[
        { l: '«', a: 1, dis: page === 1 },
        { l: '‹', a: Math.max(1, page - 1), dis: page === 1 },
        { l: '›', a: Math.min(totalPages, page + 1), dis: page === totalPages },
        { l: '»', a: totalPages, dis: page === totalPages }].
        map((b) =>
        <button key={b.l} disabled={b.dis} onClick={() => onPage(b.a)}
        style={{
          width: 28, height: 28, borderRadius: 6,
          border: '1px solid #e7e5df', background: '#fff',
          color: b.dis ? '#c6cbd6' : '#3a4150',
          cursor: b.dis ? 'not-allowed' : 'pointer', fontSize: 13
        }}>{b.l}</button>
        )}
      </div>
    </div>);

}

// ─── PEOPLE: card list ────────────────────────────────────────────────────────

function PeopleContactsView({ query, results, loading, onBack, onDraftEmail, onView, viewKey, setViewKey, count }) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(6);
  React.useEffect(() => setPage(1), [results]);

  const start = (page - 1) * perPage;
  const slice = results.slice(start, start + perPage);

  return (
    <main style={resStyles.shell}>
      <div style={resStyles.inner}>
        <ResultsHeader title="Find People" count={count} label="contacts"
        viewKey={viewKey} onViewChange={setViewKey} onBack={onBack} />

        {loading && [...Array(6)].map((_, i) => <SkeletonCard key={i} delay={i * 80} />)}

        {!loading && slice.map((r, i) =>
        <div key={start + i} style={contactCardStyle}>
            <Avatar name={r.name} seed={start + i + 1} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#0e1116' }}>{r.name}</div>
              <div style={{ color: '#3a4150', marginTop: 2, fontSize: "12px" }}>
                {r.role} @ {r.company}
              </div>
              <a href="#" onClick={(e) => e.preventDefault()}
            style={{ color: '#5a78c4', textDecoration: 'none', marginTop: 4, display: 'inline-block', fontSize: "12px" }}>
                {r.email}
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...resStyles.btn('primary'), background: '#1E2D4D', fontSize: "14px" }} onClick={() => onDraftEmail(r)}>
                <IconEdit /> Draft Email
              </button>
              <button style={{ ...resStyles.btn(), color: 'rgb(10, 10, 10)', fontSize: "14px" }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                <IconLinkedin size={13} /> LinkedIn
              </button>
            </div>
          </div>
        )}

        {!loading && results.length > 0 &&
        <Pagination page={page} perPage={perPage} total={results.length}
        onPage={setPage} onPerPage={(n) => {setPerPage(n);setPage(1);}} />
        }
      </div>
    </main>);

}

const contactCardStyle = {
  background: '#fff', border: '1px solid #e7e5df',
  borderRadius: 12, padding: '16px 18px', marginBottom: 10,
  display: 'flex', alignItems: 'center', gap: 14
};

function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 13.7598V14.0928H2.5V13.7598H13.5ZM9.97656 1.82812C10.0417 1.76297 10.1478 1.76308 10.2129 1.82812L12.0986 3.71387C12.1633 3.77887 12.1633 3.8842 12.0986 3.94922L4.62109 11.4268H2.5V9.30469L9.97656 1.82812ZM2.83301 9.44336V11.0928H4.4834L11.3906 4.18555L11.7451 3.83203L11.3906 3.47852L10.4482 2.53516L10.0947 2.18164L2.83301 9.44336Z" stroke="white" />
    </svg>);

}

// ─── HIRING MANAGERS: card list (LinkedIn only) ───────────────────────────────

function ManagersListView({ results, loading, onBack, count, viewKey, setViewKey }) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(6);
  const start = (page - 1) * perPage;
  const slice = results.slice(start, start + perPage);

  return (
    <main style={resStyles.shell}>
      <div style={resStyles.inner}>
        <ResultsHeader title="Find Hiring Managers" count={count} label="hiring managers"
        viewKey={viewKey} onViewChange={setViewKey} onBack={onBack} />

        {loading && [...Array(6)].map((_, i) => <SkeletonCard key={i} delay={i * 80} />)}

        {!loading && slice.map((r, i) =>
        <div key={start + i} style={contactCardStyle}>
            <Avatar name={r.name} seed={start + i + 5} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#0e1116' }}>{r.name}</div>
              <div style={{ fontSize: 13, color: '#3a4150', marginTop: 2 }}>
                Hiring Manager @ {r.company}
              </div>
              <a href="#" onClick={(e) => e.preventDefault()}
            style={{ fontSize: 12.5, color: '#5a78c4', textDecoration: 'none', marginTop: 4, display: 'inline-block' }}>
                {r.email}
              </a>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...resStyles.btn(), color: 'rgb(10, 10, 10)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                <IconLinkedin size={13} /> LinkedIn
              </button>
            </div>
          </div>
        )}

        {!loading && results.length > 0 &&
        <Pagination page={page} perPage={perPage} total={results.length}
        onPage={setPage} onPerPage={(n) => {setPerPage(n);setPage(1);}} />
        }
      </div>
    </main>);

}

// ─── COMPANIES: spreadsheet ───────────────────────────────────────────────────

function CompaniesSpreadsheetView({ results, loading, onBack, count }) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(12);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());

  const filtered = results.filter((r) =>
  !search.trim() || (r.name + r.industry + r.location).toLowerCase().includes(search.toLowerCase())
  );
  const start = (page - 1) * perPage;
  const slice = filtered.slice(start, start + perPage);

  const toggle = (i) => {
    const s = new Set(selected);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelected(s);
  };
  const toggleAll = () => {
    if (slice.every((_, i) => selected.has(start + i))) {
      const s = new Set(selected);
      slice.forEach((_, i) => s.delete(start + i));
      setSelected(s);
    } else {
      const s = new Set(selected);
      slice.forEach((_, i) => s.add(start + i));
      setSelected(s);
    }
  };

  const exportCSV = () => {
    const rows = [['Company', 'Website', 'LinkedIn', 'Industry', 'Location'],
    ...filtered.map((r) => [r.name, r.website, r.linkedin, r.industry, r.location])];
    const csv = rows.map((r) => r.map((c) => `"${(c || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;a.download = 'companies.csv';a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main style={resStyles.shell}>
      <div style={resStyles.inner}>
        <h1 style={resStyles.h1}>Find Companies</h1>
        <p style={{ ...resStyles.sub, fontSize: "16px", color: "rgb(100, 116, 139)" }}>{count} total (companies)</p>

        <div style={{ ...resStyles.toolbarLabel, marginBottom: 14, fontSize: "18px" }}>COMPANY SPREADSHEET:</div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap'
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid #e7e5df', borderRadius: 9,
            padding: '8px 12px', minWidth: 280
          }}>
            <IconSearch size={14} style={{ color: '#8a8f98' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name, Company or Title..."
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              flex: 1, fontSize: 13.5, fontFamily: 'inherit', color: '#3a4150'
            }} />
          </div>
          <button style={resStyles.btn()} onClick={onBack}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
            <IconRefresh /> Refresh
          </button>
          <button style={resStyles.btn()} onClick={exportCSV}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
            <IconDownload /> Export CSV
          </button>
          <button style={resStyles.btn()}
          onClick={() => {setSelected(new Set());}}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fdf2f2'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
            <IconTrash /> Delete All
          </button>
          <button style={{ ...resStyles.btn(), padding: '8px 10px' }}
          title="Bookmark all"
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
            <IconBookmark />
          </button>
          <button style={{ ...resStyles.btn(), padding: '8px 10px' }}
          title="Archive"
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f1ec'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
            <IconArchive />
          </button>
        </div>

        <div style={{
          background: '#fff', border: '1px solid #e7e5df', borderRadius: 10,
          overflow: 'auto'
        }}>
          <div style={spreadHeaderStyle}>
            <div style={{ width: 36 }}></div>
            <div>Company</div>
            <div>Website</div>
            <div>LinkedIn</div>
            <div>Industry</div>
            <div>Location</div>
            <div>Action</div>
          </div>
          {loading && [...Array(8)].map((_, i) =>
          <div key={i} style={spreadRowStyle}>
              <div style={{ width: 36, display: 'flex', justifyContent: 'center' }}>
                <input type="checkbox" disabled />
              </div>
              <div style={{ height: 12, background: '#ece9e1', borderRadius: 4, width: '60%',
              animation: 'pulse 1.6s ease-in-out infinite', animationDelay: `${i * 80}ms` }}></div>
              <div></div><div></div><div></div><div></div><div></div>
            </div>
          )}
          {!loading && slice.map((r, i) =>
          <div key={start + i} style={spreadRowStyle}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fbfaf7'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
              <div style={{ width: 36, display: 'flex', justifyContent: 'center' }}>
                <input type="checkbox"
              checked={selected.has(start + i)}
              onChange={() => toggle(start + i)} />
              </div>
              <div style={{ fontWeight: 500, color: '#0A0A0A' }}>{r.name}</div>
              <div><a href="#" onClick={(e) => e.preventDefault()} style={spreadLink}>Website</a></div>
              <div><a href="#" onClick={(e) => e.preventDefault()} style={spreadLink}>LinkedIn</a></div>
              <div style={{ color: '#0A0A0A' }}>{r.industry}</div>
              <div style={{ color: '#0A0A0A' }}>{r.location}</div>
              <div style={{ display: 'flex', gap: 14, color: '#767676' }}>
                <button title="Bookmark" style={actionIconBtn}><IconBookmark /></button>
                <button title="Archive" style={actionIconBtn}><IconArchive /></button>
              </div>
            </div>
          )}
        </div>

        {!loading && filtered.length > 0 &&
        <Pagination page={page} perPage={perPage} total={filtered.length}
        onPage={setPage} onPerPage={(n) => {setPerPage(n);setPage(1);}} />
        }
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </main>);

}

const spreadHeaderStyle = {
  display: 'grid',
  gridTemplateColumns: '36px 2fr 1fr 1fr 1.4fr 1.4fr 130px',
  alignItems: 'center', gap: 8,
  padding: '12px 14px',
  minWidth: 920,
  fontSize: 14, fontWeight: 550, color: '#0A0A0A',
  fontFamily: "'Google Sans Flex', 'Google Sans', system-ui, sans-serif",
  background: '#fff',
  borderBottom: '1px solid #e7e5df'
};
const spreadRowStyle = {
  display: 'grid',
  gridTemplateColumns: '36px 2fr 1fr 1fr 1.4fr 1.4fr 130px',
  minWidth: 920,
  alignItems: 'center', gap: 8,
  padding: '13px 14px',
  fontSize: 14, color: '#0A0A0A',
  borderBottom: '1px solid #f3f1ec',
  background: '#fff',
  transition: 'background 80ms'
};
const spreadLink = {
  color: '#0A0A0A', textDecoration: 'none', fontSize: 14
};

const actionIconBtn = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  padding: 0, color: 'inherit', display: 'flex', alignItems: 'center'
};

const IconSend = () =>
<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor"
strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3 9 11" />
    <path d="M17 3l-5 14-3-6-6-3 14-5z" />
  </svg>;

// ─── Small inline icons used here ─────────────────────────────────────────────

const IconRefresh = () =>
<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor"
strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10a6 6 0 0 1 10-4.3M16 10a6 6 0 0 1-10 4.3" />
    <path d="M14 3v3h-3 M6 17v-3h3" />
  </svg>;

const IconDownload = () =>
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_2029_1836" fill="white">
      <path d="M13.5 7.00039V13.0004C13.5 13.2656 13.3946 13.52 13.2071 13.7075C13.0196 13.895 12.7652 14.0004 12.5 14.0004H3.5C3.23478 14.0004 2.98043 13.895 2.79289 13.7075C2.60536 13.52 2.5 13.2656 2.5 13.0004V7.00039C2.5 6.73518 2.60536 6.48082 2.79289 6.29329C2.98043 6.10575 3.23478 6.00039 3.5 6.00039H5C5.13261 6.00039 5.25979 6.05307 5.35355 6.14684C5.44732 6.24061 5.5 6.36779 5.5 6.50039C5.5 6.633 5.44732 6.76018 5.35355 6.85395C5.25979 6.94771 5.13261 7.00039 5 7.00039H3.5V13.0004H12.5V7.00039H11C10.8674 7.00039 10.7402 6.94771 10.6464 6.85395C10.5527 6.76018 10.5 6.633 10.5 6.50039C10.5 6.36779 10.5527 6.24061 10.6464 6.14684C10.7402 6.05307 10.8674 6.00039 11 6.00039H12.5C12.7652 6.00039 13.0196 6.10575 13.2071 6.29329C13.3946 6.48082 13.5 6.73518 13.5 7.00039ZM5.85375 4.35414L7.5 2.70727V8.50039C7.5 8.633 7.55268 8.76018 7.64645 8.85395C7.74021 8.94772 7.86739 9.00039 8 9.00039C8.13261 9.00039 8.25979 8.94772 8.35355 8.85395C8.44732 8.76018 8.5 8.633 8.5 8.50039V2.70727L10.1462 4.35414C10.2401 4.44796 10.3673 4.50067 10.5 4.50067C10.6327 4.50067 10.7599 4.44796 10.8538 4.35414C10.9476 4.26032 11.0003 4.13308 11.0003 4.00039C11.0003 3.86771 10.9476 3.74046 10.8538 3.64664L8.35375 1.14664C8.30731 1.10016 8.25217 1.06328 8.19147 1.03811C8.13077 1.01295 8.06571 1 8 1C7.93429 1 7.86923 1.01295 7.80853 1.03811C7.74783 1.06328 7.69269 1.10016 7.64625 1.14664L5.14625 3.64664C5.05243 3.74046 4.99972 3.86771 4.99972 4.00039C4.99972 4.13308 5.05243 4.26032 5.14625 4.35414C5.24007 4.44796 5.36732 4.50067 5.5 4.50067C5.63268 4.50067 5.75993 4.44796 5.85375 4.35414Z" />
    </mask>
    <path d="M13.5 7.00039V13.0004C13.5 13.2656 13.3946 13.52 13.2071 13.7075C13.0196 13.895 12.7652 14.0004 12.5 14.0004H3.5C3.23478 14.0004 2.98043 13.895 2.79289 13.7075C2.60536 13.52 2.5 13.2656 2.5 13.0004V7.00039C2.5 6.73518 2.60536 6.48082 2.79289 6.29329C2.98043 6.10575 3.23478 6.00039 3.5 6.00039H5C5.13261 6.00039 5.25979 6.05307 5.35355 6.14684C5.44732 6.24061 5.5 6.36779 5.5 6.50039C5.5 6.633 5.44732 6.76018 5.35355 6.85395C5.25979 6.94771 5.13261 7.00039 5 7.00039H3.5V13.0004H12.5V7.00039H11C10.8674 7.00039 10.7402 6.94771 10.6464 6.85395C10.5527 6.76018 10.5 6.633 10.5 6.50039C10.5 6.36779 10.5527 6.24061 10.6464 6.14684C10.7402 6.05307 10.8674 6.00039 11 6.00039H12.5C12.7652 6.00039 13.0196 6.10575 13.2071 6.29329C13.3946 6.48082 13.5 6.73518 13.5 7.00039ZM5.85375 4.35414L7.5 2.70727V8.50039C7.5 8.633 7.55268 8.76018 7.64645 8.85395C7.74021 8.94772 7.86739 9.00039 8 9.00039C8.13261 9.00039 8.25979 8.94772 8.35355 8.85395C8.44732 8.76018 8.5 8.633 8.5 8.50039V2.70727L10.1462 4.35414C10.2401 4.44796 10.3673 4.50067 10.5 4.50067C10.6327 4.50067 10.7599 4.44796 10.8538 4.35414C10.9476 4.26032 11.0003 4.13308 11.0003 4.00039C11.0003 3.86771 10.9476 3.74046 10.8538 3.64664L8.35375 1.14664C8.30731 1.10016 8.25217 1.06328 8.19147 1.03811C8.13077 1.01295 8.06571 1 8 1C7.93429 1 7.86923 1.01295 7.80853 1.03811C7.74783 1.06328 7.69269 1.10016 7.64625 1.14664L5.14625 3.64664C5.05243 3.74046 4.99972 3.86771 4.99972 4.00039C4.99972 4.13308 5.05243 4.26032 5.14625 4.35414C5.24007 4.44796 5.36732 4.50067 5.5 4.50067C5.63268 4.50067 5.75993 4.44796 5.85375 4.35414Z" fill="#0A0A0A" mask="url(#path-1-inside-1_2029_1836)" />
  </svg>;

const IconTrash = () =>
<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor"
strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h12 M8 6V4h4v2 M6 6l1 11h6l1-11" />
  </svg>;

const IconBookmark = () =>
<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor"
strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h8v14l-4-3-4 3z" />
  </svg>;

const IconArchive = () =>
<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor"
strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="14" height="3" />
    <path d="M4 7v10h12V7" />
    <path d="M8 11h4" />
  </svg>;


function SkeletonCard({ delay }) {
  return (
    <div style={{
      ...contactCardStyle,
      animation: `pulse 1.6s ease-in-out infinite`,
      animationDelay: delay + 'ms'
    }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ece9e1' }}></div>
      <div style={{ flex: 1 }}>
        <div style={{ height: 12, background: '#ece9e1', borderRadius: 4, width: '30%', marginBottom: 8 }}></div>
        <div style={{ height: 11, background: '#ece9e1', borderRadius: 4, width: '50%' }}></div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>);

}

Object.assign(window, { PeopleContactsView, ManagersListView, CompaniesSpreadsheetView });