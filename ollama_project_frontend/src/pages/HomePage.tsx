import { ArrowRight } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import FileUpload from '../components/FileUpload';
import QuizSettings from '../components/QuizSettings';
import type { Difficulty } from '../types/quiz';

interface HomePageProps {
  file: File | null;
  numQuestions: number;
  difficulty: Difficulty;
  error: string | null;
  onFileChange: (file: File | null) => void;
  onNumQuestionsChange: (value: number) => void;
  onDifficultyChange: (value: Difficulty) => void;
  onGenerate: () => void;
}

export default function HomePage({
  file,
  numQuestions,
  difficulty,
  error,
  onFileChange,
  onNumQuestionsChange,
  onDifficultyChange,
  onGenerate,
}: HomePageProps) {
  return (
    <main className="page-shell home-page">
      <AppHeader />

      <section className="hero-section">
        <h1>수업 PDF로 퀴즈 만들기</h1>
        <p>PDF 파일을 업로드하면 Ollama가 내용을 바탕으로 객관식 문제를 생성합니다.</p>
      </section>

      <section className="setup-card">
        <div className="form-section">
          <h2>PDF 파일</h2>
          <FileUpload file={file} onFileChange={onFileChange} />
        </div>

        <div className="section-divider" />

        <div className="form-section">
          <h2>문제 설정</h2>
          <QuizSettings
            numQuestions={numQuestions}
            difficulty={difficulty}
            onNumQuestionsChange={onNumQuestionsChange}
            onDifficultyChange={onDifficultyChange}
          />
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <strong>문제 생성에 실패했습니다.</strong>
            <span>{error}</span>
          </div>
        )}

        <button type="button" className="generate-button" disabled={!file} onClick={onGenerate}>
          문제 생성하기
          <ArrowRight size={17} />
        </button>
      </section>

      <p className="local-note">Ollama · Local AI</p>
    </main>
  );
}
