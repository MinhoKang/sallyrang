# 샐리랑 (Sallyrang) - Product Requirements Document

## 1. 프로젝트 개요

**프로젝트명:** 샐리랑 (Sallyrang)

**한 줄 설명:** Notion을 CMS로 활용하여 PT 코치가 관리하는 운동 기록을 회원이 전용 링크를 통해 모바일 웹에서 편하게 열람하는 서비스

**목표:**

- 코치: 별도의 관리자 페이지 없이 Notion 앱만으로 모든 데이터 관리
- 회원: 복잡한 가입/로그인/검색 없이, 링크 클릭 한 번으로 본인의 운동 기록 열람

---

## 2. 타겟 사용자

### 코치 (Service Provider)

- **역할:** PT 운동 수업을 진행하고 회원의 운동 기록 작성 관리
- **주요 행동:** Notion 데이터베이스에서 회원 정보 및 수업 기록 직접 작성/편집
- **기술 수준:** Notion 앱 사용 가능한 수준 (별도의 개발 지식 불필요)

### 회원 (End User)

- **연령대:** 다양한 연령대 (특정 연령 제한 없음)
- **장치:** 주로 모바일(스마트폰) 접근
- **특징:** 복잡한 절차 없이 카카오톡 등으로 받은 링크를 클릭하여 바로 열람 가능해야 함
- **행동:** 링크 클릭 → 자신의 대시보드 확인 → 수업 기록 상세 확인

---

## 3. 사용자 시나리오

### 기본 플로우

1. **기록 작성 (코치)**
   - 코치가 Notion의 Members DB에서 회원 정보 작성/관리
   - 코치가 Sessions DB에서 수업 기록 작성 (제목, 날짜, 루틴, 피드백, 사진 등)

2. **링크 생성 및 공유 (코치)**
   - 코치가 Notion의 회원 Page ID가 포함된 웹사이트 링크 복사
   - 예: `sallyrang.com/members/[uuid]`
   - 링크를 카카오톡, 이메일 등으로 회원에게 전송

3. **열람 (회원)**
   - 회원이 수신한 링크 클릭
   - 회원 전용 대시보드 접속 (인증 없음)
   - 자신의 운동 기록 확인
   - 특정 수업 선택하여 상세 기록 조회

---

## 4. 주요 기능 명세

### 핵심 기능 (Must Have)

#### F01: Notion API 연동

- Notion API를 통해 Members DB와 Sessions DB 조회
- 실시간 데이터 반영
- Rate Limit 대응: ISR (Incremental Static Regeneration) 캐싱 적용

#### F02: UUID 기반 보안 접근 제어

- URL의 `id` (Notion 회원 UUID)를 보안 키로 사용
- 해당 ID를 모르는 타인은 접근 불가
- URL 직추측 어려움 (128bit 랜덤값 = 사실상 해킹 불가능)

#### F03: 회원 전용 대시보드 (`/members/[id]`)

**화면 구성:**

- **헤더:** 로고(샐리랑) 중앙 정렬
- **프로필 영역:**
  - "OOO님, 안녕하세요!" (큰 텍스트, 16pt 이상)
  - "운동 시작한 지 D+35일째" (강조된 배지)
  - 기본 정보 그리드: 나이 / 운동 경력 / 현재 상태 / 수업 장소
- **수업 리스트 영역:**
  - 섹션 타이틀: "내 운동 기록"
  - 과거부터 현재까지의 수업 기록 카드 리스트
  - 각 카드: [날짜] [수업 제목] [화살표 > 아이콘]
  - 클릭하면 상세 페이지로 이동

**디자인 원칙 (TOSS UI):**

- 크고 굵은 타이포그래피 (헤딩 강조)
- 불필요한 선과 테두리 최소화
- 중요한 정보(숫자, 날짜) 강조
- 모바일 중심 반응형 레이아웃

#### F04: 수업 상세 페이지 (`/members/[id]/sessions/[sessionId]`)

**화면 구성:**

- **헤더:**
  - 좌측: '뒤로가기' 버튼 (< 아이콘)
  - 중앙: 수업 날짜
  - 우측: 여백 (균형)
- **콘텐츠 영역:**
  - 수업 제목 (H1, 큰 텍스트)
  - Notion Block 렌더링 영역 (MVP):
    - 텍스트 (일반, 강조)
    - 제목 (H2, H3)
    - 이미지 (Next.js Image 컴포넌트로 최적화)

**지연 구현 (Phase 2):**

- 리스트 (순서 없음, 순서 있음)
- 토글 블록 (접기/펼치기)
- 코드 블록
- Callout

