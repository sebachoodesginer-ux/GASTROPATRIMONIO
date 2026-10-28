/* GastroPatrimonio V12 — entradas independientes para Línea de investigación */
(() => {
  'use strict';
  document.documentElement.classList.add('linea-v12-js');

  const initialise = () => {
    const page = document.body;
    if (!page || !page.classList.contains('linea-page')) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const selectors = [
      '.linea-pillar__icon', '.linea-pillar h3',
      '.linea-about__content .linea-label', '.linea-about__content h2',
      '.linea-about__content p', '.linea-about__content .main-button',
      '.linea-about__note span',
      '.linea-section-title h2',
      '.goal-card__icon', '.goal-card__content h3', '.goal-card__content p', '.goal-card__image',
      '.linea-heading > i', '.linea-heading > h2',
      '.method-card__header > *', '.method-card > h3', '.method-card > p', '.method-card__image',
      '.projection-card__icon', '.projection-card__content > span',
      '.projection-card__content > h3', '.projection-card__content > p',
      '.subline-card__image', '.subline-card__icon', '.subline-card h3', '.subline-card__arrow',
      '.linea-final-banner__quote', '.linea-final-banner__quote-mark',
      '.linea-final-banner__quote p', '.linea-final-banner__rule',
      '.linea-footer__brand img', '.linea-footer__brand p',
      '.linea-footer__links h3', '.linea-footer__links nav > *',
      '.linea-footer__information h3', '.linea-footer__info-item',
      '.linea-footer__bottom > *'
    ];

    const targets = new Set();
    selectors.forEach(selector => document.querySelectorAll(selector).forEach(el => targets.add(el)));

    const directions = ['up', 'left', 'right', 'zoom', 'down'];
    let index = 0;
    targets.forEach(el => {
      // The top hero already has its own staggered first-load animation.
      if (el.closest('.linea-hero')) return;
      if (el.classList.contains('linea-reveal')) return;
      el.classList.add('linea-item-reveal');
      const direction = el.dataset.lineaItemDirection || directions[index % directions.length];
      el.dataset.lineaItemDirection = direction;
      const grouped = el.closest('.goal-card, .method-card, .projection-card, .subline-card, .linea-pillar, .linea-about__content');
      const groupIndex = grouped ? [...(grouped.parentElement?.children || [])].indexOf(grouped) : index;
      el.style.setProperty('--linea-item-delay', `${Math.max(0, groupIndex % 4) * 58}ms`);
      el.style.setProperty('--linea-item-duration', `${700 + (index % 3) * 70}ms`);
      index += 1;
    });

    const revealTargets = document.querySelectorAll('.linea-item-reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.add('linea-item-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('linea-item-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -38px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
