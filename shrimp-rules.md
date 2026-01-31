# 샐리랑 (Sallyrang) 개발 규칙

> AI Agent를 위한 프로젝트별 개발 가이드

## 프로젝트 개요

- **프로젝트명:** 샐리랑 (Sallyrang)
- **목적:** Notion CMS 기반 PT 운동 기록 열람 서비스
- **기술 스택:** Next.js 16 + React 19 + TypeScript + Notion API + Tailwind CSS v4
- **아키텍처:** App Router, Server Components 중심
- **참고 문서:** `docs/PRD.md`, `docs/ROADMAP.md`, `CLAUDE.md`

---

## 디렉토리 구조 및 파일 규칙

### 디렉토리 구조

```
src/
├── app/                          # Next.js App Router 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 페이지
│   ├── globals.css               # Tailwind CSS v4 설정
│   └── members/[id]/             # 회원 대시보드 라우트
│       ├── page.tsx              # 대시보드 페이지
│       ├── loading.tsx           # 로딩 상태
│       ├── error.tsx             # 에러 바운더리
│       └── sessions/[sessionId]/ # 수업 상세 라우트
│           ├── page.tsx          # 수업 상세 페이지
│           ├── loading.tsx       # 로딩 상태
│           └── error.tsx         # 에러 바운더리
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트 (자동 생성)
│   └── domain/                   # 도메인 비즈니스 컴포넌트
│       ├── MemberProfileCard.tsx
│       ├── SessionHistoryList.tsx
│       ├── SessionDetailHeader.tsx
│       └── NotionBlockRenderer.tsx
├── lib/
│   ├── utils.ts                  # 유틸리티 (cn 함수)
│   ├── notion.ts                 # Notion API 연동
│   └── formatters.ts             # 날짜 포맷팅, D-Day 계산
└── types/
    ├── notion.ts                 # Notion API 응답 타입
    └── domain.ts                 # 도메인 타입 정의
```

### 파일 생성 규칙

| 파일 유형 | 생성 위치 | 생성 방법 |
|:---|:---|:---|
| **페이지** | `src/app/` | 수동 생성 (page.tsx, loading.tsx, error.tsx 3개 세트) |
| **UI 컴포넌트** | `src/components/ui/` | **반드시** `npx shadcn@latest add <컴포넌트명>` 사용 |
| **도메인 컴포넌트** | `src/components/domain/` | 수동 생성 |
| **타입 정의** | `src/types/` | 수동 생성 (notion.ts 또는 domain.ts) |
| **Notion API 함수** | `src/lib/notion.ts` | 기존 파일에 함수 추가 |
| **유틸리티 함수** | `src/lib/` | 용도에 맞는 파일에 추가 |

⚠️ **경고:** `src/components/ui/` 디렉토리에 직접 파일을 생성하거나 수정하지 마라. shadcn/ui CLI만 사용.

---

## 아키텍처 원칙

### 1. Server Components 우선 원칙

**기본 규칙:**
- 모든 페이지는 Server Components로 작성
- `'use client'`는 상태 관리가 필요한 인터랙티브 UI에만 사용
- Notion API 호출은 **오직 서버 컴포넌트에서만** 수행

**✅ 올바른 예:**
```typescript
// src/app/members/[id]/page.tsx
// Server Component (기본값)
export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const member = await getMember(id);  // 서버에서 Notion API 호출
  const sessions = await getSessions(id);

  return (
    <div>
      <MemberProfileCard member={member} />
      <SessionHistoryList sessions={sessions} />
    </div>
  );
}

// ISR 캐싱 설정 (1시간)
export const revalidate = 3600;
```

**❌ 잘못된 예:**
```typescript
// Client Component에서 Notion API 호출 (금지!)
'use client';
import { useEffect, useState } from 'react';

export default function MemberPage() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    getMember(id).then(setMember);  // ❌ 클라이언트에서 API 호출 금지
  }, []);

  return <div>{member?.name}</div>;
}
```

