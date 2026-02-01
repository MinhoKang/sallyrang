'use client';

import { useRef, useMemo, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Member } from '@/types/domain';
import { MemberItem } from './MemberItem';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, List, LayoutGrid } from 'lucide-react';

interface MemberSearchListProps {
  readonly members: Member[];
}

/**
 * 검색 기능이 있는 가상화 회원 리스트 컴포넌트
 * 회원 이름으로 실시간 검색하고 가상화 리스트로 효율적으로 렌더링합니다.
 */
export function MemberSearchList({ members }: Readonly<MemberSearchListProps>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const parentRef = useRef<HTMLDivElement>(null);

  // 검색 필터링 (대소문자 구분 안 함)
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) {
      return members;
    }

    const query = searchQuery.toLowerCase();
    return members.filter((member) =>
      member.name.toLowerCase().includes(query)
    );
  }, [members, searchQuery]);

  // TanStack Virtual을 사용한 가상화 설정
  const virtualizer = useVirtualizer({
    count: filteredMembers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // 평균 아이템 높이 (Card + padding 포함)
    overscan: 5, // 뷰포트 밖 미리 렌더링 아이템 수
  });

  if (members.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-muted-foreground text-lg">
          등록된 회원이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="member-search-title" className="space-y-6">
      {/* 섹션 타이틀 및 View 토글 */}
      <div className="flex items-center justify-between gap-4">
        <h2
          id="member-search-title"
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          회원 목록 🎯
        </h2>

        {/* View Toggle 버튼 */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="gap-2"
            aria-label="리스트 보기"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">리스트</span>
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="gap-2"
            aria-label="카드 보기"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">카드</span>
          </Button>
        </div>
      </div>

      {/* 검색 및 결과 정보 */}
      <div className="space-y-4">
        {/* 검색 입력 필드 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="회원 이름으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 text-base"
            aria-label="회원 검색"
            autoComplete="off"
          />
        </div>

        {/* 검색 결과 정보 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            전체 {members.length}명 중
            <span className="font-bold text-foreground ml-1">
              {filteredMembers.length}명
            </span>
          </p>
          <Badge
            variant="secondary"
            className="text-sm font-semibold"
          >
            {filteredMembers.length}
          </Badge>
        </div>
      </div>

      {/* 검색 결과 없음 메시지 */}
      {filteredMembers.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg">
            검색 결과가 없습니다
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            다른 이름으로 검색해보세요
          </p>
        </div>
      ) : viewMode === 'list' ? (
        /* List View: 가상화된 회원 리스트 */
        <div
          ref={parentRef}
          className="h-[1000px] overflow-auto"
          style={{
            contain: 'strict',
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const member = filteredMembers[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="px-4 pb-3">
                    <MemberItem member={member} layout="list" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Grid View: 회원 카드 그리드 레이아웃 */
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {filteredMembers.map((member) => (
            <MemberItem key={member.id} member={member} layout="grid" />
          ))}
        </div>
      )}
    </section>
  );
}
