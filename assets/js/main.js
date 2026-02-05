/**
 * ==========================================================================
 * NUTRICIONISTA - SITE INSTITUCIONAL PREMIUM
 * JavaScript para interações básicas + Injeção de conteúdo
 * ==========================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. INJEÇÃO DE CONTEÚDO (来自 content.js)
  // ==========================================
  function injectContent() {
    if (typeof siteContent === 'undefined') {
      console.error('content.js não carregado!');
      return;
    }

    // Hero
    setText('hero-eyebrow', siteContent.heroEyebrow);
    setText('hero-title', siteContent.heroTitle);
    setText('hero-subtitle', siteContent.heroSubtitle);
    setText('hero-location', siteContent.heroLocation);

    // Sobre
    setText('about-title', siteContent.aboutTitle);
    setText('about-text', siteContent.aboutText);

    // Credenciais
    setText('crn', siteContent.crn);
    setText('formation', siteContent.formation);
    setText('loc', siteContent.location);
    setText('exp', siteContent.experience);

    // Abordagem
    setText('approach-title', siteContent.approachTitle);
    setText('approach-intro', siteContent.approachIntro);

    // Steps
    siteContent.steps.forEach((step, index) => {
      setText(`step-${index + 1}-title`, step.title);
      setText(`step-${index + 1}-desc`, step.description);
    });

    // Principles
    const principlesList = document.getElementById('principles-list');
    if (principlesList) {
      principlesList.innerHTML = siteContent.principles.map(p =>
        `<li class="principles__item"><i data-feather="check"></i><span>${p}</span></li>`
      ).join('');
    }

    // Serviços
    setText('services-title', siteContent.servicesTitle);
    setText('services-subtitle', siteContent.servicesSubtitle);

    siteContent.services.forEach((service, index) => {
      setText(`service-${index + 1}-title`, service.title);
      setText(`service-${index + 1}-desc`, service.description);
      const badge = document.getElementById(`service-${index + 1}-badge`);
      if (badge) {
        badge.textContent = service.badge || '';
        badge.style.display = service.badge ? 'block' : 'none';
      }
    });

    // Depoimentos
    setText('testimonials-title', siteContent.testimonialsTitle);
    setText('testimonials-subtitle', siteContent.testimonialsSubtitle);

    siteContent.testimonials.forEach((t, index) => {
      setText(`testimonial-${index + 1}-quote`, `"${t.quote}"`);
      setText(`testimonial-${index + 1}-name`, `${t.name}, ${t.age}`);
      setText(`testimonial-${index + 1}-location`, t.location);
      const avatar = document.getElementById(`testimonial-${index + 1}-avatar`);
      if (avatar) avatar.textContent = t.name.charAt(0);
    });

    // Contato
    setText('contact-title', siteContent.contactTitle);
    setText('contact-text', siteContent.contactText);
    const email = document.getElementById('contact-email');
    if (email) {
      email.textContent = siteContent.contactEmail;
      email.href = `mailto:${siteContent.contactEmail}`;
    }
    setText('contact-note', siteContent.contactNote);

    // Footer
    setText('footer-tagline', siteContent.footerTagline);

    console.log('Conteúdo injetado com sucesso!');
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ==========================================
  // 2. UTILIDADES
  // ==========================================
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight * 0.85 && rect.bottom >= 0;
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ==========================================
  // 3. MENU MOBILE
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  function toggleMenu() {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.setAttribute('data-feather', 'x');
    } else {
      icon.setAttribute('data-feather', 'menu');
    }
    if (typeof feather !== 'undefined') feather.replace();
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 4. HEADER FIXO
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, 10));

  // ==========================================
  // 5. SCROLL SUAVE
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 6. ANIMAÇÕES NO SCROLL
  // ==========================================
  function initFadeAnimations() {
    document.querySelectorAll('.about__content, .about__image-wrapper, .service-card, .step, .testimonial, .approach__content, .approach__principles, .contact__content').forEach(el => {
      el.classList.add('fade-in');
    });
  }

  function handleFadeAnimations() {
    document.querySelectorAll('.fade-in').forEach(el => {
      if (isInViewport(el)) el.classList.add('visible');
    });
  }

  initFadeAnimations();
  window.addEventListener('scroll', debounce(handleFadeAnimations, 50));
  handleFadeAnimations();

  // ==========================================
  // 7. INICIALIZAÇÃO
  // ==========================================
  document.addEventListener('DOMContentLoaded', function () {
    injectContent();
    if (typeof feather !== 'undefined') feather.replace();
    console.log('Site inicializado!');
  });

})();

