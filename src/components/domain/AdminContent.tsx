'use client';

import { useState, useEffect, useEffectEvent } from 'react';
import { toast } from 'sonner';
import type { Member } from '@/types/domain';
import { AdminPasswordForm } from './AdminPasswordForm';
import { MemberSearchList } from './MemberSearchList';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

/**
 * 로그아웃 핸들러
 */
function handleLogout() {
  sessionStorage.removeItem('adminAuth');
  toast.success('로그아웃되었습니다');
  window.location.reload();
}

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

  const setAuth = useEffectEvent((auth: boolean) => {
    setIsAuthenticated(auth);
    setIsLoading(false);
  });

  const totalTuition = members.reduce(
    (acc, member) => acc + member.totalTuition,
    0
  );

  console.log(members);

  /**
   * 마운트 시 sessionStorage에서 인증 상태 확인
   */
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth') === 'true';
    setAuth(auth);
  }, []);

  // 로딩 중
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='space-y-4 text-center'>
          <div className='border-muted border-t-primary mx-auto h-8 w-8 animate-spin rounded-full border-4' />
          <p className='text-muted-foreground'>로딩 중...</p>
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
    <main className='container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6'>
      <div className='flex justify-between'>
        {/* 이번 달 총 수업비 */}
        <div className='text-2xl font-bold'>
          이번 달 총 수업비: {totalTuition.toLocaleString()}원
        </div>
        {/* 로그아웃 버튼 */}
        <Button variant='outline' onClick={handleLogout} className='gap-2'>
          <LogOut className='h-4 w-4' />
          로그아웃
        </Button>
      </div>

      {/* 회원 리스트 */}
      <MemberSearchList members={members} />
    </main>
  );
}
