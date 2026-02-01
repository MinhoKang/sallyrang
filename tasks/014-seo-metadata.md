# Task 014: SEO 및 메타데이터 설정

## 개요

현재 프로젝트에는 기본적인 `generateMetadata` 함수와 robots 메타 태그가 설정되어 있으나, **Open Graph 메타데이터가 누락**되어 있습니다. 이 작업에서는 완전한 SEO 메타데이터 구조를 구축하여 링크 공유 시 미리보기가 올바르게 표시되도록 합니다.

## 목표

1. **Open Graph 메타데이터 추가**
   - `og:title`, `og:description`, `og:url`, `og:image`, `og:type` 설정
   - 카카오톡, 페이스북 등 SNS 링크 공유 시 미리보기 최적화

2. **동적 메타데이터 개선**
   - 회원 대시보드: `{이름}님의 운동 기록 - 샐리랑`
   - 수업 상세: `{수업제목} | {날짜} - 샐리랑`

3. **검색 엔진 크롤링 제어**
   - 개인 정보 보호를 위한 `robots: 'noindex, nofollow'` 유지
   - 홈페이지는 인덱싱 허용, 동적 라우트는 차단

## 현재 상태

### ✅ 이미 구현된 부분

- `app/members/[id]/page.tsx`: `generateMetadata` 기본 구현
- `app/members/[id]/sessions/[sessionId]/page.tsx`: `generateMetadata` 기본 구현
- robots 메타 태그 설정 (`noindex, nofollow`)

### ❌ 미구현 부분

- Open Graph 메타데이터 (og:title, og:description, og:image 등)
- Twitter Card 메타데이터
- og:image 기본 이미지 설정
- 루트 레이아웃의 Open Graph 메타데이터

## 관련 파일

- `src/app/layout.tsx` - 루트 레이아웃 메타데이터 개선
- `src/app/members/[id]/page.tsx` - 회원 대시보드 메타데이터 개선
- `src/app/members/[id]/sessions/[sessionId]/page.tsx` - 수업 상세 메타데이터 개선
- `public/og-image.png` - (신규) 기본 Open Graph 이미지

## 구현 단계

### Step 1: 기본 Open Graph 이미지 준비

1. `public/og-image.png` 생성 (1200x630px 권장)
   - 샐리랑 로고 + "Notion 기반 PT 운동 기록 서비스" 텍스트
   - 간단한 플레이스홀더 이미지로 시작

2. `public/favicon.ico` 확인 (이미 있으면 유지)

### Step 2: 루트 레이아웃 메타데이터 개선

**파일**: `src/app/layout.tsx`

**수정 내용**:
```typescript
export const metadata: Metadata = {
  title: "샐리랑 - Notion 기반 PT 운동 기록 서비스",
  description: "코치는 Notion에서 작성만, 회원은 링크 클릭 한 번으로 운동 기록 확인",

  // Open Graph 메타데이터 추가
  openGraph: {
    title: "샐리랑 - Notion 기반 PT 운동 기록 서비스",
    description: "코치는 Notion에서 작성만, 회원은 링크 클릭 한 번으로 운동 기록 확인",
    url: "https://sallyrang.vercel.app", // 배포 URL로 변경 필요
    siteName: "샐리랑",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "샐리랑 - PT 운동 기록 서비스",
      },
    ],
  },

  // Twitter Card 메타데이터 추가
  twitter: {
    card: "summary_large_image",
    title: "샐리랑 - Notion 기반 PT 운동 기록 서비스",
    description: "코치는 Notion에서 작성만, 회원은 링크 클릭 한 번으로 운동 기록 확인",
    images: ["/og-image.png"],
  },
};
```

### Step 3: 회원 대시보드 메타데이터 개선

**파일**: `src/app/members/[id]/page.tsx`

