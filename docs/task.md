# 작업 명세서 (task.md)

## 개요
2025~2026년 최신 AI 및 LLM 생태계의 비약적인 진화(Claude 3.7 Sonnet, GPT-4.5, Grok 3, DeepSeek-V3/R1, Gemini 2.0 시리즈, Claude Code 등)에 맞추어 지식DB 내 LLM 가이드, 개별 모델 상세 분석 문서, 개발자 도구(AI 코딩 도구), 프롬프트 지침 및 메인 홈 화면을 최신 공식 릴리즈 사양으로 전면 업데이트합니다.

## 요구사항 (추가 업데이트: 첫화면 UI/UX 및 보안 강화)
1. **첫화면 UI/UX 심플 & 럭셔리 최적화:**
   - 20개 아이콘 + 8개 카드 등 복잡하고 산만했던 첫화면을 4대 핵심 지식 기둥(`Pillars`)과 엄선된 트렌딩 4선(`Trending 4`), 탭형 인터랙티브 위젯으로 전면 리팩토링.
   - 번잡한 배너 슬라이더를 세련되고 슬림한 앰비언트 하이라이트 바로 개선.
   - Hero 액션 버튼을 가장 중요한 3대 핵심 액션으로 정돈.
2. **초고속 렌더링 성능 최적화:**
   - 첫 화면 DOM 노드 수를 60% 이상 감축하여 FCP, LCP 속도 비약적 향상.
   - 불필요한 자동 슬라이더 연산 오버헤드 제거 및 GPU 가속 레이아웃 적용.
3. **엔터프라이즈급 보안 강화 (Anti-Hacking):**
   - `vercel.json`에 CSP(Content-Security-Policy), X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy 엔터프라이즈 보안 헤더 적용.
   - `.vitepress/config.mts`의 HTML head에 보안 메타 태그 활성화.
   - `DevTools.vue`의 정규식 매칭 결과 출력 영역 XSS 취약점 완전 방어(HTML 특수문자 전면 이스케이프).
   - `.vitepress/theme/index.ts`에 악의적 iframe 클릭재킹 방어(Frame-Busting) 스크립트 적용 및 비정상적 URL 마스킹 버그 해소.

## 3. 최신 세대 LLM 모델 업데이트 (GPT-6, Claude 5.1 기준)
1. **차세대 플래그십 LLM 상세 분석 문서 신규 작성:**
   - OpenAI **GPT-6**: 1,000만 토큰 뉴럴 메모리 및 완전 자율 엔지니어링 에이전트 분석
   - Anthropic **Claude 5.1**: SWE-bench Verified 88.5% 코딩 1위, Extended Thinking 4.0 및 Computer Use 3.0
   - Google **Gemini 3.1 Pro & 3.8 Flash**: Google 최신 플래그십 400만 토큰 무손실 검색 & Sub-100ms 초저지연 실시간 옴니 멀티모달
   - xAI **Grok 4.6**: 20만 GPU Colossus 슈퍼컴퓨터 기반 최신 플래그십, Big Brain Think 및 DeepSearch 2.0
   - DeepSeek **DeepSeek-V4 & V3, R1**: 오픈소스 1위 MoE 및 완전 자율 심층 추론(CoT)
   - Meta **Llama 5.1**: 엔터프라이즈 프라이빗 온프레미스 표준
   - Naver **HyperCLOVA X 3**: 한국어 특화 파운데이션 3.0
   - Upstage **Solar 3**: DUS 3.0 아키텍처 및 Document AI
2. **중국 대표 최신 세대 LLM 진영 독립 전용 구축:**
   - 🇨🇳 Alibaba Qwen 2.5-Max & Qwen 2.5-Coder (글로벌 코딩 1위)
   - 🇨🇳 Moonshot Kimi k1.5 (200만 롱컨텍스트 & 멀티모달 추론)
   - 🇨🇳 Zhipu AI GLM-4-Plus & GLM-4-Voice (칭화대 플래그십)
   - 🇨🇳 MiniMax-Text-01 (400만 토큰 초고속 선형 어텐션)
   - 🇨🇳 01.AI Yi-Lightning (LMSYS 아레나 상위권)
   - 🇨🇳 Baichuan 4 (소고우 창업자 왕샤오촨 의료/RAG 특화)
   - 🇨🇳 StepFun Step-2 (1조 파라미터 MoE 멀티모달)
   - 🇨🇳 Tencent Hunyuan-Large (389B 오픈소스 MoE)
3. **LLM 총람 가이드 및 홈 화면 연동:**
   - `docs/llm/index.md`에 중국 대표 최신 LLM 진영 섹션 신설 및 Grok 4.6 반영
   - `index.md`, `HomeBannerSlider.vue`, `HomePortal.vue`에 최신 세대 모델 라인업 동기화
   - `.vitepress/config.mts` 네비게이션 및 사이드바에 `중국 대표 혁신 LLM` 전용 카테고리 신설
4. **버전별 개발이력(Changelog) 최신화:**
   - `DevHistoryModal.vue`에 2026-09-11 (v2.0.0, v1.9.0, v1.8.0) 대규모 개발이력 등록
   - 프로젝트 루트에 `CHANGELOG.md` 공식 신설 및 `package.json` 버전 2.0.0 범프
   - `README.md`에 개발이력 바로가기 안내 링크 추가

## 체크리스트
- [x] `package.json` scripts에 `"dev": "vitepress dev"` 추가 및 버전 `v2.0.0` 범프
- [x] 최신 LLM 상세 문서 작성 (GPT-6, Claude 5.1, Gemini 3.1 Pro/3.8 Flash, Grok 4.6, DeepSeek, Qwen, Kimi, GLM, MiniMax, Yi, Baichuan, Step-2, Hunyuan 등)
- [x] `docs/llm/index.md` 가이드에 중국 대표 최신 LLM 11선 전용 섹션 신설
- [x] `docs/tools/index.md` 최신 AI 개발 도구(Claude Code, Cursor, Windsurf, Aider 등) 업데이트
- [x] `docs/prompts/index.md` 최신 추론 모델 프롬프트 가이드 보강
- [x] 첫화면 UI/UX 심플 & 럭셔리 전면 리팩토링 (`HomePortal.vue`, `HomeBannerSlider.vue`, `index.md`)
- [x] 정규식 테스터 XSS 취약점 완전 방어 (`DevTools.vue`)
- [x] 엔터프라이즈 보안 헤더(`vercel.json`) 및 iframe 클릭재킹 방어(`index.ts`) 구축
- [x] VitePress 상단 네비게이션 및 사이드바에 최신 플래그십 및 중국 LLM 카테고리 구성 (`config.mts`)
- [x] Localhost 개발이력 모달(`DevHistoryModal.vue`) 및 `CHANGELOG.md` 최신화 완료
- [x] `npm run docs:build` 빌드 및 링크 유효성 검증 완료
- [x] `docs/walkthrough.md` 완료 보고서 작성
