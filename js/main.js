/**
 * ATLAS START 21 DIAS — GSAP Animations
 * ScrollTrigger + entrada de elementos + parallax suave
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* ===========================================
   NAVBAR — Scroll behavior
=========================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ===========================================
   HERO — Entrance animations
=========================================== */
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
  .fromTo('#hero-badge', 
    { opacity: 0, y: -24 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
  )
  .fromTo('#hero-title',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('#hero-subtitle',
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
    '-=0.5'
  )
  .fromTo('#hero-actions',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('#hero-stats',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.35'
  )
  .fromTo('#hero-visual',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.8'
  )
  .fromTo('#hfc-1',
    { opacity: 0, x: -30, y: 10 },
    { opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
    '-=0.4'
  )
  .fromTo('#hfc-2',
    { opacity: 0, x: 30, y: -10 },
    { opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
    '-=0.5'
  )
  .fromTo('#scroll-indicator',
    { opacity: 0 },
    { opacity: 0.5, duration: 0.8 },
    '-=0.2'
  );

/* ===========================================
   FLOATING CARDS — Subtle levitation
=========================================== */
gsap.to('#hfc-1', {
  y: -8,
  duration: 3.2,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  delay: 1.5
});

gsap.to('#hfc-2', {
  y: 8,
  duration: 2.8,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  delay: 1.8
});

/* ===========================================
   HERO BACKGROUND PARALLAX
=========================================== */
gsap.to('.hero-grid-lines', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
  },
  y: 80,
  opacity: 0.3
});

gsap.to('.hero-glow-blob', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  y: 60,
});

/* ===========================================
   HELPER — createScrollAnim
=========================================== */
function scrollAnim(selector, fromProps, toProps, triggerEl, extra = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.fromTo(selector, fromProps, {
    ...toProps,
    scrollTrigger: {
      trigger: triggerEl || selector,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...extra,
    }
  });
}

function scrollAnimStagger(selector, fromProps, toProps, triggerEl, staggerVal = 0.15) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  gsap.fromTo(selector, fromProps, {
    ...toProps,
    stagger: staggerVal,
    scrollTrigger: {
      trigger: triggerEl || selector,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  });
}

/* ===========================================
   SECTION: O QUE É O DESAFIO?
=========================================== */
scrollAnim('#what-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#o-que-e');
scrollAnim('#what-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#o-que-e');
scrollAnim('#what-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#o-que-e');
scrollAnim('#what-img', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '#o-que-e');

// Cards stagger
gsap.fromTo('#wc-1, #wc-2, #wc-3',
  { opacity: 0, y: 40, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.65,
    ease: 'back.out(1.4)',
    stagger: 0.14,
    scrollTrigger: {
      trigger: '#what-cards',
      start: 'top 88%',
      toggleActions: 'play none none none',
    }
  }
);

/* ===========================================
   SECTION: BENEFÍCIOS
=========================================== */
scrollAnim('#ben-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#beneficios');
scrollAnim('#ben-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#beneficios');

// Benefits items stagger from right
gsap.fromTo('#bi-1, #bi-2, #bi-3, #bi-4, #bi-5',
  { opacity: 0, x: -40 },
  {
    opacity: 1, x: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '#benefits-list',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
);

scrollAnim('#ben-img', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '#beneficios');
scrollAnim('#ben-highlight', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#beneficios');

/* ===========================================
   SECTION: COMO FUNCIONA (Timeline)
=========================================== */
scrollAnim('#how-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#como-funciona');
scrollAnim('#how-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#como-funciona');

// Steps — from bottom, stagger
gsap.fromTo('#hs-1, #hs-2, #hs-3, #hs-4',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#how-timeline',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
);

/* ===========================================
   SECTION: PAGAMENTO
=========================================== */
scrollAnim('#price-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#pagamento');
scrollAnim('#price-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#pagamento');
scrollAnim('#price-subtitle', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#pagamento');
scrollAnim('#pricing-card',
  { opacity: 0, y: 60, scale: 0.93 },
  { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.2)' },
  '#pagamento'
);

/* ===========================================
   SECTION: DEPOIMENTOS
=========================================== */
scrollAnim('#test-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#depoimentos');
scrollAnim('#test-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#depoimentos');

gsap.fromTo('#tc-1, #tc-2, #tc-3',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0,
    duration: 0.65,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '#testimonials-grid',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
);

/* ===========================================
   SECTION: FAQ
=========================================== */
scrollAnim('#faq-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '#faq');
scrollAnim('#faq-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '#faq');

gsap.fromTo('#faq-1, #faq-2, #faq-3, #faq-4, #faq-5, #faq-6',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0,
    duration: 0.5,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#faq-list',
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  }
);

/* ===========================================
   SECTION: FINAL CTA
=========================================== */
scrollAnim('#fcta-title',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
  '#cta-final'
);
scrollAnim('#fcta-subtitle',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
  '#cta-final'
);
scrollAnim('#fcta-actions',
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  '#cta-final'
);

/* ===========================================
   PRICING CARD GLOW PULSE
=========================================== */
gsap.to('#pricing-card', {
  scrollTrigger: {
    trigger: '#pricing-card',
    start: 'top 70%',
    toggleActions: 'play none none none',
  },
  boxShadow: '0 0 120px rgba(74,222,128,0.15), 0 8px 32px rgba(0,0,0,0.4)',
  duration: 0.1,
});

// Subtle pulse on pricing card border
gsap.to('#pricing-card', {
  boxShadow: '0 0 80px rgba(74,222,128,0.08), 0 8px 32px rgba(0,0,0,0.4)',
  duration: 2.5,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  delay: 2
});

/* ===========================================
   FAQ ACCORDION
=========================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===========================================
   SMOOTH SCROLL for anchor links
=========================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1.1,
      ease: 'power3.inOut'
    });
  });
});

/* ===========================================
   GSAP ScrollTo plugin fallback
=========================================== */
// If ScrollTo plugin not loaded, use native scroll
if (!gsap.plugins || !gsap.plugins.scrollTo) {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
}

/* ===========================================
   CTA BUTTON — Magnetic hover effect
=========================================== */
function magneticEffect(el) {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.15;
    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
}

magneticEffect(document.getElementById('hero-cta-btn'));
magneticEffect(document.getElementById('kiwify-cta'));
magneticEffect(document.getElementById('final-cta-btn'));

/* ===========================================
   SCROLL INDICATOR — Hide on scroll
=========================================== */
const scrollIndicator = document.getElementById('scroll-indicator');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    gsap.to(scrollIndicator, { opacity: 0, duration: 0.4 });
  }
}, { passive: true, once: true });

console.log('%c🚀 Atlas Start 21 Dias', 'color: #D95757; font-size: 16px; font-weight: bold;');
console.log('%cBuild com GSAP + ScrollTrigger', 'color: #94a3b8; font-size: 12px;');

