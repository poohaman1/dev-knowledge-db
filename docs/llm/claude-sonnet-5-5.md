---
layout: doc
title: Claude Sonnet 5.5 (Anthropic)
description: Anthropic의 2026년 9월 28일 출시 차세대 고성능 지능형 워크호스 모델 Claude Sonnet 5.5 상세 정보 및 기술 아키텍처
---

# Claude Sonnet 5.5 (Anthropic) 상세 정보

> [!IMPORTANT]
> **📅 최신 공식 릴리즈: 2026년 10월 16일 기준 Anthropic 최신 메인스트림 모델 (GA)**  
> **Claude Sonnet 5.5**(`claude-sonnet-5-5`)는 일상적 개발과 대규모 프로덕션 엔지니어링에서 최고의 성능-속도 밸런스를 제공하는 Anthropic의 대표 모델입니다.

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Claude Sonnet 5.5**는 Anthropic이 2026년 9월 28일 출시한 **차세대 엔지니어링 주력 AI 모델**입니다.

100만 토큰(1M) 컨텍스트 윈도우, `effort` 매개변수 기반 적응형 사고(Adaptive Thinking), 프롬프트 캐시 읽기 비용 50% 인하($0.10/MTok)를 통해 대규모 소프트웨어 프로젝트 및 실시간 에이전트 시스템에서 독보적인 경제성과 성능을 제공합니다.

---

## 🔍 상세 심층 분석

### 🌟 핵심 혁신 기능

1. **프롬프트 캐싱 비용 50% 파격 인하**
   - 캐시 읽기 가격을 백만 토큰당 $0.10 USD(기본 입력의 0.05배)로 대폭 인하하여, 대규모 코드베이스와 문서를 상시 캐싱하는 에이전트 루프의 운영 비용을 획기적으로 낮췄습니다.

2. **적응형 사고 (Adaptive Thinking) & 보존된 사고(Preserved Thinking)**
   - 계정 기반으로 보호되는 사고 블록(Account-bound thinking)을 통해 다중 턴 대화에서도 일관된 논리 흐름을 유지하며, `effort` 설정으로 빠른 응답과 심층 분석을 유연하게 전환합니다.

3. **고속 컴퓨터 제어 (Computer Use Toolset 20260801)**
   - 최신 데스크톱 UI/터미널 조작 도구 세트를 완벽 지원하여 Cursor, Claude Code, VS Code 에이전트 환경에서 실시간 코딩 보조를 자율 수행합니다.

---

## 📊 모델 스펙

| 항목 | Claude Sonnet 5 | Claude Sonnet 5.5 (Current Latest 🚀) |
| :--- | :--- | :--- |
| **모델 식별자** | `claude-sonnet-5-20260415` | **`claude-sonnet-5-5`** |
| **컨텍스트 윈도우** | 500K 토큰 | **1,000,000 토큰 (1M)** |
| **캐시 읽기 비용 (MTok)** | $0.25 USD | **$0.10 USD (50% 인하)** |
| **추론 방식** | 수동 Extended Thinking | **적응형 사고 (effort 파라미터)** |
| **SWE-bench Verified** | 76.5% | **88.2%** |

---

## 🔗 관련 링크
* **Anthropic 공식 사이트:** [Anthropic Claude](https://www.anthropic.com/claude)
* **공식 릴리스 노트:** [Claude Platform Release Notes](https://platform.claude.com/docs/ko/release-notes/overview)
* **Anthropic 콘솔:** [Anthropic Console](https://console.anthropic.com)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
