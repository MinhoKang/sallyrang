import { ThemeToggle } from '@/components/ui/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';

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
            샐리와 함께하는 우당탕탕 운동 여정
          </p>
        </div>
        {/* Sally 캐릭터 이미지  */}
        <Link href='/admin'>
          <Image
            src='/images/characters/sally-removebg-preview.png'
            alt='Sally'
            width={500}
            height={500}
            className='rounded-lg'
          />
        </Link>
      </main>
    </div>
  );
}
