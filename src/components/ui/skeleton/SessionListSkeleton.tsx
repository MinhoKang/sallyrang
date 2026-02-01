import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 수업 리스트 영역 스켈레톤 UI
 * Suspense fallback으로 사용
 */
export function SessionListSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      {/* 섹션 타이틀 */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40 rounded-lg" />
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>

      {/* 수업 카드 스켈레톤 */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="border-2">
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-6 w-40 rounded" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12 rounded-md" />
                  <Skeleton className="h-5 w-14 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
