import { useRef, useState, type DragEvent } from 'react';
import { FileText, Trash2, UploadCloud } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function isPdf(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

export default function FileUpload({ file, onFileChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectFile = (nextFile?: File) => {
    if (!nextFile) return;
    if (!isPdf(nextFile)) {
      setError('PDF 파일만 업로드할 수 있습니다.');
      return;
    }

    setError(null);
    onFileChange(nextFile);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const removeFile = () => {
    onFileChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="upload-block">
      {!file ? (
        <div
          className={`upload-zone ${dragging ? 'is-dragging' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="upload-icon-wrap">
            <UploadCloud size={28} />
          </div>
          <strong>PDF 파일을 업로드하세요</strong>
          <p>파일을 끌어놓거나 클릭하여 선택</p>
          <span>PDF 파일만 지원</span>
        </div>
      ) : (
        <div className="selected-file-card">
          <div className="file-icon-wrap">
            <FileText size={24} />
          </div>
          <div className="file-meta">
            <strong>{file.name}</strong>
            <span>{formatBytes(file.size)} · PDF</span>
          </div>
          <button type="button" className="icon-button danger" onClick={removeFile} aria-label="파일 삭제">
            <Trash2 size={19} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="application/pdf,.pdf"
        onChange={(event) => selectFile(event.target.files?.[0])}
      />

      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
