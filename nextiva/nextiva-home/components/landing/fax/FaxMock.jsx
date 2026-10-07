'use client';
/* Working hero mockup for the Online Fax page. Send: pick a recipient and a
   document, add a cover page and send — it dials, connects and transmits
   page by page, then shows the delivery confirmation. Inbox: a new fax
   arrives a few seconds after load; search finds faxes by the text on their
   pages, and a fax can be signed or forwarded from the preview. */
import { useEffect, useRef, useState } from 'react';

const CONTACTS = [
  { id: 'nsc', name: 'Northside Clinic', num: '+1 (312) 555-0198' },
  { id: 'lvl', name: 'Lakeview Labs', num: '+1 (617) 555-0123' },
  { id: 'hca', name: 'Harbor Counsel', num: '+1 (206) 555-0177' },
];
const DOCS = [
  { id: 'ref', name: 'patient-referral.pdf', pages: 3 },
  { id: 'auth', name: 'prior-auth.pdf', pages: 2 },
  { id: 'nda', name: 'signed-nda.pdf', pages: 1 },
];
const INBOX = [
  { id: 'f2', from: 'Harbor Counsel', pages: 4, at: '09:12', text: 'Signed engagement letter for matter 2291, countersignature required.' },
  { id: 'f3', from: 'Medisure Insurance', pages: 2, at: 'Yesterday', text: 'Prior authorization approved for MRI, reference PA-55812.' },
];
const NEW_FAX = { id: 'f1', from: 'Lakeview Labs', pages: 2, at: 'Just now', text: 'Lab results for patient referral, CBC panel within normal range.', fresh: true };

