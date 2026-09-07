/**
 * ATLAS START 21 DIAS — Scroll Effects
 * Animações bidirecionais (rolar para cima e para baixo)
 * Não altera o conteúdo existente — apenas efeitos visuais em camada
 */

(function () {
  'use strict';

  /* =============================================
     1. SCROLL PROGRESS BAR
     Barra fina no topo que avança conforme o scroll
  ============================================= */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  Object.assign(progressBar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '3px',
    width: '0%',
    background: 'linear-gradient(90deg, #D95757, #ff8a8a, #D95757)',
    backgroundSize: '200% 100%',
    zIndex: '9999',
    transition: 'width 0.08s linear',
    pointerEvents: 'none',
    boxShadow: '0 0 10px rgba(217,87,87,0.6)',
  });
  document.body.appendChild(progressBar);

  let gradPos = 0;
  (function animateGradient() {
    gradPos += 0.4;
    progressBar.style.backgroundPosition = gradPos + '% 0%';
    requestAnimationFrame(animateGradient);
  })();

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();


  /* =============================================
     2. SCROLL DIRECTION DETECTOR
     Adiciona classes .scrolling-down / .scrolling-up no <body>
  ============================================= */
  let lastScrollY = window.scrollY;
  let ticking = false;

  function detectDirection() {
    const current = window.scrollY;
    if (current > lastScrollY + 2) {
      document.body.classList.add('scrolling-down');
      document.body.classList.remove('scrolling-up');
    } else if (current < lastScrollY - 2) {
      document.body.classList.add('scrolling-up');
      document.body.classList.remove('scrolling-down');
    }
    lastScrollY = current;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(detectDirection);
      ticking = true;
    }
  }, { passive: true });


  /* =============================================
     3. REVEAL-ON-SCROLL BIDIRECIONAL
     Elementos entram ao rolar para baixo e reativam ao rolar para cima
  ============================================= */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .sr-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                  transform 0.65s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .sr-reveal.sr-visible { opacity: 1; transform: translateY(0); }

    .sr-reveal-left {
      opacity: 0;
      transform: translateX(-32px);
      transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                  transform 0.7s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .sr-reveal-left.sr-visible { opacity: 1; transform: translateX(0); }

    .sr-reveal-right {
      opacity: 0;
      transform: translateX(32px);
      transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                  transform 0.7s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .sr-reveal-right.sr-visible { opacity: 1; transform: translateX(0); }

    .sr-reveal-scale {
      opacity: 0;
      transform: scale(0.92) translateY(20px);
      transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                  transform 0.7s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .sr-reveal-scale.sr-visible { opacity: 1; transform: scale(1) translateY(0); }

    .sr-d1 { transition-delay: 0.08s; }
    .sr-d2 { transition-delay: 0.16s; }
    .sr-d3 { transition-delay: 0.24s; }
    .sr-d4 { transition-delay: 0.32s; }
    .sr-d5 { transition-delay: 0.40s; }
    .sr-d6 { transition-delay: 0.48s; }

    .scroll-particle {
      position: fixed;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #D95757;
      pointer-events: none;
      z-index: 9998;
      opacity: 0;
      box-shadow: 0 0 6px rgba(217,87,87,0.8);
    }

    #scroll-dir-indicator {
      position: fixed;
      right: 20px;
      bottom: 80px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(217,87,87,0.12);
      border: 1px solid rgba(217,87,87,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #D95757;
      z-index: 9990;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      backdrop-filter: blur(8px);
    }
  `;
  document.head.appendChild(styleEl);

  const revealMap = [
    { sel: '#what-label',     cls: 'sr-reveal' },
    { sel: '#what-title',     cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#what-subtitle',  cls: 'sr-reveal',       delay: 'sr-d2' },
    { sel: '#what-img',       cls: 'sr-reveal-left' },
    { sel: '#wc-1',           cls: 'sr-reveal-scale', delay: 'sr-d1' },
    { sel: '#wc-2',           cls: 'sr-reveal-scale', delay: 'sr-d2' },
    { sel: '#wc-3',           cls: 'sr-reveal-scale', delay: 'sr-d3' },
    { sel: '#ben-label',      cls: 'sr-reveal' },
    { sel: '#ben-title',      cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#bi-1',           cls: 'sr-reveal-left',  delay: 'sr-d1' },
    { sel: '#bi-2',           cls: 'sr-reveal-left',  delay: 'sr-d2' },
    { sel: '#bi-3',           cls: 'sr-reveal-left',  delay: 'sr-d3' },
    { sel: '#bi-4',           cls: 'sr-reveal-left',  delay: 'sr-d4' },
    { sel: '#bi-5',           cls: 'sr-reveal-left',  delay: 'sr-d5' },
    { sel: '#ben-img',        cls: 'sr-reveal-right' },
    { sel: '#ben-highlight',  cls: 'sr-reveal',       delay: 'sr-d2' },
    { sel: '#how-label',      cls: 'sr-reveal' },
    { sel: '#how-title',      cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#hs-1',           cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#hs-2',           cls: 'sr-reveal',       delay: 'sr-d2' },
    { sel: '#hs-3',           cls: 'sr-reveal',       delay: 'sr-d3' },
    { sel: '#hs-4',           cls: 'sr-reveal',       delay: 'sr-d4' },
    { sel: '#price-label',    cls: 'sr-reveal' },
    { sel: '#price-title',    cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#price-subtitle', cls: 'sr-reveal',       delay: 'sr-d2' },
    { sel: '#pricing-card',   cls: 'sr-reveal-scale', delay: 'sr-d1' },
    { sel: '#faq-label',      cls: 'sr-reveal' },
    { sel: '#faq-title',      cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#faq-1',          cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#faq-2',          cls: 'sr-reveal',       delay: 'sr-d2' },
    { sel: '#faq-3',          cls: 'sr-reveal',       delay: 'sr-d3' },
    { sel: '#faq-4',          cls: 'sr-reveal',       delay: 'sr-d4' },
    { sel: '#faq-5',          cls: 'sr-reveal',       delay: 'sr-d5' },
    { sel: '#faq-6',          cls: 'sr-reveal',       delay: 'sr-d6' },
    { sel: '#fcta-title',     cls: 'sr-reveal' },
    { sel: '#fcta-subtitle',  cls: 'sr-reveal',       delay: 'sr-d1' },
    { sel: '#fcta-actions',   cls: 'sr-reveal',       delay: 'sr-d2' },
  ];

  function applyRevealClasses() {
    revealMap.forEach(({ sel, cls, delay }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.classList.add(cls);
      if (delay) el.classList.add(delay);
    });
  }

  function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
        } else {
          entry.target.classList.remove('sr-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.sr-reveal, .sr-reveal-left, .sr-reveal-right, .sr-reveal-scale')
      .forEach(el => observer.observe(el));
  }

  applyRevealClasses();
  setTimeout(initRevealObserver, 350);


  /* =============================================
     4. PARALLAX SUAVE EM DECORAÇÕES
  ============================================= */
  // Nota: .hero-glow-blob já é animado pelo main.js via GSAP ScrollTrigger
  // Não duplicamos o transform para evitar conflito
  const parallaxTargets = [
    { sel: '.final-cta-bg',  speed: 0.04 },
    { sel: '.pricing-glow', speed: 0.05 },
  ];

  const parallaxEls = parallaxTargets
    .map(({ sel, speed }) => ({ el: document.querySelector(sel), speed }))
    .filter(p => p.el !== null);

  function updateParallax() {
    const sy = window.scrollY;
    parallaxEls.forEach(({ el, speed }) => {
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();


  /* =============================================
     5. PARTÍCULAS FLUTUANTES AO ROLAR
  ============================================= */
  const PARTICLE_COUNT = 8;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const p = document.createElement('div');
    p.className = 'scroll-particle';
    document.body.appendChild(p);
    return p;
  });
  let particleIdx = 0;
  let particleThrottle = 0;
  let prevScrollYp = window.scrollY;

  function spawnParticle(direction) {
    const p = particles[particleIdx % PARTICLE_COUNT];
    particleIdx++;

    const side = Math.random() > 0.5 ? 'left' : 'right';
    const x = side === 'left' ? Math.random() * 60 : window.innerWidth - Math.random() * 60;
    const y = Math.random() * window.innerHeight;
    const moveX = (side === 'left' ? 1 : -1) * (20 + Math.random() * 30);
    const moveY = direction === 'down' ? -(30 + Math.random() * 50) : (30 + Math.random() * 50);

    Object.assign(p.style, { left: x + 'px', top: y + 'px', opacity: '0', transform: 'scale(1)', transition: 'none' });
    requestAnimationFrame(() => {
      p.style.transition = 'opacity 0.3s ease, transform 0.8s ease';
      p.style.opacity = '0.7';
      requestAnimationFrame(() => {
        p.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.1)`;
        p.style.opacity = '0';
      });
    });
  }

  window.addEventListener('scroll', () => {
    const now = Date.now();
    const sy = window.scrollY;
    const velocity = Math.abs(sy - prevScrollYp);
    prevScrollYp = sy;

    if (now - particleThrottle > 100 && velocity > 6) {
      particleThrottle = now;
      const dir = document.body.classList.contains('scrolling-down') ? 'down' : 'up';
      spawnParticle(dir);
      if (velocity > 25) spawnParticle(dir);
    }
  }, { passive: true });


  /* =============================================
     6. GLOW SUAVE NAS SEÇÕES AO ENTRAR NA VIEWPORT
  ============================================= */
  const GLOW = 'rgba(217,87,87,0.045)';
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (typeof gsap === 'undefined') return;
      if (entry.isIntersecting) {
        gsap.to(entry.target, { boxShadow: `inset 0 0 90px ${GLOW}`, duration: 0.8, ease: 'power1.out' });
      } else {
        gsap.to(entry.target, { boxShadow: 'inset 0 0 0px rgba(0,0,0,0)', duration: 0.5, ease: 'power1.in' });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));


  /* =============================================
     7. INDICADOR VISUAL DE DIREÇÃO DE SCROLL
  ============================================= */
  const scrollDirEl = document.createElement('div');
  scrollDirEl.id = 'scroll-dir-indicator';
  scrollDirEl.innerHTML = '↓';
  document.body.appendChild(scrollDirEl);

  let dirTimeout;
  let dirVisible = false;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (sy < 200 || sy > maxScroll - 100) {
      scrollDirEl.style.opacity = '0';
      dirVisible = false;
      return;
    }
    scrollDirEl.innerHTML = document.body.classList.contains('scrolling-down') ? '↓' : '↑';
    if (!dirVisible) {
      scrollDirEl.style.opacity = '1';
      dirVisible = true;
    }
    clearTimeout(dirTimeout);
    dirTimeout = setTimeout(() => {
      scrollDirEl.style.opacity = '0';
      dirVisible = false;
    }, 1000);
  }, { passive: true });


  /* =============================================
     8. HERO — não interfere aqui
     As animações do hero são gerenciadas pelo main.js
     para evitar conflito com a timeline de entrada
  ============================================= */

  console.log('%c✨ Scroll Effects carregados', 'color: #D95757; font-size: 12px;');

})();
