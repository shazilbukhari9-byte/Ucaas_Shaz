/* Product shots for the feature explorer's detail panel (Hosted Phone
   System). Each feature is the same admin console — a slim icon sidebar, a
   top bar with breadcrumb, search and user, and a data view — framed like a
   product screenshot that runs off the edge of the stage, with one floating
   overlay card for depth (as on the home page showcase). Picked by each
   capability's `mock` id in content/landingPages.js. Sample names and 555
   numbers only. Class prefix pxm- (fxm- belongs to the fax mock). */

const NAV = [
  ['ext', 'ri-hashtag'],
  ['ring', 'ri-group-line'],
  ['ivr', 'ri-git-branch-line'],
  ['hours', 'ri-calendar-schedule-line'],
  ['handling', 'ri-phone-line'],
  ['directory', 'ri-contacts-book-line'],
  ['paging', 'ri-megaphone-line'],
  ['sites', 'ri-building-2-line'],
  ['reliable', 'ri-shield-check-line'],
];

function App({ id, crumb, title, action, children }) {
  return (
    <div className="pxm-app">
      <aside className="pxm-side">
        <span className="pxm-logo"><i className="ri-phone-fill"></i></span>
        {NAV.map(([k, ic]) => (
          <span className={`pxm-nav${k === id ? ' on' : ''}`} key={k}><i className={ic}></i></span>
        ))}
      </aside>
      <div className="pxm-main">
        <div className="pxm-top">
          <span className="pxm-crumb">Phone system <i className="ri-arrow-right-s-line"></i><b>{crumb}</b></span>
          <span className="pxm-find"><i className="ri-search-line"></i>Search<kbd>⌘K</kbd></span>
          <span className="pxm-me">AM</span>
        </div>
        <div className="pxm-head">
          <b>{title}</b>
          {action}
        </div>
        <div className="pxm-content">{children}</div>
      </div>
    </div>
  );
}

const Av = ({ n, t = 'a' }) => <span className={`pxm-av pxm-av--${t}`}>{n}</span>;
const Pill = ({ s, children }) => <span className={`pxm-pill pxm-pill--${s}`}><i></i>{children}</span>;
const Btn = ({ icon = 'ri-add-line', children, ghost }) => (
  <span className={`pxm-btn${ghost ? ' pxm-btn--ghost' : ''}`}><i className={icon}></i>{children}</span>
);
const Float = ({ className = '', children }) => <div className={`pxm-float ${className}`}>{children}</div>;