export default function FaxMock({ page }) {
  const [tab, setTab] = useState('send');
  const [to, setTo] = useState('nsc');
  const [doc, setDoc] = useState('ref');
  const [cover, setCover] = useState(true);
  const [tx, setTx] = useState({ state: 'idle', page: 0 }); // idle | dialing | connected | sending | done
  const [inbox, setInbox] = useState(INBOX);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const [sent, setSent] = useState(0);
  const timers = useRef([]);
  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // A new fax arrives a few seconds after the page loads.
  useEffect(() => { later(() => setInbox((cur) => [NEW_FAX, ...cur]), 5000); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const contact = CONTACTS.find((c) => c.id === to);
  const file = DOCS.find((d) => d.id === doc);
  const total = file.pages + (cover ? 1 : 0);
  const unread = inbox.filter((f) => f.fresh).length;

  const send = () => {
    if (tx.state !== 'idle') return;
    setTx({ state: 'dialing', page: 0 });
    later(() => setTx({ state: 'connected', page: 0 }), 900);
    for (let i = 1; i <= total; i += 1) later(() => setTx({ state: 'sending', page: i }), 900 + 600 * i);
    later(() => { setTx({ state: 'done', page: total }); setSent((n) => n + 1); }, 900 + 600 * total + 500);
  };
  const reset = () => setTx({ state: 'idle', page: 0 });

  const openFax = (f) => {
    setOpen(f.id);
    setInbox((cur) => cur.map((x) => (x.id === f.id ? { ...x, fresh: false } : x)));
  };
  const act = (id, patch) => setInbox((cur) => cur.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const term = q.trim().toLowerCase();
  const shown = inbox.filter((f) => !term || f.text.toLowerCase().includes(term) || f.from.toLowerCase().includes(term));
  const current = inbox.find((f) => f.id === open);
  const mark = (text) => {
    if (!term) return text;
    const i = text.toLowerCase().indexOf(term);
    if (i < 0) return text;
    return <>{text.slice(0, i)}<mark>{text.slice(i, i + term.length)}</mark>{text.slice(i + term.length)}</>;
  };

  return (
    <div className="fxm" role="region" aria-label="Interactive online fax demo">
      <div className="fxm-head">
        <span className="lp-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="fxm-title">
          <span className="lp-panel-badge"><i className={page.icon} aria-hidden="true"></i></span>
          Fax · +1 (415) 555-0110
        </span>
        <span className="fxm-enc"><i className="ri-lock-2-fill" aria-hidden="true"></i>Encrypted</span>
      </div>

      <div className="fxm-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'send'} className={tab === 'send' ? 'is-on' : ''} onClick={() => setTab('send')}>
          <i className="ri-send-plane-line" aria-hidden="true"></i>Send
        </button>
        <button type="button" role="tab" aria-selected={tab === 'inbox'} className={tab === 'inbox' ? 'is-on' : ''} onClick={() => { setTab('inbox'); setOpen(null); }}>
          <i className="ri-inbox-2-line" aria-hidden="true"></i>Inbox{unread > 0 && <b>{unread}</b>}
        </button>
      </div>

      {tab === 'send' ? (
        tx.state === 'idle' ? (
          <div className="fxm-pane">
            <span className="fxm-k">To</span>
            <div className="fxm-to" role="group" aria-label="Recipient">
              {CONTACTS.map((c) => (
                <button key={c.id} type="button" className={to === c.id ? 'is-on' : ''} aria-pressed={to === c.id} onClick={() => setTo(c.id)}>
                  <b>{c.name}</b><em>{c.num}</em>
                </button>
              ))}
            </div>
            <span className="fxm-k">Document</span>
            <div className="fxm-docs" role="group" aria-label="Document">
              {DOCS.map((d) => (
                <button key={d.id} type="button" className={doc === d.id ? 'is-on' : ''} aria-pressed={doc === d.id} onClick={() => setDoc(d.id)}>
                  <i className="ri-file-pdf-2-line" aria-hidden="true"></i>
                  <span>{d.name}</span>
                  <em>{d.pages} pg</em>
                </button>
              ))}
            </div>
            <div className="fxm-send-row">
              <label className="fxm-cover">
                <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} />
                <span aria-hidden="true"></span>Cover page
              </label>
              <span className="fxm-total">{total} page{total > 1 ? 's' : ''}</span>
              <button type="button" className="fxm-go" onClick={send}>
                <i className="ri-send-plane-2-fill" aria-hidden="true"></i>Send fax
              </button>
            </div>
          </div>
        ) : (
          <div className="fxm-pane fxm-tx" aria-live="polite">
            <div className="fxm-tx-top">
              <span className={`fxm-tx-state fxm-tx-state--${tx.state}`}>
                <i aria-hidden="true"></i>
                {tx.state === 'dialing' ? 'Dialing…' : tx.state === 'connected' ? 'Connected · negotiating' : tx.state === 'sending' ? `Sending page ${tx.page} of ${total}` : 'Delivered'}
              </span>
              <span className="fxm-tx-to">{contact.name}</span>
            </div>
            <div className="fxm-pages" aria-hidden="true">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`fxm-sheet${i < tx.page ? ' is-sent' : ''}${tx.state === 'sending' && i === tx.page - 1 ? ' is-now' : ''}`}>
                  <i></i><i></i><i></i>
                  <em>{cover && i === 0 ? 'Cover' : `p.${cover ? i : i + 1}`}</em>
                </span>
              ))}
            </div>
            {tx.state === 'done' ? (
              <div className="fxm-conf">
                <span className="fxm-conf-ic"><i className="ri-checkbox-circle-fill" aria-hidden="true"></i></span>
                <span className="fxm-conf-txt">
                  <b>Delivered to {contact.num}</b>
                  <em>{total} pages · {file.name} · Audit ID FX-{String(4820 + sent).padStart(5, '0')}</em>
                </span>
                <button type="button" onClick={reset}>Send another</button>
              </div>
            ) : (
              <div className="fxm-bar"><i style={{ width: `${Math.round((tx.page / total) * 100)}%` }}></i></div>
            )}
          </div>
        )
      ) : (
        <div className="fxm-pane fxm-in">
          {current ? (
            <div className="fxm-view">
              <button type="button" className="fxm-back" onClick={() => setOpen(null)}><i className="ri-arrow-left-line" aria-hidden="true"></i>Inbox</button>
              <div className="fxm-view-body">
                <span className="fxm-thumb" aria-hidden="true"><i></i><i></i><i></i><i></i><b>{current.pages} pg</b></span>
                <div className="fxm-view-txt">
                  <b>{current.from}</b>
                  <em>{current.at} · {current.pages} pages · searchable PDF</em>
                  <p>{mark(current.text)}</p>
                  <div className="fxm-view-acts">
                    <button type="button" className={current.signed ? 'is-on' : ''} onClick={() => act(current.id, { signed: true })} disabled={current.signed}>
                      <i className="ri-quill-pen-line" aria-hidden="true"></i>{current.signed ? 'Signed' : 'Sign'}
                    </button>
                    <button type="button" className={current.fwd ? 'is-on' : ''} onClick={() => act(current.id, { fwd: true })} disabled={current.fwd}>
                      <i className="ri-share-forward-line" aria-hidden="true"></i>{current.fwd ? 'Forwarded' : 'Forward'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <label className="fxm-search">
                <i className="ri-search-line" aria-hidden="true"></i>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search text inside faxes…" aria-label="Search faxes" />
              </label>
              <ul className="fxm-list">
                {shown.map((f) => (
                  <li key={f.id}>
                    <button type="button" className={`fxm-item${f.fresh ? ' is-new' : ''}`} onClick={() => openFax(f)}>
                      <span className="fxm-item-ic"><i className="ri-file-text-line" aria-hidden="true"></i></span>
                      <span className="fxm-item-txt">
                        <span className="fxm-item-top"><b>{f.from}</b><em>{f.at}</em></span>
                        <span className="fxm-item-snip">{mark(f.text)}</span>
                      </span>
                      {f.fresh && <span className="fxm-new">New</span>}
                      {f.signed && <i className="ri-quill-pen-fill fxm-signed" aria-label="Signed"></i>}
                    </button>
                  </li>
                ))}
                {shown.length === 0 && <li className="fxm-none">No fax mentions “{q}”.</li>}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
