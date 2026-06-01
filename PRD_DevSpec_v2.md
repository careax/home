명령어: 프로젝트 최상위 루트 폴더에 'PRD_v2.0.md' 파일을 생성하고, 아래의 1번부터 7번까지의 본문 내용을 단 한 글자도 누락하지 말고 통째로 작성(Write)해라. 파일 생성이 완료되면 명세서 전체를 분석하여 'RanaLee_Profile.jpg' 이미지를 포함한 1단계 UI 이주 계획부터 나에게 보고해라.

# [PRD] CareAX Instructor Profile Site · PRD v2.0

## 🚨 Antigravity IDE 핵심 지침 (디자인 카피 & 환경 고정)
1. **디자인 및 에셋 타겟:** `https://github.com/careax/careax-home`
   - 이 레포의 오리지널 디자인(블랙/다크 톤 배경, 여백, 폰트 스타일, 우측 배후의 거대 'A' 타이포그래피 그래픽)을 100% 그대로 복제할 것.
   - **프로필 이미지 적용 규칙:** 기존에 누락되거나 잘못 나왔던 레이아웃은 전면 폐기한다. 제공된 배경 투명 프로필 에셋인 `RanaLee_Profile.jpg`를 원본 과거 사이트의 시각적 연출 그대로 `#hero` 섹션에 완벽하게 매칭하여 배치할 것. 폰트와의 여백 및 레이아웃 픽셀을 엄수하라.
2. **작업 및 배포 레포:** `https://github.com/careax/home`
   - Vercel, GitHub Actions, Supabase DB 백엔드 세팅은 이 레포의 프로덕션 구성을 그대로 유지하며 빌드 오류가 없도록 안정적으로 변경 관리를 수행할 것.

---

## 1. Overview
- **서비스명:** 개인 강사 브랜드 CareAX (이라나 · Rana Lee) 공식 프로필 및 수강신청 사이트
- **목적:** AX(AI × UX) 워크숍 커리큘럼 소개, 글로벌 기업·대학 **문의하기(Inquiry)** 및 **수강신청(Registration)** 접수.
- **아키텍처:** Vanilla HTML / CSS / JS + Supabase 클라우드 DB + Vercel 배포/서버리스 환경.

---

## 2. Pages & Sections (단일 페이지 스크롤)

| 섹션 ID | 기능 및 설명 | 다국어(i18n) 적용 |
| :--- | :--- | :--- |
| `#hero` | 강사 소개, 프로필 이미지 (`RanaLee_Profile.jpg` 정교한 배치), 티커 배너 | KO / EN 지원 |
| `#about` | IBM / Hyundai AutoEver 경력, 강의 철학, 통계 스크롤 수치 | KO / EN 지원 |
| `#curriculum` | 4개 코스 카드 + 필터 탭 (각 카드 하단에 **[수강신청하기]** 버튼 추가) | KO / EN 지원 |
| `#method` | 4단계 참여형 실무 강의 사이클 소개 | KO / EN 지원 |
| `#voices` | 글로벌 코호트 수강생 생생한 후기 슬라이드/그리드 | KO / EN 지원 |
| `#register` | **[NEW]** 수강신청 폼 (코스 선택, 신청자 정보 입력 및 DB 적재) | KO / EN 지원 |
| `#contact` | 문의 폼 (기업/기관 문의 접수, DB 적재 + 담당자 메일 알림) | KO / EN 지원 |

---

## 3. File Structure (`careax/home` 레포 기준)

```text
home/
├── index.html                    # 메인 DOM (data-i18n 다국어 속성 포함)
├── css/
│   └── style.css                 # careax-home의 오리지널 디자인 CSS 복제본 (임의 수정 절대 금지)
├── js/
│   ├── main.js                   # UI 인터랙션 및 애니메이션
│   ├── i18n.js                   # KO/EN 다국어 딕셔너리 및 토글 제어
│   ├── version-viewer.js         # 버전 배지 및 업데이트 로그 모달
│   └── db-handler.js             # Supabase DB 연동 (Contact & Register)
├── api/
│   ├── inquire.js                # Vercel Serverless: 이메일 알림 발송용 (Nodemailer)
│   └── register.js               # Vercel Serverless: 수강신청 확인 메일 발송용
├── public/
│   └── assets/
│       └── RanaLee_Profile.jpg   # 원본 스타일 적용을 위한 필수 프로필 이미지 자원
├── .env.example                  # 수파베이스 및 메일 환경변수 샘플
├── CHANGELOG.md
└── README.md