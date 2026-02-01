"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 수업 상세 페이지 에러 바운더리
 * TOSS UI 스타일의 에러 화면
 */
export default function SessionError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Session page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b-2 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="hover:bg-primary/10 hover:text-primary transition-colors rounded-xl"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <p className="text-lg sm:text-xl font-bold">오류</p>
          <div className="w-10" aria-hidden="true" />
        </div>
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
        <Card className="max-w-md border-2 shadow-lg animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              수업 정보를 불러올 수 없습니다
            </CardTitle>
            <CardDescription className="text-base mt-2">
              수업 상세 정보를 불러오는 중 오류가 발생했습니다.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              잠시 후 다시 시도해주세요.
              <br />
              문제가 지속되면 코치에게 문의해주세요.
            </p>

            {process.env.NODE_ENV === "development" && error.digest && (
              <p className="mt-4 text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                Error ID: {error.digest}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              뒤로 가기
            </Button>
            <Button onClick={reset} className="w-full sm:w-auto">
              다시 시도
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
