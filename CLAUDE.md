# CLAUDE.md

**샐리랑 (Sallyrang)**은 Notion을 CMS로 활용하여 PT 코치가 관리하는 운동 기록을 회원이 전용 링크를 통해 모바일 웹에서 편하게 열람하는 서비스입니다.

---

## Project Context

- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

---

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 명령어

```bash
npm run dev      # 개발 서버 시작 (포트 3000)
npm run build    # 프로덕션 빌드 생성
npm start        # 프로덕션 빌드 실행
npm run lint     # ESLint 실행
```

## 프로젝트 목적

- **코치:** Notion에서 작성만 하면 자동으로 웹사이트에 반영
- **회원:** 링크 클릭 한 번으로 복잡한 가입 없이 운동 기록 열람

## 아키텍처

Next.js 16 기반 Notion CMS 연동 운동 기록 서비스입니다.

**기술 스택:**
- Next.js 16 + React 19 (App Router, Server Components)
- TypeScript (strict 모드)
- React Compiler (활성화됨)
- Notion API (`@notionhq/client`)
- Tailwind CSS v4 (CSS 변수로 테마 관리)
- shadcn/ui 컴포넌트 (new-york 스타일, Radix UI 기반)
- react-hook-form + zod (폼 처리 및 유효성 검사)
- next-themes (다크/라이트 모드)
- Sonner (토스트 알림)
- Lucide React (아이콘)

**주요 디렉토리:**
- `src/app/` - App Router 페이지 및 레이아웃
- `src/app/members/[id]/` - 회원 대시보드 (Server Component)
- `src/app/members/[id]/sessions/[sessionId]/` - 수업 상세 (Server Component)
- `src/components/ui/` - shadcn/ui 컴포넌트
- `src/components/domain/` - 비즈니스 로직 컴포넌트 (예정)
- `src/lib/notion.ts` - Notion API 연동
- `src/lib/formatters.ts` - 날짜 포맷팅, D-Day 계산
- `src/lib/utils.ts` - 유틸리티 함수 (`cn()` 등)

**import 별칭:** `@/*`는 `./src/*`로 매핑됨

**shadcn/ui 컴포넌트 추가:**
```bash
npx shadcn@latest add <컴포넌트명>
```
