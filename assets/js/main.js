/**
 * ==========================================================================
 * NUTRICIONISTA - SITE INSTITUCIONAL PREMIUM
 * JavaScript leve para interações básicas
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * ==========================================================================
   * 1. UTILIDADES
   * ==========================================================================
   */

  /**
   * Verifica se elemento está visível no viewport
   * @param {HTMLElement} element 
   * @returns {boolean}
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top <= windowHeight * 0.85 &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0
    );
  }

  /**
   * Debounce para otimizar eventos de scroll/resize
   * @param {Function} func 
   * @param {number} wait 
   * @returns {Function}
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * ==========================================================================
   * 2. MENU MOBILE
   * ==========================================================================
   */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  function toggleMenu() {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Alterna ícone menu/close
    const icon = navToggle.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.setAttribute('data-feather', 'x');
    } else {
      icon.setAttribute('data-feather', 'menu');
    }

    // Re-inicializa feather icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }

  function closeMenu() {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-feather', 'menu');
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', toggleMenu);

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /**
   * ==========================================================================
   * 3. HEADER FIXO COM EFEITO DE SCROLL
   * ==========================================================================
   */
  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Otimização: usa debounce para não executar em cada pixel scrollado
  window.addEventListener('scroll', debounce(handleScroll, 10));

  /**
   * ==========================================================================
   * 4. SCROLL SUAVE PARA ANCORAS
   * ==========================================================================
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignora links que só começam com # mas não apontam para elemento
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        // Calcula posição considerando header fixo
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * ==========================================================================
   * 5. ANIMAÇÕES NO SCROLL (Fade In)
   * ==========================================================================
   */
  const fadeElements = document.querySelectorAll('.fade-in');

  function handleFadeAnimations() {
    fadeElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }

  // Aplica classe fade-in a elementos que devem ser animados
  function initFadeAnimations() {
    const sections = document.querySelectorAll(
      '.about__content, .about__image-wrapper, ' +
      '.service-card, .step, .testimonial, ' +
      '.approach__content, .approach__principles, ' +
      '.contact__content'
    );

    sections.forEach(section => {
      section.classList.add('fade-in');
    });
  }

  // Inicializa e verifica no scroll
  initFadeAnimations();
  window.addEventListener('scroll', debounce(handleFadeAnimations, 50));

  // Verifica uma vez ao carregar (para elementos já visíveis)
  handleFadeAnimations();

  /**
   * ==========================================================================
   * 6. WHATSAPP CTA - INTERAÇÃO
   * ==========================================================================
   */
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Opcional: tracking analítico
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'whatsapp',
          'event_label': 'conversão'
        });
      }
    });
  });

  /**
   * ==========================================================================
   * 7. OBSERVADOR DE INTERSEÇÃO (Lazy loading avançado)
   * ==========================================================================
   */
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Observar imagens com lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /**
   * ==========================================================================
   * 8. INICIALIZAÇÃO FINAL
   * ==========================================================================
   */
  document.addEventListener('DOMContentLoaded', function () {
    // Garante que feather icons estão renderizados
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    console.log('Site da Nutricionista inicializado com sucesso!');
  });

})();

