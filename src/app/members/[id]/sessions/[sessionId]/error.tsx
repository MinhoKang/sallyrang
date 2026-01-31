"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ChevronLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 수업 상세 페이지 에러 바운더리
 */
export default function SessionError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Session page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <p className="text-sm font-medium">오류</p>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">수업 정보를 불러올 수 없습니다</CardTitle>
            <CardDescription className="text-center">
              수업 상세 정보를 불러오는 중 오류가 발생했습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              잠시 후 다시 시도해주세요. 문제가 지속되면 코치에게 문의해주세요.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => window.history.back()}>
              뒤로 가기
            </Button>
            <Button onClick={reset}>다시 시도</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