function Extensions() {
  const rows = [
    ['PS', 'a', 'Priya Sharma', 'Front desk', '101', 'ok', 'Available'],
    ['DR', 'b', 'Daniel Reyes', 'Sales', '102', 'busy', 'On a call'],
    ['AK', 'c', 'Aisha Khan', 'Support · Austin', '2045', 'ok', 'Available'],
    ['MB', 'd', 'Marco Bianchi', 'Billing', '140', 'dnd', 'Do not disturb'],
  ];
  return (
    <>
      <App id="ext" crumb="Extensions" title="Extensions" action={<Btn>New extension</Btn>}>
        <div className="pxm-table">
          <div className="pxm-tr pxm-th pxm-cols-ext"><span>Name</span><span>Ext</span><span>Devices</span><span>Status</span></div>
          {rows.map(([i, t, n, d, x, s, l]) => (
            <div className="pxm-tr pxm-cols-ext" key={x}>
              <span className="pxm-who"><Av n={i} t={t} /><span><b>{n}</b><em>{d}</em></span></span>
              <span className="pxm-mono">{x}</span>
              <span className="pxm-devs"><i className="ri-phone-line"></i><i className="ri-computer-line"></i><i className="ri-smartphone-line"></i></span>
              <span><Pill s={s}>{l}</Pill></span>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--dial">
        <span className="pxm-float-k">Dialing ext</span>
        <b className="pxm-big">2045</b>
        <span className="pxm-float-s"><Av n="AK" t="c" />Aisha Khan · Austin</span>
      </Float>
    </>
  );
}

function RingGroups() {
  const m = [['1', 'PS', 'a', 'Priya Sharma', 'ring'], ['2', 'DR', 'b', 'Daniel Reyes', 'ring'], ['3', 'AK', 'c', 'Aisha Khan', 'wait'], ['4', 'MB', 'd', 'Marco Bianchi', 'wait']];
  return (
    <>
      <App id="ring" crumb="Ring groups" title="Sales · 4 members" action={<span className="pxm-select">Simultaneous<i className="ri-arrow-down-s-line"></i></span>}>
        <div className="pxm-table">
          <div className="pxm-tr pxm-th pxm-cols-ring"><span>#</span><span>Member</span><span>State</span></div>
          {m.map(([o, i, t, n, s]) => (
            <div className={`pxm-tr pxm-cols-ring${s === 'ring' ? ' is-hot' : ''}`} key={o}>
              <span className="pxm-mono pxm-dim">{o}</span>
              <span className="pxm-who"><Av n={i} t={t} /><b>{n}</b></span>
              <span>{s === 'ring' ? <Pill s="ring">Ringing</Pill> : <Pill s="idle">Waiting</Pill>}</span>
            </div>
          ))}
        </div>
        <div className="pxm-rule"><i className="ri-corner-down-right-line"></i>No answer after 20s → <b>Sales voicemail</b></div>
      </App>
      <Float className="pxm-float--call">
        <span className="pxm-float-ic is-ring"><i className="ri-phone-fill"></i></span>
        <span className="pxm-float-t"><b>+1 (415) 555-0142</b><em>Incoming · Sales group</em></span>
      </Float>
    </>
  );
}

function Ivr() {
  return (
    <>
      <App id="ivr" crumb="IVR" title="Main menu" action={<span className="pxm-actions"><Btn ghost icon="ri-play-line">Preview</Btn><Btn icon="ri-upload-2-line">Publish</Btn></span>}>
        <div className="pxm-canvas">
          <div className="pxm-node pxm-node--root"><i className="ri-phone-fill"></i><span><b>Incoming call</b><em>Greeting · “Thanks for calling”</em></span></div>
          <svg className="pxm-wires" viewBox="0 0 400 34" preserveAspectRatio="none" aria-hidden="true">
            <path d="M200 0 V12 M200 12 H50 V34 M200 12 H150 V34 M200 12 H250 V34 M200 12 H350 V34" />
          </svg>
          <div className="pxm-branches">
            {[['1', 'Sales', 'Ring group'], ['2', 'Support', 'Queue'], ['3', 'Billing', 'Ext 140'], ['0', 'Operator', 'Front desk']].map(([k, t, s]) => (
              <div className={`pxm-node${k === '2' ? ' on' : ''}`} key={k}><kbd>{k}</kbd><b>{t}</b><em>{s}</em></div>
            ))}
          </div>
        </div>
      </App>
      <Float className="pxm-float--toast">
        <span className="pxm-float-ic"><i className="ri-check-line"></i></span>
        <span className="pxm-float-t"><b>Caller pressed 2</b><em>Routed to Support queue</em></span>
      </Float>
    </>
  );
}

function Hours() {
  const days = [['Mon', 8, 18], ['Tue', 8, 18], ['Wed', 8, 18], ['Thu', 8, 18], ['Fri', 8, 16], ['Sat', 10, 14], ['Sun']];
  const pct = (h) => `${((h - 6) / 16) * 100}%`;
  return (
    <>
      <App id="hours" crumb="Schedules" title="Business hours" action={<span className="pxm-select">Pacific time<i className="ri-arrow-down-s-line"></i></span>}>
        <div className="pxm-sched">
          <div className="pxm-sched-ax"><span></span><span>6a</span><span>10a</span><span>2p</span><span>6p</span><span>10p</span></div>
          {days.map(([d, a, b]) => (
            <div className="pxm-sched-row" key={d}>
              <span>{d}</span>
              <div className="pxm-sched-track">
                {a ? <i style={{ left: pct(a), width: `calc(${pct(b)} - ${pct(a)})` }}>{`${a > 12 ? a - 12 : a}–${b > 12 ? b - 12 : b}`}</i> : <em>Closed · after-hours menu</em>}
              </div>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--holiday">
        <span className="pxm-cal"><em>Dec</em><b>25</b></span>
        <span className="pxm-float-t"><b>Holiday · closed</b><em>After-hours attendant on</em></span>
      </Float>
    </>
  );
}

function Handling() {
  return (
    <>
      <App id="handling" crumb="Calls" title="Active calls" action={<Pill s="ok">2 live</Pill>}>
        <div className="pxm-callcard">
          <div className="pxm-callcard-top">
            <Av n="JL" t="b" />
            <span className="pxm-who-t"><b>Jordan Lee</b><em>+1 (312) 555-0187 · with Daniel Reyes</em></span>
            <span className="pxm-rec"><i></i>04:12</span>
          </div>
          <div className="pxm-acts">
            {[['ri-parking-box-line', 'Park', 1], ['ri-pause-line', 'Hold'], ['ri-arrow-left-right-line', 'Transfer'], ['ri-smartphone-line', 'Flip'], ['ri-mic-off-line', 'Mute']].map(([ic, l, on]) => (
              <span className={`pxm-act${on ? ' on' : ''}`} key={l}><i className={ic}></i>{l}</span>
            ))}
          </div>
        </div>
        <div className="pxm-table">
          <div className="pxm-tr pxm-cols-park"><span className="pxm-slot">701</span><span className="pxm-who-t"><b>Jordan Lee</b><em>Parked by Daniel · 0:18</em></span><Btn ghost icon="ri-phone-line">Pick up</Btn></div>
        </div>
      </App>
      <Float className="pxm-float--flip">
        <span className="pxm-flip"><i className="ri-computer-line"></i><b></b><i className="ri-smartphone-line"></i></span>
        <span className="pxm-float-t"><b>Call moved to mobile</b><em>No drop, no redial</em></span>
      </Float>
    </>
  );
}

function Directory() {
  const p = [['PS', 'a', 'Priya Sharma', 'Front desk', 'ok', 'Available'], ['DR', 'b', 'Daniel Reyes', 'Sales', 'busy', 'On a call'], ['AK', 'c', 'Aisha Khan', 'Support', 'dnd', 'In a meeting'], ['MB', 'd', 'Marco Bianchi', 'Billing', 'away', 'Away']];
  return (
    <>
      <App id="directory" crumb="Directory" title="Company directory" action={<span className="pxm-tabs"><span className="on">All</span><span>Sales</span><span>Support</span></span>}>
        <div className="pxm-table">
          {p.map(([i, t, n, d, s, l]) => (
            <div className="pxm-tr pxm-cols-dir" key={n}>
              <span className="pxm-who"><span className={`pxm-pres pxm-pres--${s}`}><Av n={i} t={t} /></span><span><b>{n}</b><em>{d}</em></span></span>
              <span className={`pxm-state pxm-state--${s}`}>{l}</span>
              <span className="pxm-iconbtns"><i className="ri-chat-3-line"></i><i className="ri-phone-fill"></i></span>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--dnd">
        <span className="pxm-float-ic pxm-float-ic--red"><i className="ri-calendar-event-line"></i></span>
        <span className="pxm-float-t"><b>Aisha · Do not disturb</b><em>From calendar · until 3:00 pm</em></span>
      </Float>
    </>
  );
}

function Paging() {
  return (
    <>
      <App id="paging" crumb="Paging" title="Paging zones" action={<Btn icon="ri-broadcast-line">Page all</Btn>}>
        <div className="pxm-table">
          <div className="pxm-tr pxm-th pxm-cols-zone"><span>Zone</span><span>Devices</span><span></span></div>
          {[['ri-store-2-line', 'Warehouse', '12 speakers', 1], ['ri-building-line', 'Floor 1', '18 phones'], ['ri-building-4-line', 'Floor 2', '22 phones'], ['ri-team-line', 'Managers', '6 phones']].map(([ic, n, s, on]) => (
            <div className={`pxm-tr pxm-cols-zone${on ? ' is-hot' : ''}`} key={n}>
              <span className="pxm-who"><span className="pxm-tile"><i className={ic}></i></span><b>{n}</b></span>
              <span className="pxm-dim">{s}</span>
              <span>{on ? <span className="pxm-wave"><i></i><i></i><i></i><i></i><i></i></span> : <Btn ghost icon="ri-megaphone-line">Page</Btn>}</span>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--mic">
        <span className="pxm-float-ic is-ring"><i className="ri-mic-fill"></i></span>
        <span className="pxm-float-t"><b>On air · Warehouse</b><em>Hold to talk</em></span>
      </Float>
    </>
  );
}

function Sites() {
  const s = [['NY', 'New York HQ', '+1 (212) 555-0100', '64', '8'], ['AU', 'Austin', '+1 (512) 555-0123', '38', '5'], ['SE', 'Seattle', '+1 (206) 555-0175', '47', '6'], ['RT', 'Remote team', '+1 (800) 555-0199', '35', '4']];
  return (
    <>
      <App id="sites" crumb="Locations" title="Locations" action={<Btn>Add location</Btn>}>
        <div className="pxm-table">
          <div className="pxm-tr pxm-th pxm-cols-site"><span>Site</span><span>Caller ID</span><span>Users</span><span>Numbers</span></div>
          {s.map(([c, n, id, u, k]) => (
            <div className="pxm-tr pxm-cols-site" key={c}>
              <span className="pxm-who"><span className="pxm-code">{c}</span><b>{n}</b></span>
              <span className="pxm-mono">{id}</span>
              <span>{u}</span>
              <span>{k}</span>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--sites">
        <span className="pxm-float-ic"><i className="ri-node-tree"></i></span>
        <span className="pxm-float-t"><b>4 sites · 1 parent account</b><em>One bill, one console</em></span>
      </Float>
    </>
  );
}

function Reliable() {
  return (
    <>
      <App id="reliable" crumb="Line health" title="Line health" action={<Pill s="ok">All systems normal</Pill>}>
        <div className="pxm-table">
          {[['ri-map-pin-line', 'Emergency address', '200 Market St, Floor 4', 'Verified'], ['ri-server-line', 'SIP trunk · HQ', 'Existing PBX connected', 'Connected'], ['ri-mail-line', 'Voicemail to email', 'On for every line', 'On'], ['ri-shield-check-line', 'e911 location sync', 'Desk and mobile', 'Active']].map(([ic, t, s, st]) => (
            <div className="pxm-tr pxm-cols-health" key={t}>
              <span className="pxm-who"><span className="pxm-tile"><i className={ic}></i></span><span><b>{t}</b><em>{s}</em></span></span>
              <span><Pill s="ok">{st}</Pill></span>
            </div>
          ))}
        </div>
      </App>
      <Float className="pxm-float--vm">
        <span className="pxm-float-ic"><i className="ri-voiceprint-line"></i></span>
        <span className="pxm-float-t"><b>New voicemail · 0:42</b><em>Transcript sent to your inbox</em></span>
      </Float>
    </>
  );
}

// Nature photo behind each product shot (Unsplash), one per feature.
const U = (id) => `https://images.unsplash.com/photo-${id}?fm=jpg&q=72&w=1200&auto=format&fit=crop`;
export const FX_SCENES = {
  ext: U('1472214103451-9374bd1c798e'), // green meadow and hills
  ring: U('1500530855697-b586d89ba3ee'), // mountain valley
  ivr: U('1501854140801-50d01698950b'), // aerial green hills
  hours: U('1482192596544-9eb780fc7f66'), // mountain sunset
  handling: U('1439066615861-d1af74d74000'), // alpine lake
  directory: U('1447752875215-b2761acb3c5d'), // forest path
  paging: U('1475924156734-496f6cac6ec1'), // sea at sunset
  sites: U('1454496522488-7a8e488e8606'), // snowy peak
  reliable: U('1505765050516-f72dcac9c60e'), // calm lake
};

const MOCKS = { ext: Extensions, ring: RingGroups, ivr: Ivr, hours: Hours, handling: Handling, directory: Directory, paging: Paging, sites: Sites, reliable: Reliable };

export default function FxMock({ id }) {
  const M = MOCKS[id];
  if (!M) return null;
  return (
    <div className={`pxm pxm--${id}`} aria-hidden="true">
      <M />
    </div>
  );
}
