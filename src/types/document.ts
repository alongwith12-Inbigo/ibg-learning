export type DocumentType = 'reading_worksheet' | 'vocational_project';

export type StudentLevel = 'basic' | 'standard' | 'advanced';

export type LessonMode = 'individual' | 'group' | 'discussion';

export type AiUsageLevel = 'basic' | 'active';

export type AppStep = 'select' | 'workspace';

export type WorkspaceLayoutMode = 'split' | 'form' | 'preview';

export interface CommonLessonInput {
  schoolName: string;
  department: string;
  subject: string;
  grade: string;
  topic: string;
  studentLevel: StudentLevel;
  lessonMode: LessonMode;
  sessions: string;
  objectives: string;
  aiUsageLevel: AiUsageLevel;
  teacherNotes: string;
  // Extensible fields for future phases & detailed customization
  teacherName: string;
  sessionMinutes: string;
  subtitleNote: string;
}

export interface SectionLayoutMeta {
  id: string;
  title: string;
  visible: boolean;
  pageBreakBefore: boolean;
}

/* ============================================================================
 * 1. 읽걷쓰AI 수업활동지 (학생용 활동지) 데이터 구조
 * ========================================================================== */

export type RecordingSpaceType = 'short' | 'lines' | 'box' | 'table';

export interface ReadingTerm {
  term: string;
  explanation: string;
}

