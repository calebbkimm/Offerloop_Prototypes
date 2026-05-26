import { useState, useMemo } from 'react';

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 6V4.5a3 3 0 016 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconUsers = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="5.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="9.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1 11.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M6.5 11.5c0-2.485 1.567-4.5 3.5-4.5s3.5 2.015 3.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconBriefcase = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="4.5" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 4.5V3.5a2.5 2.5 0 015 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M1 8h11" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const IconBuilding = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1.5" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.5 5.5h1M7.5 5.5h1M4.5 8h1M7.5 8h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M4.5 12V10h4v2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 1.5C4.84 1.5 3.5 2.84 3.5 4.5c0 2.5 3 6.5 3 6.5s3-4 3-6.5c0-1.66-1.34-3-3-3z" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="6.5" cy="4.5" r="1.1" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="3" width="11" height="7.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 3.5l5 4 5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconExternalLink = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M8 1h3m0 0v3m0-3L6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconInfo = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6.5 6v3.5M6.5 4.2h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10 7H4m0 0l3-3M4 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_PEOPLE = [
  // Hiring Managers
  { id: 1, name: 'Sarah Chen',    type: 'hiring-manager', title: 'Head of Product Design',      company: 'Notion', location: 'San Francisco, CA', email: 'sarah.chen@notion.so',    linkedin: '#' },
  { id: 2, name: 'James Park',    type: 'hiring-manager', title: 'VP of Product',                company: 'Notion', location: 'San Francisco, CA', email: 'james.park@notion.so',    linkedin: '#' },
  // Recruiters
  { id: 3, name: 'Sarah Chen',    type: 'recruiter',      title: 'Senior Technical Recruiter',   company: 'Stripe', location: 'San Francisco, CA', email: 'sarah.chen@stripe.com',   linkedin: '#' },
  { id: 4, name: 'Mike Torres',   type: 'recruiter',      title: 'Technical Recruiter',           company: 'Stripe', location: 'San Francisco, CA', email: 'mike.torres@stripe.com',  linkedin: '#' },
  { id: 5, name: 'Lisa Wang',     type: 'recruiter',      title: 'Recruiting Lead',               company: 'Stripe', location: 'San Francisco, CA', email: 'lisa.wang@stripe.com',    linkedin: '#' },
  // Employees
  { id: 6, name: 'David Kim',     type: 'employee',       title: 'Senior Product Designer',       company: 'Notion', location: 'San Francisco, CA', email: 'david.kim@notion.so',     linkedin: '#' },
  { id: 7, name: 'Rachel Nguyen', type: 'employee',       title: 'Product Designer',              company: 'Notion', location: 'San Francisco, CA', email: 'rachel.nguyen@notion.so', linkedin: '#' },
  { id: 8, name: 'Tom Ellis',     type: 'employee',       title: 'UX Designer',                   company: 'Notion', location: 'San Francisco, CA', email: 'tom.ellis@notion.so',     linkedin: '#' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  if (type === 'hiring-manager') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-700">
        ✦ Hiring Manager
      </span>
    );
  }
  if (type === 'recruiter') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-800 text-white">
        ✦ Recruiter
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
      Employee
    </span>
  );
}

function ContactCard({ person }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-white flex flex-col gap-2.5 hover:border-gray-200 transition-colors">
      {/* Name + badge row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">{person.name}</span>
          <TypeBadge type={person.type} />
        </div>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          LinkedIn <IconExternalLink />
        </a>
      </div>

      {/* Detail rows */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-gray-400"><IconBriefcase /></span>
          {person.title}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-gray-400"><IconBuilding /></span>
          {person.company}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-gray-400"><IconPin /></span>
          {person.location}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400"><IconMail /></span>
          <a
            href={`mailto:${person.email}`}
            className="text-blue-600 hover:underline"
          >
            {person.email}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── State 1: Disabled / Pre-click ──────────────────────────────────────────

function State1({ onFind }) {
  const [count, setCount] = useState(5);
  const credits = count * 3;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-semibold text-gray-900 text-base">Find People</h3>

      {/* Slider row */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">How many?</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-semibold tabular-nums">{count}</span>
            <span className="text-gray-400 text-xs">{credits} credits</span>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full h-1.5 rounded-full accent-indigo-600 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${(count - 1) / 9 * 100}%, #e5e7eb ${(count - 1) / 9 * 100}%, #e5e7eb 100%)`,
          }}
        />

        <div className="flex justify-between text-[10px] text-gray-300 select-none">
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onFind}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm py-3 rounded-xl transition-colors"
      >
        <IconSearch />
        Find People
      </button>
    </div>
  );
}

// ─── State 2: Free Tier Results ──────────────────────────────────────────────

const FREE_TIER_TABS = [
  { key: 'all',            label: 'All',            count: 6,  info: false, disabled: false },
  { key: 'recruiters',     label: 'Recruiters',     count: 3,  info: true,  disabled: false },
  { key: 'employees',      label: 'Employees',      count: 3,  info: true,  disabled: false },
  { key: 'hiring-manager', label: 'Hiring Manager', count: null, info: true, disabled: true },
];

