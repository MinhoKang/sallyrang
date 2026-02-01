import { notFound } from "next/navigation";
import { MemberProfileCard } from "@/components/domain/MemberProfileCard";
import { SessionHistoryList } from "@/components/domain/SessionHistoryList";
import { getMember, getSessions } from "@/lib/notion";
import { Separator } from "@/components/ui/separator";

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
 * - Notion API를 통해 회원 정보 및 수업 목록 조회
 * - UUID 기반 보안 접근 제어
 * - TOSS UI 스타일 적용
 */
export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  try {
    const [member, sessions] = await Promise.all([
      getMember(id),
      getSessions(id),
    ]);

    // 회원이 없으면 404 표시
    if (!member) {
      notFound();
    }

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
          {/* 프로필 영역 */}
          <MemberProfileCard member={member} />

          {/* 구분선 */}
          <Separator className="my-8" />

          {/* 수업 리스트 영역 */}
          <SessionHistoryList sessions={sessions} memberId={member.id} />
        </main>
      </div>
    );
  } catch (error) {
    console.error(`Error loading member page for ID ${id}:`, error);
    notFound();
  }
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
      description: "개인 운동 기록 열람 서비스",
      robots: "noindex, nofollow", // 검색 엔진 크롤링 차단
    };
  } catch {
    return {
      title: "운동 기록 - 샐리랑",
      description: "개인 운동 기록 열람 서비스",
      robots: "noindex, nofollow",
    };
  }
}
