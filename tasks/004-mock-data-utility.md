# Task 004: 더미 데이터 유틸리티 생성

## 개요

Phase 3 Notion API 연동 전까지 사용할 더미 데이터 유틸리티를 작성합니다.
실제 Notion API 응답 구조를 반영하며, 모든 타입이 `src/types/domain.ts`와 완전히 일치해야 합니다.

## 명세서

### 구현 내용

1. **mockMember (회원 더미 데이터)**
   - id: "mock-member-uuid-12345"
   - name: "김샐리" (한글 이름)
   - startDate: "2024-12-01" (D+61일째 계산용)
   - age, gender, experience, location, status, tuition, totalTuition 포함
   - 타입: `Member`

2. **mockSessions (수업 목록 더미 데이터, 최소 5개)**
   - 날짜 범위: 2025-01-20 ~ 2025-01-31
   - 다양한 제목: "250131 등운동", "250129 하체운동" 등
   - sequence: 6 ~ 10
   - status: "완료" (일부는 "예정")
   - feedback, note, images 다양하게 포함
   - 타입: `Session[]`

3. **mockSessionDetail (수업 상세 더미 데이터)**
   - mockSessions[0]을 기반으로 확장
   - blocks 배열 포함 (최소 5개 블록):
     - HEADING_2: "오늘의 루틴"
     - PARAGRAPH: 일반 텍스트, Bold/Italic 조합
     - HEADING_3: "피드백"
     - PARAGRAPH: Rich Text (링크 포함)
     - IMAGE: imageUrl과 caption 포함
   - 타입: `SessionDetail`

### 기술적 요구사항

- TypeScript strict 모드 준수 (any 타입 금지)
- 모든 필드가 `src/types/domain.ts` 타입과 정확히 일치
- 날짜 형식: YYYY-MM-DD (ISO 8601)
- 이미지 URL: placeholder 서비스 사용 (https://via.placeholder.com)
- 한글 이름 및 내용 사용 (실제 사용 환경 반영)

### 의존성

- 없음 (최우선 작업)

## 관련 파일

- `src/lib/mock-data.ts` - 신규 생성
- `src/types/domain.ts` - 타입 정의 참조 (L1-135)

## 수락 기준

- [ ] TypeScript 컴파일 에러 없음
- [ ] mockMember, mockSessions, mockSessionDetail 모두 export
- [ ] mockSessions 배열에 최소 5개 수업 포함
- [ ] mockSessionDetail.blocks에 최소 5개 블록 포함 (HEADING, PARAGRAPH, IMAGE 모두 포함)
- [ ] 모든 타입이 domain.ts와 정확히 일치
- [ ] Optional 필드 (age, experience, note 등) 일부는 undefined로 설정하여 다양성 확보

## 구현 단계

### 1단계: 파일 생성 및 타입 import

- [ ] `src/lib/mock-data.ts` 파일 생성
- [ ] domain.ts에서 필요한 타입 import (Member, Session, SessionDetail, NotionBlockData, NotionBlockType, RichTextSegment)

### 2단계: mockMember 작성

- [ ] 회원 더미 데이터 작성
- [ ] 모든 필수 필드 포함
- [ ] 타입 명시: `export const mockMember: Member = { ... }`

### 3단계: mockSessions 작성

- [ ] 수업 목록 더미 데이터 작성 (최소 5개)
- [ ] 날짜 범위 다양화 (2025-01-20 ~ 2025-01-31)
- [ ] 다양한 제목, 상태, 피드백 포함
- [ ] 타입 명시: `export const mockSessions: Session[] = [ ... ]`

### 4단계: mockSessionDetail 작성

- [ ] mockSessions[0] 기반 확장
- [ ] blocks 배열 작성 (최소 5개 블록)
- [ ] HEADING_2, PARAGRAPH, HEADING_3, IMAGE 블록 포함
- [ ] Rich Text 스타일 다양화 (Bold, Italic, Link)
- [ ] 타입 명시: `export const mockSessionDetail: SessionDetail = { ... }`

### 5단계: 타입 안전성 검증

- [ ] TypeScript 컴파일 실행 (`npm run build`)
- [ ] 타입 에러 없는지 확인
- [ ] 모든 필드가 domain.ts 타입과 일치하는지 확인

## 테스트 체크리스트

> 이 작업은 데이터 준비 단계로 별도 테스트 불필요

- [ ] 다음 작업(Task 005)에서 더미 데이터 import 가능 확인

## 변경 사항 요약

> 작업 완료 후 작성

---

**작업 상태:** ⏳ 대기 중
**우선순위:** ⭐ 최우선 (Phase 2의 모든 작업 기반)
**생성일:** 2026.02.01
**완료일:**
