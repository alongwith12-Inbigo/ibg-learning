import { useState } from 'react';
import {
  AppStep,
  CommonLessonInput,
  DocumentType,
  LessonDocumentPayload,
  WorkspaceLayoutMode,
} from './types/document';
import {
  READING_WORKSHEET_PRESETS,
  SamplePreset,
  VOCATIONAL_PROJECT_PRESETS,
} from './data/sampleDocuments';
import { TopNavBar } from './components/TopNavBar';
import { TypeSelectionView } from './components/TypeSelectionView';
import { WorkspaceView } from './components/WorkspaceView';
import { normalizeDocumentPayload } from './utils/documentAdapter';

function clonePayload(preset: SamplePreset): LessonDocumentPayload {
  return normalizeDocumentPayload(preset.payload, 'preset');
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('select');
  const [selectedType, setSelectedType] = useState<DocumentType>('reading_worksheet');
  const [layoutMode, setLayoutMode] = useState<WorkspaceLayoutMode>('split');

  const [readingPresetId, setReadingPresetId] = useState<string>(
    READING_WORKSHEET_PRESETS[0].id
  );
  const [projectPresetId, setProjectPresetId] = useState<string>(
    VOCATIONAL_PROJECT_PRESETS[0].id
  );

  const [readingDoc, setReadingDoc] = useState<LessonDocumentPayload>(() =>
    clonePayload(READING_WORKSHEET_PRESETS[0])
  );
  const [projectDoc, setProjectDoc] = useState<LessonDocumentPayload>(() =>
    clonePayload(VOCATIONAL_PROJECT_PRESETS[0])
  );

  const activeDocument =
    selectedType === 'reading_worksheet' ? readingDoc : projectDoc;
  const activePresets =
    selectedType === 'reading_worksheet'
      ? READING_WORKSHEET_PRESETS
      : VOCATIONAL_PROJECT_PRESETS;
  const activePresetId =
    selectedType === 'reading_worksheet' ? readingPresetId : projectPresetId;

  const handleSelectTypeFromHome = (type: DocumentType) => {
    setSelectedType(type);
    setLayoutMode('split');
    setCurrentStep('workspace');
  };

  const handleNavigateStep = (step: AppStep, nextLayout?: WorkspaceLayoutMode) => {
    setCurrentStep(step);
    if (nextLayout) {
      setLayoutMode(nextLayout);
    }
  };

  const handleChangeDocumentType = (type: DocumentType) => {
    setSelectedType(type);
  };

  const handleChangeInput = (updatedInput: CommonLessonInput) => {
    if (selectedType === 'reading_worksheet') {
      setReadingDoc((prev) => ({
        ...prev,
        input: updatedInput,
      }));
    } else {
      setProjectDoc((prev) => ({
        ...prev,
        input: updatedInput,
      }));
    }
  };

  const handleSelectPreset = (presetId: string) => {
    if (selectedType === 'reading_worksheet') {
      const found = READING_WORKSHEET_PRESETS.find((p) => p.id === presetId);
      if (found) {
        setReadingPresetId(found.id);
        setReadingDoc(clonePayload(found));
      }
    } else {
      const found = VOCATIONAL_PROJECT_PRESETS.find((p) => p.id === presetId);
      if (found) {
        setProjectPresetId(found.id);
        setProjectDoc(clonePayload(found));
      }
    }
  };

  const handlePrint = () => {
    if (currentStep !== 'workspace') {
      setCurrentStep('workspace');
      setLayoutMode('preview');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col">
      <TopNavBar
        currentStep={currentStep}
        selectedType={selectedType}
        layoutMode={layoutMode}
        onNavigateStep={handleNavigateStep}
        onPrint={handlePrint}
      />

      <div className="flex-1">
        {currentStep === 'select' ? (
          <TypeSelectionView
            selectedType={selectedType}
            onSelectType={handleSelectTypeFromHome}
          />
        ) : (
          <WorkspaceView
            documentType={selectedType}
            activeDocument={activeDocument}
            presets={activePresets}
            activePresetId={activePresetId}
            layoutMode={layoutMode}
            onChangeLayoutMode={setLayoutMode}
            onChangeInput={handleChangeInput}
            onSelectPreset={handleSelectPreset}
            onChangeDocumentType={handleChangeDocumentType}
            onPrint={handlePrint}
          />
        )}
      </div>
    </div>
  );
}
