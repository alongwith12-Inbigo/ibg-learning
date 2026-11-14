import React from 'react';
import { DocBlock, TableCellSpec } from '../../utils/docBlocks';
import { PageRenderItem } from '../../utils/paginator';

interface BlockRendererProps {
  item: PageRenderItem;
  isMeasurePass?: boolean;
}

function renderCellContent(cell: TableCellSpec) {
  if (cell.isBulletList && Array.isArray(cell.content)) {
    return (
      <ul className="list-disc pl-4 space-y-0.5 text-[8.7pt] leading-[1.45]">
        {cell.content.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    );
  }

  const text = Array.isArray(cell.content) ? cell.content.join('\n') : cell.content;

  return (
    <div className={cell.align === 'center' ? 'text-center' : 'text-left'}>
      <div className={`${cell.bold ? 'font-semibold text-slate-900' : ''} whitespace-pre-line`}>
        {text}
      </div>
      {cell.subtext && (
        <div className="text-[8.2pt] font-normal text-slate-600 mt-0.5 leading-[1.42]">
          {cell.subtext}
        </div>
      )}
    </div>
  );
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  item,
  isMeasurePass = false,
}) => {
  if (item.kind === 'oversized_row_card') {
    return (
      <div className="border border-slate-300 p-3 mb-3 bg-white">
        {item.tableTitle && (
          <div className="text-[9.3pt] font-bold text-[#1E3A5F] border-b border-slate-200 pb-1 mb-2">
            {item.tableTitle}
          </div>
        )}
        <div className="space-y-2 text-[9pt]">
          {item.headers.map((header, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-1.5 last:border-b-0 last:pb-0">
              <div className="text-[8.3pt] font-semibold text-[#1E3A5F] mb-0.5">{header}</div>
              <div className="text-slate-800">{renderCellContent(item.cells[idx] ?? { content: '' })}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const block: DocBlock = item.block;
  const wrapperStyle: React.CSSProperties | undefined = isMeasurePass
    ? undefined
    : { marginBottom: `${block.marginBottomPx}px` };

  switch (block.type) {
    case 'doc_header':
      return (
        <div data-measure-id={block.id} style={wrapperStyle}>
          <header className="border-t-[3px] border-[#1E3A5F] pt-2.5 pb-2.5 border-b border-slate-300">
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <span className="text-[8.8pt] font-semibold text-[#1E3A5F]">
                {block.schoolLine}
              </span>
              <span className="text-[8.3pt] text-slate-600 tabular-nums shrink-0">
                {block.rightMeta}
              </span>
            </div>
            <h1 className="text-[15.5pt] font-bold text-slate-900 leading-[1.34] tracking-tight">
              {block.title}
            </h1>
          </header>
        </div>
      );

    case 'student_info_table':
      return (
        <div data-measure-id={block.id} style={wrapperStyle}>
          <table className="doc-table">
            <tbody>
              <tr>
                {block.fields.map((field) => (
                  <React.Fragment key={field}>
                    <th className="bg-slate-100 text-[#1E3A5F] font-semibold w-[11%] text-center">
                      {field}
                    </th>
                    <td className="w-[14%] h-7">&nbsp;</td>
                  </React.Fragment>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'meta_callout':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 text-[9.1pt]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-200 text-[8.4pt] text-slate-600">
            <span>
              <strong className="text-[#1E3A5F]">수업 조건:</strong> {block.leftCondition}
            </span>
            {block.rightTeacher && <span>{block.rightTeacher}</span>}
          </div>
          <p className="text-slate-800 leading-[1.58]">
            <strong className="text-[#1E3A5F] mr-1.5">{block.objectiveLabel}</strong>
            {block.objectiveText}
          </p>
          {block.teacherNoteText && (
            <p className="text-slate-600 text-[8.5pt] mt-1.5 pt-1.5 border-t border-dashed border-slate-200 leading-[1.5]">
              <strong className="text-slate-700 mr-1">[교사용 지도 참고]</strong>
              {block.teacherNoteText}
            </p>
          )}
        </div>
      );

    case 'section_heading':
      return (
        <div data-measure-id={block.id} style={wrapperStyle}>
          <div className="flex items-baseline justify-between gap-2 border-b-2 border-[#1E3A5F] pb-1">
            <h2 className="text-[11.5pt] font-bold text-[#1E3A5F]">{block.title}</h2>
            {block.rightLabel && (
              <span className="text-[8.3pt] text-slate-600 font-medium shrink-0">
                {block.rightLabel}
              </span>
            )}
          </div>
          {block.guideText && (
            <p className="text-[9.2pt] text-slate-700 mt-2 leading-[1.58]">{block.guideText}</p>
          )}
        </div>
      );

    case 'reading_material_head':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className={`border-t border-slate-400 pt-2.5 px-3 bg-slate-50/40 ${
            block.closeBottom ? 'pb-2.5 border-b border-slate-300' : ''
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2">
            <h3 className="text-[10.3pt] font-bold text-slate-900">{block.title}</h3>
            <span className="text-[8pt] text-slate-500">{block.metaLabel}</span>
          </div>
          {block.firstParagraph && (
            <p className="text-[9.6pt] text-slate-800 leading-[1.72] text-justify">
              {block.firstParagraph}
            </p>
          )}
        </div>
      );

    case 'reading_paragraph':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className={`px-3 bg-slate-50/40 ${
            block.closeBottom ? 'pb-2.5 border-b border-slate-300' : ''
          }`}
        >
          <p className="text-[9.6pt] text-slate-800 leading-[1.72] text-justify">
            {block.text}
          </p>
        </div>
      );

    case 'reading_extras': {
      const mat = block.material;
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="px-3 pb-2.5 border-b border-slate-300 bg-slate-50/40 space-y-2.5"
        >
          {mat.keyTerms && mat.keyTerms.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[8.5pt] font-semibold text-[#1E3A5F] mb-1">
                핵심 용어 길라잡이
              </div>
              <table className="doc-table bg-white">
                <tbody>
                  {mat.keyTerms.map((kt) => (
                    <tr key={kt.term}>
                      <th className="w-[24%] bg-slate-50 text-[#1E3A5F] font-semibold text-[8.7pt]">
                        {kt.term}
                      </th>
                      <td className="text-[8.7pt] text-slate-700">{kt.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {mat.comparisonBox && (
            <div className="pt-1">
              <table className="doc-table bg-white">
                <thead>
                  <tr>
                    <th className="w-1/2 text-center">{mat.comparisonBox.leftTitle}</th>
                    <th className="w-1/2 text-center">{mat.comparisonBox.rightTitle}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ul className="list-disc pl-4 space-y-1 text-[8.7pt]">
                        {mat.comparisonBox.leftItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-disc pl-4 space-y-1 text-[8.7pt]">
                        {mat.comparisonBox.rightItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {block.showFactCheckNotice && (mat.isVirtualCase || mat.factCheckRequired) && (
            <div className="pt-2 border-t border-dashed border-slate-300 text-[8pt] text-slate-600">
              {mat.isVirtualCase && <span className="font-semibold">[수업용 가상 사례 안내] </span>}
              {mat.factCheckNote || '수업 활용 시 최신 기준 및 사실 확인이 필요한 내용을 함께 검토하세요.'}
            </div>
          )}
        </div>
      );
    }

    case 'question_card':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 p-3 bg-white"
        >
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="font-bold text-[#1E3A5F] tabular-nums shrink-0">
              질문 {block.number}.
            </span>
            <span className="font-semibold text-slate-900 text-[9.6pt]">
              {block.promptQuestion}
            </span>
          </div>
          <p className="text-[8.4pt] text-slate-600 mb-2">
            활동 안내: {block.instruction}
            {block.scaffoldHint ? ` (${block.scaffoldHint})` : ''}
          </p>

          {block.spaceType === 'table' && block.tableColumns && (
            <table className="doc-table">
              <thead>
                <tr>
                  {block.tableColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.tableRowLabels
                  ? block.tableRowLabels.map((rowLabel) => (
                      <tr key={rowLabel}>
                        <th className="bg-slate-50 text-slate-800 font-semibold w-[18%]">
                          {rowLabel}
                        </th>
                        {block.tableColumns!.slice(1).map((c) => (
                          <td key={c} className="h-11">&nbsp;</td>
                        ))}
                      </tr>
                    ))
                  : Array.from({ length: block.emptyRowCount ?? 2 }).map((_, rIdx) => (
                      <tr key={rIdx}>
                        {block.tableColumns!.map((c) => (
                          <td key={c} className="h-11">&nbsp;</td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          )}

          {(block.spaceType === 'lines' || block.spaceType === 'box' || block.spaceType === 'short') && (
            <div
              className="writing-lines border border-slate-200 px-2"
              style={{
                height: `${
                  (block.linesCount ?? (block.spaceType === 'short' ? 2 : 3)) * 28
                }px`,
              }}
            />
          )}
        </div>
      );

    case 'ai_step_card':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 p-3 bg-white"
        >
          <div className="font-bold text-[9.6pt] text-[#1E3A5F] mb-1 tabular-nums">
            단계 {block.stepNumber}. {block.stepTitle}
          </div>
          <p className="text-[9.1pt] text-slate-800 mb-2 leading-[1.55]">{block.instruction}</p>

          {block.promptExample && (
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 text-[8.5pt] text-slate-700 mb-2.5 leading-[1.5]">
              {block.promptExample}
            </div>
          )}

          {block.spaceType === 'lines' && (
            <div
              className="writing-lines border border-slate-200 px-2"
              style={{ height: `${(block.linesCount ?? 3) * 28}px` }}
            />
          )}

          {block.spaceType === 'comparison_table' && block.tableColumns && (
            <table className="doc-table">
              <thead>
                <tr>
                  {block.tableRowLabels && <th className="w-[18%]">구분</th>}
                  {block.tableColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.tableRowLabels ?? ['내용 1', '내용 2']).map((label) => (
                  <tr key={label}>
                    {block.tableRowLabels && (
                      <th className="bg-slate-50 text-slate-800 font-semibold">{label}</th>
                    )}
                    {block.tableColumns!.map((col) => (
                      <td key={col} className="h-14">&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );

    case 'table_block':
      return (
        <div data-measure-id={block.id} style={wrapperStyle}>
          {(block.title || block.subtitle) && (
            <div data-table-title className="flex items-baseline justify-between gap-2 mb-1.5">
              {block.title && (
                <span className="text-[9.3pt] font-bold text-slate-900">{block.title}</span>
              )}
              {block.subtitle && (
                <span className="text-[8.1pt] text-slate-500">{block.subtitle}</span>
              )}
            </div>
          )}
          <table className="doc-table">
            <thead data-table-head>
              <tr>
                {block.headers.map((header, idx) => (
                  <th
                    key={idx}
                    style={block.colWidths?.[idx] ? { width: block.colWidths[idx] } : undefined}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} data-table-row={rIdx}>
                  {row.map((cell, cIdx) =>
                    cell.isHeaderCell ? (
                      <th
                        key={cIdx}
                        className="bg-slate-50 text-slate-900 font-semibold"
                        style={block.colWidths?.[cIdx] ? { width: block.colWidths[cIdx] } : undefined}
                      >
                        {renderCellContent(cell)}
                      </th>
                    ) : (
                      <td
                        key={cIdx}
                        style={block.colWidths?.[cIdx] ? { width: block.colWidths[cIdx] } : undefined}
                      >
                        {renderCellContent(cell)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'prose_card':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className={`border border-slate-300 p-3 text-[9.1pt] leading-[1.6] ${
            block.mutedStyle ? 'bg-slate-50/70' : 'bg-white'
          }`}
        >
          {block.heading && (
            <h3 className="text-[9.6pt] font-bold text-[#1E3A5F] mb-1.5">{block.heading}</h3>
          )}
          {block.paragraphs && block.paragraphs.length > 0 && (
            <div className="space-y-1.5 text-slate-800">
              {block.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {block.listItems && block.listItems.length > 0 && (
            <div className={block.paragraphs?.length ? 'mt-2 pt-2 border-t border-slate-200' : ''}>
              {block.listTitle && (
                <div className="font-semibold text-slate-900 mb-1 text-[8.9pt]">
                  {block.listTitle}
                </div>
              )}
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                {block.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case 'sentence_starters':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 bg-slate-50/60 p-3 space-y-2"
        >
          <div className="text-[8.8pt] font-semibold text-[#1E3A5F]">{block.title}</div>
          {block.lines.map((line, i) => (
            <div key={i} className="text-[9.2pt] text-slate-800 leading-[1.85]">
              {line}
            </div>
          ))}
        </div>
      );

    case 'writing_box':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 p-3 bg-white"
        >
          <p className="text-[9.2pt] font-semibold text-slate-900 mb-2 leading-[1.55]">
            {block.prompt}
          </p>
          <div
            className="writing-lines border border-slate-200 px-2"
            style={{ height: `${block.linesCount * 28}px` }}
          />
        </div>
      );

    case 'teacher_feedback_box':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 p-3 bg-white"
        >
          {block.showGuidanceFocus && block.guidanceFocus.length > 0 && (
            <div className="text-[8.3pt] text-slate-600 mb-2 pb-1.5 border-b border-dashed border-slate-200">
              [교사용 확인 기준] {block.guidanceFocus.join(' · ')}
            </div>
          )}
          <div
            className="writing-lines border border-slate-200"
            style={{ height: `${block.linesCount * 28}px` }}
          />
          <div className="flex justify-end items-center gap-6 mt-2 text-[8.4pt] text-slate-600">
            <span>확인 일자: 202&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.</span>
            <span>지도교사 확인: _______________ (서명)</span>
          </div>
        </div>
      );

    case 'session_card':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 bg-white"
        >
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300 flex items-center justify-between gap-2">
            <span className="font-bold text-[#1E3A5F] text-[9.5pt] tabular-nums">
              {block.sessionLabel}. {block.title}
            </span>
            <span className="text-[8.2pt] text-slate-600 tabular-nums shrink-0">
              {block.duration} · 산출물: {block.sessionOutput}
            </span>
          </div>
          <div className="p-3 space-y-2 text-[8.9pt]">
            <div>
              <strong className="text-slate-900">주요 학습 내용:</strong>{' '}
              <span className="text-slate-700">{block.learningContent}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-slate-200">
              <div>
                <div className="font-semibold text-[#1E3A5F] mb-1">학생 활동</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                  {block.studentActivities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-1">교사 지도·지원</div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                  {block.teacherSupport.map((sup, i) => (
                    <li key={i}>{sup}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 'notice_box':
      return (
        <div
          data-measure-id={block.id}
          style={wrapperStyle}
          className="border border-slate-300 p-3 space-y-2 text-[8.9pt] bg-white"
        >
          {block.lines.map((line, i) => (
            <div key={i}>
              {line.label && <strong className="text-[#1E3A5F] mr-1">{line.label}:</strong>}
              <span className="text-slate-800">{line.text}</span>
            </div>
          ))}
          {block.listItems && block.listItems.length > 0 && (
            <div>
              {block.listTitle && (
                <strong className="text-slate-900 block mb-1">{block.listTitle}:</strong>
              )}
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                {block.listItems.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          )}
          {block.footerNote && (
            <div className="pt-2 border-t border-dashed border-slate-300 text-[8.4pt] text-slate-700">
              {block.footerNote}
            </div>
          )}
          {block.memoText && (
            <div className="pt-1 text-[8.5pt] text-slate-700">
              <strong>[교사 메모 및 추가 요청 반영]</strong> {block.memoText}
            </div>
          )}
        </div>
      );
  }
};
