export type Difficulty = '쉬움' | '보통' | '어려움';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correct_option_id: string;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export type QuizAnswers = Record<string, string>;
export type ResultFilter = 'all' | 'correct' | 'incorrect';
