# CareAX — Instructor Profile Site · PRD v1.0

> **Live URL:** `https://careax.github.io/home/`  
> **Repository:** `careax/home`  
> **Stack:** Vanilla HTML / CSS / JS · Neon DB · GitHub Pages

---

## 1. Overview

개인 강사 브랜드 **CareAX (이라나 · Rana Lee)** 의 공식 프로필 사이트.  
IBM / Hyundai AutoEver 출신 Senior PM의 AX(AI × UX) 워크숍 커리큘럼을 소개하고 기업·대학 문의를 받는 단일 페이지 애플리케이션입니다.

---

## 2. Pages & Sections

| 섹션 | Anchor | 설명 |
|------|--------|------|
| Hero | `#hero` | 강사 소개, 프로필 이미지, 티커 |
| About | `#about` | 경력, 강의 철학, 통계 스크롤 |
| Curriculum | `#curriculum` | 4개 코스 카드 + 필터 탭 |
| Method | `#method` | 4단계 학습 사이클 |
| Voices | `#voices` | 코호트 후기 |
| Contact | `#contact` | 문의 폼 (DB 적재 + 이메일 발송) |

---

## 3. File Structure

```
home/
├── index.html                    # 메인 DOM (data-i18n 속성)
├── css/
│   └── style.css                 # 전체 스타일 (CSS custom properties)
├── js/
│   ├── main.js                   # UI 인터랙션, 페이드인 애니메이션
│   ├── i18n.js                   # KO/EN 다국어 딕셔너리 & 토글
│   ├── version-viewer.js         # 버전 배지 → 모달
│   └── db-handler.js             # Contact 폼 전송
├── api/
│   └── inquire.js                # Serverless: Neon DB + 이메일
├── public/
│   └── assets/
│       └── rana-profile-cutout.png
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages 자동 배포
├── .gitignore
├── .env.example                  # 환경 변수 가이드
├── CHANGELOG.md
└── README.md
```

---

## 4. Key Specs

| 항목 | 값 |
|------|-----|
| 브라우저 타이틀 | `CareAX \| Senior PM & AI Technology Instructor` |
| 로고 | CareAX (SVG 다이아몬드 1개) |
| Hero Role 1 | Senior PM |
| Hero Role 2 | UX/UI 기획 · AI Technology Team |
| Hero 이미지 | `public/assets/rana-profile-cutout.png` |
| Method Heading | 일방향 강의 X. / 참여형 실무 강의 O. |
| 언어 토글 | KO ↔ EN (localStorage 저장) |
| 버전 배지 | 우측 하단 반투명 `v1.0.0` |
| 문의 알림 수신 | `careax.rana@gmail.com` |

---

## 5. 환경 변수 설정

`.env.example` 을 복사해 `.env` 로 저장합니다.  
(`.env` 는 `.gitignore` 에 포함 — 절대 커밋하지 마세요)

```env
DATABASE_URL=postgresql://neondb_owner:[YOUR_PASSWORD]@ep-billowing-boat-aozwh69o.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=careax.rana@gmail.com
SMTP_PASS=[YOUR_APP_PASSWORD]
NOTIFY_EMAIL=careax.rana@gmail.com
```

### Neon DB 연결

1. [Neon Console](https://console.neon.tech) → 프로젝트 생성
2. Connection Details → **Connection string** 복사
3. 위 `DATABASE_URL` 에 붙여넣기 (`[YOUR_PASSWORD]` 부분 실제 비밀번호로 교체)

`api/inquire.js` 가 최초 실행 시 `inquiries` 테이블을 자동 생성합니다.

---

## 6. GitHub Pages 배포

### 최초 설정 (1회만)

1. GitHub → `careax/home` 리포지토리 → **Settings → Pages**
2. Source: **GitHub Actions** 선택
3. 환경 변수는 **Settings → Secrets and variables → Actions** 에 등록  
   (정적 사이트이므로 `api/inquire.js` 는 Vercel 등 별도 배포 필요)

### 자동 배포

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동 실행되어  
`https://careax.github.io/home/` 에 배포됩니다.

---

## 7. Contact Form 흐름

```
브라우저 (db-handler.js)
  └─ POST /api/inquire  { name, email, org, message }
        ├─ Neon DB INSERT → inquiries 테이블
        └─ Nodemailer → careax.rana@gmail.com 이메일 발송
```

> **Note:** GitHub Pages는 서버리스 함수를 지원하지 않습니다.  
> `api/inquire.js` 는 **Vercel** 또는 **Netlify Functions** 에 별도 배포하거나,  
> GitHub Pages 도메인과 동일한 커스텀 도메인의 서버에서 호스팅해야 합니다.

---

## 8. Multilingual (i18n)

- `js/i18n.js` 에 KO/EN 딕셔너리 내장
- HTML 요소에 `data-i18n="key"` 속성으로 바인딩
- 네비게이션 `KO | EN` 버튼 클릭 시 즉시 전환
- 선택 언어는 `localStorage('careax_lang')` 에 저장 → 재방문 시 유지

---

## 9. Version Badge

- 우측 하단 반투명 `v1.0.0` 배지
- 클릭 시 모달 팝업: 현재 버전 · commit hash · changelog
- `js/version-viewer.js` 의 `VERSION_INFO` 객체를 수정해 업데이트

---

© 2026 CareAX · Rana Lee · 이라나
