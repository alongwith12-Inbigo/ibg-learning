import React, { useMemo } from 'react';
import { CommonLessonInput, ReadingWorksheetData } from '../../types/document';
import { buildReadingWorksheetBlocks, DocOrientation } from '../../utils/docBlocks';
import { PaginatedA4Document } from './PaginatedA4Document';

interface ReadingWorksheetPreviewProps {
  input: CommonLessonInput;
  data: ReadingWorksheetData;
  orientation: DocOrientation;
  includeTeacherNotes: boolean;
  onPageCountChange?: (count: number) => void;
}

export const ReadingWorksheetPreview: React.FC<ReadingWorksheetPreviewProps> = ({
  input,
  data,
  orientation,
  includeTeacherNotes,
  onPageCountChange,
}) => {
  const blocks = useMemo(
    () => buildReadingWorksheetBlocks(input, data, { includeTeacherNotes }),
    [input, data, includeTeacherNotes]
  );

  return (
    <PaginatedA4Document
      blocks={blocks}
      orientation={orientation}
      footerLeft={`${input.schoolName || '인천비즈니스고등학교'} · 읽걷쓰AI 수업활동지`}
      footerRight={`${input.department} · ${input.subject}`}
      onPageCountChange={onPageCountChange}
    />
  );
};
