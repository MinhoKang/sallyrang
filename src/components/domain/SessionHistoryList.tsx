import type { Session } from '@/types/domain';
import { SessionHistoryItem } from './SessionHistoryItem';

interface SessionHistoryListProps {
  sessions: Session[];
  memberId: string;
}

/**
 * 수업 리스트 컴포넌트
 * 회원의 모든 수업 기록을 리스트로 표시합니다.
 */
export function SessionHistoryList({
  sessions,
  memberId,
}: SessionHistoryListProps) {
  // 날짜 기준 최신순 정렬
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedSessions.length === 0) {
    return (
      <div className='px-4 py-16 text-center'>
        <p className='text-muted-foreground text-lg'>
          아직 등록된 수업이 없습니다.
        </p>
      </div>
    );
  }

  console.log(sessions);
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

      {/* 수업 리스트 */}
      <div className='space-y-3'>
        {sortedSessions.map((session, index) => (
          <SessionHistoryItem
            key={session.id}
            session={session}
            memberId={memberId}
            animationDelay={index * 50} // 50ms씩 지연 (staggered reveal)
          />
        ))}
      </div>
    </section>
  );
}
