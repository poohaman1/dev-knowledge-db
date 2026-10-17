---
layout: doc
title: Kimi K3 (Moonshot AI)
description: 문샷 AI의 최신 플래그십 파운데이션 모델 Kimi K3 & Kimi Work v3.2.17 - Agent Swarm 자율 군집 추론, Notion/Lark 공동 작성, 200만+ 롱컨텍스트, Kimi Code
---

# Kimi K3 (Moonshot AI) 상세 정보

> [!IMPORTANT]
> **🚀 최신 공식 릴리즈: 차세대 플래그십 모델 Kimi K3 & Kimi Work v3.2.17 동기화**  
> Kimi 공식 릴리스 노트([kimi.ai/ko/help/kimi-work/release-notes](https://www.kimi.ai/ko/help/kimi-work/release-notes)) 기준 최신 플래그십 모델입니다.  
> **Agent Swarm** 멀티 에이전트 협업 시스템, Notion/Lark 실시간 양방향 협업 작성, Kimi Code가 통합되었습니다.

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Kimi K3**는 문샷 AI(Moonshot AI / 月之暗面)가 선보인 **공식 최신 플래그십 인공지능 파운데이션 모델**입니다.

기존 200만 토큰 롱 컨텍스트의 혁신을 이끌었던 Kimi k1.5를 넘어, 복수의 에이전트가 자율적으로 역할을 분담하여 과업을 완수하는 **Agent Swarm(군집 에이전트)** 체계와 실무 생산성 도구 **Kimi Work (v3.2.17 최신 릴리스)**를 결합하여 차원이 다른 업무 자동화를 실현합니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 기능

1. **Agent Swarm 자율 멀티 에이전트 협업**
   - 단일 모델의 순차적 처리를 탈피하여, 기획·검색·코드 작성·결과 검증을 각각 전담하는 복수의 Kimi K3 에이전트가 병렬로 협업하여 대규모 프로젝트를 완수합니다.

2. **Notion & Lark 양방향 실시간 사람-AI 공동 작성**
   - 내장 브라우저 환경에서 Notion 및 Lark 문서와 직접 연동되어, 사람이 작성 중인 페이지에 코멘트를 남기고, 서식과 카드를 생성하며 실시간 Q&A 및 교정을 공동 수행합니다.

3. **Kimi Code & K2.7 Code 전용 엔진**
   - 개발 워크플로우에 특화된 Kimi Code를 통해 IDE 안에서 대규모 프로젝트 리팩토링, 단위 테스트 작성, 디버깅을 고속으로 실행합니다.

4. **200만+ 토큰 무손실 롱 컨텍스트 & Deep Research**
   - 수천 장의 기술 사양서, 법률 계약서, 고화질 비디오를 한 세션에서 완전히 기억하며, 다단계 심층 웹 리서치와 인용 출처 매칭을 오차 없이 제공합니다.

---

## 📊 Kimi 모델 패밀리 및 생태계 현황

| 모델 / 제품 | 특징 | 주 용도 |
| :--- | :--- | :--- |
| **Kimi K3 (신규)** | 차세대 멀티모달 & Agent Swarm 플래그십 | 복합 리서치, 다단계 에이전트 프로젝트 |
| **Kimi K2.7 Code** | 소프트웨어 엔지니어링 특화 고속 코딩 | Kimi Code, IDE 플러그인, 자동 리팩토링 |
| **Kimi K2 Thinking** | 강화학습 기반 심층 Chain-of-Thought | 수학적 정리 증명, 복잡한 비즈니스 로직 |
| **Kimi Work (v3.2.17)** | 데스크톱/모바일 올인원 에이전트 클라이언트 | 문서, 스프레드시트, 슬라이드 자동 생성 |

---

## 💻 실전 API 호출 예시 (Moonshot API)

```typescript
import OpenAI from 'openai';

// Moonshot API는 표준 OpenAI 인터페이스와 호환됩니다
const moonshot = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1'
});

async function runKimiK3() {
  const completion = await moonshot.chat.completions.create({
    model: 'kimi-k3-preview',
    messages: [
      {
        role: 'system',
        content: '당신은 문샷 AI의 최신 플래그십 Kimi K3입니다. 방대한 롱 컨텍스트를 바탕으로 정확한 출처와 논리적인 결론을 도출하세요.'
      },
      {
        role: 'user',
        content: '국내외 멀티 에이전트 시스템(Agent Swarm)의 통신 프로토콜과 장애 복구 표준을 비교 분석해줘.'
      }
    ],
    temperature: 0.3,
  });

  console.log(completion.choices[0].message.content);
}

runKimiK3();
```

---

## 🔗 공식 링크 및 리소스
- [Kimi 공식 웹 포털](https://kimi.ai)
- [Kimi Work 공식 릴리스 노트](https://www.kimi.ai/ko/help/kimi-work/release-notes)
- [Moonshot AI 오픈 플랫폼](https://platform.moonshot.cn)
