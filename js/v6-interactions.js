(() => {
  'use strict';
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  // Reusable centred carousel: the active publication is emphasized, with smaller neighbours on each side.
  document.querySelectorAll('[data-centered-carousel]').forEach((root) => {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const track = root.querySelector('[data-carousel-track]');
    if (!viewport || !track) return;
    const cards = Array.from(track.children).filter((node) => node.matches('a, article, button, .gp-carousel__card'));
    if (cards.length < 2) return;

    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const counter = root.querySelector('[data-carousel-counter]');
    const dotsHost = root.querySelector('[data-carousel-dots]');
    const dots = [];
    let active = Math.max(0, Math.min(cards.length - 1, Number.parseInt(root.dataset.carouselInitial || '0', 10) || 0));
    let timer = null;
    let visible = true;
    const intervalMs = Math.max(1800, Number.parseInt(root.dataset.carouselInterval || '5000', 10) || 5000);

    if (dotsHost) {
      dotsHost.replaceChildren();
      cards.forEach((card, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gp-carousel__dot';
        dot.setAttribute('aria-label', `Mostrar publicación ${index + 1} de ${cards.length}`);
        dot.addEventListener('click', () => { setActive(index, true); restartTimer(); });
        dotsHost.append(dot);
        dots.push(dot);
      });
    }

    const displayIndex = (index) => String(index + 1).padStart(2, '0');
    const updateState = (index) => {
      active = (index + cards.length) % cards.length;
      cards.forEach((card, i) => {
        const selected = i === active;
        card.classList.toggle('is-active', selected);
        if (selected) card.setAttribute('aria-current', 'true');
        else card.removeAttribute('aria-current');
      });
      dots.forEach((dot, i) => {
        if (i === active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (counter) counter.textContent = `${displayIndex(active)} / ${displayIndex(cards.length)}`;
    };
    const updateTrackGutters = () => {
      const firstCard = cards[0];
      if (!firstCard) return;
      const gutter = Math.max(0, (viewport.clientWidth - firstCard.clientWidth) / 2);
      track.style.paddingLeft = `${gutter}px`;
      track.style.paddingRight = `${gutter}px`;
    };
    const centerCard = (index) => {
      const card = cards[index];
      if (!card) return;
      updateTrackGutters();
      const cardLeft = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
      const left = cardLeft - (viewport.clientWidth - card.clientWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const setActive = (index, shouldScroll) => {
      updateState(index);
      if (shouldScroll) centerCard(active);
    };
    const syncFromScroll = () => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearest = active;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, i) => {
        const center = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft + card.clientWidth / 2;
        const nextDistance = Math.abs(center - viewportCenter);
        if (nextDistance < distance) { distance = nextDistance; nearest = i; }
      });
      updateState(nearest);
    };
    const stopTimer = () => { if (timer) window.clearInterval(timer); timer = null; };
    const startTimer = () => {
      stopTimer();
      if (reduceMotion || !visible || document.hidden) return;
      timer = window.setInterval(() => setActive(active + 1, true), intervalMs);
    };
    const restartTimer = () => { stopTimer(); startTimer(); };

    prev?.addEventListener('click', () => { setActive(active - 1, true); restartTimer(); });
    next?.addEventListener('click', () => { setActive(active + 1, true); restartTimer(); });
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); setActive(active - 1, true); restartTimer(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setActive(active + 1, true); restartTimer(); }
    });
    let scrollFrame = 0;
    viewport.addEventListener('scroll', () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => { syncFromScroll(); scrollFrame = 0; });
    }, { passive: true });
    // Autoplay deliberately does not pause on hover or keyboard focus: the carousel
    // continues advancing without requiring a click. It pauses only when off-screen,
    // the document is hidden, or the visitor requests reduced motion.
    document.addEventListener('visibilitychange', startTimer);
    window.addEventListener('resize', () => centerCard(active), { passive: true });
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => { updateTrackGutters(); centerCard(active); });
      resizeObserver.observe(viewport);
    }
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        startTimer();
      }, { threshold: .08 });
      observer.observe(root);
    }
    updateState(active);
    requestAnimationFrame(() => centerCard(active));
    startTimer();
  });

  // Repeat the same calm hero entrance on secondary pages, while leaving the Home's native animation intact.
  document.documentElement.classList.add('gp-v6-ready');
})();