### 2. CDD (Component Driven Development) 원칙

**컴포넌트 분리 규칙:**

| 컴포넌트 유형 | 위치 | 역할 | 예시 |
|:---|:---|:---|:---|
| **UI 컴포넌트** | `src/components/ui/` | 순수 UI, 비즈니스 로직 없음 | Button, Card, Badge |
| **도메인 컴포넌트** | `src/components/domain/` | 비즈니스 로직 포함 | MemberProfileCard, SessionHistoryList |
| **페이지 컴포넌트** | `src/app/` | 라우트, 데이터 페칭 | MemberPage, SessionDetailPage |

**도메인 컴포넌트 작성 원칙:**
- Props로 데이터를 받아 표시만 담당
- 서버 컴포넌트로 작성 (상태 관리 불필요)
- 재사용 가능하도록 설계

**✅ 올바른 예:**
```typescript
// src/components/domain/MemberProfileCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateDDay } from '@/lib/formatters';

interface MemberProfileCardProps {
  member: {
    name: string;
    startDate: string;
    age: number;
    experience: string;
    location: string;
    status: string;
  };
}

export function MemberProfileCard({ member }: MemberProfileCardProps) {
  const dday = calculateDDay(member.startDate);

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-3xl font-bold">
        {member.name}님, 안녕하세요!
      </h2>
      <Badge variant="secondary" className="text-base">
        운동 시작한 지 {dday}
      </Badge>
      {/* ... */}
    </div>
  );
}
```

---

## 타입 안전성 규칙

### 1. TypeScript Strict 모드 준수

- **`any` 타입 사용 절대 금지**
- 모든 함수 파라미터와 반환 값에 타입 명시
- Notion API 응답은 반드시 타입 정의 후 사용

### 2. 타입 정의 위치

| 타입 종류 | 정의 위치 | 예시 |
|:---|:---|:---|
| **Notion API 응답** | `src/types/notion.ts` | `NotionMemberResponse`, `NotionSessionResponse` |
| **도메인 객체** | `src/types/domain.ts` | `Member`, `Session`, `NotionBlock` |
| **컴포넌트 Props** | 컴포넌트 파일 내부 | `MemberPageProps`, `MemberProfileCardProps` |
| **유틸리티 함수** | 함수 정의 내부 | `formatDate(date: Date \| string): string` |

### 3. 타입 정의 예시

**✅ 올바른 예:**
```typescript
// src/types/domain.ts
export interface Member {
  id: string;
  name: string;
  status: '진행중' | '홀딩' | '종료';
  startDate: string;
  age: number;
  gender: '남' | '여';
  experience: string;
  location: string;
}

export interface Session {
  id: string;
  sequence: number;
  title: string;
  date: string;
  status: '완료' | '예정' | '미완료';
  memberId: string;
  content: string;
  feedback: string;
  note?: string;
  images?: string[];
}

// src/types/notion.ts
import { PageObjectResponse, DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export type NotionMemberResponse = PageObjectResponse;
export type NotionSessionResponse = PageObjectResponse;
```

---

## Notion API 연동 규칙

### 1. Notion API 함수 작성 규칙

**모든 Notion API 함수는 `src/lib/notion.ts`에만 작성**

**필수 구현 함수:**
- `getMember(memberId: string): Promise<Member>`
- `getSessions(memberId: string): Promise<Session[]>`
- `getSession(sessionId: string): Promise<SessionDetail>`

