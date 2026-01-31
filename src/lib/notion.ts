import { Client } from "@notionhq/client";

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
export async function getMember(memberId: string) {
  // TODO: Notion API를 통해 회원 정보 조회 구현
  // const response = await notion.pages.retrieve({ page_id: memberId });
  // return parseMemberData(response);

  throw new Error("Not implemented yet");
}

/**
 * 회원의 수업 목록 조회
 * @param memberId - Notion 회원 페이지 ID
 * @returns 수업 목록 배열
 */
export async function getSessions(memberId: string) {
  // TODO: Notion API를 통해 수업 목록 조회 구현
  // const response = await notion.databases.query({
  //   database_id: NOTION_SESSIONS_DB_ID,
  //   filter: {
  //     property: "Member",
  //     relation: {
  //       contains: memberId,
  //     },
  //   },
  // });
  // return parseSessionsData(response.results);

  throw new Error("Not implemented yet");
}

/**
 * 특정 수업 상세 정보 조회
 * @param sessionId - Notion 수업 페이지 ID
 * @returns 수업 상세 정보 객체
 */
export async function getSession(sessionId: string) {
  // TODO: Notion API를 통해 수업 상세 정보 조회 구현
  // const response = await notion.pages.retrieve({ page_id: sessionId });
  // const blocks = await notion.blocks.children.list({ block_id: sessionId });
  // return parseSessionDetail(response, blocks);

  throw new Error("Not implemented yet");
}
