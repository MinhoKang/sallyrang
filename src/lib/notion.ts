import { Client } from '@notionhq/client';
import type {
  Member,
  Session,
  SessionDetail,
  RichTextSegment,
  NotionBlockData,
} from '@/types/domain';
import type {
  NotionMemberPage,
  NotionSessionPage,
  NotionBlock,
  NotionTitle,
  NotionRichText,
  NotionDate,
  NotionNumber,
  NotionSelect,
  NotionRichTextItem,
} from '@/types/notion';
import { NotionBlockType } from '@/types/domain';

/**
 * Notion API 클라이언트 초기화
 * 환경 변수에서 API 키를 가져와 클라이언트를 생성합니다.
 */
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/**
 * Notion Database IDs
 * Members DB와 Sessions DB의 ID를 환경 변수에서 가져옵니다.
 */
export const NOTION_MEMBERS_DB_ID = process.env.NOTION_MEMBERS_DB_ID || '';
export const NOTION_SESSIONS_DB_ID = process.env.NOTION_SESSIONS_DB_ID || '';

/**
 * Rich Text 배열을 RichTextSegment[] 로 변환
 * @param richTextArray - Notion API의 rich_text 배열
 * @returns 렌더링 가능한 RichTextSegment 배열
 */
function parseRichText(richTextArray: NotionRichTextItem[]): RichTextSegment[] {
  return richTextArray.map((richText) => {
    // RichTextItemResponse는 다양한 타입의 union이므로, 각 타입별로 처리
    const textContent = (() => {
      // text 타입의 rich text
      if ('text' in richText && richText.text?.content) {
        return richText.text.content;
      }
      // mention 타입의 rich text
      if ('mention' in richText) {
        return richText.plain_text || '';
      }
      // equation 타입의 rich text
      if ('equation' in richText) {
        return richText.plain_text || '';
      }
      // 기본값
      return richText.plain_text || '';
    })();

    // 링크 정보 추출 (text 타입에만 있음)
    const href = (() => {
      if ('text' in richText) {
        return richText.text?.link?.url || undefined;
      }
      if ('href' in richText) {
        return richText.href || undefined;
      }
      return undefined;
    })();

    const styles = {
      bold: richText.annotations?.bold || false,
      italic: richText.annotations?.italic || false,
      strikethrough: richText.annotations?.strikethrough || false,
      underline: richText.annotations?.underline || false,
      code: richText.annotations?.code || false,
    };

    return {
      text: textContent,
      styles,
      ...(href && { href }),
    };
  });
}

/**
 * Notion Title 필드에서 텍스트 추출
 */
function extractTitleText(titleProperty: NotionTitle): string {
  const titleArray = titleProperty.title || [];
  return titleArray.map((t) => t.plain_text || '').join('');
}

/**
 * Notion Rich Text 필드에서 텍스트 추출
 */
function extractRichText(richTextProperty: NotionRichText): string {
  const richTextArray = richTextProperty.rich_text || [];
  return richTextArray.map((t) => t.plain_text || '').join('');
}

/**
 * Notion Date 필드에서 날짜 추출
 */
function extractDate(dateProperty: NotionDate): string {
  return dateProperty.date?.start || '';
}

/**
 * Notion Number 필드에서 숫자 추출
 */
function extractNumber(numberProperty: NotionNumber): number {
  return numberProperty.number || 0;
}

/**
 * Notion Select 필드에서 값 추출
 */
function extractSelect(selectProperty: NotionSelect): string {
  return selectProperty.select?.name || '';
}

/**
 * Notion Member 페이지를 도메인 Member 모델로 변환
 * @param page - Notion 회원 페이지
 * @returns 도메인 Member 객체
 */
function parseMemberData(page: NotionMemberPage): Member {
  return {
    id: page.id,
    name: extractTitleText(page.properties.Name),
    age: extractNumber(page.properties.Age) || undefined,
    experience: extractRichText(page.properties.Experience) || undefined,
    gender: extractSelect(page.properties.Gender),
    location: extractSelect(page.properties.Location),
    startDate: extractDate(page.properties.StartDate),
    status: extractSelect(page.properties.Status),
    tuition: extractNumber(page.properties.Tuition),
    totalTuition: extractNumber(page.properties.TotalTuition),
    url: page.url,
  };
}

