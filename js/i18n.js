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
    'curriculum.heading': '취업준비생부터 주니어 PM까지.\n실전형 AI 서비스 기획 커리큘럼.',
    'curriculum.sub':     '비개발자 기획자, PM, 취업준비생이 현업에서 즉시 활약할 수 있도록 실전 프로젝트 중심으로 구성된 CareAX의 직무 밀착형 AI 워크숍입니다.',

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
    'ax101.title': 'AI 서비스 기획 &\nDify 활용 역기획 실무 마스터',
    'ax101.desc':  '취준생과 비개발자 기획자/PM을 위한 실전 과정. 성공적인 AI 서비스를 분석하고 Dify와 노코드 RAG 도구를 활용해 직접 역기획 및 구현하며 실무 기획 역량을 기릅니다.',
    'ax101.w1':    'AI 서비스 기획 프로세스 & 유명 AI 서비스 Dify 기반 역기획 분석',
    'ax101.w2':    '노코드 RAG 기반 데이터 전처리 & 지식 베이스 설계',
    'ax101.w3':    'Dify / Flowise를 활용한 프롬프트 파이프라인 & LLM 워크플로우 구현',
    'ax101.w4':    '실제 AI 서비스 프로토타입 론칭 & 실무 포트폴리오 피드백',

    /* AX 201 */
    'ax201.title': '피그마 & AI 활용\n디자인 시스템 구축 및 자동화 실무',
    'ax201.desc':  'Figma와 AI(Claude Code, Figma MCP)를 활용해 디자인 토큰을 정의하고, 기획-디자인-개발 협업을 자동화하여 프로덕트 일관성을 유지하는 디자인 시스템 워크플로우를 학습합니다.',
    'ax201.w1':    '브랜드 디자인 가이드 수립 & 피그마 디자인 시스템 기초',
    'ax201.w2':    'Figma MCP 및 AI 활용 디자인 토큰(Design Tokens) 정의',
    'ax201.w3':    'Claude Code를 활용한 프론트엔드 코드 자동화 연동',
    'ax201.w4':    '디자인 시스템 검증 & 실무 협업 자동화 워크플로우 완성',

    /* AX 301 */
    'ax301.title': 'AICC 서비스 기획 및\nLLM 에이전트 구축 실무',
    'ax301.desc':  'AICC(AI 고객센터) 구축 실무를 위한 과정. RAG(검색 증강 생성) 지식 베이스 설계와 LLM 에이전트 시나리오 정의를 배우고, Dify 및 외부 API 연동을 통해 AI 상담 서비스를 실제 론칭합니다.',
    'ax301.w1':    'AICC 비즈니스 구조 이해 및 LLM 시나리오 기획',
    'ax301.w2':    'RAG 지식 베이스 구축 & 프롬프트 가이드라인 설계',
    'ax301.w3':    'Dify 기반 멀티턴(Multi-turn) 워크플로우 에이전트 구현',
    'ax301.w4':    '웹 퍼블리싱 연동, AICC 서비스 론칭 및 성능 검증',

    /* AX 401 */
    'ax401.title': '생성형 AI 마케팅 &\nCRM 업무 자동화 캠프',
    'ax401.desc':  '마케터와 기획자를 위한 실전 마케팅 자동화 과정. AI 콘텐츠 제작과 n8n/Dify 기반의 CRM 마케팅 자동화 파이프라인을 설계하여 고객 리텐션을 극대화하는 방법을 배웁니다.',
    'ax401.w1':    'MarTech 생태계 이해 및 AI 기반 마케팅 페르소나 정의',
    'ax401.w2':    'ChatGPT/Midjourney 활용 고효율 광고 카피 & 비주얼 제작',
    'ax401.w3':    'n8n / Dify를 활용한 CRM 마케팅 자동화 트리거 설계',
    'ax401.w4':    'CRM 데이터 분석, 마케팅 캠페인 성과 지표(GA4 등) 분석 및 최적화',

    /* Course Detail Pages Common */
    'nav.backToHome': '홈으로',
    'course.audience': '수강 대상',
    'course.objectives': '학습 목표',
    'course.projects': '실전 프로젝트 결과물',
    'course.curriculum': '주차별 커리큘럼',
    'course.instructor': '강사 소개',
    'course.enrollCTA': '수강 신청하기',
    'course.backCTA': '커리큘럼 목록으로',
    'course.weeks': '주차',
    'course.hours': '시간',
    
    /* Course Detail Pages AX 101 */
    'ax101.audience': '비개발자 기획자/PM, IT 직무 취업준비생, AI 기획 역량을 포트폴리오에 담고 싶은 분',
    'ax101.objectives': '성공한 AI 서비스의 아키텍처를 Dify로 분석하고 직접 구현하기<br>• 텍스트·문서 파싱 및 RAG 지식 베이스 설계 기법 터득<br>• 현업 수준의 AI 프로덕트 기획안 작성 및 실제 론칭',
    'ax101.projects': 'Dify 기반의 AI 서비스 역기획 프로토타입 + 실무 AI 서비스 기획서 및 개인 포트폴리오 웹사이트 배포',
    'ax101.w1_detail': '• AI 서비스 기획 프로세스 개요<br>• 최신 LLM 기술 트렌드 및 기획자의 역할 정의<br>• 시장에서 검증된 AI 프로덕트(서비스) 역기획 및 데이터 흐름 분석',
    'ax101.w2_detail': '• PDF, Word, Web 등 다양한 포맷의 문서 파싱 및 가공 기법<br>• 오답(Hallucination) 방지를 위한 벡터 스토어 임베딩 최적화<br>• AI 서비스의 핵심이 되는 RAG(검색 증강 생성) 지식 베이스 기획',
    'ax101.w3_detail': '• Dify 및 Flowise를 활용한 노코드 프롬프트 파이프라인 설계<br>• 다중 조건 분기 처리 및 API 연동을 통한 에이전트 워크플로우 최적화<br>• 멀티턴 대화 시나리오 및 시스템 프롬프트(System Prompt) 고도화',
    'ax101.w4_detail': '• 프론트엔드 UI 화면 구현 및 웹 배포<br>• 실제 작동하는 AI 서비스 포트폴리오 완성<br>• 현업 PM 강사의 1:1 맞춤형 기획서 피드백 및 포트폴리오 리뷰',

    /* Course Detail Pages AX 201 */
    'ax201.audience': '프로덕트 디자이너, UI/UX 기획자, 개발자와의 협업 속도를 혁신하고 싶은 PM',
    'ax201.objectives': '피그마 컴포넌트와 디자인 토큰(Design Tokens)의 실무 표준 정립<br>• Claude Code와 Figma MCP를 결합한 코드 자동화 구현<br>• 디자인 변경사항이 프론트엔드 코드에 즉시 반영되는 싱크 환경 구축',
    'ax201.projects': '실무 협업용 피그마 디자인 시스템 라이브러리 + Claude Code 연동 프론트엔드 컴포넌트 자동 생성 파일',
    'ax201.w1_detail': '• 일관성 있는 UI를 위한 브랜드 디자인 가이드라인 정립<br>• 피그마(Figma) 베스트 프랙티스 기반의 컴포넌트 구조화<br>• 재사용 가능한 레이아웃과 반응형 디자인 시스템 설계',
    'ax201.w2_detail': '• AI가 이해할 수 있는 형태의 디자인 토큰(Design Tokens) 명세 수립<br>• Figma MCP(Model Context Protocol) 환경 구축 및 연결<br>• 피그마 디자인 정보를 구조화된 JSON 데이터로 추출 및 변환',
    'ax201.w3_detail': '• Claude Code 기반 AI 에이전트와 코드베이스 연결<br>• 디자인 토큰 데이터를 기반으로 리액트/HTML/CSS 컴포넌트 자동 코드 생성<br>• 스타일시트 및 UI 변수 자동화 파이프라인 구현',
    'ax201.w4_detail': '• 디자인 변경 시 코드가 자동으로 업데이트되는 싱크 기능 검증<br>• 다크모드, 다국어 대응 등 복합 스타일 시스템 최적화<br>• 기획자-디자이너-개발자 간의 불필요한 커뮤니케이션을 없애는 협업 시스템 완성',

    /* Course Detail Pages AX 301 */
    'ax301.audience': '고객 경험(CX) 부서 기획자, 사내 운영 효율을 높이고자 하는 PM/제품 관리자',
    'ax301.objectives': 'LLM 대화형 에이전트의 멀티턴 시나리오 설계 역량 확보<br>• 기업 내부 문서를 오답(Hallucination) 없이 검색하는 RAG 파이프라인 기획<br>• 외부 API 연동을 통한 실시간 데이터 조회 챗봇 구현',
    'ax301.projects': '실시간 DB 조회 및 문서 참조 기능이 탑재된 Dify 기반 AICC 에이전트 웹 서비스 론칭',
    'ax301.w1_detail': '• AI 컨택센터(AICC) 비즈니스 가치 및 아키텍처 이해<br>• 인바운드/아웃바운드 콜봇 및 챗봇 서비스의 사용자 경험 시나리오 기획<br>• 상담 데이터 및 로그 구조 분석 기법',
    'ax301.w2_detail': '• 기업 사내 문서, 가이드라인 기반 RAG 지식 베이스 설계<br>• 질문 의도 분류(Intent Classification)를 위한 프롬프트 가이드라인 정의<br>• 하이브리드 검색 및 검색 결과 재순위화(Reranking) 기획',
    'ax301.w3_detail': '• Dify를 사용한 멀티턴 대화 시나리오 설계 및 컴포넌트 매핑<br>• API 노드 연결을 활용한 회원 정보 조회, 예약 상태 변경 등의 트랜잭션 처리<br>• 외부 챗봇 연동 규격 설계',
    'ax301.w4_detail': '• 에이전트 웹 서비스 프론트엔드 연동 및 실전 론칭<br>• 사용자 대화 로그 기반 에이전트 성능 평가 및 답변 정확도 개선 루틴 설계<br>• AICC 상용화를 위한 보안/개인정보 처리 기획 가이드라인',

    /* Course Detail Pages AX 401 */
    'ax401.audience': '그로스 기획자, 데이터 분석 마케터, AI로 1인 마케팅 자동화 파이프라인을 구축하고 싶은 기획자/PM',
    'ax401.objectives': '브랜드 톤앤매너를 유지하는 AI 기반 광고 콘텐츠 대량 제작 프로세스 구축<br>• n8n과 Dify를 결합한 조건별 CRM 자동 메시징 설계<br>• 마케팅 유입부터 리텐션 성과(GA4 등) 연동 및 대시보드 시각화',
    'ax401.projects': 'n8n-Dify 연동 고객 행동 트리거형 CRM 마케팅 자동화 워크플로우 + 성과 분석 자동화 시스템',
    'ax401.w1_detail': '• 마테크(MarTech) 생태계의 주요 도구 및 CRM 데이터 연동 원리 학습<br>• 생성형 AI를 활용한 타겟 오디언스 분석 및 페르소나 정의<br>• 고객 여정 지도(CJM) 기반의 터치포인트 설계',
    'ax401.w2_detail': '• ChatGPT, Midjourney 등을 활용한 멀티 레이아웃 이미지 및 카피 자동 생성<br>• 브랜드 가이드라인과 톤앤매너를 유지하는 시스템 프롬프트 작성<br>• 배너 광고, 소셜 콘텐츠 대량 제작 파이프라인 구축',
    'ax401.w3_detail': '• n8n 노코드 워크플로우 엔진 기반의 자동화 파이프라인 설계<br>• 고객 행동(회원가입, 장바구니 방치, 첫 결제 등) 발생 시 Dify 에이전트를 통한 맞춤형 메시지 자동 생성<br>• 알림톡, 이메일, 슬랙 연동 발송 자동화',
    'ax401.w4_detail': '• CRM 마케팅 유입 성과 데이터 및 사용자 행동 로그 수집<br>• GA4(Google Analytics) 및 내부 데이터베이스 연동 성과 시각화<br>• AI 분석을 활용한 발송 시간 및 메시지 카피 A/B 테스트 최적화 루틴 수립',

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
    'curriculum.heading': 'For Job Seekers & Junior PMs.\nHands-on AI Service Planning Curriculum.',
    'curriculum.sub':     'CareAX\'s job-aligned AI workshops built around practical projects to help non-developer planners, PMs, and job seekers thrive in the real-world industry.',

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
    'ax101.title': 'AI Service Planning &\nReverse Engineering w/ Dify',
    'ax101.desc':  'A hands-on masterclass for job seekers and non-developer PMs. Analyze successful AI products and reverse-engineer them using Dify and No-Code RAG tools.',
    'ax101.w1':    'AI Service Planning Process & Dify-Based Reverse Engineering of Top AI Services',
    'ax101.w2':    'No-Code RAG Data Preprocessing & Knowledge Base Design',
    'ax101.w3':    'Prompt Pipeline & LLM Workflow Implementation using Dify / Flowise',
    'ax101.w4':    'AI Service Prototyping Launch & Portfolio Coaching',

    /* AX 201 */
    'ax201.title': 'Design System w/ Figma &\nAI Automation Practice',
    'ax201.desc':  'Define design tokens and automate design-to-code workflows using Figma and AI (Claude Code, Figma MCP) to ensure product consistency and speed.',
    'ax201.w1':    'Brand Design Guide Specification & Figma Design System Basics',
    'ax201.w2':    'Defining Design Tokens using Figma MCP & AI',
    'ax201.w3':    'Front-end Code Automation Sync using Claude Code',
    'ax201.w4':    'Design System Validation & Practical Collaboration Automation',

    /* AX 301 */
    'ax301.title': 'AICC Planning &\nLLM Agent Implementation',
    'ax301.desc':  'A comprehensive guide to building AI Contact Center (AICC) solutions. Plan RAG knowledge bases, define multi-turn scenarios, and deploy live AICC agents via API integrations.',
    'ax301.w1':    'AICC Business Models & LLM Scenario Specification',
    'ax301.w2':    'RAG Knowledge Base Building & Prompt Engineering Guidelines',
    'ax301.w3':    'Multi-turn Dialog Workflows & LLM Agent Creation via Dify',
    'ax301.w4':    'Web Publishing Integration, AICC Service Launch & Evaluation',

    /* AX 401 */
    'ax401.title': 'Generative AI Marketing &\nCRM Automation Camp',
    'ax401.desc':  'Design automated marketing pipelines for marketers and PMs. Automate content generation and CRM workflows using n8n and Dify to maximize user retention.',
    'ax401.w1':    'MarTech Ecosystem & Defining AI-Driven Marketing Personas',
    'ax401.w2':    'High-Conversion Ad Copy & Visual Asset Production using ChatGPT & Midjourney',
    'ax401.w3':    'CRM Marketing Automation Triggers & Workflow Design via n8n / Dify',
    'ax401.w4':    'CRM Data Analysis, Marketing Campaigns KPI (GA4) Analysis & Optimization',

    /* Course Detail Pages Common */
    'nav.backToHome': 'Home',
    'course.audience': 'Target Audience',
    'course.objectives': 'Course Objectives',
    'course.projects': 'Hands-on Project Outcomes',
    'course.curriculum': 'Weekly Syllabus',
    'course.instructor': 'About the Instructor',
    'course.enrollCTA': 'Enroll Now',
    'course.backCTA': 'Back to Curriculum',
    'course.weeks': 'Week',
    'course.hours': 'Hours',
    
    /* Course Detail Pages AX 101 */
    'ax101.audience': 'Non-developer planners/PMs, IT job seekers, and anyone looking to showcase practical AI planning in their portfolio.',
    'ax101.objectives': 'Analyze and rebuild successful AI services using Dify<br>• Master document parsing and RAG knowledge base design<br>• Write professional-grade AI product specifications and deploy live prototypes.',
    'ax101.projects': 'Reverse-engineered AI service prototype built on Dify + Professional AI product specification and a live personal portfolio website.',
    'ax101.w1_detail': '• AI Service Planning Process Overview<br>• Latest LLM Tech Trends & Role of Product Managers<br>• Case Study: Reverse Engineering top AI services & tracing data flows',
    'ax101.w2_detail': '• Document parsing & processing for various formats (PDF, Word, Web)<br>• Vector store embedding optimizations to minimize hallucination<br>• Designing custom RAG (Retrieval-Augmented Generation) knowledge bases',
    'ax101.w3_detail': '• Designing no-code prompt pipelines using Dify and Flowise<br>• Workflow optimizations via conditional branching and API nodes<br>• Refining multi-turn dialogue scenarios & System Prompts',
    'ax101.w4_detail': '• Implementing front-end UI layouts and deploying online<br>• Completing a fully functional AI service portfolio piece<br>• 1:1 project critique and feedback from a senior PM',

    /* Course Detail Pages AX 201 */
    'ax201.audience': 'Product designers, UI/UX planners, and PMs who want to revolutionize collaboration speed with engineering teams.',
    'ax201.objectives': 'Establish industry-standard Figma components and Design Tokens<br>• Implement code automation using Claude Code and Figma MCP<br>• Build a sync workflow where design changes update the codebase instantly.',
    'ax201.projects': 'Figma Design System library for production + Auto-generated front-end component files synced via Claude Code.',
    'ax201.w1_detail': '• Setting up consistent brand design guidelines<br>• Figma components structuring based on industry best practices<br>• Designing reusable layouts and responsive UI systems',
    'ax201.w2_detail': '• Defining Design Tokens schemas that AI can read and parse<br>• Setting up and connecting Figma MCP (Model Context Protocol)<br>• Exporting Figma designs into structured JSON data',
    'ax201.w3_detail': '• Connecting your code base to Claude Code AI agent<br>• Automating React/HTML/CSS component generation from design tokens<br>• Building style variables & stylesheet pipelines',
    'ax201.w4_detail': '• Verifying automatic sync when design variables update<br>• Optimizing complex styles like dark mode and multi-language support<br>• Completing collaboration workflows to eliminate communication overhead',

    /* Course Detail Pages AX 301 */
    'ax301.audience': 'Customer Experience (CX) managers, PMs, and product leaders looking to boost internal operations efficiency.',
    'ax301.objectives': 'Acquire skills to design multi-turn dialog scenarios for LLM agents<br>• Build custom RAG pipelines to search company documentation without hallucination<br>• Connect live APIs to retrieve and update user data dynamically.',
    'ax301.projects': 'A live Dify-based AICC agent web service equipped with real-time database queries and document search.',
    'ax301.w1_detail': '• AICC business models, values, and system architecture<br>• UX dialog mapping for inbound/outbound callbots and chatbot services<br>• Analyzing customer dialog logs and dataset structures',
    'ax301.w2_detail': '• Custom RAG design utilizing internal knowledge bases<br>• Intent classification guidelines & prompt engineering specifications<br>• Hybrid search optimization and search reranking',
    'ax301.w3_detail': '• Multi-turn scenario design & Dify workflow component mapping<br>• Handling transactions like membership search and booking changes via API nodes<br>• External chatbot API specification design',
    'ax301.w4_detail': '• Front-end integration and launching the live AICC agent web service<br>• Continuous evaluation and prompt tuning based on user chat logs<br>• AICC security and privacy compliance guidelines for production',

    /* Course Detail Pages AX 401 */
    'ax401.audience': 'Growth planners, data-driven marketers, and PMs who want to build solo marketing automation pipelines using AI.',
    'ax401.objectives': 'Establish automated bulk ad content production preserving brand tone<br>• Design behavior-triggered CRM messaging pipelines using n8n and Dify<br>• Track acquisition to retention metrics (GA4) and visualize performance.',
    'ax401.projects': 'An automated CRM marketing workflow triggered by customer behaviors built on n8n & Dify + Automated KPI analysis system.',
    'ax401.w1_detail': '• Introduction to MarTech ecosystems and CRM data integration concepts<br>• Defining AI-driven marketing personas & audience segmentations<br>• Customer Journey Map (CJM) touchpoint analysis and planning',
    'ax401.w2_detail': '• Bulk generating ad copy and visual variations using ChatGPT & Midjourney<br>• Creating system prompts that protect brand voice and styles<br>• Setting up image/copy generation automation flow',
    'ax401.w3_detail': '• Building automation loops in n8n workflow engine<br>• Dynamic copy generation via Dify when actions occur (signups, cart abandons, etc.)<br>• Automatic distribution to Kakao, Email, and Slack channels',
    'ax401.w4_detail': '• Gathering CRM marketing performance data and user interaction logs<br>• GA4 & database sync for real-time visualization dashboards<br>• Running A/B test optimization routines for delivery timing and copy using AI',

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
