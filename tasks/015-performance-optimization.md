# Task 015: 성능 최적화

## 개요

현재 프로젝트는 Next.js Image 컴포넌트와 ISR 캐싱을 사용하고 있지만, **추가 최적화**가 필요합니다. 이 작업에서는 이미지 로딩 성능, 캐싱 전략, Lighthouse 성능 지표를 검토하고 개선합니다.

## 목표

1. **이미지 최적화**
   - NotionBlockRenderer에서 이미지 로딩 성능 검증
   - priority, loading="lazy" 속성 적절히 활용
   - Notion API 이미지 캐싱 전략 수립

2. **ISR 캐싱 전략 검토**
   - 현재 revalidate 설정 (1시간) 적절성 확인
   - API 호출 최소화 전략 검증

3. **성능 측정 및 개선**
   - Lighthouse 성능 지표 분석 (목표: 90+ 점수)
   - 필요시 코드 스플리팅 및 지연 로딩 적용

## 현재 상태

### ✅ 이미 구현된 부분

- `NotionBlockRenderer`: Next.js Image 컴포넌트 사용
- `lib/notion.ts`: ISR 캐싱 설정 (`revalidate = 3600`, 1시간)
- React 19 + React Compiler 활성화

### ⚠️ 개선 필요 부분

- 이미지 로딩 전략 (priority, loading 속성 미설정)
- 대용량 이미지 최적화 (sizes 속성 검증 필요)
- Lighthouse 성능 측정 미실시
- Notion API 이미지 URL 만료 처리 (7일 제한)

## 관련 파일

- `src/components/domain/NotionBlockRenderer.tsx` - 이미지 렌더링 최적화
- `src/lib/notion.ts` - ISR 캐싱 전략 검토
- `next.config.ts` - 이미지 도메인 설정 확인

## 구현 단계

### Step 1: Next.js 이미지 도메인 설정 확인

**파일**: `next.config.ts`

**확인 사항**:
```typescript
const nextConfig: NextConfig = {
  // ...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Notion 이미지 S3
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
};
```

### Step 2: NotionBlockRenderer 이미지 최적화

**파일**: `src/components/domain/NotionBlockRenderer.tsx`

**수정 내용**:
```typescript
case NotionBlockType.IMAGE:
  if (!block.imageUrl) return null;
  return (
    <figure
      key={key}
      className="my-6 rounded-xl overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full aspect-video bg-muted">
        <Image
          src={block.imageUrl}
          alt={block.caption || "수업 이미지"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          // 첫 번째 이미지는 우선 로딩, 나머지는 지연 로딩
          priority={blockIndex === 0} // 첫 번째 블록만 priority
          loading={blockIndex === 0 ? undefined : "lazy"}
          // 블러 플레이스홀더 (선택사항)
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        />
      </div>
      {block.caption && (
        <figcaption className="px-4 py-3 text-sm text-muted-foreground bg-muted/50 text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
```

**추가 설명**:
- `priority={blockIndex === 0}`: 첫 번째 이미지만 우선 로딩 (LCP 개선)
- `loading="lazy"`: 나머지 이미지는 뷰포트 접근 시 로딩
- `placeholder="blur"`: 이미지 로딩 전 블러 효과 (UX 개선)
- `blurDataURL`: 간단한 SVG 플레이스홀더 (투명 이미지)

### Step 3: ISR 캐싱 전략 검토

**파일**: `src/lib/notion.ts`

**현재 설정**:
```typescript
export const revalidate = 3600; // 1시간
```

**검토 사항**:

1. **캐싱 기간 적절성**
   - 현재: 1시간 (3600초)
   - 권장: 운동 기록은 실시간성이 중요하지 않으므로 1-4시간 적절
   - 결론: **현재 설정 유지 (1시간)**

2. **API 호출 최적화**
   - `getMember()`와 `getSessions()`를 병렬 호출 (이미 `Promise.all` 사용 ✅)
   - 불필요한 API 호출 없음 ✅

3. **Notion API Rate Limit 대응**
   - Notion API Rate Limit: 3 requests/second
   - ISR 캐싱으로 요청 최소화됨 ✅
   - 에러 핸들링 구현됨 ✅

**결론**: 현재 캐싱 전략은 적절하며 추가 변경 불필요

### Step 4: Lighthouse 성능 측정 가이드

