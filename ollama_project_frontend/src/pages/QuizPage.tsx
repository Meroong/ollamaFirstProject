import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import ConfirmModal from '../components/ConfirmModal';
import ProgressBar from '../components/ProgressBar';
import QuizQuestionCard from '../components/QuizQuestionCard';
import type { Quiz, QuizAnswers } from '../types/quiz';

interface QuizPageProps {
  quiz: Quiz;
  currentIndex: number;
  answers: QuizAnswers;
  showSubmitConfirm: boolean;
  onAnswer: (questionId: string, optionId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onConfirmSubmit: () => void;
  onCancelSubmit: () => void;
}

export default function QuizPage({
  quiz,
  currentIndex,
  answers,
  showSubmitConfirm,
  onAnswer,
  onPrevious,
  onNext,
  onSubmit,
  onConfirmSubmit,
  onCancelSubmit,
}: QuizPageProps) {
  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = total - answeredCount;
  const isLast = currentIndex === total - 1;

  return (
    <main className="page-shell quiz-page">
      <div className="quiz-topbar">
        <AppHeader compact />
        <span className="quiz-status">답변 {answeredCount}/{total}</span>
      </div>

      <section className="quiz-main-card">
        <div className="quiz-title-row">
          <div>
            <span>퀴즈</span>
            <h1>{quiz.title}</h1>
          </div>
          <strong>{currentIndex + 1} / {total}</strong>
        </div>

        <ProgressBar current={currentIndex + 1} total={total} />

        <QuizQuestionCard
          question={question}
          questionNumber={currentIndex + 1}
          selectedOptionId={answers[question.id]}
          onSelect={(optionId) => onAnswer(question.id, optionId)}
        />

        <div className="quiz-navigation">
          <button type="button" className="secondary-button" disabled={currentIndex === 0} onClick={onPrevious}>
            <ArrowLeft size={17} /> 이전
          </button>

          {isLast ? (
            <button type="button" className="primary-button" onClick={onSubmit}>
              제출하기 <Send size={16} />
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={onNext}>
              다음 <ArrowRight size={17} />
            </button>
          )}
        </div>
      </section>

      {showSubmitConfirm && (
        <ConfirmModal
          unansweredCount={unansweredCount}
          onCancel={onCancelSubmit}
          onConfirm={onConfirmSubmit}
        />
      )}
    </main>
  );
}
