---
layout: doc
title: Claude 3.7 Sonnet (Anthropic)
description: Anthropic의 업계 최초 하이브리드 추론 플래그십 AI 모델 Claude 3.7 Sonnet 및 Claude Code 상세 안내
---

# Claude 3.7 Sonnet (Anthropic) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Claude 3.7 Sonnet**은 Anthropic이 2025년 2월 24일 공식 출시한 **업계 최초의 하이브리드 추론(Hybrid Reasoning)** 플래그십 AI 모델입니다.

기존 AI 모델들이 '빠른 일반 모델'과 '느리고 비싼 전용 추론 모델'로 분리되어 있던 한계를 극복하고, 단일 모델 안에서 즉각적인 일반 응답과 고난도 문제 해결을 위한 단계별 심층 사고(Extended Thinking)를 개발자가 유연하게 제어할 수 있도록 설계되었습니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 혁신 기능

1. **Hybrid Reasoning & Dynamic Thinking Budget (하이브리드 추론 제어)**
   - API 요청 시 `thinking: { type: "enabled", budget_tokens: 1024 ~ 128000 }` 파라미터를 통해 AI의 생각하는 시간과 토큰 소모량을 세밀하게 조절할 수 있습니다.
   - 단순한 질문에는 0초 만에 번개처럼 응답하고, 복잡한 풀스택 시스템 리팩토링이나 알고리즘 설계 시에는 수만 개의 토큰을 사용해 단계별 검증을 마친 후 완벽한 코드를 작성합니다.

2. **SWE-bench Verified 70.3% — 압도적 코딩 1위**
   - 오픈소스 실제 GitHub 이슈를 해결하는 표준 벤치마크인 **SWE-bench Verified에서 70.3%**를 기록하며 현존하는 전 세계 모든 AI 모델 중 독보적인 1위를 달성했습니다.
   - 프론트엔드 UI 구축, 백엔드 아키텍처 재설계, 테스트 주도 개발(TDD), 대규모 디버깅에서 인간 시니어 엔지니어급 역량을 발휘합니다.

3. **Claude Code 터미널 에이전트 지원**
   - Claude 3.7 Sonnet과 함께 출시된 CLI 도구인 **Claude Code**와 완벽하게 결합됩니다.
   - 개발자의 로컬 터미널 환경에서 스스로 전체 레포지토리 구조를 탐색하고, 파일을 수정하며, 빌드/테스트 명령어를 실행하여 오류를 자율적으로 고쳐나가는 Agentic 워크플로우를 실현합니다.

4. **컴퓨터 제어(Computer Use) 고도화 및 20만 토큰 컨텍스트**
   - 웹 브라우징, 화면 캡처 분석, 클릭 및 마우스 이동, 파일 다운로드 등 컴퓨터 화면을 직접 조작하는 능력이 대폭 향상되었습니다.
   - 200,000 토큰(약 500페이지 분량)의 대용량 컨텍스트 윈도우를 안정적으로 처리합니다.

---

## 📊 모델 스펙 및 벤치마크 비교

| 항목 | Claude 3.5 Sonnet | Claude 3.7 Sonnet (Current Latest 🚀) |
| :--- | :--- | :--- |
| **추론 방식** | 표준 단일 생성 | **하이브리드 추론 (일반 모드 + Extended Thinking)** |
| **SWE-bench Verified** | 49.0% | **70.3% (업계 1위 🏆)** |
| **사고 깊이 제어** | 불가 | **Thinking Budget 파라미터 (최대 128,000 토큰)** |
| **코딩 에이전트 연동** | Cursor, Windsurf 등 플러그인 | **Claude Code 터미널 CLI 네이티브 지원** |
| **컨텍스트 윈도우** | 200,000 토큰 | **200,000 토큰** |
| **추천 활용처** | 일상적 코딩 자동완성 | **대규모 코드 리팩토링, 풀스택 앱 구축, 복합 논리 추론** |

---

## 💡 개발자를 위한 실무 팁
- **API 호출 시**: 가벼운 챗봇 기능에는 `thinking` 설정을 비활성화하여 빠른 속도와 비용 절감을 취하고, 코드 생성이나 디버깅 태스크에는 `budget_tokens: 4096` 이상을 지정하면 버그 발생률을 획기적으로 줄일 수 있습니다.
- **Claude Code 사용**: 터미널에서 `npm install -g @anthropic-ai/claude-code`를 설치한 뒤 `claude` 명령어로 프로젝트 디렉토리에서 즉시 자율 코딩 페어를 시작할 수 있습니다.

---

## 🔗 관련 링크
- **Anthropic 공식 발표:** [Claude 3.7 Sonnet Announcement](https://www.anthropic.com/news/claude-3-7-sonnet)
- **Claude 공식 웹사이트:** [Anthropic Claude](https://www.anthropic.com/claude)
- **Anthropic API 공식 문서:** [Anthropic Documentation](https://docs.anthropic.com)
- **Claude Code 안내:** [Claude Code Overview](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
