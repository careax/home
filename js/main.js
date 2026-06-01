/**
 * main.js — UI 인터랙션, 반응형 네비게이션, 오리지널 스타일 스크롤 및 폼 연동
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Nav: scroll 감지 → .dark ─────────────────────────────── */
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');
  const onScroll = () => {
    if (!nav) return;
    const heroHeight = hero ? hero.offsetHeight - 100 : 600;
    nav.classList.toggle('dark', window.scrollY > heroHeight);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Nav: active link 하이라이트 ──────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-item');

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
  const fadeItems = document.querySelectorAll('.course, .method-cell, .testimonial');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)';
    fadeObserver.observe(el);
  });

  /* ─── Curriculum filter tabs ────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.curr-tab');
  const courseCards = document.querySelectorAll('.course');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide courses
      courseCards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('hidden');
          // Stagger effect
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
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
      const targetId = a.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 72; // Nav height offset
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });

  /* ─── Brand Home 스크롤 ───────────────────────────────────────────── */
  const brandHome = document.getElementById('brandHome');
  brandHome?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── Course CTA $\rightarrow$ Register 연동 ──────────────────────────────── */
  document.querySelectorAll('[data-course-select]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course-select');
      const regCourseSelect = document.getElementById('regCourse');
      if (regCourseSelect && course) {
        regCourseSelect.value = course;
      }
      const regSection = document.getElementById('register');
      if (regSection) {
        window.scrollTo({
          top: regSection.getBoundingClientRect().top + window.scrollY - 72,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ─── Ticker pause on hover ─────────────────────────────────────── */
  document.querySelectorAll('.ticker, .stats-ticker').forEach(ticker => {
    const track = ticker.querySelector('.ticker-track, .stats-ticker-track');
    if (!track) return;
    ticker.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

  /* ─── PDF Curriculum (Print) ─────────────────────────────────────── */
  const pdfBtn = document.getElementById('pdfBtn');
  pdfBtn?.addEventListener('click', () => {
    window.print();
  });

  /* ─── Register Success Modal Close ───────────────────────────────── */
  const regModal = document.getElementById('registerModal');
  const regModalClose = document.getElementById('registerModalClose');
  const regModalBackdrop = document.getElementById('registerModalBackdrop');
  
  const closeRegModal = () => {
    regModal?.classList.remove('open');
    regModal?.setAttribute('aria-hidden', 'true');
  };
  
  regModalClose?.addEventListener('click', closeRegModal);
  regModalBackdrop?.addEventListener('click', closeRegModal);
});
