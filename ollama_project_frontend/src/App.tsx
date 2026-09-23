import { useState } from 'react';
import { generateQuiz } from './api/quizApi';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import type { Difficulty, Quiz, QuizAnswers } from './types/quiz';

type AppView = 'home' | 'loading' | 'quiz' | 'result';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [file, setFile] = useState<File | null>(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty>('보통');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const handleGenerate = async () => {
    if (!file) return;

    setError(null);
    setView('loading');

    try {
      const generatedQuiz = await generateQuiz({ file, numQuestions, difficulty });
      if (generatedQuiz.questions.length === 0) {
        throw new Error('생성된 문제가 없습니다. 다른 PDF로 다시 시도해주세요.');
      }
      setQuiz(generatedQuiz);
      setAnswers({});
      setCurrentIndex(0);
      setView('quiz');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : '알 수 없는 오류가 발생했습니다.');
      setView('home');
    }
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  };

  const submitQuiz = () => {
    setShowSubmitConfirm(false);
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!quiz) return;
    const unansweredCount = quiz.questions.filter((question) => !answers[question.id]).length;
    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
      return;
    }
    submitQuiz();
  };

  const handleRetrySameQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setFile(null);
    setQuiz(null);
    setAnswers({});
    setCurrentIndex(0);
    setNumQuestions(5);
    setDifficulty('보통');
    setError(null);
    setShowSubmitConfirm(false);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'loading') return <LoadingScreen />;

  if (view === 'quiz' && quiz) {
    return (
      <QuizPage
        quiz={quiz}
        currentIndex={currentIndex}
        answers={answers}
        showSubmitConfirm={showSubmitConfirm}
        onAnswer={handleAnswer}
        onPrevious={() => setCurrentIndex((index) => Math.max(0, index - 1))}
        onNext={() => setCurrentIndex((index) => Math.min(quiz.questions.length - 1, index + 1))}
        onSubmit={handleSubmit}
        onConfirmSubmit={submitQuiz}
        onCancelSubmit={() => setShowSubmitConfirm(false)}
      />
    );
  }

  if (view === 'result' && quiz) {
    return (
      <ResultPage
        quiz={quiz}
        answers={answers}
        onRestart={handleRestart}
        onRetrySameQuiz={handleRetrySameQuiz}
      />
    );
  }

  return (
    <HomePage
      file={file}
      numQuestions={numQuestions}
      difficulty={difficulty}
      error={error}
      onFileChange={setFile}
      onNumQuestionsChange={setNumQuestions}
      onDifficultyChange={setDifficulty}
      onGenerate={handleGenerate}
    />
  );
}
