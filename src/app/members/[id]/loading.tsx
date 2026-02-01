import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

/**
 * 회원 대시보드 로딩 상태
 * TOSS UI 스타일의 스켈레톤 UI
 */
export default function MemberLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-20 border-b-2 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <Skeleton className="h-7 w-24 rounded-lg" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
        {/* 프로필 영역 */}
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

        {/* 구분선 */}
        <Separator className="my-8" />

        {/* 수업 리스트 영역 */}
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
      </main>
    </div>
  );
}
