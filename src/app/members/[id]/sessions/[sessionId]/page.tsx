import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

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

  // TODO: Notion API를 통해 실제 데이터 페칭 구현
  // const session = await getSession(sessionId);

  // 임시 데이터 (개발 중)
  const session = {
    title: "250131 등운동",
    date: "2025.01.31",
    content: "수업 내용을 불러오는 중...",
  };

  if (!session) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/members/${id}`}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm font-medium">{session.date}</p>
          <div className="w-10" /> {/* 균형을 위한 여백 */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{session.title}</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Notion 블록 렌더링 영역
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Notion API 연동 후 수업 상세 내용(루틴, 피드백, 이미지 등)이 여기에 표시됩니다.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/**
 * 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: SessionPageProps) {
  const { id, sessionId } = await params;

  // TODO: 실제 수업 정보 가져오기
  // const session = await getSession(sessionId);

  return {
    title: "수업 상세 - 샐리랑",
    description: "운동 수업 상세 기록",
    robots: "noindex, nofollow",
  };
}