export interface ReadingComparisonBox {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export interface ReadingMaterialItem {
  id: string;
  title: string;
  materialType: '사례 자료' | '개념 설명' | '비교 자료' | '상황 제시문';
  sourceNote: string;
  isVirtualCase: boolean;
  factCheckRequired: boolean;
  factCheckNote?: string;
  paragraphs: string[];
  keyTerms?: ReadingTerm[];
  comparisonBox?: ReadingComparisonBox;
}

export interface ExplorationQuestion {
  id: string;
  number: number;
  instruction: string;
  promptQuestion: string;
  scaffoldHint?: string;
  spaceType: RecordingSpaceType;
  linesCount?: number;
  tableColumns?: string[];
  tableRowLabels?: string[];
  emptyRowCount?: number;
}

export interface AiInquiryStep {
  id: string;
  stepNumber: number;
  stepTitle: string;
  instruction: string;
  promptExample?: string;
  spaceType: 'lines' | 'comparison_table' | 'checklist';
  linesCount?: number;
  tableColumns?: string[];
  tableRowLabels?: string[];
}

export interface VerificationCriterion {
  id: string;
  checkPoint: string;
  howToVerify: string;
}

export interface StructuredActivityTable {
  id: string;
  title: string;
  description: string;
  headers: string[];
  rowCount: number;
  presetRowLabels?: string[];
}

export interface SelfCheckItem {
  id: string;
  category: string;
  criterion: string;
}

export interface ReadingWorksheetData {
  documentTitle: string;
  documentSubtitle: string;
  studentInfoFields: string[];
  readingSection: SectionLayoutMeta & {
    guideText: string;
    materials: ReadingMaterialItem[];
    questions: ExplorationQuestion[];
  };
  aiInquirySection: SectionLayoutMeta & {
    guideSummary: string;
    steps: AiInquiryStep[];
    verificationCriteria: VerificationCriterion[];
  };
  writingReflectionSection: SectionLayoutMeta & {
    activityStructureLabel: string;
    writingPrompt: string;
    sentenceStarters?: string[];
    structuredTables?: StructuredActivityTable[];
    reflectionPrompt: string;
    writingLinesCount: number;
  };
  selfCheckSection: SectionLayoutMeta & {
    guideText: string;
    items: SelfCheckItem[];
  };
  teacherFeedbackSection: SectionLayoutMeta & {
    guidanceFocus: string[];
    feedbackLinesCount: number;
  };
}

/* ============================================================================
 * 2. 직업계고 실무 프로젝트 설계서 (교사용 설계서) 데이터 구조
 * ========================================================================== */

export interface PracticalCoreTask {
  id: string;
  taskCode: string;
  taskName: string;
  description: string;
  deliverable: string;
}

export interface ProjectSessionItem {
  id: string;
  sessionLabel: string;
  title: string;
  duration: string;
  learningContent: string;
  studentActivities: string[];
  teacherSupport: string[];
  sessionOutput: string;
}

export interface RubricRow {
  id: string;
  criterion: string;
  weight: string;
  excellent: string; // 우수 (4)
  good: string; // 보통 이상 (3)
  basic: string; // 기초 (2)
  insufficient: string; // 미도달 (1)
}

export interface PracticalToolItem {
  id: string;
  category: string;
  toolName: string;
  purpose: string;
  schoolCheckRequired: boolean;
}

export interface VocationalProjectData {
  documentTitle: string;
  documentSubtitle: string;
  basicInfoSection: SectionLayoutMeta & {
    projectTitle: string;
    targetJobRole: string;
    ncsOrCoreCompetencies: string[];
    lessonTypeRationale: string;
  };
  overviewSection: SectionLayoutMeta & {
    background: string;
    projectSummary: string;
    learningObjectives: string[];
    emphasisPoints: string[];
  };
  scenarioSection: SectionLayoutMeta & {
    scenarioTitle: string;
    practicalContext: string;
    studentRole: string;
    workingConditions: string[];
    coreTasks: PracticalCoreTask[];
  };
  sessionsSection: SectionLayoutMeta & {
    preferredLayout: 'table' | 'cards';
    sessions: ProjectSessionItem[];
  };
  deliverablesSection: SectionLayoutMeta & {
    finalDeliverableName: string;
    requiredComponents: string[];
    submissionStandards: string[];
    verificationItems: string[];
  };
  evaluationSection: SectionLayoutMeta & {
    schoolAlignmentNotice: string;
    evaluationMethods: string[];
    landscapeRecommended: boolean;
    rubric: RubricRow[];
  };
  guidanceSection: SectionLayoutMeta & {
    tools: PracticalToolItem[];
    aiUsagePolicy: string;
    safetyAndEthicsPoints: string[];
    facilityCheckNotice: string;
    teacherMemo: string;
  };
}

/* ============================================================================
 * 3. 통합 문서 페이로드 (향후 프롬프트/붙여넣기/API 연동 및 자동 조판 공통 계약)
 * ========================================================================== */

export type DocumentSource =
  | 'preset'
  | 'manual_paste'
  | 'ai_api'
  | 'file_import'
  | 'manual_edit';

export interface DocumentLayoutOptions {
  orientation: 'portrait' | 'landscape';
  showPageNumbers: boolean;
  fontScale?: number;
}

export interface AiGeneratedDocumentBody {
  schemaVersion: '1.0';
  documentType: DocumentType;
  readingWorksheet?: ReadingWorksheetData;
  vocationalProject?: VocationalProjectData;
  qualityWarnings?: string[];
}

export interface DocumentTransformResult {
  ok: boolean;
  document?: LessonDocumentPayload;
  errors: string[];
  warnings: string[];
}

export interface LessonDocumentPayload {
  schemaVersion: '1.0';
  id: string;
  documentType: DocumentType;
  source?: DocumentSource;
  updatedAt: string;
  input: CommonLessonInput;
  layoutOptions?: DocumentLayoutOptions;
  readingWorksheet?: ReadingWorksheetData;
  vocationalProject?: VocationalProjectData;
}

export const STUDENT_LEVEL_LABELS: Record<StudentLevel, string> = {
  basic: '기초 수준',
  standard: '보통 수준',
  advanced: '심화 수준',
};

export const LESSON_MODE_LABELS: Record<LessonMode, string> = {
  individual: '개별탐구형',
  group: '모둠협력형',
  discussion: '토의·토론형',
};

export const AI_USAGE_LABELS: Record<AiUsageLevel, string> = {
  basic: '기본 활용 (보조·확인)',
  active: '적극 활용 (탐구·검증 파트너)',
};
