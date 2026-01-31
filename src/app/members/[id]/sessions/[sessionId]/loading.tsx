import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

/**
 * 수업 상세 페이지 로딩 상태
 */
export default function SessionLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Button variant="ghost" size="icon" disabled>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-5 w-24" />
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <Skeleton className="mb-8 h-10 w-64" />

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
