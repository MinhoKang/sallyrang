/**
 * 회원 정보
 * 애플리케이션에서 사용하는 회원 데이터 모델입니다.
 */
export interface Member {
  /** Notion 페이지 ID */
  id: string;
  /** 회원 이름 */
  name: string;
  /** 나이 */
  age?: number;
  /** 운동 경력 */
  experience?: string;
  /** 성별 */
  gender: string;
  /** 수업 장소 */
  location: string;
  /** 등록일 (YYYY-MM-DD 형식) */
  startDate: string;
  /** 상태 (진행중, 홀딩, 종료) */
  status: string;
  /** 수업비 */
  tuition: number;
  /** 총 수업비 */
  totalTuition: number;
  /** Notion 페이지 URL */
  url: string;
}

/**
 * 수업 정보
 * 애플리케이션에서 사용하는 수업 데이터 모델입니다.
 */
export interface Session {
  /** Notion 페이지 ID */
  id: string;
  /** 수업 제목 */
  title: string;
  /** 수업 날짜 (YYYY-MM-DD 형식) */
  date: string;
  /** 수업 회차 */
  sequence: string;
  /** 진행 상태 (완료, 예정, 미완료) */
  status: string;
  /** 피드백 */
  feedback?: string;
  /** 비고 */
  note?: string;
  /** 사용자 메모 (회원이 작성) */
  comment?: string;
  /** 이미지 URL 목록 */
  images?: string[];
}

/**
 * 수업 상세 정보 (블록 포함)
 * 수업 정보와 함께 Notion 블록 데이터를 포함합니다.
 */
export interface SessionDetail extends Session {
  /** Notion 블록 데이터 (페이지 본문) */
  blocks: NotionBlockData[];
  /** Content 필드 (Rich Text property에서 파싱) */
  content?: string;
}

/**
 * Notion 블록 타입
 * 지원되는 Notion 블록의 종류를 정의합니다.
 */
export enum NotionBlockType {
  /** 일반 단락 */
  PARAGRAPH = 'paragraph',
  /** 제목 1 */
  HEADING_1 = 'heading_1',
  /** 제목 2 */
  HEADING_2 = 'heading_2',
  /** 제목 3 */
  HEADING_3 = 'heading_3',
  /** 순서 없는 리스트 아이템 */
  BULLETED_LIST_ITEM = 'bulleted_list_item',
  /** 순서 있는 리스트 아이템 */
  NUMBERED_LIST_ITEM = 'numbered_list_item',
  /** 이미지 */
  IMAGE = 'image',
  /** 콜아웃 (강조 박스) */
  CALLOUT = 'callout',
  /** 토글 (접기/펼치기) */
  TOGGLE = 'toggle',
  /** 코드 블록 */
  CODE = 'code',
}

/**
 * Rich Text 스타일
 * 텍스트에 적용할 수 있는 스타일 옵션입니다.
 */
export interface RichTextStyle {
  /** 굵게 */
  bold?: boolean;
  /** 기울임 */
  italic?: boolean;
  /** 취소선 */
  strikethrough?: boolean;
  /** 밑줄 */
  underline?: boolean;
  /** 코드 스타일 */
  code?: boolean;
}

/**
 * Rich Text 세그먼트
 * 스타일이 적용된 텍스트의 최소 단위입니다.
 */
export interface RichTextSegment {
  /** 텍스트 내용 */
  text: string;
  /** 적용된 스타일 */
  styles: RichTextStyle;
  /** 링크 URL (링크인 경우) */
  href?: string;
}

/**
 * Notion 블록 데이터 (렌더링용)
 * UI 컴포넌트에서 렌더링하기 쉽도록 변환된 블록 데이터입니다.
 */
export interface NotionBlockData {
  /** 블록 ID */
  id: string;
  /** 블록 타입 */
  type: NotionBlockType;
  /** 텍스트 콘텐츠 (Rich Text 세그먼트 배열) */
  content: RichTextSegment[];
  /** 이미지 블록의 경우 이미지 URL */
  imageUrl?: string;
  /** 이미지 블록의 경우 캡션 */
  caption?: string;
  /** 코드 블록의 경우 프로그래밍 언어 */
  language?: string;
}
