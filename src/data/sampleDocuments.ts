import { LessonDocumentPayload } from '../types/document';

export interface SamplePreset {
  id: string;
  label: string;
  description: string;
  payload: LessonDocumentPayload;
}

export const READING_WORKSHEET_PRESETS: SamplePreset[] = [
  {
    id: 'rw-standard-group',
    label: '보통 · 모둠협력형 (마케팅과)',
    description: 'SNS 바이럴 마케팅과 그린워싱 판별 (2차시)',
    payload: {
      schemaVersion: '1.0',
      id: 'sample-rw-standard-group',
      documentType: 'reading_worksheet',
      updatedAt: '2026-11-13',
      input: {
        schoolName: '인천비즈니스고등학교',
        department: '마케팅과',
        subject: '상업경제',
        grade: '1학년',
        topic: 'SNS 바이럴 마케팅과 그린워싱(친환경 위장술) 판별하기',
        studentLevel: 'standard',
        lessonMode: 'group',
        sessions: '2차시 (100분)',
        objectives:
          '기업의 친환경 마케팅 사례에서 사실과 과장 홍보를 구분하고, 생성형 AI가 제시한 근거의 진위 여부를 교차 검증하여 모둠별 소비자 보호 기준을 수립한다.',
        aiUsageLevel: 'active',
        teacherNotes:
          '모둠 내에서 역할(자료 분석, AI 질의, 팩트체크, 발표 정리)을 나누어 협력적으로 탐구하고, 확인되지 않은 기업명 대신 가상 사례와 실제 공개 기준을 명확히 구분할 것.',
        teacherName: '김미영',
        sessionMinutes: '50분 × 2차시',
        subtitleNote: '읽걷쓰AI 모둠협력 탐구 활동지',
      },
      readingWorksheet: {
        documentTitle: 'SNS 바이럴 마케팅과 그린워싱(친환경 위장술) 판별하기',
        documentSubtitle: '읽걷쓰AI 수업활동지 · 모둠협력형 (보통 수준)',
        studentInfoFields: ['학년 / 반', '모둠명', '학번', '성명'],
        readingSection: {
          id: 'reading',
          title: '1. 읽고·탐색하기',
          visible: true,
          pageBreakBefore: false,
          guideText:
            '아래 [자료 1]과 [자료 2]를 모둠원과 함께 읽고, 핵심 개념과 의심 요소를 표시한 뒤 탐색 질문에 답해 보세요.',
          materials: [
            {
              id: 'mat-1',
              title: '[자료 1] "자연에서 온 100% 생분해 텀블러" 광고, 무엇이 문제일까?',
              materialType: '사례 자료',
              sourceNote: '수업용 가상 사례 (소비자 표시·광고 지침 기준 재구성)',
              isVirtualCase: true,
              factCheckRequired: true,
              factCheckNote:
                '실제 법령 적용 사례 및 최신 환경부 친환경 표시·광고 가이드라인 세부 조항은 교사 및 공식 누리집 확인 필요',
              paragraphs: [
                '최근 숏폼 영상과 SNS 공동구매 채널에서 친환경 문구를 내세운 생활용품 홍보가 빠르게 늘고 있다. 그중 가상 브랜드 A사는 "석유계 플라스틱을 전혀 쓰지 않은 100% 자연 유래 생분해 텀블러"라는 문구와 함께 숲속 배경 영상을 앞세워 단기간에 높은 판매량을 기록했다. 인플루언서 후기 영상에는 "일반 쓰레기로 버려도 몇 달 안에 흙으로 돌아간다"는 설명이 포함되었다.',
                '그러나 한 소비자 모임이 제품 상세 페이지 하단의 작은 주석을 확인한 결과, 실제 몸체 소재는 바이오매스 플라스틱(PLA)과 일반 합성수지(PP)가 혼합된 복합 재질이었으며, 뚜껑과 실리콘 패킹은 분해되지 않는 일반 소재였다. 게다가 PLA 소재조차 가정의 일반 토양이나 매립지 환경에서는 쉽게 분해되지 않고, 온도 58도 이상의 전문 산업 퇴비화 시설에서만 일정 기간 내에 분해되는 특성을 가지고 있었다.',
                '이처럼 기업이 실제로는 환경 개선 효과가 미미하거나 일부 속성에만 친환경 요소를 적용하고도, 마치 제품 전체가 환경에 무해한 것처럼 소비자를 오인하게 만드는 홍보 방식을 그린워싱(Greenwashing, 위장 환경주의)이라고 부른다. 공정거래위원회와 환경부는 구체적 근거 없이 "친환경", "무독성", "100% 분해"와 같은 포괄적 표현을 사용하는 행위를 부당한 표시·광고로 규제하고 있다.',
              ],
              keyTerms: [
                {
                  term: '그린워싱(Greenwashing)',
                  explanation:
                    '실제 환경 보호 기여도보다 과장되거나 왜곡된 친환경 이미지를 내세워 소비자를 현혹하는 마케팅 행위',
                },
                {
                  term: '포괄적 환경 주장',
                  explanation:
                    '전 과정 평가나 시험 성적서 등 객관적 근거 없이 "친환경", "에코", "무공해" 등 막연한 용어만 사용하는 표현',
                },
              ],
            },
            {
              id: 'mat-2',
              title: '[자료 2] 신뢰할 수 있는 친환경 광고 vs 그린워싱 의심 광고 비교',
              materialType: '비교 자료',
              sourceNote: '환경성 표시·광고 판단 기준 요약',
              isVirtualCase: false,
              factCheckRequired: false,
              paragraphs: [
                '마케팅 현장에서 합법적이고 윤리적인 친환경 홍보를 기획하려면, 주장하려는 환경적 속성이 제품의 어느 단계(원료·제조·사용·폐기)에 해당하는지 구체적으로 밝혀야 한다. 아래 비교표를 참고하여 두 광고 방식의 차이를 분석해 보자.',
              ],
              comparisonBox: {
                leftTitle: '그린워싱 의심 표현',
                leftItems: [
                  '근거 수치 없이 "지구에 무해한 에코 제품"이라고만 표기',
                  '포장재 일부만 재생지인데 제품 전체가 재활용품인 것처럼 연출',
                  '폐기 조건(특수 시설 필요)을 누락한 채 "100% 생분해" 강조',
                ],
                rightTitle: '책임 있는 정보 제공 표현',
                rightItems: [
                  '"본체 중 재생 페트(r-PET) 45% 사용(한국환경산업기술원 인증)" 명시',
                  '"종이 포장재 분리배출 가능, 펌프 스프링은 일반쓰레기" 구체 안내',
                  '공인 시험기관의 인증 번호와 시험 조건, 유효 기간을 함께 기재',
                ],
              },
            },
          ],
          questions: [
            {
              id: 'q-1',
              number: 1,
              instruction: '모둠원과 자료를 나누어 읽은 뒤 핵심 문제를 정리하세요.',
              promptQuestion:
                '[자료 1]의 A사 광고에서 소비자가 오해하기 쉬운 표현을 2가지 이상 찾고, 실제 사실과 다른 이유를 정리해 봅시다.',
              spaceType: 'table',
              tableColumns: ['광고 속 표현 또는 연출', '실제 제품·환경 조건과의 차이', '소비자에게 미치는 영향'],
              emptyRowCount: 2,
            },
            {
              id: 'q-2',
              number: 2,
              instruction: '자료 비교를 바탕으로 모둠 토의 질문을 만들어 보세요.',
              promptQuestion:
                '우리 모둠이 실제 SNS나 쇼핑몰에서 본 홍보 문구 중 "그린워싱인지 확인해 보고 싶은 사례"는 무엇인가요? 탐구하고 싶은 질문을 1가지 작성해 봅시다.',
              spaceType: 'lines',
              linesCount: 3,
            },
          ],
        },
        aiInquirySection: {
          id: 'ai-inquiry',
          title: '2. AI와 함께 탐구하고·검증하기',
          visible: true,
          pageBreakBefore: false,
          guideSummary:
            '모둠 내 AI 질의 담당자와 팩트체크 담당자를 정해 아래 순서대로 AI에게 질문하고, 답변이 실제 기준과 맞는지 검증합니다.',
          steps: [
            {
              id: 'ai-step-1',
              stepNumber: 1,
              stepTitle: '모둠 공동 프롬프트 설계 및 질의',
              instruction:
                'A사 사례 또는 우리 모둠이 찾은 광고 문구의 문제점을 AI에게 물어보고, 기업이 소비자에게 신뢰를 주려면 광고 문구를 어떻게 고쳐야 할지 제안받아 봅시다.',
              promptExample:
                '예시 질문: "합성수지와 PLA가 혼합된 텀블러를 100% 자연 생분해 제품으로 광고할 때 소비자가 오인할 수 있는 지점과, 환경성 표시·광고 기준에 맞는 수정 문구 예시 2가지를 알려줘."',
              spaceType: 'lines',
              linesCount: 3,
            },
            {
              id: 'ai-step-2',
              stepNumber: 2,
              stepTitle: 'AI 응답 요약 및 모둠별 교차 검증',
              instruction:
                'AI가 제시한 수정 문구나 법적 기준 설명 중 사실 확인이 필요한 부분을 공공기관 자료(환경부, 공정거래위원회, 한국소비자원)와 비교해 기록하세요.',
              spaceType: 'comparison_table',
              tableColumns: ['AI가 제시한 주요 내용', '모둠의 교차 검증 결과 (일치 / 보완 필요)', '확인한 출처 또는 근거'],
              tableRowLabels: ['사실·기준 설명', '수정 광고 문구 제안'],
            },
          ],
          verificationCriteria: [
            {
              id: 'ver-1',
              checkPoint: '법령·제도 명칭 및 조항의 실재 여부',
              howToVerify: '국가법령정보센터 또는 공정거래위원회·환경부 공식 보도자료에서 정확한 명칭 확인',
            },
            {
              id: 'ver-2',
              checkPoint: 'AI가 임의로 만든 수치나 인증 마크 포함 여부',
              howToVerify: '존재하지 않는 인증 기관명이나 근거 없는 퍼센트(%) 수치가 없는지 점검',
            },
            {
              id: 'ver-3',
              checkPoint: '실무 마케팅 현실 적용 가능성',
              howToVerify: '수정된 문구가 지나치게 어렵지 않으면서도 소비자에게 핵심 조건을 정확히 전달하는지 검토',
            },
          ],
        },
        writingReflectionSection: {
          id: 'writing-reflection',
          title: '3. 나의 생각으로 쓰고 성찰하기',
          visible: true,
          pageBreakBefore: false,
          activityStructureLabel: '모둠협력형 산출물 · 역할 분담 및 공동 결론 작성',
          writingPrompt:
            '모둠 협의를 통해 "우리 학교 학생 또는 지역 소상공인이 지켜야 할 친환경·윤리적 홍보 3대 원칙"을 정리하고, AI 검증 과정을 통해 새롭게 알게 된 점을 바탕으로 개인 의견을 서술하세요.',
          structuredTables: [
            {
              id: 'group-role-table',
              title: '모둠 역할 분담 및 협력 기록표',
              description: '모둠원 각자가 맡은 역할과 오늘 활동에서 기여한 내용을 기록합니다.',
              headers: ['역할 구분', '담당 학생', '핵심 수행 내용', '동료 확인'],
              rowCount: 4,
              presetRowLabels: ['자료 탐색·요약', 'AI 프롬프트 질의', '사실 검증(팩트체크)', '공동 결론 정리·발표'],
            },
            {
              id: 'group-decision-table',
              title: '모둠 공동 의사결정표: 윤리적 마케팅 개선안',
              description: '모둠원 간의 다양한 의견을 비교한 뒤 최종 합의한 개선안을 정리합니다.',
              headers: ['개선 대상', '모둠 내 초기 의견', '최종 합의 기준 및 수정 문구'],
              rowCount: 2,
              presetRowLabels: ['과장·포괄적 표현', '폐기·인증 정보 누락'],
            },
          ],
          reflectionPrompt:
            '[개인 성찰] 내가 앞으로 소비자로서 또는 미래의 마케팅 실무자로서 SNS 광고를 볼 때 가장 먼저 확인해야 할 기준은 무엇이며, 오늘 모둠 활동에서 AI의 도움을 받은 부분과 한계는 무엇이었나요?',
          writingLinesCount: 5,
        },
        selfCheckSection: {
          id: 'self-check',
          title: '4. 오늘의 자기 점검',
          visible: true,
          pageBreakBefore: false,
          guideText: '오늘 수업에서 자신의 참여 태도와 학습 성취를 돌아보고 해당하는 칸에 표시(✓)하세요.',
          items: [
            { id: 'sc-1', category: '읽기·탐색', criterion: '제시된 자료에서 그린워싱의 개념과 과장 광고의 문제점을 구체적으로 찾아냈다.' },
            { id: 'sc-2', category: '모둠 협력', criterion: '모둠에서 맡은 역할을 책임감 있게 수행하고 친구의 의견을 경청했다.' },
            { id: 'sc-3', category: 'AI 검증', criterion: 'AI 답변을 그대로 믿지 않고 공공 기준이나 출처를 통해 사실 여부를 검증했다.' },
            { id: 'sc-4', category: '쓰기·성찰', criterion: '근거를 바탕으로 소비자 및 예비 마케터로서의 책임 있는 생각을 서술했다.' },
          ],
        },
        teacherFeedbackSection: {
          id: 'teacher-feedback',
          title: '5. 교사 피드백 및 지도 확인',
          visible: true,
          pageBreakBefore: false,
          guidanceFocus: [
            '모둠별 역할 분담의 균형과 공동 결론 도출 과정 확인',
            '가상 사례와 실제 환경부·공정위 고시 기준 구분 지도',
          ],
          feedbackLinesCount: 3,
        },
      },
    },
  },
  {
    id: 'rw-basic-individual',
    label: '기초 · 개별탐구형 (회계금융과)',
    description: '체크카드와 신용카드의 올바른 활용법 (1차시)',
    payload: {
      schemaVersion: '1.0',
      id: 'sample-rw-basic-individual',
      documentType: 'reading_worksheet',
      updatedAt: '2026-11-13',
      input: {
        schoolName: '인천비즈니스고등학교',
        department: '회계금융과',
        subject: '금융일반',
        grade: '1학년',
        topic: '사회초년생을 위한 현명한 체크카드와 신용카드 활용법',
        studentLevel: 'basic',
        lessonMode: 'individual',
        sessions: '1차시 (50분)',
        objectives:
          '체크카드와 신용카드의 결제 원리 차이를 이해하고, 자신의 용돈·아르바이트 수입 규모에 맞는 안전한 소비 습관을 세운다.',
        aiUsageLevel: 'basic',
        teacherNotes:
          '금융 용어를 쉬운 생활 예시로 풀어 설명하고, 기초 수준 학생이 문장 완성 틀을 활용해 부담 없이 서술할 수 있도록 단계별로 안내한다.',
        teacherName: '박준호',
        sessionMinutes: '50분',
        subtitleNote: '읽걷쓰AI 기초 개별탐구 활동지',
      },
      readingWorksheet: {
        documentTitle: '사회초년생을 위한 현명한 체크카드와 신용카드 활용법',
        documentSubtitle: '읽걷쓰AI 수업활동지 · 개별탐구형 (기초 수준)',
        studentInfoFields: ['학년 / 반', '번호', '성명'],
        readingSection: {
          id: 'reading',
          title: '1. 읽고·탐색하기',
          visible: true,
          pageBreakBefore: false,
          guideText:
            '글을 천천히 읽으면서 중요한 단어에 밑줄을 긋고, 단계별 질문에 차근차근 답해 보세요.',
          materials: [
            {
              id: 'mat-basic-1',
              title: '[읽기 자료] 아르바이트 첫 월급을 받은 민수의 카드 선택 고민',
              materialType: '상황 제시문',
              sourceNote: '수업용 가상 사례 (금융감독원 금융교육 표준안 참고 재구성)',
              isVirtualCase: true,
              factCheckRequired: true,
              factCheckNote: '신용카드 발급 연령 기준 및 연체 이자율 세부 수치는 최신 금융기관 약관 확인 필요',
              paragraphs: [
                '특성화고 3학년 현장실습을 앞둔 민수는 주말 아르바이트로 매달 50만 원의 수입이 생겼다. 편의점이나 카페에서 현금을 들고 다니는 것이 불편해 카드를 만들기로 했는데, 은행 창구에서 체크카드와 신용카드의 차이를 설명 듣고 고민에 빠졌다.',
                '체크카드는 내 은행 계좌에 들어 있는 돈만큼만 바로 빠져나가는 카드다. 통장에 10만 원이 있으면 10만 원까지만 쓸 수 있기 때문에 내가 가진 돈보다 많이 쓸 위험이 적다. 반면 신용카드는 지금 통장에 돈이 없어도 카드사가 먼저 가게에 돈을 내주고, 한 달 뒤에 내가 카드사에 돈을 갚는 방식이다. 당장 돈이 없어도 물건을 살 수 있어 편리하지만, 다음 달 결제일에 통장 잔액이 부족하면 연체가 발생해 높은 이자를 내야 하고 신용점수가 떨어질 수 있다.',
                '특히 신용카드의 "할부"나 "리볼빙(일부결제금액이월약정)" 기능은 당장 내는 돈이 적어 보여 쉽게 쓰기 쉽지만, 다음 달로 넘어간 금액에는 이자가 붙는다. 사회초년생 시기에는 먼저 체크카드로 자신의 한 달 지출 규모를 파악하는 습관을 들이는 것이 안전하다.',
              ],
              keyTerms: [
                { term: '체크카드', explanation: '결제 즉시 내 예금 계좌에서 돈이 출금되는 카드 (통장 잔액 한도 내 사용)' },
                { term: '신용카드', explanation: '카드사가 먼저 대금을 내주고, 약속한 날짜에 내가 갚는 후불 결제 카드' },
                { term: '연체', explanation: '약속한 날짜까지 카드값을 갚지 못하는 상태 (신용점수 하락 원인)' },
              ],
            },
          ],
          questions: [
            {
              id: 'qb-1',
              number: 1,
              instruction: '읽은 내용을 바탕으로 아래 빈칸 비교표를 완성해 보세요.',
              promptQuestion: '체크카드와 신용카드의 가장 큰 차이점을 표에 간단히 적어 봅시다.',
              scaffoldHint: '힌트: 돈이 언제 빠져나가나요? 통장에 돈이 없을 때도 쓸 수 있나요?',
              spaceType: 'table',
              tableColumns: ['구분', '돈이 빠져나가는 시점', '장점 1가지', '주의할 점 1가지'],
              tableRowLabels: ['체크카드', '신용카드'],
            },
            {
              id: 'qb-2',
              number: 2,
              instruction: '민수의 상황에 어울리는 카드를 선택해 봅시다.',
              promptQuestion:
                '한 달 수입이 50만 원인 민수에게는 어떤 카드가 더 알맞을까요? 자신의 생각과 이유를 한두 문장으로 적어 보세요.',
              scaffoldHint: '예시: 나는 민수에게 ( )카드를 추천한다. 왜냐하면 ~ 때문이다.',
              spaceType: 'lines',
              linesCount: 3,
            },
          ],
        },
        aiInquirySection: {
          id: 'ai-inquiry',
          title: '2. AI와 함께 탐구하고·검증하기',
          visible: true,
          pageBreakBefore: false,
          guideSummary: '혼자 해결하기 어려운 금융 궁금증을 AI에게 질문하고, 답이 맞는지 함께 확인해 봅니다.',
          steps: [
            {
              id: 'aib-1',
              stepNumber: 1,
              stepTitle: '나만의 AI 질문 만들기',
              instruction: '아래 예시를 참고하여 내가 궁금한 카드 사용 질문을 1가지 적고 AI에게 물어보세요.',
              promptExample:
                '예시: "체크카드를 꾸준히 쓰면 나중에 신용점수에 도움이 되나요? 사회초년생이 주의할 점 3가지를 쉽게 알려줘."',
              spaceType: 'lines',
              linesCount: 2,
            },
            {
              id: 'aib-2',
              stepNumber: 2,
              stepTitle: 'AI 답변 핵심 정리 및 사실 확인',
              instruction: 'AI가 알려준 내용 중 가장 중요한 점 2가지를 적고, 헷갈리는 부분이 없는지 확인하세요.',
              spaceType: 'comparison_table',
              tableColumns: ['AI가 알려준 내용 요약', '내가 이해한 뜻 / 추가 확인이 필요한 점'],
              tableRowLabels: ['핵심 내용 ①', '핵심 내용 ②'],
            },
          ],
          verificationCriteria: [
            { id: 'vb-1', checkPoint: '연령·소득 조건이 현실과 맞는지 확인', howToVerify: '만 19세 이상 발급 기준 등 카드사·금융감독원 안내와 대조' },
            { id: 'vb-2', checkPoint: '모르는 금융 단어가 그대로 넘어가지 않았는지 확인', howToVerify: '이해되지 않는 용어는 AI에게 "중학생도 알 수 있게 설명해 줘"로 재질문' },
          ],
        },
        writingReflectionSection: {
          id: 'writing-reflection',
          title: '3. 나의 생각으로 쓰고 성찰하기',
          visible: true,
          pageBreakBefore: false,
          activityStructureLabel: '개별탐구형 · 문장 완성 틀을 활용한 개인 소비 원칙 세우기',
          writingPrompt:
            '오늘 탐구한 내용을 바탕으로, 내가 첫 월급이나 용돈을 관리할 때 지킬 나만의 카드 사용 약속을 완성해 보세요.',
          sentenceStarters: [
            '1) 내가 주로 사용할 카드는 (          )이다. 왜냐하면 ______________________________________ 때문이다.',
            '2) 카드를 사용할 때 나는 매달 (          )원 이하로만 사용하도록 한도를 정할 것이다.',
            '3) 만약 결제일에 돈이 부족할 위험이 보이면 ______________________________________ 하겠다.',
          ],
          structuredTables: [
            {
              id: 'ind-plan-table',
              title: '나의 한 달 용돈·수입 배분 계획표 (예시 연습)',
              description: '한 달에 30만 원의 용돈 또는 아르바이트 수입이 있다고 가정하고 배분해 보세요.',
              headers: ['항목', '계획 금액(원)', '사용 원칙'],
              rowCount: 3,
              presetRowLabels: ['고정 지출 (교통·통신)', '생활·여가 소비', '비상금·저축'],
            },
          ],
          reflectionPrompt: '[오늘의 생각 정리] 오늘 수업을 통해 카드 사용에 대해 새롭게 알게 되거나 생각이 바뀐 점을 2문장 이상 적어 보세요.',
          writingLinesCount: 3,
        },
        selfCheckSection: {
          id: 'self-check',
          title: '4. 오늘의 자기 점검',
          visible: true,
          pageBreakBefore: false,
          guideText: '해당하는 칸에 ✓ 표시를 해 봅시다.',
          items: [
            { id: 'scb-1', category: '이해', criterion: '체크카드와 신용카드의 결제 방식 차이를 말로 설명할 수 있다.' },
            { id: 'scb-2', category: 'AI 활용', criterion: 'AI에게 쉬운 설명을 요청하고 핵심 내용을 내 말로 정리했다.' },
            { id: 'scb-3', category: '실천 다짐', criterion: '나의 소비 습관에 맞는 안전한 카드 사용 원칙을 세웠다.' },
          ],
        },
        teacherFeedbackSection: {
          id: 'teacher-feedback',
          title: '5. 교사 피드백',
          visible: true,
          pageBreakBefore: false,
          guidanceFocus: ['용어 이해도 및 문장 완성 틀 활용 수준 확인', '개별 소비 계획의 현실성 격려 및 보완'],
          feedbackLinesCount: 2,
        },
      },
    },
  },
  {
    id: 'rw-advanced-discussion',
    label: '심화 · 토의·토론형 (무역외국어과)',
    description: 'AI 맞춤형 가격 책정(다이나믹 프라이싱)의 공정성 논쟁 (2차시)',
    payload: {
      schemaVersion: '1.0',
      id: 'sample-rw-advanced-discussion',
      documentType: 'reading_worksheet',
      updatedAt: '2026-11-13',
      input: {
        schoolName: '인천비즈니스고등학교',
        department: '무역외국어과',
        subject: '국제상무',
        grade: '2학년',
        topic: '글로벌 플랫폼의 AI 맞춤형 가격 책정(다이나믹 프라이싱), 공정한 시장 전략인가?',
        studentLevel: 'advanced',
        lessonMode: 'discussion',
        sessions: '2차시 (100분)',
        objectives:
          '상충하는 이해관계자(플랫폼 기업 vs 소비자·규제 당국)의 복수 자료를 비교 분석하고, AI를 반론 탐색 도구로 활용하여 논리적인 주장과 재반박을 구성한다.',
        aiUsageLevel: 'active',
        teacherNotes:
          '찬반 양측의 경제적 효율성과 소비자 후생·정보 비대칭 문제를 균형 있게 다루며, AI가 생성한 반론의 논리적 허점을 학생 스스로 비판적으로 검토하게 한다.',
        teacherName: '이서연',
        sessionMinutes: '50분 × 2차시',
        subtitleNote: '읽걷쓰AI 심화 토의·토론 활동지',
      },
      readingWorksheet: {
        documentTitle: '글로벌 플랫폼의 AI 맞춤형 가격 책정, 공정한 시장 전략인가?',
        documentSubtitle: '읽걷쓰AI 수업활동지 · 토의·토론형 (심화 수준)',
        studentInfoFields: ['학년 / 반', '토론 조 / 입장', '학번', '성명'],
        readingSection: {
          id: 'reading',
          title: '1. 복수 자료 읽고·쟁점 분석하기',
          visible: true,
          pageBreakBefore: false,
          guideText:
            '상반된 관점을 담은 [자료 A]와 [자료 B]를 비교 분석하여 핵심 논점을 도출하고, 토론에서의 초기 입장을 정립하세요.',
          materials: [
            {
              id: 'mat-adv-1',
              title: '[자료 A] 수요·공급 균형과 자원 배분의 효율성을 높이는 AI 가격 전략',
              materialType: '개념 설명',
              sourceNote: '시장 경제 이론 및 전자상거래 가격 모델 요약 (수업용 재구성)',
              isVirtualCase: false,
              factCheckRequired: true,
              factCheckNote: '항공·숙박·차량호출 산업별 가격 규제 현황은 국가별 최신 공정거래 정책 확인 필요',
              paragraphs: [
                '다이나믹 프라이싱(Dynamic Pricing)은 시간, 재고 수준, 경쟁사 가격, 실시간 수요 변화 등 방대한 시장 데이터를 AI 알고리즘이 분석해 가격을 탄력적으로 조정하는 기법이다. 과거 항공권이나 호텔 숙박료에서 주로 쓰이던 방식이 최근에는 글로벌 이커머스, 배달 플랫폼, 공연 티켓 시장까지 확산되고 있다.',
                '옹호 측에서는 AI 기반 탄력 가격제가 시장의 자원 배분 효율성을 극대화한다고 주장한다. 수요가 몰리는 피크 시간대에는 가격을 올려 초과 수요를 조절하고 공급자의 추가 참여를 유도하며, 반대로 비수기나 재고가 남는 시간대에는 가격을 대폭 낮춰 더 많은 소비자가 저렴하게 재화를 구매할 수 있도록 만든다는 것이다. 일률적인 정가제보다 시장 청산 속도가 빨라지고 기업의 재고 손실이 줄어드는 장점이 있다.',
              ],
            },
            {
              id: 'mat-adv-2',
              title: '[자료 B] 개인화 가격 차별과 알고리즘 불투명성에 대한 소비자 우려',
              materialType: '사례 자료',
              sourceNote: '가상 플랫폼 분쟁 사례 및 소비자 권익 논의 재구성',
              isVirtualCase: true,
              factCheckRequired: true,
              factCheckNote: '특정 플랫폼의 개인정보 기반 가격 차별 금지 법제화 여부는 교사 최신 자료 보완 권장',
              paragraphs: [
                '반면 비판적 관점에서는 AI가 단순히 전체 시장 수요만 보는 것이 아니라 개별 소비자의 검색 이력, 구매 시급성, 기기 종류, 위치 정보까지 학습해 "지불 의사 한계치"에 맞춰 서로 다른 가격을 제시하는 개인화 가격 차별(Personalized Pricing)로 변질될 위험을 지적한다. 예컨대 배터리가 5% 남은 스마트폰 사용자에게 동일한 차량 호출 요금을 더 높게 제시하거나, 특정 회원의 반복 검색 기록을 포착해 할인 쿠폰 노출을 제외하는 사례가 논의된다.',
                '소비자는 자신이 왜 다른 사람과 다른 가격을 제시받았는지 알고리즘의 기준을 알기 어렵다. 정보 비대칭이 심화된 상태에서 AI 가격 책정이 사실상 소비자의 심리적 취약점이나 긴급 상황을 이용하는 수단이 된다면, 이는 자유로운 가격 결정권을 넘어 시장 신뢰와 공정 거래 질서를 훼손하는 문제로 이어질 수 있다.',
              ],
            },
          ],
          questions: [
            {
              id: 'qa-1',
              number: 1,
              instruction: '두 자료의 핵심 논리와 충돌 지점을 구조화하세요.',
              promptQuestion: '다이나믹 프라이싱에 대한 [자료 A]와 [자료 B]의 핵심 근거 및 한계를 비교 정리해 봅시다.',
              spaceType: 'table',
              tableColumns: ['비교 관점', '찬성(시장 효율성 관점)', '반대·규제(소비자 보호 관점)'],
              tableRowLabels: ['핵심 논거', '기대 효과 / 우려 지점', '내가 발견한 논리적 약점'],
            },
          ],
        },
        aiInquirySection: {
          id: 'ai-inquiry',
          title: '2. AI를 활용한 반론 탐색 및 논거 검증',
          visible: true,
          pageBreakBefore: false,
          guideSummary:
            'AI에게 내 입장의 반대편 논리를 요청하여 예상 반론을 미리 점검하고, 반론에 대응할 재반박 근거의 타당성을 검증합니다.',
          steps: [
            {
              id: 'aia-1',
              stepNumber: 1,
              stepTitle: 'AI 반론 시뮬레이션 및 논점 확장',
              instruction:
                '내가 정한 입장(규제 최소화 vs 투명성·규제 강화)을 AI에게 먼저 밝힌 뒤, 가장 날카로운 반대 논거 2가지를 요청해 정리하세요.',
              promptExample:
                '예시: "나는 AI 기반 탄력 가격제가 비수기 할인 등 소비자 혜택도 크므로 과도한 사전 규제는 신중해야 한다는 입장이다. 내 주장을 가장 강하게 반박할 수 있는 경제·법적 논거 2가지와 실제 예상 사례를 제시해 줘."',
              spaceType: 'comparison_table',
              tableColumns: ['AI가 제시한 상대측 반론', '반론의 타당성 평가 및 누락된 전제', '나의 재반박 전략'],
              tableRowLabels: ['예상 반론 ①', '예상 반론 ②'],
            },
          ],
          verificationCriteria: [
            { id: 'va-1', checkPoint: 'AI가 제시한 해외 규제 사례·법안의 실존 여부', howToVerify: 'EU 디지털서비스법(DSA) 또는 국내 전자상거래법 실제 조항과 대조 확인' },
            { id: 'va-2', checkPoint: '과장된 통계·허위 판례 배제', howToVerify: 'AI 응답에 출처 불명의 수치("소비자 87% 피해" 등)가 있으면 근거로 채택하지 않음' },
          ],
        },
        writingReflectionSection: {
          id: 'writing-reflection',
          title: '3. 논증 기록 및 최종 입장 재정리',
          visible: true,
          pageBreakBefore: false,
          activityStructureLabel: '토의·토론형 · 주장·근거·반박·재반박 및 최종 합의/입장 서술',
          writingPrompt:
            '모둠 또는 학급 토론을 진행하며 상대측의 주장과 근거를 경청해 기록하고, 토론 전후 내 생각의 변화를 포함하여 최종 정책·기업 윤리 제안을 작성하세요.',
          structuredTables: [
            {
              id: 'debate-record-table',
              title: '토론 참여 기록표 (주장 · 근거 · 반박 · 재반박)',
              description: '토론 과정에서 오간 핵심 논점을 빠짐없이 기록합니다.',
              headers: ['구분', '핵심 주장 및 근거', '상대측 반박 요지', '재반박 또는 수용 내용'],
              rowCount: 2,
              presetRowLabels: ['1차 입론 및 교차 질의', '2차 반론 및 쟁점 정리'],
            },
          ],
          reflectionPrompt:
            '[최종 입장 및 성찰] 토론을 마친 후 나의 최종 입장은 무엇인가요? AI 활용과 동료 토론을 거치며 수정되거나 정교해진 논리를 중심으로 작성하세요.',
          writingLinesCount: 6,
        },
        selfCheckSection: {
          id: 'self-check',
          title: '4. 오늘의 자기 점검',
          visible: true,
          pageBreakBefore: false,
          guideText: '토론 준비부터 성찰까지 자신의 사고 과정을 객관적으로 점검하세요.',
          items: [
            { id: 'sca-1', category: '비판적 읽기', criterion: '상반된 두 자료의 전제와 이해관계를 정확히 비교해 쟁점을 도출했다.' },
            { id: 'sca-2', category: 'AI 비판 활용', criterion: 'AI가 제시한 반론과 사례의 사실 여부를 확인하고 내 논리 보완에 활용했다.' },
            { id: 'sca-3', category: '논리적 소통', criterion: '상대방의 근거를 경청하고 감정적 비난 없이 논거 중심으로 반박·합의했다.' },
          ],
        },
        teacherFeedbackSection: {
          id: 'teacher-feedback',
          title: '5. 교사 피드백',
          visible: true,
          pageBreakBefore: false,
          guidanceFocus: ['논거의 근거 충실성 및 출처 검증 태도', '상반된 관점 통합 및 대안 제시 수준'],
          feedbackLinesCount: 3,
        },
      },
    },
  },
];

