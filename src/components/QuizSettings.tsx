import type { Difficulty } from '../types/quiz';

interface QuizSettingsProps {
  numQuestions: number;
  difficulty: Difficulty;
  onNumQuestionsChange: (value: number) => void;
  onDifficultyChange: (value: Difficulty) => void;
}

const questionOptions = [5, 10, 15, 20];
const difficultyOptions: Difficulty[] = ['쉬움', '보통', '어려움'];

export default function QuizSettings({
  numQuestions,
  difficulty,
  onNumQuestionsChange,
  onDifficultyChange,
}: QuizSettingsProps) {
  return (
    <div className="settings-grid">
      <div className="setting-group">
        <div className="setting-title-row">
          <span className="setting-label">문제 개수</span>
          <span className="setting-helper">원하는 문제 수를 선택하세요</span>
        </div>
        <div className="segmented-control four-columns">
          {questionOptions.map((value) => (
            <button
              key={value}
              type="button"
              className={numQuestions === value ? 'active' : ''}
              onClick={() => onNumQuestionsChange(value)}
            >
              {value}문제
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <div className="setting-title-row">
          <span className="setting-label">난이도</span>
          <span className="setting-helper">문제의 복잡도를 조절하세요</span>
        </div>
        <div className="segmented-control">
          {difficultyOptions.map((value) => (
            <button
              key={value}
              type="button"
              className={difficulty === value ? 'active' : ''}
              onClick={() => onDifficultyChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
