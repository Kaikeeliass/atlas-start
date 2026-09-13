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


/* ── Carrossel Automático de Refeições (Comida de Verdade) ── */
(function initFoodCarousel() {
  const carousel = document.getElementById('food-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.food-carousel-slide'));
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;
  let isPaused = false;
  let isInView = true;
  const INTERVAL = 2500; // 2.5 segundos entre trocas automáticas

  // Pré-carregamento e tratamento de fallback para evitar piscadas
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;

    const preload = new Image();
    preload.src = img.src;

    img.addEventListener('error', function onImgError() {
      img.removeEventListener('error', onImgError);
      if (img.src.includes('/desafio-atlas-start/assets/images/')) {
        img.src = img.src.replace('/desafio-atlas-start/assets/images/', './assets/images/');
      } else if (img.src.includes('/desafio-atlas-start/assets/imagens/')) {
        img.src = img.src.replace('/desafio-atlas-start/assets/imagens/', './assets/images/');
      }
    });
  });

  function goToSlide(nextIndex) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');

    // Pré-carrega a imagem do próximo índice
    const followingIndex = (currentIndex + 1) % slides.length;
    const followingImg = slides[followingIndex]?.querySelector('img');
    if (followingImg && !followingImg.complete) {
      const p = new Image();
      p.src = followingImg.src;
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function startAutoplay() {
    if (intervalId || isPaused || !isInView) return;
    intervalId = setInterval(nextSlide, INTERVAL);
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Pausa ao passar o mouse e retoma ao sair
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoplay();
  });

  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoplay();
  });

  // Pausa com foco de teclado para acessibilidade
  carousel.addEventListener('focusin', () => {
    isPaused = true;
    stopAutoplay();
  });

  carousel.addEventListener('focusout', () => {
    isPaused = false;
    startAutoplay();
  });

  // Pausa em dispositivos de toque
  carousel.addEventListener('touchstart', () => {
    isPaused = true;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    isPaused = false;
    startAutoplay();
  }, { passive: true });

  // Pausa quando a aba fica em segundo plano
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else if (!isPaused && isInView) {
      startAutoplay();
    }
  });

  // IntersectionObserver: só executa quando visível na tela
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting;
        if (isInView && !isPaused) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(carousel);
  } else {
    startAutoplay();
  }
})();
