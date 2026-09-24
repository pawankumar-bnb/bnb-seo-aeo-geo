# bnb-seo-aeo-geo

SEO / AEO / GEO optimisation console for **bricknbolt.com**, laid out as a
builder's snag list: every pointer carries what was measured, why it matters in
plain English, and what to do about it.

Two sections:

1. **SEO Optimize** — whether Google can find, crawl, understand and rank the
   pages that already exist. Architecture first.
2. **AEO / GEO Optimize** — whether ChatGPT, Google AI Overviews and Perplexity
   quote Brick&Bolt rather than a third-party listicle.

## Files

| File            | What it is                                                        |
| --------------- | ----------------------------------------------------------------- |
| `index.html`    | Standalone page — this is what GitHub Pages serves                 |
| `artifact.html` | Same shell without a document skeleton, for publishing as an Artifact |
| `app.css`       | All styling. Tokens at the top, light and dark themes              |
| `data.js`       | **The content.** One `SNAGS` array — extend this                   |
| `app.js`        | Renders rows, groups, tallies and filters from `SNAGS`             |

## Extending it

Everything on the page is rendered from the `SNAGS` array in `data.js`. Adding a
pointer means appending one object — no markup changes, no build step:

```js
{
  section:  'seo',              // 'seo' | 'aeo'
  group:    'On-page signals',  // sub-heading it sits under
  ref:      'ONP-06',           // code shown in the left rail
  src:      'H2',               // where the finding came from, or 'live'
  status:   'fail',             // 'fail' | 'warn' | 'pass' | 'unknown'
  severity: 'High',             // 'Critical' | 'High' | 'Medium' | 'Low' | ''
  title:    'Short plain-English headline',
  why:      'Why this matters, written for a non-technical reader.',
  evidence: 'What was actually measured.',
  fix:      'The action to take.',
}
```

`status` drives the pills, the filter chips and the per-section tallies.

`unknown` is deliberate and load-bearing: it marks what has **not** been measured
yet rather than quietly omitting it. An audit that hides its gaps is worth
nothing the moment somebody checks it.

## Running locally

```
python3 -m http.server 8777
```

Then open `http://127.0.0.1:8777`. Note that Python's server omits the charset
header, so em dashes render as mojibake locally; GitHub Pages and the Artifact
host both send `charset=utf-8` correctly.

## Provenance

Figures were measured from production URLs on 22 September 2026 using a headless
rendering browser, computed styles and full sitemap enumeration — not copied from
a third-party tool. Rows marked `unknown` need Search Console access, a licensed
backlink source, or first-hand answer-engine observation.
