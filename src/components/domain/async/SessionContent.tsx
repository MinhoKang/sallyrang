import { notFound } from 'next/navigation';
import { NotionBlockRenderer } from '@/components/domain/NotionBlockRenderer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getSession } from '@/lib/notion';
import { MessageSquare, Image as ImageIcon } from 'lucide-react';

interface SessionContentProps {
  sessionId: string;
}

/**
 * 수업 콘텐츠 비동기 서버 컴포넌트
 * Suspense로 감싸서 독립적으로 스트리밍
 *
 * @description
 * - getSession() API 호출 및 Notion 블록 렌더링
 * - 헤더와 독립적으로 로딩 가능
 */
export async function SessionContent({ sessionId }: SessionContentProps) {
  const session = await getSession(sessionId);

  // 세션이 없으면 404 표시
  if (!session) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      {/* 제목 */}
      <div className='animate-fade-in-up space-y-4'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          {session.title}
        </h1>

        {/* 메타 정보 */}
        <div className='flex flex-wrap items-center gap-3'>
          <Badge
            variant='secondary'
            className='px-3 py-1.5 text-sm font-semibold'
          >
            {session.sequence}회차
          </Badge>

          {session.feedback && (
            <div className='text-muted-foreground flex items-center gap-1.5 text-sm'>
              <MessageSquare className='h-4 w-4' />
              <span>피드백 있음</span>
            </div>
          )}

          {session.images && session.images.length > 0 && (
            <div className='text-muted-foreground flex items-center gap-1.5 text-sm'>
              <ImageIcon className='h-4 w-4' />
              <span>{session.images.length}개</span>
            </div>
          )}
        </div>
      </div>

      {/* Notion 블록 렌더링 또는 Content 텍스트 렌더링 */}
      {session.blocks.length > 0 ? (
        <NotionBlockRenderer blocks={session.blocks} />
      ) : session.content ? (
        <Card
          className='animate-fade-in-up border-2'
          style={{ animationDelay: '100ms' }}
        >
          <CardContent className='space-y-3 p-6'>
            <h2 className='text-xl font-bold'>수업 내용</h2>
            <p className='text-base leading-relaxed whitespace-pre-wrap'>
              {session.content}
            </p>
          </CardContent>
        </Card>
      ) : (
        <NotionBlockRenderer blocks={[]} />
      )}

      {/* 피드백 섹션 (블록과 별도로 강조) */}
      {session.feedback && (
        <Card
          className='border-accent/30 bg-accent/5 animate-fade-in-up border-2'
          style={{ animationDelay: '200ms' }}
        >
          <CardContent className='space-y-3 p-6'>
            <div className='flex items-center gap-2'>
              <MessageSquare className='text-accent h-5 w-5' />
              <h2 className='text-xl font-bold'>코치 피드백</h2>
            </div>
            <p className='text-base leading-relaxed'>{session.feedback}</p>
          </CardContent>
        </Card>
      )}

      {/* 비고 섹션 */}
      {session.note && (
        <Card
          className='animate-fade-in-up border-2'
          style={{ animationDelay: '250ms' }}
        >
          <CardContent className='space-y-2 p-5'>
            <h3 className='text-muted-foreground text-sm font-semibold tracking-wide uppercase'>
              비고
            </h3>
            <p className='text-base'>{session.note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
