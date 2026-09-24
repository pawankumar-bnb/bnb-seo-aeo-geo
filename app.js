/* ── render ─────────────────────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LABEL = { fail:'Fail', warn:'Watch', pass:'Pass', unknown:'Not measured' };

function rowHTML(s) {
  const cls = s.status === 'unknown' ? 'unk' : s.status;
  return `
    <article class="snag" data-status="${s.status}" data-severity="${esc((s.severity||'').toLowerCase())}">
      <div class="snag-ref">${esc(s.ref)}<span class="src">${esc(s.src)}</span></div>
      <div class="snag-main">
        <h4 class="snag-title">${esc(s.title)}
          <span class="pill ${cls}">${LABEL[s.status]}</span>
          ${s.severity ? `<span class="pill sev">${esc(s.severity)}</span>` : ''}
        </h4>
        <p class="snag-why">${esc(s.why)}</p>
      </div>
      <div class="snag-side">
        <div class="evidence is-${cls === 'unk' ? 'unk' : cls}">
          <span class="lab">Measured</span>${esc(s.evidence)}
        </div>
        <p class="fix"><b>Do this</b>${esc(s.fix)}</p>
      </div>
    </article>`;
}

function build(sectionKey, mountId, tallyId) {
  const rows = SNAGS.filter((s) => s.section === sectionKey);
  const groups = [...new Set(rows.map((r) => r.group))];
  document.getElementById(mountId).innerHTML = groups.map((g) => {
    const items = rows.filter((r) => r.group === g);
    return `<div class="group" data-group>
        <div class="group-bar">
          <h3>${esc(g)}</h3>
          <span class="gn">${items.length} item${items.length === 1 ? '' : 's'}</span>
        </div>
        ${items.map(rowHTML).join('')}
      </div>`;
  }).join('') + `<p class="empty" hidden>No items match this filter.</p>`;

  const n = (st) => rows.filter((r) => r.status === st).length;

  // the gate card on the homepage shares this section's counts
  const gate = document.getElementById('gate-' + sectionKey);
  if (gate) {
    gate.innerHTML =
      `<span><b>${rows.length}</b> pointers</span>` +
      `<span style="color:var(--crit)"><b>${n('fail')}</b> failing</span>` +
      `<span><b>${n('unknown')}</b> unmeasured</span>`;
  }

  document.getElementById(tallyId).innerHTML =
    `<span><b>${rows.length}</b> pointers</span>` +
    `<span style="color:var(--crit)"><b>${n('fail')}</b> failing</span>` +
    `<span style="color:var(--pass)"><b>${n('pass')}</b> passing</span>` +
    `<span><b>${n('unknown')}</b> not measured</span>`;
}

function boot() {
  // keep the header tile in step with the data rather than a hardcoded number
  const unknownTile = document.getElementById('stat-unknown');
  if (unknownTile) unknownTile.textContent = SNAGS.filter((s) => s.status === 'unknown').length;

  build('seo', 'mount-seo', 'tally-seo');
  build('aeo', 'mount-aeo', 'tally-aeo');

  /* ── filtering ──────────────────────────────────────────────────────────── */
  const chips = [...document.querySelectorAll('.chip')];
  const live = document.getElementById('count-live');

  function applyFilter(mode) {
    let shown = 0;
    document.querySelectorAll('.snag').forEach((el) => {
      const st = el.dataset.status;
      const sev = el.dataset.severity;
      const keep =
        mode === 'all' ? true :
        mode === 'fail' ? (st === 'fail' || st === 'warn') :
        mode === 'critical' ? sev === 'critical' :
        mode === 'pass' ? st === 'pass' :
        st === 'unknown';
      el.classList.toggle('hide', !keep);
      if (keep) shown++;
    });

    // hide a group heading when every row under it is filtered out
    document.querySelectorAll('[data-group]').forEach((g) => {
      const any = [...g.querySelectorAll('.snag')].some((el) => !el.classList.contains('hide'));
      g.hidden = !any;
    });
    document.querySelectorAll('.empty').forEach((p) => {
      const sec = p.closest('section');
      p.hidden = [...sec.querySelectorAll('.snag')].some((el) => !el.classList.contains('hide'));
    });

    live.textContent = `${shown} of ${SNAGS.length} shown`;
  }

  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((o) => o.setAttribute('aria-pressed', String(o === c)));
    applyFilter(c.dataset.filter);
  }));

  applyFilter('all');
}

// The domain gate decides when the survey renders, so nothing behind it is
// placed in the DOM until then. auth.js fires bnb:unlock.
if (window.BNB_UNLOCKED) boot();
else document.addEventListener('bnb:unlock', boot, { once: true });
