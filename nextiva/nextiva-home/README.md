# ucaas-home

A React / Next.js rebuild of a UCaaS marketing homepage, reconstructed from the
DOM capture in `www.nextiva.com.zip` (extracted to `C:/Users/ADMIN/nxz`) and
rebranded to **UCaaS**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Everything is React

No vanilla bundles, no jQuery, no `public/js`. The original theme shipped ~25
scripts (webpack blobs, jQuery, Slick, Owl Carousel); all behaviour that applies
to this page has been rewritten as React hooks and components.

| Behaviour | Where it lives |
| --- | --- |
| Reveal-on-scroll, offscreen animation pausing | `hooks/useRevealOnScroll.js` |
| Mega menus, mobile panel, scroll hide/reveal | `hooks/useHeaderNav.js` |
| Review counter, live stat tiles, Today/30-Days toggle | `hooks/useHeroShowcase.js` |
| Tab switching, visual pausing, header counters | `hooks/useFeatureTabs.js` |
| The three showcase card sequences | `hooks/useSplitShowcase.js` |
| Billing switch + audience pill toggle | `hooks/usePricingGrid.js` |
| Draggable card rails with prev/next | `hooks/useIndustryCarousel.js` |
| Sticky CTA visibility and dismissal | `hooks/useStickyCta.js` |
| Giant wordmark reveal, copyright year | `hooks/useFooterBrand.js` |
| Logo marquee keyframe generation | `hooks/useLogoMarquee.js` |
| Drifting particle / ember fields | `hooks/useParticleFields.js` |
| AI call demo — transcript, timer, summary | `components/hero/CallPanel.jsx` |
| Interactive chat card | `components/hero/HeroChatThread.jsx` |

The two hero components are the parts the original built with
`document.createElement`; they are now state-driven and React renders the list.
The generator swaps them in via the `SLOTS` table in `tools/generate.mjs`.

Everything else is markup, so its block component takes a root ref and hands it
to the matching hook — the idiomatic React way to drive class-based CSS
animations without rewriting the stylesheets.

Behaviour in the original that targets elements this page does not have (video
lightbox, HubSpot form validation, the gravity-pill spotlight, the star field,
social-proof "show all") was verified absent and not ported. The selector audit
is reproducible with `tools/peek.mjs`.

### Particle fields

Four containers on the page get JS-spawned particles — they have CSS but no
markup, so nothing shows until the script fills them in:

| Container | Effect |
| --- | --- |
| `#heroFloatingParticles` | drifting motes over the hero |
| `#floatingParticles` | the same field mid-page |
| `#dustParticlesEnterprise` | warm embers drifting right |
| `.dust-particles--founder` | warm embers drifting left, with a staggered start |

All four pause when their container leaves the viewport or the tab is hidden.

**Verifying them is awkward in a headless browser**: a pane that never
composites reports `document.hidden === true` and never fires
IntersectionObserver, so the fields correctly stay paused and appear broken. To
test the code path anyway, stub the observer from the console before triggering
a Fast Refresh:

```js
Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, intersectionRatio: 1, target: el }], this); }
  unobserve() {} disconnect() {}
};
```

## Rebranding

Every occurrence of the original brand is replaced, case-preserving:
`Nextiva → UCaaS`, `nextiva → ucaas`, `NEXTIVA → UCAAS`. This runs inside the
generator (`rebrand()`), so copy, class names, ids, CSS selectors, stylesheet
filenames and URLs all move together and nothing desynchronises.

`grep -ri nextiva app components hooks styles public` returns nothing.

Two consequences worth knowing:

- Same-site links became relative paths (`/pricing`, `/download`).
- Subdomain and social links became placeholders (`help.ucaas.com`,
  `app.ucaas.io`, `facebook.com/UCAAS`). They are not real destinations — point
  them at your own before shipping.

## How close is it to the original layout?

`node tools/fidelity.mjs` (with the dev server running) diffs the rendered HTML
against the capture, applying the same rebrand to both sides:

| Metric | Capture | Rendered |
| --- | --- | --- |
| Elements | 2713 | 2715 |
| Class-token references | 2652 | 2652 (**0 differing keys**) |
| Visible words | 3287 | 3287 |

The two extra elements are both explained:

- **+1 `<br>`** — the source contains a stray `</br>`, which browsers render as a
  line break. JSX has no equivalent, so it becomes a real `<br />`.
- **+1 `<div hidden="">`** — React's Suspense streaming marker
  (`<div hidden><!--$--><!--/$--></div>`), emitted by Next in both dev and
  production. It is inert and renders nothing.

