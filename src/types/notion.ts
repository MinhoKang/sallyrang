import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Notion Property 타입들
 * Notion API 응답에서 사용되는 프로퍼티 타입을 추출합니다.
 */

/** 제목 프로퍼티 타입 */
export type NotionTitle = Extract<
  PageObjectResponse["properties"][string],
  { type: "title" }
>;

/** 리치 텍스트 프로퍼티 타입 */
export type NotionRichText = Extract<
  PageObjectResponse["properties"][string],
  { type: "rich_text" }
>;

/** 숫자 프로퍼티 타입 */
export type NotionNumber = Extract<
  PageObjectResponse["properties"][string],
  { type: "number" }
>;

/** 선택 프로퍼티 타입 */
export type NotionSelect = Extract<
  PageObjectResponse["properties"][string],
  { type: "select" }
>;

/** 날짜 프로퍼티 타입 */
export type NotionDate = Extract<
  PageObjectResponse["properties"][string],
  { type: "date" }
>;

/** 관계형 프로퍼티 타입 */
export type NotionRelation = Extract<
  PageObjectResponse["properties"][string],
  { type: "relation" }
>;

/** 파일 프로퍼티 타입 */
export type NotionFiles = Extract<
  PageObjectResponse["properties"][string],
  { type: "files" }
>;

/**
 * Members DB 아이템 타입
 * Notion Members 데이터베이스의 페이지 구조를 정의합니다.
 */
export interface NotionMemberPage extends PageObjectResponse {
  properties: {
    /** 회원 이름 */
    Name: NotionTitle;
    /** 나이 */
    Age: NotionNumber;
    /** 운동 경력 */
    Experience: NotionRichText;
    /** 성별 (남/여) */
    Gender: NotionSelect;
    /** 수업 장소 */
    Location: NotionSelect;
    /** 수업 목록 (관계형) */
    Sessions: NotionRelation;
    /** 등록일 */
    StartDate: NotionDate;
    /** 상태 (진행중/홀딩/종료) */
    Status: NotionSelect;
    /** 총 수업비 */
    TotalTuition: NotionNumber;
    /** 수업비 */
    Tuition: NotionNumber;
  };
}

/**
 * Sessions DB 아이템 타입
 * Notion Sessions 데이터베이스의 페이지 구조를 정의합니다.
 */
export interface NotionSessionPage extends PageObjectResponse {
  properties: {
    /** 수업 제목 */
    Title: NotionTitle;
    /** 수업 날짜 */
    Date: NotionDate;
    /** 수업 내용 (선택사항) */
    Content?: NotionRichText;
    /** 피드백 */
    Feedback: NotionRichText;
    /** 수업 사진 */
    Image: NotionFiles;
    /** 회원 (관계형) */
    Member: NotionRelation;
    /** 비고 */
    Note: NotionRichText;
    /** 수업 회차 */
    Sequence: NotionNumber;
    /** 진행 상태 (완료/예정/미완료) */
    Status: NotionSelect;
  };
}

/**
 * Notion Block 타입 (재내보내기)
 * Notion API의 Block 타입을 애플리케이션에서 사용하기 쉽게 재내보냅니다.
 */
export type NotionBlock = BlockObjectResponse;

/**
 * Rich Text Item 타입 (재내보내기)
 * Notion API의 Rich Text 아이템 타입을 애플리케이션에서 사용합니다.
 */
export type NotionRichTextItem = RichTextItemResponse;
