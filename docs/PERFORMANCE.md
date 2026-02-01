# 성능 최적화 가이드

샐리랑 프로젝트의 성능 최적화 전략 및 Lighthouse 측정 가이드입니다.

---

## 현재 적용된 최적화

### 1. 이미지 최적화 ✅

**Next.js Image 컴포넌트 사용**
- 자동 이미지 최적화 (WebP 포맷 등)
- 프로그레시브 로딩
- 반응형 이미지 제공

**설정** (`NotionBlockRenderer.tsx`):
```tsx
<Image
  src={block.imageUrl}
  alt={block.caption || "수업 이미지"}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
  priority={blockIndex === 0}        // 첫 번째 이미지 우선 로딩
  loading={blockIndex === 0 ? undefined : "lazy"}  // 나머지 지연 로딩
  placeholder="blur"                 // 블러 플레이스홀더
  blurDataURL="..."                  // SVG 플레이스홀더
/>
```

**효과**:
- LCP (Largest Contentful Paint) 개선
- CLS (Cumulative Layout Shift) 최소화
- 대역폭 절약

### 2. ISR 캐싱 ✅

**설정** (`lib/notion.ts`):
```typescript
export const revalidate = 3600; // 1시간 (3600초)
```

**캐싱 전략**:
- 회원 정보: 1시간 캐시 (실시간성 낮음)
- 수업 목록: 1시간 캐시 (하루 1-2회 업데이트)
- Notion API Rate Limit 대응 (3 requests/second)

**효과**:
- API 호출 최소화
- 서버 부하 감소
- 응답 속도 향상

### 3. React Compiler ✅

**설정** (`next.config.ts`):
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,  // React 19 자동 최적화
};
```

**효과**:
- 자동 메모이제이션
- 불필요한 리렌더링 방지
- `useMemo`, `useCallback` 수동 작성 불필요

### 4. Server Components 우선 ✅

**구조**:
- 기본: Server Components (데이터 페칭, 렌더링)
- 필요시만: Client Components (`'use client'`)

**예시**:
```tsx
// Server Component (기본)
export default async function MemberPage({ params }: MemberPageProps) {
  const member = await getMember(id);  // 서버에서 직접 데이터 페칭
  return <MemberProfileCard member={member} />;
}

// Client Component (상호작용 필요시만)
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={...}>클릭</button>;
}
```

**효과**:
- 클라이언트 번들 사이즈 최소화
- 초기 로딩 속도 향상
- SEO 개선

### 5. 코드 스플리팅 ✅

**자동 적용**:
- Next.js App Router가 라우트별 자동 분리
- Client Components만 별도 번들

**효과**:
- 필요한 코드만 로딩
- TTI (Time to Interactive) 개선

---

## Lighthouse 성능 측정

### 측정 도구

1. **Chrome DevTools Lighthouse**
   - Chrome 개발자 도구 → Lighthouse 탭
   - 모바일/데스크톱 모드 선택
   - 측정 실행

2. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - 배포 후 실제 URL 입력
   - 실제 사용자 환경 데이터 제공

### 측정 페이지

| 페이지 | URL | 우선순위 |
| :--- | :--- | :--- |
| **홈페이지** | `/` | High |
| **회원 대시보드** | `/members/[id]` | High |
| **수업 상세** | `/members/[id]/sessions/[sessionId]` | High |
| **관리자 페이지** | `/admin` | Low |

### 목표 지표

#### Core Web Vitals

| 지표 | 목표값 | 설명 |
| :--- | :--- | :--- |
| **LCP** | 2.5초 이하 | 최대 콘텐츠 렌더링 시간 |
| **FID** | 100ms 이하 | 첫 입력 지연 |
| **CLS** | 0.1 이하 | 누적 레이아웃 이동 |

#### Lighthouse 점수

| 카테고리 | 목표 (모바일) | 목표 (데스크톱) |
| :--- | :--- | :--- |
| **Performance** | 90+ | 95+ |
| **Accessibility** | 95+ | 95+ |
| **Best Practices** | 95+ | 100 |
| **SEO** | 90+ | 90+ |

### 측정 방법

#### 1. 로컬 환경 (개발 서버)

```bash
# 개발 서버 실행
npm run dev

# Chrome DevTools → Lighthouse
# URL: http://localhost:3000
# Mode: Mobile (Simulated Throttling)
```

**주의**: 개발 서버는 최적화되지 않으므로 점수가 낮을 수 있음

#### 2. 프로덕션 빌드 (로컬)

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# Chrome DevTools → Lighthouse
# URL: http://localhost:3000
# Mode: Mobile (Simulated Throttling)
```

#### 3. 배포 환경 (Vercel)

```bash
# Vercel 배포
vercel deploy --prod

# PageSpeed Insights
# URL: https://your-domain.vercel.app
```

---

## 성능 개선 체크리스트

### 이미지 최적화

- [x] Next.js Image 컴포넌트 사용
- [x] 첫 번째 이미지 `priority` 설정
- [x] 나머지 이미지 `loading="lazy"` 설정
- [x] `placeholder="blur"` 설정
- [x] 적절한 `sizes` 속성 설정
- [x] Notion 이미지 도메인 `next.config.ts`에 추가

### 캐싱 최적화

- [x] ISR 캐싱 설정 (1시간)
- [x] Notion API 병렬 호출 (`Promise.all`)
- [ ] 캐시 미스 시 에러 핸들링 (현재 구현됨)

### 렌더링 최적화

- [x] React Compiler 활성화
- [x] Server Components 우선 사용
- [x] Client Components 최소화
- [x] 코드 스플리팅 자동 적용

### 폰트 최적화

- [x] Pretendard 폰트 CDN 사용
- [ ] (선택사항) `next/font`로 로컬 호스팅

### 메타데이터 최적화

- [x] Open Graph 메타데이터 설정
- [x] `metadataBase` 설정
- [x] robots 메타 태그 설정

---

## 성능 이슈 트러블슈팅

### 1. LCP (Largest Contentful Paint) 느림

**원인**:
- 첫 번째 이미지 로딩 지연
- 폰트 로딩 지연
- 서버 응답 느림

**해결**:
- ✅ 첫 번째 이미지 `priority` 설정
- ✅ Pretendard 폰트 CDN 사용
- ✅ ISR 캐싱으로 서버 응답 개선

### 2. CLS (Cumulative Layout Shift) 높음

**원인**:
- 이미지 크기 미지정
- 광고/배너 동적 삽입
- 폰트 로딩 시 레이아웃 변경

**해결**:
- ✅ Image 컴포넌트 `fill` + 부모 컨테이너 크기 고정
- ✅ `aspect-video` 클래스로 비율 유지
- ✅ 폰트 프리로드

### 3. FID (First Input Delay) 느림

**원인**:
- JavaScript 번들 크기 큼
- 메인 스레드 블로킹

**해결**:
- ✅ React Compiler로 자동 최적화
- ✅ Server Components로 번들 최소화
- ✅ 코드 스플리팅 자동 적용

### 4. Notion 이미지 404 에러

**원인**:
- Notion 이미지 URL 만료 (7일 제한)
- ISR 캐싱으로 URL이 오래됨

**해결 (현재)**:
- ISR 재검증 1시간 → URL 만료 전 갱신

**향후 개선 (Phase 2)**:
- 이미지 다운로드 후 `/public` 또는 CDN 저장
- 영구적인 이미지 URL 제공

---

## 참고 자료

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vercel Analytics](https://vercel.com/analytics)

---

**문서 작성일**: 2026.02.01
**마지막 업데이트**: 2026.02.01
