import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* 테마 토글 버튼 */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            샐리랑
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Notion을 활용한 PT 운동 기록 열람 서비스
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>서비스 소개</CardTitle>
              <CardDescription>
                코치는 Notion에서 작성만, 회원은 링크 클릭 한 번으로 운동 기록을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div>
                <h3 className="mb-2 font-semibold">코치를 위해</h3>
                <p className="text-sm text-muted-foreground">
                  별도의 관리자 페이지 없이 Notion 앱만으로 모든 회원 데이터를 관리하세요.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">회원을 위해</h3>
                <p className="text-sm text-muted-foreground">
                  복잡한 가입/로그인 없이, 카카오톡으로 받은 링크 클릭 한 번으로 내 운동 기록을 확인하세요.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="https://github.com/your-repo">
                GitHub에서 보기
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/PRD.md" target="_blank">
                PRD 문서 확인
              </Link>
            </Button>
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Next.js 16 + React 19 + TypeScript + TailwindCSS v4 + shadcn/ui
          </p>
        </div>
      </main>
    </div>
  );
}
