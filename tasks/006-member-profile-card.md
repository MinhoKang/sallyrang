# Task 006: 회원 프로필 카드 컴포넌트 구현

## 개요

회원 대시보드 상단에 표시될 프로필 카드 컴포넌트를 구현합니다.
회원 이름, D-Day, 기본 정보 그리드를 TOSS UI 스타일로 표시합니다.

## 명세서

### 구현 내용

**MemberProfileCard 컴포넌트** (`src/components/domain/MemberProfileCard.tsx`)
- 회원 이름 인사말 (큰 제목)
- D-Day Badge (강조 스타일)
- 기본 정보 그리드 (2열):
  - 나이
  - 운동 경력
  - 수업 장소
  - 현재 상태

### 기술적 요구사항

- Server Component로 구현
- calculateDDay 유틸리티 재사용
- Badge variant='default' 사용 (secondary보다 눈에 띄게)
- semantic HTML (section, aria-labelledby) 사용
- 모바일 최적화 (grid-cols-2)

### TOSS UI 스타일 가이드

- 인사말: `text-3xl font-bold`
- D-Day Badge: `text-lg font-semibold px-4 py-2`
- 라벨: `text-sm text-muted-foreground`
- 값: `text-lg font-semibold`
- 그리드: `grid-cols-2 gap-4`
- 여백: `mb-8` (섹션 간 32px)

### 의존성

- Task 004 완료 (더미 데이터 유틸리티)

## 관련 파일

- `src/components/domain/MemberProfileCard.tsx` - 신규 생성
- `src/components/ui/card.tsx` - Card UI 컴포넌트 참조
- `src/components/ui/badge.tsx` - Badge UI 컴포넌트 참조
- `src/lib/formatters.ts` - calculateDDay 함수 사용 (L19-33)
- `src/types/domain.ts` - Member 타입 참조 (L1-26)

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] Member Props 타입 정확히 일치
- [ ] calculateDDay 함수 정상 작동 (D+N일째 형식)
- [ ] TOSS UI 스타일 가이드라인 준수
- [ ] 모바일 반응형 레이아웃 (grid-cols-2)
- [ ] semantic HTML 및 접근성 (aria-label)
- [ ] Server Component로 구현 (use client 없음)

## 구현 단계

### 1단계: 파일 생성 및 의존성 import

- [ ] `src/components/domain/MemberProfileCard.tsx` 파일 생성
- [ ] Card, CardContent import
- [ ] Badge import
- [ ] calculateDDay import
- [ ] Member 타입 import

### 2단계: Props 인터페이스 정의

- [ ] MemberProfileCardProps 인터페이스 작성
- [ ] member: Member 타입 지정

### 3단계: 인사말 섹션 구현

- [ ] section 태그 사용 (aria-labelledby="member-greeting")
- [ ] h2 태그로 인사말 렌더링 (`{member.name}님, 안녕하세요!`)
- [ ] `text-3xl font-bold mb-4` 클래스 적용

### 4단계: D-Day Badge 구현

- [ ] calculateDDay 함수 호출
- [ ] Badge 컴포넌트 사용
- [ ] variant="default" 설정
- [ ] `text-lg font-semibold px-4 py-2` 클래스 적용
- [ ] aria-label 추가 (접근성)

### 5단계: 기본 정보 그리드 구현

- [ ] Card 컴포넌트 사용
- [ ] CardContent에 `grid grid-cols-2 gap-4 p-6` 적용
- [ ] 나이 필드 구현 (라벨 + 값)
- [ ] 운동 경력 필드 구현
- [ ] 수업 장소 필드 구현
- [ ] 현재 상태 필드 구현
- [ ] 각 필드에 `space-y-1` 적용

### 6단계: 스타일 검증

- [ ] TOSS UI 타이포그래피 규칙 준수 확인
- [ ] 여백 8px 배수 원칙 확인
- [ ] 모바일 반응형 레이아웃 테스트

## 테스트 체크리스트

> 이 작업은 컴포넌트 단위 테스트 단계

- [ ] mockMember 데이터로 렌더링 확인
- [ ] D-Day 계산 정확성 확인
- [ ] 모든 필드 정상 표시 확인
- [ ] 타입 에러 없음

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중 (Task 004 완료 후 진행 가능)
**우선순위:** 높음
**생성일:** 2026.02.01
**완료일:**