**기능:**

- 뒤로가기 버튼 클릭 → 회원 대시보드로 복귀
- 부드러운 페이지 전환

#### F05: TOSS UI 스타일 적용

- 여백: 일관된 간격 (8px 배수 원칙)
- 타이포그래피:
  - 제목(Heading): 500-700 weight, 24px 이상
  - 본문(Body): 400 weight, 16px
  - 캡션(Caption): 300-400 weight, 12-14px
- 색상: Tailwind CSS 기본 팔레트 (다크 모드 지원)
- 아이콘: Lucide React (일관된 스타일)
- 모서리: `rounded-lg` 또는 `rounded-xl` (최소 8px)

### 지원 기능 (Should Have)

#### F06: 날짜 포맷팅 및 D-Day 계산

- 날짜 포맷: `YYYY.MM.DD` (예: 2025.01.31)
- D-Day 계산: 등록일 기준 경과 일수 (D+35일째)
- 수업 날짜 자동 정렬 (최신순 또는 과거순)

#### F07: 모바일 최적화

- 반응형 레이아웃 (모든 화면 너비 대응)
- 터치 친화적 인터랙션 (버튼 최소 44px)

#### F08: 이미지 최적화

- Next.js Image 컴포넌트 사용
- 자동 최적화 (WebP 등)
- 프로그레시브 로딩

### 제외 기능 (Out of Scope - MVP 이후)

- 로그인/회원가입 (링크 기반 접근만 제공)
- 코치 관리자 페이지 (Notion에서만 관리)
- 수업 예약 기능
- 푸시 알림
- 검색 기능
- 댓글/피드백 시스템
- 결제/구독 기능
- 다국어 지원

---

## 5. 기술 스택

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Runtime:** React 19

### Compiler

- **React Compiler:** 정식 지원 (experimental 아님)
- 자동 최적화로 성능 향상

### CMS

- **Notion API:** `@notionhq/client`
- **Data Fetching:** ISR (Incremental Static Regeneration)

### Styling

- **CSS Framework:** Tailwind CSS v4 (새로운 CSS 엔진)
- **UI Components:** shadcn/ui (new-york 스타일, Radix UI 기반)
- **Icons:** Lucide React
- **Theme:** next-themes (다크/라이트 모드)

### Notifications

- **Toast:** Sonner

### Deployment

- **Host:** Vercel
- **Environment:** Next.js 16 권장 배포 환경

### Development Tools

- **Package Manager:** npm/yarn
- **Linting:** ESLint (프로젝트 설정 따름)
- **Form Handling:** react-hook-form + zod (필요시)
- **필수 설치:** `@notionhq/client` (Notion API SDK)

---

## 6. 아키텍처 및 설계 원칙

### 6.1 CDD (Component Driven Development)

**UI Components (`src/components/ui/`)**

- 디자인 시스템(shadcn/ui) 기반의 순수 UI 컴포넌트
- 예: Button, Card, Badge, Input, Textarea, Avatar 등
- 비즈니스 로직 없음, Props만으로 제어

**Domain Components (`src/components/domain/`)**

- 비즈니스 로직이 주입된 컴포넌트
- 예:
  - `MemberProfileCard`: 회원 정보 표시
  - `SessionHistoryList`: 수업 리스트 표시
  - `SessionDetailHeader`: 수업 상세 헤더
  - `NotionBlockRenderer`: Notion 블록 렌더링

### 6.2 SoC (Separation of Concerns) & Server Components

**Next.js App Router 기반 설계**

- **Server Components (기본)**: 데이터 페칭과 렌더링을 한 곳에서 처리
- **Client Components (필요시만)**: 인터랙티브 UI만 `'use client'` 사용

**Server Components 적용**

- `app/members/[id]/page.tsx`: 회원 정보 직접 fetch
  - Notion Members DB에서 회원 정보 조회
  - D-Day 계산
  - 수업 리스트 페칭

- `app/members/[id]/sessions/[sessionId]/page.tsx`: 수업 상세 정보 직접 fetch
  - Notion Sessions DB에서 특정 수업 조회
  - Notion 블록 파싱 및 렌더링
  - 메타데이터(제목, 날짜, 피드백) 처리

**Notion API 호출 패턴**

- 모든 Notion API 호출은 서버에서 async/await로 처리
- 클라이언트로 데이터 전달 전에 데이터 변환 완료
- Client Components: 상태 관리가 필요한 UI만 사용 (예: 모달, 토글)

### 6.3 공통 유틸리티 (Utils)

**`src/lib/utils.ts`**

- `cn()`: clsx + tailwind-merge 결합 (클래스명 병합)

