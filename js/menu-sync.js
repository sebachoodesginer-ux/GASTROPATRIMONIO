/* GastroPatrimonio V19 — sincroniza el menú hamburguesa en todas las páginas. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const nav = document.getElementById('navigation');
  const button = document.getElementById('menuButton');
  const backdrop = document.getElementById('menuBackdrop');
  if (!header || !nav || !button) return;

  const isMobileMenu = () => window.matchMedia('(max-width: 1450px)').matches;
  const sync = () => {
    const open = nav.classList.contains('open') && isMobileMenu();
    if (backdrop) backdrop.classList.toggle('active', open);
    header.classList.toggle('menu-active', open);
    if (open) header.classList.remove('is-hidden');
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-controls', 'navigation');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    button.classList.toggle('active', open);
  };

  /* Los scripts propios de cada página alternan .open; este listener
     sincroniza solo los detalles visuales y accesibles del menú compartido. */
  button.addEventListener('click', () => requestAnimationFrame(sync));
  nav.querySelectorAll('.navigation__link').forEach(link => {
    link.addEventListener('click', () => requestAnimationFrame(sync));
  });
  backdrop?.addEventListener('click', () => {
    if (nav.classList.contains('open')) button.click();
    requestAnimationFrame(sync);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') requestAnimationFrame(sync);
  });
  window.addEventListener('resize', () => {
    if (!isMobileMenu() && nav.classList.contains('open')) button.click();
    requestAnimationFrame(sync);
  }, { passive: true });
  sync();
});
