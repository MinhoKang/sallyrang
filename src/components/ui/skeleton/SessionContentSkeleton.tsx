import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 수업 콘텐츠 영역 스켈레톤 UI
 * Suspense fallback으로 사용
 */
export function SessionContentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 제목 영역 */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-16 rounded-lg" />
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>

      {/* 콘텐츠 블록 */}
      <Card className="border-2">
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
          <Skeleton className="h-32 w-full rounded-lg mt-4" />
          <Skeleton className="h-4 w-full rounded mt-4" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </CardContent>
      </Card>

      {/* 피드백 섹션 */}
      <Card className="border-2">
        <CardContent className="space-y-3 p-6">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </CardContent>
      </Card>
    </div>
  );
}
