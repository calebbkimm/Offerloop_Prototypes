const sidebarStyles = {
  shell: {
    width: 232,
    minWidth: 232,
    height: '100vh',
    background: '#0b1733',
    color: '#dbe1ee',
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 12px',
    fontSize: 13.5
  },
  topRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 16
  },
  profileRow: {
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '6px 6px',
    borderRadius: 8,
    cursor: 'pointer'
  },
  avatar: {
    width: 26, height: 26, borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #6f8bff 0%, #2538b5 55%, #0c1238 100%)',
    flexShrink: 0
  },
  navItem: (active, id) => ({
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8.5px 10px',
    borderRadius: 8,
    color: '#ffffff',
    background: active && id === 'find' ? '#1E2D4D' : 'transparent',
    cursor: 'pointer',
    fontWeight: active ? 500 : 400,
    transition: 'background 120ms',
    userSelect: 'none'
  }),
  creditsBlock: {
    padding: '10px 10px 4px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 8
  },
  creditsLabel: {
    fontSize: 10.5, letterSpacing: '0.1em', color: '#8b94a4',
    textTransform: 'uppercase',
    display: 'flex', justifyContent: 'space-between',
    marginBottom: 7
  },
  creditsBar: {
    height: 4, borderRadius: 99,
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden'
  },
  creditsFill: (pct) => ({
    height: '100%', width: pct + '%',
    background: 'linear-gradient(90deg, #6f8bff, #b2c0ff)',
    borderRadius: 99
  }),
  upgrade: {
    marginTop: 12,
    width: '100%',
    background: '#1E2D4D',
    color: '#fff',
    border: 'none',
    padding: '10px 12px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
    cursor: 'pointer'
  }
};

function Sidebar({ active, onNav, credits = 210, max = 300 }) {
  const items = [
  { id: 'find', label: 'Find', Icon: IconSearch },
  { id: 'coffee', label: 'Coffee Chat Prep', Icon: IconCoffee },
  { id: 'tracker', label: 'Tracker', Icon: IconTracker },
  { id: 'board', label: 'Job Board', Icon: IconBoard }];

  const bottom = [
  { id: 'pricing', label: 'Pricing', Icon: IconTag },
  { id: 'docs', label: 'Documentation', Icon: IconDoc }];

  const pct = Math.round(credits / max * 100);

  return (
    <aside style={sidebarStyles.shell}>
      <div style={sidebarStyles.topRow}>
        <div style={sidebarStyles.profileRow}>
          <div style={sidebarStyles.avatar}></div>
          <div style={{ fontWeight: 500, fontSize: 13 }}>John Doe</div>
          <IconChev size={13} style={{ opacity: 0.6 }} />
        </div>
        <button title="Toggle sidebar"
        style={{ background: 'transparent', border: 'none', color: '#8b94a4',
          padding: 6, borderRadius: 6, display: 'flex', cursor: 'pointer' }}>
          <IconSidebar size={16} />
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(({ id, label, Icon: I }) =>
        <div key={id} style={sidebarStyles.navItem(active === id, id)}
        onClick={() => { if (id === 'find') onNav(id); }}
        onMouseEnter={(e) => {if (active !== id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';}}
        onMouseLeave={(e) => {if (active !== id) e.currentTarget.style.background = 'transparent';}}>
            <I size={15} stroke={1.7} style={{ opacity: active === id ? 0.95 : 0.75 }} />
            <span style={{ color: "rgb(255, 255, 255)" }}><span style={{ color: "rgb(147, 197, 253)" }}>{label}</span></span>
          </div>
        )}
      </nav>

      <div style={{ flex: 1 }}></div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 8 }}>
        {bottom.map(({ id, label, Icon: I }) =>
        <div key={id} style={sidebarStyles.navItem(active === id, id)}
        onClick={() => { if (id === 'find') onNav(id); }}
        onMouseEnter={(e) => {if (active !== id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';}}
        onMouseLeave={(e) => {if (active !== id) e.currentTarget.style.background = 'transparent';}}>
            <I size={15} stroke={1.7} style={{ opacity: 0.75 }} />
            <span>{label}</span>
          </div>
        )}
      </nav>

      <div style={sidebarStyles.creditsBlock}>
        <div style={sidebarStyles.creditsLabel}>
          <span>Credits</span>
          <span style={{ color: '#cfd4dd', letterSpacing: 0 }}>{credits} / {max}</span>
        </div>
        <div style={sidebarStyles.creditsBar}>
          <div style={sidebarStyles.creditsFill(pct)}></div>
        </div>
        <button style={sidebarStyles.upgrade}
        onMouseEnter={(e) => e.currentTarget.style.background = '#2a3d68'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#1E2D4D'}
        onClick={() => onNav('pricing')}>
          <IconBolt size={13} /> Upgrade Plan
        </button>
      </div>
    </aside>);

}

window.Sidebar = Sidebar;