**✅ 올바른 예:**
```typescript
// src/lib/notion.ts
import { Client } from '@notionhq/client';
import { NotionMemberResponse } from '@/types/notion';
import { Member } from '@/types/domain';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const NOTION_MEMBERS_DB_ID = process.env.NOTION_MEMBERS_DB_ID || '';
export const NOTION_SESSIONS_DB_ID = process.env.NOTION_SESSIONS_DB_ID || '';

/**
 * 회원 정보 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 회원 정보 객체
 */
export async function getMember(memberId: string): Promise<Member> {
  const response = await notion.pages.retrieve({
    page_id: memberId
  }) as NotionMemberResponse;

  // Notion 응답을 도메인 객체로 변환
  return parseMemberData(response);
}

function parseMemberData(response: NotionMemberResponse): Member {
  const properties = response.properties;

  return {
    id: response.id,
    name: getTitle(properties.Name),
    status: getSelect(properties.Status),
    startDate: getDate(properties.StartDate),
    age: getNumber(properties.Age),
    gender: getSelect(properties.Gender),
    experience: getText(properties.Experience),
    location: getSelect(properties.Location),
  };
}
```

### 2. Notion 필드 매핑 규칙

**Members DB 필드 매핑:**

| Notion 필드 | 타입 | 도메인 필드 | 비고 |
|:---|:---|:---|:---|
| Name | Title | member.name | 필수 |
| Status | Select | member.status | '진행중', '홀딩', '종료' |
| StartDate | Date | member.startDate | D-Day 계산용 |
| Age | Number | member.age | |
| Gender | Select | member.gender | '남', '여' |
| Experience | Text | member.experience | 예: "2년 6개월" |
| Location | Select | member.location | 예: "홈짐", "센터" |
| Sessions | Relation | member.sessions | Sessions DB 연결 |

**Sessions DB 필드 매핑:**

| Notion 필드 | 타입 | 도메인 필드 | 비고 |
|:---|:---|:---|:---|
| Sequence | Number | session.sequence | 회차 번호 |
| Title | Title | session.title | 수업 제목 |
| Date | Date | session.date | 수업 날짜 |
| Status | Select | session.status | '완료', '예정', '미완료' |
| Member | Relation | session.memberId | Members DB 연결 |
| Content | Text/Blocks | session.content | 루틴 상세 |
| Feedback | Text | session.feedback | 코치 피드백 |
| Note | Text | session.note | 선택 사항 |
| Image | Files | session.images | 수업 사진 (배열) |

### 3. Notion 블록 렌더링 규칙

**MVP 단계에서 지원하는 블록 타입:**
- ✅ Paragraph (일반 텍스트)
- ✅ Heading (H1, H2, H3)
- ✅ Image (Next.js Image 컴포넌트 사용)
- ✅ Rich Text 스타일 (Bold, Italic, Link)

**Phase 2에서 구현 예정 (MVP에서 제외):**
- ❌ List (Bulleted, Numbered)
- ❌ Toggle (접기/펼치기)
- ❌ Callout
- ❌ Code Block

**✅ 올바른 예:**
```typescript
// src/components/domain/NotionBlockRenderer.tsx
import Image from 'next/image';

interface NotionBlockRendererProps {
  blocks: NotionBlock[];
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={block.id}>{block.text}</p>;
          case 'heading_1':
            return <h1 key={block.id} className="text-3xl font-bold">{block.text}</h1>;
          case 'heading_2':
            return <h2 key={block.id} className="text-2xl font-bold">{block.text}</h2>;
          case 'image':
            return (
              <Image
                key={block.id}
                src={block.url}
                alt={block.caption || ''}
                width={800}
                height={600}
                className="rounded-lg"
              />
            );
          default:
            return null;  // MVP에서 지원하지 않는 블록은 무시
        }
      })}
    </div>
  );
}
```

### 4. 에러 처리 규칙

**에러 처리 원칙:**
- Notion API 호출 실패 시 명확한 에러 메시지 제공
- 회원/수업 없음 → `notFound()` 호출
- API Rate Limit → ISR 캐싱으로 완화
- 타입 불일치 → TypeScript 컴파일 에러로 사전 방지

**✅ 올바른 예:**
```typescript
// src/app/members/[id]/page.tsx
import { notFound } from 'next/navigation';

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  try {
    const member = await getMember(id);

    if (!member) {
      notFound();  // 404 페이지로 이동
    }

    return <div>{/* ... */}</div>;
  } catch (error) {
    console.error('Failed to fetch member:', error);
    throw error;  // error.tsx에서 처리
  }
}
```