export const VOCATIONAL_PROJECT_PRESETS: SamplePreset[] = [
  {
    id: 'vp-content-4session',
    label: '콘텐츠디자인과 · 영상제작기초 · 4차시',
    description: '로컬 소상공인 홍보 숏폼 영상 제작 프로젝트 (보통 · 모둠협력형)',
    payload: {
      schemaVersion: '1.0',
      id: 'sample-vp-content-4session',
      documentType: 'vocational_project',
      updatedAt: '2026-11-13',
      input: {
        schoolName: '인천비즈니스고등학교',
        department: '콘텐츠디자인과',
        subject: '영상제작기초',
        grade: '2학년',
        topic: '인천 지역 소상공인 매장 홍보 숏폼(60초) 영상 제작 실무 프로젝트',
        studentLevel: 'standard',
        lessonMode: 'group',
        sessions: '4차시 (총 200분)',
        objectives:
          '지역 상권 매장의 실제 홍보 요구를 반영하여 기획안·콘티 작성부터 촬영, AI 보조 자막·음향 편집, 최종 납품 규격 검수까지 영상 제작 실무 전 과정을 모둠별로 완수한다.',
        aiUsageLevel: 'active',
        teacherNotes:
          '학교 보유 촬영 장비(스마트폰 짐벌, 핀마이크 등) 및 무료/학교 라이선스 편집 툴 보유 여부를 사전 확인하고, 상업적 저작권·초상권 준수 지도를 반드시 포함한다.',
        teacherName: '정다은',
        sessionMinutes: '50분 × 4차시',
        subtitleNote: '직업계고 실무 프로젝트 교수·학습 설계서',
      },
      vocationalProject: {
        documentTitle: '인천 지역 소상공인 매장 홍보 숏폼 영상 제작 프로젝트',
        documentSubtitle: '직업계고 실무 프로젝트 수업 설계서 · 교사용',
        basicInfoSection: {
          id: 'basic-info',
          title: '1. 프로젝트 기본 정보',
          visible: true,
          pageBreakBefore: false,
          projectTitle: '인천 개항장·전통시장 소상공인 매장 홍보 숏폼(9:16) 영상 제작',
          targetJobRole: '디지털 미디어 콘텐츠 기획·제작 보조원 (영상 크리에이터 / SNS 홍보 마케터)',
          ncsOrCoreCompetencies: [
            '콘텐츠 기획 및 스토리보드 작성',
            '스마트기기 기반 영상 촬영 및 조명·음향 운용',
            '비선형 영상 편집 및 자막·음원 저작권 관리',
            '직무 협업 및 클라이언트 피드백 반영 능력',
          ],
          lessonTypeRationale:
            '실제 현장의 영상 제작 공정(기획·촬영·편집·검수)을 반영하여 모둠협력형으로 운영하며, 학생들은 기획자(PD)·촬영감독·편집자·마케팅검수자 역할을 분담해 협업한다.',
        },
        overviewSection: {
          id: 'overview',
          title: '2. 프로젝트 개요 및 학습 목표',
          visible: true,
          pageBreakBefore: false,
          background:
            '모바일 중심의 숏폼 콘텐츠가 지역 소상공인 홍보의 핵심 수단으로 자리 잡으면서, 직업계고 콘텐츠디자인과 학생들에게도 단순 기능 숙달을 넘어 "고객의 요구에 맞춘 상업용 숏폼 제작 실무 역량"이 요구되고 있다. 본 프로젝트는 학교 인근 상권(또는 가상 의뢰 매장)을 대상으로 60초 이내의 세로형 홍보 영상을 제작하는 직무 중심 수업이다.',
          projectSummary:
            '모둠별로 1개의 지역 소상공인 매장(카페, 베이커리, 공방 등)을 선정하여 타깃 고객과 핵심 강점을 분석하고, AI를 활용해 카피 초안·촬영 리스트 점검을 지원받은 뒤 직접 촬영·편집·시사회 피드백을 거쳐 최종 홍보 영상을 완성한다.',
          learningObjectives: [
            '의뢰 매장의 특성과 주요 고객층(페르소나)을 분석하여 15초 후킹(Hooking) 전략이 포함된 숏폼 기획안을 작성할 수 있다.',
            '세로형 화면 비율(9:16) 구도와 현장 수음(오디오) 원칙을 지켜 안정적인 홍보 컷을 촬영할 수 있다.',
            'AI 도구를 보조적으로 활용해 자막 초안 및 홍보 해시태그를 생성하되, 사실 오류와 저작권 문제가 없도록 직접 검수·수정할 수 있다.',
            '모둠원 간 역할 분담과 상호 피드백을 바탕으로 제작 기한 내에 납품 규격에 맞는 영상 결과물을 제출할 수 있다.',
          ],
          emphasisPoints: [
            '과도한 시각 효과보다 "매장 정보의 명확한 전달"과 "초반 3초 시선 집중"에 초점',
            '실제 매장 방문 촬영이 여의치 않은 경우 교내 실습실 또는 학교 매점·동아리 홍보 등 교내 의뢰처로 대체 가능',
          ],
        },
        scenarioSection: {
          id: 'scenario',
          title: '3. 실무 상황 및 수행 과제',
          visible: true,
          pageBreakBefore: false,
          scenarioTitle: '실무 시나리오: "개항로 로컬 베이커리의 SNS 신규 고객 유입을 위한 릴스/쇼츠 제작 의뢰"',
          practicalContext:
            '당신은 학교 산학협력 미디어 스튜디오 소속 신입 제작팀입니다. 인근 소상공인 사장님으로부터 "매장 대표 메뉴와 매장 분위기를 20~30대 및 인근 직장인에게 알릴 45~60초 분량의 세로형 숏폼 영상을 제작해 달라"는 의뢰를 받았습니다. 예산과 장비가 제한된 실무 환경에서 4차시 안에 시사회용 마스터 영상을 완성해야 합니다.',
          studentRole:
            '모둠별 4인 1팀 실무 제작진 (① 총괄 기획·카피라이터, ② 촬영·조명 담당, ③ 컷 편집·음향·자막 담당, ④ 저작권·품질 검수 및 클라이언트 응대 담당)',
          workingConditions: [
            '영상 규격: 세로형 Full HD (1080×1920, 9:16 비율), 길이 40초 이상 60초 이내, MP4(H.264) 출력',
            '필수 포함 정보: 매장명, 대표 메뉴/상품 1~2종 특징, 위치 또는 방문 안내, 시선 집중용 오프닝 자막',
            '음원 및 폰트: 상업적 무료 이용 허가(CCL/공유마당/유튜브 오디오 라이브러리/무료 폰트) 확인 자료만 사용',
            '개인정보·초상권: 촬영 중 행인이나 타 고객의 얼굴이 식별되지 않도록 구도를 잡거나 모자이크 처리',
          ],
          coreTasks: [
            {
              id: 'task-1',
              taskCode: 'TASK 01',
              taskName: '의뢰 분석 및 숏폼 스토리보드 기획',
              description: '선정 매장의 핵심 매력 3가지를 도출하고, 오프닝-전개-마무리 8컷 내외의 콘티와 내레이션/자막 초안을 작성한다.',
              deliverable: 'A4 1장 분량 숏폼 기획안 및 콘티',
            },
            {
              id: 'task-2',
              taskCode: 'TASK 02',
              taskName: '현장/실습실 영상 촬영 및 소스 확보',
              description: '익스트림 클로즈업(메뉴), 미디엄 샷(공간 분위기), 동작 컷을 구도 흔들림 없이 촬영하고 필요시 현장 인터뷰 음성을 수음한다.',
              deliverable: '원본 영상 클립 12컷 이상 및 현장 오디오',
            },
            {
              id: 'task-3',
              taskCode: 'TASK 03',
              taskName: '영상 편집, AI 자막 검수 및 마스터링',
              description: '비트감 있는 컷 전환, 가독성 높은 자막 배치, 배경음악 볼륨 밸런싱(덕킹)을 적용해 마스터 영상을 완성한다.',
              deliverable: '최종 숏폼 영상 파일(.mp4) 및 저작권 체크리스트',
            },
          ],
        },
        sessionsSection: {
          id: 'sessions',
          title: '4. 차시별 교수·학습 활동',
          visible: true,
          pageBreakBefore: true,
          preferredLayout: 'table',
          sessions: [
            {
              id: 'ses-1',
              sessionLabel: '1차시',
              title: '프로젝트 브리핑 · 모둠 역할 분담 · 숏폼 기획 및 콘티 작성',
              duration: '50분',
              learningContent: '소상공인 숏폼 성공 사례 분석, 타깃 설정 및 3초 후킹 전략, 모둠 역할 배정, 스토리보드 설계',
              studentActivities: [
                '모둠별 담당 매장(또는 교내 실습 주제) 선정 및 핵심 셀링 포인트 3가지 도출',
                'AI에게 타깃 고객층별 홍보 문구 아이디어를 요청한 뒤 매장 현실에 맞게 1차 선별·수정',
                '컷별 화면 구도·시간(초)·자막이 포함된 8컷 스토리보드 완성',
              ],
              teacherSupport: [
                '우수 로컬 홍보 숏폼 2편을 시연하며 컷 전환 템포와 자막 위치 가이드라인 제시',
                '모둠별 기획안이 4차시 내 촬영 가능한 분량인지 실현 가능성 점검 및 피드백',
              ],
              sessionOutput: '모둠별 숏폼 기획안 및 스토리보드 1부',
            },
            {
              id: 'ses-2',
              sessionLabel: '2차시',
              title: '세로형 촬영 기법 실습 및 현장(교내) 영상 소스 촬영',
              duration: '50분',
              learningContent: '9:16 세로 화면 구도 잡기, 역광 피하기 및 자연광 활용, 짐벌·삼각대 고정 촬영, 초상권 보호 촬영 원칙',
              studentActivities: [
                '콘티 순서에 따라 역할(연출·촬영·소품 세팅·체크리스트 관리)을 수행하며 12컷 이상 촬영',
                '촬영 직후 현장에서 초점·노출·흔들림·배경 행인 노출 여부를 즉시 프리뷰 검수',
                '부족한 인서트 컷(재료, 손동작, 매장 전경) 추가 확보',
              ],
              teacherSupport: [
                '촬영 시작 전 안전 주의사항(이동 중 장비 낙하 방지, 타인 초상권 사전 동의) 안내',
                '실습 공간 순회 지도하며 과도한 줌/패닝 대신 짧은 정지 컷 다수 확보 권고',
              ],
              sessionOutput: '선별 완료된 촬영 영상 원본 클립 세트',
            },
            {
              id: 'ses-3',
              sessionLabel: '3차시',
              title: '컷 편집 · AI 자막 및 음향 밸런싱 · 저작권 교차 검증',
              duration: '50분',
              learningContent: '리듬감 있는 컷 편집, 모바일 UI 안전 영역(Safe Zone) 자막 배치, 배경음악과 내레이션 음량 조절',
              studentActivities: [
                '촬영 클립을 1~2초 단위로 속도감 있게 컷 편집하고 스토리보드 흐름과 대조',
                'AI 음성인식 자막 기능으로 초안을 뽑은 뒤 오탈자·고유명사·줄바꿈을 직접 수정',
                '사용한 폰트와 BGM의 무료 상업 라이선스 출처를 저작권 체크리스트에 기록',
              ],
              teacherSupport: [
                '틱톡/릴스/쇼츠 하단·우측 버튼 영역에 자막이 가리지 않도록 안전 영역 가이드 제공',
                '배경음악 볼륨이 말소리(-12dB ~ -6dB 기준)를 덮지 않도록 오디오 미터 확인 지도',
              ],
              sessionOutput: '1차 편집 가편집본(MP4) 및 저작권 확인서',
            },
            {
              id: 'ses-4',
              sessionLabel: '4차시',
              title: '모둠 간 시사회 · 동료 피드백 반영 수정 · 최종 납품 및 성찰',
              duration: '50분',
              learningContent: '클라이언트 관점의 결과물 검수, 동료 평가 피드백 수렴, 최종 출력 규격 검증 및 프로젝트 성찰',
              studentActivities: [
                '모둠별 가편집본 상영 및 기획 의도 1분 브리핑 진행',
                '타 모둠으로부터 받은 개선 피드백(자막 속도, 매장 위치 안내 보완 등) 중 즉시 수정 가능한 1~2가지 반영',
                '최종 마스터 영상 출력 및 산출물 체크리스트 제출, 개인·모둠 성찰지 작성',
              ],
              teacherSupport: [
                '단순 감상평이 아닌 "소비자 행동 유도 여부"와 "정보 전달 명확성" 기준의 피드백 진행',
                '평가 루브릭 기반 최종 수행평가 관찰 및 모둠별 성장 포인트 총평 제공',
              ],
              sessionOutput: '최종 홍보 숏폼 마스터 파일(.mp4) 및 성찰 보고서',
            },
          ],
        },
        deliverablesSection: {
          id: 'deliverables',
          title: '5. 최종 산출물 및 제출 기준',
          visible: true,
          pageBreakBefore: false,
          finalDeliverableName: '소상공인 홍보 숏폼 영상 패키지 (영상 파일 + 기획안 + 저작권 확인서)',
          requiredComponents: [
            '최종 마스터 영상 파일 1편 (파일명 규칙: 학번모둠명_매장명_최종.mp4)',
            '수업 중 수정 내역이 반영된 숏폼 기획안 및 스토리보드 1부',
            '사용 음원·폰트·이미지 출처 및 초상권 확인을 기록한 저작권 체크리스트 1부',
          ],
          submissionStandards: [
            '해상도 1080×1920(9:16), 재생 시간 40초~60초 준수',
            '영상 내 매장명·대표 메뉴·방문 정보 자막이 모바일 안전 영역 내에 가독성 있게 배치될 것',
            '배경음악과 목소리/효과음 간 소리 찢어짐(클리핑)이나 갑작스러운 끊김이 없을 것',
          ],
          verificationItems: [
            '실제 매장이 아닌 가상 매장 설정 시 영상 설명란 또는 엔딩 자막에 수업용 가상 프로젝트임을 명시했는가?',
            '제3자의 얼굴·차량 번호판 등 개인정보가 동의 없이 노출되지 않았는가?',
          ],
        },
        evaluationSection: {
          id: 'evaluation',
          title: '6. 프로젝트 평가 계획',
          visible: true,
          pageBreakBefore: false,
          schoolAlignmentNotice:
            '※ 안내: 아래 평가 요소와 루브릭 기준은 수업 설계 예시입니다. 실제 성적 산출 및 수행평가 반영 시에는 본교 학업성적관리규정 및 교과 평가계획서와의 일치 여부를 교사가 반드시 확인·조정하시기 바랍니다.',
          evaluationMethods: ['산출물 평가(영상 마스터 및 기획안)', '과정 중심 관찰 평가(촬영·편집·협업 태도)', '동료 및 자기 성찰 평가'],
          landscapeRecommended: false,
          rubric: [
            {
              id: 'rub-1',
              criterion: '실무 기획력 및 메시지 전달력',
              weight: '25%',
              excellent: '의뢰 매장의 핵심 강점과 타깃 고객을 정확히 분석해 초반 3초 후킹과 정보 전달이 매우 설득력 있는 기획안·영상을 구현함.',
              good: '매장의 주요 특징과 타깃을 반영하여 홍보 목적이 드러나는 기획안과 영상을 안정적으로 제작함.',
              basic: '기획안의 기본 항목을 작성했으나 타깃 연결이나 매장 강점 부각이 다소 추상적임.',
              insufficient: '기획안 구성이 미흡하거나 영상 내용이 홍보 의도와 연결되지 않음.',
            },
            {
              id: 'rub-2',
              criterion: '촬영·편집 기술 및 규격 완성도',
              weight: '30%',
              excellent: '세로형 구도, 흔들림 억제, 조명, 컷 리듬, 안전 영역 자막 및 오디오 밸런싱이 모두 실무 납품 수준으로 정교함.',
              good: '제시된 영상 규격(9:16, 길이)을 준수하고, 구도와 자막·음향 편집이 전반적으로 깔끔함.',
              basic: '규격은 맞추었으나 일부 컷의 흔들림, 어두운 노출, 자막 가림 또는 음량 불균형이 나타남.',
              insufficient: '제시된 화면 비율·길이 규격을 지키지 못하거나 편집이 미완성 상태임.',
            },
            {
              id: 'rub-3',
              criterion: 'AI 활용 및 저작권·윤리 검증',
              weight: '20%',
              excellent: 'AI 도구를 기획·자막 보조에 효과적으로 활용하고, 결과물의 사실 오류를 스스로 수정했으며 모든 음원·폰트·초상권 증빙을 완벽히 갖춤.',
              good: 'AI 보조 결과물을 점검하여 활용하고, 무료 라이선스 음원·폰트 출처와 초상권 주의사항을 준수함.',
              basic: 'AI 초안을 일부 수정 없이 사용하거나 저작권 출처 기록 일부가 누락되어 교사의 안내 후 보완함.',
              insufficient: '저작권 허가 여부가 불분명한 자료를 무단 사용하거나 초상권 유의사항을 지키지 않음.',
            },
            {
              id: 'rub-4',
              criterion: '모둠 협업 및 피드백 반영',
              weight: '25%',
              excellent: '자신의 담당 직무 역할을 주도적으로 완수하고, 모둠원·타 모둠의 피드백을 적극 수용해 최종 결과물의 질을 눈에 띄게 향상시킴.',
              good: '모둠 내에서 맡은 역할을 성실히 수행하고 시사회 피드백을 반영해 결과물을 수정함.',
              basic: '협업 과정에 참여했으나 역할 수행 편차가 있거나 피드백 반영이 형식적인 수준에 그침.',
              insufficient: '모둠 활동 참여가 소극적이거나 기한 내 공동 산출물 완성에 기여하지 못함.',
            },
          ],
        },
        guidanceSection: {
          id: 'guidance',
          title: '7. 실무 도구 활용 및 교사 지도 유의사항',
          visible: true,
          pageBreakBefore: false,
          tools: [
            { id: 't-1', category: '촬영 장비', toolName: '학생 스마트폰 또는 학교 보유 카메라, 핸드폰 삼각대/짐벌', purpose: '세로형(9:16) 영상 소스 촬영', schoolCheckRequired: true },
            { id: 't-2', category: '편집 소프트웨어', toolName: '캡컷(CapCut) / 브루(Vrew) / 프리미어 프로 등 학교 보유 환경', purpose: '컷 편집, 자동 자막 생성 및 오디오 보정', schoolCheckRequired: true },
            { id: 't-3', category: '생성형 AI', toolName: 'ChatGPT 또는 Gemini (교사 안내 프롬프트 기반)', purpose: '홍보 카피 아이디어 발산, 타깃 페르소나 점검', schoolCheckRequired: false },
          ],
          aiUsagePolicy:
            'AI는 제작자의 기획과 카피 발산을 돕는 보조 도구로만 사용합니다. AI가 지어낸 가상의 매장 후기, 허위 수상 이력, 검증되지 않은 효능 문구("국내 1위", "100% 유기농" 등)는 절대 영상 자막에 넣지 않도록 지도합니다.',
          safetyAndEthicsPoints: [
            '저작권·폰트 라이선스: 무료 버전이라도 "상업적 이용 가능(OFL, 공유마당 등)" 여부를 반드시 확인하고 출처를 남깁니다.',
            '초상권 및 개인정보: 교외 매장 촬영 시 업주의 사전 촬영 동의를 구하며, 방문 손님이나 행인 얼굴이 찍히지 않도록 정물·손동작 위주로 촬영합니다.',
            '안전 수칙: 이동 중 촬영 시 주변 보행자와 차량에 주의하고, 주방·뜨거운 조리기구 근처 촬영 시 안전거리를 확보합니다.',
          ],
          facilityCheckNotice:
            '※ 학교 현장 확인 필요: 본 설계서에 언급된 영상 편집 소프트웨어 라이선스 범위, 학교 공용 촬영 장비(삼각대·마이크) 수량, 교외 현장 촬영 시 학교 현장체험학습/외출 허가 절차를 수업 전 반드시 확인하세요.',
          teacherMemo:
            '실제 외부 상점 섭외가 어려운 학급의 경우, 교내 특성화고 학과 홍보·학교 매점 인기 메뉴 홍보·학교 도서관 캠페인 숏폼 제작으로 과제를 전환해도 동일한 학습 목표를 달성할 수 있음.',
        },
      },
    },
  },
  {
    id: 'vp-business-6session',
    label: '경영사무과 · 사무행정실무 · 6차시',
    description: '사내 복지 제도 도입 예산안 및 제안서 작성 프로젝트 (심화 · 토의·토론형)',
    payload: {
      schemaVersion: '1.0',
      id: 'sample-vp-business-6session',
      documentType: 'vocational_project',
      updatedAt: '2026-11-13',
      input: {
        schoolName: '인천비즈니스고등학교',
        department: '경영사무과',
        subject: '사무행정실무',
        grade: '3학년',
        topic: '중소기업 사내 복지 제도 도입을 위한 실무 예산안 및 경영진 제안서 작성',
        studentLevel: 'advanced',
        lessonMode: 'discussion',
        sessions: '6차시 (총 300분)',
        objectives:
          '제한된 기업 예산 범위 안에서 상충하는 복수 복지 대안의 비용·편익을 비교 분석하고, 근거 중심의 토의·토론 합의를 거쳐 경영진 보고용 실무 제안서와 예산 산출 내역서를 작성한다.',
        aiUsageLevel: 'active',
        teacherNotes:
          '심화 수준이므로 6차시 흐름에 맞춰 시장 조사-예산 모델링-이해관계자 토론-최종 보고서 작성으로 깊이를 확보하고, 실제 세법·근로기준법 관련 수치는 교사 확인 안내를 명시할 것.',
        teacherName: '최현우',
        sessionMinutes: '50분 × 6차시',
        subtitleNote: '직업계고 실무 프로젝트 수업 설계서',
      },
      vocationalProject: {
        documentTitle: '중소기업 사내 복지 제도 도입을 위한 실무 예산안 및 제안서 작성',
        documentSubtitle: '직업계고 실무 프로젝트 수업 설계서 · 교사용 (심화 6차시)',
        basicInfoSection: {
          id: 'basic-info',
          title: '1. 프로젝트 기본 정보',
          visible: true,
          pageBreakBefore: false,
          projectTitle: '한정 예산(연간 3,000만 원) 내 최적 사내 복지 패키지 설계 및 제안',
          targetJobRole: '경영지원팀·인사총무팀 사무행정 사무원',
          ncsOrCoreCompetencies: [
            '문서 작성 및 보고서 구조화',
            '스프레드시트 기반 예산 편성 및 비용-편익 분석',
            '부서 간 이해관계 조율 및 회의 진행·합의 도출',
            '프레젠테이션 및 의사결정 설득 역량',
          ],
          lessonTypeRationale:
            '경영지원 실무에서는 예산 제약 속에서 직원 만족도와 재무 건전성을 동시에 설득해야 하므로, 대안 비교와 모의 경영회의를 결합한 토의·토론형으로 설계함.',
        },
        overviewSection: {
          id: 'overview',
          title: '2. 프로젝트 개요 및 학습 목표',
          visible: true,
          pageBreakBefore: false,
          background:
            '사무행정 실무자는 단순히 문서를 타이핑하는 역할을 넘어, 제한된 예산 안에서 데이터를 분석하고 실현 가능한 대안을 비교·제안하는 문제 해결 역량을 갖추어야 한다. 본 프로젝트는 직원 이직률 상승을 겪고 있는 가상 중소기업 사례를 바탕으로 6차시 동안 총무·인사·재무 관점의 의사결정 토론과 문서 작성을 통합 수행한다.',
          projectSummary:
            '학생들은 직원 설문 데이터와 예산 조건을 분석해 3가지 복지 후보안(유연근무·식대지원·자기계발비) 중 최적의 조합을 설계하고, 재무팀·노사협의회·경영진 역할을 맡아 찬반 토론과 예산 조정 협의를 거친 뒤 최종 기안문 및 제안서를 완성한다.',
          learningObjectives: [
            '직원 50인 규모의 가상 기업 재무 조건과 설문 통계를 분석해 연간 3,000만 원 한도 내 복수 예산 시나리오를 설계할 수 있다.',
            '각 복지 제도의 장단점, 세제·노무상 유의점, 숨은 관리 비용을 비교하여 논리적인 대안을 선택할 수 있다.',
            '이해관계자 모의 토론에서 객관적 수치 근거를 바탕으로 반론에 대응하고 합의안을 도출할 수 있다.',
            '경영진이 즉시 결재할 수 있는 수준의 품의서·예산 산출표·요약 제안서를 일관된 양식으로 작성할 수 있다.',
          ],
          emphasisPoints: [
            '단순 아이디어 나열을 지양하고 "1인당 단가 × 인원 × 12개월" 산출 근거가 반드시 숫자로 맞도록 지도',
            'AI가 제시하는 세법·복리후생비 비과세 한도 등은 연도별 개정 사항이 있으므로 교사 제공 기준표로 검증',
          ],
        },
        scenarioSection: {
          id: 'scenario',
          title: '3. 실무 상황 및 수행 과제',
          visible: true,
          pageBreakBefore: false,
          scenarioTitle: '실무 시나리오: "임직원 50명 규모 IT·유통 중소기업 (주)인천무역의 사내 복지 개편 태스크포스"',
          practicalContext:
            '(주)인천무역은 최근 1년 사이 2~3년 차 주니어 사원의 퇴사율이 높아져 경영진이 연간 3,000만 원 범위의 신규 복지 예산 편성을 지시했다. 사내 설문에서는 ① 점심 식대 인상, ② 자기계발·도서비 지원, ③ 금요일 단축/유연근무 및 간식바 운영, ④ 장기근속 포상금 등이 제시되었으나 예산상 모두 도입할 수 없는 상황이다.',
          studentRole: '경영지원팀 실무 TF 담당자 (토론 시 재무관리 관점 / 인사노무 관점 / 현장직원 대표 관점 순환 검토)',
          workingConditions: [
            '총 연간 추가 예산 한도: 30,000,000원 (인당 평균 연 60만 원 이내, 예비비 5% 이상 필수 확보)',
            '대안 비교 필수: 최소 2개 이상의 복지 조합 시나리오(A안 vs B안)를 수치로 비교한 뒤 최종 1개안 선정',
            '제출 문서 구성: 기안 요약문(1쪽), 복지안 비교 및 토론 합의서(1쪽), 월별/항목별 예산 산출 내역서(1쪽)',
          ],
          coreTasks: [
            {
              id: 'bt-1',
              taskCode: 'TASK 01',
              taskName: '사전 조사 및 비용-편익 시나리오 설계',
              description: '후보 복지 항목별 예상 단가와 운영 관리 부담을 계산하여 3,000만 원 내 2가지 조합 시나리오를 작성한다.',
              deliverable: '대안 비교 분석표',
            },
            {
              id: 'bt-2',
              taskCode: 'TASK 02',
              taskName: '이해관계자 쟁점 토론 및 예산 조정',
              description: '재무 안정성 vs 직원 체감 만족도 간 충돌 지점을 토론하고, AI로 예상 반론을 점검한 뒤 절충안을 확정한다.',
              deliverable: '회의록 및 합의 수정안',
            },
            {
              id: 'bt-3',
              taskCode: 'TASK 03',
              taskName: '경영진 보고용 실무 제안서 및 예산서 완성',
              description: '품의 개요, 기대 효과, 리스크 대응 방안, 정확한 예산 합계표를 포함한 최종 제안 패키지를 작성한다.',
              deliverable: '최종 제안서 및 예산 산출표',
            },
          ],
        },
        sessionsSection: {
          id: 'sessions',
          title: '4. 차시별 교수·학습 활동',
          visible: true,
          pageBreakBefore: true,
          preferredLayout: 'cards',
          sessions: [
            {
              id: 'bs-1',
              sessionLabel: '1차시',
              title: '직무 브리핑 및 직원 설문 데이터 분석',
              duration: '50분',
              learningContent: '기업 복리후생 현황 사례 파악, 설문 응답 데이터(연령·근속연수별 선호도) 교차 분석',
              studentActivities: ['주어진 가상 기업 설문 데이터에서 핵심 요구사항과 부서별 우선순위 차이 도출'],
              teacherSupport: ['설문 수치 해석 시 단순 최빈값 외에 이직 의향군 데이터를 함께 보도록 안내'],
              sessionOutput: '데이터 분석 요약 노트',
            },
            {
              id: 'bs-2',
              sessionLabel: '2차시',
              title: '복지 항목별 원가 산정 및 복수 대안(A/B안) 모델링',
              duration: '50분',
              learningContent: '스프레드시트 수식을 활용한 인건비·복리후생비 계산, 예비비 및 부가 비용 반영',
              studentActivities: ['선호 상위 복지안의 월간·연간 소요 예산을 계산하고 한도 초과 항목 조정'],
              teacherSupport: ['복리후생비 비과세 한도 등 교사 제공 기준표 안내 및 수식 오류 점검'],
              sessionOutput: '예산 시나리오 A/B안 비교표',
            },
            {
              id: 'bs-3',
              sessionLabel: '3차시',
              title: 'AI 활용 반론 탐색 및 노사·재무 쟁점 분석',
              duration: '50분',
              learningContent: 'AI를 활용한 경영진·직원 측 예상 반론 시뮬레이션, 정책 부작용 및 형평성 이슈 점검',
              studentActivities: ['자신이 지지하는 시나리오에 대해 AI에게 재무·노무 리스크 반론을 요청하고 근거 보완'],
              teacherSupport: ['AI가 제시한 법적·세무적 언급은 반드시 제공된 최신 요약 자료와 대조하도록 지도'],
              sessionOutput: '쟁점별 예상 반론·재반박 정리표',
            },
            {
              id: 'bs-4',
              sessionLabel: '4차시',
              title: '모의 경영위원회 토론 및 최종 복지 패키지 합의',
              duration: '50분',
              learningContent: '입론·교차 질의·예산 절충 협의 진행, 회의록 작성 실무',
              studentActivities: ['역할별(재무·인사·직원대표) 입장 발표 후 예산 범위 내 최종 절충안 표결 및 합의'],
              teacherSupport: ['토론 중 감정적 주장 대신 비용-효과 지표와 운영 가능성을 근거로 합의하도록 중재'],
              sessionOutput: '모의 위원회 회의록 및 최종 합의안',
            },
            {
              id: 'bs-5',
              sessionLabel: '5차시',
              title: '경영진 보고용 품의서 및 제안서 문서 작성',
              duration: '50분',
              learningContent: '공문서·기안문 형식 준수, 두괄식 요약(Executive Summary), 표·차트 시각화',
              studentActivities: ['합의된 최종안과 예산 산출 내역서를 바탕으로 3쪽 이내 보고서 초안 완성'],
              teacherSupport: ['숫자 단위(천원/원), 합계 검산, 문장 간결성 등 실무 문서 품질 1:1 코칭'],
              sessionOutput: '최종 제안서 초안 및 예산서',
            },
            {
              id: 'bs-6',
              sessionLabel: '6차시',
              title: '제안서 발표 브리핑 · 동료 평가 · 교사 총평 및 성찰',
              duration: '50분',
              learningContent: '3분 핵심 브리핑 발표, 질의응답 대응, 최종 수정본 제출 및 직무 역량 성찰',
              studentActivities: ['팀별/개인별 제안 요약 발표 및 질의응답 수행, 동료 평가 기준표 작성 및 제출'],
              teacherSupport: ['실제 기업 결재권자 관점에서 설득력·수치 정확성 피드백 및 루브릭 평가 완료'],
              sessionOutput: '최종 제출 보고서 패키지 및 성찰지',
            },
          ],
        },
        deliverablesSection: {
          id: 'deliverables',
          title: '5. 최종 산출물 및 제출 기준',
          visible: true,
          pageBreakBefore: false,
          finalDeliverableName: '사내 복지 제도 도입 실무 제안서 및 예산 산출 패키지',
          requiredComponents: [
            '기안 요약문 및 도입 제안서 (3쪽 이내)',
            '대안 비교표 및 최종 예산 산출 내역서 (수식 검산 완료본)',
            '모의 위원회 토론 기록 및 합의 회의록',
          ],
          submissionStandards: [
            '연간 총예산 3,000만 원 이내 및 예비비 5%(150만 원) 이상 확보 여부',
            '단가·대상 인원·개월 수·합계가 오차 없이 일치할 것',
            '경어체·개조식 등 공식 비즈니스 보고서 문체 준수',
          ],
          verificationItems: [
            '세법·근로기준법 등 제도적 수치를 인용한 경우 교사가 확인한 공식 기준과 일치하는가?',
          ],
        },
        evaluationSection: {
          id: 'evaluation',
          title: '6. 프로젝트 평가 계획',
          visible: true,
          pageBreakBefore: false,
          schoolAlignmentNotice:
            '※ 안내: 아래 평가 루브릭은 본교 교과 평가계획과 맞춰 배점 및 성취수준 문구를 최종 조정하여 활용하시기 바랍니다.',
          evaluationMethods: ['산출물 평가(제안서·예산서)', '토론 과정 관찰 평가', '브리핑 및 질의응답 평가'],
          landscapeRecommended: false,
          rubric: [
            {
              id: 'brub-1',
              criterion: '데이터 분석 및 예산 모델링 정확성',
              weight: '30%',
              excellent: '설문 데이터를 정교하게 해석하고, 복수 대안의 산출 근거·예비비·부가 비용까지 오차 없이 완벽히 모델링함.',
              good: '예산 한도와 필수 항목을 정확히 계산하여 비교 가능한 두 가지 이상의 대안을 제시함.',
              basic: '기본 산출표는 작성했으나 일부 합계 오류나 누락 비용이 있어 수정 지도를 받음.',
              insufficient: '예산 한도를 초과하거나 산출 근거가 불분명하여 실행이 어려움.',
            },
            {
              id: 'brub-2',
              criterion: '토론 논증력 및 합의 도출',
              weight: '25%',
              excellent: '수치 근거와 AI 반론 탐색 결과를 활용해 상반된 이해관계를 논리적으로 조율하고 설득력 있는 절충안을 이끌어냄.',
              good: '근거를 들어 자신의 입장을 명확히 설명하고 상대측 의견을 반영해 합의에 참여함.',
              basic: '토론에 참여했으나 객관적 데이터보다 개인적 선호 위주로 의견을 제시함.',
              insufficient: '토론 준비가 부족하거나 타인의 의견을 경청·조율하지 못함.',
            },
            {
              id: 'brub-3',
              criterion: '실무 문서 완성도 및 전달력',
              weight: '25%',
              excellent: '결재권자가 한눈에 파악할 수 있는 두괄식 구조, 깔끔한 표·시각 자료, 정확한 비즈니스 문체를 구사함.',
              good: '제안서와 예산서의 필수 구성을 갖추고 가독성 있게 문서를 정리함.',
              basic: '내용은 포함되어 있으나 문서 서식 통일성이나 개조식 요약이 다소 미흡함.',
              insufficient: '제안서 필수 구성 요소가 누락되었거나 형식이 완성되지 않음.',
            },
            {
              id: 'brub-4',
              criterion: 'AI 활용 검증 및 실무 윤리',
              weight: '20%',
              excellent: 'AI가 제시한 제도·세제 정보를 공식 기준표와 교차 검증하여 오류를 스스로 걸러내고 출처를 명확히 관리함.',
              good: 'AI 보조 활용 시 교사의 검증 안내를 따르며 허위 수치 없이 문서를 작성함.',
              basic: 'AI 초안의 사실 검증 일부를 생략하여 확인 후 보완함.',
              insufficient: '검증되지 않은 AI 답변이나 허위 법규 내용을 그대로 보고서에 인용함.',
            },
          ],
        },
        guidanceSection: {
          id: 'guidance',
          title: '7. 실무 도구 활용 및 교사 지도 유의사항',
          visible: true,
          pageBreakBefore: false,
          tools: [
            { id: 'bt-tool-1', category: '문서·표 계산', toolName: '한컴오피스 / MS Office / 구글 스프레드시트 등 학교 실습실 소프트웨어', purpose: '예산 산출표 작성 및 제안서 편집', schoolCheckRequired: true },
            { id: 'bt-tool-2', category: '생성형 AI', toolName: 'ChatGPT 또는 Gemini', purpose: '이해관계자별 반론 예측, 보고서 문체 다듬기', schoolCheckRequired: false },
          ],
          aiUsagePolicy:
            '실제 기업명이나 학생 개인정보를 AI 프롬프트에 입력하지 않도록 지도하며, AI가 계산한 예산 합계는 반드시 스프레드시트 수식으로 재검산합니다.',
          safetyAndEthicsPoints: [
            '가상 기업 및 익명 설문 데이터만 사용하여 개인정보 보호 원칙 준수',
            '인사·노무 관련 기준(비과세 식대 한도, 근로기준법 등)은 교사가 사전 배포한 최신 요약표만 공식 근거로 인정',
          ],
          facilityCheckNotice:
            '※ 학교 현장 확인 필요: 실습실 컴퓨터의 오피스 프로그램 버전 및 네트워크 환경, 인쇄물 출력 환경 확인 필요.',
          teacherMemo:
            '6차시 프로젝트이므로 2차시 종료 시점과 4차시 종료 시점에 중간 점검 도장/체크를 진행하면 학생들의 일정 지연을 예방할 수 있음.',
        },
      },
    },
  },
];