**`src/lib/formatters.ts` (신규)**

- `formatDate(date)`: YYYY.MM.DD 형식
- `calculateDDay(startDate)`: D+N일째 계산
- `formatPhoneNumber(phone)`: 전화번호 하이픈 (필요시)

**`src/lib/notion.ts` (신규)**

- Notion Client 설정
- API 호출 함수들

### 6.4 파일 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (홈)
│   └── members/
│       └── [id]/
│           ├── page.tsx (대시보드 - Server Component)
│           ├── error.tsx (에러 바운더리)
│           ├── loading.tsx (로딩 상태)
│           └── sessions/
│               └── [sessionId]/
│                   ├── page.tsx (상세 - Server Component)
│                   ├── error.tsx (에러 바운더리)
│                   └── loading.tsx (로딩 상태)
├── components/
│   ├── ui/ (shadcn/ui 컴포넌트)
│   └── domain/ (비즈니스 컴포넌트)
│       ├── MemberProfileCard.tsx
│       ├── SessionHistoryList.tsx
│       ├── SessionDetailHeader.tsx
│       └── NotionBlockRenderer.tsx
├── lib/
│   ├── notion.ts (Notion API 설정)
│   ├── formatters.ts (포맷팅 함수)
│   └── utils.ts
└── styles/
    └── globals.css
```

### 6.5 문서화 및 주석 규칙

**언어:** 모든 코드 내 주석(Comment), 함수 설명(JSDoc), 커밋 메시지는 한국어로 작성

**주석 작성 범위:**

- 복잡한 비즈니스 로직 (D-Day 계산, 날짜 포맷팅 등)
- Notion 데이터 파싱 로직 (블록 렌더링 등)
- 성능 최적화 관련 코드

**예시:**

```typescript
/**
 * 등록일 기준 경과 일수 계산
 * @param startDate - 등록 날짜
 * @returns "D+35일째" 형식의 문자열
 */
function calculateDDay(startDate: Date): string {
  const today = new Date();
  const diff = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return `D+${diff}일째`;
}
```

---

## 7. Notion 데이터베이스 구조

### 7.1 Members DB (회원 정보)

| 필드명         | 타입     | 필수 | 설명                              |
| :------------- | :------- | :--- | :-------------------------------- |
| **Name**       | Title    | ✓    | 회원 이름                         |
| **Status**     | Select   | ✓    | 상태 (진행중, 홀딩, 종료)         |
| **StartDate**  | Date     | ✓    | 등록일 (D-Day 계산용)             |
| **Age**        | Number   | -    | 나이                              |
| **Gender**     | Select   | ✓    | 성별 (남/여)                      |
| **Experience** | Text     | -    | 운동 구력 (예: "2년 6개월")       |
| **Location**   | Select   | ✓    | 수업 장소 (예: "홈짐", "센터" 등) |
| **Sessions**   | Relation | ✓    | Sessions DB와 관계형 연결         |
| **Tuition**    | Number   | ✓    | 수업비                            |
| **ToalTuition**    | Number   | ✓    | 총 수업비    (Tuition * Sessions)                        |


### 7.2 Sessions DB (수업 기록)

| 필드명       | 타입     | 필수 | 설명                                           |
| :----------- | :------- | :--- | :--------------------------------------------- |
| **Sequence** | Number   | ✓    | 수업 회차 (예: 1, 2, 3...)                     |
| **Title**    | Title    | ✓    | 수업 회차명 (예: "250131 등운동", "상체 운동") |
| **Date**     | Date     | ✓    | 수업 날짜                                      |
| **Status**   | Select   | ✓    | 진행 여부 (예: 완료, 예정, 미완료)             |
| **Member**   | Relation | ✓    | Members DB와의 관계 (어느 회원의 수업인가)     |
| **Content**  | Text     | ✓    | (페이지 본문) 루틴 상세 설명                   |
| **Feedback** | Text     | ✓    | 피드백 및 평가                                 |
| **Note**     | Text     | -    | 비고 및 메모                                   |
| **Image**    | Files    | -    | 수업 사진 (여러 개 가능)                       |


**설명:**

- Members DB와 Sessions DB는 관계형 관계로 연결
- 한 회원은 여러 수업 기록을 가짐
- Notion 페이지의 Content, Feedback, Note는 일반 텍스트 또는 rich text (Notion에서 작성 시 블록 구조)

---

## 8. 화면 설계

### 8.1 회원 대시보드 (`/members/[id]`)

```
┌─────────────────────────┐
│        [로고]            │ ← Header (중앙 정렬)
└─────────────────────────┘

