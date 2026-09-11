document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const mobileCta = document.querySelector('.mobile-cta');
const footer = document.querySelector('.site-footer');

function updateScrollState() {
  const hasScrolled = window.scrollY > 24;
  header?.classList.toggle('scrolled', hasScrolled);
  mobileCta?.classList.toggle('visible', window.scrollY > 520);
}

updateScrollState();
window.addEventListener('scroll', updateScrollState, { passive: true });

if (mobileCta && footer && 'IntersectionObserver' in window) {
  const footerObserver = new IntersectionObserver(([entry]) => {
    mobileCta.classList.toggle('paused', entry.isIntersecting);
  }, { threshold: 0.05 });

  footerObserver.observe(footer);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const button = item.querySelector('.faq-question');

  button?.addEventListener('click', () => {
    const willOpen = !item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem === item) return;
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    item.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});
