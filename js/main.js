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

  /* ─── Course CTA ➔ Register 연동 (팝업 모달 오픈) ─────────────────── */
  const regFormModal = document.getElementById('registerFormModal');
  const popupRegCourseSelect = document.getElementById('popupRegCourse');
  const regFormModalClose = document.getElementById('registerFormModalClose');
  const regFormModalBackdrop = document.getElementById('registerFormModalBackdrop');
  
  const closeRegFormModal = () => {
    regFormModal?.classList.remove('open');
    regFormModal?.setAttribute('aria-hidden', 'true');
  };
  
  regFormModalClose?.addEventListener('click', closeRegFormModal);
  regFormModalBackdrop?.addEventListener('click', closeRegFormModal);
  
  // 글로벌 스코프에 함수 노출시켜 db-handler.js에서 제출 성공 후 팝업 닫을 수 있게 조치
  window.closeRegFormModal = closeRegFormModal;

  document.querySelectorAll('[data-course-select]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course-select');
      
      // 팝업 폼 내의 코스 선택 필드 업데이트
      if (popupRegCourseSelect && course) {
        popupRegCourseSelect.value = course;
      }
      
      // 팝업 폼 모달 오픈
      if (regFormModal) {
        regFormModal.classList.add('open');
        regFormModal.setAttribute('aria-hidden', 'false');
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

  /* ─── Query parameter course selection ────────────────────────────── */
  const urlParams = new URLSearchParams(window.location.search);
  const courseParam = urlParams.get('course');
  if (courseParam) {
    let targetCourse = "";
    const cleanParam = courseParam.replace(/[-·\s]/g, '').toUpperCase(); // e.g. "AX101"
    if (cleanParam === "AX101") targetCourse = "AX · 101";
    else if (cleanParam === "AX201") targetCourse = "AX · 201";
    else if (cleanParam === "AX301") targetCourse = "AX · 301";
    else if (cleanParam === "AX401") targetCourse = "AX · 401";

    if (targetCourse) {
      const regSelect = document.getElementById('regCourse');
      const popupSelect = document.getElementById('popupRegCourse');
      if (regSelect) regSelect.value = targetCourse;
      if (popupSelect) popupSelect.value = targetCourse;

      // Scroll to register section smoothly after a brief delay
      setTimeout(() => {
        const regSection = document.getElementById('register');
        if (regSection) {
          const offset = 72; // Nav height offset
          window.scrollTo({
            top: regSection.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }
});