function State2({ onUpgrade }) {
  const [activeTab, setActiveTab] = useState('all');

  const visiblePeople = ALL_PEOPLE.filter(p => p.type !== 'hiring-manager').slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-900 text-base">Find People</h3>

      {/* Tab bar */}
      <div className="flex items-center border-b border-gray-100 gap-1 overflow-x-auto">
        {FREE_TIER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => !tab.disabled && setActiveTab(tab.key)}
            disabled={tab.disabled}
            className={[
              'flex items-center gap-1 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              tab.disabled
                ? 'text-gray-300 border-transparent cursor-not-allowed'
                : activeTab === tab.key
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700',
            ].join(' ')}
          >
            {tab.label}{tab.count !== null && ` (${tab.count})`}
            {tab.info && (
              <span className="text-gray-300"><IconInfo /></span>
            )}
          </button>
        ))}
      </div>

      {/* Upsell card */}
      <div className="rounded-xl border border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex flex-col gap-3">
        {/* Heading row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 text-sm">Find Hiring Manager</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700">
            Premium
          </span>
        </div>

        {/* Body */}
        <p className="text-xs text-gray-600 leading-relaxed">
          Connect directly with the decision-maker for this role. Hiring managers can
          fast-track your application and provide direct insights into what they're
          looking for.
        </p>

        {/* Available count */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
          <IconUsers />
          2 hiring managers available
        </div>

        {/* Upgrade button */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onUpgrade}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 active:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            <IconLock />
            Upgrade to Premium
          </button>
          <p className="text-center text-xs text-gray-400">
            Get access to hiring managers for all jobs
          </p>
        </div>
      </div>

      {/* Contact cards (2 recruiters visible) */}
      <div className="flex flex-col gap-3">
        {visiblePeople.map(p => (
          <ContactCard key={p.id} person={p} />
        ))}
      </div>
    </div>
  );
}

// ─── State 3: Premium / Subscribed ───────────────────────────────────────────

const PREMIUM_TABS = [
  { key: 'all',            label: 'All',              count: 6,  info: false },
  { key: 'hiring-manager', label: 'Hiring Manager',   count: 2,  info: true  },
  { key: 'recruiters',     label: 'Recruiters',       count: 3,  info: true  },
  { key: 'employees',      label: 'Employees',        count: 3,  info: true  },
];

function State3() {
  const [activeTab, setActiveTab] = useState('all');

  const visiblePeople = useMemo(() => {
    if (activeTab === 'all') return ALL_PEOPLE;
    if (activeTab === 'hiring-manager') return ALL_PEOPLE.filter(p => p.type === 'hiring-manager');
    if (activeTab === 'recruiters')     return ALL_PEOPLE.filter(p => p.type === 'recruiter');
    if (activeTab === 'employees')      return ALL_PEOPLE.filter(p => p.type === 'employee');
    return ALL_PEOPLE;
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold text-gray-900 text-base">Find People</h3>

      {/* Tab bar */}
      <div className="flex items-center border-b border-gray-100 gap-1 overflow-x-auto">
        {PREMIUM_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              'flex items-center gap-1 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors',
              activeTab === tab.key
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700',
            ].join(' ')}
          >
            {tab.label} ({tab.count})
            {tab.info && (
              <span className="text-gray-300"><IconInfo /></span>
            )}
          </button>
        ))}
      </div>

      {/* Contact cards */}
      <div className="flex flex-col gap-3">
        {visiblePeople.map(p => (
          <ContactCard key={p.id} person={p} />
        ))}
        {visiblePeople.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No results for this filter.</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * FindPeoplePanel
 *
 * Four states:
 *  'disabled'  → slider + Find People button
 *  'free'      → tabs + upsell card + 2 contact cards
 *  'premium'   → tabs (all active) + all contact cards, filterable
 *
 * @param {object} props
 * @param {'disabled'|'free'|'premium'} [props.initialState='disabled']
 */
export function FindPeoplePanel({ initialState = 'disabled' }) {
  const [state, setState] = useState(initialState);

  return (
    <div className="flex flex-col gap-1">
      {/* Reset link (for testing) */}
      {state !== 'disabled' && (
        <div className="flex justify-end mb-1">
          <button
            onClick={() => setState('disabled')}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IconArrowLeft />
            Reset
          </button>
        </div>
      )}

      {/* State panels */}
      {state === 'disabled' && (
        <State1 onFind={() => setState('free')} />
      )}
      {state === 'free' && (
        <State2 onUpgrade={() => setState('premium')} />
      )}
      {state === 'premium' && (
        <State3 />
      )}
    </div>
  );
}

// ─── Demo wrapper (remove when importing into your project) ──────────────────

export default function FindPeoplePanelDemo() {
  const [forcedState, setForcedState] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* State picker */}
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Jump to state</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: null,       label: 'Live flow' },
              { key: 'disabled', label: '1 · Disabled' },
              { key: 'free',     label: '2 · Free tier' },
              { key: 'premium',  label: '3 · Premium' },
            ].map(opt => (
              <button
                key={String(opt.key)}
                onClick={() => setForcedState(opt.key)}
                className={[
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                  forcedState === opt.key
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <FindPeoplePanel
            key={String(forcedState)}
            initialState={forcedState ?? 'disabled'}
          />
        </div>
      </div>
    </div>
  );
}
