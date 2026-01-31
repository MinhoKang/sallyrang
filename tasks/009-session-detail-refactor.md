# Task 009: 수업 상세 페이지 리팩토링

## 개요

NotionBlockRenderer를 사용하여 수업 상세 페이지를 리팩토링합니다.
더미 블록 데이터를 렌더링하고 뒤로가기 버튼 기능을 완성합니다.

## 명세서

### 구현 내용

**페이지 리팩토링** (`src/app/members/[id]/sessions/[sessionId]/page.tsx`)
- 기존 하드코딩된 UI를 NotionBlockRenderer로 대체
- mockSessionDetail 더미 데이터 사용
- formatDate 사용하여 날짜 포맷팅
- NotionBlockRenderer로 블록 렌더링
- ISR 설정 추가 (revalidate = 3600)

### 기술적 요구사항

- Server Component 유지
- 기존 임시 데이터 객체 삭제
- 기존 Card 기반 UI 코드 삭제
- 헤더 sticky 유지 (스크롤 시 고정)
- backdrop-blur 효과 유지
- time 태그 사용 (semantic HTML)
- sr-only 클래스로 스크린 리더 접근성 개선

### 삭제할 코드

```typescript
// 기존 임시 데이터
const session = {
  title: "250131 등운동",
  date: "2025.01.31",
  content: "수업 내용을 불러오는 중...",
};

// 기존 Card 기반 UI
<Card>
  <CardHeader>
    <CardTitle className="text-muted-foreground">
      Notion 블록 렌더링 영역
    </CardTitle>
  </CardHeader>
  {/* ... */}
</Card>
```

### 의존성

- Task 004 완료 (더미 데이터 유틸리티)
- Task 005 완료 (Notion 블록 렌더러)

## 관련 파일

- `src/app/members/[id]/sessions/[sessionId]/page.tsx` - 수정
- `src/lib/mock-data.ts` - 더미 블록 데이터 import
- `src/components/domain/NotionBlockRenderer.tsx` - 컴포넌트 import
- `src/lib/formatters.ts` - formatDate 함수 사용
- `src/components/ui/button.tsx` - Button UI 컴포넌트

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] 페이지 접속 시 더미 블록 데이터 정상 렌더링
- [ ] Paragraph, Heading (1-3), Image 블록 모두 정상 표시
- [ ] Rich Text 스타일 (Bold, Italic, Link) 정상 작동
- [ ] 뒤로가기 버튼 클릭 시 회원 대시보드로 복귀
- [ ] 날짜 포맷팅 (YYYY.MM.DD) 정상 표시
- [ ] Next.js Image 컴포넌트 사용 확인
- [ ] ISR 설정 (revalidate = 3600) 확인
- [ ] 헤더 sticky 효과 유지

## 구현 단계

### 1단계: import 정리

- [ ] 기존 Card, CardHeader, CardTitle, CardContent import 제거
- [ ] NotionBlockRenderer import 추가
- [ ] formatDate import 추가
- [ ] mockSessionDetail import 추가
- [ ] Button, ChevronLeft import 확인

### 2단계: 더미 데이터 연동

- [ ] 기존 임시 데이터 객체 삭제
- [ ] mockSessionDetail 사용
- [ ] Phase 3 대비 주석 추가:
  ```typescript
  // Phase 2: 더미 데이터 사용
  // Phase 3에서 아래 코드로 대체:
  // const session = await getSession(sessionId);
  const session = mockSessionDetail;
  ```

### 3단계: 날짜 포맷팅

- [ ] formatDate 함수 호출
- [ ] formattedDate 변수에 저장
- [ ] 헤더에서 사용

### 4단계: 헤더 개선

- [ ] 뒤로가기 버튼 유지
- [ ] sr-only 클래스 추가 (접근성):
  ```typescript
  <span className="sr-only">뒤로가기</span>
  ```
- [ ] time 태그로 날짜 표시
- [ ] backdrop-blur 효과 확인:
  ```typescript
  className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  ```

### 5단계: 블록 렌더링 영역 구현

- [ ] 기존 Card 기반 UI 삭제
- [ ] h1 제목 유지 (`text-3xl font-bold mb-8`)
- [ ] NotionBlockRenderer 컴포넌트 추가
- [ ] blocks prop에 session.blocks 전달

### 6단계: ISR 설정 추가

- [ ] 파일 하단에 ISR 설정 추가:
  ```typescript
  // ISR 설정 (Phase 3 Notion API 연동 대비)
  export const revalidate = 3600; // 1시간
  ```

### 7단계: 최종 검증

- [ ] 불필요한 코드 삭제 확인
- [ ] import 정리 확인
- [ ] TypeScript 컴파일 확인
- [ ] 개발 서버 실행 및 페이지 확인

## 테스트 체크리스트

> Phase 2 통합 테스트

- [ ] http://localhost:3000/members/mock-member-uuid-12345/sessions/session-1 접속
- [ ] 수업 제목 정상 표시 확인
- [ ] 날짜 포맷팅 (YYYY.MM.DD) 확인
- [ ] Paragraph 블록 렌더링 확인
- [ ] Heading 블록 렌더링 확인
- [ ] Image 블록 렌더링 확인
- [ ] Rich Text 스타일 (Bold, Italic, Link) 확인
- [ ] 뒤로가기 버튼 클릭 시 대시보드 복귀 확인
- [ ] 헤더 sticky 효과 확인 (스크롤 시)
- [ ] 모바일 뷰 (375px) 반응형 확인
- [ ] 타입 에러 없음

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중 (Task 004, 005 완료 후 진행 가능)
**우선순위:** 중간 (통합 작업)
**생성일:** 2026.02.01
**완료일:**
