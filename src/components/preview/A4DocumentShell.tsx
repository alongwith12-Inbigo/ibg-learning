import React from 'react';
import { Printer, ZoomIn, ZoomOut, Columns2, PanelLeft, Maximize2 } from 'lucide-react';
import { WorkspaceLayoutMode } from '../../types/document';

interface A4DocumentShellProps {
  zoom: number;
  onChangeZoom: (zoom: number) => void;
  layoutMode: WorkspaceLayoutMode;
  onChangeLayoutMode: (mode: WorkspaceLayoutMode) => void;
  onPrint: () => void;
  documentLabel: string;
  children: React.ReactNode;
}

const ZOOM_STEPS = [
  { value: 0.72, label: '72%' },
  { value: 0.85, label: '85%' },
  { value: 1, label: '100%' },
];

export const A4DocumentShell: React.FC<A4DocumentShellProps> = ({
  zoom,
  onChangeZoom,
  layoutMode,
  onChangeLayoutMode,
  onPrint,
  documentLabel,
  children,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Preview Toolbar */}
      <div className="no-print bg-white border border-slate-200 rounded-xl px-4 py-2.5 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
            A4 인쇄 미리보기
          </span>
          <span className="text-xs text-slate-400" aria-hidden="true">·</span>
          <span className="text-xs text-slate-500 truncate max-w-[260px]">
            {documentLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Layout Mode Switcher */}
          <div className="hidden lg:flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => onChangeLayoutMode('split')}
              title="입력과 미리보기 함께 보기"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                layoutMode === 'split'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>분할 보기</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLayoutMode('form')}
              title="입력 화면 크게 보기"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                layoutMode === 'form'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PanelLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>입력 집중</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLayoutMode('preview')}
              title="A4 문서만 크게 보기"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                layoutMode === 'preview'
                  ? 'bg-white text-[#1E3A5F] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>미리보기 확대</span>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
            <ZoomOut className="w-3.5 h-3.5 text-slate-400 ml-1.5" aria-hidden="true" />
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
            <ZoomIn className="w-3.5 h-3.5 text-slate-400 mr-1.5" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>인쇄</span>
          </button>
        </div>
      </div>

      {/* Scrollable A4 Desk Surface */}
      <div className="print-container flex-1 overflow-auto bg-[#E5EAF0] border border-slate-200 rounded-xl p-6 md:p-8 flex justify-center items-start">
        <div
          className="print-container origin-top transition-transform duration-150"
          style={{
            transform: zoom === 1 ? 'none' : `scale(${zoom})`,
            marginBottom: zoom < 1 ? `${(zoom - 1) * 100}%` : undefined,
          }}
        >
          <div className="a4-paper doc-font">{children}</div>
        </div>
      </div>
    </div>
  );
};