Text differs only in HTML entity spelling (`&#8217;` vs `’`), which renders
identically. A zero-difference class histogram also confirms the hand-authored
`CallPanel` and `HeroChatThread` reproduce the original markup exactly.

Verified in-browser: 76/76 images load, no console errors, tab switching, the
billing toggle (15 ↔ 23), the audience pills, mega menu open/Escape, the sticky
CTA appearing after the hero and hiding at the footer, all three showcase card
sequences, counters settling on 1B+ / 100,000+ / 17, the chat card replying to
typed input, and reveal-on-scroll reaching 22/27 on a scroll pass.

## Layout

```
app/
  layout.jsx          <html>/<body>, metadata, fonts
  page.jsx            section order — the only hand-assembled composition
components/
  blocks/*.jsx        generated, one per block; interactive ones are client
                      components wired to a hook
  hero/*.jsx          hand-written, state-driven hero pieces
  PageEffects.jsx     page-wide scroll effects
hooks/*.js            hand-written behaviour
styles/
  globals.css         @import chain, in the original cascade order
  NN-*.css            each <style> block and <link> stylesheet, numbered by
                      document position so specificity ties resolve the same way
public/media/         all images and fonts (102, fully local)
tools/
  generate.mjs        rebuilds components/blocks, styles/ and public/ from the capture
  htmlutil.mjs        HTML tokenizer + HTML→JSX converter
  scan.mjs            prints the capture's DOM tree
  peek.mjs            prints a captured bundle's module code, minus boilerplate
  fidelity.mjs        rendered-vs-capture diff
```

`components/blocks/`, `styles/` and `public/` are generated. To change the
output, edit `tools/generate.mjs` and run:

```bash
npm run generate
```

Hand-written files (`components/hero/`, `components/PageEffects.jsx`, `hooks/`,
`app/`) are never touched by the generator.

## The second page: /cloud-phone/phone-texting

The Business Voice & Text page is a second capture, ported the same way and kept
entirely separate from the homepage build:

```
app/cloud-phone/phone-texting/page.jsx   section order + metadata
components/business-voice/*.jsx          generated, one per block
components/BusinessVoiceEffects.jsx      page-wide effects for this route
hooks/business-voice/*.js                its block behaviour
styles/business-voice/                   its stylesheet chain, imported by the route
public/media/bv/                         its images
tools/generate-business-voice.mjs        rebuilds the three generated directories
```

```bash
node tools/generate-business-voice.mjs ["path/to/capture.html"]
```

Three things differ from the homepage build:

- **No rebrand.** This page keeps its Nextiva naming, because the capture ships
  the CSS that its `nextiva-*` class names need. The homepage's rebranded
  stylesheets are untouched and the two pages do not share brand-named classes.
- **Its stylesheets are imported by the route**, not by the root layout, so they
  load on this page and cannot restyle the homepage.
- **Four behaviours are shared, not duplicated**: the header, logo marquee,
  sticky CTA and footer wordmark are the same upstream blocks, down to their
  `data-nb20-*` hooks, so this page reuses `hooks/useHeaderNav`,
  `useLogoMarquee`, `useStickyCta` and `useFooterBrand`.

The demo form is inert by design. The capture was saved after HubSpot had
rendered it, so the markup arrived with a live endpoint into Nextiva's portal,
~40 hidden attribution fields and an `hs_context` blob carrying the capturing
browser's tracking cookie. The generator drops all of that; the visible fields,
their validation, the phone mask and the two-column layout remain.

## Assets

All 102 images and fonts are local. 35 were missing from the capture (the
original lazy-loads them) and the generator downloads them on first run; the
only failure is `owl.video.play.png`, which 404s upstream and belongs to a
carousel this page does not use.

Note the generator needs network access on a clean checkout for that download
step. Once `public/media/` is populated it re-runs offline.

## Deliberate omissions

**All third-party tracking was left out.** The original page loads ~90
analytics, advertising, cookie-sync and B2B de-anonymization hosts (Google Ads,
Meta, TikTok, LinkedIn, Criteo, 6sense, ZoomInfo, HubSpot, OptinMonster, VWO,
OneTrust…). None of it affects layout, none would work without the original
account keys, and shipping it would mean tracking your visitors on someone
else's tag IDs. The live-chat widget is omitted for the same reason.

Two external requests remain by design: Google Fonts (Space Grotesk) and the
Remix Icon stylesheet on jsDelivr. Both are trivial to self-host if you want a
fully offline build.

## Note on reuse

The layout, copy and imagery originate from a captured commercial homepage. The
brand name has been replaced, but the visual design and marketing copy have not.
Replace the content before publishing.
