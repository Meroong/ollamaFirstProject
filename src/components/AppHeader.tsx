interface AppHeaderProps {
  compact?: boolean;
}

export default function AppHeader({ compact = false }: AppHeaderProps) {
  return (
    <header className={`app-header ${compact ? 'compact' : ''}`}>
      <div>
        <strong>Ollama Study</strong>
        {!compact && <span>PDF Quiz Generator</span>}
      </div>
    </header>
  );
}
