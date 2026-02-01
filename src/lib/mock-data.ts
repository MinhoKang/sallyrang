import type {
  Member,
  Session,
  SessionDetail,
  NotionBlockData,
  RichTextSegment,
} from "@/types/domain";
import { NotionBlockType } from "@/types/domain";

/**
 * 더미 회원 데이터
 * Phase 3 Notion API 연동 전까지 UI 개발용으로 사용
 */
export const mockMember: Member = {
  id: "mock-member-uuid-12345",
  name: "김샐리",
  startDate: "2024-12-01", // D+62일째 계산용 (2026-02-01 기준)
  age: 28,
  gender: "여성",
  experience: "2년 6개월",
  location: "홈짐",
  status: "진행중",
  tuition: 200000,
  totalTuition: 2000000,
};

/**
 * 더미 수업 목록 데이터
 * 날짜 범위: 2024-10-01 ~ 2025-01-31
 * 총 50개 세션으로 가상화 성능 테스트용으로 확장
 */
const baseSessionData = [
  { title: "등운동", feedback: "랫풀다운 자세가 많이 좋아졌어요! 등 근육에 집중하는 감각이 생겼습니다." },
  { title: "하체운동", feedback: "스쿼트 깊이가 좋아졌습니다. 무릎 각도와 발목 유연성이 개선되고 있어요." },
  { title: "상체운동", feedback: "벤치프레스 폼 교정 완료. 가슴 근육 활성화가 잘 되고 있습니다." },
  { title: "코어 & 전신 스트레칭", feedback: "플랭크 유지 시간이 30초 늘었어요! 코어 안정성이 확실히 좋아졌습니다." },
  { title: "등 + 이두", feedback: "데드리프트 자세가 안정적입니다. 중량 단계적으로 증가 중." },
  { title: "하체 집중", feedback: "런지 동작이 많이 개선되었어요. 균형감 훈련 효과가 보입니다." },
  { title: "전신 운동", feedback: "전체적인 체력이 향상되고 있습니다. 꾸준함이 결과를 만들고 있어요." },
  { title: "가슴 + 삼두", feedback: "딥스 자세가 안정적으로 변했습니다. 가슴 활성화가 좋네요." },
];

export const mockSessions: Session[] = Array.from({ length: 50 }, (_, index) => {
  const baseData = baseSessionData[index % baseSessionData.length];
  const date = new Date("2025-01-31");
  date.setDate(date.getDate() - index);
  const dateStr = date.toISOString().split("T")[0];

  return {
    id: `session-${String(index + 1).padStart(3, "0")}`,
    title: `${dateStr.replace(/-/g, "")} ${baseData.title}`,
    date: dateStr,
    sequence: 50 - index,
    status: index % 5 === 0 ? "예정" : "완료",
    feedback: baseData.feedback,
    note: index % 7 === 0 ? "특별 메모" : undefined,
    images: index % 3 === 0 ? [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    ] : [],
  };
});

/**
 * 더미 수업 상세 데이터 (블록 포함)
 * mockSessions[0]을 기반으로 확장
 */
export const mockSessionDetail: SessionDetail = {
  ...mockSessions[0],
  blocks: [
    {
      id: "block-001",
      type: NotionBlockType.HEADING_2,
      content: [
        {
          text: "🔥 오늘의 루틴",
          styles: { bold: true },
        },
      ],
    },
    {
      id: "block-002",
      type: NotionBlockType.PARAGRAPH,
      content: [
        {
          text: "오늘은 등 근육을 집중적으로 단련했습니다. ",
          styles: {},
        },
        {
          text: "랫풀다운",
          styles: { bold: true },
        },
        {
          text: "과 ",
          styles: {},
        },
        {
          text: "시티드 로우",
          styles: { bold: true },
        },
        {
          text: "를 메인으로 진행했어요.",
          styles: {},
        },
      ],
    },
    {
      id: "block-003",
      type: NotionBlockType.BULLETED_LIST_ITEM,
      content: [
        {
          text: "랫풀다운: 4세트 x 12회 (40kg → 45kg)",
          styles: {},
        },
      ],
    },
    {
      id: "block-004",
      type: NotionBlockType.BULLETED_LIST_ITEM,
      content: [
        {
          text: "시티드 로우: 4세트 x 10회 (35kg)",
          styles: {},
        },
      ],
    },
    {
      id: "block-005",
      type: NotionBlockType.BULLETED_LIST_ITEM,
      content: [
        {
          text: "데드리프트: 3세트 x 8회 (50kg)",
          styles: {},
        },
      ],
    },
    {
      id: "block-006",
      type: NotionBlockType.HEADING_3,
      content: [
        {
          text: "💬 코치 피드백",
          styles: { bold: true },
        },
      ],
    },
    {
      id: "block-007",
      type: NotionBlockType.PARAGRAPH,
      content: [
        {
          text: "랫풀다운 자세가 ",
          styles: {},
        },
        {
          text: "많이 좋아졌어요",
          styles: { bold: true, italic: true },
        },
        {
          text: "! 등 근육에 집중하는 감각이 생겼습니다. ",
          styles: {},
        },
        {
          text: "다음 운동 가이드",
          styles: {},
          href: "https://www.example.com/guide",
        },
        {
          text: "를 참고하시면 더 도움이 될 거예요.",
          styles: {},
        },
      ],
    },
    {
      id: "block-008",
      type: NotionBlockType.IMAGE,
      content: [],
      imageUrl:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      caption: "오늘의 운동 모습",
    },
    {
      id: "block-009",
      type: NotionBlockType.CALLOUT,
      content: [
        {
          text: "💡 ",
          styles: {},
        },
        {
          text: "TIP",
          styles: { bold: true },
        },
        {
          text: ": 다음 주부터 무게를 5kg씩 올려볼게요. 준비 운동을 충분히 하고 시작해주세요!",
          styles: {},
        },
      ],
    },
  ],
};
