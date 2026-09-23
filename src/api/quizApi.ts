import { createMockQuiz } from '../data/mockQuiz';
import type { Difficulty, Quiz } from '../types/quiz';

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const GENERATE_ENDPOINT = '/api/quiz/generate/pdf';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GenerateQuizParams {
  file: File;
  numQuestions: number;
  difficulty: Difficulty;
}

function isQuiz(value: unknown): value is Quiz {
  if (!value || typeof value !== 'object') return false;
  const quiz = value as Quiz;

  return (
    typeof quiz.title === 'string' &&
    Array.isArray(quiz.questions) &&
    quiz.questions.every(
      (question) =>
        typeof question.id === 'string' &&
        typeof question.question === 'string' &&
        Array.isArray(question.options) &&
        question.options.length === 4 &&
        question.options.every(
          (option) => typeof option.id === 'string' && typeof option.text === 'string',
        ) &&
        typeof question.correct_option_id === 'string' &&
        typeof question.explanation === 'string',
    )
  );
}

export async function generateQuiz({
  file,
  numQuestions,
  difficulty,
}: GenerateQuizParams): Promise<Quiz> {
  if (USE_MOCK) {
    await sleep(1200);
    return createMockQuiz(numQuestions, difficulty);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_questions', String(numQuestions));
  formData.append('difficulty', difficulty);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${GENERATE_ENDPOINT}`, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error('서버와 연결할 수 없습니다. 백엔드 실행 상태와 API 주소를 확인해주세요.');
  }

  if (!response.ok) {
    let message = '문제 생성에 실패했습니다.';
    try {
      const errorBody = (await response.json()) as { detail?: string; message?: string };
      message = errorBody.detail ?? errorBody.message ?? message;
    } catch {
      // 서버가 JSON 오류 본문을 반환하지 않는 경우 기본 메시지 사용
    }
    throw new Error(message);
  }

  const data: unknown = await response.json();
  if (!isQuiz(data)) {
    throw new Error('서버 응답 형식이 올바르지 않습니다. Quiz JSON 구조를 확인해주세요.');
  }

  return data;
}

export const quizApiConfig = {
  useMock: USE_MOCK,
  endpoint: `${API_BASE_URL}${GENERATE_ENDPOINT}`,
};
