import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.15.0/+esm';
import patterns from './pattern-data.js';

// Graphlets are explicit Plasma architecture: bounded working fragments of the
// semantic world, joined back to global state through stable entity identity.
patterns.splice(4, 0, {
  n: '1.5',
  f: 'World',
  t: 'Composable World Graphlets',
  p: 'A global world graph is too large and entangled to be the unit of loading, agent context, validation, caching or local computation.',
  r: 'Keep global identity and relationships, but operate on bounded, typed, independently addressable graph fragments whenever possible.',
  d: `flowchart TD
    W["Global semantic world"] --> S["Site graphlet"]
    S --> B["Building graphlet"]
    B --> L["Level graphlet"]
    L --> A["Apartment graphlet"]
    A --> E["Entities + typed facts + relations"]
    A --> R["Representation refs"]
    A --> D["Declared dependencies"]
    A --> P["Provenance + validity"]
    A --> O["Load · cache · validate · branch · send to agent"]
    A -. "stable IDs connect back" .-> W
    B -. "graphlets may overlap / compose" .-> A`
});

const families = [
  ['World', 1, 'How Plasma owns identity, truth, evidence and representations.'],
  ['Change', 2, 'How the world changes safely, incrementally and through stable contracts.'],
  ['Scale', 3, 'How Plasma stays interactive while worlds, analyses and design populations grow.'],
  ['Intelligence', 4, 'How Plasma decides what to refine, explore, build and escalate.']
];

const root = document.documentElement;
const toc = document.getElementById('toc');
const content = document.getElementById('content');
const settingsPanel = document.getElementById('settingsPanel');
const settingsBtn = document.getElementById('settingsBtn');
const modal = document.getElementById('diagramModal');
const modalDiagram = document.getElementById('modalDiagram');
const modalTitle = document.getElementById('modalTitle');
let renderGeneration = 0;

const esc = s => String(s).replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));
const sid = n => 'p' + n.replace('.', '');

function insertDataModelSection() {
  const stack = document.getElementById('stack');
  if (!stack || document.getElementById('data-models')) return;

  const section = document.createElement('section');
  section.className = 'about-block';
  section.id = 'data-models';
  section.innerHTML = `
    <div class="about-title"><span>0.6</span><h3>Plasma data model stack</h3></div>
    <p>Plasma should not use one universal graph for every problem. It uses a small set of purpose-specific computational models joined by <strong>stable entity identity</strong> and typed references.</p>

    <div class="diagram-head">
      <div><div class="label">Data model architecture</div><div class="diagram-caption">One world, several purpose-specific computational views</div></div>
    </div>
    <div class="diagram-box">
      <div class="diagram-render"><div class="diagram-loading">Rendering diagram…</div></div>
      <script type="text/plain" class="diagram-source">flowchart TD
        I["Stable entity identity"] --> S["Semantic world graph<br/>what exists + relations"]
        S --> G["Graphlets<br/>bounded typed world fragments"]
        I --> D["Dependency graph<br/>what depends on what"]
        I --> P["Claim / provenance graph<br/>why we believe it"]
        I --> R["Revision graph<br/>how state evolved"]
        I --> B["Branch graph<br/>alternative worlds"]
        I --> X["Spatial index / tiles<br/>where + what to load"]
        I --> C["Constraint model<br/>what states are permitted"]
        I --> V["Representation stores<br/>BRep · mesh · fields · splats"]
        G --> D
        G --> X
        G --> V</script>
    </div>

    <div class="stack-table" role="table" aria-label="Plasma data model roles" style="margin-top:14px">
      <div class="stack-row stack-head" role="row"><div>Data model</div><div>Question it answers</div><div>Role</div></div>
      <div class="stack-row" role="row"><div>Semantic world graph</div><div><strong>What exists and how is it related?</strong></div><div>Entities, typed facts and semantic relations; persistent identity and meaning.</div></div>
      <div class="stack-row" role="row"><div>Graphlets</div><div><strong>What bounded fragment can we operate on?</strong></div><div>Typed world fragments for composition, locality, loading, caching, agent context, validation and exchange.</div></div>
      <div class="stack-row" role="row"><div>Dependency graph</div><div><strong>What becomes stale if this changes?</strong></div><div>READS / WRITES relationships, invalidation and incremental recomputation.</div></div>
      <div class="stack-row" role="row"><div>Claim / provenance graph</div><div><strong>Why does Plasma believe this?</strong></div><div>Sources, methods, confidence, timestamps and derived-from relationships.</div></div>
      <div class="stack-row" role="row"><div>Revision graph</div><div><strong>How did this state arise?</strong></div><div>Committed operation patches and reproducible world lineage.</div></div>
      <div class="stack-row" role="row"><div>Branch graph</div><div><strong>Which possible worlds exist?</strong></div><div>Forks and alternative design lineages; promote or merge only when the workflow earns it.</div></div>
      <div class="stack-row" role="row"><div>Spatial index / tiles</div><div><strong>Where is it?</strong></div><div>BVH, R-tree, quadtree, octree or tiles as appropriate for locality, streaming and refinement.</div></div>
      <div class="stack-row" role="row"><div>Representation stores</div><div><strong>How is this reality represented?</strong></div><div>OCC BRep, meshes, fields, points / splats, rasters and other replaceable spatial forms.</div></div>
      <div class="stack-row" role="row"><div>Constraint model</div><div><strong>What combinations are permitted?</strong></div><div>Procedural rules first; Z3 / SMT when cross-coupled logical systems justify it.</div></div>
    </div>

    <div class="callout"><strong>Working definition — graphlet:</strong> a bounded, typed, independently addressable fragment of the semantic world graph containing or referencing the entities, facts, relations, representations, dependencies and provenance needed for a local task. Graphlets preserve global stable IDs; they are not miniature disconnected worlds.</div>
    <div class="callout"><strong>Important:</strong> do not collapse these models into one universal graph structure. They are different computational views over the same world, joined by stable identity and typed references.</div>
  `;
  stack.before(section);

  const renumber = [
    ['stack', '0.7'],
    ['build', '0.8'],
    ['invariants', '0.9']
  ];
  for (const [id, number] of renumber) {
    const badge = document.querySelector(`#${id} .about-title > span`);
    if (badge) badge.textContent = number;
  }
}

