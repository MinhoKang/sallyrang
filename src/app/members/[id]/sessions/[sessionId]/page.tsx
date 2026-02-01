import { notFound } from "next/navigation";
import { SessionDetailHeader } from "@/components/domain/SessionDetailHeader";
import { NotionBlockRenderer } from "@/components/domain/NotionBlockRenderer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/notion";
import { MessageSquare, Image as ImageIcon } from "lucide-react";

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
 * - Notion API를 통해 수업 상세 정보 및 블록 조회
 * - Notion 블록 렌더링 (텍스트, 제목, 이미지)
 * - 뒤로가기 버튼으로 대시보드 복귀
 */
export default async function SessionPage({ params }: SessionPageProps) {
  const { id, sessionId } = await params;

  try {
    const session = await getSession(sessionId);

    // 세션이 없으면 404 표시
    if (!session) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <SessionDetailHeader date={session.date} title={session.title} />

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-3xl">
          {/* 제목 */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {session.title}
            </h1>

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="text-sm font-semibold px-3 py-1.5"
              >
                {session.sequence}회차
              </Badge>

              {session.feedback && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>피드백 있음</span>
                </div>
              )}

              {session.images && session.images.length > 0 && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                  <span>{session.images.length}개</span>
                </div>
              )}
            </div>
          </div>

          {/* Notion 블록 렌더링 */}
          <NotionBlockRenderer blocks={session.blocks} />

          {/* 피드백 섹션 (블록과 별도로 강조) */}
          {session.feedback && (
            <Card
              className="border-2 border-accent/30 bg-accent/5 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold">코치 피드백</h2>
                </div>
                <p className="text-base leading-relaxed">{session.feedback}</p>
              </CardContent>
            </Card>
          )}

          {/* 비고 섹션 */}
          {session.note && (
            <Card
              className="border-2 animate-fade-in-up"
              style={{ animationDelay: "250ms" }}
            >
              <CardContent className="p-5 space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  비고
                </h3>
                <p className="text-base">{session.note}</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error(`Error loading session page for ID ${sessionId}:`, error);
    notFound();
  }
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: SessionPageProps) {
  const { id, sessionId } = await params;

  try {
    const session = await getSession(sessionId);
    return {
      title: `${session.title} - 샐리랑`,
      description: `${session.date} 운동 수업 상세 기록`,
      robots: "noindex, nofollow",
    };
  } catch {
    return {
      title: "운동 기록 - 샐리랑",
      description: "운동 수업 상세 기록",
      robots: "noindex, nofollow",
    };
  }
}
