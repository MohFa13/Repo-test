/* Data-driven content: chapter nav, use cases, why, FAQ */
(function () {
  /* ---- Mission-control chapter nav ---- */
  const CHAPTERS = [
    { n: '01', id: 'chaos',     label: 'Chaos',    ico: 'chaos' },
    { n: '02', id: 'suite',     label: 'Suite',    ico: 'suite' },
    { n: '03', id: 'writer',    label: 'Writer',   ico: 'writer' },
    { n: '04', id: 'sheets',    label: 'Sheets',   ico: 'sheets' },
    { n: '05', id: 'slides',    label: 'Slides',   ico: 'slides' },
    { n: '06', id: 'pdf',       label: 'PDF',      ico: 'pdf' },
    { n: '07', id: 'ai',        label: 'AI',       ico: 'ai' },
    { n: '08', id: 'workflow',  label: 'Workflow', ico: 'workflow' },
    { n: '09', id: 'cta',       label: 'Start',    ico: 'start' }
  ];
  const nav = document.getElementById('chapter-nav');
  CHAPTERS.forEach(function (c) {
    const a = document.createElement('button');
    a.className = 'nav-item';
    a.type = 'button';
    a.dataset.target = c.id;
    a.setAttribute('aria-label', 'Chapter ' + c.n + ': ' + c.label);
    a.innerHTML =
      '<span class="nav-num">' + c.n + '</span>' +
      '<span class="nav-ico" data-ico="' + c.ico + '"></span>' +
      '<span class="nav-label">' + c.label + '</span>';
    nav.appendChild(a);
  });
  window.WPS_CHAPTERS = CHAPTERS;

  /* ---- Use cases ---- */
  const USE_CASES = [
    { ico:'student',  name:'Students',          pain:'Deadlines, group projects, citations — across borrowed laptops.', sol:'Write essays, build slide decks and crunch lab data in one free-to-start suite that syncs to any device.' },
    { ico:'freelance',name:'Freelancers',       pain:'Client files in five formats and invoices that never look right.', sol:'Send polished proposals, branded decks and clean PDF invoices without juggling subscriptions.' },
    { ico:'biz',      name:'Small Businesses',  pain:'Tight budgets, no IT team, software bloat eating margins.',       sol:'A lightweight all-in-one suite for quotes, reports, books and presentations — fast to deploy.' },
    { ico:'remote',   name:'Remote Teams',      pain:'Version chaos and "which file is final?" across time zones.',     sol:'Cloud sync keeps one source of truth, so everyone edits the current version from anywhere.' },
    { ico:'creator',  name:'Content Creators',  pain:'Scripts, planning sheets and decks scattered everywhere.',        sol:'Draft, storyboard and schedule in one place, then export to PDF or slides in a click.' },
    { ico:'account',  name:'Accountants',       pain:'Heavy spreadsheets, reconciliations and signed PDF statements.',  sol:'Powerful formulas and tables plus built-in PDF sign &amp; export keep month-end moving.' },
    { ico:'pm',       name:'Project Managers',  pain:'Status decks, trackers and stakeholder docs that never align.',   sol:'Keep plans, dashboards and updates in one connected workspace — and let AI summarize the rest.' }
  ];
  const ucGrid = document.getElementById('uc-grid');
  USE_CASES.forEach(function (u, i) {
    const card = document.createElement('article');
    card.className = 'uc-card reveal tilt';
    card.style.transitionDelay = (i % 3 * 0.06) + 's';
    card.innerHTML =
      '<div class="uc-head"><div class="uc-ico" data-ico="' + u.ico + '"></div><h4>' + u.name + '</h4></div>' +
      '<p class="uc-pain">' + u.pain + '</p>' +
      '<p class="uc-sol"><span class="uc-sol-tick">✓</span>' + u.sol + '</p>' +
      '<a class="uc-link" href="#" data-affiliate>Get WPS for this <span aria-hidden="true">→</span></a>';
    ucGrid.appendChild(card);
  });

  /* ---- Why WPS ---- */
  const WHY = [
    { t:'All-in-one suite',      d:'Writer, Spreadsheet, Presentation and PDF tools share one home — no app-switching tax.' },
    { t:'Lightweight & fast',    d:'A small install that launches quickly, even on modest or older machines.' },
    { t:'PDF tools included',    d:'Edit, convert, merge, annotate and sign PDFs without a separate paid app.' },
    { t:'Cloud-friendly',        d:'Sync your files across devices so the latest version follows you everywhere.' },
    { t:'AI-powered',            d:'Summarize, write, analyze and transform content with a built-in assistant.' },
    { t:'Genuinely good value',  d:'A capable suite for personal, academic and business work that respects your budget.' }
  ];
  const whyGrid = document.getElementById('why-grid');
  WHY.forEach(function (w, i) {
    const c = document.createElement('div');
    c.className = 'why-card reveal tilt';
    c.style.transitionDelay = (i % 3 * 0.06) + 's';
    c.innerHTML =
      '<div class="why-n">0' + (i + 1) + '</div>' +
      '<h4>' + w.t + '</h4>' +
      '<p>' + w.d + '</p>';
    whyGrid.appendChild(c);
  });

  /* ---- FAQ ---- */
  const FAQ = [
    { q:'Is WPS Office good for business?',
      a:'Yes. It covers the everyday business toolkit — documents, spreadsheets, presentations and PDFs — in one lightweight suite, which makes it a practical choice for small businesses and teams that want capability without heavy overhead.' },
    { q:'Does WPS Office support common office file formats?',
      a:'WPS Office is designed to open and save the document, spreadsheet and presentation formats most workplaces use every day, so you can collaborate with people on other suites without constant conversion headaches.' },
    { q:'Can I use WPS Office for PDFs?',
      a:'Absolutely — a full PDF toolkit is built in. You can read, annotate, convert, merge and sign PDFs inside the same suite instead of paying for a separate PDF application.' },
    { q:'Does WPS Office include AI features?',
      a:'Yes. A built-in AI assistant can summarize documents, help you write and rewrite, analyze spreadsheet data and turn long content into presentations — your productivity co-pilot across the suite.' },
    { q:'Is WPS Office suitable for students and freelancers?',
      a:'Very much so. It is free to start, lightweight, and handles essays, decks, budgets and invoices in one place — ideal when you are working solo or on a tight budget across multiple devices.' },
    { q:'Why should I download it through this page?',
      a:'This page is an independent guide to building a smarter office workflow with WPS Office. Downloading through our link helps support the guide at no extra cost to you — see the affiliate disclosure below.' }
  ];
  const faqList = document.getElementById('faq-list');
  FAQ.forEach(function (f) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML =
      '<button class="faq-q" aria-expanded="false"><span>' + f.q + '</span><span class="pm" aria-hidden="true">+</span></button>' +
      '<div class="faq-a"><p>' + f.a + '</p></div>';
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0px';
    });
    faqList.appendChild(item);
  });

  /* inject all icons now that DOM is built */
  if (window.injectIcons) window.injectIcons(document);
})();
