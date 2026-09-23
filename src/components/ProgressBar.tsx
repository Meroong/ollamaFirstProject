interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="progress-track" aria-label={`진행률 ${percent}%`}>
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
