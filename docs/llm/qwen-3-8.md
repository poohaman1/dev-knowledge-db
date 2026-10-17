---
layout: doc
title: Qwen 3.8 (Alibaba)
description: 알리바바 Qwen의 2.4조 파라미터 차세대 초대형 플래그십 LLM Qwen 3.8 - Qwen3.8-Max-Preview, Token Plan, Qoder/QoderWork 에이전트 워크플로우
---

# Qwen 3.8 (Alibaba Cloud) 상세 정보

> [!IMPORTANT]
> **🚀 최신 공식 릴리즈: 2.4조 파라미터 초대형 모델 Qwen 3.8 공개**  
> GeekNews 보도([news.hada.io/topic?id=31599](https://news.hada.io/topic?id=31599)) 및 알리바바 공식 발표 기준, 2.4조 파라미터 규모의 차세대 모델 **Qwen 3.8**이 정식 출시되었습니다.  
> 현재 `Qwen3.8-Max-Preview`를 통해 Alibaba Token Plan, Qoder, QoderWork에서 즉시 사용할 수 있으며, 조만간 오픈 웨이트도 공개될 예정입니다.

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Qwen 3.8 (통의천문 / 通义千问 3.8)**은 중국 알리바바(Alibaba Cloud)가 발표한 **2.4조(2.4T) 파라미터 규모의 차세대 초대형 인공지능 모델**입니다.

기존 전 세계 오픈소스 코딩 1위였던 Qwen 2.5-Coder 및 플래그십 Qwen 2.5-Max를 계승하면서, 글로벌 최정상 프런티어 AI 모델과 완벽하게 호환되도록 설계되었습니다. 계속해서 진화하는 아키텍처를 도입하여 복잡한 다단계 에이전트 작업, 2.4조 규모의 방대한 지식 기반, 초고속 코드 생성 능력을 제공합니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 특징

1. **2.4조(2.4T) 파라미터 초대형 파운데이션 아키텍처**
   - 글로벌 최선도 프런티어 모델(GPT-6, Claude Opus 5.5 등)과 직접 경쟁하는 초대형 체급으로, 전 도메인 지식, 수학적 증명, 시스템 프로그래밍에서 압도적인 추론 성능을 발휘합니다.
   - 독점 클라우드 모델뿐만 아니라 조만간 글로벌 오픈 웨이트(Open Weights) 공개가 예정되어 있습니다.

2. **Qoder 및 QoderWork 에이전트 개발 환경 통합**
   - 알리바바의 전용 AI 개발 에이전트 플랫폼인 **Qoder**와 **QoderWork**에 기본 엔진으로 연동되어, 단순 코드 자동 완성을 넘어 저장소 전체를 분석하고 리팩토링하는 자율 코딩을 수행합니다.

3. **Alibaba Token Plan 및 멀티 에이전트 동시 실행**
   - 국제 사용자와 중국 사용자를 위한 분리 요금제(Lite / Standard / Pro: 월 $6 / $18 / $68)를 운영합니다.
   - 단일 세션에서 최대 **6~8개의 자율 에이전트를 동시 병렬 실행**할 수 있는 아키텍처를 제공합니다.

4. **OpenAI 및 Anthropic 듀얼 프로토콜 완벽 호환**
   - 글로벌 표준 API 프로토콜을 모두 지원하여, 기존 Cursor, Claude Code, Vercel AI SDK, LangChain 등에서 Base URL과 API Key만 입력하면 즉시 교체 사용할 수 있습니다.

---

## 📊 주요 사양 및 비교

| 항목 | Qwen 3.8-Max-Preview | Qwen 2.5-Max (이전) | Qwen 2.5-Coder-32B |
| :--- | :--- | :--- | :--- |
| **파라미터 규모** | **2.4조 (2.4 Trillion)** | 미공개 대형 MoE | 320억 (32B) Dense |
| **제공 형태** | 클라우드 Token Plan / 오픈 웨이트 예정 | 클라우드 API | 오픈소스 (Apache 2.0) |
| **동시 에이전트 실행** | **최대 6~8개 병렬 구동** | 1개 순차 호출 | 로컬 인프라 종속 |
| **API 호환성** | **OpenAI / Anthropic 프로토콜 지원** | OpenAI 규격 | OpenAI 규격 |
| **주요 플랫폼** | Qoder, QoderWork, DashScope | DashScope | Ollama, vLLM, HuggingFace |
| **MMLU / 지식 추론** | **93.5%+** | 89.7% | 79.2% |
| **HumanEval (코딩)** | **95.2%** | 92.4% | 92.7% |

---

## 💻 실전 API 호출 예시 (OpenAI 호환 규격)

```typescript
import OpenAI from 'openai';

// Alibaba Token Plan 국제 사용자 엔드포인트
const qwen = new OpenAI({
  apiKey: process.env.ALIBABA_TOKEN_PLAN_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
});

async function runQwen38() {
  const response = await qwen.chat.completions.create({
    model: 'qwen-3.8-max-preview',
    messages: [
      {
        role: 'system',
        content: '당신은 알리바바의 2.4조 파라미터 차세대 모델 Qwen 3.8입니다.'
      },
      {
        role: 'user',
        content: 'Kubernetes 환경에서 Envoy Gateway와 Istio Ambient Mesh 연동 아키텍처를 설계해줘.'
      }
    ],
    temperature: 0.1,
  });

  console.log(response.choices[0].message.content);
}

runQwen38();
```

---

## 🔗 공식 링크 및 뉴스 리소스
- [GeekNews: Qwen 3.8 출시 소식](https://news.hada.io/topic?id=31599)
- [알리바바 클라우드 Qwen 공식 포털](https://qwenlm.github.io/)
- [Qwen Hugging Face 공식 저장소](https://huggingface.co/Qwen)
