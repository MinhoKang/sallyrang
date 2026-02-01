import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

/**
 * 홈 페이지 로딩 상태
 * 센트럴 히어로 레이아웃에 맞춘 스켈레톤 UI
 */
export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Placeholder */}
      <div className="fixed right-4 top-4 z-50">
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center space-y-6 animate-pulse">
          {/* 제목 */}
          <Skeleton className="mx-auto h-16 w-48 rounded-lg" />

          {/* 설명 */}
          <Skeleton className="mx-auto h-8 w-72 rounded-lg" />

          {/* 서비스 소개 카드 */}
          <Card className="border-2">
            <CardHeader>
              <Skeleton className="h-6 w-32 rounded-lg mb-2" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-5/6 rounded-lg" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 버튼 그룹 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
            <Skeleton className="h-11 w-full sm:w-32 rounded-lg" />
            <Skeleton className="h-11 w-full sm:w-32 rounded-lg" />
          </div>

          {/* 기술 스택 */}
          <Skeleton className="mx-auto h-4 w-96 rounded-lg pt-8" />
        </div>
      </main>
    </div>
  );
}