function enhanceAboutNavigator() {
  const nav = document.querySelector('.about-nav');
  if (!nav) return;

  const items = [
    ['0.1', 'Why', '#why'],
    ['0.2', 'What it solves', '#solves'],
    ['0.3', 'Value', '#value'],
    ['0.4', 'Examples', '#uses'],
    ['0.5', 'Mental model', '#model'],
    ['0.6', 'Data models', '#data-models'],
    ['0.7', 'Tools & languages', '#stack'],
    ['0.8', 'How to build', '#build'],
    ['0.9', 'Invariants', '#invariants']
  ];

  nav.innerHTML = `
    <div class="about-nav-label">Explore Section 0</div>
    ${items.map(([n, label, href]) => `
      <a class="about-jump-link" href="${href}">
        <span class="about-jump-number">${n}</span>
        <span class="about-jump-text">${label}</span>
        <span class="about-jump-arrow" aria-hidden="true">↓</span>
      </a>`).join('')}
  `;

  const style = document.createElement('style');
  style.id = 'about-nav-mobile-fix';
  style.textContent = `
    .about-nav{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin:20px 0 6px!important}
    .about-nav-label{grid-column:1/-1;color:var(--muted);font-size:11px;line-height:1;text-transform:uppercase;letter-spacing:.09em;font-weight:800;margin:0 0 2px}
    .about-nav .about-jump-link,.about-nav .about-jump-link:visited{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;min-width:0;min-height:50px;padding:9px 10px!important;border:1px solid var(--line)!important;border-radius:13px!important;background:var(--soft)!important;color:var(--text)!important;text-decoration:none!important;font-size:13px!important;font-weight:700!important;line-height:1.15;-webkit-tap-highlight-color:transparent}
    .about-nav .about-jump-link:active{border-color:var(--accent)!important;background:color-mix(in srgb,var(--accent) 11%,var(--soft))!important;transform:translateY(1px)}
    .about-jump-number{display:grid;place-items:center;min-width:34px;height:28px;padding:0 6px;border-radius:8px;background:color-mix(in srgb,var(--accent) 15%,var(--card));color:var(--accent);font-size:11px;font-weight:850;letter-spacing:.01em}
    .about-jump-text{min-width:0;overflow-wrap:anywhere}.about-jump-arrow{color:var(--muted);font-size:12px}
    #why,#solves,#value,#uses,#model,#data-models,#stack,#build,#invariants{scroll-margin-top:84px!important}
    @media(max-width:700px){.about-nav{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}.about-nav .about-jump-link{min-height:54px;padding:9px!important}}
    @media(max-width:370px){.about-nav{grid-template-columns:1fr!important}.about-nav .about-jump-link{min-height:48px}}
  `;
  document.getElementById('about-nav-mobile-fix')?.remove();
  document.head.appendChild(style);
}

insertDataModelSection();
enhanceAboutNavigator();

