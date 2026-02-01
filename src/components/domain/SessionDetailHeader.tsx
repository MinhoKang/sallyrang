"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/formatters";

interface SessionDetailHeaderProps {
  date: string;
  title: string;
}

/**
 * 수업 상세 페이지 헤더
 * 뒤로가기 버튼과 날짜를 표시합니다.
 */
export function SessionDetailHeader({
  date,
  title,
}: SessionDetailHeaderProps) {
  const router = useRouter();
  const formattedDate = formatDate(date);

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b-2 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-primary/10 hover:text-primary transition-colors rounded-xl"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* 날짜 */}
        <time
          dateTime={date}
          className="text-lg sm:text-xl font-bold tabular-nums flex-1 text-center"
        >
          {formattedDate}
        </time>

        {/* 균형을 위한 여백 (뒤로가기 버튼과 동일한 너비) */}
        <div className="w-10" aria-hidden="true" />
      </div>
    </header>
  );
}
