import type { Member } from "@/types/domain";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateDDay } from "@/lib/formatters";

interface MemberProfileCardProps {
  member: Member;
}

/**
 * 회원 프로필 카드 컴포넌트
 * 회원 대시보드 상단에 이름, D-Day, 기본 정보를 TOSS UI 스타일로 표시합니다.
 */
export function MemberProfileCard({ member }: MemberProfileCardProps) {
  const dDay = calculateDDay(member.startDate);

  return (
    <section
      aria-labelledby="member-greeting"
      className="space-y-6 animate-fade-in-up"
    >
      {/* 인사말 섹션 */}
      <div className="space-y-4">
        <h2
          id="member-greeting"
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          {member.name}님,
          <br />
          안녕하세요! 👋
        </h2>

        {/* D-Day Badge */}
        <Badge
          variant="default"
          className="text-base sm:text-lg font-bold px-5 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border-2 border-primary/20 shadow-sm transition-all duration-300 hover:scale-105"
          aria-label={`운동 시작 ${dDay}`}
        >
          운동 시작 {dDay} 💪
        </Badge>
      </div>

      {/* 기본 정보 그리드 */}
      <Card className="border-2 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="grid grid-cols-2 gap-6 p-6">
          {/* 나이 */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">나이</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums">
              {member.age ? `${member.age}세` : "미등록"}
            </p>
          </div>

          {/* 운동 경력 */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              운동 경력
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              {member.experience || "미등록"}
            </p>
          </div>

          {/* 수업 장소 */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              수업 장소
            </p>
            <p className="text-xl sm:text-2xl font-bold">{member.location}</p>
          </div>

          {/* 현재 상태 */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              현재 상태
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              <span
                className={
                  member.status === "진행중"
                    ? "text-primary"
                    : member.status === "홀딩"
                      ? "text-yellow-600 dark:text-yellow-500"
                      : "text-muted-foreground"
                }
              >
                {member.status}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