┌─────────────────────────┐
│  OOO님, 안녕하세요!      │ ← 큰 텍스트 (h2)
│                         │
│  [D+35일째] ← Badge     │
└─────────────────────────┘

┌─────────────────────────┐
│ 나이: 35  │ 경력: 2년  │
│ 장소: 홈짐 │ 상태: 진행 │
└─────────────────────────┘

┌─────────────────────────┐
│    내 운동 기록          │ ← 섹션 타이틀
├─────────────────────────┤
│ 25.01.31 | 등운동      > │
├─────────────────────────┤
│ 25.01.29 | 하체운동    > │
├─────────────────────────┤
│ 25.01.27 | 상체운동    > │
└─────────────────────────┘
```

### 8.2 수업 상세 (`/members/[id]/sessions/[sessionId]`)

```
┌─────────────────────────┐
│ <  |  2025.01.31  |     │ ← Header
└─────────────────────────┘

┌─────────────────────────┐
│   등운동 세션           │ ← 수업 제목 (h1)
│                         │
│ [Notion 블록 콘텐츠]    │
│ - 텍스트                │
│ - 리스트                │
│ - 이미지                │
│ - 피드백                │
└─────────────────────────┘
```

---

## 9. MVP 개발 단계

### Phase 1: 환경 설정 (1-2일)

- [ ] React Compiler 활성화 (`next.config.ts`에 `experimental.reactCompiler: true` 추가)
- [ ] `@notionhq/client` 설치 (`npm install @notionhq/client`)
- [ ] Notion API Key 발급 및 `.env.local` 설정:
  ```
  NOTION_API_KEY=secret_xxxxxxxxxxxxx
  NOTION_MEMBERS_DB_ID=xxxxxxxxxxxxx
  NOTION_SESSIONS_DB_ID=xxxxxxxxxxxxx
  ```
- [ ] Tailwind CSS & shadcn/ui 초기 세팅 (이미 설치됨)
- [ ] TypeScript strict 모드 확인

### Phase 2: 데이터 로직 구현 (3-4일)

- [ ] `lib/notion.ts`: Notion Client 설정 및 API 함수 작성
- [ ] `app/members/[id]/page.tsx`: 회원 정보 Server Component로 구현
  - 회원 정보 fetch
  - 수업 리스트 fetch 및 정렬
- [ ] `app/members/[id]/sessions/[sessionId]/page.tsx`: 수업 상세 Server Component로 구현
  - 수업 정보 fetch
  - Notion 블록 파싱
- [ ] `lib/formatters.ts`: 날짜 포맷팅, D-Day 계산
- [ ] `components/domain/NotionBlockRenderer.tsx`: Notion 블록 렌더링 컴포넌트

### Phase 3: UI 구현 (2-3일)

- [ ] 필수 shadcn/ui 컴포넌트 (Button, Card, Badge)
- [ ] Domain 컴포넌트 제작:
  - [ ] `MemberProfileCard`: 회원 정보 표시
  - [ ] `SessionHistoryList`: 수업 리스트 표시
  - [ ] `SessionDetailHeader`: 헤더(뒤로가기, 날짜)
- [ ] 레이아웃 및 TOSS 스타일 적용

### Phase 4: 통합, 테스트 및 배포 (2-3일)

- [ ] `error.tsx`, `loading.tsx` 구현 (에러 처리 및 로딩 상태)
- [ ] 페이지 간 네비게이션 확인
- [ ] 모바일 반응형 테스트
- [ ] SEO 메타 태그 설정 (generateMetadata 사용)
- [ ] Vercel 배포
- [ ] 프로덕션 환경 테스트

**총 소요 시간:** 10-14일

---

## 10. 성공 지표

| 지표            | 목표값                           | 측정 방법                   |
| :-------------- | :------------------------------- | :-------------------------- |
| **모바일 UX**   | 스크롤 없이 핵심 정보 확인 가능  | 화면 높이 내 주요 정보 배치 |
| **블록 렌더링** | 90% 이상의 Notion 블록 정상 표시 | 실제 데이터 테스트          |

---

## 11. 리스크 및 제약사항

### 11.1 기술적 리스크

| 리스크                         | 영향                     | 대응 방안                                                                       |
| :----------------------------- | :----------------------- | :------------------------------------------------------------------------------ |
| **Notion API Rate Limit**      | 요청 실패, 데이터 미반영 | ISR 캐싱으로 API 호출 최소화 (1시간 단위)                                       |
| **Notion Block 렌더링 복잡도** | 일부 블록 미지원         | MVP는 3가지 기본 타입만 지원 (Paragraph, Heading, Image); 나머지는 Phase 2 이후 |
| **이미지 최적화**              | 로딩 지연                | Next.js Image 컴포넌트 + Vercel 이미지 최적화                                   |
| **브라우저 호환성**            | 구형 브라우저에서 오류   | iOS Safari, Chrome 최신 2개 버전 지원                                           |

### 11.2 보안 고려사항

| 항목          | 고려사항                      | 조치                                              |
| :------------ | :---------------------------- | :------------------------------------------------ |
| **UUID 보안** | URL 직추측으로 타인 정보 접근 | 128bit 랜덤 UUID (사실상 해킹 불가능)             |
| **HTTPS**     | 데이터 암호화                 | Vercel에서 자동 적용                              |
| **CORS**      | 크로스 도메인 요청 차단       | API 라우트로 Notion 호출 (클라이언트 직접 호출 X) |

### 11.3 제약사항

- **코치 인증 없음:** 코치의 Notion 계정 필수 (서비스 측에서 별도 인증 X)
- **실시간성:** ISR 캐싱으로 인해 최대 1시간 지연 가능
- **오프라인 접근 불가:** 인터넷 연결 필수
- **데이터 다운로드 불가:** 기록 다운로드/내보내기 기능 미지원 (MVP)

### 11.4 환경 변수 관리

**필수 환경 변수 (`.env.local`)**

```bash
# Notion API 인증
NOTION_API_KEY=secret_xxxxxxxxxxxxx

