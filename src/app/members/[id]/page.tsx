import { Suspense } from "react";
import { getMember } from "@/lib/notion";
import { Separator } from "@/components/ui/separator";
import { MemberProfile } from "@/components/domain/async/MemberProfile";
import { SessionList } from "@/components/domain/async/SessionList";
import { ProfileSkeleton } from "@/components/ui/skeleton/ProfileSkeleton";
import { SessionListSkeleton } from "@/components/ui/skeleton/SessionListSkeleton";

interface MemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 회원 전용 대시보드 페이지
 * URL: /members/[id]
 *
 * @description
 * - Suspense 기반 점진적 렌더링으로 성능 최적화
 * - 프로필과 수업 리스트를 독립적으로 스트리밍
 * - UUID 기반 보안 접근 제어
 * - TOSS UI 스타일 적용
 */
export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b-2 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            샐리랑 💪
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
        {/* 프로필 영역 - Suspense로 독립적 스트리밍 */}
        <Suspense fallback={<ProfileSkeleton />}>
          <MemberProfile id={id} />
        </Suspense>

        {/* 구분선 */}
        <Separator className="my-8" />

        {/* 수업 리스트 영역 - Suspense로 독립적 스트리밍 */}
        <Suspense fallback={<SessionListSkeleton />}>
          <SessionList memberId={id} />
        </Suspense>
      </main>
    </div>
  );
}

/**
 * 동적 메타데이터 생성 (개인 정보 보호)
 */
export async function generateMetadata({ params }: MemberPageProps) {
  const { id } = await params;

  try {
    const member = await getMember(id);

    return {
      title: `${member.name}님의 운동 기록 - 샐리랑`,
      description: `${member.name}님의 개인 PT 운동 기록을 확인하세요`,
      robots: "noindex, nofollow", // 개인 정보 보호

      // Open Graph 메타데이터
      openGraph: {
        title: `${member.name}님의 운동 기록`,
        description: `${member.name}님의 개인 PT 운동 기록`,
        siteName: "샐리랑",
        locale: "ko_KR",
        type: "profile",
        images: [
          {
            url: "/og-image.svg",
            width: 1200,
            height: 630,
            alt: `${member.name}님의 운동 기록`,
          },
        ],
      },

      // Twitter Card 메타데이터
      twitter: {
        card: "summary",
        title: `${member.name}님의 운동 기록`,
        description: `${member.name}님의 개인 PT 운동 기록`,
        images: ["/og-image.svg"],
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
