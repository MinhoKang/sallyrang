import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 회원 프로필 영역 스켈레톤 UI
 * Suspense fallback으로 사용
 */
export function ProfileSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      {/* 인사말 */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-72 rounded-lg" />
        <Skeleton className="h-11 w-48 rounded-xl" />
      </div>

      {/* 기본 정보 그리드 */}
      <Card className="border-2">
        <CardContent className="grid grid-cols-2 gap-6 p-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-7 w-24 rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
