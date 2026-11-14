import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import {
  AiUsageLevel,
  CommonLessonInput,
  DocumentType,
  LessonMode,
  StudentLevel,
} from '../types/document';
import { SamplePreset } from '../data/sampleDocuments';

interface LessonInputFormProps {
  documentType: DocumentType;
  input: CommonLessonInput;
  presets: SamplePreset[];
  activePresetId: string;
  onChangeInput: (updated: CommonLessonInput) => void;
  onSelectPreset: (presetId: string) => void;
  onChangeDocumentType: (type: DocumentType) => void;
}

const STUDENT_LEVEL_OPTIONS: { value: StudentLevel; label: string; hint: string }[] = [
  { value: 'basic', label: '기초', hint: '짧은 문장 · 단계별 안내 · 문장 완성 틀' },
  { value: 'standard', label: '보통', hint: '개념과 사례 균형 · 질문 생성 · 근거 설명' },
  { value: 'advanced', label: '심화', hint: '복수 자료 비교 · 상충 근거 평가 · 대안 제안' },
];

const LESSON_MODE_OPTIONS: { value: LessonMode; label: string; hint: string }[] = [
  { value: 'individual', label: '개별탐구형', hint: '개인 질문 설정 · 개인 탐구 기록 · 자기 결론' },
  { value: 'group', label: '모둠협력형', hint: '역할 분담표 · 의견 비교 · 공동 의사결정' },
  { value: 'discussion', label: '토의·토론형', hint: '쟁점 설정 · AI 반론 탐색 · 주장·반박 기록' },
];

const AI_USAGE_OPTIONS: { value: AiUsageLevel; label: string }[] = [
  { value: 'basic', label: '기본 활용' },
  { value: 'active', label: '적극 활용' },
];

const GRADE_OPTIONS = ['1학년', '2학년', '3학년', '전학년/선택'];

