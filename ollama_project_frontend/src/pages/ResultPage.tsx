import { RefreshCcw, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import QuizResultCard from '../components/QuizResultCard';
import type { Quiz, QuizAnswers, ResultFilter } from '../types/quiz';

interface ResultPageProps {
  quiz: Quiz;
  answers: QuizAnswers;
  onRestart: () => void;
  onRetrySameQuiz: () => void;
}

export default function ResultPage({ quiz, answers, onRestart, onRetrySameQuiz }: ResultPageProps) {
  const [filter, setFilter] = useState<ResultFilter>('all');

  const correctCount = quiz.questions.filter(
    (question) => answers[question.id] === question.correct_option_id,
  ).length;
  const total = quiz.questions.length;
  const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  const feedback =
    score >= 90
      ? '수업 내용을 잘 이해하고 있습니다.'
      : score >= 70
        ? '틀린 문제를 확인해 몇 가지 개념을 복습해보세요.'
        : '해설을 확인하면서 다시 복습해보세요.';

  const filteredQuestions = useMemo(() => {
    return quiz.questions.filter((question) => {
      const isCorrect = answers[question.id] === question.correct_option_id;
      if (filter === 'correct') return isCorrect;
      if (filter === 'incorrect') return !isCorrect;
      return true;
    });
  }, [answers, filter, quiz.questions]);

  return (
    <main className="page-shell result-page">
      <AppHeader compact />

      <section className="score-card">
        <span className="result-label">결과</span>
        <h1>{score}점</h1>
        <p>{correctCount} / {total}문제 정답 · {feedback}</p>
      </section>

      <section className="review-section">
        <div className="review-header">
          <div>
            <h2>문제별 결과</h2>
            <p>정답과 해설을 확인할 수 있습니다.</p>
          </div>
          <div className="result-filter">
            <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>전체</button>
            <button type="button" className={filter === 'correct' ? 'active' : ''} onClick={() => setFilter('correct')}>정답</button>
            <button type="button" className={filter === 'incorrect' ? 'active' : ''} onClick={() => setFilter('incorrect')}>오답</button>
          </div>
        </div>

        <div className="result-list">
          {filteredQuestions.map((question) => (
            <QuizResultCard
              key={question.id}
              question={question}
              questionNumber={quiz.questions.findIndex((item) => item.id === question.id) + 1}
              selectedOptionId={answers[question.id]}
            />
          ))}
          {filteredQuestions.length === 0 && (
            <div className="empty-result">해당 조건에 맞는 문제가 없습니다.</div>
          )}
        </div>
      </section>

      <div className="result-actions">
        <button type="button" className="secondary-button" onClick={onRetrySameQuiz}>
          <RotateCcw size={17} /> 같은 문제 다시 풀기
        </button>
        <button type="button" className="primary-button" onClick={onRestart}>
          <RefreshCcw size={17} /> 새로운 퀴즈 만들기
        </button>
      </div>
    </main>
  );
}
