/* ═══════════════════════════════════════════════════════════════════════════
   SNAGS — the single source of truth for this page.
   Append objects here; the DOM builds itself. Shape:
     section  'seo' | 'aeo'
     group    sub-heading this row sits under
     ref      short code shown in the left rail
     src      where the finding came from (audit ref, or 'live')
     status   'fail' | 'warn' | 'pass' | 'unknown'
     severity 'Critical' | 'High' | 'Medium' | 'Low' | ''
     title    what to fix, in plain words
     why      why it matters, for a non-technical reader
     evidence what was actually measured
     fix      the action to take
   ═════════════════════════════════════════════════════════════════════════ */
const SNAGS = [

/* ── SEO · Architecture ─────────────────────────────────────────────────── */
{section:'seo', group:'Architecture and consolidation', ref:'ARC-01', src:'C1', status:'fail', severity:'Critical',
 title:'City pages compete against each other',
 why:'Nine separate pages target “construction company in Bengaluru”. Google splits the credit between them, then picks one you did not choose. Your strongest competitor for your most valuable search term is yourself.',
 evidence:'192 city-level pages across 10 cities. 166 sit in 44 competing clusters. 122 pages would disappear if each cluster kept one primary.',
 fix:'Nominate one primary page per city per intent. Consolidate the rest by redirect or subordinate by canonical. Needs Search Console data first — some of these earn traffic today.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-02', src:'live', status:'fail', severity:'Critical',
 title:'Commercial-construction template never inserts the city name',
 why:'The title is the blue clickable line in Google and the strongest signal of what a page is about. On these pages it reads “Commercial Construction in  - Brick&Bolt” with the city missing, and every one of them is identical. The H1 is completely empty.',
 evidence:'21 URLs share one city-less title. H1 renders as an empty string. Meta description truncates at “Commercial Building in ”. og:title says “House Construction” — wrong service. Body copy is correct: 43 mentions of Bengaluru.',
 fix:'Fix the template variable. Content is already city-specific — only the labelling is broken, so this is roughly an hour of developer time for a real gain.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-03', src:'live', status:'warn', severity:'Low',
 title:'Ten pages reachable at two web addresses',
 why:'Each page answers on both a hyphen and a slash address. The canonical tag is set correctly, so Google is told which one counts — it wastes crawl budget and splits any links people build, but it is not misleading anyone.',
 evidence:'10 pairs, e.g. /commercial-construction-bengaluru and /commercial-construction/bengaluru. Both HTTP 200; canonical on both points at the hyphen form.',
 fix:'Redirect the slash form to the hyphen form when the consolidation work lands. Low priority — the canonical already does the important part.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-04', src:'H5', status:'fail', severity:'High',
 title:'Sitemap is one giant file with duplicate entries',
 why:'The sitemap is the page list you hand Google. One 2.5 MB file with near-identical dates tells you nothing about what was accepted. Splitting it by page type turns “we do not know what is indexed” into a number you can read weekly.',
 evidence:'12,460 entries in the main file, 2.5 MB, 114 lastmod values inside one second. Supplementary files 98.9–100% redundant: 2,918 duplicate submissions.',
 fix:'Split into a sitemap index segmented by template with accurate lastmod. Prerequisite for measuring the consolidation work.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-05', src:'GSC 28d', status:'fail', severity:'High',
 title:'Roughly 3 in 5 published pages drew no impression at all',
 why:'An impression proves a page is indexed, so counting pages that drew at least one gives a measured floor. That floor is 4,656 against 12,458 published \u2014 37 per cent. The other ~7,800 are either not indexed or indexed and never shown for any query, and those two need different fixes. Publishing at this scale is only worth the crawl budget if the pages surface.',
 evidence:'GSC, 28 days to 24 Sep 2026: 4,656 distinct URLs drew at least one impression; 3,027 drew 10 or more; 1,789 drew 100 or more; 1,286 earned at least one click. Against 12,458 URLs enumerated from the sitemaps, that is a 37.4% floor on indexation and ~7,802 URLs unseen.',
 fix:'Treat 4,656 as the measured floor, not the answer. Separating \u201cnot indexed\u201d from \u201cindexed but never surfaced\u201d needs the GSC Page Indexing report, which is not ingested into Metabase today (crawl section 9) \u2014 it is readable directly in Search Console now, and ingesting it is the single highest-value data gap. Segmented sitemaps (ARC-04) make it readable per template.'},

/* ── SEO · On-page ──────────────────────────────────────────────────────── */
{section:'seo', group:'On-page signals', ref:'ONP-01', src:'H6', status:'fail', severity:'High',
 title:'Contractor page titles are lower case with no brand',
 why:'These titles read “construction contractors bengaluru” — no capitals, no brand, no separator. That is what appears in Google results. It looks unfinished beside competitors and throws away 1,469 free chances to show the name.',
 evidence:'Affects roughly 1,469 URLs. Template also carries a single structured-data node and no local, service or FAQ markup.',
 fix:'Apply the city-template title pattern including the brand token, and bring structured data to parity.'},

{section:'seo', group:'On-page signals', ref:'ONP-02', src:'H1', status:'fail', severity:'High',
 title:'Half the photographs have no description',
 why:'For a construction company, project photography is a main route into Google Images and picture-led results. An unlabelled photo is invisible to search. One sits inside a link with no other text, which makes that link invisible too.',
 evidence:'Homepage 5 of 10 images carry an empty alt. City page 59 of 148. Floor plan 17 of 46. Blog 6 of 20.',
 fix:'Descriptive alt text on all content imagery. Decorative images keep an empty attribute deliberately, not by default.'},

{section:'seo', group:'On-page signals', ref:'ONP-03', src:'live', status:'pass', severity:'',
 title:'Almost every link is labelled',
 why:'CORRECTED 28 Sep 2026. Reported as 31 of 81 anchors carrying no text. That count treated any link whose text sits inside an image as unlabelled, which is wrong \u2014 an image with alt text labels its link. Re-measured, 2 of 83 anchors lack a label, and both are app-store badges whose inner span is deliberately aria-hidden.',
 evidence:'Rendered DOM, 28 Sep 2026, homepage: 83 anchors, 82 visible, 2 with no text, no aria-label, no title, no img alt and no svg title. Both point at apps.apple.com and play.google.com.',
 fix:'Add an aria-label to the two app-store links \u2014 \u201cDownload on the App Store\u201d and \u201cGet it on Google Play\u201d. Five minutes, and it clears the check.'}
,

{section:'seo', group:'On-page signals', ref:'ONP-04', src:'L2 / L3', status:'fail', severity:'Low',
 title:'Headlines do not match titles, and omit the brand',
 why:'A visitor should confirm on arrival that they landed in the right place. The brand appears in the title, schema, footer and meta description — but not in the headline, which is among the cheapest entity signals available.',
 evidence:'H1 text is not reflected in the page title. City titles read “Construction Company in Bengaluru | Get a Free Quote” with no brand token. One H1 renders “Construction Companyin Bengaluru” — missing space.',
 fix:'Align H1 with title and introduce the brand token into both.'},

{section:'seo', group:'On-page signals', ref:'ONP-05', src:'M6', status:'fail', severity:'Medium',
 title:'No breadcrumb trail on three page types',
 why:'Breadcrumbs are the “Home › Bengaluru › Construction” path. Google shows them instead of a raw web address, and they help engines understand how the site is organised.',
 evidence:'BreadcrumbList present on the city template; absent from floor-plan, contractor and blog templates.',
 fix:'Extend BreadcrumbList to all non-root templates.'},

/* ── SEO · Rendering ────────────────────────────────────────────────────── */
{section:'seo', group:'What actually renders', ref:'REN-01', src:'live', status:'warn', severity:'Medium',
 title:'Two templates hide real prose; the rest were a measurement error',
 why:'CORRECTED 28 Sep 2026. Earlier figures counted collapsed accordion content as hidden, which understated three templates badly \u2014 the city page read 68% when it is actually 97%. After separating reachable disclosure content from genuinely hidden text, only the blog and floor-plan templates have a real problem, and the blog\u2019s is mostly a benign country-code dropdown.',
 evidence:'Rendered DOM against computed styles, 28 Sep 2026, disclosure content excluded: city 97.0%, contractor 96.5%, calculator 88.9%, homepage 73.3%, floor plan 74.0%, blog 54.3%. Genuinely hidden prose: blog 1,340 words, calculator 717, homepage 710, floor plan 404, city 193.',
 fix:'Look at the floor-plan template (REN-02) and the homepage. Leave the city and contractor templates alone \u2014 they were never the problem.'}
,

{section:'seo', group:'What actually renders', ref:'REN-02', src:'live', status:'pass', severity:'',
 title:'The related-plans module is visible; the carousel is not a problem',
 why:'CORRECTED 28 Sep 2026. Reported here and in the original Adexorb audit as a 737-word related-plans module set to display:none, suppressing internal links across 5,450 pages. It does not reproduce. On an individual plan page the module is present and visible, with a visible h2. Its 49 plan links sit in a carousel, so only the active slide is on screen \u2014 but every link is a real anchor in the DOM and Google follows anchors regardless of slide position.',
 evidence:'Rendered DOM, 28 Sep 2026. /house-floor-plans/40*50-...-v5: section \u201cMore 40\u00d750 House Floor Plans\u201d visible=true, h2 visible=true, 49 links to /house-floor-plans/, 1 visible at a time, 224 anchors total with 166 visible. The largest genuinely hidden block on the page is a \u201cTalk to Our Expert\u201d modal form (44 words), plus a 7-word mobile footer nav and a 6-word duplicate spec strip.',
 fix:'No action on the link module. If the carousel matters for users, that is a UX question, not an indexing one.'}
,

{section:'seo', group:'Content integrity', ref:'REN-03', src:'live', status:'fail', severity:'Critical',
 title:'Every USP card carries a second, search-only copy at one pixel square',
 why:'Located precisely 28 Sep 2026. In the \u201cWhy Brick&Bolt\u201d carousel, each card holds two versions of the same pitch. .whyBnbCard__content is shown to the reader at 298x176 px. Beside it .whyBnbCard__seo holds a longer question-and-answer version at 1x1 px with aria-hidden=\"true\" \u2014 a crawler reads it, nobody else can. Two copies of the same claim, one for people and a longer one for machines, is the shape Google describes as hidden text.',
 evidence:'Rendered DOM, 28 Sep 2026. Path: section.section-usp > div.section-usp__desktop-only > div.container-whybnb > section.whyBnbDesktop > swiper carousel > div.whyBnbCard > div.whyBnbCard__seo. 19 blocks, 1,450 words per page. Identical on /construction-company-bengaluru, -hyderabad, -pune and the locality page /construction-company-whitefield. Absent from homepage, contractor, calculator and blog templates. Visible sibling reads \u201cGet 100% Accurate Quotes\u2026\u201d; the 1x1 sibling reads \u201cNo Cost Overruns \u2014 What if you\u2019re charged more than promised?\u2026\u201d',
 fix:'Escalate. The copy is good and answers real objections \u2014 surface it as visible card content or an expandable panel, or delete it. Do not leave two versions with one sized for crawlers only. Scope is the city and locality templates, so roughly 2,480 URLs, though traffic sits almost entirely on the ten city pages.'}
,

{section:'seo', group:'Server and performance', ref:'TEC-02', src:'M8', status:'fail', severity:'Medium',
 title:'Older compression and connection protocol',
 why:'Modern equivalents load pages faster, especially on the mobile connections most of your buyers use. Most content delivery networks enable both with one toggle.',
 evidence:'HTML served with gzip rather than Brotli. HTTP/2 only; no HTTP/3 advertised on any request.',
 fix:'Enable Brotli and HTTP/3 at the edge.'},

{section:'seo', group:'Server and performance', ref:'TEC-03', src:'live', status:'warn', severity:'Low',
 title:"Image delivery already works; a few individual files are wasteful"
 why:"CORRECTED 28 Sep 2026. Reported as “phones download desktop-sized photographs” because no image carried srcset and some lacked width and height. Measured, neither holds. The site serves device-specific WebP chosen per breakpoint — a different mechanism from srcset, same outcome — and layout shift is already far inside Google’s threshold. Adding srcset and dimensions would change essentially nothing."
 evidence:"Rendered DOM, cache disabled, 28 Sep 2026. Homepage: 53 KB of images on desktop, 54 KB on mobile, CLS 0.0005 and 0. City page: 300 KB desktop, 132 KB mobile — mobile already under half — CLS 0.0012 and 0. Floor plan: 215 KB desktop, 229 KB mobile, CLS 0.0023 and 0.0194. Google treats CLS below 0.10 as good, so every template passes with room to spare. Most images are already WebP and lazy-loaded."
 fix:"Drop srcset and width/height as a programme item. Four specific things are worth fixing: the Google Play badge ships at 1920px for a 170px slot on floor-plan pages; 3.1.png is 1512px for a 729px slot; the floor-plan template still serves ~120 KB of PNG that should be WebP; and it is the one template where mobile downloads more than desktop, which is backwards. Together roughly 150-200 KB on a cohort drawing 158,631 impressions a month — real bandwidth, no ranking effect."},
{section:'seo', group:'Server and performance', ref:'TEC-04', src:'§5', status:'unknown', severity:'Medium',
 title:'Real-world page speed',
 why:'Two automated runs in the original audit disagreed with each other, and one returned zero for every category — which means it did not complete. Lab tools and real-world data routinely disagree, so no performance budget should be spent before this is settled.',
 evidence:'Cold TTFB measured here at 66–322 ms median from a single location — indicative only, not field data.',
 fix:'Read field Core Web Vitals from Search Console before funding any performance work.'},

{section:'seo', group:'Server and performance', ref:'TEC-05', src:'§5', status:'unknown', severity:'Medium',
 title:'Backlink profile and any penalty risk',
 why:'How many other sites link to Brick&Bolt is unknown here. An automated tool reported 4,589 backlinks and an off-page score of 53; that was not independently verified and should not be built on.',
 evidence:'No licensed backlink dataset available from this survey.',
 fix:'Establish a baseline from a licensed source before scoping any remediation.'},

{section:'seo', group:'Server and performance', ref:'TEC-06', src:'S1', status:'pass', severity:'',
 title:'Crawlers are not blocked',
 why:'Often the first thing an agency offers to fix. It does not need fixing here.',
 evidence:'robots.txt permits all agents with no exclusions. Every crawler tested resolves normally. 4 sitemaps declared.',
 fix:'No action. Keep it this way — answer engines cannot cite what they cannot fetch.'},

{section:'seo', group:'Server and performance', ref:'TEC-07', src:'live', status:'pass', severity:'',
 title:'Canonicals and certificates are clean',
 why:'The foundation is genuinely sound. This is why the work below is worth doing — you are not rebuilding a broken site.',
 evidence:'HTTPS with a valid certificate. Self-referencing canonicals on every template tested. No broken internal or external links, no redirect chains, correct viewport.',
 fix:'No action.'},

/* ── AEO · Answer extraction ────────────────────────────────────────────── */
{section:'aeo', group:'Answer extraction', ref:'ANS-01', src:'live', status:'pass', severity:'',
 title:'Declared FAQ answers are all present and reachable',
 why:'CORRECTED 28 Sep 2026. This was previously reported as a critical policy breach \u2014 by this survey and by the original Adexorb audit \u2014 on the basis that the answers did not render. They do. The homepage FAQ is an ordinary accordion: clicking a question flips it from visibility:hidden to visible, and Load More reveals the remaining twelve. Google indexes accordion content and permits it in FAQ rich results, so there is no violation and no risk to rich results here.',
 evidence:'Rendered DOM with interaction, 28 Sep 2026. All 41 declared answers across the three FAQ templates are present in the DOM. Clicking question 1 on the homepage: visibility hidden to visible, opacity 0 to 1, grid rows 0px to 51.19px. Load More cleared the hidden attribute from all 12 remaining items. The city page opens all 10 of its answers at load; the calculator opens 14 of 15.',
 fix:'No action. The earlier finding was a measurement error: the audit tool judged the page at rest and counted collapsed accordion content as hidden. Fixed in lib/probe.mjs by classifying disclosure content as reachable rather than hidden.'}
,

{section:'aeo', group:'Answer extraction', ref:'ANS-02', src:'A2', status:'fail', severity:'High',
 title:'No short quotable answer near the top of the page',
 why:'Answer engines lift self-contained passages, not whole pages. Most pages open with almost nothing before the first section heading, so there is no passage to lift.',
 evidence:'17 words render between the homepage H1 and the first section heading. Blog template has no substantial opening paragraph.',
 fix:'Open each priority page with a 40–60 word paragraph that answers the page’s question on its own, without needing the rest of the page.'},

{section:'aeo', group:'Answer extraction', ref:'ANS-03', src:'A1', status:'fail', severity:'High',
 title:'Section headings are not phrased as the questions buyers ask',
 why:'“Our Process” matches nothing anyone types. “How long does it take to build a house in Bangalore?” matches exactly. Matching headings to real questions is the cheapest route to becoming the quoted answer.',
 evidence:'Question-format headings: 0 on the floor-plan template, few elsewhere. 16 questions exist in FAQ markup but none render as visible headings.',
 fix:'Convert key headings into the question a buyer types, then answer it in the paragraph directly beneath.'},

{section:'aeo', group:'Answer extraction', ref:'ANS-04', src:'live', status:'warn', severity:'Low',
 title:'The homepage reads harder than the city pages, which are fine',
 why:'CORRECTED 28 Sep 2026. Reported as grade 16.1 at 25.5 words per sentence. That figure swept in form labels, navigation and other non-prose. Measured on visible paragraphs inside main content only, the city page reads at grade 10.9 and 11.9 words per sentence, which is close to the band that extracts well. The homepage at 13.5 is the one worth shortening.',
 evidence:'Rendered DOM, 28 Sep 2026, visible p elements in main, forms and nav excluded. City page: 129 paragraphs, 2,606 words, 219 sentences, 11.9 words per sentence, Flesch\u2013Kincaid 10.9. Homepage: 50 paragraphs, 853 words, 56 sentences, 15.2 words per sentence, grade 13.5.',
 fix:'Shorten the homepage copy where convenient. Leave the city pages alone \u2014 they already read well.'}
,

{section:'aeo', group:'Answer extraction', ref:'ANS-05', src:'M5', status:'fail', severity:'Medium',
 title:'Long pages have no table of contents',
 why:'In-page links let engines address a specific section rather than the whole page, and let readers reach the part they came for. Your blog template already does this well.',
 evidence:'Zero in-page anchor links on homepage, city and floor-plan templates. The blog template carries 21.',
 fix:'Port the blog’s table-of-contents pattern onto long city and service pages.'},

/* ── AEO · Entity ───────────────────────────────────────────────────────── */
{section:'aeo', group:'Entity and knowledge graph', ref:'ENT-01', src:'C4', status:'fail', severity:'Critical',
 title:'The site describes itself twice, differently, on most pages',
 why:'When search engines find two descriptions of one business, they keep one and discard the other unpredictably. Brick&Bolt’s official identity therefore changes between crawls.',
 evidence:'Homepage: 10 structured-data nodes including two Organization entities and two Service entities, 2 with no identifier. City template: 16 nodes, 7 unidentified — LocalBusiness ×2, Organization ×2, WebSite ×2, HowTo ×2.',
 fix:'One node per entity, each with a stable unique identifier. Emit sitewide Organization and WebSite once, from a single source.'},

{section:'aeo', group:'Entity and knowledge graph', ref:'ENT-02', src:'H8', status:'fail', severity:'High',
 title:'Two different Instagram accounts are declared and linked',
 why:'Google builds its picture of who you are by following the official profiles you declare. Declaring one account while linking another splits that picture in half — the exact opposite of what the markup exists to do.',
 evidence:'Structured data declares instagram.com/brickandbolt. The footer links instagram.com/bricknboltofficial. The footer also links a YouTube channel that is not declared at all. Four of five footer social links do not match the four declared.',
 fix:'Decide the canonical account per network, declare that one, retire or subordinate the other, and add YouTube.'},

{section:'aeo', group:'Entity and knowledge graph', ref:'ENT-03', src:'M7', status:'fail', severity:'Medium',
 title:'No Google Business Profile or knowledge reference declared',
 why:'The Google Business Profile link is how Google confirms a local business is real and ties the site to the Maps listing. Its absence is a five-minute omission with outsized effect on local and AI answers.',
 evidence:'Four external profiles declared in sameAs. No Wikidata or Wikipedia reference. No Google Business Profile or Maps URL in the entity.',
 fix:'Add the Google Business Profile URL and extend verified profile references.'},

{section:'aeo', group:'Entity and knowledge graph', ref:'ENT-04', src:'—', status:'unknown', severity:'Medium',
 title:'Name, address and phone consistency across the web',
 why:'Answer engines cross-check business details across directories. Disagreement between listings weakens confidence in all of them.',
 evidence:'Not measured in this survey — requires a directory crawl beyond the site itself.',
 fix:'Audit listings against the site’s declared details, then correct at source.'},

/* ── AEO · Trust ────────────────────────────────────────────────────────── */
{section:'aeo', group:'Trust and citation', ref:'TRU-01', src:'C2', status:'fail', severity:'Critical',
 title:'The site publishes its own star rating in machine-readable code',
 why:'The page tells Google it has 4.7 stars from 10,000 reviews, and the source of that claim is the site itself. Google does not permit a business to publish its own rating this way. At this scale the risk is rich results being withdrawn across the site, not merely the stars being ignored.',
 evidence:'AggregateRating 4.7 from reviewCount 10000, itemReviewed pointing at Brick&Bolt’s own entity. Present on homepage, city, floor-plan and calculator templates — roughly 7,929 URLs.',
 fix:'Remove it, or replace it with markup tied to a documented external review source. Separately, verify internally where 4.7 and 10,000 come from — that is a business question, not a technical one.'},

{section:'aeo', group:'Trust and citation', ref:'TRU-02', src:'H9', status:'fail', severity:'High',
 title:'A rating is published but no reviews underpin it',
 why:'This is the constructive counterpart to the item above — how the rating becomes legitimate rather than simply deleted. Individual, attributable reviews are also what answer engines quote when asked whether a builder is trustworthy.',
 evidence:'AggregateRating declared on roughly 7,929 URLs with zero Review nodes on any template tested.',
 fix:'Publish individual Review entries tied to documented, attributable customer reviews, and let the aggregate derive from them.'},

{section:'aeo', group:'Trust and citation', ref:'TRU-03', src:'M9', status:'fail', severity:'Medium',
 title:'Videos carry no metadata',
 why:'Video metadata is a direct route into media-rich and blended answer surfaces. Three videos render on the homepage and none of them are described in a way an engine can use.',
 evidence:'3 video or embed elements on the homepage, zero VideoObject markup on any template tested.',
 fix:'Add VideoObject with name, description, thumbnailUrl, uploadDate and embedUrl.'},

{section:'aeo', group:'Trust and citation', ref:'TRU-04', src:'§2', status:'pass', severity:'',
 title:'The blog template is already the benchmark',
 why:'Worth stating plainly, because it determines where money should not go. This template does not need rebuilding — it needs copying onto the city and service pages.',
 evidence:'Carries BlogPosting markup, published and modified dates, a named author with a profile URL, a social preview image, a 21-link table of contents, 23 sections and 7 data tables. Holds position 1 for “house construction cost per sq ft in Bangalore 2026”.',
 fix:'Port this pattern — named author, real dates, table of contents, data tables — onto city and service templates.'},

/* ── AEO · Off-site ─────────────────────────────────────────────────────── */
{section:'aeo', group:'Earned placement and monitoring', ref:'OFF-01', src:'Tier D', status:'unknown', severity:'High',
 title:'Discovery queries belong to third-party listicles',
 why:'The first page for “best construction company in Bangalore” is entirely third-party lists, and answer engines cite those lists. Optimising an owned page cannot win this — the mechanism is getting included in the lists themselves.',
 evidence:'Not measured in this survey. Brick&Bolt is absent from several such lists; where present, one entry carries a qualifier about project delays.',
 fix:'Identify which lists each engine actually draws on, then work to be included and ranked within them with accurate current figures.'},

{section:'aeo', group:'Earned placement and monitoring', ref:'OFF-02', src:'\u2014', status:'unknown', severity:'High',
 title:'What engines say when asked about Brick&Bolt directly',
 why:'Public review platforms disagree sharply and some prominent results are hostile. Nobody currently has a dated record of what ChatGPT, AI Overviews or Perplexity actually answer, so there is no way to tell improvement from noise later. This is also downstream of delivery: content can document and clarify, it cannot manufacture sentiment.',
 evidence:'Not measured. AI answers vary by session, account, geography and model version, so a single observation proves little and no automated figure should be taken at face value. The earlier baseline in the target sheet was recorded by a third party with no stated method or date.',
 fix:'Run a fixed protocol monthly rather than buying a number. Same 8 prompts, logged out, fresh session, stated city, three runs each, same week of the month. For every run record: does the brand appear, is it cited with a link, which other sources are cited, and the sentiment in one line \u2014 with a screenshot. The cited sources are the actionable output: those pages, not the engine, are what to work on. Report the spread across the three runs, never a single figure.'}
,

{section:'aeo', group:'Earned placement and monitoring', ref:'OFF-03', src:'—', status:'unknown', severity:'High',
 title:'No dated baseline of what each engine answers today',
 why:'Without a dated “before” picture there is no way to prove in six months that anything improved. Insist it is captured first-hand with evidence attached, not copied from a previous spreadsheet.',
 evidence:'72 target prompts across Google organic, AI Overviews and ChatGPT — 216 observations per cycle. None independently captured in this survey.',
 fix:'Record presence, citation, cited competitor, landing page and rank per prompt per surface, with dates and screenshots. Ask how result variation between sessions is handled.'},

{section:'aeo', group:'Earned placement and monitoring', ref:'OFF-04', src:'C tier', status:'unknown', severity:'High',
 title:'Objection questions are uncontested and unanswered',
 why:'Booking amount, GST, warranty, “can I use my own architect” — nobody in the category answers these clearly, so they are fast to win. Each one is also a reason buyers drop out, so ranking recovers lost enquiries rather than just traffic.',
 evidence:'10 prompts in this tier, almost entirely uncontested. No dedicated owned page answers them today.',
 fix:'Publish one definitive answer page per objection, mapped to the real drop-off reasons in the CRM.'},

{section:'aeo', group:'Earned placement and monitoring', ref:'OFF-05', src:'live', status:'pass', severity:'',
 title:'AI crawlers can reach the site',
 why:'Answer engines cannot cite what they cannot fetch. Many sites block these agents by accident; this one does not.',
 evidence:'GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and Applebot-Extended all permitted. No exclusions in robots.txt.',
 fix:'No action. Keep it this way.'},
/* ── added 24 Sep 2026 from the seo-aeo-geo skill pass ──────────────────── */
{section:'aeo', group:'Trust and citation', ref:'TRU-05', src:'registry', status:'warn', severity:'Critical',
 title:'The “10,000 reviews” figure matches the “10,000 homeowners” figure',
 why:'The brand fact registry records “10,000+ homeowners served across India”. The page schema declares a reviewCount of exactly 10000. These may be the same number used twice — a customer count published as a review count. Flagged for human review, not corrected: either side could be the stale one.',
 evidence:'Page schema: reviewCount 10000, ratingValue 4.7. Fact registry: “10,000+ homeowners served across India”, and separately flags an unresolved conflict between 9,000 / 10,000 / 10,142 homes built.',
 fix:'Have a named person confirm what 10,000 counts — customers or reviews — before anything is republished. Settle the homes-built figure at the same time; the registry already lists it as unresolved.'},

{section:'aeo', group:'Entity and knowledge graph', ref:'ENT-05', src:'live', status:'pass', severity:'',
 title:'Local business details are complete and machine-readable',
 why:'Worth stating because it is the part of the entity that is right. Answer engines asked “where are they based, can I call them” have a clean structured answer today.',
 evidence:'Homepage declares LocalBusiness with PostalAddress, GeoCoordinates, ContactPoint, OpeningHoursSpecification and a phone number (+91 7505205205). Document language set to en.',
 fix:'No action beyond de-duplicating the node (ENT-01). Add a contact email — none is exposed on the homepage.'},

{section:'aeo', group:'Answer extraction', ref:'ANS-06', src:'live', status:'pass', severity:'',
 title:'HowTo and FAQPage markup already exist',
 why:'The markup an answer engine wants is present. That is what makes the rendering failure above so costly — the structure is built and then undermined by the styling.',
 evidence:'Homepage schema includes HowTo with HowToStep, FAQPage with Question and Answer nodes, Service, Offer and Person types.',
 fix:'No new markup needed. Make the declared content render (ANS-01) and this becomes an asset rather than a policy risk.'},

{section:'aeo', group:'Answer extraction', ref:'ANS-07', src:'live', status:'fail', severity:'Low',
 title:'No Speakable markup for voice answers',
 why:'Speakable tells a voice assistant which sentences to read aloud. For a category where buyers ask questions hands-free on site visits, it is a cheap, uncontested signal.',
 evidence:'No SpeakableSpecification on any template tested.',
 fix:'Add SpeakableSpecification pointing at the answer paragraph on priority pages — after ANS-02 gives those pages an answer paragraph to point at.'},

{section:'seo', group:'On-page signals', ref:'ONP-06', src:'live', status:'warn', severity:'Medium',
 title:'No contact email exposed on the homepage',
 why:'Phone and address are present, email is not. Answer engines and buyers both look for a full contact set, and it is one of the cheapest trust signals available.',
 evidence:'One tel: link (+91 7505205205) and a PostalAddress in schema. Zero mailto: links on the homepage.',
 fix:'Expose a monitored contact address and add it to the ContactPoint node.'},
/* ── added 24 Sep 2026: seo-aeo-geo re-audit against the updated skill ──── */
{section:'aeo', group:'Trust and citation', ref:'FACT-01', src:'live+web', status:'fail', severity:'Critical',
 title:'Bengaluru pages name a municipal body that was dissolved in 2025',
 why:'Every Bengaluru page tells buyers and answer engines that BBMP is the approving authority, and that it splits the city into four zones. BBMP was dissolved on 2 September 2025 and replaced by five city corporations under the Greater Bengaluru Authority. An answer engine that fact-checks this finds the page wrong, and factual accuracy is the main thing that decides whether a brand gets cited.',
 evidence:'Rendered DOM, 24 Sep 2026. /construction-company-bengaluru: BBMP x9 visible (x21 served), including "BBMP divides Bengaluru into East, West, South, and North zones." 7 of 7 sampled Bengaluru locality pages also carry it (x8 visible, x24 served). Zero mentions of Greater Bengaluru Authority or the five corporations anywhere. The city page drew 15,982 impressions in the last 28 days - the most-seen Bengaluru page on the site.',
 fix:'Rewrite the approval sections for the five corporations (Central, North, South, East, West) under the GBA. Note the sentence is wrong twice over: the body no longer exists and there are five corporations, not four zones. Start with the city page, which carries effectively all the traffic. Full affected count needs a crawler - blocked by crawl section 2.'},

{section:'seo', group:'Content integrity', ref:'FACT-02', src:'live', status:'warn', severity:'High',
 title:'Pune locality pages name one approving authority; the city page says there are three',
 why:'The Pune city page correctly explains that approvals split between PMC, PCMC and PMRDA by location. The locality pages beneath it assert PMC alone, whatever the locality. Any Pune locality actually under PCMC or PMRDA - or the Cantonment Board - is then telling buyers the wrong authority. This is a template asserting one answer where the answer depends on location.',
 evidence:'Rendered DOM, 24 Sep 2026. /construction-company-pune: PMC x11, PCMC x4, PMRDA x2, including "PMC covers core Pune." /construction-company-kalyani-nagar-pune: PMC x9 only. Same single-authority pattern in served HTML on pune-camp and sahakar-nagar-pune (PMC x28, no PCMC or PMRDA).',
 fix:'Confirm the authority per locality before publishing it, and leave it out where unconfirmed rather than defaulting to PMC. Kalyani Nagar does sit in PMC territory, so that page is probably right by luck - the template is the problem, not that page. Pune Camp is the one to check first: cantonment areas have their own board.'},

{section:'seo', group:'Content integrity', ref:'FACT-03', src:'registry', status:'fail', severity:'Critical',
 title:'The brand fact registry prices are well below what the site charges',
 why:'The registry is what content gets written from. It records an entry price of Rs 1,580/sqft and a Rs 1,600-1,800 range across tiers. The live Bengaluru page starts at Rs 1,995 - above the registry’s stated ceiling. Anyone briefing a page from the registry today publishes prices roughly 20 per cent under actual. The site is the designated price source and appears correct; the registry is the stale side.',
 evidence:'Rendered DOM, 24 Sep 2026. Bengaluru: Rs 1,995 / Rs 2,145 / Rs 2,495 per sqft. Pune: Rs 1,680 / Rs 1,840 / Rs 2,110 per sqft. Registry: "Rs 1,580/sqft (entry), Rs 1,600-1,800/sqft range across tiers". Registry status is marked SEED - not yet verified.',
 fix:'Correct the registry from the live city pages, or strike the hardcoded figures and leave only the instruction to fetch live. Do not change the site to match the registry. Package prices differ by city, so a single global figure was never going to hold.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-06', src:'GSC 28d', status:'fail', severity:'High',
 title:'Seven in eight locality pages were never seen in search',
 why:'The locality estate is the largest single block of pages on the site and almost none of it surfaces. That settles where effort should go: these pages do not need hand optimisation, they need a template fix and then leaving alone. It also means template-level errors on them are cheap to fix and cost little while unfixed \u2014 which is why the BBMP error is urgent on the city page and not on the 2,000 locality pages beneath it.',
 evidence:'GSC, 28 days to 24 Sep 2026. The city-area sitemap carries 2,474 URLs. Only 326 URLs matching /construction-company-* drew any impression, 22 drew 100 or more, and 28 earned any click. The whole family produced 65,015 impressions and 684 clicks \u2014 2.4% of site impressions and 6% of clicks \u2014 and the ten city pages account for most of that.',
 fix:'Keep locality pages out of hand optimisation. Fix them at the template, then spend the hours on the ten city pages and the blog. Revisit only if segmented sitemaps show they are not indexed at all, which is a different problem from being indexed and unranked.'},

{section:'seo', group:'On-page signals', ref:'ONP-07', src:'GSC 28d', status:'warn', severity:'High',
 title:'The Bengaluru city page converts impressions to clicks poorly',
 why:'This page is seen a great deal and clicked rarely. At position 7.7 a 0.5 per cent click rate is low, which usually points at the title and description rather than the ranking. It is also the page carrying the BBMP error, so it is the single highest-value page to work on.',
 evidence:'GSC, 28 days to 20 Sep 2026: 15,982 impressions, 84 clicks, CTR 0.53%, average position 7.7. For contrast /construction-company-delhi sits at position 4.2 with 4,479 impressions and 68 clicks, and /construction-company-pune at position 15.5.',
 fix:'Rewrite title and meta description for this page first and re-measure after 28 days. Treat CTR as the hypothesis, not a proven cause - position 7.7 is an average across many queries and can hide the real pattern.'},
{section:'seo', group:'Architecture and consolidation', ref:'ARC-07', src:'GSC 28d', status:'pass', severity:'',
 title:'The blog is not a supporting asset \u2014 it is the search business',
 why:'Four fifths of everything Google shows for this site is blog content, and it earns more than half the clicks. The city and locality estate that most of the proposed programme is organised around produces 2.4% of impressions. This does not mean the city work is wrong \u2014 those pages carry the commercial intent \u2014 but it does mean the blog is the proven asset and should not be treated as the cheap tier.',
 evidence:'GSC, 28 days to 24 Sep 2026, by page type. Blog: 2,421 URLs seen, 2,201,942 impressions (82.2%), 6,216 clicks. Floor plans: 1,396 URLs, 158,631 impressions (5.9%), 1,031 clicks. Construction-company city and locality: 326 URLs, 65,015 impressions (2.4%), 684 clicks. Homepage alone: 48,807 impressions, 2,052 clicks.',
 fix:'Weight the programme towards what already works. The audit\u2019s Tier E and F work \u2014 cost guides and decision guides on the blog template \u2014 sits on the cohort carrying 82% of impressions. Porting the blog pattern onto city pages (named author, dates, table of contents, data tables) moves the proven format onto the commercial pages rather than the reverse.'},

{section:'seo', group:'Architecture and consolidation', ref:'ARC-08', src:'live+GSC', status:'warn', severity:'Medium',
 title:'Some floor-plan page types carry no links to other floor plans at all',
 why:'CORRECTED 28 Sep 2026. This was written as \u201ca third of their content is hidden, suppressing internal links\u201d. That was wrong \u2014 the hidden text is a modal form and a mobile nav, and the link module is visible. The real gap is the opposite: one floor-plan page type has no internal plan links whatsoever, and is thin besides. On a cohort drawing 158,631 impressions a month, that is a genuine linking gap, just not the one reported.',
 evidence:'Rendered DOM, 28 Sep 2026. /house-floor-plans/30*40-sq-ft-house-plans: 580 visible prose words, 171 anchors of which 164 visible, and zero links matching /house-floor-plans/ \u2014 no related-plans module of any kind. By contrast /house-floor-plans/40*50-...-v5 carries 1,146 visible words and 49 plan links. GSC 28d: floor plans are 1,396 URLs, 158,631 impressions, 1,031 clicks.',
 fix:'Work out which floor-plan page types lack the module and add it, rather than trying to un-hide something that is already visible. Start by confirming whether /house-floor-plans/<size>-sq-ft-house-plans and /house-floor-plans/area/<size> are separate templates.'}
,

{section:'aeo', group:'Answer extraction', ref:'ANS-08', src:'live', status:'warn', severity:'Medium',
 title:'Almost no FAQ question is also a visible heading',
 why:'This is what actually survives from the FAQ finding. The answers are fine; the questions are not marked up as headings, so an extractor scanning heading structure for a question to match sees almost nothing. It is the difference between content being present and content being addressable.',
 evidence:'Rendered DOM, 28 Sep 2026: 4 of 41 declared questions appear as a visible heading element across the three FAQ templates. On the homepage all 16 questions render as text but 0 are headings.',
 fix:'Mark FAQ questions as h3 elements. It changes no copy and no layout, and it is what lets an engine match a query to a section rather than to a page.'},

{section:'aeo', group:'Answer extraction', ref:'ANS-09', src:'live', status:'warn', severity:'Low',
 title:'The homepage FAQ opens with every answer collapsed',
 why:'Not a compliance problem \u2014 Google reads collapsed content. But an extractor that does not click, and a visitor who does not either, sees no answer on screen. The city page and calculator already open theirs, so the pattern to copy is on the site.',
 evidence:'Rendered DOM, 28 Sep 2026: homepage 0 of 16 answers expanded at load; city page 10 of 10 expanded; cost calculator 14 of 15.',
 fix:'Open the highest-intent item by default, as the city template already does. One attribute.'},

/* ── restored after an over-greedy edit dropped them ── */
{section:"seo", group:"Server and performance", ref:"REN-04", src:"live", status:"warn", severity:"Low",
 title:"Most of the page weight is inline script and styling, not markup",
 why:"CORRECTED 28 Sep 2026. Reported as 0.77% text-to-HTML, implying near-empty pages. Measured against markup alone the figure is healthy: 7.8% on the homepage and 20.4% on the city page. Three quarters of the document is inline script and CSS, which is normal for an app of this kind. Text-to-HTML ratio is not a Google ranking factor, so treat this as page weight and speed, not SEO.",
 evidence:"Rendered DOM, 28 Sep 2026. Homepage: 13,101 visible text characters, 624,717 byte DOM, of which 305,229 inline script and 150,872 inline style — 2.1% against the whole document, 7.77% against markup only. City page: 39,540 chars, 871,943 bytes, 429,923 script, 248,240 style — 4.53% and 20.4%.",
 fix:"Fold into performance work rather than SEO. Moving inline script and style to cacheable external files helps repeat visits; it will not move rankings."},

{section:"seo", group:"Server and performance", ref:"TEC-01", src:"H3", status:"fail", severity:"High",
 title:"None of the nine standard security headers are set",
 why:"No direct ranking effect — but it is basic hygiene any technical reviewer or enterprise client will check, and it is roughly an hour of configuration. The server also announces its exact version, which tells anyone scanning what to target.",
 evidence:"Re-verified 28 Sep 2026 on three page types — homepage, /construction-company-bengaluru and a blog article. 0 of 9 present on every one: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and the three cross-origin policies. Two further headers disclose the stack: server: nginx/1.18.0 (Ubuntu) and x-powered-by: Next.js. nginx 1.18.0 dates from April 2020.",
 fix:"Add at the server or edge layer and suppress the version token. Verify with a free securityheaders.com scan — F should become B or better."},
];
