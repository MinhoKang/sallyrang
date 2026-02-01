'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateSessionComment } from '@/app/members/[id]/sessions/[sessionId]/actions';

interface SessionCommentFormProps {
  /** Notion 수업 페이지 ID */
  sessionId: string;
  /** Notion 회원 페이지 ID */
  memberId: string;
  /** 기존 댓글 (초기값) */
  initialComment?: string;
}

/**
 * 수업 댓글(메모) 입력/수정 폼 컴포넌트
 * 사용자가 운동에 대한 메모를 작성하고 저장할 수 있습니다.
 *
 * @description
 * - Comment 없음: textarea + 저장 버튼
 * - Comment 있음: 일반 텍스트 + 수정 버튼
 * - 수정 모드: textarea + 저장/닫기 버튼
 * - useTransition으로 비동기 저장 처리 (UI 블로킹 방지)
 * - toast로 성공/실패 피드백 제공
 * - 2000자 제한 UI 표시
 * - TOSS UI 스타일 적용
 */
export function SessionCommentForm({
  sessionId,
  memberId,
  initialComment = '',
}: SessionCommentFormProps) {
  const [comment, setComment] = useState(initialComment);
  const [isEditing, setIsEditing] = useState(!initialComment);
  const [isPending, startTransition] = useTransition();

  /**
   * 폼 제출 핸들러
   * Server Action을 호출하여 댓글을 저장합니다.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateSessionComment(sessionId, comment, memberId);

      if (result.success) {
        toast.success('댓글이 저장되었습니다!');
      } else {
        toast.error(result.error || '저장 실패');
      }
    });
  }

  /**
   * 수정 모드 진입 핸들러
   */
  function handleEdit() {
    setIsEditing(true);
  }

  /**
   * 수정 모드 닫기 핸들러
   * 초기값으로 되돌리고 수정 모드 종료
   */
  function handleClose() {
    setComment(initialComment);
    setIsEditing(false);
  }

  return (
    <Card
      className='border-2 animate-fade-in-up'
      style={{ animationDelay: '300ms' }}
    >
      <CardHeader>
        <CardTitle className='text-xl font-bold'>나의 피드백</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 수정 모드가 아니고 메모가 있는 경우: 일반 텍스트 표시 */}
        {!isEditing && comment && (
          <div className='space-y-4'>
            <p className='whitespace-pre-wrap text-base leading-relaxed'>
              {comment}
            </p>
            <div className='flex justify-end'>
              <Button
                onClick={handleEdit}
                variant='outline'
                className='font-semibold'
              >
                수정
              </Button>
            </div>
          </div>
        )}

        {/* 수정 모드이거나 메모가 없는 경우: textarea 표시 */}
        {isEditing && (
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* 댓글 입력 필드 */}
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='운동에 대한 메모를 남겨보세요...'
              className='min-h-[120px] text-base'
              disabled={isPending}
              maxLength={2000}
              aria-label='운동 메모'
              autoFocus
            />

            {/* 글자 수 및 버튼 */}
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm text-muted-foreground'>
                {comment.length} / 2000
              </span>
              <div className='flex gap-2'>
                {/* 닫기 버튼 (메모가 있는 경우만 표시) */}
                {initialComment && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleClose}
                    disabled={isPending}
                    className='font-semibold'
                  >
                    닫기
                  </Button>
                )}
                {/* 저장 버튼 */}
                <Button
                  type='submit'
                  disabled={isPending}
                  className='font-semibold'
                  aria-busy={isPending}
                >
                  {isPending ? '저장 중...' : '저장'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
