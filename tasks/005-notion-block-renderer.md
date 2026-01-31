# Task 005: Rich Text 헬퍼 및 Notion 블록 렌더러 구현

## 개요

Notion 블록을 렌더링하는 핵심 컴포넌트를 구현합니다.
MVP 단계에서는 Paragraph, Heading (1-3), Image 블록만 지원하며, Rich Text 스타일 (Bold, Italic, Link)을 처리합니다.

## 명세서

### 구현 내용

1. **RichText 컴포넌트** (`src/components/domain/RichText.tsx`)
   - Rich Text 세그먼트 배열 렌더링
   - Bold, Italic, Link 스타일 지원
   - 중첩 스타일 처리

2. **NotionBlockRenderer 컴포넌트** (`src/components/domain/NotionBlockRenderer.tsx`)
   - Notion 블록 배열 렌더링
   - MVP 블록 타입 지원:
     - Paragraph
     - Heading 1, 2, 3
     - Image (Next.js Image 컴포넌트 사용)
   - 지원하지 않는 블록은 console.warn 후 무시

### 기술적 요구사항

- Server Component로 구현 (상태 관리 불필요)
- TypeScript strict 모드 준수
- TOSS UI 타이포그래피 규칙 준수:
  - Paragraph: `text-base leading-relaxed`
  - Heading 1: `text-3xl font-bold mb-4`
  - Heading 2: `text-2xl font-bold mb-3`
  - Heading 3: `text-xl font-bold mb-2`
  - Image: `rounded-lg`, responsive sizing
- Next.js Image 컴포넌트 사용 (자동 최적화)

### 의존성

- Task 004 완료 (더미 데이터 유틸리티)

### MVP 제외 사항

- List (Bulleted, Numbered) - Phase 2 이후
- Toggle (접기/펼치기) - Phase 2 이후
- Callout - Phase 2 이후
- Code Block - Phase 2 이후

## 관련 파일

- `src/components/domain/RichText.tsx` - 신규 생성
- `src/components/domain/NotionBlockRenderer.tsx` - 신규 생성
- `src/types/domain.ts` - 타입 참조 (L60-135)
- `src/lib/mock-data.ts` - 더미 블록 데이터 참조

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] RichText 컴포넌트가 Bold, Italic, Link 스타일 정상 렌더링
- [ ] NotionBlockRenderer가 Paragraph, Heading (1-3), Image 블록 정상 렌더링
- [ ] Next.js Image 컴포넌트 사용 확인
- [ ] 지원하지 않는 블록 타입은 console.warn 후 무시
- [ ] TOSS UI 타이포그래피 규칙 준수
- [ ] Server Component로 구현 (use client 없음)

## 구현 단계

### 1단계: RichText 헬퍼 구현

- [ ] `src/components/domain/RichText.tsx` 파일 생성
- [ ] RichTextSegment 타입 import
- [ ] RichTextProps 인터페이스 정의
- [ ] Bold 스타일 처리 (`<strong>`)
- [ ] Italic 스타일 처리 (`<em>`)
- [ ] Link 처리 (`<a>`, target="_blank", rel="noopener noreferrer")
- [ ] text-primary underline 클래스 적용

### 2단계: NotionBlockRenderer 골격 구현

- [ ] `src/components/domain/NotionBlockRenderer.tsx` 파일 생성
- [ ] NotionBlockData, NotionBlockType 타입 import
- [ ] NotionBlockRendererProps 인터페이스 정의
- [ ] switch-case 구조 구현

### 3단계: Paragraph 블록 렌더링

- [ ] PARAGRAPH case 구현
- [ ] RichText 컴포넌트 사용
- [ ] `text-base leading-relaxed` 클래스 적용

### 4단계: Heading 블록 렌더링

- [ ] HEADING_1 case 구현 (`text-3xl font-bold mb-4`)
- [ ] HEADING_2 case 구현 (`text-2xl font-bold mb-3`)
- [ ] HEADING_3 case 구현 (`text-xl font-bold mb-2`)
- [ ] 각 Heading에서 RichText 컴포넌트 사용

### 5단계: Image 블록 렌더링

- [ ] IMAGE case 구현
- [ ] Next.js Image 컴포넌트 import
- [ ] imageUrl 검증 (없으면 null 반환)
- [ ] Image 컴포넌트 설정:
  - width: 800, height: 600
  - className: "rounded-lg"
  - sizes: "(max-width: 768px) 100vw, 800px"
  - loading: "lazy"
- [ ] caption 표시 (`text-sm text-muted-foreground mt-2 text-center`)

### 6단계: 예외 처리 및 테스트

- [ ] default case에서 console.warn 추가
- [ ] mockSessionDetail 데이터로 렌더링 테스트
- [ ] 모든 블록 타입 정상 렌더링 확인

## 테스트 체크리스트

> 이 작업은 컴포넌트 단위 테스트 단계

- [ ] mockSessionDetail.blocks 데이터 import 가능
- [ ] 각 블록 타입별 렌더링 확인
- [ ] Rich Text 스타일 조합 테스트 (Bold+Italic, Bold+Link 등)
- [ ] 이미지 placeholder URL 렌더링 확인
- [ ] 타입 에러 없음

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중 (Task 004 완료 후 진행 가능)
**우선순위:** 높음
**생성일:** 2026.02.01
**완료일:**
