/* =============================================================
   MAIN.JS
   Script compartido por todas las páginas.
   - Toggle del menú mobile.
   - Fade-in por IntersectionObserver (solo opacidad, sin movimiento).
   Se carga con <script defer src="js/main.js"></script>, así que
   el DOM ya está parseado cuando este código corre.
   ============================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Menú mobile: abrir / cerrar
     Si los elementos no existen en la página, salir en silencio.
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

  /* Cerrar el panel mobile al hacer click en un link interno */
  if (panel) {
    var panelLinks = panel.querySelectorAll('a');
    for (var i = 0; i < panelLinks.length; i++) {
      panelLinks[i].addEventListener('click', function () {
        panel.classList.remove('open');
      });
    }
  }

  /* ---------------------------------------------------------
     Fade-in al entrar en viewport
     Observa todos los elementos con clase .fade-in y les
     agrega .is-visible la primera vez que aparecen.
     --------------------------------------------------------- */
  var targets = document.querySelectorAll('.fade-in');

  if (targets.length === 0) return;

  /* Fallback para navegadores sin IntersectionObserver */
  if (!('IntersectionObserver' in window)) {
    for (var j = 0; j < targets.length; j++) {
      targets[j].classList.add('is-visible');
    }
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  targets.forEach(function (el) { io.observe(el); });

})();
