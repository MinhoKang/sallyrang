# 프로젝트 개요

- **프로젝트명:** 샐리랑 (Sallyrang)
- **목적:** Notion을 CMS로 활용하여 코치가 관리하는 운동 기록을 회원이 '전용 링크'를 통해 모바일 웹에서 편하게 열람하는 서비스.
- **핵심 가치:**
  - **코치:** 별도의 관리자 페이지 없이 Notion 앱만으로 모든 데이터 관리.
  - **회원:** 복잡한 가입/로그인/검색 없이, 카카오톡 등으로 공유받은 링크 클릭 한 번으로 내 기록 열람.

---

# 사용자 시나리오 (User Flow)

1.  **기록 작성:** 코치(Sally)가 Notion에서 회원의 운동 일지를 작성.
2.  **링크 공유:** 코치가 Notion의 회원 Page ID가 포함된 웹사이트 링크(예: `sallyrang.com/members/uuid...`)를 복사하여 회원에게 전송.
3.  **열람:** 회원은 링크를 클릭하여 본인의 대시보드에 접속 (다른 회원의 정보에는 접근 불가).

---

# 주요 기능

### 1. 회원 전용 대시보드 (`/members/[id]`)
- **접근 보안:** URL의 `id` (Notion UUID)를 보안 키로 사용하여, 해당 ID를 모르는 타인은 접근할 수 없음.
- **회원 정보 카드:** 상단에 본인의 주요 정보(이름, 운동 경력, 등록일 기준 D-Day 등)를 시각적으로 확인.
- **수업 리스트:** 과거부터 현재까지의 수업 기록을 카드 리스트 형태로 조회 (날짜, 수업명, 상태).
- **TOSS UI 스타일:** 크고 굵은 타이포그래피, 불필요한 선 제거, 중요한 정보(숫자/날짜) 강조.

### 2. 수업 상세 보기 (`/members/[id]/sessions/[sessionId]`)
- **Notion Block 렌더링:** 수업 리스트 클릭 시 이동. 코치가 Notion에 작성한 상세 루틴, 피드백 텍스트, 사진 등을 웹에 최적화하여 표시.
- **네비게이션:** 상단 헤더의 '뒤로가기' 버튼을 통해 대시보드로 복귀.

---

# 기술 스택

- **Frontend:** Next.js 16 (App Router), TypeScript
- **Compiler:** **React Compiler** (not experimental from Next.js 16)
  - *Reference:* [Next.js React Compiler Docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler)
- **CMS:** Notion API (`@notionhq/client`, Notion Block Renderer)
- **Styling:** Tailwind CSS, shadcn/ui
- **Icons:** Lucide React
- **Deploy:** Vercel

---

# 아키텍처 및 설계 원칙

### 1. CDD (Component Driven Development)
- **UI Components (`components/ui`):** 디자인 시스템(shadcn/ui) 기반의 순수 UI 컴포넌트 (Button, Card, Badge 등).
- **Domain Components (`components/domain`):** 비즈니스 로직이 주입된 컴포넌트 (MemberProfileCard, SessionHistoryList 등).

### 2. SoC (Separation of Concerns) & Hooks
- **View와 Logic의 분리:** 컴포넌트는 오직 렌더링만 담당. 데이터 페칭 및 가공은 Custom Hook으로 분리.
- **Hooks:**
  - `useMember(id)`: Notion API를 호출하여 회원 정보 및 D-Day 등 파생 데이터 반환.
  - `useSessions(memberId)`: 해당 회원의 수업 리스트 조회 및 정렬.

### 3. 공통 유틸리티 (Utils)
- **Styling:** `clsx`, `tailwind-merge`를 결합한 `cn` 헬퍼 함수 필수 사용.
- **Formatter:** 날짜 포맷팅(YYYY.MM.DD), 전화번호 하이픈 처리 등의 유틸 함수 분리.

### 4. 문서화 및 주석 규칙
- **언어:** **모든 코드 내 주석(Comment), 함수 설명(JSDoc), 커밋 메시지는 '한국어'로 작성한다.**
- **내용:** 복잡한 비즈니스 로직이나 노션 데이터 파싱 로직에는 반드시 상세한 주석을 첨부한다.

---

# Notion 데이터베이스 구조

### 1. Members DB (회원 정보)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| **Name** | Title | 회원 이름 |
| **Status** | Select | 상태 (진행중, 홀딩, 종료) |
| **StartDate** | Date | 등록일 (D-Day 계산용) |
| **Age** | Number | 나이 |
| **Gender** | Select | 성별 |
| **Experience** | Text | 운동 구력 |
| **Location** | Select | 수업 장소 |
| **Sessions** | Relation | Sessions DB와 관계형 연결 |

### 2. Sessions DB (수업 기록)
| 필드명 | 타입 | 설명 |
| :--- | :--- | :--- |
| **Sequence** | Number | 수업 회차 (예: 1회차) |
| **Title** | Title | 수업 회차명 (예: 250131 등운동) |
| **Date** | Date | 수업 날짜 |
| **Status** | Select | 진행 여부 (예: 완료, 미완료) |
| **Member** | Relation | Members DB와 연결 |
| **Content** | Body | (페이지 본문) 루틴 상세 |
| **Feedback** | Body |  피드백 |
| **Note** | Body | 비고 및 메모 |
| **Image** | Files | 수업 사진 |

---

# 화면 구성

### 1. 회원 대시보드 (`/members/[id]`)
- **Header:** 로고(샐리랑) (중앙 정렬)
- **Profile Area:**
    - "OOO님, 안녕하세요!" (큰 텍스트)
    - "운동 시작한 지 D+35일째" (강조된 뱃지)
    - 기본 정보 그리드 (나이 / 장소 / 현재 상태)
- **Session Area:**
    - "내 운동 기록" (섹션 타이틀)
    - 리스트 아이템: [날짜] [수업 제목] [화살표 아이콘 >]

### 2. 수업 상세 (`.../sessions/[sessionId]`)
- **Header:** < 뒤로가기 (왼쪽), 날짜 (중앙)
- **Content Area:**
    - 수업 제목 (H1)
    - Notion Block 렌더링 영역 (텍스트, 리스트, 이미지 등)

---

# MVP 개발 단계

1.  **Step 1: 환경 설정**
    -   `reactCompiler` 활성화.
    -   Notion API Key 발급 및 환경변수 설정 (`.env`).
    -   Tailwind & shadcn/ui 초기 세팅.

2.  **Step 2: 데이터 로직 구현 (Hooks)**
    -   `lib/notion.ts`: Notion Client 설정.
    -   `hooks/useMember.ts`: ID로 회원 정보 가져오기.
    -   `hooks/useSessions.ts`: 회원 ID로 수업 목록 가져오기.

3.  **Step 3: UI 구현 (CDD)**
    -   기본 컴포넌트(Card, Badge) 제작.
    -   대시보드 화면 및 상세 화면 레이아웃 잡기.
    -   TOSS 스타일 적용 (여백, 폰트 크기, 둥근 모서리 등).

4.  **Step 4: 통합 및 배포**
    -   Dynamic Route(`[id]`) 설정.
    -   Vercel 배포.