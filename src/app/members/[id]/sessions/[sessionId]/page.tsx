import { Suspense } from "react";
import { getSession } from "@/lib/notion";
import { SessionDetailHeader } from "@/components/domain/SessionDetailHeader";
import { SessionContent } from "@/components/domain/async/SessionContent";
import { SessionContentSkeleton } from "@/components/ui/skeleton/SessionContentSkeleton";
import { NotionBlockType } from "@/types/domain";
import type { Metadata } from "next";

interface SessionPageProps {
  params: Promise<{
    id: string;
    sessionId: string;
  }>;
}

/**
 * 수업 상세 페이지
 * URL: /members/[id]/sessions/[sessionId]
 *
 * @description
 * - Suspense 기반 점진적 렌더링으로 성능 최적화
 * - 헤더는 즉시 표시, 콘텐츠는 독립적으로 스트리밍
 * - Notion 블록 렌더링 (텍스트, 제목, 이미지)
 * - 뒤로가기 버튼으로 대시보드 복귀
 */
export default async function SessionPage({ params }: SessionPageProps) {
  const { id, sessionId } = await params;

  // 메타데이터용 세션 정보 (헤더 표시에 필요)
  const session = await getSession(sessionId);

  return (
    <div className="bg-background">
      {/* Sticky Header - 즉시 표시 */}
      {session && <SessionDetailHeader date={session.date} />}

      {/* Main Content - Suspense로 독립적 스트리밍 */}
      <main className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Suspense fallback={<SessionContentSkeleton />}>
          <SessionContent sessionId={sessionId} />
        </Suspense>
      </main>
    </div>
  );
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: SessionPageProps): Promise<Metadata> {
  const { sessionId } = await params;

  try {
    const session = await getSession(sessionId);

    // 이미지 블록이 있으면 첫 번째 이미지 사용, 없으면 기본 이미지
    const ogImage =
      session.blocks.find(
        (b) => b.type === NotionBlockType.IMAGE && b.imageUrl
      )?.imageUrl || '/og-image.svg';

    return {
      title: `${session.title} | ${session.date} - 샐리랑`,
      description: `${session.date} 운동 수업 상세 기록 - ${session.sequence}회차`,
      robots: 'noindex, nofollow', // 개인 정보 보호

      // Open Graph 메타데이터
      openGraph: {
        title: session.title,
        description: `${session.date} 운동 수업 - ${session.sequence}회차`,
        siteName: '샐리랑',
        locale: 'ko_KR',
        type: 'article',
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

      // Twitter Card 메타데이터
      twitter: {
        card: 'summary_large_image',
        title: session.title,
        description: `${session.date} 운동 수업 - ${session.sequence}회차`,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: '운동 기록 - 샐리랑',
      description: '운동 수업 상세 기록',
      robots: 'noindex, nofollow',
    };
  }
}
