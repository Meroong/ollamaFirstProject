import type { Difficulty, Quiz, QuizQuestion } from '../types/quiz';

const questions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Ollama의 주요 역할로 가장 적절한 것은?',
    options: [
      { id: 'a', text: '웹 브라우저의 렌더링 엔진을 교체하는 도구' },
      { id: 'b', text: '로컬 환경에서 LLM을 쉽게 실행하고 관리하는 도구' },
      { id: 'c', text: '관계형 데이터베이스 스키마를 자동 생성하는 도구' },
      { id: 'd', text: 'PDF 파일을 이미지로만 변환하는 도구' },
    ],
    correct_option_id: 'b',
    explanation: 'Ollama는 여러 LLM을 로컬 환경에서 내려받고 실행할 수 있도록 도와주는 도구입니다.',
  },
  {
    id: 'q2',
    question: '이 서비스에서 프론트엔드가 PDF 파일을 처리하는 방식으로 맞는 것은?',
    options: [
      { id: 'a', text: '프론트에서 PDF 텍스트를 직접 추출한다' },
      { id: 'b', text: '브라우저에서 Ollama를 직접 호출한다' },
      { id: 'c', text: 'PDF 파일 자체를 백엔드 API로 전달한다' },
      { id: 'd', text: 'PDF 내용을 localStorage에 저장한 뒤 분석한다' },
    ],
    correct_option_id: 'c',
    explanation: '프론트엔드는 PDF 파일을 multipart/form-data로 백엔드에 전달하고, 텍스트 추출은 백엔드가 담당합니다.',
  },
  {
    id: 'q3',
    question: '백엔드에 PDF를 전송할 때 적절한 요청 형식은?',
    options: [
      { id: 'a', text: 'multipart/form-data' },
      { id: 'b', text: 'text/plain' },
      { id: 'c', text: 'application/xml' },
      { id: 'd', text: 'image/png' },
    ],
    correct_option_id: 'a',
    explanation: '파일 업로드가 포함되므로 FormData를 이용한 multipart/form-data 요청이 적절합니다.',
  },
  {
    id: 'q4',
    question: '퀴즈를 제출한 뒤 점수를 계산하는 위치는 어디인가?',
    options: [
      { id: 'a', text: '항상 데이터베이스에서 계산한다' },
      { id: 'b', text: 'Ollama 모델 내부에서 계산한다' },
      { id: 'c', text: 'PDF 파일 안에 점수를 기록한다' },
      { id: 'd', text: '프론트에서 선택 답안과 correct_option_id를 비교한다' },
    ],
    correct_option_id: 'd',
    explanation: '응답에 정답 ID가 포함되므로 프론트에서 사용자의 선택과 비교하여 바로 채점할 수 있습니다.',
  },
  {
    id: 'q5',
    question: '문제를 이동했다가 이전 문제로 돌아왔을 때 필요한 동작은?',
    options: [
      { id: 'a', text: '이전 답안을 모두 삭제한다' },
      { id: 'b', text: '기존에 선택한 답안을 유지한다' },
      { id: 'c', text: '정답을 자동으로 선택한다' },
      { id: 'd', text: '문제 순서를 무작위로 변경한다' },
    ],
    correct_option_id: 'b',
    explanation: '답안을 Record<string, string> 형태로 보관하면 화면을 이동해도 선택값을 유지할 수 있습니다.',
  },
  {
    id: 'q6',
    question: '백엔드가 아직 완성되지 않았을 때 프론트 개발을 계속하기 위한 가장 적절한 방법은?',
    options: [
      { id: 'a', text: '백엔드 완성까지 프론트 개발을 중단한다' },
      { id: 'b', text: 'PDF를 브라우저 콘솔에서 수동으로 분석한다' },
      { id: 'c', text: 'Mock 데이터를 사용해 전체 흐름을 구현한다' },
      { id: 'd', text: '모든 요청을 빈 객체로 처리한다' },
    ],
    correct_option_id: 'c',
    explanation: 'Mock 응답을 사용하면 API가 없어도 업로드 이후 퀴즈 풀이와 결과 화면을 독립적으로 개발할 수 있습니다.',
  },
  {
    id: 'q7',
    question: '퀴즈 API 응답에서 문제 하나를 나타내는 필드 조합으로 가장 적절한 것은?',
    options: [
      { id: 'a', text: 'question, options, correct_option_id, explanation' },
      { id: 'b', text: 'username, password, role, token' },
      { id: 'c', text: 'filename, mimeType, pageCount, checksum' },
      { id: 'd', text: 'host, port, database, table' },
    ],
    correct_option_id: 'a',
    explanation: '문제 지문, 보기, 정답 ID, 해설이 있으면 프론트에서 문제 표시와 채점을 모두 처리할 수 있습니다.',
  },
  {
    id: 'q8',
    question: '사용자가 모든 문제에 답하지 않고 제출하려 할 때 적절한 UX는?',
    options: [
      { id: 'a', text: '아무 안내 없이 제출을 차단한다' },
      { id: 'b', text: '미응답 개수를 알려주고 제출 여부를 확인한다' },
      { id: 'c', text: '미응답 문제를 모두 정답 처리한다' },
      { id: 'd', text: '현재까지의 답안을 삭제한다' },
    ],
    correct_option_id: 'b',
    explanation: '미응답 수를 알려주고 계속 제출할지 선택하게 하면 사용자의 의도를 존중하면서 실수를 줄일 수 있습니다.',
  },
  {
    id: 'q9',
    question: '실제 진행률을 알 수 없는 AI 문제 생성 과정에서 권장되는 로딩 표현은?',
    options: [
      { id: 'a', text: '정확하지 않은 0~100% 숫자를 강제로 표시한다' },
      { id: 'b', text: '브라우저를 새로고침한다' },
      { id: 'c', text: 'Spinner와 현재 처리 중이라는 안내 문구를 표시한다' },
      { id: 'd', text: '로딩 화면을 표시하지 않는다' },
    ],
    correct_option_id: 'c',
    explanation: '실제 진행률 데이터가 없다면 가짜 퍼센트보다 Spinner와 단계 안내가 더 정확한 UX입니다.',
  },
  {
    id: 'q10',
    question: '프론트에서 문제 생성 API 주소를 별도 모듈로 관리하는 주된 이유는?',
    options: [
      { id: 'a', text: '백엔드 주소 변경 시 수정 범위를 줄이기 위해' },
      { id: 'b', text: '문제의 정답을 숨기기 위해' },
      { id: 'c', text: 'PDF 용량을 줄이기 위해' },
      { id: 'd', text: 'React Hooks 사용을 막기 위해' },
    ],
    correct_option_id: 'a',
    explanation: 'API 설정을 한 곳에 모으면 개발/운영 환경에 따라 주소를 쉽게 교체할 수 있습니다.',
  },
  {
    id: 'q11',
    question: 'React에서 간단한 퀴즈 앱 상태 관리에 적절한 방법은?',
    options: [
      { id: 'a', text: '반드시 Redux를 도입한다' },
      { id: 'b', text: 'React Hooks 기반의 로컬 상태를 사용한다' },
      { id: 'c', text: '상태를 DOM 속성에 직접 저장한다' },
      { id: 'd', text: '모든 상태를 URL 쿼리에만 저장한다' },
    ],
    correct_option_id: 'b',
    explanation: '규모가 작은 MVP에서는 useState 같은 React Hooks만으로 충분하며 불필요한 상태관리 복잡도를 줄일 수 있습니다.',
  },
  {
    id: 'q12',
    question: 'PDF 파일 선택 영역에서 파일 형식 검증을 하는 이유로 가장 적절한 것은?',
    options: [
      { id: 'a', text: '지원하지 않는 파일이 백엔드로 전달되는 것을 줄이기 위해' },
      { id: 'b', text: '정답 위치를 무작위로 만들기 위해' },
      { id: 'c', text: '문제 개수를 자동으로 늘리기 위해' },
      { id: 'd', text: '브라우저 테마를 변경하기 위해' },
    ],
    correct_option_id: 'a',
    explanation: '프론트에서 1차 검증하면 잘못된 파일 업로드를 빠르게 안내할 수 있습니다.',
  },
  {
    id: 'q13',
    question: '결과 화면의 “오답만 보기” 기능이 제공하는 학습상 장점은?',
    options: [
      { id: 'a', text: '정답 문제를 자동 삭제한다' },
      { id: 'b', text: '복습이 필요한 문제에 빠르게 집중할 수 있다' },
      { id: 'c', text: '점수를 항상 100점으로 바꾼다' },
      { id: 'd', text: 'PDF 파일을 다시 업로드하지 않아도 서버를 종료한다' },
    ],
    correct_option_id: 'b',
    explanation: '오답만 필터링하면 틀린 개념과 해설을 빠르게 다시 확인할 수 있습니다.',
  },
  {
    id: 'q14',
    question: '같은 문제 다시 풀기 기능에서 초기화해야 하는 값은?',
    options: [
      { id: 'a', text: 'Quiz 데이터 자체' },
      { id: 'b', text: '업로드한 PDF의 파일명만' },
      { id: 'c', text: '사용자의 답안과 현재 문제 위치' },
      { id: 'd', text: '백엔드 API URL' },
    ],
    correct_option_id: 'c',
    explanation: '문제 데이터는 그대로 유지하고 사용자의 선택 답안과 진행 위치만 초기화하면 같은 퀴즈를 다시 풀 수 있습니다.',
  },
  {
    id: 'q15',
    question: 'API 오류가 발생했을 때 권장되는 처리 방식은?',
    options: [
      { id: 'a', text: 'alert만 반복해서 표시한다' },
      { id: 'b', text: '오류를 숨기고 무한 로딩한다' },
      { id: 'c', text: '페이지 내부에 오류 메시지와 다시 시도 버튼을 제공한다' },
      { id: 'd', text: '사용자의 모든 답안을 즉시 제출한다' },
    ],
    correct_option_id: 'c',
    explanation: '인라인 오류 UI와 재시도 동작은 상황을 명확하게 전달하고 복구 경로를 제공합니다.',
  },
  {
    id: 'q16',
    question: '문제 선택 직후 정답을 공개하지 않는 이유는?',
    options: [
      { id: 'a', text: '다음 문제의 선택에 정답 정보가 영향을 주지 않도록 하기 위해' },
      { id: 'b', text: 'PDF 파일을 작게 만들기 위해' },
      { id: 'c', text: 'API 요청을 GET으로 바꾸기 위해' },
      { id: 'd', text: 'React 렌더링을 중단하기 위해' },
    ],
    correct_option_id: 'a',
    explanation: '제출 전에는 채점 정보를 감춰야 실제 문제 풀이 흐름을 유지할 수 있습니다.',
  },
  {
    id: 'q17',
    question: 'QuizQuestion의 correct_option_id 값을 문자열 ID로 두었을 때의 장점은?',
    options: [
      { id: 'a', text: '보기 텍스트가 바뀌어도 정답 비교 로직이 단순하다' },
      { id: 'b', text: '모든 문제의 정답이 동일해진다' },
      { id: 'c', text: 'PDF가 자동으로 압축된다' },
      { id: 'd', text: '백엔드가 필요 없어지는 효과가 있다' },
    ],
    correct_option_id: 'a',
    explanation: 'a/b/c/d 같은 고정 ID를 비교하면 긴 선택지 텍스트를 직접 비교하는 것보다 안정적입니다.',
  },
  {
    id: 'q18',
    question: '반응형 UI를 구현하는 목적은?',
    options: [
      { id: 'a', text: '화면 크기가 달라도 주요 기능을 편하게 사용할 수 있게 하기 위해' },
      { id: 'b', text: '백엔드의 Ollama 모델을 변경하기 위해' },
      { id: 'c', text: '문제 정답을 암호화하기 위해' },
      { id: 'd', text: 'PDF를 데이터베이스에 저장하기 위해' },
    ],
    correct_option_id: 'a',
    explanation: 'PC 우선 서비스라도 모바일과 작은 화면에서 레이아웃이 무너지지 않도록 반응형 처리가 필요합니다.',
  },
  {
    id: 'q19',
    question: '퀴즈 생성 버튼을 PDF 선택 전 비활성화하는 이유는?',
    options: [
      { id: 'a', text: '필수 입력 없이 잘못된 API 요청이 발생하는 것을 막기 위해' },
      { id: 'b', text: '항상 보통 난이도로 만들기 위해' },
      { id: 'c', text: '사용자의 점수를 숨기기 위해' },
      { id: 'd', text: '브라우저 캐시를 초기화하기 위해' },
    ],
    correct_option_id: 'a',
    explanation: '필수 파일이 없을 때 버튼을 비활성화하면 잘못된 요청을 사전에 방지할 수 있습니다.',
  },
  {
    id: 'q20',
    question: 'Mock/실 API 전환 설정을 두는 가장 큰 이유는?',
    options: [
      { id: 'a', text: '백엔드 개발 상태와 관계없이 동일한 UI 코드를 테스트하기 위해' },
      { id: 'b', text: '모든 API 오류를 무시하기 위해' },
      { id: 'c', text: '정답을 자동 변경하기 위해' },
      { id: 'd', text: 'CSS를 제거하기 위해' },
    ],
    correct_option_id: 'a',
    explanation: '설정값 하나로 데이터 소스만 바꾸면 UI 로직을 유지한 채 독립 개발과 실제 연동을 모두 지원할 수 있습니다.',
  },
];

export function createMockQuiz(numQuestions: number, difficulty: Difficulty): Quiz {
  const count = Math.min(Math.max(numQuestions, 1), questions.length);
  return {
    title: `AI 수업자료 퀴즈 · ${difficulty}`,
    questions: questions.slice(0, count).map((question, index) => ({
      ...question,
      id: `q${index + 1}`,
    })),
  };
}
