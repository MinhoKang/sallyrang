# 샐리랑 (Sallyrang) 개발 로드맵

Notion을 CMS로 활용하여 PT 코치가 관리하는 운동 기록을 회원이 전용 링크를 통해 모바일 웹에서 편하게 열람하는 서비스

## 개요

샐리랑은 PT 코치와 회원을 위한 운동 기록 열람 서비스로 다음 핵심 가치를 제공합니다:

- **Notion CMS 연동**: 코치가 Notion에서 작성만 하면 자동으로 웹사이트에 반영
- **링크 기반 접근**: 회원이 복잡한 가입 없이 링크 클릭 한 번으로 운동 기록 열람
- **모바일 최적화**: TOSS UI 스타일 기반의 깔끔하고 직관적인 모바일 사용자 경험

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조
- 새 작업 문서에는 빈 박스와 변경 사항 요약이 없어야 함

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 완료로 표시

---

## MVP 개발 단계

### Phase 1: 환경 설정 및 애플리케이션 골격 구축 (1-2일) ✅ 완료

- [x] **Task 001: 개발 환경 설정** ✅
  - See: `/tasks/001-dev-environment.md`
  - React Compiler 활성화 (`next.config.ts`에 `experimental.reactCompiler: true` 추가)
  - `@notionhq/client` 설치 및 확인
  - Notion API Key 발급 및 `.env.local` 설정
  - TypeScript strict 모드 확인
  - Tailwind CSS & shadcn/ui 초기 세팅 확인

- [x] **Task 002: 타입 정의 및 인터페이스 설계** ✅
  - See: `/tasks/002-type-definitions.md`
  - Notion API 응답 타입 정의 (`src/types/notion.ts`)
  - 회원(Member) 및 수업(Session) 도메인 타입 정의 (`src/types/domain.ts`)
  - API 함수 반환 타입 정의
  - 모든 타입에 JSDoc 주석 작성 완료

- [x] **Task 003: 프로젝트 라우트 구조 완성** ✅
  - See: Plan at `~/.claude/plans/velvety-tinkering-falcon.md`
  - next-themes 통합 완료 (ThemeProvider, ThemeToggle)
  - Not Found (404) 페이지 구현 완료
  - 다크/라이트 모드 전환 기능 정상 작동
  - 모든 페이지 라우트 골격 완성

### Phase 2: UI/UX 완성 - 더미 데이터 활용 (2-3일) 🔄 진행 예정

- [ ] **Task 004: 공통 컴포넌트 라이브러리 구현** ⭐ 우선순위
  - 필수 shadcn/ui 컴포넌트 확인 (Button, Card, Badge, Separator 등)
  - 추가 필요 컴포넌트 설치 (Avatar, Skeleton 등)
  - 더미 데이터 생성 유틸리티 작성 (`src/lib/mock-data.ts`)

- [ ] **Task 005: 도메인 컴포넌트 구현**
  - `MemberProfileCard`: 회원 정보 표시 컴포넌트
  - `SessionHistoryList`: 수업 리스트 표시 컴포넌트
  - `SessionHistoryItem`: 개별 수업 카드 컴포넌트
  - `SessionDetailHeader`: 수업 상세 헤더 컴포넌트

- [ ] **Task 006: 회원 대시보드 UI 완성**
  - 프로필 영역 UI 구현 (이름, D-Day 배지, 기본 정보 그리드)
  - 수업 리스트 영역 UI 구현
  - TOSS UI 스타일 적용 (타이포그래피, 여백, 색상)
  - 반응형 레이아웃 구현

- [ ] **Task 007: 수업 상세 페이지 UI 완성**
  - 헤더 UI 구현 (뒤로가기, 날짜 표시)
  - 수업 콘텐츠 영역 UI 구현
  - Notion 블록 렌더러 UI 골격 구현 (`NotionBlockRenderer`)
  - 모바일 최적화 및 반응형 디자인

### Phase 3: 핵심 기능 구현 (3-4일) ⏳ 대기

- [ ] **Task 008: Notion API 연동 - 회원 정보**
  - `getMember()` 함수 구현
  - Notion 응답 파싱 및 도메인 객체 변환
  - 에러 핸들링 및 예외 처리
  - ISR 캐싱 설정 (revalidate)
  - Playwright MCP를 활용한 API 통합 테스트

- [ ] **Task 009: Notion API 연동 - 수업 목록**
  - `getSessions()` 함수 구현
  - 회원 ID 기반 수업 필터링
  - 날짜 기준 정렬 (최신순/과거순)
  - Playwright MCP를 활용한 API 통합 테스트

- [ ] **Task 010: Notion API 연동 - 수업 상세**
  - `getSession()` 함수 구현
  - Notion 블록 조회 및 파싱
  - 블록 데이터 변환 로직 구현
  - Playwright MCP를 활용한 API 통합 테스트

- [ ] **Task 011: Notion 블록 렌더러 구현**
  - Paragraph 블록 렌더링
  - Heading (H1, H2, H3) 블록 렌더링
  - Image 블록 렌더링 (Next.js Image 컴포넌트)
  - Rich Text 스타일 처리 (Bold, Italic, Link 등)

