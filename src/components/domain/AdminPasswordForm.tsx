'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ADMIN_PASSWORD = '250204';

/**
 * 관리자 비밀번호 인증 폼 컴포넌트
 * 비밀번호를 입력받아 sessionStorage에 저장하고 페이지를 새로고침합니다.
 */
export function AdminPasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 폼 제출 핸들러
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('비밀번호를 입력해주세요');
      return;
    }

    setIsLoading(true);

    if (password === ADMIN_PASSWORD) {
      // 비밀번호 정상 - sessionStorage에 저장 후 페이지 새로고침
      sessionStorage.setItem('adminAuth', 'true');
      toast.success('인증 성공했습니다!');

      // 약간의 지연 후 새로고침 (토스트 메시지 표시 시간)
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      // 비밀번호 오류
      setError('비밀번호가 올바르지 않습니다');
      toast.error('비밀번호 오류');
      setPassword('');
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md border-2 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            관리자 페이지
          </CardTitle>
          <CardDescription className="text-base">
            회원 목록에 접근하려면 비밀번호를 입력해주세요
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 비밀번호 입력 필드 */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-10 text-base"
                autoComplete="current-password"
                aria-invalid={!!error}
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* 제출 버튼 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full text-base font-semibold"
            >
              {isLoading ? '인증 중...' : '인증'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
