# Task 008: 회원 대시보드 페이지 리팩토링

## 개요

도메인 컴포넌트를 사용하여 회원 대시보드 페이지를 리팩토링합니다.
더미 데이터를 연동하고 TOSS UI 스타일을 완성합니다.

## 명세서

### 구현 내용

**페이지 리팩토링** (`src/app/members/[id]/page.tsx`)
- 기존 하드코딩된 UI를 도메인 컴포넌트로 대체
- mockMember, mockSessions 더미 데이터 사용
- MemberProfileCard 컴포넌트 연동
- SessionHistoryList 컴포넌트 연동
- ISR 설정 추가 (revalidate = 3600)

### 기술적 요구사항

- Server Component 유지
- 기존 임시 데이터 객체 삭제
- 기존 UI 코드 삭제 (Card, Badge 직접 사용하던 부분)
- container mx-auto px-4 py-8 통일
- backdrop-blur 효과 유지

### 삭제할 코드

```typescript
// 기존 임시 데이터
const member = {
  name: "샘플 회원",
  status: "진행중",
  age: 35,
  // ...
};

// 기존 UI 코드
<div className="mb-8">
  <h2 className="mb-4 text-3xl font-bold">
    {member.name}님, 안녕하세요!
  </h2>
  {/* ... */}
</div>
```

### 의존성

- Task 004 완료 (더미 데이터 유틸리티)
- Task 006 완료 (회원 프로필 카드 컴포넌트)
- Task 007 완료 (수업 히스토리 컴포넌트)

## 관련 파일

- `src/app/members/[id]/page.tsx` - 수정
- `src/lib/mock-data.ts` - 더미 데이터 import
- `src/components/domain/MemberProfileCard.tsx` - 컴포넌트 import
- `src/components/domain/SessionHistoryList.tsx` - 컴포넌트 import
- `src/components/ui/separator.tsx` - Separator UI 컴포넌트

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] 페이지 접속 시 더미 데이터 정상 표시
- [ ] MemberProfileCard에 회원 정보 및 D-Day 정상 표시
- [ ] SessionHistoryList에 수업 목록 최신순 정렬 표시
- [ ] 수업 카드 클릭 시 상세 페이지로 이동
- [ ] ISR 설정 (revalidate = 3600) 확인
- [ ] 모바일 반응형 레이아웃 정상 작동
- [ ] 헤더 backdrop-blur 효과 유지

## 구현 단계

### 1단계: import 정리

- [ ] 기존 Card, Badge import 제거
- [ ] MemberProfileCard import 추가
- [ ] SessionHistoryList import 추가
- [ ] mockMember, mockSessions import 추가
- [ ] Separator import 확인

### 2단계: 더미 데이터 연동

- [ ] 기존 임시 데이터 객체 삭제
- [ ] mockMember 사용
- [ ] mockSessions 사용
- [ ] Phase 3 대비 주석 추가:
  ```typescript
  // Phase 2: 더미 데이터 사용
  // Phase 3에서 아래 코드로 대체:
  // const member = await getMember(id);
  // const sessions = await getSessions(id);
  const member = mockMember;
  const sessions = mockSessions;
  ```

### 3단계: UI 리팩토링

- [ ] 기존 프로필 영역 UI 삭제
- [ ] MemberProfileCard 컴포넌트로 대체
- [ ] Separator 유지 (`className="my-8"`)
- [ ] 기존 수업 리스트 영역 UI 삭제
- [ ] SessionHistoryList 컴포넌트로 대체

### 4단계: 헤더 스타일 개선

- [ ] 기존 헤더 유지
- [ ] backdrop-blur 효과 확인:
  ```typescript
  className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  ```

### 5단계: ISR 설정 추가

- [ ] 파일 하단에 ISR 설정 추가:
  ```typescript
  // ISR 설정 (Phase 3 Notion API 연동 대비)
  export const revalidate = 3600; // 1시간
  ```

### 6단계: 최종 검증

- [ ] 불필요한 코드 삭제 확인
- [ ] import 정리 확인
- [ ] TypeScript 컴파일 확인
- [ ] 개발 서버 실행 및 페이지 확인 (`npm run dev`)

## 테스트 체크리스트

> Phase 2 통합 테스트

- [ ] http://localhost:3000/members/mock-member-uuid-12345 접속
- [ ] 회원 정보 정상 표시 확인
- [ ] D-Day 계산 확인
- [ ] 수업 목록 최신순 정렬 확인
- [ ] 수업 카드 클릭 시 상세 페이지 이동 확인
- [ ] 모바일 뷰 (375px) 반응형 확인
- [ ] 타입 에러 없음

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중 (Task 004, 006, 007 완료 후 진행 가능)
**우선순위:** 중간 (통합 작업)
**생성일:** 2026.02.01
**완료일:**