/**
 * Notion Session 페이지 배열을 도메인 Session[] 모델로 변환
 * @param pages - Notion 세션 페이지 배열
 * @returns 도메인 Session[] 배열
 */
function parseSessionsData(pages: NotionSessionPage[]): Session[] {
  return pages.map((page) => ({
    id: page.id,
    title: extractTitleText(page.properties.Title),
    date: extractDate(page.properties.Date),
    sequence: extractRichText(page.properties.Sequence),
    status: extractSelect(page.properties.Status),
    feedback: extractRichText(page.properties.Feedback) || undefined,
    note: extractRichText(page.properties.Note) || undefined,
    images: [], // 파일은 별도로 처리 (현재는 빈 배열)
  }));
}

/**
 * 블록에서 리치 텍스트 배열 추출
 */
function getBlockRichText(block: NotionBlock): NotionRichTextItem[] {
  // BlockObjectResponse에서 각 블록 타입에 해당하는 데이터 추출
  const blockTypeData =
    block[
      block.type as keyof Omit<
        typeof block,
        | 'type'
        | 'id'
        | 'parent'
        | 'created_time'
        | 'last_edited_time'
        | 'created_by'
        | 'last_edited_by'
        | 'has_children'
        | 'archived'
      >
    ];

  if (
    blockTypeData &&
    typeof blockTypeData === 'object' &&
    'rich_text' in blockTypeData
  ) {
    return (
      (blockTypeData as { rich_text: NotionRichTextItem[] }).rich_text || []
    );
  }

  return [];
}

/**
 * 이미지 블록에서 URL 추출
 */
function extractImageUrl(block: NotionBlock): string | undefined {
  if (block.type !== 'image') return undefined;

  const imageData = block.image as {
    type: string;
    external?: { url: string };
    file?: { url: string };
  };
  if (!imageData) return undefined;

  return imageData.type === 'external'
    ? imageData.external?.url
    : imageData.type === 'file'
      ? imageData.file?.url
      : undefined;
}

/**
 * 이미지 블록에서 캡션 추출
 */
function extractImageCaption(block: NotionBlock): string | undefined {
  if (block.type !== 'image') return undefined;

  const imageData = block.image as { caption?: NotionRichTextItem[] };
  const caption = imageData?.caption?.map((c) => c.plain_text || '').join('');

  return caption || undefined;
}

/**
 * 코드 블록에서 언어 추출
 */
function extractCodeLanguage(block: NotionBlock): string | undefined {
  if (block.type !== 'code') return undefined;

  const codeData = block.code as { language?: string };
  return codeData?.language || undefined;
}

/**
 * Notion 블록 배열을 렌더링 가능한 NotionBlockData[] 로 변환
 * @param blocks - Notion 블록 배열
 * @returns 렌더링 가능한 NotionBlockData 배열
 */
