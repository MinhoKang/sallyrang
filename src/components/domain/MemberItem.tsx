'use client';

import type { Member } from '@/types/domain';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ClipboardIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface MemberItemProps {
  member: Member;
  /**
   * 레이아웃 모드
   * 'list': 수평 레이아웃 (기본값)
   * 'grid': 수직 카드 레이아웃
   */
  layout?: 'list' | 'grid';
}

/**
 * 개별 회원 카드 컴포넌트
 * 회원 이름, 기본 정보를 표시하고 회원 페이지로 링크합니다.
 */
export function MemberItem({ member, layout = 'list' }: Readonly<MemberItemProps>) {
  const handleCopyUrl = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const memberUrl = `${baseUrl}/members/${member.id}`;

    try {
      await navigator.clipboard.writeText(memberUrl);
      toast.success('URL이 복사되었습니다.');
    } catch {
      toast.error('URL 복사에 실패했습니다.');
    }
  };

  const isListLayout = layout === 'list';

  return (
    <Link href={`/members/${member.id}`} className='group block'>
      <Card className={`border-2 hover:border-primary/50 transition-all duration-300 group-hover:scale-[1.02] hover:shadow-lg ${!isListLayout ? 'h-full' : ''}`}>
        <CardContent className={isListLayout ? 'flex items-center justify-between gap-4 p-5' : 'flex flex-col gap-3 p-5 h-full'}>
          {/* 회원 정보 */}
          <div className={isListLayout ? 'flex-1 space-y-2' : 'w-full space-y-2'}>
            {/* 이름 */}
            <h3 className='group-hover:text-primary text-lg font-bold transition-colors duration-200 sm:text-xl'>
              {member.name} ({member.gender})
            </h3>

            {/* 기본 정보 */}
            <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm'>
              {member.age && (
                <span className='font-medium'>{member.age}세 •</span>
              )}

              <span className='font-medium'>{member.location}</span>

              <span className='text-xs'>•</span>

              <span
                className={
                  member.status === '진행중'
                    ? 'text-primary font-bold'
                    : member.status === '홀딩'
                      ? 'font-bold text-yellow-600 dark:text-yellow-500'
                      : 'text-muted-foreground'
                }
              >
                {member.status}
              </span>
            </div>
            <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm'>
              {/* 시작일 */}
              시작일: <span className='font-medium'>{member.startDate}</span>
            </div>
            <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm'>
              {/* 수업비 */}수업비:{' '}
              <span className='font-medium'>
                {member.tuition.toLocaleString()}원
              </span>
              {/* 총 수업비 */}이번 달 총 수업비:{' '}
              <span className='font-medium'>
                {member.totalTuition.toLocaleString()}원
              </span>
            </div>
            {/* URL 복사 버튼 */}
            <Button
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleCopyUrl();
              }}
            >
              <ClipboardIcon className='size-4' />
              URL 복사
            </Button>
          </div>

          {/* 우측: 화살표 아이콘 (list layout에서만 표시) */}
          {isListLayout && (
            <ChevronRight
              className='text-muted-foreground group-hover:text-primary h-6 w-6 shrink-0 transition-all duration-200 group-hover:translate-x-1'
              aria-hidden='true'
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
