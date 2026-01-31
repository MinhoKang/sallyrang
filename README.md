# 샐리랑 (Sallyrang)

Notion을 CMS로 활용하여 PT 코치가 관리하는 운동 기록을 회원이 전용 링크를 통해 모바일 웹에서 편하게 열람하는 서비스

## 🎯 프로젝트 개요

**목적:** 코치는 Notion에서 작성만, 회원은 링크 클릭 한 번으로 운동 기록 확인

**범위:**
- 코치: 별도의 관리자 페이지 없이 Notion 앱만으로 모든 데이터 관리
- 회원: 복잡한 가입/로그인/검색 없이, 카카오톡으로 받은 링크로 바로 열람

**사용자:**
- 코치 (Service Provider): PT 수업 진행 및 Notion에서 기록 관리
- 회원 (End User): 모바일 중심, 링크 클릭만으로 간편 접근

## 📱 주요 페이지

### 1. 회원 전용 대시보드 (`/members/[id]`)
- **프로필 영역**: 회원명, D-Day 배지, 기본 정보 그리드 (나이/경력/장소/상태)
- **수업 리스트**: 과거~현재 수업 기록 카드 리스트
- **TOSS UI 스타일**: 크고 굵은 타이포그래피, 불필요한 선 최소화

### 2. 수업 상세 페이지 (`/members/[id]/sessions/[sessionId]`)
- **헤더**: 뒤로가기 버튼, 수업 날짜
- **콘텐츠**: Notion 블록 렌더링 (텍스트, 제목, 이미지)

## ⚡ 핵심 기능

- **F01: Notion API 연동** - Members DB와 Sessions DB 실시간 조회, ISR 캐싱
- **F02: UUID 기반 보안** - URL의 ID를 보안 키로 사용 (128bit 랜덤값)
- **F03: 회원 대시보드** - 프로필 정보, D-Day 계산, 수업 리스트
- **F04: 수업 상세 뷰** - Notion 블록 렌더링, 뒤로가기 네비게이션
- **F05: TOSS UI 스타일** - 일관된 여백, 강조된 타이포그래피, 다크 모드 지원

## 🛠️ 기술 스택

- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript (strict mode)
- **Compiler**: React Compiler (실험적 기능 아님)
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (new-york 스타일, Radix UI 기반)
- **CMS**: Notion API (`@notionhq/client`)
- **Icons**: Lucide React
- **Form**: react-hook-form + zod
- **Notifications**: Sonner
- **Theme**: next-themes
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일 생성 후 Notion API 키와 Database ID 추가:

```bash
# .env.local.example 파일을 참고하여 작성
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_MEMBERS_DB_ID=xxxxxxxxxxxxx
NOTION_SESSIONS_DB_ID=xxxxxxxxxxxxx
```

**Notion API Key 발급 방법:**
1. [Notion Developers](https://www.notion.so/my-integrations) 접속
2. 새로운 Internal Integration 생성
3. API Key 복사
4. Members DB와 Sessions DB를 Integration에 연결

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 4. 빌드

```bash
npm run build
npm start
```

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정
- ✅ React Compiler 활성화
- ✅ Notion API SDK 설치
- ✅ 환경 변수 템플릿 생성
- ✅ 라우트 구조 생성 (`/members/[id]`, `/members/[id]/sessions/[sessionId]`)
- ✅ 로딩 및 에러 바운더리 구현
- 🔄 Notion API 연동 구현 중 (`lib/notion.ts`)
- ⏳ Notion 블록 렌더링 컴포넌트 구현 예정
- ⏳ 도메인 컴포넌트 구현 예정 (`components/domain/`)

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항 및 기능 명세
- [개발 가이드](./CLAUDE.md) - 개발자를 위한 프로젝트 지침

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 홈 페이지
│   └── members/
│       └── [id]/
│           ├── page.tsx            # 회원 대시보드 (Server Component)
│           ├── loading.tsx         # 로딩 상태
│           ├── error.tsx           # 에러 바운더리
│           └── sessions/
│               └── [sessionId]/
│                   ├── page.tsx    # 수업 상세 (Server Component)
│                   ├── loading.tsx # 로딩 상태
│                   └── error.tsx   # 에러 바운더리
├── components/
│   ├── ui/                         # shadcn/ui 컴포넌트
│   └── domain/                     # 비즈니스 로직 컴포넌트 (예정)
├── lib/
│   ├── notion.ts                   # Notion API 설정 및 함수
│   ├── formatters.ts               # 날짜 포맷팅, D-Day 계산
│   └── utils.ts                    # cn() 유틸리티
└── styles/
    └── globals.css                 # 전역 스타일
```

## 🎨 디자인 원칙

### TOSS UI 스타일
- **타이포그래피**: 큰 헤딩 (24px+), 중요 정보 강조
- **여백**: 8px 배수 원칙
- **색상**: Tailwind 기본 팔레트, 다크 모드 지원
- **모서리**: rounded-lg 이상 (8px+)
- **아이콘**: Lucide React 일관성 유지

### 모바일 최우선
- 터치 친화적 버튼 (최소 44px)
- 반응형 레이아웃
- 모바일 화면에서 핵심 정보 우선 표시

## 📝 개발 규칙

- **주석 언어**: 모든 코드 주석은 한국어로 작성
- **Server Components 우선**: 데이터 페칭은 서버에서 처리
- **Client Components 최소화**: 인터랙티브 UI만 `'use client'` 사용
- **TypeScript strict 모드**: 타입 안정성 보장

## 🔐 보안

- **UUID 기반 접근 제어**: 128bit 랜덤 UUID로 타인 접근 차단
- **검색 엔진 크롤링 차단**: `robots: 'noindex, nofollow'`
- **HTTPS**: Vercel에서 자동 적용
- **환경 변수**: Notion API Key는 서버에서만 사용

## 📄 라이선스

MIT License

---

**문서 최종 업데이트:** 2025.01.31
**버전:** 1.0 (MVP)
