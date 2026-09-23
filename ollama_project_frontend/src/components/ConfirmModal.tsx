import { AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  unansweredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ unansweredCount, onCancel, onConfirm }: ConfirmModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="modal-icon-wrap">
          <AlertCircle size={25} />
        </div>
        <h3 id="confirm-title">아직 답하지 않은 문제가 있어요</h3>
        <p>{unansweredCount}개 문제에 답하지 않았습니다. 그래도 제출하시겠습니까?</p>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>계속 풀기</button>
          <button type="button" className="primary-button danger-primary" onClick={onConfirm}>그대로 제출</button>
        </div>
      </div>
    </div>
  );
}
