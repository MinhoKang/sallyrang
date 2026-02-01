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
 * 날짜 범위: 2025-01-20 ~ 2025-01-31
 */
export const mockSessions: Session[] = [
  {
    id: "session-001",
    title: "250131 등운동",
    date: "2025-01-31",
    sequence: 10,
    status: "완료",
    feedback:
      "랫풀다운 자세가 많이 좋아졌어요! 등 근육에 집중하는 감각이 생겼습니다. 다음 주부터 무게를 조금씩 올려볼게요.",
    note: "컨디션 매우 좋음",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
  },
  {
    id: "session-002",
    title: "250129 하체운동",
    date: "2025-01-29",
    sequence: 9,
    status: "완료",
    feedback:
      "스쿼트 깊이가 좋아졌습니다. 무릎 각도와 발목 유연성이 개선되고 있어요.",
    images: [
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
    ],
  },
  {
    id: "session-003",
    title: "250127 상체운동",
    date: "2025-01-27",
    sequence: 8,
    status: "완료",
    feedback: "벤치프레스 폼 교정 완료. 가슴 근육 활성화가 잘 되고 있습니다.",
    note: "다음 주부터 무게 증량",
  },
  {
    id: "session-004",
    title: "250124 코어 & 전신 스트레칭",
    date: "2025-01-24",
    sequence: 7,
    status: "완료",
    feedback:
      "플랭크 유지 시간이 30초 늘었어요! 코어 안정성이 확실히 좋아졌습니다.",
    images: [],
  },
  {
    id: "session-005",
    title: "250122 등 + 이두",
    date: "2025-01-22",
    sequence: 6,
    status: "완료",
    feedback: "데드리프트 자세가 안정적입니다. 중량 단계적으로 증가 중.",
    note: "허리 건강 체크 필요",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    ],
  },
  {
    id: "session-006",
    title: "250120 하체 집중",
    date: "2025-01-20",
    sequence: 5,
    status: "완료",
    feedback: "런지 동작이 많이 개선되었어요. 균형감 훈련 효과가 보입니다.",
  },
];

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
