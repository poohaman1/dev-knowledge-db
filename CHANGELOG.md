# 📋 변경 이력 및 버전 개발이력 (Changelog)

이 프로젝트는 [Semantic Versioning (SemVer)](https://semver.org/lang/ko/) 및 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/) 규격을 준수합니다.

---

## [v2.5.0] - 2026-10-17

### 🚀 2026년 10월 최신 플래그십 LLM & 개발 생태계 대규모 동기화
- **OpenAI GPT 6.1 Sol 전면 도입 (`docs/llm/gpt-6-1-sol.md`):**
  - 차세대 솔라리스(Solaris) 심층 추론 아키텍처, 8K 네이티브 비전/오디오 멀티모달, 400K 컨텍스트, GPT-6 상위 플래그십 가이드 구축
- **Anthropic Claude 5.5 패밀리 공식 릴리스 전면 동기화:**
  - 공식 문서([Release Notes](https://platform.claude.com/docs/ko/release-notes/overview)) 기반 동기화
  - **Claude Opus 5.5 (`docs/llm/claude-opus-5-5.md`):** 1M 컨텍스트, 128k 출력, 상시 적응형 사고(effort 파라미터), MTok당 $4/$20
  - **Claude Sonnet 5.5 (`docs/llm/claude-sonnet-5-5.md`):** 캐시 읽기 $0.10/MTok(50% 인하), 계정 보존 사고(Preserved Thinking), 최강 코딩/에이전트
  - **Claude Haiku 5.5 (`docs/llm/claude-haiku-5-5.md`):** 1M 컨텍스트 초고속 경량 플래그십
- **Google Gemini 4.0 플래그십 도입 (`docs/llm/gemini-4-0.md`, `docs/llm/gemini-4-pro.md`):**
  - 1,600만(16M) 인피니트 컨텍스트, Deep Think 3.0 동적 트리 추론, 전방위 자율 액션 에이전트 가이드 구축
- **국내외 개발자 사이트 & 개발 도구 대규모 확충:**
  - **국내 사이트 (`docs/domestic/`):** 네이버 클로바 스튜디오, 업스테이지 콘솔, 지피터스(GPters), AI Hub, 뤼튼 스튜디오, 쿠팡/무신사/당근 테크블로그 추가
  - **해외 사이트 (`docs/international/`):** Hugging Face Hub, LMSYS Chatbot Arena, OpenAI/Anthropic/Google AI Studio 콘솔, DeepSeek 오픈 플랫폼, Ollama, Vercel AI SDK 추가
  - **개발 도구 (`docs/tools/`):** Antigravity IDE, Roo Code, Lovable, Bun, uv, Biome, Bruno, Supabase, Neon 등 2026년 대세 스택 신설
  - **기업별 기술스택 (`docs/company-tech-stack.md`):** 토스(비바리퍼블리카), 쿠팡, 우아한형제들(배달의민족) 최신 마이크로서비스 및 AI 스택 추가
- **xAI Grok 4.7 최신 플래그십 공식 동기화 (`docs/llm/grok-4-7.md`):**
  - grok.com 공식 릴리스 노트 기반, Expert(Thinks hard) 및 Heavy(Team of Experts) 모드 기본 탑재, 네이티브 프레젠테이션/문서/스프레드시트 생성, xAI Skills 전면 지원
- **Alibaba Qwen 3.8 (2.4조 파라미터) 최신 동기화 (`docs/llm/qwen-3-8.md`):**
  - 2.4조 파라미터 초대형 프런티어 모델, Qwen3.8-Max-Preview, Token Plan, Qoder/QoderWork 에이전트 6~8개 동시 병렬 실행
- **Upstage Solar Pro 4 공식 플래그십 동기화 (`docs/llm/solar-pro-4.md`):**
  - "실무를 끝까지 해내는 에이전트", 512K 컨텍스트/128K 출력, Reasoning Effort 조절, OfficeVerse 기반 Excel/Word/PPT 생성, 엄격한 할루시네이션 방지(확인 불가 명시)
- **Moonshot AI Kimi K3 & Kimi Work v3.2.17 동기화 (`docs/llm/kimi-k3.md`):**
  - Kimi 차세대 플래그십 K3 및 Kimi Work 3.2.17, Agent Swarm 자율 군집 추론, Notion/Lark 양방향 실시간 사람-AI 공동 작성
- **보안 및 법률 지침 공식 제정 및 시스템 적용:**
  - **보안 지침 (`SECURITY.md`, `guidelines/SECURITY.md`):** 개인정보 DB 전달 전 AES-256-GCM 양방향 암호화, 비밀번호 Argon2/bcrypt 단방향 해싱 완전한 코드 수록, BFF 패턴 및 소스맵 차단(`sourcemap: false`)을 통한 역공학 방지, Supabase RLS `000_` 마이그레이션 규칙 확립
  - **법률 및 정책 (`LEGAL.md`, `guidelines/LEGAL.md`):** 개인정보보호법(PIPA) 준수(암호화 저장 의무, 5일 이내 파기, 마이데이터), AI 기본법 투명성 라벨링, 지식재산권 및 오픈소스 라이선스(Copyleft 오염 방지), 공정위 19개 다크패턴 방지, 면책 고지
  - **8대 핵심 관리 규칙 제정 (`.agents/AGENTS.md`, `guidelines/Agent.md`):** 한국어 응답, 안전성 우선 사전 승인, Planning 아티팩트, 교육용 친절한 설명, 코드 생략 금지, Step-by-Step, Supabase 쿼리 규칙, 강력 암호화
- **국내외 사이트, 도구 및 법률 가이드 전면 최신화:**
  - **국내 리소스 (`docs/domestic/index.md`):** 생성형 AI, 테크 블로그, 커뮤니티, 학습/코테, 필수 연동 API(결제/메시징/지도/금융/공공데이터) 6대 영역 대폭 확충
  - **해외 리소스 (`docs/international/index.md`):** 최신 플래그십 AI 플랫폼, 웹 표준 레퍼런스, 글로벌 커뮤니티, CS 학습, 엔지니어링 미디어 5대 영역 최신화
  - **유용한 도구 (`docs/tools/index.md`):** 차세대 AI 코딩 에이전트(Antigravity, Claude Code, Cursor, Windsurf, Cline, Trae 등), 초고속 런타임(Bun, uv), API 테스트(Bruno, Playwright), BaaS(Supabase, Neon, Turso), 터미널(Ghostty, Warp) 최신화
  - **문서 제목 및 헤딩 날짜 제거:** 모든 문서 제목에서 불필요한 날짜 표기를 제거하고 직관적인 정식 명칭으로 개편
- **홈 화면 & 네비게이션 동기화:**
  - GNB 드롭다운 및 사이드바에 GPT 6.1 Sol, Claude 5.5 라인업, Gemini 4.0, Grok 4.7, Qwen 3.8, Solar Pro 4, Kimi K3, SECURITY, LEGAL 문서 직관적 연계 반영

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
