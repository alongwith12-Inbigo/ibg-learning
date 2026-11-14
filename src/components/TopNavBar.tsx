import React from 'react';
import { Printer, ArrowRight } from 'lucide-react';
import { AppStep, DocumentType, WorkspaceLayoutMode } from '../types/document';

interface TopNavBarProps {
  currentStep: AppStep;
  selectedType: DocumentType;
  layoutMode: WorkspaceLayoutMode;
  onNavigateStep: (step: AppStep, layout?: WorkspaceLayoutMode) => void;
  onPrint: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentStep,
  selectedType,
  layoutMode,
  onNavigateStep,
  onPrint,
}) => {
  const isSelect = currentStep === 'select';
  const isInputActive = currentStep === 'workspace' && (layoutMode === 'split' || layoutMode === 'form');
  const isPreviewActive = currentStep === 'workspace' && layoutMode === 'preview';

  return (
    <header className="no-print sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigateStep('select')}
          className="text-[17px] font-bold tracking-tight text-[#1E3A5F] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A5F]"
        >
          교수·학습 자료 설계 비서
        </button>

        {/* Zone 2: Concise Single-Line Step Navigation */}
        <nav aria-label="작업 단계" className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigateStep('select')}
            className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isSelect
                ? 'border-[#1E3A5F] text-[#1E3A5F] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            1. 자료 유형 선택
          </button>
          <button
            type="button"
            onClick={() => onNavigateStep('workspace', 'split')}
            className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isInputActive
                ? 'border-[#1E3A5F] text-[#1E3A5F] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            2. 수업 정보 입력
          </button>
          <button
            type="button"
            onClick={() => onNavigateStep('workspace', 'preview')}
            className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isPreviewActive
                ? 'border-[#1E3A5F] text-[#1E3A5F] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            3. A4 문서 미리보기
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {currentStep === 'select' ? (
            <button
              type="button"
              onClick={() => onNavigateStep('workspace', 'split')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{selectedType === 'reading_worksheet' ? '활동지 작업실 열기' : '설계서 작업실 열기'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>A4 인쇄 · PDF 저장</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