export const LessonInputForm: React.FC<LessonInputFormProps> = ({
  documentType,
  input,
  presets,
  activePresetId,
  onChangeInput,
  onSelectPreset,
  onChangeDocumentType,
}) => {
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const updateField = <K extends keyof CommonLessonInput>(
    key: K,
    value: CommonLessonInput[K]
  ) => {
    onChangeInput({ ...input, [key]: value });
  };

  const selectedLevelHint =
    STUDENT_LEVEL_OPTIONS.find((o) => o.value === input.studentLevel)?.hint ?? '';
  const selectedModeHint =
    LESSON_MODE_OPTIONS.find((o) => o.value === input.lessonMode)?.hint ?? '';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Document Type Switcher */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900">수업 정보 입력</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            입력한 기본 정보는 오른쪽 A4 문서 양식에 실시간 반영됩니다.
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => onChangeDocumentType('reading_worksheet')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              documentType === 'reading_worksheet'
                ? 'bg-white text-[#1E3A5F] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            읽걷쓰AI 활동지
          </button>
          <button
            type="button"
            onClick={() => onChangeDocumentType('vocational_project')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              documentType === 'vocational_project'
                ? 'bg-white text-[#1E3A5F] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            실무 프로젝트
          </button>
        </div>
      </div>

      {/* Preset Sample Selector for Stage 1 Testing */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-700">
            샘플 테스트 데이터 전환 (1단계 양식 검증용)
          </span>
          <span className="text-[11px] text-slate-500">
            수준·수업유형·차시별 구조 비교
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {presets.map((preset) => {
            const isActive = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                className={`w-full text-left px-3 py-2 rounded-md border text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#1E3A5F] text-[#1E3A5F]'
                    : 'bg-white/60 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold">{preset.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 1: 기본 정보 */}
      <fieldset className="space-y-3.5">
        <legend className="text-xs font-semibold text-[#1E3A5F] tracking-wide mb-1">
          01. 학교 및 교과 기본 정보
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="schoolName" className="block text-xs font-medium text-slate-700 mb-1">
              학교명
            </label>
            <input
              id="schoolName"
              type="text"
              value={input.schoolName}
              onChange={(e) => updateField('schoolName', e.target.value)}
              placeholder="인천비즈니스고등학교"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-xs font-medium text-slate-700 mb-1">
              학과
            </label>
            <input
              id="department"
              type="text"
              value={input.department}
              onChange={(e) => updateField('department', e.target.value)}
              placeholder="예: 콘텐츠디자인과, 경영사무과"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label htmlFor="grade" className="block text-xs font-medium text-slate-700 mb-1">
              학년
            </label>
            <select
              id="grade"
              value={input.grade}
              onChange={(e) => updateField('grade', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
            >
              {GRADE_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="subject" className="block text-xs font-medium text-slate-700 mb-1">
              교과
            </label>
            <input
              id="subject"
              type="text"
              value={input.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              placeholder="예: 영상제작기초"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="sessions" className="block text-xs font-medium text-slate-700 mb-1">
              운영 차시
            </label>
            <input
              id="sessions"
              type="text"
              value={input.sessions}
              onChange={(e) => updateField('sessions', e.target.value)}
              placeholder="예: 2차시, 4차시"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="topic" className="block text-xs font-medium text-slate-700 mb-1">
            {documentType === 'reading_worksheet' ? '수업 주제' : '프로젝트 주제'}
          </label>
          <input
            id="topic"
            type="text"
            value={input.topic}
            onChange={(e) => updateField('topic', e.target.value)}
            placeholder="수업 또는 프로젝트의 핵심 주제를 입력하세요"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
          />
        </div>
      </fieldset>

      {/* Section 2: 수업 설계 조건 */}
      <fieldset className="space-y-4 pt-4 border-t border-slate-200">
        <legend className="text-xs font-semibold text-[#1E3A5F] tracking-wide mb-1">
          02. 학생 수준 및 수업 유형 설계 조건
        </legend>

        {/* 학생 수준 */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">학생 수준</span>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
            {STUDENT_LEVEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('studentLevel', opt.value)}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  input.studentLevel === opt.value
                    ? 'bg-white text-[#1E3A5F] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">{selectedLevelHint}</p>
        </div>

        {/* 수업 유형 */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">수업 유형</span>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
            {LESSON_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('lessonMode', opt.value)}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  input.lessonMode === opt.value
                    ? 'bg-white text-[#1E3A5F] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">{selectedModeHint}</p>
        </div>

        {/* AI 활용 정도 */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">AI 활용 정도</span>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
            {AI_USAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField('aiUsageLevel', opt.value)}
                className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  input.aiUsageLevel === opt.value
                    ? 'bg-white text-[#1E3A5F] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Section 3: 수업 목표 및 요청사항 */}
      <fieldset className="space-y-3.5 pt-4 border-t border-slate-200">
        <legend className="text-xs font-semibold text-[#1E3A5F] tracking-wide mb-1">
          03. 수업 목표 및 교사 요청 사항
        </legend>

        <div>
          <label htmlFor="objectives" className="block text-xs font-medium text-slate-700 mb-1">
            수업 목표 및 강조 사항
          </label>
          <textarea
            id="objectives"
            rows={3}
            value={input.objectives}
            onChange={(e) => updateField('objectives', e.target.value)}
            placeholder="학생들이 이번 수업에서 꼭 도달해야 할 목표나 강조할 개념을 적어주세요."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F] leading-relaxed"
          />
        </div>

        <div>
          <label htmlFor="teacherNotes" className="block text-xs font-medium text-slate-700 mb-1">
            교사가 추가로 요청할 사항
          </label>
          <textarea
            id="teacherNotes"
            rows={2}
            value={input.teacherNotes}
            onChange={(e) => updateField('teacherNotes', e.target.value)}
            placeholder="예: 실습실 장비 조건, 유의사항, 포함할 특정 사례 등"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F] leading-relaxed"
          />
        </div>
      </fieldset>

      {/* Expandable Optional Details */}
      <div className="pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setShowAdvancedFields((prev) => !prev)}
          className="w-full flex items-center justify-between py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <span>선택 입력 항목 펼치기 (지도 교사명 · 차시 시간 · 문서 부제)</span>
          {showAdvancedFields ? (
            <ChevronUp className="w-4 h-4 text-slate-500" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" aria-hidden="true" />
          )}
        </button>

        {showAdvancedFields && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="teacherName" className="block text-xs font-medium text-slate-700 mb-1">
                  설계 교사
                </label>
                <input
                  id="teacherName"
                  type="text"
                  value={input.teacherName}
                  onChange={(e) => updateField('teacherName', e.target.value)}
                  placeholder="성명"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>
              <div>
                <label htmlFor="sessionMinutes" className="block text-xs font-medium text-slate-700 mb-1">
                  수업 시간 구성
                </label>
                <input
                  id="sessionMinutes"
                  type="text"
                  value={input.sessionMinutes}
                  onChange={(e) => updateField('sessionMinutes', e.target.value)}
                  placeholder="예: 50분 × 2차시"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subtitleNote" className="block text-xs font-medium text-slate-700 mb-1">
                문서 상단 분류 표기
              </label>
              <input
                id="subtitleNote"
                type="text"
                value={input.subtitleNote}
                onChange={(e) => updateField('subtitleNote', e.target.value)}
                placeholder="예: 읽걷쓰AI 모둠협력 탐구 활동지"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E3A5F]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          학생의 실명, 연락처, 주민번호 등 개인 식별정보는 입력하지 마세요. 모든 데이터는 브라우저 화면 내에서만 처리됩니다.
        </span>
      </div>
    </div>
  );
};
