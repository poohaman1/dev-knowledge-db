# 작업 명세서 (task.md)

## 개요
1. 지식 콘텐츠 그룹 메뉴 아래에 "Agentic OS" 메뉴 항목을 추가하고 관련 가이드 문서를 작성합니다.
2. 최신 LLM 라인업 동향에 맞춰 OpenAI의 **GPT-5.6** 및 Google DeepMind의 **Gemini 3.6 Flash** 관련 상세 문서를 작성하고, LLM 가이드(`docs/llm/index.md`) 및 기존 모델 문서를 최신 정보로 업데이트합니다.
3. **사이트 접속 첫 화면(`index.md`)**에 Agentic OS 신규 가이드라인 및 최신 LLM 플래그십(GPT-5.6, Gemini 3.6 Flash) 업데이트 사항을 반영합니다.

## 요구사항
1. `.vitepress/config.mts` 내 `sidebar` 지식 콘텐츠 그룹 항목에 "Agentic OS" (`/docs/knowledge-info/agentic-os`) 추가.
2. `docs/knowledge-info/agentic-os.md` 가이드 문서 작성.
3. `docs/llm/gpt-5-6.md` 및 `docs/llm/gemini-3-6-flash.md` 신규 상세 문서 작성.
4. `docs/llm/gemini-3-5-flash.md` 및 `docs/llm/index.md` 최신 모델 라인업 정보 반영.
5. 루트 `index.md` 메인 페이지의 `features`, `hero banner`, `trend-section`, `quick-hub`, `info-card` 영역 텍스트를 최신 버전에 맞게 수정.
6. VitePress 빌드 검증 수행 (`npm run docs:build`).

## 체크리스트
- [x] `.vitepress/config.mts` 지식 콘텐츠 메뉴 사이드바 항목 추가
- [x] `docs/knowledge-info/agentic-os.md` 가이드 문서 작성
- [x] `docs/llm/gpt-5-6.md` 및 `docs/llm/gemini-3-6-flash.md` 신규 모델 문서 작성 및 심층 분석 수록
- [x] `docs/llm/gemini-3-5-flash.md` 및 `docs/llm/index.md` 최신 라인업 및 상위 모델 반영
- [x] `index.md` 메인 화면 LLM 버전 및 Agentic OS 추가 반영 완료
- [x] VitePress 빌드 검증 (`npm run docs:build`) 완료




