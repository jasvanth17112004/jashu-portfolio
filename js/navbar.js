/**
 * navbar.js
 * Handles:
 *  - Sticky scroll effect (adds .scrolled class)
 *  - Active nav link highlight based on scroll position
 *  - Mobile hamburger menu toggle
 *  - Close mobile menu on link click
 */

(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  // ── 1. Scroll: toggle .scrolled and active link ──────────────────

  function onScroll() {
    const scrollY = window.scrollY;

    // Scrolled class for glassmorphism border
    if (scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link based on section in viewport
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop    = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on page load

  // ── 2. Hamburger: toggle mobile menu ────────────────────────────

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // ── 3. Close menu when a mobile nav link is clicked ─────────────

  const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── 4. Close menu on outside click ─────────────────────────────

  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

})();
