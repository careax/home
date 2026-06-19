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
    'ax101.title': 'UX/UI 기획 입문 &\n실무 포트폴리오',
    'ax101.desc':  '취준생과 재직자를 대상으로 UX/UI 기획 입문부터 실무까지 학습하며 Figma, Claude, Vibe Coding을 활용하여 실제 포트폴리오를 완성합니다.',
    'ax101.w1':    'UX/UI 기획 기초 & Claude 활용 서비스 리서치',
    'ax101.w2':    'Figma 기초 및 UI/UX 와이어프레임 & 프로토타입 실습',
    'ax101.w3':    'Vibe Coding(바이브 코딩)을 활용한 프론트엔드 UI 화면 구현',
    'ax101.w4':    '개인 실무 포트폴리오 피드백 & 최종 웹 배포',

    /* AX 201 */
    'ax201.title': 'Dify 기반 AICC\n워크플로우 기획 & 론칭',
    'ax201.desc':  'Dify를 기반으로 AI 컨택센터(AICC)의 핵심 시나리오와 멀티턴 워크플로우를 기획하고, API 연동을 통해 실제 웹 서비스를 성공적으로 론칭합니다.',
    'ax201.w1':    'AICC 비즈니스 이해 및 LLM 프롬프트 설계 기초',
    'ax201.w2':    'Dify 기반 RAG(검색 증강 생성) 지식 베이스 설계',
    'ax201.w3':    'LLM 에이전트 및 컴포넌트 간 멀티턴 워크플로우 기획',
    'ax201.w4':    '웹 퍼블리싱 및 외부 API 연동/실전 론칭',

    /* AX 301 */
    'ax301.title': '글로벌 마케팅 플랫폼\n& CRM 기획 적용',
    'ax301.desc':  '글로벌 마케팅 솔루션(MarTech)과 CRM 데이터를 활용해 사용자 획득(Acquisition)부터 리텐션(Retention)까지의 마케팅 자동화 플로우를 설계하고 적용합니다.',
    'ax301.w1':    '글로벌 마케팅 기술(MarTech) 생태계 & CRM 데이터 모델링',
    'ax301.w2':    '고객 여정 지도(CJM) 기반 개인화 트리거 및 시나리오 정의',
    'ax301.w3':    '글로벌 마케팅 플랫폼 연동 및 자동화 메시징 기획',
    'ax301.w4':    'CRM 데이터 분석 기반 캠페인 최적화 및 현업 적용 실습',

    /* AX 401 */
    'ax401.title': 'AX PM 리더십 &\n기업 맞춤형 워크숍',
    'ax401.desc':  '현업 팀장 및 기획 리더를 대상으로 조직 내 AX 역량 내재화, 생성형 AI 워크플로우 설계 가이드라인 및 맞춤형 솔루션을 전수합니다.',
    'ax401.w1':    '엔터프라이즈 AI 트렌드 및 조직 내 AX 도입 로드맵',
    'ax401.w2':    '생성형 AI 서비스 개발 프로세스 & 기획 리스크 관리',
    'ax401.w3':    '사내 워크플로우 최적화 및 AI 도구 평가 프레임워크',
    'ax401.w4':    '우리 조직만을 위한 AI 플랫폼 맞춤형 시나리오 설계 & 컨설팅',

    /* Tags */
    'tag.beginner':    '입문',
    'tag.jobseeker':   '취준생 · 재직자',
    'tag.practical':   '실무형',
    'tag.portfolio':   '포트폴리오',
    'tag.realproject': '실전 프로젝트',
    'tag.vibecoding':  '바이브코딩',
    'tag.jobready':    '취업 준비',
    'tag.oneonone':    '1:1 피드백',
    'tag.custom':      '맞춤형',

    /* CTA */
    'cta.enroll':  'Enroll',
    'cta.inquire': 'Register',

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

    /* Register Form (New Specs) */
    'form.registerTitle':    '수강신청',
    'form.registerSub':      '수강을 원하시는 코스를 선택하고 필수 정보들을 입력해 주세요. 접수 후 빠른 시일 내에 안내 메일을 전달 드립니다.',
    'form.regCourse':        '신청 코스 / Select Course',
    'form.selectPlaceholder':'코스를 선택해 주세요',
    'form.regName':          '이름 / Name',
    'form.regEmail':         '이메일 / Email',
    'form.regPhone':         '연락처 / Phone',
    'form.regNotes':         '신청 경로 및 남기실 말씀 / Message',
    'form.regSubmit':        '수강 신청하기',
    'modal.regSuccessTitle': '수강신청 완료',
    'modal.regSuccessDesc':  '수강신청이 성공적으로 접수되었습니다.<br>입력하신 이메일로 안내 메일이 발송됩니다.',
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
    'ax101.title': 'Intro to UX/UI Planning\n& Practical Portfolio',
    'ax101.desc':  'Learn UX/UI planning from basics to practice for job seekers and professionals. Leverage Figma, Claude, and Vibe Coding to complete a ready-to-ship portfolio.',
    'ax101.w1':    'UX/UI Planning Basics & Service Research with Claude',
    'ax101.w2':    'Figma Basics & UI/UX Wireframing & Prototyping',
    'ax101.w3':    'Front-end UI Implementation via Vibe Coding',
    'ax101.w4':    'Personal Portfolio Review & Final Web Deployment',

    /* AX 201 */
    'ax201.title': 'Dify-Based AICC\nWorkflow Planning & Launch',
    'ax201.desc':  'Plan and design AI Contact Center (AICC) scenarios and multi-turn workflows using Dify, and launch a live web application through API integration.',
    'ax201.w1':    'Understanding AICC & LLM Prompt Engineering Basics',
    'ax201.w2':    'Designing Knowledge Bases with Dify-based RAG',
    'ax201.w3':    'Planning Multi-turn Workflows & LLM Agent Components',
    'ax201.w4':    'Web Publishing & External API Integration / Live Launch',

    /* AX 301 */
    'ax301.title': 'Global Marketing Platform\n& CRM Planning Practice',
    'ax301.desc':  'Leverage global marketing platforms (MarTech) and CRM data to design automation flows from acquisition to retention, applying them directly to real business cases.',
    'ax301.w1':    'MarTech Ecosystem & CRM Data Modeling Basics',
    'ax301.w2':    'Defining Personalized Triggers & Scenarios based on CJM',
    'ax301.w3':    'Integrating Global Marketing Platforms & Automated Messaging',
    'ax301.w4':    'Campaign Optimization based on CRM Data & Business Case Studies',

    /* AX 401 */
    'ax401.title': 'AX PM Leadership &\nCustom Enterprise Workshop',
    'ax401.desc':  'Empower engineering leads and planning managers to internalize AX capabilities, establish generative AI workflow guidelines, and design custom solutions.',
    'ax401.w1':    'Enterprise AI Trends & AX Adoption Roadmap',
    'ax401.w2':    'Generative AI Development Processes & Risk Management',
    'ax401.w3':    'Workflow Optimization & AI Tool Evaluation Frameworks',
    'ax401.w4':    'Custom AI Platform Scenario Design & Consulting',

    /* Tags */
    'tag.beginner':    'Beginner',
    'tag.jobseeker':   'Job Seekers & Pros',
    'tag.practical':   'Practical',
    'tag.portfolio':   'Portfolio',
    'tag.realproject': 'Real Project',
    'tag.vibecoding':  'Vibe Coding',
    'tag.jobready':    'Job Ready',
    'tag.oneonone':    '1:1 Coaching',
    'tag.custom':      'Custom',

    /* CTA */
    'cta.enroll':  'Enroll',
    'cta.inquire': 'Register',

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

    /* Register Form (New Specs) */
    'form.registerTitle':    'Course Registration',
    'form.registerSub':      'Select your course and fill in required fields. We\'ll send you an invitation email shortly.',
    'form.regCourse':        'Select Course',
    'form.selectPlaceholder':'Please select a course',
    'form.regName':          'Name',
    'form.regEmail':         'Email',
    'form.regPhone':         'Phone',
    'form.regNotes':         'Message',
    'form.regSubmit':        'Register Course',
    'modal.regSuccessTitle': 'Registration Complete',
    'modal.regSuccessDesc':  'Your application has been successfully submitted.<br>An invitation email will be sent to your address.',
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
        // Replace \n with <br> for headings and insert translation
        el.innerHTML = dict[key].replace(/\n/g, '<br>');
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