function parseBlocksData(blocks: NotionBlock[]): NotionBlockData[] {
  return blocks
    .map((block): NotionBlockData | null => {
      const baseId = block.id;

      // 블록 타입별 처리
      switch (block.type) {
        case 'paragraph':
          return {
            id: baseId,
            type: NotionBlockType.PARAGRAPH,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'heading_1':
          return {
            id: baseId,
            type: NotionBlockType.HEADING_1,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'heading_2':
          return {
            id: baseId,
            type: NotionBlockType.HEADING_2,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'heading_3':
          return {
            id: baseId,
            type: NotionBlockType.HEADING_3,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'bulleted_list_item':
          return {
            id: baseId,
            type: NotionBlockType.BULLETED_LIST_ITEM,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'numbered_list_item':
          return {
            id: baseId,
            type: NotionBlockType.NUMBERED_LIST_ITEM,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'image':
          return {
            id: baseId,
            type: NotionBlockType.IMAGE,
            content: [],
            imageUrl: extractImageUrl(block),
            caption: extractImageCaption(block),
          };

        case 'callout':
          return {
            id: baseId,
            type: NotionBlockType.CALLOUT,
            content: parseRichText(getBlockRichText(block)),
          };

        case 'code':
          return {
            id: baseId,
            type: NotionBlockType.CODE,
            content: parseRichText(getBlockRichText(block)),
            language: extractCodeLanguage(block),
          };

        case 'toggle':
          return {
            id: baseId,
            type: NotionBlockType.TOGGLE,
            content: parseRichText(getBlockRichText(block)),
          };

        // 지원하지 않는 블록 타입은 null 반환
        default:
          return null;
      }
    })
    .filter((block): block is NotionBlockData => block !== null);
}

/**
 * Notion Session 페이지와 블록을 SessionDetail로 변환
 * @param page - Notion 세션 페이지
 * @param blocks - Notion 블록 배열
 * @returns 도메인 SessionDetail 객체
 */
function parseSessionDetail(
  page: NotionSessionPage,
  blocks: NotionBlock[]
): SessionDetail {
  // Content 필드 추출 (선택사항: Content 필드가 있는 경우)
  const content =
    page.properties.Content && 'rich_text' in page.properties.Content
      ? extractRichText(page.properties.Content as NotionRichText)
      : undefined;

  return {
    id: page.id,
    title: extractTitleText(page.properties.Title),
    date: extractDate(page.properties.Date),
    sequence: extractRichText(page.properties.Sequence),
    status: extractSelect(page.properties.Status),
    feedback: extractRichText(page.properties.Feedback) || undefined,
    note: extractRichText(page.properties.Note) || undefined,
    images: [],
    blocks: parseBlocksData(blocks),
    content: content,
  };
}

/**
 * ISR 캐싱 설정 (1시간)
 */
export const revalidate = 3600;

/**
 * 회원 정보 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 회원 정보 객체
 */
export async function getMember(memberId: string): Promise<Member> {
  try {
    const response = await notion.pages.retrieve({ page_id: memberId });
    const page = response as NotionMemberPage;
    return parseMemberData(page);
  } catch (error) {
    console.error(`Failed to fetch member ${memberId}:`, error);
    throw new Error(`회원 정보를 조회할 수 없습니다: ${memberId}`);
  }
}

/**
 * 회원의 수업 목록 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 수업 목록 배열 (최신순)
 */
export async function getSessions(memberId: string): Promise<Session[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_SESSIONS_DB_ID,
      filter: {
        property: 'Member',
        relation: {
          contains: memberId,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    } as Parameters<typeof notion.databases.query>[0]);

    const pages = response.results as NotionSessionPage[];
    return parseSessionsData(pages);
  } catch (error) {
    console.error(`Failed to fetch sessions for member ${memberId}:`, error);
    throw new Error(`수업 목록을 조회할 수 없습니다: ${memberId}`);
  }
}

/**
 * 모든 회원 목록 조회
 * @returns 전체 회원 목록 배열 (관리자용)
 */
export async function getAllMembers(): Promise<Member[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_MEMBERS_DB_ID,
    });

    console.log(response);

    const pages = response.results as NotionMemberPage[];
    return pages.map((page) => parseMemberData(page));
  } catch (error) {
    console.error('Failed to fetch all members:', error);
    throw new Error('회원 목록을 조회할 수 없습니다');
  }
}

/**
 * 특정 수업 상세 정보 조회
 * @param sessionId - Notion 수업 페이지 ID
 * @returns 수업 상세 정보 객체 (블록 포함)
 */
export async function getSession(sessionId: string): Promise<SessionDetail> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: sessionId,
    })) as NotionSessionPage;

    console.log(`[Notion] Fetching blocks for session ${sessionId}`);

    const blocksResponse = await notion.blocks.children.list({
      block_id: sessionId,
    });

    console.log(`[Notion] Fetched ${blocksResponse.results.length} blocks`);
    console.log(
      `[Notion] Block types:`,
      blocksResponse.results.map((b) => (b as NotionBlock).type)
    );

    const blocks = blocksResponse.results as NotionBlock[];
    const sessionDetail = parseSessionDetail(page, blocks);

    console.log(`[Notion] Parsed session detail:`, {
      id: sessionDetail.id,
      title: sessionDetail.title,
      blocksCount: sessionDetail.blocks.length,
      blockTypes: sessionDetail.blocks.map((b) => b.type),
    });

    return sessionDetail;
  } catch (error) {
    console.error(`Failed to fetch session ${sessionId}:`, error);
    throw new Error(`수업 상세 정보를 조회할 수 없습니다: ${sessionId}`);
  }
}
