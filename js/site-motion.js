(() => {
  'use strict';
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const main = document.querySelector('main');
  if (!main) return;

  const isHome = Boolean(document.querySelector('body > main .hero')) && !document.body.classList.contains('linea-page');
  const isSubline = document.body.classList.contains('sublinea-page');
  const useIndividualEntrances = true;
  document.body.classList.add('gp-motion-individual');
  /* Evitar clip como dirección de salida completa: con clip-path al 100%, algunos navegadores no notifican intersección. */
  const independentDirections = ['up', 'left', 'right', 'diagonal', 'scale', 'rotate-left', 'rotate-right', 'drop'];
  const legacyDirections = ['up', 'left', 'right', 'diagonal'];

  // Shared floating rhythm used across the site; Home and Sub-line pages get individually varied entrances.
  const cardSelectors = [
    '.home-team__card', '.home-publications__card', '.home-journal-mini',
    '.publication-card', '.chapter-card', '.profile-card', '.degree-option-card',
    '.degree-resource-link', '.degree-levels__table-wrap', '.degree-application__box',
    '.value-item', '.quick-access__card', '.quick-card', '.pillar', '.linea-pillar',
    '.goal-card', '.method-card', '.projection-card', '.subline-card', '.line-card',
    '.sublinea-card', '.seminario-card', '.seminario-publication', '.journal-feature__inner',
    '.editorial-picks__card', '.feature-card', '.investigator-intro .intro-values',
    '.publication-tile', '.publication-item', '.research-card', '.document-card'
  ].join(',');
  const ctaSelectors = [
    'main a.floating-button', 'main a.primary-button', 'main a.main-button',
    'main a.degree-button', 'main a.journal-feature__button', 'main a.home-team__all',
    'main a.home-publications__all', 'main a.section-link', 'main a.card-button', 'main a.editorial-picks__all',
    'main button.primary-button', 'main button.main-button', 'main button.degree-button',
    'main button.filter-button', 'main button.publication-filter', 'main button[class*="filter"]',
    'main a[class*="__cta"]', 'main button[class*="__cta"]',
    'a.degree-modal__contact', 'a.modal-external-link', 'a.profile-viewer__contact'
  ].join(',');
  const revealSelectors = [
    '.investigator-hero__content', '.investigator-intro .intro-copy',
    '.investigator-intro .intro-values', '.profiles-section .section-heading',
    '.profiles-section .profiles-grid', '.degree-hero__content', '.degree-intro__grid > div',
    '.degree-section-heading', '.degree-levels__table-wrap', '.degree-application__box',
    '.degree-resources__heading', '.degree-resources__grid > *', '.pub-hero__content',
    '.journal-feature__content', '.pub-intro__content', '.publication-controls .container > *',
    '.publication-section .section-heading', '.publication-grid > *', '.chapter-grid > *',
    '.publication-modal__content', '.investigator-hero', '.profiles-grid > *',
    '.degree-options__grid > *', '.degree-levels .section-heading', '.degree-application__text',
    '.linea-intro', '.editorial-picks__heading', '.editorial-picks__grid > *',
    '.seminario-intro', '.seminario-hero__content', '.reveal-banner'
  ].join(',');

  const getDirection = (el, index) => {
    const explicit = el.dataset.gpDirection || '';
    if (independentDirections.includes(explicit)) return explicit;
    if (useIndividualEntrances) return independentDirections[index % independentDirections.length];
    let direction = el.dataset.reveal || '';
    if (!direction && el.classList.contains('reveal-left')) direction = 'left';
    if (!direction && el.classList.contains('reveal-right')) direction = 'right';
    if (!direction && el.classList.contains('reveal-bottom')) direction = 'up';
    if (direction === 'bottom') direction = 'up';
    return legacyDirections.includes(direction) ? direction : legacyDirections[index % legacyDirections.length];
  };
  const assignDirection = (el, i) => {
    el.dataset.gpDirection = getDirection(el, i);
    el.style.setProperty('--gp-motion-duration', `${5.8 + (i % 4) * 0.42}s`);
    el.style.setProperty('--gp-motion-delay', `${-0.65 * (i % 4)}s`);
  };

  document.querySelectorAll(cardSelectors).forEach((el, i) => {
    if (el.closest('header, nav, footer, .footer, .search-overlay, .degree-modal, .profile-viewer')) return;
    el.classList.add('gp-motion-card');
    assignDirection(el, i);
  });
  document.querySelectorAll(ctaSelectors).forEach((el, i) => {
    if (el.closest('header, nav, footer, .footer, .search-overlay, .profile-card, .degree-option-card, .home-team__card, .home-publications__card, .home-journal-mini')) return;
    el.classList.add('gp-motion-cta');
    assignDirection(el, i + 1);
  });

  const revealTargets = new Set();
  document.querySelectorAll(revealSelectors).forEach(el => revealTargets.add(el));

  // Entradas propias también en las páginas internas: títulos, textos, imágenes y contenido de cada módulo.
  const sharedIndividualSelectors = [
    'main > section > .container > .section-heading > *',
    'main > section > .container > .degree-section-heading > *',
    'main > section > .container > .home-publications__heading > *',
    '.hero__content > *', '.linea-hero__content > *', '.sublinea-hero__content > *',
    '.degree-hero__content > *', '.investigator-hero__content > *', '.pub-hero__content > *',
    '.degree-intro__grid > *', '.degree-application__box > *', '.degree-resources__grid > *',
    '.profiles-grid > *', '.profiles-grid .profile-card__image', '.profiles-grid .profile-card__info',
    '.degree-options__grid > *', '.degree-levels__table-wrap', '.publication-grid > *', '.chapter-grid > *',
    '.sublinea-intro__text > *', '.sublinea-values > *', '.sublinea-card', '.sublinea-card__image',
    '.sublinea-card__content > *', '.linea-pillar', '.linea-pillar > *', '.linea-goal', '.method-card',
    '.publication-section .section-heading > *', '.journal-feature__inner > *', '.pub-intro__content > *',
    '.seminario-hero__content > *', '.seminario-intro > *', '.footer__brand', '.footer__column'
  ].join(',');
  document.querySelectorAll(sharedIndividualSelectors).forEach(el => revealTargets.add(el));
  document.querySelectorAll('.reveal').forEach(el => {
    // Sub-line page reveals the actual content fragments instead of hiding a wrapper around them.
    if (isSubline && el.matches('.sublinea-intro__text, .sublinea-values, .sublinea-card')) return;
    // The Home's About copy is revealed piece by piece, not as one large block.
    if (isHome && el.matches('.about__content')) return;
    revealTargets.add(el);
  });

  if (isHome) {
    const homeTargets = [
      '.hero__eyebrow', '.hero__title', '.hero__subtitle', '.hero .main-button',
      '.pillars .pillar', '.about__image', '.about__content .section-eyebrow',
      '.about__content h2', '.about__content .section-line', '.about__content p',
      '.about__content .main-button', '.about__phrase', '.quick-access__title', '.quick-card',
      '.home-team .section-heading .eyebrow', '.home-team .section-heading h2',
      '.home-team .section-heading p', '.home-team__card', '.home-team__all',
      '.home-publications__heading .eyebrow', '.home-publications__heading h2',
      '.home-publications__heading p', '.home-publications__all', '.home-journal-mini',
      '.home-publications__card', '.final-banner'
    ];
    homeTargets.forEach(selector => document.querySelectorAll(selector).forEach(el => revealTargets.add(el)));
  }

  if (isSubline) {
    const sublineTargets = [
      '.sublinea-hero__eyebrow', '.sublinea-hero__title', '.sublinea-hero__subtitle',
      '.sublinea-intro__text > .section-eyebrow', '.sublinea-intro__text h2', '.sublinea-intro__text p',
      '.sublinea-value__icon', '.sublinea-value > span', '.sublinea-card__image', '.sublinea-card__number',
      '.sublinea-card__eyebrow', '.sublinea-card__content h3', '.sublinea-card__content p',
      '.sublinea-page .final-banner'
    ];
    sublineTargets.forEach(selector => document.querySelectorAll(selector).forEach(el => revealTargets.add(el)));
  }

  // Animate visible content pieces independently while keeping the global menu and footer static.
  const granularSelectors = [
    'main h1', 'main h2', 'main h3', 'main h4', 'main p', 'main li',
    'main blockquote', 'main figure', 'main .section-label', 'main .eyebrow',
    'main .degree-eyebrow', 'main .degree-kicker', 'main .hero-eyebrow',
    'main .section-link', 'main .card-button', 'main .degree-button',
    'main .home-editorial-highlight', 'main .editorial-picks__card',
    'main .publication-card', 'main .chapter-card', 'main .profile-card',
    'main .degree-option-card', 'main .degree-resource-link', 'main .quick-card',
    'main .pillar', 'main .linea-pillar', 'main .sublinea-card', 'main .method-card',
    'main .goal-card', 'main .projection-card', 'main .value-item'
  ].join(',');
  document.querySelectorAll(granularSelectors).forEach(el => revealTargets.add(el));
  document.querySelectorAll('main img').forEach(el => {
    // Preserve the original banner crops and let banner copy animate separately.
    if (el.closest('.hero, .linea-hero, .sublinea-hero, .pub-hero, .investigator-hero, .degree-hero, .seminario-hero, .final-banner, .pub-final-banner, .investigator-final-banner, .linea-final-banner')) return;
    revealTargets.add(el);
  });
  [...revealTargets].forEach(el => {
    if (el.closest('header, nav, footer, .footer, .search-overlay, .menu-backdrop')) revealTargets.delete(el);
  });

  // The older generic section-heading auto-reveal stays on other pages; Home/Sub-lines use their own staged targets.
  if (!useIndividualEntrances) {
    document.querySelectorAll('main > section:not(.hero):not(.investigator-hero):not(.degree-hero):not(.pub-hero):not(.final-banner):not(.investigator-final-banner)').forEach(section => {
      const heading = section.querySelector(':scope > .container > .section-heading, :scope > .container > .degree-section-heading, :scope > .container > .home-publications__heading');
      if (heading) revealTargets.add(heading);
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('gp-motion-visible', 'in-view'));
    document.documentElement.classList.add('gp-motion-static');
    return;
  }

  revealTargets.forEach((el, i) => {
    el.classList.add('gp-motion-reveal');
    el.dataset.gpDirection = getDirection(el, i);
    el.style.setProperty('--gp-reveal-delay', `${useIndividualEntrances ? (i % 6) * 48 : Math.min(i % 5, 4) * 60}ms`);
    el.style.setProperty('--gp-reveal-duration', `${useIndividualEntrances ? 680 + (i % 4) * 85 : 720}ms`);
  });
  document.documentElement.classList.add('gp-motion-ready');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('gp-motion-visible', 'in-view');
      if (entry.target.classList.contains('linea-reveal') || entry.target.hasAttribute('data-linea-reveal')) entry.target.classList.add('linea-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.01, rootMargin: '120px 0px 140px 0px' });
  revealTargets.forEach(el => observer.observe(el));

  if (isHome) {
    const teamCards = [...document.querySelectorAll('.home-team__grid .home-team__card')];
    teamCards.forEach((card, i) => {
      card.dataset.gpDirection = independentDirections[(i + 2) % independentDirections.length];
      card.style.setProperty('--gp-reveal-delay', `${i * 90}ms`);
      observer.observe(card);
    });
    window.setTimeout(() => {
      teamCards.forEach(card => {
        const r = card.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.4 && r.bottom > -100) {
          card.classList.add('gp-motion-visible', 'in-view');
        }
      });
    }, 1800);
  }
})();
