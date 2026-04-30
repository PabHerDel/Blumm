/* =============================================================
   MAIN.JS
   Script compartido por todas las páginas.
   - Toggle del menú mobile.
   - Fade-in por IntersectionObserver (solo opacidad).
   - Scroll-spy: resalta el proyecto activo en la barra lateral
     mientras se hace scroll en work.html.
   ============================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Menú mobile: abrir / cerrar
     --------------------------------------------------------- */
  var toggle   = document.getElementById('navToggle');
  var panel    = document.getElementById('navPanel');
  var closeBtn = document.getElementById('navClose');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.add('open');
    });
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener('click', function () {
      panel.classList.remove('open');
    });
  }

  /* Cerrar panel mobile al hacer click en un link */
  if (panel) {
    var panelLinks = panel.querySelectorAll('a');
    for (var i = 0; i < panelLinks.length; i++) {
      panelLinks[i].addEventListener('click', function () {
        panel.classList.remove('open');
      });
    }
  }

  /* ---------------------------------------------------------
     Fade-in al entrar en viewport (sólo opacidad)
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
     Scroll-spy para proyectos en work.html
     Detecta cuál sección (#project-N) está visible y marca
     el link correspondiente en la barra lateral como .active.
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

})();
