'use server';

import { revalidatePath } from 'next/cache';
import { notion } from '@/lib/notion';

/**
 * 수업 댓글(메모) 업데이트
 * Notion API를 통해 Session의 Comment 필드를 업데이트합니다.
 *
 * @param sessionId - Notion 수업 페이지 ID
 * @param comment - 사용자가 입력한 댓글 (최대 2000자)
 * @param memberId - Notion 회원 페이지 ID (캐시 무효화용)
 * @returns { success: boolean; error?: string }
 */
export async function updateSessionComment(
  sessionId: string,
  comment: string,
  memberId: string
) {
  // 입력 검증
  if (!sessionId || !memberId) {
    return { success: false, error: '잘못된 요청입니다.' };
  }

  if (comment.length > 2000) {
    return { success: false, error: '댓글은 2000자를 초과할 수 없습니다.' };
  }

  try {
    // Notion API를 통해 Comment 필드 업데이트
    await notion.pages.update({
      page_id: sessionId,
      properties: {
        Comment: {
          rich_text: comment.trim()
            ? [{ type: 'text', text: { content: comment.trim() } }]
            : [],
        },
      },
    });

    // ISR 캐시 무효화 (즉시 반영)
    revalidatePath(`/members/${memberId}/sessions/${sessionId}`);
    revalidatePath(`/members/${memberId}`);

    return { success: true };
  } catch (error) {
    console.error('Failed to update session comment:', error);

    // Rate Limit 에러 처리
    if (error instanceof Error && error.message.includes('rate_limited')) {
      return { success: false, error: '잠시 후 다시 시도해주세요.' };
    }

    // 일반 에러 처리
    return { success: false, error: '댓글 저장에 실패했습니다.' };
  }
}
