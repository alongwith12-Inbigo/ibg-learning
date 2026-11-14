import React, { useEffect, useState } from 'react';
import {
  CommonLessonInput,
  DocumentType,
  LessonDocumentPayload,
  WorkspaceLayoutMode,
} from '../types/document';
import { SamplePreset } from '../data/sampleDocuments';
import { DocOrientation } from '../utils/docBlocks';
import { LessonInputForm } from './LessonInputForm';
import { A4DocumentShell } from './preview/A4DocumentShell';
import { ReadingWorksheetPreview } from './preview/ReadingWorksheetPreview';
import { VocationalProjectPreview } from './preview/VocationalProjectPreview';

interface WorkspaceViewProps {
  documentType: DocumentType;
  activeDocument: LessonDocumentPayload;
  presets: SamplePreset[];
  activePresetId: string;
  layoutMode: WorkspaceLayoutMode;
  onChangeLayoutMode: (mode: WorkspaceLayoutMode) => void;
  onChangeInput: (updated: CommonLessonInput) => void;
  onSelectPreset: (presetId: string) => void;
  onChangeDocumentType: (type: DocumentType) => void;
  onPrint: () => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  documentType,
  activeDocument,
  presets,
  activePresetId,
  layoutMode,
  onChangeLayoutMode,
  onChangeInput,
  onSelectPreset,
  onChangeDocumentType,
  onPrint,
}) => {
  const [zoom, setZoom] = useState<number>(0.78);
  const [orientation, setOrientation] = useState<DocOrientation>(
    activeDocument.layoutOptions?.orientation ?? 'portrait'
  );
  const [pageCount, setPageCount] = useState<number>(1);
  const [includeTeacherNotes, setIncludeTeacherNotes] = useState<boolean>(false);
  const [sessionLayout, setSessionLayout] = useState<'auto' | 'table' | 'cards'>('auto');

  // 프리셋이나 문서 유형이 바뀔 때 용지 방향·배치 옵션을 기본값으로 깔끔하게 초기화
  useEffect(() => {
    setOrientation(activeDocument.layoutOptions?.orientation ?? 'portrait');
    setSessionLayout('auto');
  }, [activeDocument.id, activeDocument.layoutOptions?.orientation]);

  const showForm = layoutMode === 'split' || layoutMode === 'form';
  const showPreview = layoutMode === 'split' || layoutMode === 'preview';

  const effectiveZoom =
    orientation === 'landscape' && layoutMode === 'split'
      ? Math.min(zoom, 0.78)
      : zoom;

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-6">
      <div
        className={`grid gap-6 items-start ${
          layoutMode === 'split'
            ? 'grid-cols-1 xl:grid-cols-[440px_minmax(0,1fr)]'
            : 'grid-cols-1'
        }`}
      >
        {/* Left Pane: Input Form */}
        {showForm && (
          <section
            className={`no-print ${
              layoutMode === 'form' ? 'max-w-3xl mx-auto w-full' : 'w-full'
            }`}
          >
            <LessonInputForm
              documentType={documentType}
              input={activeDocument.input}
              presets={presets}
              activePresetId={activePresetId}
              onChangeInput={onChangeInput}
              onSelectPreset={onSelectPreset}
              onChangeDocumentType={onChangeDocumentType}
            />

            {layoutMode === 'form' && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => onChangeLayoutMode('split')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors cursor-pointer"
                >
                  분할 화면에서 A4 미리보기 확인
                </button>
              </div>
            )}
          </section>
        )}

        {/* Right Pane: A4 Document Preview */}
        {showPreview && (
          <section className="min-w-0 w-full">
            <A4DocumentShell
              documentType={documentType}
              zoom={effectiveZoom}
              onChangeZoom={setZoom}
              layoutMode={layoutMode}
              onChangeLayoutMode={onChangeLayoutMode}
              orientation={orientation}
              onChangeOrientation={setOrientation}
              pageCount={pageCount}
              includeTeacherNotes={includeTeacherNotes}
              onChangeIncludeTeacherNotes={setIncludeTeacherNotes}
              sessionLayout={sessionLayout}
              onChangeSessionLayout={setSessionLayout}
              onPrint={onPrint}
              documentLabel={activeDocument.input.topic}
            >
              {documentType === 'reading_worksheet' && activeDocument.readingWorksheet ? (
                <ReadingWorksheetPreview
                  key={activeDocument.id}
                  input={activeDocument.input}
                  data={activeDocument.readingWorksheet}
                  orientation={orientation}
                  includeTeacherNotes={includeTeacherNotes}
                  onPageCountChange={setPageCount}
                />
              ) : null}

              {documentType === 'vocational_project' && activeDocument.vocationalProject ? (
                <VocationalProjectPreview
                  key={activeDocument.id}
                  input={activeDocument.input}
                  data={activeDocument.vocationalProject}
                  orientation={orientation}
                  sessionLayoutOverride={sessionLayout}
                  onPageCountChange={setPageCount}
                />
              ) : null}
            </A4DocumentShell>
          </section>
        )}
      </div>
    </main>
  );
};
