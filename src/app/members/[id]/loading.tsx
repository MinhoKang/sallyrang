import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 회원 대시보드 로딩 상태
 */
export default function MemberLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <Skeleton className="h-6 w-20" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        {/* 프로필 영역 */}
        <div className="mb-8">
          <Skeleton className="mb-4 h-10 w-64" />
          <Skeleton className="mb-4 h-7 w-40" />

          <Card>
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="mb-2 h-4 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 수업 리스트 영역 */}
        <div>
          <Skeleton className="mb-4 h-8 w-32" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