- [ ] **Task 012: 데이터 연동 통합**
  - 회원 대시보드 페이지에 실제 데이터 연동
  - 수업 상세 페이지에 실제 데이터 연동
  - 더미 데이터 코드 제거
  - 전체 사용자 플로우 E2E 테스트 (Playwright MCP)

### Phase 4: 통합, 테스트 및 배포 (2-3일) ⏳ 대기

- [ ] **Task 013: 에러 처리 및 로딩 상태 완성**
  - `error.tsx` 컴포넌트 스타일링
  - `loading.tsx` 컴포넌트 스타일링 (Skeleton UI)
  - 404 Not Found 페이지 구현
  - 에러 바운더리 테스트

- [ ] **Task 014: SEO 및 메타데이터 설정**
  - `generateMetadata` 함수 구현 (동적 메타데이터)
  - robots 메타 태그 설정 (noindex, nofollow)
  - Open Graph 메타데이터 설정

- [ ] **Task 015: 성능 최적화**
  - 이미지 최적화 (Next.js Image 컴포넌트)
  - ISR 캐싱 전략 최종 검토
  - Lighthouse 성능 측정 및 개선

- [ ] **Task 016: Vercel 배포**
  - 환경 변수 설정 (Vercel Dashboard)
  - 프로덕션 배포
  - 프로덕션 환경 테스트
  - 모바일 디바이스 실제 테스트

---

## 향후 확장 기능

### Phase 2 확장: MVP 후속 기능 ⏳ 대기

- [ ] **Task E01: 다크 모드 완전 지원**
  - next-themes 기반 테마 시스템 구현
  - 다크 모드 색상 팔레트 정의
  - 시스템 설정 자동 감지

- [ ] **Task E02: 추가 Notion 블록 지원**
  - 리스트 블록 (Bulleted, Numbered)
  - 토글 블록 (접기/펼치기)
  - Callout 블록
  - 코드 블록

- [ ] **Task E03: 검색 기능 구현**
  - 날짜 기반 검색
  - 제목 기반 검색
  - 검색 결과 UI 구현

- [ ] **Task E04: 이미지 갤러리 뷰**
  - 수업 이미지 갤러리 컴포넌트
  - 이미지 확대 모달
  - 슬라이드 네비게이션

### Phase 3 확장: 코치 기능 확대 ⏳ 대기

- [ ] **Task E05: 간단한 관리자 대시보드**
  - 코치 인증 시스템
  - 회원 목록 조회
  - 회원별 진행 상황 대시보드

- [ ] **Task E06: 회원 초대 시스템**
  - 초대 링크 생성
  - 링크 만료 기능
  - 초대 현황 관리

- [ ] **Task E07: 수업 예약 기능**
  - 예약 캘린더 UI
  - 예약 상태 관리
  - 알림 기능

### Phase 4 확장: 서비스 확장 ⏳ 대기

- [ ] **Task E08: 모바일 앱 (React Native)**
  - React Native 프로젝트 설정
  - 핵심 화면 구현
  - 푸시 알림 연동

- [ ] **Task E09: 푸시 알림**
  - 새 수업 기록 알림
  - 알림 구독 관리
  - 웹 푸시 구현

- [ ] **Task E10: 댓글/피드백 시스템**
  - 수업별 댓글 기능
  - 코치-회원 소통 채널
  - 알림 연동

- [ ] **Task E11: 결제/구독 모델**
  - 결제 시스템 연동
  - 구독 플랜 관리
  - 프리미엄 기능 분리

---

## 기술 스택 요약

| 분류 | 기술 |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, shadcn/ui (new-york 스타일) |
| **CMS** | Notion API (`@notionhq/client`) |
| **Icons** | Lucide React |
| **Toast** | Sonner |
| **Deployment** | Vercel |

---

## 예상 일정

| Phase | 기간 | 상태 |
| :--- | :--- | :--- |
| Phase 1: 환경 설정 | 1-2일 | ✅ 완료 (3/3 완료) |
| Phase 2: UI/UX 완성 | 2-3일 | 🔄 진행 예정 |
| Phase 3: 핵심 기능 | 3-4일 | ⏳ 대기 |
| Phase 4: 통합/배포 | 2-3일 | ⏳ 대기 |
| **총 예상 기간** | **10-14일** | - |

---

## 성공 지표

| 지표 | 목표값 | 측정 방법 |
| :--- | :--- | :--- |
| **모바일 UX** | 스크롤 없이 핵심 정보 확인 가능 | 화면 높이 내 주요 정보 배치 |
| **블록 렌더링** | 90% 이상의 Notion 블록 정상 표시 | 실제 데이터 테스트 |
| **링크 생성 시간** | 코치가 5분 내 링크 생성 가능 | 사용자 테스트 |
| **기록 확인 시간** | 회원이 3초 내 기록 확인 가능 | 페이지 로딩 시간 측정 |

---

**문서 작성일:** 2025.01.31
**최종 업데이트:** 2026.02.01
**PRD 버전:** 1.0 (MVP)
**로드맵 상태:** Phase 1 완료, Phase 2 진행 예정
