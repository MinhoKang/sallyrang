import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 관리자 대시보드 로딩 상태
 * 회원 리스트 로딩 스켈레톤 UI
 */
export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-20 border-b-2 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <Skeleton className="h-7 w-48 rounded-lg" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-6 max-w-4xl">
        {/* 로그아웃 버튼 영역 */}
        <div className="flex justify-end">
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>

        {/* 검색 폼 영역 */}
        <Card className="border-2">
          <CardContent className="p-6">
            <Skeleton className="h-10 w-full rounded-lg" />
          </CardContent>
        </Card>

        {/* 회원 리스트 스켈레톤 */}
        <div className="space-y-3 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-2">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                {/* 회원 정보 */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-3 w-32 rounded" />
                    </div>
                  </div>
                </div>

                {/* 메타 정보 */}
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-20 rounded ml-auto" />
                  <Skeleton className="h-3 w-16 rounded ml-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