---

## 스타일링 규칙

### 1. Tailwind CSS v4 사용 규칙

**중요:** 이 프로젝트는 Tailwind CSS v4를 사용하며, `tailwind.config.ts` 파일을 **생성하지 않는다**.

**설정 위치:** `src/app/globals.css`

**CSS 변수 사용:**
- 색상: `bg-primary`, `text-foreground`, `border-border`
- 여백: `p-4`, `m-8` (8px 배수 원칙)
- 반경: `rounded-lg`, `rounded-xl`

**✅ 올바른 예:**
```typescript
<div className="bg-background text-foreground">
  <Card className="border-border">
    <CardHeader className="p-6">
      <CardTitle className="text-2xl font-bold">제목</CardTitle>
    </CardHeader>
  </Card>
</div>
```

**❌ 잘못된 예:**
```typescript
// tailwind.config.ts 파일 생성 금지
// Tailwind v4는 globals.css에서 설정

// 하드코딩된 색상 사용 금지
<div className="bg-[#ffffff] text-[#000000]">  // ❌
```

### 2. TOSS UI 디자인 원칙

**핵심 원칙:**
- 크고 굵은 타이포그래피 (제목 강조)
- 불필요한 선과 테두리 최소화
- 중요한 정보 (숫자, 날짜) 강조
- 8px 배수 여백 원칙

**타이포그래피 규칙:**

| 요소 | 클래스 | 크기/굵기 |
|:---|:---|:---|
| **페이지 제목** | `text-3xl font-bold` | 30px, 700 |
| **섹션 제목** | `text-2xl font-bold` | 24px, 700 |
| **카드 제목** | `text-lg font-semibold` | 18px, 600 |
| **본문** | `text-base` | 16px, 400 |
| **캡션/라벨** | `text-sm text-muted-foreground` | 14px, 400 |

**여백 규칙:**
- 페이지 상하 여백: `py-8` (32px)
- 섹션 간 여백: `mb-8` (32px)
- 카드 내부 여백: `p-6` (24px)
- 요소 간 간격: `space-y-4` (16px) 또는 `gap-4`

**✅ 올바른 예:**
```typescript
<div className="min-h-screen bg-background">
  {/* Header */}
  <header className="border-b">
    <div className="container mx-auto flex h-16 items-center justify-center">
      <h1 className="text-xl font-bold">샐리랑</h1>
    </div>
  </header>

  {/* Main Content */}
  <main className="container mx-auto px-4 py-8">
    <h2 className="mb-4 text-3xl font-bold">
      {member.name}님, 안녕하세요!
    </h2>
    <Badge variant="secondary" className="text-base">
      운동 시작한 지 D+35일째
    </Badge>
  </main>
</div>
```

### 3. 모바일 최적화 규칙

- 반응형 그리드: `grid grid-cols-1 md:grid-cols-2`
- 터치 친화적 버튼: 최소 44px 높이
- 패딩: 모바일에서 `px-4`, 데스크톱에서 `md:px-8`

---

## 성능 최적화 규칙

### 1. ISR (Incremental Static Regeneration) 적용

**모든 페이지 컴포넌트에 ISR 설정 추가:**

```typescript
// src/app/members/[id]/page.tsx
export const revalidate = 3600;  // 1시간마다 재생성
```

**ISR 적용 이유:**
- Notion API Rate Limit 완화
- 페이지 로딩 속도 향상
- 서버 부하 감소

### 2. Next.js Image 컴포넌트 사용

**Notion 이미지는 반드시 `next/image` 사용:**

**✅ 올바른 예:**
```typescript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="수업 사진"
  width={800}
  height={600}
  className="rounded-lg"
  loading="lazy"
/>
```

