/* =============================================================
   MAIN.JS

   - Dissolve entre páginas: el body entra desvanecido y se
     desvanece de salida antes de navegar.
   - Toggle del panel mobile.
   - Fade-in por IntersectionObserver (sólo opacidad).
   - Scroll-spy: marca el proyecto activo en el menú lateral
     mientras se hace scroll en work.html.
   ============================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. DISSOLVE ENTRE PÁGINAS
     - Al cargar: agregar .is-loaded para animar a opacidad 1.
     - Al hacer click en un link interno: agregar .is-leaving,
       esperar la transición y recién entonces navegar.
     --------------------------------------------------------- */
  var FADE_MS = 600;

  /* Entrada: animar in */
  function showPage() {
    console.log("funcion ejecuctando");
    document.body.classList.add('is-loaded');
  
    const splash      = document.getElementById('splash');
    const SPLASH_HOLD = 1500;  // segundos visible
    const FADE_OUT    = 800;   // duración del fade out
    
    if (!splash) return;
  
    // Nav arranca al 30%
    document.body.classList.add('splash-active');
  
    // Después de 3s: logo desaparece y nav sube a 100% — simultáneo
    setTimeout(function() {
      splash.classList.add('splash--hidden');
      document.body.classList.remove('splash-active');
    }, SPLASH_HOLD);
  
    // Después del fade out: sacar el splash del DOM
    setTimeout(function() {
      splash.style.display = 'none';
    }, SPLASH_HOLD + FADE_OUT);
  }


  /* Si el usuario vuelve por back/forward, restaurar visibilidad */
  window.addEventListener('pageshow', function (e) {
    document.body.classList.remove('is-leaving');
    document.body.classList.add('is-loaded');
  });

  /* Salida: interceptar clicks en links internos del mismo origen */
  function isInternalNav(href) {
    if (!href) return false;
    if (href.charAt(0) === '#') return false;            // ancla en la misma página
    if (href.indexOf('mailto:') === 0) return false;
    if (href.indexOf('tel:') === 0) return false;
    if (href.indexOf('javascript:') === 0) return false;

    /* Permitir links absolutos al mismo host */
    try {
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      /* Si apunta a la misma URL con sólo un hash, no es navegación */
      if (url.pathname === window.location.pathname && url.hash) return false;
      return true;
    } catch (err) {
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    /* Ignorar si el usuario usa Ctrl/Cmd/Shift/middle-click */
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var anchor = e.target.closest && e.target.closest('a');
    if (!anchor) return;

    var href   = anchor.getAttribute('href');
    var target = anchor.getAttribute('target');
    if (target && target !== '_self') return;
    if (!isInternalNav(href)) return;

    e.preventDefault();
    var dest = anchor.href;

    document.body.classList.remove('is-loaded');
    document.body.classList.add('is-leaving');

    setTimeout(function () {
      window.location.href = dest;
    }, FADE_MS);
  });

  /* ---------------------------------------------------------
     2. PANEL MOBILE: abrir / cerrar
     --------------------------------------------------------- */
  var toggle   = document.getElementById('mobToggle');
  var panel    = document.getElementById('mobPanel');
  var closeBtn = document.getElementById('mobClose');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.add('open');
      document.body.style.overflow = 'hidden'; // bloquear scroll detrás
    });
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  /* Cerrar el panel al hacer click en cualquier link interno;
     la navegación se encarga del resto */
  if (panel) {
    var panelLinks = panel.querySelectorAll('a');
    for (var i = 0; i < panelLinks.length; i++) {
      panelLinks[i].addEventListener('click', function () {
        panel.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  /* ---------------------------------------------------------
     3. FADE-IN DE SECCIONES (sólo opacidad, sin movimiento)
     --------------------------------------------------------- */
  var targets = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && targets.length > 0) {
    var fadeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    targets.forEach(function (el) { fadeIO.observe(el); });
  } else {
    for (var j = 0; j < targets.length; j++) {
      targets[j].classList.add('is-visible');
    }
  }

  /* ---------------------------------------------------------
     4. SCROLL-SPY EN WORK
     --------------------------------------------------------- */
  var projects = document.querySelectorAll('.project[id]');

  if (projects.length > 0 && 'IntersectionObserver' in window) {
    var subLinks = document.querySelectorAll('.nav__group-sublist a');

    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          subLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            var hash = href.indexOf('#') !== -1
              ? href.substring(href.indexOf('#'))
              : '';
            if (hash === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    projects.forEach(function (sec) { spyIO.observe(sec); });
  }
  // ← esto es lo que faltaba, va acá al final
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showPage);
  } else {
    showPage();
  }
})();
