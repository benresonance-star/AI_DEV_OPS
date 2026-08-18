(() => {
  const script = document.currentScript;
  if (!script) return;

  const specBase = new URL('./', script.src);
  const projectBase = new URL('../', specBase);

  const primary = [
    ['Master', ''],
    ['00 Foundations', '00-foundations/'],
    ['01 Patterns', '01-patterns/'],
    ['02 Architecture', '02-architecture/'],
    ['03 Engineering', '03-engineering/'],
    ['04 Capabilities', '04-capabilities/'],
    ['05 Verification', '05-verification/'],
    ['06 Decisions', '06-decisions/']
  ];

  const engineering = [
    ['Constitution', '03-engineering/orchestrator.html'],
    ['RAD + Shim', '03-engineering/rad.html'],
    ['Agents', '03-engineering/agents/']
  ];

  const normalize = value => {
    const u = new URL(value, window.location.href);
    let p = u.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    return p || '/';
  };

  const current = normalize(window.location.href);
  const makeLink = ([label, relative]) => {
    const href = new URL(relative, specBase).href;
    const active = normalize(href) === current;
    return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
  };

  const nav = document.createElement('nav');
  nav.className = 'spec-global-nav';
  nav.setAttribute('aria-label', 'Plasma master specification navigator');
  nav.innerHTML = `
    <div class="spec-global-nav-inner">
      <div class="spec-nav-row">
        <span class="spec-nav-label">Master book</span>
        <a class="projection-link" href="${projectBase.href}">Pattern Book</a>
        ${primary.map(makeLink).join('')}
      </div>
      <div class="spec-nav-row spec-nav-engineering">
        <span class="spec-nav-label">Engineering</span>
        ${engineering.map(makeLink).join('')}
      </div>
    </div>`;

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const localLinks = topbar.querySelector('.toplinks');
    if (localLinks) {
      localLinks.innerHTML = `
        <a class="keep" href="${projectBase.href}">Pattern Book</a>
        <a class="keep" href="${specBase.href}">Master Spec</a>`;
    }
    topbar.insertAdjacentElement('afterend', nav);
  } else {
    document.body.prepend(nav);
  }
})();
