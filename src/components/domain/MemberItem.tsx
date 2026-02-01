import type { Member } from "@/types/domain";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface MemberItemProps {
  member: Member;
}

/**
 * 개별 회원 카드 컴포넌트
 * 회원 이름, 기본 정보를 표시하고 회원 페이지로 링크합니다.
 */
export function MemberItem({ member }: MemberItemProps) {
  return (
    <Link href={`/members/${member.id}`} className="block group">
      <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          {/* 좌측: 회원 정보 */}
          <div className="flex-1 space-y-2">
            {/* 이름 */}
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-200">
              {member.name}
            </h3>

            {/* 기본 정보 */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {member.age && (
                <span className="font-medium">
                  {member.age}세
                </span>
              )}

              <span className="text-xs">•</span>

              <span className="font-medium">
                {member.location}
              </span>

              <span className="text-xs">•</span>

              <span className={
                member.status === "진행중"
                  ? "font-bold text-primary"
                  : member.status === "홀딩"
                    ? "font-bold text-yellow-600 dark:text-yellow-500"
                    : "text-muted-foreground"
              }>
                {member.status}
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
