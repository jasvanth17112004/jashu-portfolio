/**
 * animations.js
 * Intersection Observer–based scroll reveal.
 *
 * Elements with class:
 *   .reveal-up   → slides up + fades in
 *   .reveal-left → slides left + fades in
 *   .reveal-right→ slides right + fades in
 *
 * Add --delay CSS var to the element (via style="--delay:0.2s")
 * to stagger multiple elements in the same group.
 *
 * Usage in HTML:
 *   <div class="reveal-up" style="--delay:0.1s">...</div>
 *   <div class="reveal-up" style="--delay:0.2s">...</div>
 */

(function () {
  'use strict';

  // Check for reduced-motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Mark all elements as visible immediately
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  // IntersectionObserver config
  const observerOptions = {
    root: null,          // use viewport
    rootMargin: '0px',
    threshold: 0.12,     // trigger when 12% is visible
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal so it doesn't re-animate
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Skill tag stagger animation ─────────────────────────────────
  // Adds micro-stagger to skill tags inside observed categories
  const skillTagObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          tag.style.animationDelay = `${i * 0.05}s`;
          tag.classList.add('tag-visible');
        });
        skillTagObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach((cat) => {
    skillTagObserver.observe(cat);
  });

  // ── Smooth scroll for anchor links ──────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // ── Typing animation for hero title ─────────────────────────────
  // Optional: add data-type="true" to any element and it will
  // animate the text in character-by-character on page load.
  //
  // <span data-typing="true" data-text="Your Text Here"></span>
  //
  // (Currently unused but ready to use)
  function initTyping() {
    const typingEls = document.querySelectorAll('[data-typing="true"]');
    typingEls.forEach((el) => {
      const text    = el.getAttribute('data-text') || el.textContent;
      const speed   = parseInt(el.getAttribute('data-speed') || '60', 10);
      el.textContent = '';
      el.style.visibility = 'visible';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    });
  }

  window.addEventListener('load', initTyping);

})();
