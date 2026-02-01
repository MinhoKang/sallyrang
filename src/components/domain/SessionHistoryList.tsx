'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Session } from '@/types/domain';
import { SessionHistoryItem } from './SessionHistoryItem';

interface SessionHistoryListProps {
  readonly sessions: Session[];
  readonly memberId: string;
}

/**
 * 가상화된 수업 리스트 컴포넌트
 * 대량의 수업 기록을 효율적으로 렌더링합니다.
 * @tanstack/react-virtual을 사용하여 뷰포트 내 아이템만 렌더링
 */
export function SessionHistoryList({
  sessions,
  memberId,
}: Readonly<SessionHistoryListProps>) {
  console.log('sessions', sessions);
  const parentRef = useRef<HTMLDivElement>(null);

  // 날짜 기준 최신순 정렬
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // TanStack Virtual을 사용한 가상화 설정
  const virtualizer = useVirtualizer({
    count: sortedSessions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // 평균 아이템 높이 (Card + padding 포함)
    overscan: 5, // 뷰포트 밖 미리 렌더링 아이템 수
  });

  if (sortedSessions.length === 0) {
    return (
      <div className='px-4 py-16 text-center'>
        <p className='text-muted-foreground text-lg'>
          아직 등록된 수업이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby='session-history-title' className='space-y-6'>
      {/* 섹션 타이틀 */}
      <div className='flex items-center justify-between'>
        <h2
          id='session-history-title'
          className='text-2xl font-bold sm:text-3xl'
        >
          내 운동 기록 📋
        </h2>
        <span className='text-muted-foreground bg-muted rounded-lg px-3 py-1.5 text-sm font-semibold'>
          총 {sortedSessions.length}회
        </span>
      </div>

      {/* 가상화된 수업 리스트 */}
      <div
        ref={parentRef}
        className='h-[1000px] overflow-auto'
        style={{
          contain: 'strict',
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const session = sortedSessions[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className='px-4 pb-3'>
                  <SessionHistoryItem session={session} memberId={memberId} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
