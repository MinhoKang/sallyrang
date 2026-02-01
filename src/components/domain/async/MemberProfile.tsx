import { notFound } from "next/navigation";
import { getMember } from "@/lib/notion";
import { MemberProfileCard } from "@/components/domain/MemberProfileCard";

interface MemberProfileProps {
  id: string;
}

/**
 * 회원 프로필 비동기 서버 컴포넌트
 * Suspense로 감싸서 독립적으로 스트리밍
 *
 * @description
 * - getMember() API 호출 및 프로필 렌더링
 * - 에러 발생 시 404 처리
 */
export async function MemberProfile({ id }: MemberProfileProps) {
  const member = await getMember(id);

  // 회원이 없으면 404 표시
  if (!member) {
    notFound();
  }

  return <MemberProfileCard member={member} />;
}
