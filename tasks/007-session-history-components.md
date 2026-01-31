# Task 007: 수업 히스토리 리스트 및 아이템 컴포넌트 구현

## 개요

회원 대시보드의 수업 기록 목록을 표시하는 컴포넌트를 구현합니다.
날짜 기준 정렬, 빈 상태 처리, 클릭 시 상세 페이지 이동 기능을 포함합니다.

## 명세서

### 구현 내용

1. **SessionHistoryItem 컴포넌트** (`src/components/domain/SessionHistoryItem.tsx`)
   - 개별 수업 카드 표시
   - 날짜 + 제목 레이아웃
   - ChevronRight 아이콘
   - 클릭 시 상세 페이지 이동
   - 호버 효과

2. **SessionHistoryList 컴포넌트** (`src/components/domain/SessionHistoryList.tsx`)
   - 수업 목록 렌더링
   - 날짜 기준 최신순 정렬
   - 빈 상태 처리 (수업 없을 때 안내 메시지)
   - SessionHistoryItem 반복 렌더링

### 기술적 요구사항

- Server Component로 구현
- formatDate 유틸리티 재사용
- Next.js Link 컴포넌트 사용 (prefetch 자동 적용)
- Lucide React ChevronRight 아이콘 사용
- semantic HTML (section, time 태그)

### 스타일 가이드

- 날짜: `text-sm font-medium text-muted-foreground`
- 제목: `text-base font-semibold`
- 호버 효과: `hover:bg-accent/50`
- 간격: `space-y-3`

### 의존성

- Task 004 완료 (더미 데이터 유틸리티)

## 관련 파일

- `src/components/domain/SessionHistoryItem.tsx` - 신규 생성
- `src/components/domain/SessionHistoryList.tsx` - 신규 생성
- `src/components/ui/card.tsx` - Card UI 컴포넌트 참조
- `src/lib/formatters.ts` - formatDate 함수 사용 (L5-17)
- `src/types/domain.ts` - Session 타입 참조 (L28-49)

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] 날짜 기준 최신순 정렬 정상 작동
- [ ] 빈 상태 안내 메시지 표시
- [ ] 클릭 시 `/members/[id]/sessions/[sessionId]` 경로로 이동
- [ ] 호버 효과 정상 작동 (`hover:bg-accent/50`)
- [ ] formatDate 함수 사용하여 YYYY.MM.DD 형식 표시
- [ ] Server Component로 구현 (use client 없음)

## 구현 단계

### 1단계: SessionHistoryItem 구현

- [ ] `src/components/domain/SessionHistoryItem.tsx` 파일 생성
- [ ] 필요한 import (Link, Card, ChevronRight, formatDate, Session 타입)
- [ ] SessionHistoryItemProps 인터페이스 정의 (session, memberId)
- [ ] formatDate 함수로 날짜 포맷팅
- [ ] Link 컴포넌트로 래핑
- [ ] href: `/members/${memberId}/sessions/${session.id}`
- [ ] hover 효과: `hover:bg-accent/50 rounded-lg`
- [ ] Card 구조 구현:
  - border-none shadow-none
  - CardContent: flex items-center justify-between p-4
- [ ] 날짜 표시 (time 태그 사용)
- [ ] 제목 표시 (span 태그)
- [ ] ChevronRight 아이콘 추가

### 2단계: SessionHistoryList 골격 구현

- [ ] `src/components/domain/SessionHistoryList.tsx` 파일 생성
- [ ] 필요한 import (Card, SessionHistoryItem, Session 타입)
- [ ] SessionHistoryListProps 인터페이스 정의 (sessions, memberId)

### 3단계: 날짜 정렬 로직 구현

- [ ] sessions 배열 복사 (`[...sessions]`)
- [ ] sort 함수로 날짜 기준 내림차순 정렬
- [ ] `new Date(b.date).getTime() - new Date(a.date).getTime()`

### 4단계: 리스트 렌더링 구현

- [ ] section 태그 사용 (aria-labelledby="session-history")
- [ ] h3 제목: "내 운동 기록" (`text-2xl font-bold mb-4`)
- [ ] 조건부 렌더링:
  - sessions.length === 0: 빈 상태 메시지
  - 그 외: SessionHistoryItem 반복 렌더링

### 5단계: 빈 상태 구현

- [ ] Card 컴포넌트 사용
- [ ] CardContent: `p-6 text-center text-muted-foreground`
- [ ] 메시지: "아직 수업 기록이 없습니다."

### 6단계: 리스트 렌더링 구현

- [ ] div 래퍼: `space-y-3`
- [ ] map 함수로 SessionHistoryItem 렌더링
- [ ] key prop: session.id
- [ ] session, memberId props 전달

## 테스트 체크리스트

> 이 작업은 컴포넌트 단위 테스트 단계

- [ ] mockSessions 데이터로 리스트 렌더링 확인
- [ ] 날짜 정렬 확인 (최신순)
- [ ] 빈 배열로 빈 상태 메시지 확인
- [ ] Link href 경로 확인
- [ ] 호버 효과 확인
- [ ] 타입 에러 없음

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중 (Task 004 완료 후 진행 가능)
**우선순위:** 높음
**생성일:** 2026.02.01
**완료일:**
