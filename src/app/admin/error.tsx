"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 관리자 대시보드 에러 바운더리
 * TOSS UI 스타일의 에러 화면
 */
export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 모니터링 서비스로 전송)
    console.error("Admin page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b-2 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            관리자 대시보드 🛠️
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="max-w-md border-2 shadow-lg animate-fade-in-up">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              관리자 페이지 오류
            </CardTitle>
            <CardDescription className="text-base mt-2">
              회원 정보를 불러오는 중 문제가 발생했습니다.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              잠시 후 다시 시도해주세요.
              <br />
              문제가 지속되면 홈으로 이동 후 다시 접근해주세요.
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
              onClick={() => reset()}
              className="w-full sm:w-auto"
            >
              다시 시도
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
