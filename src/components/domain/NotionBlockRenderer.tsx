import type { NotionBlockData, RichTextSegment } from "@/types/domain";
import { NotionBlockType } from "@/types/domain";
import Image from "next/image";
import { Info } from "lucide-react";

interface NotionBlockRendererProps {
  blocks: NotionBlockData[];
}

/**
 * Rich Text 세그먼트를 렌더링
 * Bold, Italic, Link 등의 스타일을 적용합니다.
 */
function RichText({ segments }: { segments: RichTextSegment[] }) {
  return (
    <>
      {segments.map((segment, index) => {
        let element = <span key={index}>{segment.text}</span>;

        // 스타일 적용 (중첩 가능)
        if (segment.styles.bold) {
          element = <strong key={index}>{element}</strong>;
        }
        if (segment.styles.italic) {
          element = <em key={index}>{element}</em>;
        }
        if (segment.styles.strikethrough) {
          element = <del key={index}>{element}</del>;
        }
        if (segment.styles.underline) {
          element = <u key={index}>{element}</u>;
        }
        if (segment.styles.code) {
          element = (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
            >
              {segment.text}
            </code>
          );
        }

        // 링크 적용
        if (segment.href) {
          element = (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {element}
            </a>
          );
        }

        return element;
      })}
    </>
  );
}

/**
 * Notion 블록 렌더러
 * Notion 블록 데이터를 React 컴포넌트로 변환합니다.
 */
export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  // 블록이 없는 경우
  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-8 px-4 rounded-lg bg-muted/30 text-center text-muted-foreground">
        <p className="text-sm">아직 작성된 내용이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
      {blocks.map((block, blockIndex) => {
        const key = `${block.id}-${blockIndex}`;

        switch (block.type) {
          case NotionBlockType.HEADING_1:
            return (
              <h1
                key={key}
                className="text-3xl sm:text-4xl font-bold mt-8 mb-4 scroll-mt-20"
              >
                <RichText segments={block.content} />
              </h1>
            );

          case NotionBlockType.HEADING_2:
            return (
              <h2
                key={key}
                className="text-2xl sm:text-3xl font-bold mt-6 mb-3 scroll-mt-20"
              >
                <RichText segments={block.content} />
              </h2>
            );

          case NotionBlockType.HEADING_3:
            return (
              <h3
                key={key}
                className="text-xl sm:text-2xl font-bold mt-5 mb-2 scroll-mt-20"
              >
                <RichText segments={block.content} />
              </h3>
            );

          case NotionBlockType.PARAGRAPH:
            return (
              <p key={key} className="text-base leading-relaxed text-foreground/90">
                <RichText segments={block.content} />
              </p>
            );

          case NotionBlockType.BULLETED_LIST_ITEM:
            return (
              <li
                key={key}
                className="ml-5 list-disc text-base leading-relaxed marker:text-primary"
              >
                <RichText segments={block.content} />
              </li>
            );

          case NotionBlockType.NUMBERED_LIST_ITEM:
            return (
              <li
                key={key}
                className="ml-5 list-decimal text-base leading-relaxed marker:text-primary marker:font-bold"
              >
                <RichText segments={block.content} />
              </li>
            );

          case NotionBlockType.IMAGE:
            if (!block.imageUrl) return null;
            return (
              <figure
                key={key}
                className="my-6 rounded-xl overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full aspect-video bg-muted">
                  <Image
                    src={block.imageUrl}
                    alt={block.caption || "수업 이미지"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  />
                </div>
                {block.caption && (
                  <figcaption className="px-4 py-3 text-sm text-muted-foreground bg-muted/50 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case NotionBlockType.CALLOUT:
            return (
              <div
                key={key}
                className="my-4 p-4 rounded-xl bg-accent/10 border-2 border-accent/30 flex items-start gap-3"
              >
                <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base leading-relaxed flex-1">
                  <RichText segments={block.content} />
                </p>
              </div>
            );

          case NotionBlockType.CODE:
            return (
              <pre
                key={key}
                className="my-4 p-4 rounded-xl bg-muted border-2 overflow-x-auto"
              >
                <code className="text-sm font-mono">
                  <RichText segments={block.content} />
                </code>
              </pre>
            );

          case NotionBlockType.TOGGLE:
            // Toggle은 Phase 2에서 구현 예정
            return (
              <details key={key} className="my-3 group">
                <summary className="cursor-pointer font-semibold text-base hover:text-primary transition-colors list-none flex items-center gap-2">
                  <span className="inline-block transition-transform group-open:rotate-90">
                    ▶
                  </span>
                  <RichText segments={block.content} />
                </summary>
                <div className="mt-2 ml-6 text-muted-foreground">
                  {/* 토글 내부 콘텐츠는 추후 구현 */}
                </div>
              </details>
            );

          default:
            // 지원하지 않는 블록 타입
            return (
              <div
                key={key}
                className="my-2 p-3 rounded bg-muted/50 text-sm text-muted-foreground italic"
              >
                [지원하지 않는 블록 타입: {block.type}]
              </div>
            );
        }
      })}
    </div>
  );
}
