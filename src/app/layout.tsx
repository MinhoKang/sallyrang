import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  // 기본 메타데이터 베이스 URL 설정 (배포 시 실제 도메인으로 변경)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),

  title: '샐리랑',
  description: '샐리와 함께하는 우당탕탕 운동 여정',

  // Open Graph 메타데이터
  openGraph: {
    title: '샐리랑',
    description: '샐리와 함께하는 우당탕탕 운동 여정',
    siteName: '샐리랑',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/sally-removebg-preview.svg',
        width: 1200,
        height: 630,
        alt: '샐리랑',
      },
    ],
  },

  // Twitter Card 메타데이터
  twitter: {
    card: 'summary_large_image',
    title: '샐리랑',
    description: '샐리와 함께하는 우당탕탕 운동 여정',
    images: ['/sally-removebg-preview.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        {/* DNS prefetch 및 preconnect로 폰트 로딩 최적화 */}
        <link rel='dns-prefetch' href='https://cdn.jsdelivr.net' />
        <link
          rel='preconnect'
          href='https://cdn.jsdelivr.net'
          crossOrigin='anonymous'
        />

        {/* Pretendard Variable 폰트 로드 (Dynamic Subset) */}
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className='antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
