import React, { useMemo } from 'react';
import { CommonLessonInput, VocationalProjectData } from '../../types/document';
import { buildVocationalProjectBlocks, DocOrientation } from '../../utils/docBlocks';
import { PaginatedA4Document } from './PaginatedA4Document';

interface VocationalProjectPreviewProps {
  input: CommonLessonInput;
  data: VocationalProjectData;
  orientation: DocOrientation;
  sessionLayoutOverride: 'auto' | 'table' | 'cards';
  onPageCountChange?: (count: number) => void;
}

export const VocationalProjectPreview: React.FC<VocationalProjectPreviewProps> = ({
  input,
  data,
  orientation,
  sessionLayoutOverride,
  onPageCountChange,
}) => {
  const effectiveSessionLayout =
    sessionLayoutOverride === 'auto'
      ? data.sessionsSection.preferredLayout
      : sessionLayoutOverride;

  const blocks = useMemo(
    () =>
      buildVocationalProjectBlocks(input, data, {
        sessionLayout: effectiveSessionLayout,
      }),
    [input, data, effectiveSessionLayout]
  );

  return (
    <PaginatedA4Document
      blocks={blocks}
      orientation={orientation}
      footerLeft={`${input.schoolName || '인천비즈니스고등학교'} · 직업계고 실무 프로젝트 수업 설계서`}
      footerRight={`${input.department} · ${input.subject} · ${input.sessions}`}
      onPageCountChange={onPageCountChange}
    />
  );
};
