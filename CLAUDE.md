# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 명령어

```bash
npm run dev      # 개발 서버 시작 (포트 3000)
npm run build    # 프로덕션 빌드 생성
npm start        # 프로덕션 빌드 실행
npm run lint     # ESLint 실행
```

## 아키텍처

Next.js 16 스타터 킷으로 App Router와 shadcn/ui 컴포넌트를 사용합니다.

**기술 스택:**
- Next.js 16 + React 19 (App Router, 기본적으로 Server Components)
- TypeScript (strict 모드)
- Tailwind CSS v4 (CSS 변수로 테마 관리)
- shadcn/ui 컴포넌트 (new-york 스타일, Radix UI 기반)
- react-hook-form + zod (폼 처리 및 유효성 검사)
- next-themes (다크/라이트 모드)
- Sonner (토스트 알림)
- Lucide React (아이콘)

**주요 디렉토리:**
- `src/app/` - App Router 페이지 및 레이아웃
- `src/components/ui/` - shadcn/ui 컴포넌트
- `src/lib/utils.ts` - 유틸리티 함수 (`cn()` 등)

**import 별칭:** `@/*`는 `./src/*`로 매핑됨

**shadcn/ui 컴포넌트 추가:**
```bash
npx shadcn@latest add <컴포넌트명>
```