**수정 내용**:
```typescript
export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const member = await getMember(id);

    return {
      title: `${member.name}님의 운동 기록 - 샐리랑`,
      description: `${member.name}님의 개인 PT 운동 기록을 확인하세요`,
      robots: "noindex, nofollow", // 개인 정보 보호

      // Open Graph 추가
      openGraph: {
        title: `${member.name}님의 운동 기록`,
        description: `${member.name}님의 개인 PT 운동 기록`,
        url: `https://sallyrang.vercel.app/members/${id}`,
        siteName: "샐리랑",
        locale: "ko_KR",
        type: "profile",
        images: [
          {
            url: "/og-image.png", // 기본 이미지
            width: 1200,
            height: 630,
            alt: `${member.name}님의 운동 기록`,
          },
        ],
      },

      // Twitter Card 추가
      twitter: {
        card: "summary",
        title: `${member.name}님의 운동 기록`,
        description: `${member.name}님의 개인 PT 운동 기록`,
        images: ["/og-image.png"],
      },
    };
  } catch {
    return {
      title: "운동 기록 - 샐리랑",
      description: "개인 운동 기록 열람 서비스",
      robots: "noindex, nofollow",
    };
  }
}
```

### Step 4: 수업 상세 페이지 메타데이터 개선

**파일**: `src/app/members/[id]/sessions/[sessionId]/page.tsx`

**수정 내용**:
```typescript
export async function generateMetadata({ params }: SessionPageProps): Promise<Metadata> {
  const { id, sessionId } = await params;

  try {
    const session = await getSession(sessionId);

    // 이미지가 있으면 첫 번째 이미지 사용, 없으면 기본 이미지
    const ogImage = session.blocks.find(b => b.type === NotionBlockType.IMAGE && b.imageUrl)?.imageUrl || "/og-image.png";

    return {
      title: `${session.title} | ${session.date} - 샐리랑`,
      description: `${session.date} 운동 수업 상세 기록 - ${session.sequence}회차`,
      robots: "noindex, nofollow", // 개인 정보 보호

      // Open Graph 추가
      openGraph: {
        title: `${session.title}`,
        description: `${session.date} 운동 수업 - ${session.sequence}회차`,
        url: `https://sallyrang.vercel.app/members/${id}/sessions/${sessionId}`,
        siteName: "샐리랑",
        locale: "ko_KR",
        type: "article",
        publishedTime: session.date, // 수업 날짜
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: session.title,
          },
        ],
      },

      // Twitter Card 추가
      twitter: {
        card: "summary_large_image",
        title: session.title,
        description: `${session.date} 운동 수업 - ${session.sequence}회차`,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "운동 기록 - 샐리랑",
      description: "운동 수업 상세 기록",
      robots: "noindex, nofollow",
    };
  }
}
```

## 수락 기준

- [x] 루트 레이아웃에 Open Graph 및 Twitter Card 메타데이터 추가 ✅
- [x] 회원 대시보드에 동적 Open Graph 메타데이터 생성 ✅
- [x] 수업 상세 페이지에 동적 Open Graph 메타데이터 생성 (이미지 블록이 있으면 활용) ✅
- [x] `public/og-image.svg` 기본 이미지 생성 (1200x630px) ✅
- [x] `metadataBase` 설정 및 경고 해결 ✅
- [x] robots 메타 태그 유지 (`noindex, nofollow`) ✅
- [ ] 카카오톡에서 링크 공유 시 미리보기 정상 표시 확인 (배포 후 테스트)

## 테스트 체크리스트

### 메타데이터 확인

- [ ] 브라우저 개발자 도구 → Elements 탭에서 `<meta>` 태그 확인
- [ ] `og:title`, `og:description`, `og:image`, `og:url` 존재 확인
- [ ] `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` 존재 확인

### Open Graph 미리보기 테스트

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 테스트
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) 테스트
- [ ] 카카오톡 링크 공유 시 미리보기 확인

### 개인 정보 보호 확인

- [ ] 회원 대시보드 페이지에 `robots: noindex, nofollow` 설정 확인
- [ ] 수업 상세 페이지에 `robots: noindex, nofollow` 설정 확인
- [ ] Google Search Console에서 인덱싱 제외 확인 (배포 후)

## 참고 사항

- **개인 정보 보호**: 동적 라우트는 모두 `noindex, nofollow`로 설정하여 검색 엔진 크롤링 차단
- **이미지 최적화**: Open Graph 이미지는 1200x630px (1.91:1 비율) 권장
- **SNS 공유**: 카카오톡, 페이스북, 트위터 등에서 링크 공유 시 미리보기가 올바르게 표시되어야 함
- **URL 업데이트**: 배포 후 실제 도메인으로 `url` 필드 업데이트 필요

## 다음 단계

Task 015: 성능 최적화 (이미지 최적화, ISR 캐싱 전략 검토)
