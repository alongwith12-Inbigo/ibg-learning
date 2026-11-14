import { DocBlock, TableBlockSpec, TableCellSpec } from './docBlocks';

export type PageRenderItem =
  | { kind: 'block'; block: DocBlock }
  | {
      kind: 'oversized_row_card';
      id: string;
      headers: string[];
      cells: TableCellSpec[];
      tableTitle?: string;
    };

export interface PaginatedPage {
  pageNumber: number;
  items: PageRenderItem[];
}

export interface BlockMeasurement {
  totalHeightPx: number;
  tableTitleHeightPx?: number;
  tableHeaderHeightPx?: number;
  tableRowHeightsPx?: number[];
}

function getBlockMinNextHeight(
  blocks: DocBlock[],
  index: number,
  measurements: Map<string, BlockMeasurement>
): number {
  const block = blocks[index];
  if (!block) return 0;

  const m = measurements.get(block.id);
  if (!m) return 40;

  if (block.type === 'table_block') {
    const titleH = m.tableTitleHeightPx ?? 0;
    const headH = m.tableHeaderHeightPx ?? 30;
    const firstRowH = m.tableRowHeightsPx?.[0] ?? 32;
    return titleH + headH + firstRowH;
  }

  // If chained keepWithNext (e.g. doc_header -> student_info -> meta, or section_heading -> prose_card),
  // look ahead one step further when current block itself is keepWithNext
  if (block.keepWithNext && index + 1 < blocks.length) {
    const nextMin = getBlockMinNextHeight(blocks, index + 1, measurements);
    return m.totalHeightPx + block.marginBottomPx + nextMin;
  }

  return m.totalHeightPx;
}

/**
 * 블록별 실측 높이를 바탕으로 A4 페이지 단위 배치를 계산합니다.
 * - 제목 고립 방지 (keepWithNext)
 * - 수동 페이지 나눔 (pageBreakBefore)
 * - 긴 표의 행 단위 자동 분할 및 머리글 반복 (table_block)
 * - 단일 행이 페이지 높이를 초과할 경우 안전한 분할 카드 폴백 (oversized_row_card)
 */
export function paginateDocBlocks(
  blocks: DocBlock[],
  measurements: Map<string, BlockMeasurement>,
  pageMaxHeightPx: number
): PaginatedPage[] {
  const pages: PaginatedPage[] = [];
  let currentItems: PageRenderItem[] = [];
  let currentHeight = 0;

  const flushPage = () => {
    if (currentItems.length > 0) {
      pages.push({
        pageNumber: pages.length + 1,
        items: currentItems,
      });
      currentItems = [];
      currentHeight = 0;
    }
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const m = measurements.get(block.id);
    const blockH = m?.totalHeightPx ?? 60;
    const marginH = block.marginBottomPx;

    // 1. 강제 페이지 나눔
    if (block.pageBreakBefore && currentItems.length > 0) {
      flushPage();
    }

    // 2. 표 블록은 행 단위 분할 가능
    if (block.type === 'table_block' && m?.tableRowHeightsPx && block.rows.length > 0) {
      const titleH = m.tableTitleHeightPx ?? 0;
      const headH = m.tableHeaderHeightPx ?? 32;
      const rowHeights = m.tableRowHeightsPx;

      let startRow = 0;
      let isContinuation = false;

      while (startRow < block.rows.length) {
        const effectiveTitleH = isContinuation ? 0 : titleH;
        const firstRowH = rowHeights[startRow] ?? 32;

        // 단일 행 자체가 한 페이지를 초과하는 예외 상황 처리
        if (effectiveTitleH + headH + firstRowH > pageMaxHeightPx) {
          if (currentItems.length > 0) {
            flushPage();
          }
          currentItems.push({
            kind: 'oversized_row_card',
            id: `${block.id}-row-${startRow}`,
            headers: block.headers,
            cells: block.rows[startRow],
            tableTitle: isContinuation ? `${block.title ?? ''} (계속)` : block.title,
          });
          flushPage();
          startRow++;
          isContinuation = true;
          continue;
        }

        const remaining = pageMaxHeightPx - currentHeight;

        // 현재 페이지에 표 제목 + 머리글 + 최소 1개 행이 들어가지 않으면 새 페이지로 이동
        if (
          currentItems.length > 0 &&
          effectiveTitleH + headH + firstRowH > remaining
        ) {
          flushPage();
          continue;
        }

        // 현재 페이지에 가능한 만큼 행 채우기
        let usedForTable = effectiveTitleH + headH;
        let endRow = startRow;

        while (endRow < block.rows.length) {
          const rH = rowHeights[endRow] ?? 32;
          if (usedForTable + rH <= pageMaxHeightPx - currentHeight) {
            usedForTable += rH;
            endRow++;
          } else {
            break;
          }
        }

        // 안전장치: 빈 페이지에서는 최소 1행은 반드시 배치
        if (endRow === startRow) {
          usedForTable += firstRowH;
          endRow = startRow + 1;
        }

        const slicedBlock: TableBlockSpec = {
          ...block,
          id: isContinuation ? `${block.id}-cont-${startRow}` : block.id,
          title: isContinuation
            ? block.title
              ? `${block.title} (계속)`
              : undefined
            : block.title,
          subtitle: isContinuation ? undefined : block.subtitle,
          rows: block.rows.slice(startRow, endRow),
          isContinuation,
          marginBottomPx: endRow === block.rows.length ? marginH : 0,
        };

        currentItems.push({ kind: 'block', block: slicedBlock });
        currentHeight += usedForTable + (endRow === block.rows.length ? marginH : 0);

        startRow = endRow;
        if (startRow < block.rows.length) {
          isContinuation = true;
          flushPage();
        }
      }

      continue;
    }

    // 3. 일반 블록: 제목 고립 방지(lookahead) 계산
    let requiredHeight = blockH;
    if (block.keepWithNext && i + 1 < blocks.length) {
      const nextMin = getBlockMinNextHeight(blocks, i + 1, measurements);
      // 다음 블록이 페이지에 함께 들어갈 수 있는지 검사 (단, 결합 높이가 한 페이지 전체보다 작을 때만 강제 동반 이동)
      if (blockH + marginH + nextMin <= pageMaxHeightPx) {
        requiredHeight = blockH + marginH + nextMin;
      }
    }

    if (currentItems.length > 0 && currentHeight + requiredHeight > pageMaxHeightPx) {
      flushPage();
    }

    currentItems.push({ kind: 'block', block });
    currentHeight += blockH + marginH;
  }

  flushPage();

  if (pages.length === 0) {
    pages.push({ pageNumber: 1, items: [] });
  }

  return pages;
}
