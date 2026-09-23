import { CheckCircle2, ChevronDown, ChevronUp, CircleX } from 'lucide-react';
import { useState } from 'react';
import type { QuizQuestion } from '../types/quiz';

interface QuizResultCardProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedOptionId?: string;
}

export default function QuizResultCard({
  question,
  questionNumber,
  selectedOptionId,
}: QuizResultCardProps) {
  const [expanded, setExpanded] = useState(true);
  const isCorrect = selectedOptionId === question.correct_option_id;
  const selectedText = question.options.find((option) => option.id === selectedOptionId)?.text;
  const correctText = question.options.find((option) => option.id === question.correct_option_id)?.text ?? '-';

  return (
    <article className={`result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
      <button type="button" className="result-card-header" onClick={() => setExpanded((value) => !value)}>
        <div className="result-heading-main">
          {isCorrect ? <CheckCircle2 className="status-icon correct-icon" /> : <CircleX className="status-icon incorrect-icon" />}
          <div>
            <span className="result-question-number">Q{questionNumber}</span>
            <strong>{question.question}</strong>
          </div>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="result-card-body">
          <div className="answer-comparison">
            <div>
              <span>내 답</span>
              <strong className={!selectedOptionId || !isCorrect ? 'incorrect-text' : ''}>
                {selectedOptionId ? `${selectedOptionId.toUpperCase()}. ${selectedText}` : '미응답'}
              </strong>
            </div>
            <div>
              <span>정답</span>
              <strong className="correct-text">{question.correct_option_id.toUpperCase()}. {correctText}</strong>
            </div>
          </div>
          <div className="explanation-box">
            <span>해설</span>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
    </article>
  );
}
