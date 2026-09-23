# Ollama Study Frontend

수업 PDF를 업로드하면 백엔드가 PDF 텍스트를 추출하고 **Ollama 로컬 LLM**에 문제 생성을 요청한다고 가정한 React + TypeScript + Vite 프론트엔드입니다.

프론트는 Ollama를 직접 호출하지 않으며, PDF 업로드와 설정값을 백엔드에 전달하고 반환된 Quiz JSON을 화면에 표시합니다.

## 실행

```bash
npm install
npm run dev
```

기본 설정은 데모(Mock) 모드입니다. 백엔드 없이도 PDF 선택 → Ollama 생성 화면 → 문제 풀이 → 채점 → 해설 확인까지 전체 시연이 가능합니다.

## 실제 Ollama 백엔드 연결

`.env.example`을 `.env`로 복사한 뒤 다음과 같이 변경합니다.

```env
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8000
```

프론트 요청:

```http
POST /api/quiz/generate/pdf
Content-Type: multipart/form-data
```

FormData:

- `file`: PDF 파일
- `num_questions`: 5 / 10 / 15 / 20
- `difficulty`: 쉬움 / 보통 / 어려움

백엔드 처리 흐름은 다음을 전제로 합니다.

```text
Frontend PDF Upload
        ↓
Backend PDF Text Extraction
        ↓
Ollama Local LLM
        ↓
Quiz JSON
        ↓
Frontend Quiz / Result UI
```

## 기대 응답

```json
{
  "title": "인공지능 5주차 퀴즈",
  "questions": [
    {
      "id": "q1",
      "question": "Ollama는 무엇을 하는 프로그램인가?",
      "options": [
        { "id": "a", "text": "이미지 편집 툴" },
        { "id": "b", "text": "로컬에서 LLM을 실행하는 프레임워크" },
        { "id": "c", "text": "웹 브라우저" },
        { "id": "d", "text": "데이터베이스" }
      ],
      "correct_option_id": "b",
      "explanation": "Ollama는 로컬 환경에서 LLM을 실행할 수 있도록 도와주는 도구입니다."
    }
  ]
}
```

## 구현 기능

- 로컬 실행에 맞춘 단순한 흑백 UI
- PDF 클릭 / 드래그앤드롭 업로드
- PDF 파일 검증 / 파일명 / 용량 / 삭제
- 문제 수 5 / 10 / 15 / 20
- 난이도 쉬움 / 보통 / 어려움
- Mock ↔ 실제 API 환경변수 전환
- Ollama 문제 생성 로딩 화면
- 한 문제씩 풀이 / 이전 / 다음
- 선택 답안 유지
- 미응답 제출 확인
- 프론트 자동 채점
- 점수 / 정답률 / 문제별 해설
- 전체 / 정답 / 오답 필터
- 같은 문제 다시 풀기
- 새 퀴즈 만들기
- API 오류 UI
- 반응형 UI

> `Ollama Study`는 수업 프로젝트용 서비스 이름이며 Ollama 공식 서비스라는 의미는 아닙니다.
