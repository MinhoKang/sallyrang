import { getSessions } from "@/lib/notion";
import { SessionHistoryList } from "@/components/domain/SessionHistoryList";

interface SessionListProps {
  memberId: string;
}

/**
 * 수업 리스트 비동기 서버 컴포넌트
 * Suspense로 감싸서 독립적으로 스트리밍
 *
 * @description
 * - getSessions() API 호출 및 수업 리스트 렌더링
 * - 프로필 정보와 독립적으로 로딩 가능
 */
export async function SessionList({ memberId }: SessionListProps) {
  const sessions = await getSessions(memberId);

  return <SessionHistoryList sessions={sessions} memberId={memberId} />;
}