**❌ 잘못된 예:**
```typescript
<img src={imageUrl} alt="수업 사진" />  // ❌ 일반 img 태그 사용 금지
```

### 3. 번들 크기 최적화

- `'use client'` 최소화 (Server Components 우선)
- 필요한 컴포넌트만 import
- Tree-shaking 활용

---

## 다중 파일 조정 규칙

### 1. 새로운 페이지 추가 시

**반드시 3개 파일을 함께 생성:**

```
src/app/members/[id]/sessions/[sessionId]/
├── page.tsx      # 페이지 컴포넌트
├── loading.tsx   # 로딩 상태
└── error.tsx     # 에러 바운더리
```

**예시:**
```typescript
// page.tsx
export default async function SessionDetailPage({ params }) {
  const { id, sessionId } = await params;
  const session = await getSession(sessionId);
  return <div>{/* ... */}</div>;
}

export const revalidate = 3600;

// loading.tsx
export default function Loading() {
  return <div>로딩 중...</div>;
}

// error.tsx
'use client';
export default function Error({ error, reset }) {
  return <div>에러 발생: {error.message}</div>;
}
```

### 2. Notion API 함수 추가 시

**반드시 3개 파일을 함께 수정:**

1. `src/lib/notion.ts` - API 함수 추가
2. `src/types/notion.ts` - Notion API 응답 타입 정의
3. `src/types/domain.ts` - 도메인 타입 정의

**예시 워크플로우:**
```typescript
// 1. src/types/notion.ts
export interface NotionSessionResponse extends PageObjectResponse {
  // Notion API 응답 구조
}

// 2. src/types/domain.ts
export interface Session {
  id: string;
  title: string;
  date: string;
  // ...
}

// 3. src/lib/notion.ts
export async function getSession(sessionId: string): Promise<Session> {
  const response = await notion.pages.retrieve({ page_id: sessionId }) as NotionSessionResponse;
  return parseSessionData(response);
}
```

### 3. 도메인 컴포넌트 생성 시

**반드시 2개 파일을 함께 작업:**

1. `src/components/domain/ComponentName.tsx` - 컴포넌트 생성
2. `src/types/domain.ts` - 필요한 타입 추가 (없는 경우)

---

## AI 의사결정 트리

### 1. 새로운 기능 추가 요청 시

```
새로운 기능 추가 요청
  ├─ PRD.md에 명시된 기능인가?
  │   ├─ Yes → MVP 범위인가?
  │   │   ├─ Yes → 진행
  │   │   └─ No → 사용자에게 확인: "이 기능은 Phase 2 이후 구현 예정입니다. 지금 추가하시겠습니까?"
  │   └─ No → 사용자에게 확인: "PRD에 없는 기능입니다. 추가하시겠습니까?"
```

### 2. 컴포넌트 선택 시

```
컴포넌트 생성 필요
  ├─ 상태 관리 필요?
  │   ├─ Yes → Client Component ('use client')
  │   └─ No → Server Component
  │
  ├─ UI만 담당?
  │   ├─ Yes → src/components/ui/ (shadcn/ui 사용)
  │   └─ No → src/components/domain/
```

### 3. 타입 정의 위치 결정

```
타입 정의 필요
  ├─ Notion API 응답?
  │   └─ src/types/notion.ts
  │
  ├─ 비즈니스 도메인 객체?
  │   └─ src/types/domain.ts
  │
  └─ 컴포넌트 Props만?
      └─ 컴포넌트 파일 내부
```

### 4. 불명확한 요구사항 처리

```
불명확한 요구사항
  ├─ PRD.md 확인
  ├─ ROADMAP.md 확인
  └─ 여전히 불명확?
      └─ 사용자에게 질문 (추측 금지)
```

---

## 할 수 있는 것 / 할 수 없는 것

### ✅ 할 수 있는 것

