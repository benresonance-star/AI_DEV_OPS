import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.15.0/+esm';
import patterns from './pattern-data.js';

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

const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sid = n => 'p' + n.replace('.', '');

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
