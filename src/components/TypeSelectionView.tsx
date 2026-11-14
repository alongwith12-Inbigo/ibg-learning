import React from 'react';
import { BookOpen, Briefcase, ArrowRight, Check } from 'lucide-react';
import { DocumentType } from '../types/document';

interface TypeSelectionViewProps {
  selectedType: DocumentType;
  onSelectType: (type: DocumentType) => void;
}

export const TypeSelectionView: React.FC<TypeSelectionViewProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Editorial Hero Header */}
      <section className="max-w-3xl mb-10">
        <p className="text-xs font-medium text-slate-500 mb-3">
          인천비즈니스고등학교 교사용 수업 설계 도구 · 1단계 기본 화면 및 문서 양식
        </p>
        <h1 className="text-3xl md:text-[34px] font-bold tracking-tight text-slate-900 leading-[1.28] text-balance mb-4">
          수업 목적에 맞는 자료 유형을 선택하세요
        </h1>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          학생이 직접 읽고 탐구하며 기록하는 활동지부터, 직무 시나리오와 4수준 평가 루브릭을 갖춘 교사용 실무 프로젝트 설계서까지 별도의 한글 편집기 없이 A4 규격으로 설계하고 인쇄할 수 있습니다.
        </p>
      </section>

      {/* Two-Column Document Type Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-10">
        {/* Card 1: 읽걷쓰AI 수업활동지 */}
        <article
          className={`bg-white rounded-xl border transition-colors flex flex-col justify-between p-8 ${
            selectedType === 'reading_worksheet'
              ? 'border-[#1E3A5F] ring-1 ring-[#1E3A5F]/15'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[#F1F5F9] text-[#1E3A5F] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium text-slate-500">
                학생 배부용 · 읽기 · AI 검증 · 쓰기 · 성찰
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2.5">
              읽걷쓰AI 수업활동지
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              학생들이 충분한 분량의 읽기 자료를 분석하고, AI와 함께 탐구한 뒤 사실을 교차 검증하여 자신의 생각으로 정리·성찰하도록 설계하는 학생용 워크시트입니다.
            </p>

            <div className="border-t border-slate-100 pt-5 mb-8">
              <h3 className="text-xs font-semibold text-slate-700 mb-3">
                포함되는 핵심 교육 구성 요소
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>1. 읽고·탐색하기</strong> — 심층 읽기 자료, 비교 자료 및 탐색 질문</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>2. AI와 함께 탐구·검증</strong> — 질문 설계 및 사실 확인 체크리스트</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>3. 나의 생각 쓰기·성찰</strong> — 수업 유형(개별/모둠/토론) 맞춤 기록표</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>4. 자기 점검 및 5. 교사 피드백</strong> — 자기 평가표와 지도 의견란</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectType('reading_worksheet')}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors cursor-pointer"
          >
            <span>읽걷쓰AI 수업활동지 선택하기</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </article>

        {/* Card 2: 직업계고 실무 프로젝트 설계서 */}
        <article
          className={`bg-white rounded-xl border transition-colors flex flex-col justify-between p-8 ${
            selectedType === 'vocational_project'
              ? 'border-[#1E3A5F] ring-1 ring-[#1E3A5F]/15'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[#F1F5F9] text-[#1E3A5F] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-medium text-slate-500">
                교사용 설계서 · 직무 시나리오 · 차시 계획 · 4수준 루브릭
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2.5">
              직업계고 실무 프로젝트 설계서
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              학과와 교과 특성을 반영한 실제 직무 시나리오, 차시별 교수·학습 활동, 최종 산출물 기준 및 4수준 평가 루브릭을 체계적으로 정리하는 교사용 수업 설계서입니다.
            </p>

            <div className="border-t border-slate-100 pt-5 mb-8">
              <h3 className="text-xs font-semibold text-slate-700 mb-3">
                포함되는 7대 필수 설계 영역
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>1~2. 기본 정보·개요</strong> — 학과 직무 역량, 프로젝트 배경 및 학습 목표</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>3. 실무 상황 및 수행 과제</strong> — 현장 시나리오, 학생 역할 및 제약 조건</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>4~5. 차시별 활동·최종 산출물</strong> — 차시별 학생·교사 활동 및 제출 규격</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#1E3A5F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span><strong>6~7. 평가 계획·지도 유의사항</strong> — 4수준 루브릭(4~1) 및 안전·저작권 안내</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectType('vocational_project')}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1E3A5F] rounded-lg hover:bg-[#162C49] transition-colors cursor-pointer"
          >
            <span>실무 프로젝트 설계서 선택하기</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </article>
      </section>

      {/* Quiet Operational & Privacy Guidance */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1.5">브라우저 단독 실행</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              별도 회원가입, 로그인, API 키 입력이나 서버 저장 없이 선생님의 브라우저 안에서만 안전하게 동작합니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1.5">개인정보 보호 원칙</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              입력 항목에는 학생 실명, 학번, 연락처 등 개인 식별정보를 입력하지 않도록 유의해 주세요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1.5">현재 단계 안내 (1단계)</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              유형 선택, 수업 정보 입력, 실제 분량의 테스트 데이터 기반 A4 문서 미리보기 및 인쇄 양식을 점검할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
