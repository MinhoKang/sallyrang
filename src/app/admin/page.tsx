import { notFound } from 'next/navigation';
import { AdminContent } from '@/components/domain/AdminContent';
import { getAllMembers } from '@/lib/notion';

/**
 * 관리자 대시보드 페이지 (Server Component)
 * URL: /admin
 *
 * @description
 * - Notion API를 통해 모든 회원 정보 조회
 * - SessionStorage 기반 비밀번호 인증
 * - 인증 후 회원 목록 조회 및 검색 기능 제공
 */
export default async function AdminPage() {
  try {
    const members = await getAllMembers();

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

        {/* Content */}
        <AdminContent members={members} />
      </div>
    );
  } catch (error) {
    console.error('Error loading admin page:', error);
    notFound();
  }
}

/**
 * 동적 메타데이터 생성 (개인 정보 보호)
 */
export async function generateMetadata() {
  return {
    title: '관리자 대시보드 - 샐리랑',
    description: '회원 목록 관리 페이지',
    robots: 'noindex, nofollow', // 검색 엔진 크롤링 차단
  };
}
