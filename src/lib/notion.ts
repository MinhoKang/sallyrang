import { Client } from "@notionhq/client";
import type { Member, Session, SessionDetail } from "@/types/domain";
import type { NotionMemberPage, NotionSessionPage } from "@/types/notion";

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
 * 회원 정보 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 회원 정보 객체
 */
export async function getMember(memberId: string): Promise<Member> {
  // TODO: 구현 예정 (Task 008)
  // const response = await notion.pages.retrieve({ page_id: memberId });
  // const page = response as NotionMemberPage;
  // return parseMemberData(page);

  throw new Error("Not implemented yet");
}

/**
 * 회원의 수업 목록 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 수업 목록 배열
 */
export async function getSessions(memberId: string): Promise<Session[]> {
  // TODO: 구현 예정 (Task 009)
  // const response = await notion.databases.query({
  //   database_id: NOTION_SESSIONS_DB_ID,
  //   filter: {
  //     property: "Member",
  //     relation: {
  //       contains: memberId,
  //     },
  //   },
  // });
  // const pages = response.results as NotionSessionPage[];
  // return parseSessionsData(pages);

  throw new Error("Not implemented yet");
}

/**
 * 특정 수업 상세 정보 조회
 * @param sessionId - Notion 수업 페이지 ID
 * @returns 수업 상세 정보 객체
 */
export async function getSession(sessionId: string): Promise<SessionDetail> {
  // TODO: 구현 예정 (Task 010)
  // const response = await notion.pages.retrieve({ page_id: sessionId });
  // const page = response as NotionSessionPage;
  // const blocksResponse = await notion.blocks.children.list({ block_id: sessionId });
  // const blocks = blocksResponse.results as NotionBlock[];
  // return parseSessionDetail(page, blocks);

  throw new Error("Not implemented yet");
}
