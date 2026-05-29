/**
 * main.js — UI 인터랙션 & 커리큘럼 타임라인 페이드인 애니메이션
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Nav: scroll 감지 → .scrolled ─────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Nav: active link 하이라이트 ──────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  const linkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => linkObserver.observe(s));

  /* ─── Hamburger (mobile) ────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu?.classList.toggle('open', !expanded);
    mobileMenu?.setAttribute('aria-hidden', String(expanded));
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  /* ─── Fade-in on scroll ─────────────────────────────────────────── */
  const fadeItems = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeItems.forEach(el => fadeObserver.observe(el));

  /* ─── Curriculum filter tabs ────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update ARIA + active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide cards with fade
      courseCards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('hidden');
          // Re-trigger fade-in
          requestAnimationFrame(() => {
            card.classList.remove('visible');
            requestAnimationFrame(() => card.classList.add('visible'));
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ─── Smooth scroll for anchor links ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ─── Ticker pause on hover ─────────────────────────────────────── */
  document.querySelectorAll('.ticker, .stats-ticker').forEach(ticker => {
    const track = ticker.querySelector('.ticker__track, .stats-ticker__track');
    if (!track) return;
    ticker.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });
});