for (const [family, section, description] of families) {
  const items = patterns.filter(p => p.f === family);
  toc.insertAdjacentHTML('beforeend',
    `<div class="toc-group"><div class="toc-head">${section} · ${family} patterns</div>` +
    items.map(p => `<a href="#${sid(p.n)}">${p.n} ${esc(p.t)}</a>`).join('') +
    `</div>`
  );
  content.insertAdjacentHTML('beforeend',
    `<section class="section" id="${family.toLowerCase()}">
      <div class="section-kicker">Section ${section}</div>
      <h2>${family} Patterns</h2><p>${description}</p>
    </section>` +
    items.map(p => `
      <article class="card" id="${sid(p.n)}">
        <div class="card-head"><span class="n">${p.n}</span><div><h3>${esc(p.t)}</h3><div class="meta">${p.f} pattern</div></div></div>
        <div class="label">Problem</div><div>${esc(p.p)}</div>
        <div class="label">Rule</div><div class="rule">${esc(p.r)}</div>
        <div class="diagram-head">
          <div><div class="label">Diagram</div><div class="diagram-caption">Visual logic of this pattern</div></div>
          <button class="expand-btn" data-expand="${sid(p.n)}" type="button">↗ <span>Expand</span></button>
        </div>
        <div class="diagram-box">
          <div class="diagram-render"><div class="diagram-loading">Rendering diagram…</div></div>
          <script type="text/plain" class="diagram-source">${esc(p.d)}</script>
        </div>
      </article>`).join('')
  );
}

function actualTheme() {
  const choice = localStorage.getItem('plasma-theme') || 'dark';
  return choice === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : choice;
}
function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

function configureMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      nodeSpacing: 30,
      rankSpacing: 42,
      useMaxWidth: true
    },
    themeVariables: {
      darkMode: actualTheme() === 'dark',
      background: cssVar('--diagram'),
      primaryColor: cssVar('--soft'),
      primaryTextColor: cssVar('--text'),
      primaryBorderColor: cssVar('--accent'),
      secondaryColor: cssVar('--card'),
      secondaryTextColor: cssVar('--text'),
      secondaryBorderColor: cssVar('--line'),
      tertiaryColor: cssVar('--diagram'),
      tertiaryTextColor: cssVar('--text'),
      tertiaryBorderColor: cssVar('--line'),
      lineColor: cssVar('--muted'),
      textColor: cssVar('--text'),
      fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif',
      fontSize: '15px'
    }
  });
}

function decodeSource(raw) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = raw;
  return textarea.value;
}

async function renderAllDiagrams() {
  const generation = ++renderGeneration;
  configureMermaid();
  const boxes = [...document.querySelectorAll('.diagram-box')];
  for (let i = 0; i < boxes.length; i++) {
    if (generation !== renderGeneration) return;
    const target = boxes[i].querySelector('.diagram-render');
    const raw = boxes[i].querySelector('.diagram-source').textContent.trim();
    const source = decodeSource(raw);
    try {
      const result = await mermaid.render(`plasma_${generation}_${i}_${Date.now()}`, source);
      if (generation !== renderGeneration) return;
      target.innerHTML = result.svg;
    } catch (error) {
      console.error(error);
      target.innerHTML = '<div class="diagram-error">Diagram could not be rendered</div>';
    }
  }
}

function syncSettings() {
  const storedTheme = localStorage.getItem('plasma-theme') || 'dark';
  const text = localStorage.getItem('plasma-text') || 'standard';
  root.dataset.theme = storedTheme === 'system' ? actualTheme() : storedTheme;
  root.dataset.text = text;
  document.querySelectorAll('[data-theme-choice]').forEach(
    b => b.classList.toggle('active', b.dataset.themeChoice === storedTheme)
  );
  document.querySelectorAll('[data-text-choice]').forEach(
    b => b.classList.toggle('active', b.dataset.textChoice === text)
  );
  document.querySelector('meta[name="theme-color"]').content =
    actualTheme() === 'dark' ? '#0e1115' : '#f5f7f9';
}

settingsBtn.addEventListener('click', () => settingsPanel.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) settingsPanel.classList.remove('open');
});
document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', async () => {
  localStorage.setItem('plasma-theme', button.dataset.themeChoice);
  syncSettings();
  await renderAllDiagrams();
}));
document.querySelectorAll('[data-text-choice]').forEach(button => button.addEventListener('click', () => {
  localStorage.setItem('plasma-text', button.dataset.textChoice);
  syncSettings();
}));

document.querySelectorAll('[data-expand]').forEach(button => button.addEventListener('click', () => {
  const card = document.getElementById(button.dataset.expand);
  const svg = card.querySelector('.diagram-render svg');
  if (!svg) return;
  modalTitle.textContent = card.querySelector('h3').textContent;
  modalDiagram.innerHTML = svg.outerHTML;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}));
function closeModal() {
  modal.classList.remove('open');
  modalDiagram.innerHTML = '';
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async () => {
  if ((localStorage.getItem('plasma-theme') || 'dark') === 'system') {
    syncSettings();
    await renderAllDiagrams();
  }
});

syncSettings();
await renderAllDiagrams();
