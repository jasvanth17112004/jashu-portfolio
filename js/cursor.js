/**
 * cursor.js
 * Custom animated cursor that follows the mouse.
 *
 * - Outer ring: follows mouse with a slight lag (smooth)
 * - Inner dot: snaps directly to cursor position
 * - Hover on interactive elements: cursor expands
 * - Click: burst animation
 *
 * To DISABLE: comment out all code in this file,
 * or remove the <script src="js/cursor.js"> tag in index.html.
 */

(function () {
  'use strict';

  // Only enable on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  // ── Create cursor elements ───────────────────────────────────────
  const cursorDot  = document.createElement('div');
  const cursorRing = document.createElement('div');

  cursorDot.className  = 'cursor-dot';
  cursorRing.className = 'cursor-ring';

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  // ── Inject cursor styles ─────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px;
      height: 6px;
      background: #f5a623;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
      mix-blend-mode: difference;
    }

    .cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 32px;
      height: 32px;
      border: 1.5px solid rgba(245, 166, 35, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition:
        width  0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.2s ease;
    }

    .cursor-ring.hover {
      width: 56px;
      height: 56px;
      border-color: rgba(245, 166, 35, 0.8);
    }

    .cursor-ring.clicking {
      width: 20px;
      height: 20px;
    }

    @keyframes cursor-burst {
      0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ── Track positions ──────────────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot snaps instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top  = `${mouseY}px`;
  });

  // ── Ring follows with lag (rAF loop) ────────────────────────────
  function animateRing() {
    const ease = 0.15;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top  = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // ── Hover expansion on interactive elements ──────────────────────
  const hoverTargets = 'a, button, [role="button"], .skill-tag, .project-card, .cert-card, .contact-card, .strength-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursorRing.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursorRing.classList.remove('hover');
    }
  });

  // ── Click animation ──────────────────────────────────────────────
  document.addEventListener('mousedown', () => {
    cursorRing.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursorRing.classList.remove('clicking');
  });

  // ── Hide cursor when leaving window ─────────────────────────────
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorRing.style.opacity = '1';
  });

})();