# Notion Database IDs (Notion 워크스페이스에서 획득)
NOTION_MEMBERS_DB_ID=xxxxxxxxxxxxx
NOTION_SESSIONS_DB_ID=xxxxxxxxxxxxx
```

**설정 방법:**

1. Notion 계정으로 [Notion Developers](https://www.notion.so/my-integrations) 접속
2. 새로운 Internal Integration 생성
3. API Key 복사 → `.env.local`의 `NOTION_API_KEY`에 저장
4. Members DB 및 Sessions DB의 Database ID 확인 → 환경 변수에 저장

### 11.5 SEO 및 메타 태그

**동적 메타데이터 생성 (개인 정보 보호)**

```typescript
// app/members/[id]/layout.tsx
export async function generateMetadata({ params }) {
  const { id } = await params;
  const member = await getMember(id);
  return {
    title: `${member.name}님의 운동 기록 - 샐리랑`,
    robots: 'noindex, nofollow', // 검색 엔진 크롤링 차단
    description: '개인 운동 기록 열람 서비스',
  };
}
```

**보안 고려:**

- `robots: 'noindex'`로 개인 정보 보호
- 동적 라우트는 검색 엔진 인덱싱 제외
- UUID 기반 접근 제어로 직접 접근만 허용

---

## 12. 향후 확장 기능 (Roadmap)

### Phase 2 (MVP 후속)

- [ ] 다크 모드 완전 지원
- [ ] 검색 기능 (날짜, 제목 검색)
- [ ] 더 많은 Notion 블록 지원 (칼럼, 카드 레이아웃 등)
- [ ] 이미지 갤러리 뷰
- [ ] 공유 링크 암호화 (선택사항)

### Phase 3 (코치 기능 확대)

- [ ] 간단한 관리자 대시보드 (Notion 대신)
- [ ] 회원 초대 시스템
- [ ] 수업 예약 기능
- [ ] 회원별 진행 상황 대시보드

### Phase 4 (서비스 확장)

- [ ] 모바일 앱 (React Native)
- [ ] 푸시 알림 (새 수업 기록 업로드 시)
- [ ] 댓글/피드백 시스템
- [ ] 결제/구독 모델 (프리미엄 기능)

---

## 13. 결론

샐리랑은 **Notion 중심의 최소 복잡도 운동 기록 열람 서비스**입니다.

**핵심 가치:**

1. **코치:** Notion에서 작성만 하면 자동으로 웹사이트에 반영
2. **회원:** 링크 클릭 한 번으로 복잡한 가입 없이 열람

**개발 철학:**

- 불필요한 기능 제거 (로그인, 검색, 댓글 등은 MVP 제외)
- 모바일 중심 설계 (TOSS UI 스타일)
- Notion과의 강한 결합 (CMS 역할 전담)

**성공 조건:**

- 코치가 5분 내 링크 생성 가능
- 회원이 3초 내 자신의 기록 확인 가능
- 모든 데이터가 Notion에서 단일 관리 가능

---

**문서 작성일:** 2025.01.31
**버전:** 1.0 (MVP)
**상태:** 승인 완료
