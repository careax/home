/**
 * i18n.js — KO/EN 다국어 딕셔너리 & 토글 로직
 * localStorage key: 'careax_lang'  (값: 'ko' | 'en')
 */

const DICT = {
  ko: {
    /* Nav */
    'nav.about':      'About',
    'nav.curriculum': 'Curriculum',
    'nav.method':     'Method',
    'nav.contact':    'Contact',
    'nav.cta':        'Booking 2026',

    /* Hero */
    'hero.role1': 'Senior PM',
    'hero.role2': 'UX/UI 기획 · AI Technology Team',
    'hero.role3': 'UX Design M.A. · 이화여자대학교 석사',

    /* About */
    'about.tag':     'The Instructor',
    'about.heading': 'AI 플랫폼 기획 실무형.\n기획 PM 실무형 강사.',
    'about.lead':    'IBM Application Development & Innovation에서 Sr. PM으로, 현대오토에버 AI Technology팀에서 UX/UI 기획자로 활동하며 실제 AI 제품과 서비스를 기획부터 개발, 출시까지 경험해온 실무자입니다. 또한 이화여자대학교에서 UX 디자인 석사를 마치며 사용자 경험과 서비스 설계에 대한 전문성을 쌓았습니다.',
    'about.bold1':   '단순히 ChatGPT 활용법을 배우는 데 그치지 않습니다.',
    'about.bold2':   '현업에 바로 적용할 수 있는 실용적인 인사이트',
    'about.quote':   '"AI 와 함께 기획, 디자인, 개발이 융합되는 생산성 높은 AX 직무 역량을 키웁니다."',
    'about.body2':   '스타트업 PO부터 글로벌 기업 UX/UI 기획, PM까지 다양한 환경에서 검증된 워크플로우를, 4단계 커리큘럼으로 압축해 전달합니다.',

    /* Curriculum */
    'curriculum.heading': '한 학기를 한 워크숍에.\nAX 커리큘럼.',
    'curriculum.sub':     '기획·디자인·PM 직군이 AI 와 함께 일하는 방식을 4단계로 재설계합니다. 단발성 특강부터 8주 인텐시브까지, 조직 단계에 맞게 결합 가능합니다.',

    /* Filters */
    'filter.all':        'All',
    'filter.foundation': 'Foundation',
    'filter.practice':   'Practice',
    'filter.leadership': 'Leadership',
    'filter.custom':     'Custom',

    /* Course levels */
    'course.foundation': 'Foundation',
    'course.practice':   'Practice',
    'course.leadership': 'Leadership',

    /* Labels */
    'label.popular':    'Most popular',
    'label.buildalong': 'Build-along',
    'label.intensive':  '인텐시브',

    /* AX 101 */
    'ax101.title': 'AI 툴 기반\nUX/기획 실무 입문',
    'ax101.desc':  'ChatGPT · Claude · Figma를 처음 잡는 취준생을 위한 실무 출발점. AI 툴로 리서치하고, Figma로 화면을 그리고, 기획서 한 장을 직접 완성합니다.',
    'ax101.w1':    'AI 툴 셋업 & 프롬프트 기초',
    'ax101.w2':    'Figma 기초 — 와이어프레임 실습',
    'ax101.w3':    'AI로 사용자 리서치 & 페르소나 작성',
    'ax101.w4':    '한 장 기획서 완성 & 피드백',

    /* AX 201 */
    'ax201.title': 'AI 플랫폼\n기획서 작성 실습',
    'ax201.desc':  '실제 AI 서비스 기획서를 처음부터 끝까지 작성하는 코스. 서비스 정의 → IA 설계 → 화면 기획 → Figma 프로토타입까지, 포트폴리오에 바로 넣을 수 있는 산출물을 만듭니다.',
    'ax201.w1':    'AI 서비스 콘셉 정의 & 유즈케이스 매핑',
    'ax201.w2':    'IA · 플로우차트 설계',
    'ax201.w3':    'Figma 화면 기획 & UI 컴포넌트 구성',
    'ax201.w4':    '기획서 문서화 & 프로토타입 완성',

    /* AX 301 */
    'ax301.title': 'AI 관리자 사이트\n기획 & 프론트 구현',
    'ax301.desc':  'AI 플랫폼 관리자 페이지를 직접 기획하고 구현까지 완성하는 집중 코스. Figma 디자인 시스템을 만들고, 바이브코딩으로 실제 동작하는 프론트를 배포합니다.',
    'ax301.w1':    '관리자 사이트 요구사항 & 화면 정의서',
    'ax301.w2':    'Figma 디자인 시스템 & 고화질 목업',
    'ax301.w3':    '바이브코딩으로 UI 구현 (Cursor · v0)',
    'ax301.w4':    '데이터 연동 & 관리자 기능 구현',
    'ax301.w5':    '배포 · 테스트 · 포트폴리오 정리',

    /* AX 401 */
    'ax401.title': '취업 포트폴리오\n완성 집중반',
    'ax401.desc':  '기획 · UX · PM 직군 취업을 목표로 한 마무리 코스. 101–301 산출물을 포트폴리오로 다듬고, 자기소개서 · 면접 답변까지 AI 툴로 함께 준비합니다.',
    'ax401.w1':    '포트폴리오 구조 설계 & 케이스 스터디 작성',
    'ax401.w2':    'Figma 포트폴리오 사이트 제작',
    'ax401.w3':    'AI로 자기소개서 & 직무 역량 정리',
    'ax401.w4':    '모의 면접 & 피드백 세션',

    /* Tags */
    'tag.beginner':    '입문',
    'tag.jobseeker':   '취준생',
    'tag.practical':   '실무형',
    'tag.portfolio':   '포트폴리오',
    'tag.realproject': '실전 프로젝트',
    'tag.vibecoding':  '바이브코딩',
    'tag.jobready':    '취업 준비',
    'tag.oneonone':    '1:1 피드백',
    'tag.custom':      '맞춤형',

    /* CTA */
    'cta.enroll':  'Enroll',
    'cta.inquire': 'Inquire',

    /* Method */
    'method.heading': '일방향 강의 X.\n참여형 실무 강의 O.',
    'method.sub':     '슬라이드 100장이 아닌, 매 세션 결과물 하나. 15년차 IT 실무 경험을 살린 4단계 학습 사이클로 진행합니다.',
    'step1.title':    'Diagnose',
    'step1.desc':     '현재 워크플로우를 매핑하고 AI 가 실제로 가치를 더할 지점을 찾습니다.',
    'step2.title':    'Prototype',
    'step2.desc':     '아이디어를 즉시 작동하는 결과물로. 매 세션 살아있는 산출물을 만듭니다.',
    'step3.title':    'Validate',
    'step3.desc':     'AI 결과를 검증하는 루틴을 코호트 내에서 직접 돌려봅니다.',
    'step4.title':    'Ship',
    'step4.desc':     '강의실 안에서 끝나지 않습니다. 본인의 실제 업무에 안착시키는 30일 플랜으로 마무리.',

    /* Voices */
    'voices.heading': '현장의 PM 들이\n남긴 말.',
    'voice1.text':    '"AI 도구를 배우는 줄 알았는데, 일하는 방식 자체가 바뀌었습니다. 4주 만에 팀의 리서치 리드타임이 절반."',
    'voice1.role':    'Product Lead · Fintech',
    'voice2.text':    '"PM 출신이 가르치는 AX 라서 강의 내용이 우리 회의실 풍경과 같았습니다. 다음날부터 바로 적용했어요."',
    'voice2.role':    'UX Manager · Mobility',

    /* Contact */
    'contact.heading': "Let's build\nyour AX team.",
    'contact.sub':     '2026년 상반기 기업/대학 출강, 비공개 코호트 (8–16명) 일정을 받고 있습니다. 조직의 AX 성숙도에 맞춰 커리큘럼을 조립해 드립니다.',
    'contact.direct':  'Book a workshop',
    'form.name':       '이름 / Name',
    'form.email':      '이메일 / Email',
    'form.org':        '소속 / Organization',
    'form.message':    '문의 내용 / Message',
    'form.submit':     '문의 보내기',
  },

  en: {
    /* Nav */
    'nav.about':      'About',
    'nav.curriculum': 'Curriculum',
    'nav.method':     'Method',
    'nav.contact':    'Contact',
    'nav.cta':        'Booking 2026',

    /* Hero */
    'hero.role1': 'Senior PM',
    'hero.role2': 'UX/UI Planning · AI Technology Team',
    'hero.role3': 'UX Design M.A. · Ewha Womans University',

    /* About */
    'about.tag':     'The Instructor',
    'about.heading': 'AI Platform Planning Expert.\nHands-on PM Instructor.',
    'about.lead':    'A practitioner who served as Sr. PM at IBM Application Development & Innovation and as UX/UI planner at Hyundai AutoEver AI Technology team — from concept to launch across real AI products and services. Also holds a UX Design M.A. from Ewha Womans University.',
    'about.bold1':   "This isn't just a course on how to use ChatGPT.",
    'about.bold2':   'practical insights you can apply from day one',
    'about.quote':   '"We build the AX skills to plan, design, and develop alongside AI — at real-world productivity."',
    'about.body2':   'Verified workflows from startup PO to global enterprise UX/UI planning and PM — distilled into a 4-stage curriculum.',

    /* Curriculum */
    'curriculum.heading': 'A full semester in one workshop.\nThe AX Curriculum.',
    'curriculum.sub':     'A 4-stage redesign of how planners, designers, and PMs work with AI. Combinable from single lectures to 8-week intensives.',

    /* Filters */
    'filter.all':        'All',
    'filter.foundation': 'Foundation',
    'filter.practice':   'Practice',
    'filter.leadership': 'Leadership',
    'filter.custom':     'Custom',

    /* Course levels */
    'course.foundation': 'Foundation',
    'course.practice':   'Practice',
    'course.leadership': 'Leadership',

    /* Labels */
    'label.popular':    'Most popular',
    'label.buildalong': 'Build-along',
    'label.intensive':  'Intensive',

    /* AX 101 */
    'ax101.title': 'AI Tool-Based\nUX/Planning Fundamentals',
    'ax101.desc':  'A hands-on starting point for job seekers picking up ChatGPT, Claude, and Figma for the first time. Research with AI tools, wireframe in Figma, and complete a one-page planning doc.',
    'ax101.w1':    'AI Tool Setup & Prompt Basics',
    'ax101.w2':    'Figma Basics — Wireframe Workshop',
    'ax101.w3':    'User Research & Persona Writing with AI',
    'ax101.w4':    'One-Page Planning Doc & Feedback',

    /* AX 201 */
    'ax201.title': 'AI Platform\nPlanning Doc Workshop',
    'ax201.desc':  'Write a complete AI service planning document from scratch. Service definition → IA design → screen planning → Figma prototype — portfolio-ready output.',
    'ax201.w1':    'AI Service Concept & Use-case Mapping',
    'ax201.w2':    'IA · Flowchart Design',
    'ax201.w3':    'Figma Screen Planning & UI Components',
    'ax201.w4':    'Document & Prototype Completion',

    /* AX 301 */
    'ax301.title': 'AI Admin Dashboard\nPlanning & Front-end Build',
    'ax301.desc':  'Plan and build an AI platform admin page end-to-end. Create a Figma design system and deploy a working front-end via vibe coding.',
    'ax301.w1':    'Admin Requirements & Screen Spec',
    'ax301.w2':    'Figma Design System & Hi-Fi Mockup',
    'ax301.w3':    'Vibe Coding UI Build (Cursor · v0)',
    'ax301.w4':    'Data Integration & Admin Features',
    'ax301.w5':    'Deploy · Test · Portfolio Wrap-up',

    /* AX 401 */
    'ax401.title': 'Job Portfolio\nIntensive Bootcamp',
    'ax401.desc':  'A finishing course for planning/UX/PM job seekers. Polish 101–301 outputs into a portfolio and prep your résumé & interviews with AI tools.',
    'ax401.w1':    'Portfolio Structure & Case Study Writing',
    'ax401.w2':    'Figma Portfolio Site',
    'ax401.w3':    'AI-Assisted Cover Letter & Competency Map',
    'ax401.w4':    'Mock Interview & Feedback Session',

    /* Tags */
    'tag.beginner':    'Beginner',
    'tag.jobseeker':   'Job Seekers',
    'tag.practical':   'Practical',
    'tag.portfolio':   'Portfolio',
    'tag.realproject': 'Real Project',
    'tag.vibecoding':  'Vibe Coding',
    'tag.jobready':    'Job Ready',
    'tag.oneonone':    '1:1 Feedback',
    'tag.custom':      'Custom',

    /* CTA */
    'cta.enroll':  'Enroll',
    'cta.inquire': 'Inquire',

    /* Method */
    'method.heading': 'No one-way lectures.\nParticipatory, hands-on learning.',
    'method.sub':     'Not 100 slides — one deliverable per session. Powered by a 4-stage learning cycle built on 15 years of IT practice.',
    'step1.title':    'Diagnose',
    'step1.desc':     'Map your current workflow and find where AI actually adds value.',
    'step2.title':    'Prototype',
    'step2.desc':     'Turn ideas into working outputs immediately. Every session produces a live artifact.',
    'step3.title':    'Validate',
    'step3.desc':     'Run AI-result validation routines inside the cohort.',
    'step4.title':    'Ship',
    'step4.desc':     "It doesn't end in the classroom. Wrap up with a 30-day plan to embed learning into real work.",

    /* Voices */
    'voices.heading': "What PMs in the\nfield are saying.",
    'voice1.text':    '"I thought I was learning an AI tool — but my whole way of working changed. The team\'s research lead-time was cut in half within 4 weeks."',
    'voice1.role':    'Product Lead · Fintech',
    'voice2.text':    '"Because the instructor is a PM herself, the content looked exactly like our meeting room. Applied it the next day."',
    'voice2.role':    'UX Manager · Mobility',

    /* Contact */
    'contact.heading': "Let's build\nyour AX team.",
    'contact.sub':     "We're scheduling H1 2026 corporate/university sessions and private cohorts (8–16 people). We'll tailor the curriculum to your org's AX maturity.",
    'contact.direct':  'Book a workshop',
    'form.name':       'Name',
    'form.email':      'Email',
    'form.org':        'Organization',
    'form.message':    'Message',
    'form.submit':     'Send Inquiry',
  }
};

/* ─── Engine ────────────────────────────────────────────────────────── */
const I18n = (() => {
  const STORAGE_KEY = 'careax_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ko';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyLang(lang) {
    const dict = DICT[lang] || DICT['ko'];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // Preserve inner HTML for elements with child tags
        if (el.children.length === 0) {
          // Replace \n with <br> for headings
          el.innerHTML = dict[key].replace(/\n/g, '<br>');
        }
      }
    });

    // Update lang toggle display
    const langLabel    = document.getElementById('langLabel');
    const langLabelAlt = document.getElementById('langLabelAlt');
    if (langLabel && langLabelAlt) {
      if (lang === 'ko') {
        langLabel.textContent    = 'KO';
        langLabelAlt.textContent = 'EN';
      } else {
        langLabel.textContent    = 'EN';
        langLabelAlt.textContent = 'KO';
      }
    }
  }

  function toggle() {
    const current = getLang();
    const next    = current === 'ko' ? 'en' : 'ko';
    setLang(next);
    applyLang(next);
  }

  function init() {
    const lang = getLang();
    applyLang(lang);

    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, getLang, setLang, applyLang, toggle };
})();

document.addEventListener('DOMContentLoaded', I18n.init);
