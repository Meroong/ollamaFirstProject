export default function LoadingScreen() {
  return (
    <main className="page-shell centered-shell">
      <section className="loading-card">
        <div className="spinner" aria-hidden="true" />
        <h2>Ollama가 문제를 생성하고 있습니다.</h2>
        <p>PDF 내용을 분석해 퀴즈와 해설을 만드는 중입니다.</p>
      </section>
    </main>
  );
}
