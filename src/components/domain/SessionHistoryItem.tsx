import type { Session } from "@/types/domain";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import { ChevronRight, CheckCircle2, Clock } from "lucide-react";

interface SessionHistoryItemProps {
  session: Session;
  memberId: string;
  /**
   * 애니메이션 지연 (staggered reveal)
   * 리스트 인덱스에 따라 순차적으로 나타나는 효과
   */
  animationDelay?: number;
}

/**
 * 개별 수업 카드 컴포넌트
 * 수업 날짜, 제목, 상태를 표시하고 상세 페이지로 링크합니다.
 */
export function SessionHistoryItem({
  session,
  memberId,
  animationDelay = 0,
}: SessionHistoryItemProps) {
  const formattedDate = formatDate(session.date);
  const isCompleted = session.status === "완료";

  return (
    <Link
      href={`/members/${memberId}/sessions/${session.id}`}
      className="block group"
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] animate-fade-in">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          {/* 좌측: 날짜 + 제목 */}
          <div className="flex-1 space-y-2">
            {/* 날짜 */}
            <time
              dateTime={session.date}
              className="block text-sm font-semibold text-muted-foreground tabular-nums"
            >
              {formattedDate}
            </time>

            {/* 제목 */}
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-200">
              {session.title}
            </h3>

            {/* 상태 배지 */}
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>완료</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{session.status}</span>
                </div>
              )}

              {/* 회차 번호 */}
              <span className="text-xs font-semibold text-muted-foreground px-2 py-0.5 rounded-md bg-muted">
                {session.sequence}회차
              </span>
            </div>
          </div>

          {/* 우측: 화살표 아이콘 */}
          <ChevronRight
            className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
            aria-hidden="true"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
