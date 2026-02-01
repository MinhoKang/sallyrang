'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface SessionDetailHeaderProps {
  readonly date: string;
}

/**
 * 수업 상세 페이지 헤더
 * 뒤로가기 버튼과 날짜를 표시합니다.
 */
export function SessionDetailHeader({ date }: SessionDetailHeaderProps) {
  const router = useRouter();
  const formattedDate = formatDate(date);

  return (
    <header className='container mx-auto max-w-3xl sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b-2 px-4 py-4 animate-fade-in sm:px-6'>
      <div className='flex items-center justify-between gap-4'>
        {/* 뒤로가기 버튼 */}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.back()}
          className='hover:bg-primary/10 hover:text-primary rounded-xl transition-colors'
          aria-label='뒤로가기'
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>

        {/* 날짜 */}
        <time
          dateTime={date}
          className='flex-1 text-center text-lg font-bold tabular-nums sm:text-xl'
        >
          {formattedDate}
        </time>

        {/* 테마 토글 버튼 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
