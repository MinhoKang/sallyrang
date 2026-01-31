import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 회원 전용 대시보드 페이지
 * URL: /members/[id]
 *
 * @description
 * - Notion API를 통해 회원 정보 및 수업 목록 조회
 * - UUID 기반 보안 접근 제어
 * - TOSS UI 스타일 적용
 */
export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  // TODO: Notion API를 통해 실제 데이터 페칭 구현
  // const member = await getMember(id);
  // const sessions = await getSessions(id);

  // 임시 데이터 (개발 중)
  const member = {
    name: "샘플 회원",
    status: "진행중",
    age: 35,
    experience: "2년 6개월",
    location: "홈짐",
    startDate: "2024-12-01",
  };

  if (!member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <h1 className="text-xl font-bold">샐리랑</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 프로필 영역 */}
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold">
            {member.name}님, 안녕하세요!
          </h2>
          <div className="mb-4">
            <Badge variant="secondary" className="text-base">
              운동 시작한 지 D+61일째
            </Badge>
          </div>

          {/* 기본 정보 그리드 */}
          <Card>
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              <div>
                <p className="text-sm text-muted-foreground">나이</p>
                <p className="text-lg font-semibold">{member.age}세</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">운동 경력</p>
                <p className="text-lg font-semibold">{member.experience}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">수업 장소</p>
                <p className="text-lg font-semibold">{member.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">현재 상태</p>
                <p className="text-lg font-semibold">{member.status}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* 수업 리스트 영역 */}
        <div>
          <h3 className="mb-4 text-2xl font-bold">내 운동 기록</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                수업 기록을 불러오는 중...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Notion API 연동 후 회원님의 수업 기록이 여기에 표시됩니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

/**
 * 동적 메타데이터 생성 (개인 정보 보호)
 */
export async function generateMetadata({ params }: MemberPageProps) {
  const { id } = await params;

  // TODO: 실제 회원 이름 가져오기
  // const member = await getMember(id);

  return {
    title: "내 운동 기록 - 샐리랑",
    description: "개인 운동 기록 열람 서비스",
    robots: "noindex, nofollow", // 검색 엔진 크롤링 차단
  };
}
