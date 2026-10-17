---
layout: doc
title: Grok 4.7 (xAI)
description: xAI의 최신 플래그십 AI 모델 Grok 4.7 - grok.com의 Expert 및 Heavy 모드를 구동하는 최신 플래그십, 다중 전문가 팀(Team of Experts) 아키텍처, 네이티브 오피스 문서 생성 및 xAI Skills
---

# Grok 4.7 (xAI) 상세 정보

> [!IMPORTANT]
> **🚀 최신 공식 릴리즈: Grok 4.7 (GA)**  
> xAI 공식 릴리스 노트([grok.com/release-notes](https://grok.com/release-notes)) 기준 최신 플래그십 모델입니다.  
> grok.com의 **Expert 모드**(Thinks hard) 및 **Heavy 모드**(Team of Experts)의 기본 엔진으로 탑재되었습니다.

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Grok 4.7**은 일론 머스크의 xAI가 발표한 **공식 최신 플래그십 인공지능 모델**입니다.

이전 Grok 4.6에서 비약적으로 발전하여, 복잡한 코딩과 전문 지식 작업(Knowledge Work)을 가장 정밀하게 수행하도록 설계되었습니다. 미국 테네시주 멤피스의 세계 최대 AI 슈퍼컴퓨터 **Colossus 클러스터**를 기반으로 훈련되었으며, grok.com의 심층 추론 **Expert 모드**와 전문가 협업 앙상블 시스템인 **Heavy 모드**를 전면 구동합니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 기능

1. **Expert 모드 (Thinks hard) & Heavy 모드 (Team of Experts)**
   - **Expert 모드**: 고난도 논리 문제, 코딩 아키텍처 설계 시 자율 검증 및 단계적 체인 오브 쏘트(CoT) 추론을 끝까지 밀어붙입니다.
   - **Heavy 모드**: 다수의 Grok 4.7 전문가 인스턴스가 팀(Team of Experts)을 구성하여 역할을 분담하고 교차 검증을 거쳐 최고 신뢰도의 솔루션을 산출합니다.

2. **네이티브 오피스 문서 및 프레젠테이션 생성**
   - 별도 서드파티 도구 없이도 슬라이드(프레젠테이션), 정밀 서식 문서, 복잡한 수식이 포함된 스프레드시트를 대화 맥락에서 즉각 네이티브 파일로 생성·편집합니다.

3. **xAI Skills 생태계 전면 지원**
   - 개발자와 사용자가 몇 초 만에 맞춤형 도구(Skill)를 정의하고 결합할 수 있으며, 웹·iOS·Android 등 전 플랫폼에서 xAI 빌트인 스킬과 커스텀 스킬을 즉시 실행합니다.

4. **실시간 X(구 트위터) 인덱스 & DeepSearch 3.0**
   - 실시간 글로벌 브레이킹 뉴스와 기술 토론을 지연 없이 분석하며, 편향이나 과도한 회피 없이 과학적 원리에 입각한 직설적이고 명쾌한 인사이트를 제시합니다.

---

## 📊 주요 사양 및 벤치마크

| 항목 | 사양 / 성능 | 비고 |
| :--- | :--- | :--- |
| **모델명** | `grok-4-7` / `grok-4-7-thinking` | xAI 공식 최신 플래그십 |
| **구동 모드** | Expert (Thinks hard), Heavy (Team of Experts), Fast | grok.com 및 API 제공 |
| **컨텍스트 윈도우** | **1,000,000 토큰 (1M)** | 대규모 리포지토리 및 문서 일괄 분석 |
| **AIME 2025/2026 (수학)** | **94.8%** | 심층 추론 모드 구동 시 |
| **SWE-bench Verified** | **81.5%** | 실무 소프트웨어 엔지니어링 버그 자동 해결 |
| **MATH 500** | **96.8%** | 알고리즘 및 수학 심층 증명 |
| **오피스 생성** | 슬라이드, 문서, 스프레드시트 네이티브 출력 | xAI Skills 연동 |

---

## 💻 xAI SDK 실전 호출 예시

```typescript
import OpenAI from 'openai';

// xAI API는 OpenAI 호환 인터페이스를 완벽하게 지원합니다
const xai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

async function runGrok47() {
  const completion = await xai.chat.completions.create({
    model: 'grok-4-7',
    messages: [
      {
        role: 'system',
        content: '당신은 xAI의 최신 플래그십 Grok 4.7입니다. 사실에 입각하여 깊이 있는 분석과 코드를 제공하세요.'
      },
      {
        role: 'user',
        content: '분산 트랜잭션 환경에서 Saga 패턴과 2PC의 성능 및 복구 전략을 비교 분석해줘.'
      }
    ],
    temperature: 0.2,
  });

  console.log(completion.choices[0].message.content);
}

runGrok47();
```

---

## 🔗 공식 링크 및 리소스
- [grok.com 공식 웹사이트](https://grok.com)
- [grok.com 공식 릴리스 노트](https://grok.com/release-notes)
- [xAI Grok 4.7 공식 발표](https://x.ai/news/grok-4-7)
- [xAI 개발자 콘솔 및 API 문서](https://console.x.ai)
