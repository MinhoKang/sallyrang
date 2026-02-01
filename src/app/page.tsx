import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <div className='bg-background min-h-screen'>
      {/* 테마 토글 버튼 */}
      <div className='fixed top-4 right-4 z-50'>
        <ThemeToggle />
      </div>

      <main className='container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16'>
        <div className='max-w-2xl text-center'>
          <h1 className='mb-4 text-5xl font-bold tracking-tight'>샐리랑</h1>
          <p className='text-muted-foreground mb-8 text-xl'>
            Notion을 활용한 PT 운동 기록 열람 서비스
          </p>
        </div>
      </main>
    </div>
  );
}
