# Add the captured "Business Voice & Text" page as /cloud-phone/phone-texting

Source: `C:/Users/LENOVO/Downloads/Business Voice & Text - Unified Communications - Nextiva.html`
plus its sibling `_files` capture directory.

Decisions taken with the user before starting:

- **Exact port**, built the way the homepage was — generated block components,
  the capture's own stylesheets, its scripts rewritten as React hooks.
- **Nextiva branding kept.** The capture ships the CSS its `nextiva-*` classes
  need, so markup and stylesheets stay in sync without a rebrand.
- **The page keeps its own header and footer**, so the route is self-consistent
  rather than mixing this page's copy with the rebranded homepage chrome.

## Plan

- [x] Write `tools/generate-business-voice.mjs` — additive, reuses
      `tools/htmlutil.mjs`, writes only to `components/business-voice/`,
      `styles/business-voice/` and `public/media/bv/`
- [x] Resolve assets: capture directory first, then the homepage's
      `public/media` (same theme), remote URL as a last resort
- [x] Strip the live HubSpot submission — endpoint, 82 hidden attribution
      fields, `hs_context` (it carried the capturing browser's tracking cookie)
      and the post-target iframe
- [x] Port the 13 block scripts: reuse the homepage's `useHeaderNav`,
      `useLogoMarquee`, `useStickyCta`, `useFooterBrand`; write the rest under
      `hooks/business-voice/`
- [x] Wire `app/cloud-phone/phone-texting/page.jsx` with the capture's section
      order, wrapper classes and metadata
- [x] Verify

## Verification

| Check | Result |
| --- | --- |
| JSX/ESM parse, every generated and hand-written file | passes |
| Server render of the whole page tree | 160 KB of markup, no errors |
| React warnings | none |
| Class-token histogram vs the capture | identical, bar the 7 wrapper tokens that live in `page.jsx` |
| Copy | 1149 distinct words in the capture, 0 missing |
| Element count | 2215 in the capture, 2127 generated — the 88 removed are the 82 hidden HubSpot fields, 2 iframes and 4 wrappers moved into `page.jsx` |
| `/media/…` references | 45 distinct, all present on disk |
| Homepage files | untouched (only `tools/htmlutil.mjs` gained a `fetchpriority` mapping) |

## Review

The page renders from generated components; re-run
`node tools/generate-business-voice.mjs` to rebuild it from the capture.

Two things worth knowing:

- **Two images still point at nextiva.com** — `portrait-woman-eyes-closed-red-blue.png`
  and `illustration-mountain-peak-glow-navy.png`. The browser never saved them
  and the homepage build does not have them either. Drop them into
  `public/media/bv/` and re-run the generator to make the page fully local.
- **Seven stale files** from an earlier generator run sit in
  `styles/business-voice/` (`26-ucxm-chat-style.css`, `27-onetrust-style.css`,
  the two `28/29-hs-form-style…` duplicates, `30-goober.css`, `31-style.css`,
  `32-6si-shortening.css`). Nothing imports them — `index.css` is the only entry
  point — so they are inert, but they can be deleted.

The demo form validates and then does nothing: the visible fields are the
page's design, the submission machinery belonged to Nextiva's HubSpot portal.
