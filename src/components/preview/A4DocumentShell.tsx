import React from 'react';
import { Printer, ZoomIn, ZoomOut, Columns2, PanelLeft, Maximize2 } from 'lucide-react';
import { DocumentType, WorkspaceLayoutMode } from '../../types/document';
import { DocOrientation } from '../../utils/docBlocks';

interface A4DocumentShellProps {
  documentType: DocumentType;
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  layoutMode: WorkspaceLayoutMode;
  onChangeLayoutMode: (mode: WorkspaceLayoutMode) => void;
  orientation: DocOrientation;
  onChangeOrientation: (orientation: DocOrientation) => void;
  pageCount: number;
  // Reading worksheet option
  includeTeacherNotes: boolean;
  onChangeIncludeTeacherNotes: (value: boolean) => void;
  // Vocational project option
  sessionLayout: 'auto' | 'table' | 'cards';
  onChangeSessionLayout: (layout: 'auto' | 'table' | 'cards') => void;
  onPrint: () => void;
  documentLabel: string;
  children: React.ReactNode;
}

const ZOOM_STEPS = [
  { value: 0.65, label: '65%' },
  { value: 0.78, label: '78%' },
  { value: 0.9, label: '90%' },
  { value: 1, label: '100%' },
];

export const A4DocumentShell: React.FC<A4DocumentShellProps> = ({
  documentType,
  zoom,
  onChangeZoom,
  layoutMode,
  onChangeLayoutMode,
  orientation,
  onChangeOrientation,
  pageCount,
  includeTeacherNotes,
  onChangeIncludeTeacherNotes,
  sessionLayout,
  onChangeSessionLayout,
  onPrint,
  documentLabel,
  children,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Preview Toolbar */}
      <div className="no-print bg-white border border-slate-200 rounded-xl px-4 py-2.5 mb-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">
              A4 자동 조판 미리보기
            </span>
            <span className="text-xs text-slate-400" aria-hidden="true">·</span>
            <span className="text-xs font-semibold text-[#1E3A5F] tabular-nums whitespace-nowrap">
              총 {pageCount}페이지
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-xs text-slate-500 truncate max-w-[220px] hidden sm:inline">
              {documentLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Layout Mode Switcher */}
            <div className="hidden lg:flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => onChangeLayoutMode('split')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  layoutMode === 'split'
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>분할</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeLayoutMode('form')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  layoutMode === 'form'
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PanelLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>입력</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeLayoutMode('preview')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  layoutMode === 'preview'
                    ? 'bg-white text-[#1E3A5F] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>미리보기</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-lg">
              <ZoomOut className="w-3.5 h-3.5 text-slate-400 ml-1" aria-hidden="true" />
              {ZOOM_STEPS.map((step) => (
                <button
                  key={step.value}
                  type="button"
                  onClick={() => onChangeZoom(step.value)}
                  className={`px-2 py-1 text-xs font-medium rounded-md tabular-nums transition-colors cursor-pointer ${
                    zoom === step.value
                      ? 'bg-white text-[#1E3A5F] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {step.label}
                </button>
              ))}
              <ZoomIn className="w-3.5 h-3.5 text-slate-400 mr-1" aria-hidden="true" />
            </div>

            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>인쇄 · PDF 저장</span>
            </button>
          </div>
        </div>

        {/* Second Row: Document Print Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Orientation Switch */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 whitespace-nowrap">용지 방향:</span>
              <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => onChangeOrientation('portrait')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    orientation === 'portrait'
                      ? 'bg-white text-[#1E3A5F] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A4 세로 (기본)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeOrientation('landscape')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    orientation === 'landscape'
                      ? 'bg-white text-[#1E3A5F] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A4 가로 (넓은 표용)
                </button>
              </div>
            </div>

            {/* Document-specific print distinction */}
            {documentType === 'reading_worksheet' ? (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 whitespace-nowrap">출력 대상:</span>
                <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-md">
                  <button
                    type="button"
                    onClick={() => onChangeIncludeTeacherNotes(false)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      !includeTeacherNotes
                        ? 'bg-white text-[#1E3A5F] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    학생 배부용
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeIncludeTeacherNotes(true)}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      includeTeacherNotes
                        ? 'bg-white text-[#1E3A5F] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    교사 참고용 (안내 포함)
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 whitespace-nowrap">차시 활동 배치:</span>
                <div className="flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-md">
                  <button
                    type="button"
                    onClick={() => onChangeSessionLayout('auto')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      sessionLayout === 'auto'
                        ? 'bg-white text-[#1E3A5F] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    자동
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeSessionLayout('table')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      sessionLayout === 'table'
                        ? 'bg-white text-[#1E3A5F] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    표 형식
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeSessionLayout('cards')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      sessionLayout === 'cards'
                        ? 'bg-white text-[#1E3A5F] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    차시 구획형
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="text-[11px] text-slate-500">
            인쇄 시 브라우저 옵션에서 &apos;머리글 및 바닥글&apos;을 끄면 A4 쪽번호와 여백이 정확히 일치합니다.
          </span>
        </div>
      </div>

      {/* Scrollable A4 Desk Surface */}
      <div className="print-container flex-1 overflow-auto bg-[#E5EAF0] border border-slate-200 rounded-xl p-6 md:p-8 flex justify-center items-start">
        <div
          className="print-zoom-wrap"
          style={{
            zoom: zoom === 1 ? undefined : zoom,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
