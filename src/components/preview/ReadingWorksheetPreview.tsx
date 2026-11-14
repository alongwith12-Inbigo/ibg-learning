import React from 'react';
import {
  AI_USAGE_LABELS,
  CommonLessonInput,
  LESSON_MODE_LABELS,
  ReadingWorksheetData,
  STUDENT_LEVEL_LABELS,
} from '../../types/document';

interface ReadingWorksheetPreviewProps {
  input: CommonLessonInput;
  data: ReadingWorksheetData;
}

export const ReadingWorksheetPreview: React.FC<ReadingWorksheetPreviewProps> = ({
  input,
  data,
}) => {
  const displayTitle = input.topic.trim() || data.documentTitle;
  const displaySubtitle =
    input.subtitleNote.trim() ||
    `읽걷쓰AI 수업활동지 · ${LESSON_MODE_LABELS[input.lessonMode]} (${STUDENT_LEVEL_LABELS[input.studentLevel]})`;

  return (
    <div className="text-[#111827] text-[10pt] leading-[1.62]">
      {/* Document Header */}
      <header className="border-t-[3px] border-[#1E3A5F] pt-3 pb-3 mb-4 border-b border-slate-300">
        <div className="flex items-baseline justify-between gap-4 mb-1.5">
          <span className="text-[9pt] font-semibold text-[#1E3A5F]">
            {input.schoolName || '인천비즈니스고등학교'} · {displaySubtitle}
          </span>
          <span className="text-[8.5pt] text-slate-600 tabular-nums shrink-0">
            {input.department} · {input.grade} · {input.subject} · {input.sessions}
          </span>
        </div>
        <h1 className="text-[16pt] font-bold text-slate-900 leading-[1.35] tracking-tight">
          {displayTitle}
        </h1>
      </header>

      {/* Student Identification Table */}
      <table className="doc-table mb-4">
        <tbody>
          <tr>
            {data.studentInfoFields.map((field) => (
              <React.Fragment key={field}>
                <th className="bg-slate-100 text-[#1E3A5F] font-semibold w-[11%] text-center">
                  {field}
                </th>
                <td className="w-[14%] h-7">&nbsp;</td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Lesson Objective & Meta Strip */}
      <div className="border border-slate-300 bg-slate-50/70 px-3.5 py-2.5 mb-5 text-[9.2pt]">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-200 text-[8.5pt] text-slate-600">
          <span>
            <strong className="text-[#1E3A5F]">수업 설계 조건:</strong>{' '}
            {LESSON_MODE_LABELS[input.lessonMode]} · {STUDENT_LEVEL_LABELS[input.studentLevel]} · AI {AI_USAGE_LABELS[input.aiUsageLevel]}
          </span>
          {input.teacherName && (
            <span>지도교사: {input.teacherName}</span>
          )}
        </div>
        <p className="text-slate-800">
          <strong className="text-[#1E3A5F] mr-1.5">[오늘의 배움 목표]</strong>
          {input.objectives}
        </p>
        {input.teacherNotes.trim() && (
          <p className="text-slate-600 text-[8.7pt] mt-1">
            <strong className="text-slate-700 mr-1">[교사 안내]</strong>
            {input.teacherNotes}
          </p>
        )}
      </div>

      {/* Section 1: 읽고·탐색하기 */}
      {data.readingSection.visible && (
        <section
          data-doc-section={data.readingSection.id}
          className={`mb-6 ${data.readingSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[12pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.readingSection.title}
          </h2>
          <p className="text-[9.3pt] text-slate-700 mb-3">{data.readingSection.guideText}</p>

          {/* Reading Materials */}
          <div className="space-y-4 mb-4">
            {data.readingSection.materials.map((mat) => (
              <div
                key={mat.id}
                className="border border-slate-300 rounded-sm p-3.5 bg-white"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2.5">
                  <h3 className="text-[10.5pt] font-bold text-slate-900">{mat.title}</h3>
                  <span className="text-[8pt] text-slate-500">
                    {mat.materialType} · {mat.sourceNote}
                  </span>
                </div>

                <div className="space-y-2 text-[9.6pt] text-slate-800 leading-[1.7] text-justify">
                  {mat.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Key Terms */}
                {mat.keyTerms && mat.keyTerms.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200">
                    <div className="text-[8.5pt] font-semibold text-[#1E3A5F] mb-1.5">
                      핵심 용어 길라잡이
                    </div>
                    <table className="doc-table">
                      <tbody>
                        {mat.keyTerms.map((kt) => (
                          <tr key={kt.term}>
                            <th className="w-[24%] bg-slate-50 text-[#1E3A5F] font-semibold text-[8.8pt]">
                              {kt.term}
                            </th>
                            <td className="text-[8.8pt] text-slate-700">{kt.explanation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Comparison Box */}
                {mat.comparisonBox && (
                  <div className="mt-3">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th className="w-1/2 text-center">{mat.comparisonBox.leftTitle}</th>
                          <th className="w-1/2 text-center">{mat.comparisonBox.rightTitle}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <ul className="list-disc pl-4 space-y-1 text-[8.8pt]">
                              {mat.comparisonBox.leftItems.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <ul className="list-disc pl-4 space-y-1 text-[8.8pt]">
                              {mat.comparisonBox.rightItems.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Fact Check Notice */}
                {(mat.isVirtualCase || mat.factCheckRequired) && (
                  <div className="mt-2.5 pt-2 border-t border-dashed border-slate-300 text-[8pt] text-slate-600">
                    {mat.isVirtualCase && <span className="font-semibold">[가상 사례 안내] </span>}
                    {mat.factCheckNote || '수업 활용 시 최신 기준 및 사실 확인이 필요한 부분은 교사가 검토해 안내하세요.'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Exploration Questions */}
          <div className="space-y-3.5">
            {data.readingSection.questions.map((q) => (
              <div key={q.id} className="doc-section-block border border-slate-300 p-3">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-bold text-[#1E3A5F] tabular-nums">질문 {q.number}.</span>
                  <span className="font-semibold text-slate-900">{q.promptQuestion}</span>
                </div>
                <p className="text-[8.5pt] text-slate-600 mb-2">
                  활동 안내: {q.instruction}
                  {q.scaffoldHint ? ` (${q.scaffoldHint})` : ''}
                </p>

                {q.spaceType === 'table' && q.tableColumns && (
                  <table className="doc-table">
                    <thead>
                      <tr>
                        {q.tableColumns.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {q.tableRowLabels
                        ? q.tableRowLabels.map((rowLabel) => (
                            <tr key={rowLabel}>
                              <th className="bg-slate-50 text-slate-800 font-semibold w-[18%]">
                                {rowLabel}
                              </th>
                              {q.tableColumns!.slice(1).map((c) => (
                                <td key={c} className="h-12">&nbsp;</td>
                              ))}
                            </tr>
                          ))
                        : Array.from({ length: q.emptyRowCount ?? 2 }).map((_, rIdx) => (
                            <tr key={rIdx}>
                              {q.tableColumns!.map((c) => (
                                <td key={c} className="h-12">&nbsp;</td>
                              ))}
                            </tr>
                          ))}
                    </tbody>
                  </table>
                )}

                {q.spaceType === 'lines' && (
                  <div
                    className="writing-lines border border-slate-200 px-2"
                    style={{ height: `${(q.linesCount ?? 3) * 28}px` }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: AI와 함께 탐구하고·검증하기 */}
      {data.aiInquirySection.visible && (
        <section
          data-doc-section={data.aiInquirySection.id}
          className={`mb-6 ${data.aiInquirySection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[12pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            {data.aiInquirySection.title}
          </h2>
          <p className="text-[9.3pt] text-slate-700 mb-3">{data.aiInquirySection.guideSummary}</p>

          <div className="space-y-3.5 mb-3.5">
            {data.aiInquirySection.steps.map((step) => (
              <div key={step.id} className="doc-section-block border border-slate-300 p-3">
                <div className="font-bold text-[9.8pt] text-[#1E3A5F] mb-1 tabular-nums">
                  단계 {step.stepNumber}. {step.stepTitle}
                </div>
                <p className="text-[9.2pt] text-slate-800 mb-2">{step.instruction}</p>

                {step.promptExample && (
                  <div className="bg-slate-50 border border-slate-200 px-3 py-2 text-[8.6pt] text-slate-700 mb-2.5">
                    {step.promptExample}
                  </div>
                )}

                {step.spaceType === 'lines' && (
                  <div
                    className="writing-lines border border-slate-200 px-2"
                    style={{ height: `${(step.linesCount ?? 3) * 28}px` }}
                  />
                )}

                {step.spaceType === 'comparison_table' && step.tableColumns && (
                  <table className="doc-table">
                    <thead>
                      <tr>
                        {step.tableRowLabels && <th className="w-[18%]">구분</th>}
                        {step.tableColumns.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(step.tableRowLabels ?? ['내용 1', '내용 2']).map((label) => (
                        <tr key={label}>
                          {step.tableRowLabels && (
                            <th className="bg-slate-50 text-slate-800 font-semibold">{label}</th>
                          )}
                          {step.tableColumns!.map((col) => (
                            <td key={col} className="h-14">&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>

          {/* Fact-Checking Criteria Box */}
          <div className="doc-section-block">
            <div className="text-[9.2pt] font-bold text-slate-800 mb-1.5">
              AI 답변 신뢰성 검증 기준표
            </div>
            <table className="doc-table">
              <thead>
                <tr>
                  <th className="w-[34%]">검증 점검 항목</th>
                  <th className="w-[54%]">사실 확인 방법</th>
                  <th className="w-[12%] text-center">확인(✓)</th>
                </tr>
              </thead>
              <tbody>
                {data.aiInquirySection.verificationCriteria.map((vc) => (
                  <tr key={vc.id}>
                    <td className="font-medium text-slate-900">{vc.checkPoint}</td>
                    <td className="text-slate-700">{vc.howToVerify}</td>
                    <td className="text-center text-slate-400">□</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Section 3: 나의 생각으로 쓰고 성찰하기 */}
      {data.writingReflectionSection.visible && (
        <section
          data-doc-section={data.writingReflectionSection.id}
          className={`mb-6 ${
            data.writingReflectionSection.pageBreakBefore ? 'print-page-break' : ''
          }`}
        >
          <div className="doc-keep-with-next flex items-baseline justify-between gap-2 border-b-2 border-[#1E3A5F] pb-1 mb-2.5">
            <h2 className="text-[12pt] font-bold text-[#1E3A5F]">
              {data.writingReflectionSection.title}
            </h2>
            <span className="text-[8.5pt] text-slate-600 font-medium">
              {data.writingReflectionSection.activityStructureLabel}
            </span>
          </div>

          <p className="text-[9.4pt] text-slate-800 mb-3">
            {data.writingReflectionSection.writingPrompt}
          </p>

          {/* Optional Sentence Starters (Basic Level Scaffolding) */}
          {data.writingReflectionSection.sentenceStarters &&
            data.writingReflectionSection.sentenceStarters.length > 0 && (
              <div className="doc-section-block border border-slate-300 bg-slate-50/60 p-3 mb-3.5 space-y-2.5">
                <div className="text-[8.8pt] font-semibold text-[#1E3A5F]">
                  문장 완성 틀 (아래 빈칸을 채우며 생각을 정리해 보세요)
                </div>
                {data.writingReflectionSection.sentenceStarters.map((line, i) => (
                  <div key={i} className="text-[9.3pt] text-slate-800 leading-[1.9]">
                    {line}
                  </div>
                ))}
              </div>
            )}

          {/* Mode-Specific Structured Tables (Role / Decision / Debate / Plan) */}
          {data.writingReflectionSection.structuredTables &&
            data.writingReflectionSection.structuredTables.map((st) => (
              <div key={st.id} className="doc-section-block mb-3.5">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-[9.3pt] font-bold text-slate-900">{st.title}</span>
                  <span className="text-[8.2pt] text-slate-500">{st.description}</span>
                </div>
                <table className="doc-table">
                  <thead>
                    <tr>
                      {st.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: st.rowCount }).map((_, rIdx) => {
                      const presetLabel = st.presetRowLabels?.[rIdx];
                      return (
                        <tr key={rIdx}>
                          {st.headers.map((h, cIdx) =>
                            cIdx === 0 && presetLabel ? (
                              <th key={h} className="bg-slate-50 text-slate-800 font-semibold w-[22%]">
                                {presetLabel}
                              </th>
                            ) : (
                              <td key={h} className="h-11">&nbsp;</td>
                            )
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}

          {/* Personal Reflection Writing Box */}
          <div className="doc-section-block border border-slate-300 p-3">
            <p className="text-[9.3pt] font-semibold text-slate-900 mb-2">
              {data.writingReflectionSection.reflectionPrompt}
            </p>
            <div
              className="writing-lines border border-slate-200 px-2"
              style={{ height: `${data.writingReflectionSection.writingLinesCount * 28}px` }}
            />
          </div>
        </section>
      )}

      {/* Section 4: 오늘의 자기 점검 */}
      {data.selfCheckSection.visible && (
        <section
          data-doc-section={data.selfCheckSection.id}
          className={`mb-5 ${data.selfCheckSection.pageBreakBefore ? 'print-page-break' : ''}`}
        >
          <h2 className="doc-keep-with-next text-[12pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2">
            {data.selfCheckSection.title}
          </h2>
          <p className="text-[8.8pt] text-slate-600 mb-2">{data.selfCheckSection.guideText}</p>
          <table className="doc-table">
            <thead>
              <tr>
                <th className="w-[15%]">영역</th>
                <th className="w-[57%]">점검 항목</th>
                <th className="w-[9%] text-center">매우 그렇다</th>
                <th className="w-[9%] text-center">그렇다</th>
                <th className="w-[10%] text-center">보완 필요</th>
              </tr>
            </thead>
            <tbody>
              {data.selfCheckSection.items.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-slate-800 bg-slate-50">{item.category}</td>
                  <td className="text-slate-800">{item.criterion}</td>
                  <td className="text-center text-slate-400">□</td>
                  <td className="text-center text-slate-400">□</td>
                  <td className="text-center text-slate-400">□</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Section 5: 교사 피드백 */}
      {data.teacherFeedbackSection.visible && (
        <section
          data-doc-section={data.teacherFeedbackSection.id}
          className={`doc-section-block mb-4 ${
            data.teacherFeedbackSection.pageBreakBefore ? 'print-page-break' : ''
          }`}
        >
          <h2 className="doc-keep-with-next text-[12pt] font-bold text-[#1E3A5F] border-b-2 border-[#1E3A5F] pb-1 mb-2">
            {data.teacherFeedbackSection.title}
          </h2>
          <div className="border border-slate-300 p-3">
            <div className="text-[8.4pt] text-slate-600 mb-2">
              중점 지도 사항: {data.teacherFeedbackSection.guidanceFocus.join(' · ')}
            </div>
            <div
              className="writing-lines border border-slate-200"
              style={{ height: `${data.teacherFeedbackSection.feedbackLinesCount * 28}px` }}
            />
            <div className="flex justify-end items-center gap-6 mt-2.5 text-[8.5pt] text-slate-600">
              <span>확인 일자: 202&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.</span>
              <span>지도교사 확인: _______________ (서명)</span>
            </div>
          </div>
        </section>
      )}

      {/* Document Footer */}
      <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[8pt] text-slate-500">
        <span>{input.schoolName || '인천비즈니스고등학교'} · 읽걷쓰AI 수업활동지</span>
        <span>{input.department} · {input.subject}</span>
      </footer>
    </div>
  );
};
