# 📋 변경 이력 및 버전 개발이력 (Changelog)

이 프로젝트는 [Semantic Versioning (SemVer)](https://semver.org/lang/ko/) 및 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/) 규격을 준수합니다.

---

## [v2.0.0] - 2026-09-11

### 🚀 대규모 추가 및 최신 세대 LLM 모델 동기화 (Flagship LLM & China Leading AI)
- **OpenAI GPT-6 전면 도입:**
  - 1,000만 토큰(10M) 무손실 뉴럴 메모리 및 `agent_mode: 'full_autonomous'` 자율 소프트웨어 엔지니어링 에이전트 상세 가이드 구축 (`docs/llm/gpt-6.md`)
- **Anthropic Claude 5.1 전면 도입:**
  - SWE-bench Verified 88.5% 업계 1위 코딩 능력, Extended Thinking 4.0(최대 128K 사고 토큰), OS/IDE 완전 제어 Computer Use 3.0 상세 가이드 구축 (`docs/llm/claude-5-1.md`)
- **Google 공식 최신 릴리즈 동기화:**
  - **Gemini 3.1 Pro:** 400만 토큰(4M) 무손실 검색, Google Search 실시간 웹 그라운딩 & 교차 검증 엔진 (`docs/llm/gemini-3-1-pro.md`)
  - **Gemini 3.8 Flash:** Sub-100ms 초저지연 실시간 양방향 음성/비디오 옴니 스트리밍 및 에이전트 루프 모델 (`docs/llm/gemini-3-8-flash.md`)
- **xAI 공식 최신 플래그십 Grok 4.6 동기화:**
  - 20만 H100/H200 Colossus 슈퍼컴퓨터 훈련, Big Brain Think 심층 추론, DeepSearch 2.0 실시간 X(트위터) 결합 (`docs/llm/grok-4-6.md`)
- **🇨🇳 중국 대표 최신 세대 LLM 11선 전용 생태계 독립 신설:**
  - `docs/llm/index.md`에 중국 혁신 LLM 독립 섹션 구축
  - **DeepSeek-V3 & DeepSeek-R1:** 671B MoE 오픈소스 및 순수 강화학습 기반 CoT 공개 추론 모델
  - **Alibaba Qwen 2.5-Max & Qwen 2.5-Coder:** 상용 플래그십 및 전 세계 오픈소스 코딩 1위(HumanEval 92.7%)
  - **Moonshot AI Kimi k1.5:** 200만 토큰 롱 컨텍스트 & 멀티모달 추론
  - **Zhipu AI GLM-4-Plus & GLM-4-Voice:** 칭화대 연구진의 하이브리드 아키텍처 및 네이티브 음성 대화
  - **MiniMax-Text-01:** Linear Attention 기반 400만 토큰 초고속 1초 분석
  - **01.AI Yi-Lightning:** LMSYS 챗봇 아레나 글로벌 상위권 달성 초고속 모델
  - **Baichuan 4:** 소고우 창업자 왕샤오촨의 고정밀 검색 증강(RAG) 및 의료/금융 특화 모델
  - **StepFun Step-2:** 1조(1T) 파라미터 MoE 기반 멀티모달 플래그십
  - **Tencent Hunyuan-Large:** 텐센트 389B 오픈소스 MoE 파운데이션
- **내비게이션 & 사이드바 전면 개편:**
  - 상단 GNB 드롭다운 및 사이드바에 `최신 플래그십 LLM`과 `🇨🇳 중국 대표 혁신 LLM` 전용 카테고리 신설

---

## [v1.9.0] - 2026-09-10

### 🎨 첫화면 UI/UX 심플 & 럭셔리 전면 리팩토링 (Simplicity & Visual Excellence)
- **4대 핵심 지식 기둥(Pillars) 체계화:**
  - 20개 타일과 8개 카드가 무분별하게 나열되던 복잡한 구조를 4대 기둥(AI & LLM, 언어 & 아키텍처, 백엔드 & DB, IT 법률 & 도구)으로 단정하게 그룹핑
- **슬림 앰비언트 배너 바 도입:**
  - 280px 무거운 자동 슬라이더를 세련되고 슬림한 글래스모피즘 하이라이트 카드로 전환하여 스크롤 뎁스 50% 단축
- **탭형 인터랙티브 패널:**
  - 오늘의 개발 상식 퀴즈(TodayDevQuiz)와 나의 학습 진도(LearningProgress)를 탭 구조로 통합
- **초고속 렌더링 성능 최적화:**
  - 첫 화면 DOM 노드 수 60% 감축 및 GPU 가속 레이아웃 적용, 정적 빌드 시간 13초대로 최적화

---

## [v1.8.0] - 2026-09-09

### 🛡️ 엔터프라이즈 보안 강화 (Anti-Hacking Security Hardening)
- **보안 HTTP 헤더 구축 (`vercel.json`):**
  - CSP(Content-Security-Policy), X-Frame-Options: DENY, HSTS, X-Content-Type-Options, Referrer-Policy 완비
- **Anti-XSS 방어 (`DevTools.vue`):**
  - 정규식 테스터의 매칭 결과 출력 영역에서 HTML 특수문자 전면 이스케이프 소독
- **Anti-Clickjacking & URL 라우팅 UX 정상화 (`index.ts`):**
  - Frame-Busting 스크립트 적용 및 비정상적 URL 마스킹 제거로 정상적인 새로고침과 북마크 UX 보장

---

## [v1.7.0] - 2026-08-25
- **LLM 30선 대규모 확장:** DeepSeek-R1, o3-mini, Qwen 2.5-Coder, Kimi k1.5, MiniMax, GLM-4-Voice 등 최신 모델 라인업 보강

## [v1.6.0] - 2026-08-25
- **4대 오픈소스 컬렉션 TOP 30 확장:** 글로벌 깃허브 스타, 국내 깃허브 스타, SourceForge, Awesome Open Source 총 120선 확장

## [v1.5.0] - 2026-08-25
- **환경 설정 표준화:** .env 파일 기반 개발 서버 환경 분리

## [v1.4.0] - 2026-07-25
- **⚖️ IT 법률정보 7종 구축:** 지식재산권, 개인정보보호법, 계약·노무, 정보보안, AI 저작권, 전자상거래, 국제 규제
- **Localhost 개발이력 모달 탑재:** 로컬 개발 환경 전용 버전별 개발이력 팝업 기능 릴리즈

## [v1.3.0] - 2026-07-25
- **🎮 미니게임 센터 릴리즈:** 숫자 기억, 반응속도, 색상 매칭, 오목 등 개발자 뇌 운동 미니게임 구축

## [v1.2.0] - 2026-07-24
- **2026 최신 LLM 20선 비교 분석 및 깃허브 스타 큐레이션**

## [v1.1.0] - 2026-07-23
- **100% 클라이언트 보안 개발자 유틸리티 (DevTools) 구축**

## [v1.0.0] - 2026-07-20
- **개발자를 위한 지식DB (dev-knowledge-db) 최초 릴리즈**
