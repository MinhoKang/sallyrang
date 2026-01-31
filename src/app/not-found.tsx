import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

/**
 * 404 Not Found 페이지
 * - 존재하지 않는 URL 접근 시 표시
 * - TOSS UI 스타일: 큰 타이포그래피, 명확한 액션 버튼
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* 공통 헤더 */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl font-bold">샐리랑</h1>
        </div>
      </header>

      {/* Not Found 콘텐츠 */}
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="max-w-md">
          <CardHeader>
            {/* 아이콘 */}
            <div className="mb-4 flex justify-center">
              <FileQuestion className="h-16 w-16 text-muted-foreground" strokeWidth={1.5} />
            </div>
            {/* 404 숫자 강조 */}
            <div className="mb-2 text-center text-6xl font-bold">404</div>
            <CardTitle className="text-center">페이지를 찾을 수 없습니다</CardTitle>
            <CardDescription className="text-center">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              올바른 링크를 확인하시거나 홈으로 돌아가주세요.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
