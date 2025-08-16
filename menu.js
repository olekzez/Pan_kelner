// menu.js
(function () {
  const menuOpen   = document.getElementById('menuOpen');
  const menuClose  = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuPanel  = document.getElementById('menuPanel');
  const backdrop   = document.getElementById('menuBackdrop');

  if (!menuOpen || !mobileMenu || !menuPanel) return;

  const open = () => {
    mobileMenu.classList.remove('hidden');
    // animacja po jednym frame (by transition zadziałał)
    requestAnimationFrame(() => {
      menuPanel.classList.remove('translate-x-full');
      menuPanel.classList.add('translate-x-0');
      menuOpen.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      // focus trap – ustaw focus na zamknięciu
      menuClose && menuClose.focus();
      document.body.style.overflow = 'hidden';
    });
  };

  const close = () => {
    menuPanel.classList.add('translate-x-full');
    menuPanel.classList.remove('translate-x-0');
    menuOpen.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // po zakończeniu animacji ukryj kontener
    setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    menuOpen.focus();
  };

  menuOpen.addEventListener('click', open);
  menuClose && menuClose.addEventListener('click', close);
  backdrop && backdrop.addEventListener('click', close);

  // ESC zamyka
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      close();
    }
  });
})();
