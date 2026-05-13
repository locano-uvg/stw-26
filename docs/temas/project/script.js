/* =====================================================
   Mi Colección Personal — Guía del Proyecto
   Interactive behavior: theme, sidebar, scrollspy, copy
   UVG · Sistemas y Tecnologías Web 2026
   ===================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------
     1. THEME TOGGLE
     Reads/writes 'tema' in localStorage.
     The HTML attribute is set early by the inline script
     in <head> to prevent flash, so here we just wire up
     the toggle button.
  ------------------------------------------------------- */
  const html = document.documentElement;

  function getTheme() {
    return html.getAttribute('data-theme') || 'claro';
  }

  function setTheme(tema) {
    html.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
  }

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(getTheme() === 'claro' ? 'oscuro' : 'claro');
    });
  }

  /* -------------------------------------------------------
     2. MOBILE SIDEBAR (hamburger menu)
  ------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    overlay.removeAttribute('aria-hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when a nav link is clicked (mobile UX)
  if (sidebar) {
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) closeSidebar();
      });
    });
  }

  // Close sidebar on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  /* -------------------------------------------------------
     3. SCROLLSPY
     Highlights the nav link for the section currently
     visible near the top of the viewport.
     Uses a throttled scroll listener for reliability
     across all screen sizes and section heights.
  ------------------------------------------------------- */

  // Ordered list of section IDs that have corresponding nav links
  const SECTION_IDS = [
    'inicio',
    'como-usar',
    'idea-central',
    'temas',
    'arquitectura',
    'stack',
    'fase-1',
    'fase-2',
    'fase-3',
    'fase-4',
    'comparativa',
    'hooks',
    'codigo',
    'faq',
    'recursos',
  ];

  const navLinks = {};
  if (sidebar) {
    sidebar.querySelectorAll('.nav-link[data-target]').forEach(link => {
      navLinks[link.dataset.target] = link;
    });
  }

  let ticking = false;
  let currentActive = null;

  function updateScrollspy() {
    const TOPBAR_HEIGHT = 70; // topbar + some buffer
    let active = SECTION_IDS[0]; // default to first

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= TOPBAR_HEIGHT) {
        active = id;
      }
    }

    if (active !== currentActive) {
      currentActive = active;
      Object.values(navLinks).forEach(link => link.classList.remove('is-active'));
      if (navLinks[active]) {
        navLinks[active].classList.add('is-active');
        // Scroll the nav link into view within the sidebar
        scrollNavLinkIntoView(navLinks[active]);
      }
    }

    ticking = false;
  }

  function scrollNavLinkIntoView(link) {
    if (!sidebar || window.innerWidth < 1024) return;
    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect    = link.getBoundingClientRect();
    if (linkRect.top < sidebarRect.top + 40) {
      link.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else if (linkRect.bottom > sidebarRect.bottom - 40) {
      link.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollspy);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load
  updateScrollspy();

  /* -------------------------------------------------------
     4. COPY TO CLIPBOARD
     Adds click behavior to every .copy-btn.
     The text is read from the sibling <code> element's
     textContent (which gives the raw text without HTML
     entities or Prism highlight spans).
  ------------------------------------------------------- */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pre  = btn.parentElement.querySelector('pre');
        const code = pre ? pre.querySelector('code') : null;
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent || '');
          btn.textContent = '¡Copiado!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copiar';
            btn.classList.remove('copied');
          }, 2000);
        } catch {
          // Fallback for browsers that block clipboard without user gesture
          btn.textContent = 'Error';
          setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
        }
      });
    });
  }

  /* -------------------------------------------------------
     5. INIT
     Run copy buttons after DOM and Prism are ready.
  ------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }

  /* -------------------------------------------------------
     6. SMOOTH SCROLL POLYFILL FOR ANCHOR LINKS
     Ensures the topbar doesn't cover the target section
     when clicking nav links (CSS scroll-margin-top handles
     this for modern browsers already).
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      // Let CSS scroll-margin-top handle the offset
      // We just prevent the default hash jump in favor of smooth scroll
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without causing a jump
      history.pushState(null, '', '#' + id);
    });
  });

})();
