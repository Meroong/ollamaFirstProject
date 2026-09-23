import type { QuizQuestion } from '../types/quiz';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

export default function QuizQuestionCard({
  question,
  questionNumber,
  selectedOptionId,
  onSelect,
}: QuizQuestionCardProps) {
  return (
    <section className="question-card">
      <div className="question-kicker">문제 {questionNumber}</div>
      <h2>{question.question}</h2>

      <div className="option-list" role="radiogroup" aria-label={`${questionNumber}번 문제 선택지`}>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              className={`option-card ${selected ? 'selected' : ''}`}
              key={option.id}
              onClick={() => onSelect(option.id)}
            >
              <span className="option-letter">{option.id.toUpperCase()}</span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
