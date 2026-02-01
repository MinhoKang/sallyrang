# Task 018: Vercel 배포

**상태:** 🚧 진행 중
**우선순위:** 매우 높음
**예상 소요 시간:** 1-2시간
**실제 소요 시간:** -

---

## 개요

Next.js 애플리케이션을 Vercel에 배포하고 프로덕션 환경에서의 정상 동작을 검증합니다.

---

## 목표

1. **Vercel 배포**: GitHub 연동을 통한 자동 배포 설정
2. **환경 변수 관리**: 프로덕션 환경 변수 안전하게 설정
3. **프로덕션 테스트**: 배포 후 모든 기능 정상 작동 확인
4. **성능 최적화 검증**: 프로덕션 빌드 성능 측정

---

## 구현 단계

### Step 1: Vercel 프로젝트 생성 및 연동

**작업 내용:**
1. Vercel 대시보드(https://vercel.com)에서 로그인
2. "Add New" → "Project" 클릭
3. GitHub 저장소(`selin-workout-records`) 선택
4. 프레임워크: Next.js로 자동 감지 확인

**확인 사항:**
- Build 명령어: `npm run build` (기본값 사용)
- Output Directory: `.next` (기본값 사용)
- Node.js 버전: 20 이상 (환경 설정에서 확인)

---

### Step 2: 환경 변수 설정 (Vercel Dashboard)

**필수 환경 변수:**

```
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_MEMBERS_DB_ID=xxxxxxxxxxxxx
NOTION_SESSIONS_DB_ID=xxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://sallyrang.vercel.app (또는 사용자 정의 도메인)
```

**설정 방법:**
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 각 변수 추가 (Production 환경만 필요)
4. "Save"

**주의:**
- `NOTION_API_KEY`: 절대로 클라이언트에 노출 금지
- `NEXT_PUBLIC_*`: 클라이언트 번들에 포함되므로 공개 데이터만 사용
- 로컬 `.env.local`과 동일한 값 사용

---

### Step 3: 자동 배포 확인

**Vercel 자동 배포 규칙:**
- `main` 브랜치에 푸시 → 프로덕션 배포
- 다른 브랜치 → Preview 배포

**배포 상태 확인:**
1. GitHub에서 커밋 푸시
2. Vercel 대시보드에서 배포 진행 상황 확인
3. 배포 완료 후 자동으로 생성된 URL 확인

---

### Step 4: 프로덕션 환경 테스트

**테스트 항목:**

#### 4.1 기본 페이지 접근
- [ ] 홈페이지 (/) 정상 로드
- [ ] 회원 대시보드 (/members/[id]) 정상 로드
- [ ] 수업 상세 (/members/[id]/sessions/[sessionId]) 정상 로드
- [ ] 관리자 대시보드 (/admin) 정상 로드
- [ ] 404 페이지 정상 작동

#### 4.2 Notion API 연동
- [ ] 회원 정보 정상 표시
- [ ] 수업 리스트 정상 표시
- [ ] 수업 상세 콘텐츠 정상 표시
- [ ] Notion 블록 렌더링 정상 작동 (텍스트, 제목, 이미지 등)

#### 4.3 관리자 기능
- [ ] 비밀번호 인증 정상 작동
- [ ] 회원 검색 기능 정상 작동
- [ ] 회원 클릭 시 대시보드로 이동

#### 4.4 성능 및 최적화
- [ ] 폰트 로딩 정상 (Pretendard)
- [ ] 이미지 최적화 정상 (WebP, lazy loading)
- [ ] Suspense 로딩 정상 (스켈레톤 UI)
- [ ] 다크/라이트 모드 전환 정상

#### 4.5 SEO 및 메타데이터
- [ ] Open Graph 이미지 정상 로드
- [ ] 페이지별 메타데이터 정상 설정
- [ ] robots.txt 확인 (noindex, nofollow)

---

### Step 5: 모바일 디바이스 실제 테스트

**테스트 환경:**
- iOS Safari (iPhone)
- Chrome (Android)

**테스트 항목:**
- [ ] 반응형 레이아웃 정상 (모든 화면 크기)
- [ ] 터치 인터랙션 정상 (버튼, 링크)
- [ ] 성능 만족스러움 (3G/4G 속도)
- [ ] 폰트 렌더링 정상
- [ ] 이미지 표시 정상

**모바일 URL 공유:**
```
https://sallyrang.vercel.app/members/[member-id]
```

---

### Step 6: 배포 후 모니터링

**Vercel Analytics 설정:**
1. Vercel 대시보드 → Analytics
2. Web Vitals 확인
3. Core Web Vitals 목표치:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

**에러 모니터링:**
1. Vercel 대시보드 → Logs
2. 에러 로그 확인
3. 필요시 수정 후 재배포

---

## 배포 체크리스트

### 배포 전
- [ ] 로컬 `npm run build` 성공
- [ ] `npm run lint` 경고/에러 없음
- [ ] 모든 테스트 통과
- [ ] 환경 변수 확인 (로컬 `.env.local` 설정됨)
- [ ] Git 커밋 및 푸시 완료

### 배포 중
- [ ] Vercel 대시보드에서 배포 진행 상황 모니터링
- [ ] 빌드 에러 발생 시 즉시 해결

### 배포 후
- [ ] 프로덕션 URL 접근 확인
- [ ] 기본 기능 모두 테스트 완료
- [ ] 모바일 디바이스 테스트 완료
- [ ] 성능 지표 확인 (Vercel Analytics)
- [ ] 에러 로그 확인

---

## 성능 지표 (목표값)

| 지표 | 목표값 | 측정 도구 |
|:---|:---|:---|
| **LCP (Largest Contentful Paint)** | < 2.5s | Vercel Analytics / Lighthouse |
| **FCP (First Contentful Paint)** | < 1.8s | Lighthouse |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Vercel Analytics |
| **페이지 로드 시간** | < 3s | Network 탭 |
| **번들 크기** | < 500KB | Vercel Build Logs |

---

## 트러블슈팅

### 빌드 실패
**원인:** 환경 변수 누락 또는 타입 에러

**해결:**
1. Vercel 로그 확인
2. 필요한 환경 변수 추가
3. 로컬에서 `npm run build` 재확인

### 환경 변수 오류
**원인:** Notion API 키 유효하지 않음

**해결:**
1. `.env.local`에서 올바른 키 확인
2. Notion API 키 갱신 필요시 다시 발급
3. Vercel 환경 변수 업데이트

### 이미지 로딩 실패
**원인:** Notion 이미지 도메인 허용 안 됨

**해결:**
1. `next.config.ts`에서 이미지 도메인 확인
2. `images.remotePatterns` 설정 재확인

---

## 참고 자료

- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Web Vitals](https://vercel.com/docs/concepts/analytics/web-vitals)

---

## 결론

Vercel 배포를 통해 다음을 달성합니다:

1. **자동 배포**: GitHub 푸시 시 자동 배포
2. **프로덕션 준비**: 모든 환경 변수 안전하게 관리
3. **성능 모니터링**: Vercel Analytics로 지속적 성능 추적
4. **사용자 접근**: 실시간으로 사용자에게 서비스 제공

배포 완료 후 관리자 링크 및 회원 링크를 코치에게 공유하여 실제 운영 시작.

---

**작성일:** 2026.02.01
**담당자:** Claude Code (AI Assistant)
**상태:** 🚧 진행 중
