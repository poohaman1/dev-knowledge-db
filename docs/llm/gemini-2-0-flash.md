---
layout: doc
title: Gemini 2.0 Flash (Google)
description: Google DeepMind의 정식 출시(GA) 차세대 실시간 멀티모달 플래그십 Gemini 2.0 Flash 상세 안내
---

# Gemini 2.0 Flash (Google) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Gemini 2.0 Flash**는 Google DeepMind가 2025년 2월 공식 정식 출시(General Availability)한 **차세대 초저지연 네이티브 멀티모달 플래그십 AI 모델**입니다.

이전 1.5 Flash 대비 속도와 처리 효율이 대폭 개선되었으며, 오디오·비디오·텍스트의 실시간 양방향 스트리밍(Real-time Multimodal Streaming)과 네이티브 도구 호출(Tool Use) 능력을 완벽하게 지원합니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 혁신 기능

1. **Native Multimodal Realtime Streaming (실시간 음성·화면 스트리밍)**
   - 텍스트 변환 딜레이(STT/TTS 변환 과정) 없이 음성을 직접 입력받고 음성으로 자연스럽게 대답하는 엔드투엔드 음성 인터랙션을 지원합니다.
   - 초당 1프레임 이상의 연속 화면(비디오)을 분석하며 인간의 대화 속도에 준하는 밀리초(ms) 단위의 반응 속도를 실현했습니다.

2. **100만 토큰(1M) 대용량 컨텍스트 윈도우**
   - 1시간 분량의 풀 HD 동영상, 11시간 분량의 오디오, 수만 줄의 소스 코드를 한 번에 메모리에 적재하여 완벽한 검색 및 요약이 가능합니다.

3. **고도화된 도구 호출 (Agentic Tool Calling & Grounding)**
   - Google Search 실시간 웹 검색 그라운딩, 코드 실행(Python Code Execution Sandbox), 개발자 지정 사용자 정의 함수(Function Calling)를 결합하여 자율 에이전트를 구축하기에 최적입니다.

4. **파격적인 가성비와 넉넉한 무료 티어**
   - Google AI Studio를 통해 전 세계 개발자들에게 넉넉한 무료 RPM/TPM을 제공하며, 상용 서비스 배포 시에도 타 빅테크 대비 압도적으로 경제적인 API 단가를 제공합니다.

---

## 📊 주요 사양

| 항목 | Gemini 2.0 Flash |
| :--- | :--- |
| **컨텍스트 윈도우** | 기본 1,048,576 토큰 (약 100만 토큰) |
| **최대 출력 토큰** | 8,192 토큰 |
| **입력 모달리티** | 텍스트, 코드, 이미지, 비디오, 오디오 |
| **출력 모달리티** | 텍스트, 코드, 오디오(실시간 네이티브 음성) |
| **사고 모드 연계** | **Gemini 2.0 Flash Thinking Experimental** (단계별 CoT 추론 지원) |

---

## 🔗 관련 링크
- **Google DeepMind 공식:** [Google DeepMind Gemini 2.0](https://deepmind.google/technologies/gemini/flash/)
- **Google AI Studio (무료 API 키 발급):** [Google AI Studio](https://aistudio.google.com)
- **Google Cloud Vertex AI:** [Vertex AI Gemini 2.0](https://cloud.google.com/vertex-ai)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
