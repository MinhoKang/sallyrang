import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

/**
 * 수업 상세 페이지 로딩 상태
 * TOSS UI 스타일의 스켈레톤 UI
 */
export default function SessionLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b-2 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="icon" disabled className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-6 w-28 rounded-lg" />
          <div className="w-10" aria-hidden="true" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-3xl animate-pulse">
        {/* 제목 */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
          </div>
        </div>

        {/* 블록 렌더링 영역 스켈레톤 */}
        <div className="space-y-4">
          {/* 제목 블록 */}
          <Skeleton className="h-8 w-48 rounded-lg" />

          {/* 본문 블록 */}
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-11/12 rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />

          {/* 리스트 블록 */}
          <div className="space-y-2 ml-5">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>

          {/* 이미지 블록 */}
          <Card className="border-2">
            <Skeleton className="w-full aspect-video rounded-t-lg" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-32 rounded mx-auto" />
            </CardContent>
          </Card>

          {/* 추가 본문 */}
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>

        {/* 피드백 섹션 스켈레톤 */}
        <Card className="border-2 border-accent/30 bg-accent/5">
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