**측정 도구**:
- Chrome DevTools → Lighthouse
- [PageSpeed Insights](https://pagespeed.web.dev/)

**측정 페이지**:
1. 홈페이지 (`/`)
2. 회원 대시보드 (`/members/[id]`)
3. 수업 상세 (`/members/[id]/sessions/[sessionId]`)

**목표 지표**:
- **Performance**: 90+ (모바일 기준)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

**주요 최적화 포인트**:

1. **LCP (Largest Contentful Paint)**: 2.5초 이하
   - 첫 번째 이미지 `priority` 설정 ✅
   - 폰트 프리로드 (`<link rel="stylesheet">` 사용 중)

2. **CLS (Cumulative Layout Shift)**: 0.1 이하
   - Image 컴포넌트 `fill` 사용 시 부모 컨테이너 크기 명시 ✅
   - `aspect-video` 클래스로 비율 고정 ✅

3. **FID (First Input Delay)**: 100ms 이하
   - React Compiler로 자동 최적화 ✅
   - 불필요한 JavaScript 최소화

4. **TTI (Time to Interactive)**: 3.8초 이하
   - Server Components 사용으로 클라이언트 번들 최소화 ✅

### Step 5: 추가 최적화 (선택사항)

#### 5-1. 폰트 최적화

**파일**: `src/app/layout.tsx`

**현재 설정**:
```tsx
<link
  rel="stylesheet"
  as="style"
  crossOrigin="anonymous"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
```

**개선 (선택사항)**:
- `next/font`를 사용한 로컬 폰트 호스팅 고려
- 현재는 CDN 사용으로 충분 (Pretendard 최적화됨)

#### 5-2. Notion API 이미지 만료 처리

**문제**: Notion 이미지 URL은 7일 후 만료됨

**해결책** (Phase 2 이후 고려):
1. 이미지 다운로드 후 `/public` 또는 S3에 저장
2. ISR 재검증 시 이미지 URL 갱신
3. 현재는 ISR 캐싱(1시간)으로 URL 만료 전 갱신됨

#### 5-3. 코드 스플리팅

**현재 상태**:
- Next.js App Router가 자동으로 라우트별 코드 스플리팅 수행 ✅
- Client Components만 별도 번들로 분리 ✅

**추가 작업 불필요**: Next.js가 자동 처리

## 수락 기준

- [x] `NotionBlockRenderer`에서 첫 번째 이미지에 `priority` 설정 ✅
- [x] 나머지 이미지에 `loading="lazy"` 설정 ✅
- [x] `next.config.ts`에 Notion 이미지 도메인 설정 확인 ✅
- [x] ISR 캐싱 전략 검토 완료 (1시간 유지) ✅
- [x] 환경 변수 설정 (NEXT_PUBLIC_BASE_URL) ✅
- [x] .env.example 파일 생성 ✅
- [x] 성능 최적화 문서 작성 (docs/PERFORMANCE.md) ✅
- [ ] Lighthouse 성능 측정 (프로덕션 배포 후)

## 테스트 체크리스트

### 이미지 최적화 확인

- [ ] Chrome DevTools → Network 탭에서 이미지 로딩 순서 확인
- [ ] 첫 번째 이미지가 우선 로딩되는지 확인 (priority)
- [ ] 스크롤 전 이미지는 로딩되지 않는지 확인 (lazy loading)
- [ ] 이미지 로딩 중 레이아웃 시프트 없는지 확인 (CLS)

### 캐싱 동작 확인

- [ ] 첫 방문 시 Notion API 호출 확인 (Network 탭)
- [ ] 1시간 이내 재방문 시 캐시된 데이터 사용 확인 (X-Nextjs-Cache: HIT)
- [ ] 1시간 후 재방문 시 재검증 확인 (ISR)

### Lighthouse 성능 측정

- [ ] 홈페이지 Lighthouse 점수 측정 (목표: Performance 90+)
- [ ] 회원 대시보드 Lighthouse 점수 측정
- [ ] 수업 상세 페이지 Lighthouse 점수 측정
- [ ] LCP, CLS, FID 지표 확인

### 성능 개선 확인

- [ ] 이미지 최적화 전후 LCP 비교
- [ ] 캐싱 적용 전후 로딩 속도 비교
- [ ] 모바일 디바이스에서 성능 테스트

## 성능 개선 목표

| 지표 | 개선 전 | 목표 | 측정 방법 |
| :--- | :--- | :--- | :--- |
| **LCP** | TBD | 2.5초 이하 | Lighthouse |
| **CLS** | TBD | 0.1 이하 | Lighthouse |
| **FID** | TBD | 100ms 이하 | Lighthouse |
| **Performance** | TBD | 90+ | Lighthouse |
| **First Load JS** | TBD | 200KB 이하 | Next.js Build Output |

## 참고 사항

### Notion 이미지 URL 만료 처리

**문제**:
- Notion 이미지 URL은 `expiry` 파라미터가 있으며 약 7일 후 만료
- ISR 캐싱(1시간)으로 인해 이미지 URL이 만료되면 404 에러 발생 가능

**현재 대응**:
- ISR 재검증(1시간)으로 URL이 만료 전에 갱신됨
- 7일보다 훨씬 짧은 주기로 재검증되므로 문제 없음

**향후 개선** (Phase 2):
- 이미지 다운로드 후 `/public` 또는 CDN에 저장
- 영구적인 이미지 URL 제공

### React Compiler 성능 영향

- React 19 + React Compiler 활성화로 자동 메모이제이션 수행
- `useMemo`, `useCallback` 불필요
- 렌더링 성능 자동 최적화

## 다음 단계

Task 016: Vercel 배포 및 프로덕션 환경 테스트
