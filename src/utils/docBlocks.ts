import {
  AI_USAGE_LABELS,
  CommonLessonInput,
  LESSON_MODE_LABELS,
  ReadingMaterialItem,
  ReadingWorksheetData,
  STUDENT_LEVEL_LABELS,
  VocationalProjectData,
} from '../types/document';

export type DocOrientation = 'portrait' | 'landscape';

export interface TableCellSpec {
  content: string | string[];
  isHeaderCell?: boolean;
  align?: 'left' | 'center';
  subtext?: string;
  isBulletList?: boolean;
  bold?: boolean;
}

export interface TableBlockSpec {
  type: 'table_block';
  id: string;
  sectionId: string;
  title?: string;
  subtitle?: string;
  headers: string[];
  colWidths?: string[];
  rows: TableCellSpec[][];
  isContinuation?: boolean;
  keepWithNext?: boolean;
  pageBreakBefore?: boolean;
  marginBottomPx: number;
}

export type DocBlock =
  | {
      type: 'doc_header';
      id: string;
      schoolLine: string;
      rightMeta: string;
      title: string;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'student_info_table';
      id: string;
      fields: string[];
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'meta_callout';
      id: string;
      leftCondition: string;
      rightTeacher?: string;
      objectiveLabel: string;
      objectiveText: string;
      teacherNoteText?: string;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'section_heading';
      id: string;
      sectionId: string;
      title: string;
      rightLabel?: string;
      guideText?: string;
      keepWithNext: true;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'reading_material_head';
      id: string;
      title: string;
      metaLabel: string;
      firstParagraph: string;
      closeBottom?: boolean;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'reading_paragraph';
      id: string;
      text: string;
      closeBottom?: boolean;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'reading_extras';
      id: string;
      material: ReadingMaterialItem;
      showFactCheckNotice: boolean;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'question_card';
      id: string;
      number: number;
      promptQuestion: string;
      instruction: string;
      scaffoldHint?: string;
      spaceType: 'short' | 'lines' | 'box' | 'table';
      linesCount?: number;
      tableColumns?: string[];
      tableRowLabels?: string[];
      emptyRowCount?: number;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'ai_step_card';
      id: string;
      stepNumber: number;
      stepTitle: string;
      instruction: string;
      promptExample?: string;
      spaceType: 'lines' | 'comparison_table' | 'checklist';
      linesCount?: number;
      tableColumns?: string[];
      tableRowLabels?: string[];
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'prose_card';
      id: string;
      heading?: string;
      paragraphs?: string[];
      listTitle?: string;
      listItems?: string[];
      mutedStyle?: boolean;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'sentence_starters';
      id: string;
      title: string;
      lines: string[];
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'writing_box';
      id: string;
      prompt: string;
      linesCount: number;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'teacher_feedback_box';
      id: string;
      guidanceFocus: string[];
      showGuidanceFocus: boolean;
      linesCount: number;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'session_card';
      id: string;
      sessionLabel: string;
      title: string;
      duration: string;
      sessionOutput: string;
      learningContent: string;
      studentActivities: string[];
      teacherSupport: string[];
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | {
      type: 'notice_box';
      id: string;
      lines: { label?: string; text: string }[];
      listItems?: string[];
      listTitle?: string;
      footerNote?: string;
      memoText?: string;
      keepWithNext?: boolean;
      pageBreakBefore?: boolean;
      marginBottomPx: number;
    }
  | TableBlockSpec;

export interface ReadingBuildOptions {
  includeTeacherNotes: boolean;
}

export interface ProjectBuildOptions {
  sessionLayout: 'table' | 'cards';
}

export function buildReadingWorksheetBlocks(
  input: CommonLessonInput,
  data: ReadingWorksheetData,
  options: ReadingBuildOptions
): DocBlock[] {
  const blocks: DocBlock[] = [];
  const displayTitle = input.topic.trim() || data.documentTitle;
  const displaySubtitle =
    input.subtitleNote.trim() ||
    `읽걷쓰AI 수업활동지 · ${LESSON_MODE_LABELS[input.lessonMode]} (${STUDENT_LEVEL_LABELS[input.studentLevel]})`;

  blocks.push({
    type: 'doc_header',
    id: 'rw-header',
    schoolLine: `${input.schoolName || '인천비즈니스고등학교'} · ${displaySubtitle}`,
    rightMeta: `${input.department} · ${input.grade} · ${input.subject} · ${input.sessions}`,
    title: displayTitle,
    keepWithNext: true,
    marginBottomPx: 12,
  });

  blocks.push({
    type: 'student_info_table',
    id: 'rw-student-info',
    fields: data.studentInfoFields,
    keepWithNext: true,
    marginBottomPx: 12,
  });

  blocks.push({
    type: 'meta_callout',
    id: 'rw-meta-callout',
    leftCondition: `${LESSON_MODE_LABELS[input.lessonMode]} · ${STUDENT_LEVEL_LABELS[input.studentLevel]} · AI ${AI_USAGE_LABELS[input.aiUsageLevel]}`,
    rightTeacher:
      options.includeTeacherNotes && input.teacherName ? `지도교사: ${input.teacherName}` : undefined,
    objectiveLabel: '[오늘의 배움 목표]',
    objectiveText: input.objectives,
    teacherNoteText:
      options.includeTeacherNotes && input.teacherNotes.trim()
        ? input.teacherNotes.trim()
        : undefined,
    marginBottomPx: 18,
  });

  // 1. 읽고·탐색하기
  if (data.readingSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.readingSection.id}`,
      sectionId: data.readingSection.id,
      title: data.readingSection.title,
      guideText: data.readingSection.guideText,
      keepWithNext: true,
      pageBreakBefore: data.readingSection.pageBreakBefore,
      marginBottomPx: 10,
    });

    data.readingSection.materials.forEach((mat) => {
      const [firstPara, ...restParas] = mat.paragraphs;
      const hasTerms = Boolean(mat.keyTerms && mat.keyTerms.length > 0);
      const hasComparison = Boolean(mat.comparisonBox);
      const hasFactNotice =
        (mat.isVirtualCase || mat.factCheckRequired) &&
        (options.includeTeacherNotes || mat.isVirtualCase);
      const hasExtras = hasTerms || hasComparison || hasFactNotice;

      blocks.push({
        type: 'reading_material_head',
        id: `${mat.id}-head`,
        title: mat.title,
        metaLabel: `${mat.materialType} · ${mat.sourceNote}`,
        firstParagraph: firstPara ?? '',
        closeBottom: restParas.length === 0 && !hasExtras,
        marginBottomPx: restParas.length === 0 && !hasExtras ? 14 : 8,
      });

      restParas.forEach((para, idx) => {
        const isLastPara = idx === restParas.length - 1;
        blocks.push({
          type: 'reading_paragraph',
          id: `${mat.id}-p-${idx + 1}`,
          text: para,
          closeBottom: isLastPara && !hasExtras,
          marginBottomPx: isLastPara && !hasExtras ? 14 : 8,
        });
      });

      if (hasExtras) {
        blocks.push({
          type: 'reading_extras',
          id: `${mat.id}-extras`,
          material: mat,
          showFactCheckNotice: options.includeTeacherNotes || mat.isVirtualCase,
          marginBottomPx: 14,
        });
      }
    });

    data.readingSection.questions.forEach((q) => {
      blocks.push({
        type: 'question_card',
        id: q.id,
        number: q.number,
        promptQuestion: q.promptQuestion,
        instruction: q.instruction,
        scaffoldHint: q.scaffoldHint,
        spaceType: q.spaceType,
        linesCount: q.linesCount,
        tableColumns: q.tableColumns,
        tableRowLabels: q.tableRowLabels,
        emptyRowCount: q.emptyRowCount,
        marginBottomPx: 12,
      });
    });
  }

  // 2. AI와 함께 탐구하고·검증하기
  if (data.aiInquirySection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.aiInquirySection.id}`,
      sectionId: data.aiInquirySection.id,
      title: data.aiInquirySection.title,
      guideText: data.aiInquirySection.guideSummary,
      keepWithNext: true,
      pageBreakBefore: data.aiInquirySection.pageBreakBefore,
      marginBottomPx: 10,
    });

    data.aiInquirySection.steps.forEach((step) => {
      blocks.push({
        type: 'ai_step_card',
        id: step.id,
        stepNumber: step.stepNumber,
        stepTitle: step.stepTitle,
        instruction: step.instruction,
        promptExample: step.promptExample,
        spaceType: step.spaceType,
        linesCount: step.linesCount,
        tableColumns: step.tableColumns,
        tableRowLabels: step.tableRowLabels,
        marginBottomPx: 12,
      });
    });

    if (data.aiInquirySection.verificationCriteria.length > 0) {
      blocks.push({
        type: 'table_block',
        id: 'rw-verification-table',
        sectionId: data.aiInquirySection.id,
        title: 'AI 답변 신뢰성 검증 기준표',
        headers: ['검증 점검 항목', '사실 확인 방법', '확인(✓)'],
        colWidths: ['34%', '54%', '12%'],
        rows: data.aiInquirySection.verificationCriteria.map((vc) => [
          { content: vc.checkPoint, bold: true },
          { content: vc.howToVerify },
          { content: '□', align: 'center' },
        ]),
        marginBottomPx: 18,
      });
    }
  }

  // 3. 나의 생각으로 쓰고 성찰하기
  if (data.writingReflectionSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.writingReflectionSection.id}`,
      sectionId: data.writingReflectionSection.id,
      title: data.writingReflectionSection.title,
      rightLabel: data.writingReflectionSection.activityStructureLabel,
      guideText: data.writingReflectionSection.writingPrompt,
      keepWithNext: true,
      pageBreakBefore: data.writingReflectionSection.pageBreakBefore,
      marginBottomPx: 10,
    });

    if (
      data.writingReflectionSection.sentenceStarters &&
      data.writingReflectionSection.sentenceStarters.length > 0
    ) {
      blocks.push({
        type: 'sentence_starters',
        id: 'rw-sentence-starters',
        title: '문장 완성 틀 (아래 빈칸을 채우며 생각을 정리해 보세요)',
        lines: data.writingReflectionSection.sentenceStarters,
        marginBottomPx: 12,
      });
    }

    data.writingReflectionSection.structuredTables?.forEach((st) => {
      const colWidths =
        st.headers.length === 4
          ? ['22%', '20%', '38%', '20%']
          : st.headers.length === 3
          ? ['24%', '36%', '40%']
          : undefined;

      blocks.push({
        type: 'table_block',
        id: st.id,
        sectionId: data.writingReflectionSection.id,
        title: st.title,
        subtitle: st.description,
        headers: st.headers,
        colWidths,
        rows: Array.from({ length: st.rowCount }).map((_, rIdx) => {
          const presetLabel = st.presetRowLabels?.[rIdx];
          return st.headers.map((_h, cIdx) =>
            cIdx === 0 && presetLabel
              ? { content: presetLabel, isHeaderCell: true }
              : { content: ' \n ' }
          );
        }),
        marginBottomPx: 12,
      });
    });

    blocks.push({
      type: 'writing_box',
      id: 'rw-reflection-box',
      prompt: data.writingReflectionSection.reflectionPrompt,
      linesCount: data.writingReflectionSection.writingLinesCount,
      marginBottomPx: 18,
    });
  }

  // 4. 오늘의 자기 점검
  if (data.selfCheckSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.selfCheckSection.id}`,
      sectionId: data.selfCheckSection.id,
      title: data.selfCheckSection.title,
      guideText: data.selfCheckSection.guideText,
      keepWithNext: true,
      pageBreakBefore: data.selfCheckSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'table_block',
      id: 'rw-self-check-table',
      sectionId: data.selfCheckSection.id,
      headers: ['영역', '점검 항목', '매우 그렇다', '그렇다', '보완 필요'],
      colWidths: ['15%', '57%', '9%', '9%', '10%'],
      rows: data.selfCheckSection.items.map((item) => [
        { content: item.category, isHeaderCell: true },
        { content: item.criterion },
        { content: '□', align: 'center' },
        { content: '□', align: 'center' },
        { content: '□', align: 'center' },
      ]),
      marginBottomPx: 16,
    });
  }

  // 5. 교사 피드백
  if (data.teacherFeedbackSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.teacherFeedbackSection.id}`,
      sectionId: data.teacherFeedbackSection.id,
      title: data.teacherFeedbackSection.title,
      keepWithNext: true,
      pageBreakBefore: data.teacherFeedbackSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'teacher_feedback_box',
      id: 'rw-teacher-feedback-box',
      guidanceFocus: data.teacherFeedbackSection.guidanceFocus,
      showGuidanceFocus: options.includeTeacherNotes,
      linesCount: data.teacherFeedbackSection.feedbackLinesCount,
      marginBottomPx: 8,
    });
  }

  return blocks;
}

export function buildVocationalProjectBlocks(
  input: CommonLessonInput,
  data: VocationalProjectData,
  options: ProjectBuildOptions
): DocBlock[] {
  const blocks: DocBlock[] = [];
  const displayTitle = input.topic.trim() || data.documentTitle;

  blocks.push({
    type: 'doc_header',
    id: 'vp-header',
    schoolLine: `${input.schoolName || '인천비즈니스고등학교'} · ${input.subtitleNote || data.documentSubtitle}`,
    rightMeta: '교사용 교수·학습 설계서',
    title: displayTitle,
    keepWithNext: true,
    marginBottomPx: 14,
  });

  // 1. 프로젝트 기본 정보
  if (data.basicInfoSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.basicInfoSection.id}`,
      sectionId: data.basicInfoSection.id,
      title: data.basicInfoSection.title,
      keepWithNext: true,
      pageBreakBefore: data.basicInfoSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-basic-info-card',
      listItems: [
        `학교 / 학과 / 학년: ${input.schoolName || '인천비즈니스고등학교'} · ${input.department} · ${input.grade}`,
        `교과명 / 운영 차시: ${input.subject} · ${input.sessions}${input.sessionMinutes ? ` (${input.sessionMinutes})` : ''}`,
        `수업 설계 조건: ${LESSON_MODE_LABELS[input.lessonMode]} · ${STUDENT_LEVEL_LABELS[input.studentLevel]} · AI ${AI_USAGE_LABELS[input.aiUsageLevel]}${input.teacherName ? ` · 설계 교사: ${input.teacherName}` : ''}`,
        `연계 직무 역할: ${data.basicInfoSection.targetJobRole}`,
        `핵심 직무 역량: ${data.basicInfoSection.ncsOrCoreCompetencies.join(' · ')}`,
      ],
      paragraphs: [`[수업 유형 적용 근거] ${data.basicInfoSection.lessonTypeRationale}`],
      marginBottomPx: 16,
    });
  }

  // 2. 프로젝트 개요 및 학습 목표
  if (data.overviewSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.overviewSection.id}`,
      sectionId: data.overviewSection.id,
      title: data.overviewSection.title,
      keepWithNext: true,
      pageBreakBefore: data.overviewSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-overview-bg',
      heading: '기획 배경 및 개요',
      paragraphs: [data.overviewSection.background, data.overviewSection.projectSummary],
      marginBottomPx: 10,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-overview-objectives',
      heading: '핵심 학습 목표',
      paragraphs: input.objectives.trim()
        ? [`[교사 설정 중점 목표] ${input.objectives}`]
        : undefined,
      listItems: data.overviewSection.learningObjectives,
      marginBottomPx: 10,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-overview-emphasis',
      heading: '수업 운영 강조 사항',
      listItems: data.overviewSection.emphasisPoints,
      mutedStyle: true,
      marginBottomPx: 16,
    });
  }

  // 3. 실무 상황 및 수행 과제
  if (data.scenarioSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.scenarioSection.id}`,
      sectionId: data.scenarioSection.id,
      title: data.scenarioSection.title,
      keepWithNext: true,
      pageBreakBefore: data.scenarioSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-scenario-context',
      heading: data.scenarioSection.scenarioTitle,
      paragraphs: [
        data.scenarioSection.practicalContext,
        `학생 직무 역할: ${data.scenarioSection.studentRole}`,
      ],
      listTitle: '수행 조건 및 실무 제약',
      listItems: data.scenarioSection.workingConditions,
      mutedStyle: true,
      marginBottomPx: 10,
    });

    blocks.push({
      type: 'table_block',
      id: 'vp-core-tasks-table',
      sectionId: data.scenarioSection.id,
      headers: ['과제 구분', '수행 과제명', '구체적 수행 내용', '연계 산출물'],
      colWidths: ['13%', '23%', '42%', '22%'],
      rows: data.scenarioSection.coreTasks.map((t) => [
        { content: t.taskCode, bold: true },
        { content: t.taskName, bold: true },
        { content: t.description },
        { content: t.deliverable },
      ]),
      marginBottomPx: 16,
    });
  }

  // 4. 차시별 교수·학습 활동
  if (data.sessionsSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.sessionsSection.id}`,
      sectionId: data.sessionsSection.id,
      title: data.sessionsSection.title,
      keepWithNext: true,
      pageBreakBefore: data.sessionsSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    if (options.sessionLayout === 'table') {
      blocks.push({
        type: 'table_block',
        id: 'vp-sessions-table',
        sectionId: data.sessionsSection.id,
        headers: ['차시', '학습 주제 및 내용', '학생 활동', '교사 지도·지원', '차시 산출물'],
        colWidths: ['10%', '22%', '30%', '24%', '14%'],
        rows: data.sessionsSection.sessions.map((ses) => [
          { content: ses.sessionLabel, subtext: ses.duration, isHeaderCell: true, align: 'center' },
          { content: ses.title, subtext: ses.learningContent, bold: true },
          { content: ses.studentActivities, isBulletList: true },
          { content: ses.teacherSupport, isBulletList: true },
          { content: ses.sessionOutput },
        ]),
        marginBottomPx: 16,
      });
    } else {
      data.sessionsSection.sessions.forEach((ses) => {
        blocks.push({
          type: 'session_card',
          id: ses.id,
          sessionLabel: ses.sessionLabel,
          title: ses.title,
          duration: ses.duration,
          sessionOutput: ses.sessionOutput,
          learningContent: ses.learningContent,
          studentActivities: ses.studentActivities,
          teacherSupport: ses.teacherSupport,
          marginBottomPx: 10,
        });
      });
    }
  }

  // 5. 최종 산출물 및 제출 기준
  if (data.deliverablesSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.deliverablesSection.id}`,
      sectionId: data.deliverablesSection.id,
      title: data.deliverablesSection.title,
      keepWithNext: true,
      pageBreakBefore: data.deliverablesSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'table_block',
      id: 'vp-deliverables-table',
      sectionId: data.deliverablesSection.id,
      headers: ['구분', '제출 기준 및 필수 확인 내용'],
      colWidths: ['24%', '76%'],
      rows: [
        [
          { content: '최종 산출물 명칭', isHeaderCell: true },
          { content: data.deliverablesSection.finalDeliverableName, bold: true },
        ],
        [
          { content: '필수 제출 구성', isHeaderCell: true },
          { content: data.deliverablesSection.requiredComponents, isBulletList: true },
        ],
        [
          { content: '규격 및 품질 기준', isHeaderCell: true },
          { content: data.deliverablesSection.submissionStandards, isBulletList: true },
        ],
        [
          { content: '제출 전 최종 확인', isHeaderCell: true },
          { content: data.deliverablesSection.verificationItems, isBulletList: true },
        ],
      ],
      marginBottomPx: 16,
    });
  }

  // 6. 프로젝트 평가 계획 (4수준 루브릭)
  if (data.evaluationSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.evaluationSection.id}`,
      sectionId: data.evaluationSection.id,
      title: data.evaluationSection.title,
      keepWithNext: true,
      pageBreakBefore: data.evaluationSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'prose_card',
      id: 'vp-eval-notice',
      paragraphs: [
        `평가 방법: ${data.evaluationSection.evaluationMethods.join(' · ')}`,
        data.evaluationSection.schoolAlignmentNotice,
      ],
      mutedStyle: true,
      keepWithNext: true,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'table_block',
      id: 'vp-rubric-table',
      sectionId: data.evaluationSection.id,
      headers: ['평가 요소', '우수 (4)', '보통 이상 (3)', '기초 (2)', '미도달 (1)'],
      colWidths: ['16%', '21%', '21%', '21%', '21%'],
      rows: data.evaluationSection.rubric.map((row) => [
        {
          content: row.criterion,
          subtext: `반영 비중 ${row.weight}`,
          isHeaderCell: true,
        },
        { content: row.excellent },
        { content: row.good },
        { content: row.basic },
        { content: row.insufficient },
      ]),
      marginBottomPx: 16,
    });
  }

  // 7. 실무 도구 활용 및 교사 지도 유의사항
  if (data.guidanceSection.visible) {
    blocks.push({
      type: 'section_heading',
      id: `sec-${data.guidanceSection.id}`,
      sectionId: data.guidanceSection.id,
      title: data.guidanceSection.title,
      keepWithNext: true,
      pageBreakBefore: data.guidanceSection.pageBreakBefore,
      marginBottomPx: 8,
    });

    blocks.push({
      type: 'table_block',
      id: 'vp-tools-table',
      sectionId: data.guidanceSection.id,
      headers: ['도구 구분', '활용 도구 및 환경', '수업 내 활용 목적', '학교 보유 확인'],
      colWidths: ['16%', '34%', '34%', '16%'],
      rows: data.guidanceSection.tools.map((t) => [
        { content: t.category, isHeaderCell: true },
        { content: t.toolName },
        { content: t.purpose },
        {
          content: t.schoolCheckRequired ? '사전 확인 필요' : '일반 웹/교실 활용',
          align: 'center',
        },
      ]),
      marginBottomPx: 10,
    });

    blocks.push({
      type: 'notice_box',
      id: 'vp-guidance-notice',
      lines: [
        { label: '생성형 AI 활용 및 검증 지도', text: data.guidanceSection.aiUsagePolicy },
      ],
      listTitle: '개인정보·저작권·안전 지도 유의사항',
      listItems: data.guidanceSection.safetyAndEthicsPoints,
      footerNote: data.guidanceSection.facilityCheckNotice,
      memoText: input.teacherNotes.trim() || data.guidanceSection.teacherMemo,
      marginBottomPx: 8,
    });
  }

  return blocks;
}
