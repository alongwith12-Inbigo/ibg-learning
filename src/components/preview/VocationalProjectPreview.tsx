import React, { useState } from 'react';
import {
  AI_USAGE_LABELS,
  CommonLessonInput,
  LESSON_MODE_LABELS,
  STUDENT_LEVEL_LABELS,
  VocationalProjectData,
} from '../../types/document';

interface VocationalProjectPreviewProps {
  input: CommonLessonInput;
  data: VocationalProjectData;
}

export const VocationalProjectPreview: React.FC<VocationalProjectPreviewProps> = ({
  input,
  data,
}) => {
  const [sessionViewOverride, setSessionViewOverride] = useState<'auto' | 'table' | 'cards'>('auto');

  const displayTitle = input.topic.trim() || data.documentTitle;
  const sessionLayout =
    sessionViewOverride === 'auto' ? data.sessionsSection.preferredLayout : sessionViewOverride;

  return (
    <div className="text-[#111827] text-[9.6pt] leading-[1.58]">
      {/* Official Header */}
      <header className="border-t-[3px] border-[#1E3A5F] pt-3 pb-3 mb-4 border-b border-slate-300">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <span className="text-[9pt] font-semibold text-[#1E3A5F]">
            {input.schoolName || '인천비즈니스고등학교'} · {input.subtitleNote || data.documentSubtitle}
          </span>
          <span className="text-[8.5pt] text-slate-600 tabular-nums shrink-0">
            교사용 교수·학습 설계서
          </span>
        </div>
        <h1 className="text-[15.5pt] font-bold text-slate-900 leading-[1.35] tracking-tight">
          {displayTitle}
        </h1>
      </header>

      {/* 1. 프로젝트 기본 정보 */}
      {data.basicInfoSection.visible && (
        <section
          data-doc-section={data.basicInfoSection.id}
          className={`mb-5 ${data.basicInfoSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.basicInfoSection.title}
          </h2>
          <table className="doc-table">
            <tbody>
              <tr>
                <th className="w-[16%] bg-slate-100 text-[#1E3A5F]">학교명</th>
                <td className="w-[34%]">{input.schoolName || '인천비즈니스고등학교'}</td>
                <th className="w-[16%] bg-slate-100 text-[#1E3A5F]">학과 / 학년</th>
                <td className="w-[34%]">{input.department} · {input.grade}</td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">교과명</th>
                <td>{input.subject}</td>
                <th className="bg-slate-100 text-[#1E3A5F]">운영 차시</th>
                <td className="tabular-nums">
                  {input.sessions}
                  {input.sessionMinutes ? ` (${input.sessionMinutes})` : ''}
                </td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">수업 유형</th>
                <td>{LESSON_MODE_LABELS[input.lessonMode]}</td>
                <th className="bg-slate-100 text-[#1E3A5F]">학생 수준</th>
                <td>{STUDENT_LEVEL_LABELS[input.studentLevel]}</td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">AI 활용 정도</th>
                <td>{AI_USAGE_LABELS[input.aiUsageLevel]}</td>
                <th className="bg-slate-100 text-[#1E3A5F]">설계 교사</th>
                <td>{input.teacherName || '미입력'}</td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">연계 직무 역할</th>
                <td colSpan={3}>{data.basicInfoSection.targetJobRole}</td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">핵심 직무 역량</th>
                <td colSpan={3}>
                  {data.basicInfoSection.ncsOrCoreCompetencies.join(' · ')}
                </td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">수업 유형 적용 근거</th>
                <td colSpan={3}>{data.basicInfoSection.lessonTypeRationale}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* 2. 프로젝트 개요 및 학습 목표 */}
      {data.overviewSection.visible && (
        <section
          data-doc-section={data.overviewSection.id}
          className={`mb-5 ${data.overviewSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.overviewSection.title}
          </h2>
          <div className="space-y-2.5 border border-slate-300 p-3">
            <div>
              <h3 className="text-[9.5pt] font-bold text-slate-900 mb-1">기획 배경 및 개요</h3>
              <p className="text-[9.3pt] text-slate-800 leading-[1.65]">
                {data.overviewSection.background}
              </p>
              <p className="text-[9.3pt] text-slate-800 leading-[1.65] mt-1.5">
                {data.overviewSection.projectSummary}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <h3 className="text-[9.5pt] font-bold text-slate-900 mb-1">핵심 학습 목표</h3>
              {input.objectives.trim() && (
                <p className="text-[9.2pt] text-[#1E3A5F] font-medium mb-1.5">
                  [교사 설정 중점 목표] {input.objectives}
                </p>
              )}
              <ul className="list-disc pl-5 space-y-1 text-[9.2pt] text-slate-800">
                {data.overviewSection.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <h3 className="text-[9.5pt] font-bold text-slate-900 mb-1">수업 운영 강조 사항</h3>
              <ul className="list-disc pl-5 space-y-0.5 text-[9pt] text-slate-700">
                {data.overviewSection.emphasisPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 3. 실무 상황 및 수행 과제 */}
      {data.scenarioSection.visible && (
        <section
          data-doc-section={data.scenarioSection.id}
          className={`mb-5 ${data.scenarioSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.scenarioSection.title}
          </h2>
          <div className="border border-slate-300 bg-slate-50/70 p-3 mb-3">
            <div className="font-bold text-[9.8pt] text-[#1E3A5F] mb-1">
              {data.scenarioSection.scenarioTitle}
            </div>
            <p className="text-[9.3pt] text-slate-800 leading-[1.65] mb-2">
              {data.scenarioSection.practicalContext}
            </p>
            <div className="text-[9pt] text-slate-800 pt-2 border-t border-slate-200">
              <p className="mb-1">
                <strong>학생 직무 역할:</strong> {data.scenarioSection.studentRole}
              </p>
              <div>
                <strong>수행 조건 및 실무 제약:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-700">
                  {data.scenarioSection.workingConditions.map((cond, i) => (
                    <li key={i}>{cond}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <table className="doc-table">
            <thead>
              <tr>
                <th className="w-[13%]">과제 구분</th>
                <th className="w-[24%]">수행 과제명</th>
                <th className="w-[41%]">구체적 수행 내용</th>
                <th className="w-[22%]">연계 산출물</th>
              </tr>
            </thead>
            <tbody>
              {data.scenarioSection.coreTasks.map((task) => (
                <tr key={task.id}>
                  <td className="font-semibold text-[#1E3A5F] tabular-nums">{task.taskCode}</td>
                  <td className="font-semibold text-slate-900">{task.taskName}</td>
                  <td className="text-slate-800">{task.description}</td>
                  <td className="text-slate-700">{task.deliverable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 4. 차시별 교수·학습 활동 */}
      {data.sessionsSection.visible && (
        <section
          data-doc-section={data.sessionsSection.id}
          className={`mb-5 ${data.sessionsSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <div className="doc-keep-with-next flex items-center justify-between gap-2 border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            <h2 className="text-[11.5pt] font-bold text-[#1E3A5F]">
              {data.sessionsSection.title}
            </h2>
            <div className="no-print flex items-center gap-1 text-[11px]">
              <span className="text-slate-500 mr-1">배치 형식:</span>
              <button
                type="button"
                onClick={() => setSessionViewOverride('table')}
                className={`px-2 py-0.5 rounded border cursor-pointer ${
                  sessionLayout === 'table'
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                표 형식
              </button>
              <button
                type="button"
                onClick={() => setSessionViewOverride('cards')}
                className={`px-2 py-0.5 rounded border cursor-pointer ${
                  sessionLayout === 'cards'
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                차시 구획형
              </button>
            </div>
          </div>

          {sessionLayout === 'table' ? (
            <table className="doc-table">
              <thead>
                <tr>
                  <th className="w-[10%] text-center">차시</th>
                  <th className="w-[22%]">학습 주제 및 내용</th>
                  <th className="w-[30%]">학생 활동</th>
                  <th className="w-[24%]">교사 지도·지원</th>
                  <th className="w-[14%]">차시 산출물</th>
                </tr>
              </thead>
              <tbody>
                {data.sessionsSection.sessions.map((ses) => (
                  <tr key={ses.id}>
                    <td className="text-center font-semibold text-[#1E3A5F] tabular-nums bg-slate-50">
                      <div>{ses.sessionLabel}</div>
                      <div className="text-[8pt] font-normal text-slate-500 mt-0.5">{ses.duration}</div>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-900 mb-1">{ses.title}</div>
                      <div className="text-[8.6pt] text-slate-600">{ses.learningContent}</div>
                    </td>
                    <td>
                      <ul className="list-disc pl-4 space-y-1 text-[8.8pt]">
                        {ses.studentActivities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="list-disc pl-4 space-y-1 text-[8.8pt] text-slate-700">
                        {ses.teacherSupport.map((sup, i) => (
                          <li key={i}>{sup}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-[8.8pt] font-medium text-slate-800">{ses.sessionOutput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="space-y-3">
              {data.sessionsSection.sessions.map((ses) => (
                <div key={ses.id} className="doc-section-block border border-slate-300">
                  <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300 flex items-center justify-between gap-2">
                    <span className="font-bold text-[#1E3A5F] text-[9.6pt] tabular-nums">
                      {ses.sessionLabel}. {ses.title}
                    </span>
                    <span className="text-[8.3pt] text-slate-600 tabular-nums shrink-0">
                      {ses.duration} · 산출물: {ses.sessionOutput}
                    </span>
                  </div>
                  <div className="p-3 space-y-2 text-[9pt]">
                    <div>
                      <strong className="text-slate-900">주요 학습 내용:</strong>{' '}
                      <span className="text-slate-700">{ses.learningContent}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-slate-200">
                      <div>
                        <div className="font-semibold text-[#1E3A5F] mb-1">학생 활동</div>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                          {ses.studentActivities.map((act, i) => (
                            <li key={i}>{act}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 mb-1">교사 지도·지원</div>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                          {ses.teacherSupport.map((sup, i) => (
                            <li key={i}>{sup}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. 최종 산출물 및 제출 기준 */}
      {data.deliverablesSection.visible && (
        <section
          data-doc-section={data.deliverablesSection.id}
          className={`doc-section-block mb-5 ${data.deliverablesSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.deliverablesSection.title}
          </h2>
          <table className="doc-table">
            <tbody>
              <tr>
                <th className="w-[22%] bg-slate-100 text-[#1E3A5F]">최종 산출물 명칭</th>
                <td className="font-semibold text-slate-900">{data.deliverablesSection.finalDeliverableName}</td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">필수 제출 구성</th>
                <td>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {data.deliverablesSection.requiredComponents.map((comp, i) => (
                      <li key={i}>{comp}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">규격 및 품질 기준</th>
                <td>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {data.deliverablesSection.submissionStandards.map((std, i) => (
                      <li key={i}>{std}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="bg-slate-100 text-[#1E3A5F]">제출 전 최종 확인</th>
                <td>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {data.deliverablesSection.verificationItems.map((ver, i) => (
                      <li key={i}>{ver}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* 6. 프로젝트 평가 계획 (4수준 루브릭) */}
      {data.evaluationSection.visible && (
        <section
          data-doc-section={data.evaluationSection.id}
          className={`mb-5 ${data.evaluationSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.evaluationSection.title}
          </h2>
          <div className="border border-slate-300 bg-slate-50 px-3 py-2 mb-2.5 text-[8.6pt] text-slate-700">
            <div className="mb-1">
              <strong>평가 방법:</strong> {data.evaluationSection.evaluationMethods.join(' · ')}
            </div>
            <div className="text-slate-600">{data.evaluationSection.schoolAlignmentNotice}</div>
          </div>

          <table className="doc-table">
            <thead>
              <tr>
                <th className="w-[16%]">평가 요소</th>
                <th className="w-[21%]">우수 (4)</th>
                <th className="w-[21%]">보통 이상 (3)</th>
                <th className="w-[21%]">기초 (2)</th>
                <th className="w-[21%]">미도달 (1)</th>
              </tr>
            </thead>
            <tbody>
              {data.evaluationSection.rubric.map((row) => (
                <tr key={row.id}>
                  <td className="bg-slate-50 font-semibold text-slate-900">
                    <div>{row.criterion}</div>
                    <div className="text-[8pt] font-normal text-[#1E3A5F] tabular-nums mt-0.5">
                      반영 비중 {row.weight}
                    </div>
                  </td>
                  <td className="text-[8.5pt]">{row.excellent}</td>
                  <td className="text-[8.5pt]">{row.good}</td>
                  <td className="text-[8.5pt]">{row.basic}</td>
                  <td className="text-[8.5pt]">{row.insufficient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 7. 실무 도구 활용 및 교사 지도 유의사항 */}
      {data.guidanceSection.visible && (
        <section
          data-doc-section={data.guidanceSection.id}
          className={`doc-section-block mb-4 ${data.guidanceSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[11.5pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.guidanceSection.title}
          </h2>

          <table className="doc-table mb-3">
            <thead>
              <tr>
                <th className="w-[16%]">도구 구분</th>
                <th className="w-[34%]">활용 도구 및 환경</th>
                <th className="w-[34%]">수업 내 활용 목적</th>
                <th className="w-[16%] text-center">학교 보유 확인</th>
              </tr>
            </thead>
            <tbody>
              {data.guidanceSection.tools.map((tool) => (
                <tr key={tool.id}>
                  <td className="font-semibold bg-slate-50">{tool.category}</td>
                  <td>{tool.toolName}</td>
                  <td>{tool.purpose}</td>
                  <td className="text-center text-[8.5pt]">
                    {tool.schoolCheckRequired ? '사전 확인 필요' : '일반 웹/교실 활용'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border border-slate-300 p-3 space-y-2 text-[9pt]">
            <div>
              <strong className="text-[#1E3A5F]">생성형 AI 활용 및 검증 지도:</strong>{' '}
              <span className="text-slate-800">{data.guidanceSection.aiUsagePolicy}</span>
            </div>
            <div>
              <strong className="text-slate-900">개인정보·저작권·안전 지도 유의사항:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-800">
                {data.guidanceSection.safetyAndEthicsPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-dashed border-slate-300 text-[8.5pt] text-slate-700">
              {data.guidanceSection.facilityCheckNotice}
            </div>
            {(input.teacherNotes.trim() || data.guidanceSection.teacherMemo) && (
              <div className="pt-1.5 text-[8.6pt] text-slate-700">
                <strong>[교사 메모 및 추가 요청 반영]</strong>{' '}
                {input.teacherNotes.trim() || data.guidanceSection.teacherMemo}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[8pt] text-slate-500">
        <span>{input.schoolName || '인천비즈니스고등학교'} · 직업계고 실무 프로젝트 수업 설계서</span>
        <span>{input.department} · {input.subject} · {input.sessions}</span>
      </footer>
    </div>
  );
};