| 작업 | 예시 |
|:---|:---|
| **Notion API 함수 추가** | `src/lib/notion.ts`에 `getSession()` 함수 추가 |
| **도메인 컴포넌트 생성** | `src/components/domain/MemberProfileCard.tsx` 생성 |
| **타입 정의** | `src/types/domain.ts`에 `Member` 인터페이스 추가 |
| **Server Component로 데이터 페칭** | 페이지에서 `await getMember(id)` 호출 |
| **유틸리티 함수 사용** | `formatDate()`, `calculateDDay()` 사용 |
| **shadcn/ui 컴포넌트 추가** | `npx shadcn@latest add avatar` 실행 |
| **CSS 변수 수정** | `globals.css`에서 색상 테마 수정 |
| **ISR 설정** | 페이지에 `export const revalidate = 3600` 추가 |

### ❌ 할 수 없는 것

| 작업 | 이유 |
|:---|:---|
| **`src/components/ui/` 수동 수정** | shadcn/ui CLI만 사용 |
| **Client Component에서 Notion API 호출** | 서버 컴포넌트에서만 호출 |
| **`tailwind.config.ts` 생성** | Tailwind v4는 globals.css 사용 |
| **`any` 타입 사용** | TypeScript strict 모드 위배 |
| **로그인/인증 기능 추가** | MVP 범위 외 |
| **관리자 페이지 추가** | Notion이 관리자 역할 (PRD 참조) |
| **실시간 데이터 업데이트** | ISR만 사용 (WebSocket 등 금지) |
| **Notion 외 외부 API 연동** | MVP 범위 외 |

---

## 금지 사항 (중요)

### ⚠️ 절대 금지

1. **`src/components/ui/` 디렉토리 수동 수정**
   - shadcn/ui CLI만 사용하라
   - 이유: 컴포넌트 일관성 및 업데이트 용이성

2. **클라이언트에서 Notion API 직접 호출**
   - 모든 Notion API 호출은 서버 컴포넌트에서만
   - 이유: API 키 노출 방지, 성능 최적화

3. **`any` 타입 사용**
   - TypeScript strict 모드 준수
   - 이유: 타입 안전성 보장

4. **MVP 범위 외 기능 구현 (사용자 확인 없이)**
   - 로그인/인증, 관리자 페이지, 결제 등
   - 이유: 프로젝트 범위 관리

5. **`tailwind.config.ts` 파일 생성**
   - Tailwind CSS v4는 `globals.css`에서 설정
   - 이유: v4 아키텍처 준수

### ⚠️ 주의 사항

1. **환경 변수 누락 확인**
   - `.env.local` 필수: `NOTION_API_KEY`, `NOTION_MEMBERS_DB_ID`, `NOTION_SESSIONS_DB_ID`

2. **페이지 생성 시 3개 파일 세트**
   - `page.tsx`, `loading.tsx`, `error.tsx` 모두 생성

3. **타입 정의 후 구현**
   - 데이터 구조 정의 → API 함수 → 컴포넌트 순서

4. **주석은 한국어로**
   - JSDoc, 인라인 주석 모두 한국어

---

## 환경 변수 설정

### 필수 환경 변수 (`.env.local`)

```bash
# Notion API 인증
NOTION_API_KEY=secret_xxxxxxxxxxxxx

# Notion Database IDs
NOTION_MEMBERS_DB_ID=xxxxxxxxxxxxx
NOTION_SESSIONS_DB_ID=xxxxxxxxxxxxx
```

### 설정 방법

1. [Notion Developers](https://www.notion.so/my-integrations)에서 Integration 생성
2. API Key 복사
3. Members DB와 Sessions DB의 Database ID 확인
4. `.env.local` 파일에 저장

---

## 참고 문서

- **PRD:** `docs/PRD.md` - 제품 요구사항 정의서
- **ROADMAP:** `docs/ROADMAP.md` - 개발 로드맵
- **CLAUDE.md:** 프로젝트 컨텍스트 및 아키텍처

---

**문서 작성일:** 2025.01.31
**버전:** 1.0
**대상:** AI Agent (Coding Assistant)
