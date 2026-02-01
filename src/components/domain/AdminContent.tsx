'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Member } from '@/types/domain';
import { AdminPasswordForm } from './AdminPasswordForm';
import { MemberSearchList } from './MemberSearchList';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface AdminContentProps {
  readonly members: Member[];
}

/**
 * 관리자 페이지 콘텐츠 컴포넌트 (Client)
 * sessionStorage에서 인증 상태를 확인하고, 비밀번호 폼 또는 회원 리스트를 렌더링합니다.
 */
export function AdminContent({ members }: Readonly<AdminContentProps>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 마운트 시 sessionStorage에서 인증 상태 확인
   */
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(auth);
    setIsLoading(false);
  }, []);

  /**
   * 로그아웃 핸들러
   */
  function handleLogout() {
    sessionStorage.removeItem('adminAuth');
    toast.success('로그아웃되었습니다');
    window.location.reload();
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary mx-auto" />
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 미인증: 비밀번호 폼
  if (!isAuthenticated) {
    return <AdminPasswordForm />;
  }

  // 인증됨: 회원 리스트
  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8 max-w-4xl">
      {/* 로그아웃 버튼 */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </Button>
      </div>

      {/* 회원 리스트 */}
      <MemberSearchList members={members} />
    </main>
  );
}
