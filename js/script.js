(function () {
  "use strict";

  // Menú móvil
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Slider de casos clínicos (antes/después)
  var slider = document.querySelector("[data-cases-slider]");
  if (slider) {
    var track = slider.querySelector(".cases-slider__track");
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = slider.querySelector(".cases-slider__dots");
    var prevBtn = slider.querySelector(".cases-slider__arrow--prev");
    var nextBtn = slider.querySelector(".cases-slider__arrow--next");
    var current = 0;
    var autoplayDelay = 6000;
    var autoplayTimer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Ir al caso " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () {
        goTo(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function update() {
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      update();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      if (slides.length < 2) return;
      autoplayTimer = setInterval(next, autoplayDelay);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

    // Teclado
    slider.setAttribute("tabindex", "0");
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restartAutoplay(); }
      if (e.key === "ArrowLeft") { prev(); restartAutoplay(); }
    });

    // Swipe táctil
    var startX = 0, deltaX = 0, dragging = false;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
      stopAutoplay();
    }, { passive: true });
    track.addEventListener("touchmove", function (e) {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    track.addEventListener("touchend", function () {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) next(); else prev();
      }
      deltaX = 0;
      restartAutoplay();
    });

    // Pausar autoplay al pasar el mouse
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    update();
    startAutoplay();
  }

  // Año dinámico en el footer
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Animación de aparición al hacer scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
