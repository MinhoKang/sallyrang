import { Client } from "@notionhq/client";
import type {
  Member,
  Session,
  SessionDetail,
  RichTextSegment,
  NotionBlockData,
} from "@/types/domain";
import type { NotionMemberPage, NotionSessionPage, NotionBlock } from "@/types/notion";
import { NotionBlockType } from "@/types/domain";

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
export const NOTION_MEMBERS_DB_ID = process.env.NOTION_MEMBERS_DB_ID || "";
export const NOTION_SESSIONS_DB_ID = process.env.NOTION_SESSIONS_DB_ID || "";

/**
 * Rich Text 배열을 RichTextSegment[] 로 변환
 * @param richTextArray - Notion API의 rich_text 배열
 * @returns 렌더링 가능한 RichTextSegment 배열
 */
function parseRichText(
  richTextArray: Array<{
    type: string;
    text?: { content: string; link: { url: string } | null };
    href?: string | null;
    plain_text: string;
    annotations?: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      code?: boolean;
      color?: string;
    };
  }>
): RichTextSegment[] {
  return richTextArray.map((richText) => {
    const textContent = richText.text?.content || richText.plain_text || "";
    const href = richText.text?.link?.url || richText.href || undefined;

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
function extractTitleText(titleProperty: any): string {
  const titleArray = titleProperty.title || [];
  return titleArray.map((t: any) => t.plain_text || "").join("");
}

/**
 * Notion Rich Text 필드에서 텍스트 추출
 */
function extractRichText(richTextProperty: any): string {
  const richTextArray = richTextProperty.rich_text || [];
  return richTextArray.map((t: any) => t.plain_text || "").join("");
}

/**
 * Notion Date 필드에서 날짜 추출
 */
function extractDate(dateProperty: any): string {
  return dateProperty.date?.start || "";
}

/**
 * Notion Number 필드에서 숫자 추출
 */
function extractNumber(numberProperty: any): number {
  return numberProperty.number || 0;
}

/**
 * Notion Select 필드에서 값 추출
 */
function extractSelect(selectProperty: any): string {
  return selectProperty.select?.name || "";
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
    sequence: extractNumber(page.properties.Sequence),
    status: extractSelect(page.properties.Status),
    feedback: extractRichText(page.properties.Feedback) || undefined,
    note: extractRichText(page.properties.Note) || undefined,
    images: [], // 파일은 별도로 처리 (현재는 빈 배열)
  }));
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
      if (block.type === "paragraph") {
        const paragraph = (block as any).paragraph;
        return {
          id: baseId,
          type: NotionBlockType.PARAGRAPH,
          content: parseRichText(paragraph.rich_text || []),
        };
      }

      if (block.type === "heading_1") {
        const heading = (block as any).heading_1;
        return {
          id: baseId,
          type: NotionBlockType.HEADING_1,
          content: parseRichText(heading.rich_text || []),
        };
      }

      if (block.type === "heading_2") {
        const heading = (block as any).heading_2;
        return {
          id: baseId,
          type: NotionBlockType.HEADING_2,
          content: parseRichText(heading.rich_text || []),
        };
      }

      if (block.type === "heading_3") {
        const heading = (block as any).heading_3;
        return {
          id: baseId,
          type: NotionBlockType.HEADING_3,
          content: parseRichText(heading.rich_text || []),
        };
      }

      if (block.type === "bulleted_list_item") {
        const listItem = (block as any).bulleted_list_item;
        return {
          id: baseId,
          type: NotionBlockType.BULLETED_LIST_ITEM,
          content: parseRichText(listItem.rich_text || []),
        };
      }

      if (block.type === "numbered_list_item") {
        const listItem = (block as any).numbered_list_item;
        return {
          id: baseId,
          type: NotionBlockType.NUMBERED_LIST_ITEM,
          content: parseRichText(listItem.rich_text || []),
        };
      }

      if (block.type === "image") {
        const image = (block as any).image;
        const imageUrl =
          image.type === "external"
            ? image.external?.url
            : image.type === "file"
              ? image.file?.url
              : null;

        return {
          id: baseId,
          type: NotionBlockType.IMAGE,
          content: [],
          imageUrl: imageUrl || undefined,
          caption:
            image.caption?.map((c: any) => c.plain_text || "").join("") ||
            undefined,
        };
      }

      if (block.type === "callout") {
        const callout = (block as any).callout;
        return {
          id: baseId,
          type: NotionBlockType.CALLOUT,
          content: parseRichText(callout.rich_text || []),
        };
      }

      if (block.type === "code") {
        const code = (block as any).code;
        return {
          id: baseId,
          type: NotionBlockType.CODE,
          content: parseRichText(code.rich_text || []),
          language: code.language || undefined,
        };
      }

      if (block.type === "toggle") {
        const toggle = (block as any).toggle;
        return {
          id: baseId,
          type: NotionBlockType.TOGGLE,
          content: parseRichText(toggle.rich_text || []),
        };
      }

      // 지원하지 않는 블록 타입은 null 반환
      return null;
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
  return {
    id: page.id,
    title: extractTitleText(page.properties.Title),
    date: extractDate(page.properties.Date),
    sequence: extractNumber(page.properties.Sequence),
    status: extractSelect(page.properties.Status),
    feedback: extractRichText(page.properties.Feedback) || undefined,
    note: extractRichText(page.properties.Note) || undefined,
    images: [],
    blocks: parseBlocksData(blocks),
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
    // @ts-ignore - Notion API 타입 정의 미포함 (v4)
    const response = await notion.databases.query({
      database_id: NOTION_SESSIONS_DB_ID,
      filter: {
        property: "Member",
        relation: {
          contains: memberId,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const pages = response.results as NotionSessionPage[];
    return parseSessionsData(pages);
  } catch (error) {
    console.error(`Failed to fetch sessions for member ${memberId}:`, error);
    throw new Error(`수업 목록을 조회할 수 없습니다: ${memberId}`);
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

    const blocksResponse = await notion.blocks.children.list({
      block_id: sessionId,
    });

    const blocks = blocksResponse.results as NotionBlock[];
    return parseSessionDetail(page, blocks);
  } catch (error) {
    console.error(`Failed to fetch session ${sessionId}:`, error);
    throw new Error(`수업 상세 정보를 조회할 수 없습니다: ${sessionId}`);
  }
}
