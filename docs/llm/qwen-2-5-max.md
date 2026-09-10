---
layout: doc
title: Qwen 2.5-Max / Qwen 2.5 (Alibaba)
description: 알리바바 클라우드의 최상위 플래그십 LLM Qwen 2.5-Max 및 오픈소스 최강 Qwen 2.5 시리즈 상세 안내
---

# Qwen 2.5-Max / Qwen 2.5 (Alibaba) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Qwen 2.5-Max (통의천문 / 通义千问)**는 중국의 기술 대기업 알리바바(Alibaba Cloud)가 개발한 **현재 최상위 플래그십 인공지능 모델**입니다.

알리바바는 글로벌 오픈소스 생태계를 평정한 **Qwen 2.5 (72B, 32B, 14B, 7B)** 및 세계 최고의 오픈소스 코딩 모델인 **Qwen 2.5-Coder-32B**, 비전 멀티모달 **Qwen 2.5-VL**과 더불어, 상용 클라우드 API 전용 최상위 지능 모델인 **Qwen 2.5-Max**를 통해 글로벌 벤치마크에서 GPT-4o 및 Claude 3.5 Sonnet과 대등하거나 능가하는 성적을 기록하고 있습니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 특징

1. **18조 토큰(18T) 사전 학습 및 29개 이상 다국어 지원**
   - 웹 데이터뿐만 아니라 방대한 양의 고품질 합성 데이터, 수학 논문, 다국어 코드를 집중 학습하여 한국어, 영어, 중국어, 일본어 등 29개 이상 언어에서 최고 수준의 문맥 이해도를 발휘합니다.

2. **오픈소스 AI 코딩의 글로벌 표준 (Qwen 2.5-Coder)**
   - 32B 체급의 경량 모델임에도 5.5조 개 코드 토큰을 학습하여, 상용 대형 모델 수준의 코딩 벤치마크(EvalPlus, LiveCodeBench, SWE-bench) 성적을 달성했습니다. Cursor, VS Code, Ollama 등 전 세계 로컬 AI 환경에서 가장 널리 쓰이고 있습니다.

3. **고난도 수학 및 정밀 추론 능력**
   - MATH 500, AIME 등 수학 벤치마크에서 특화 추론 모델을 능가하는 수리 계산력을 보여주며, 복잡한 비즈니스 데이터 및 통계 자료 분석에 최적화되어 있습니다.

4. **128K 컨텍스트 및 구조화된 JSON/도구 호출**
   - 128,000 토큰 컨텍스트 지원 및 정밀한 Function Calling, 구조화된 JSON 스키마 출력을 안정적으로 지원합니다.

---

## 📊 주요 벤치마크 성능
| 벤치마크 항목 | Qwen 2.5-Max | Qwen 2.5-72B-Instruct | Qwen 2.5-Coder-32B |
| :--- | :--- | :--- | :--- |
| **MMLU (종합 지식)** | **89.7%** | 86.1% | 79.2% |
| **MATH 500 (고등 수학)** | **88.2%** | 83.1% | 79.8% |
| **HumanEval (코드 생성)** | **92.4%** | 86.8% | **92.7% (코딩 1위 🏆)** |
| **Arena-Hard (인간 선호도)** | **85.3%** | 81.2% | 73.0% |

---

## 💻 실전 API 호출 예시 (DashScope / OpenAI 호환)

```typescript
import OpenAI from 'openai';

// 알리바바 DashScope는 완전한 OpenAI 호환 엔드포인트를 제공합니다
const alibaba = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
});

async function runQwenMax() {
  const completion = await alibaba.chat.completions.create({
    model: 'qwen-max-latest',
    messages: [
      { role: 'system', content: '당신은 전 세계 최고의 알고리즘 엔지니어입니다.' },
      { role: 'user', content: '동시성 100만 TPS를 처리할 수 있는 이벤트 브로커 아키텍처를 설계해줘.' }
    ],
    temperature: 0.2
  });

  console.log(completion.choices[0].message.content);
}
```

---

## 🔗 관련 링크
* **알리바바 클라우드 Qwen 허브:** [Qwen 공식 웹사이트](https://qwenlm.github.io/)
* **Hugging Face 모델 가중치:** [Qwen HuggingFace](https://huggingface.co/Qwen)
* **알리바바 DashScope API:** [DashScope Console](https://dashscope.aliyun.com/)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
