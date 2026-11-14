import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DocBlock, DocOrientation } from '../../utils/docBlocks';
import { BlockMeasurement, PaginatedPage, paginateDocBlocks } from '../../utils/paginator';
import { BlockRenderer } from './BlockRenderer';

interface PaginatedA4DocumentProps {
  blocks: DocBlock[];
  orientation: DocOrientation;
  footerLeft: string;
  footerRight: string;
  onPageCountChange?: (count: number) => void;
}

export const PaginatedA4Document: React.FC<PaginatedA4DocumentProps> = ({
  blocks,
  orientation,
  footerLeft,
  footerRight,
  onPageCountChange,
}) => {
  const mirrorRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<PaginatedPage[]>(() => [
    { pageNumber: 1, items: blocks.map((b) => ({ kind: 'block', block: b })) },
  ]);

  const measureAndPaginate = () => {
    const mirrorEl = mirrorRef.current;
    const rulerEl = rulerRef.current;
    if (!mirrorEl || !rulerEl) return;

    const rulerHeight = rulerEl.getBoundingClientRect().height;
    const pxPerMm = rulerHeight > 0 ? rulerHeight / 100 : 3.7795;

    // A4 세로: 297mm - 상하패딩(25mm) - 바닥글/안전여백(20mm) = 252mm
    // A4 가로: 210mm - 상하패딩(23mm) - 바닥글/안전여백(19mm) = 168mm
    const printableHeightMm = orientation === 'portrait' ? 252 : 168;
    const pageMaxHeightPx = printableHeightMm * pxPerMm;

    const measurements = new Map<string, BlockMeasurement>();

    blocks.forEach((block) => {
      const el = mirrorEl.querySelector<HTMLElement>(
        `[data-measure-id="${CSS.escape(block.id)}"]`
      );
      if (!el) return;

      const totalHeightPx = el.getBoundingClientRect().height;

      if (block.type === 'table_block') {
        const titleEl = el.querySelector<HTMLElement>('[data-table-title]');
        const headEl = el.querySelector<HTMLElement>('[data-table-head]');
        const rowEls = el.querySelectorAll<HTMLElement>('[data-table-row]');

        const tableTitleHeightPx = titleEl ? titleEl.getBoundingClientRect().height + 6 : 0;
        const tableHeaderHeightPx = headEl ? headEl.getBoundingClientRect().height : 28;
        const tableRowHeightsPx = Array.from(rowEls).map(
          (rowEl) => rowEl.getBoundingClientRect().height
        );

        measurements.set(block.id, {
          totalHeightPx,
          tableTitleHeightPx,
          tableHeaderHeightPx,
          tableRowHeightsPx,
        });
      } else {
        measurements.set(block.id, { totalHeightPx });
      }
    });

    const nextPages = paginateDocBlocks(blocks, measurements, pageMaxHeightPx);
    setPages(nextPages);
    onPageCountChange?.(nextPages.length);
  };

  useLayoutEffect(() => {
    measureAndPaginate();

    let cancelled = false;
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          measureAndPaginate();
        }
      });
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, orientation]);

  const contentWidthMm = orientation === 'portrait' ? 182 : 269;

  const mirrorNode = (
    <div
      ref={mirrorRef}
      aria-hidden="true"
      className="a4-measure-mirror doc-font no-print"
      style={{ width: `${contentWidthMm}mm` }}
    >
      <div ref={rulerRef} style={{ height: '100mm', width: '1px' }} />
      {blocks.map((block) => (
        <BlockRenderer
          key={`m-${block.id}`}
          item={{ kind: 'block', block }}
          isMeasurePass
        />
      ))}
    </div>
  );

  return (
    <>
      <style media="print">{`
        @page {
          size: A4 ${orientation};
          margin: 0;
        }
      `}</style>

      {typeof document !== 'undefined' ? createPortal(mirrorNode, document.body) : null}

      <div className="a4-pages-stack flex flex-col gap-6 items-center">
        {pages.map((page) => (
          <div key={page.pageNumber} className="a4-sheet-wrapper">
            <div className="no-print flex items-center justify-between text-[11px] text-slate-500 mb-1.5 px-1">
              <span>
                A4 {orientation === 'portrait' ? '세로' : '가로'} · {page.pageNumber}페이지
              </span>
              <span className="tabular-nums">
                {page.pageNumber} / {pages.length}
              </span>
            </div>

            <article
              className={`a4-sheet doc-font ${
                orientation === 'landscape' ? 'a4-sheet-landscape' : ''
              }`}
            >
              <div className="a4-sheet-body">
                {page.items.map((item, idx) => (
                  <BlockRenderer
                    key={item.kind === 'block' ? `${item.block.id}-${idx}` : `${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>

              <footer className="a4-sheet-footer">
                <span>{footerLeft}</span>
                <span className="tabular-nums">
                  {footerRight} · {page.pageNumber} / {pages.length}
                </span>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </>
  );
};
