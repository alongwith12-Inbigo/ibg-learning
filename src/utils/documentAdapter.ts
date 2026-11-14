import {
  AiGeneratedDocumentBody,
  DocumentLayoutOptions,
  DocumentSource,
  LessonDocumentPayload,
  SectionLayoutMeta,
} from '../types/document';

export const DEFAULT_LAYOUT_OPTIONS: DocumentLayoutOptions = {
  orientation: 'portrait',
  showPageNumbers: true,
  fontScale: 1,
};

function normalizeSectionMeta<T extends SectionLayoutMeta>(section: T): T {
  return {
    ...section,
    visible: section.visible ?? true,
    pageBreakBefore: section.pageBreakBefore ?? false,
  };
}

/**
 * 프리셋, 수동 붙여넣기, 향후 AI API 응답 등 모든 경로에서 들어오는 문서 데이터를
 * 편집·미리보기·A4 인쇄가 공통으로 소비하는 정규화된 구조로 맞춥니다.
 */
export function normalizeDocumentPayload(
  payload: LessonDocumentPayload,
  sourceOverride?: DocumentSource
): LessonDocumentPayload {
  const cloned = JSON.parse(JSON.stringify(payload)) as LessonDocumentPayload;

  cloned.schemaVersion = '1.0';
  cloned.source = sourceOverride ?? cloned.source ?? 'preset';
  cloned.layoutOptions = {
    ...DEFAULT_LAYOUT_OPTIONS,
    ...(cloned.layoutOptions ?? {}),
  };

  if (cloned.readingWorksheet) {
    cloned.readingWorksheet = {
      ...cloned.readingWorksheet,
      readingSection: normalizeSectionMeta(cloned.readingWorksheet.readingSection),
      aiInquirySection: normalizeSectionMeta(cloned.readingWorksheet.aiInquirySection),
      writingReflectionSection: normalizeSectionMeta(
        cloned.readingWorksheet.writingReflectionSection
      ),
      selfCheckSection: normalizeSectionMeta(cloned.readingWorksheet.selfCheckSection),
      teacherFeedbackSection: normalizeSectionMeta(
        cloned.readingWorksheet.teacherFeedbackSection
      ),
    };
  }

  if (cloned.vocationalProject) {
    cloned.vocationalProject = {
      ...cloned.vocationalProject,
      basicInfoSection: normalizeSectionMeta(cloned.vocationalProject.basicInfoSection),
      overviewSection: normalizeSectionMeta(cloned.vocationalProject.overviewSection),
      scenarioSection: normalizeSectionMeta(cloned.vocationalProject.scenarioSection),
      sessionsSection: normalizeSectionMeta(cloned.vocationalProject.sessionsSection),
      deliverablesSection: normalizeSectionMeta(cloned.vocationalProject.deliverablesSection),
      evaluationSection: normalizeSectionMeta(cloned.vocationalProject.evaluationSection),
      guidanceSection: normalizeSectionMeta(cloned.vocationalProject.guidanceSection),
    };
  }

  return cloned;
}

/**
 * 수동 붙여넣기 결과 또는 향후 Gemini/OpenAI API 응답 본문을
 * 현재 교사의 수업 입력 정보(input)와 결합해 단일 문서 페이로드로 변환합니다.
 */
export function applyAiBodyToDocument(
  currentDoc: LessonDocumentPayload,
  aiBody: AiGeneratedDocumentBody,
  source: DocumentSource
): LessonDocumentPayload {
  const merged: LessonDocumentPayload = {
    ...currentDoc,
    schemaVersion: '1.0',
    documentType: aiBody.documentType,
    source,
    updatedAt: new Date().toISOString().slice(0, 10),
    readingWorksheet:
      aiBody.documentType === 'reading_worksheet'
        ? aiBody.readingWorksheet
        : currentDoc.readingWorksheet,
    vocationalProject:
      aiBody.documentType === 'vocational_project'
        ? aiBody.vocationalProject
        : currentDoc.vocationalProject,
  };

  return normalizeDocumentPayload(merged, source);
}
