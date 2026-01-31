"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 회원 대시보드 에러 바운더리
 */
export default function MemberError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 모니터링 서비스로 전송)
    console.error("Member page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl font-bold">샐리랑</h1>
        </div>
      </header>

      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">문제가 발생했습니다</CardTitle>
            <CardDescription className="text-center">
              회원 정보를 불러오는 중 오류가 발생했습니다.
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
