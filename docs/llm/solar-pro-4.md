---
layout: doc
title: Solar Pro 4 (Upstage)
description: 업스테이지의 실무를 끝까지 해내는 에이전트 모델 Solar Pro 4 - 512K 컨텍스트, 128K 출력, OfficeVerse & Ko-GDPval 기반 멀티턴 도구/터미널 자율 수행, 할루시네이션 방지
---

# Solar Pro 4 (Upstage) 상세 정보

> [!IMPORTANT]
> **🚀 최신 공식 릴리즈: 실무를 끝까지 해내는 에이전트 모델 Solar Pro 4 공개**  
> 업스테이지 공식 블로그([upstage.ai/blog/ko/solar-pro-4](https://www.upstage.ai/blog/ko/solar-pro-4)) 기준 최신 플래그십 에이전트 모델입니다.  
> 512K 롱컨텍스트, 최대 128K 출력, Reasoning Effort 조절, 엄격한 할루시네이션 방지 기술이 적용되었습니다.

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Solar Pro 4**는 한국 대표 AI 기업 업스테이지(Upstage)가 공개한 **실무를 끝까지 완주하는 차세대 에이전트 전용 플래그십 LLM**입니다.

"AI에게 질문해서 답을 얻는 것과, 일을 맡기는 것은 다르다"는 철학 하에 개발되었습니다. 계약서를 검토하고, 여러 파일의 숫자를 교차 대조하며, 터미널 명령과 도구(Tools)를 실행하고, 최종 보고서(Word/Excel/PowerPoint)까지 직접 완성하는 다단계 실무 작업을 완벽하게 수행하도록 훈련되었습니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 기능

1. **512K 초대형 컨텍스트 & 최대 128K 단일 출력**
   - 수백 장 분량의 계약서, 재무 보고서, 대용량 데이터 파일 여러 개를 나누지 않고 한 세션에 투입하여 통합 분석할 수 있습니다.
   - 단일 요청으로 최대 128,000 토큰에 달하는 방대한 코드베이스나 완성형 문서를 생성합니다.

2. **Reasoning Effort 동적 추론 제어**
   - 깊은 추론과 논리 검증이 필요한 복잡한 작업은 높은 effort로, 실시간 응대가 필요한 작업은 낮은 effort로 설정하여 속도와 정확도의 최적 밸런스를 조절할 수 있습니다.

3. **근거 기반 답변 및 엄격한 할루시네이션(환각) 차단**
   - 실무에서 가장 위험한 '확인되지 않은 내용을 사실처럼 지어내는 현상'을 원천 방지합니다. 문서에 없는 조항이나 근거가 부족한 데이터는 억지로 답을 지어내는 대신 명확하게 **"확인 불가"** 라벨을 부착하여 답변의 신뢰도를 극대화합니다.

4. **OfficeVerse & Ko-GDPval 기반 실무 검증**
   - 업스테이지가 구축한 11개 산업 도메인, 12개 실무 사무 업무 합성 파이프라인 **OfficeVerse**를 통해 학습되었습니다.
   - Excel 워크북 생성, 근거 기반 Word 보고서, 발표자 노트가 포함된 PowerPoint(PPT)까지 실제 업무 흐름 그대로 완성합니다.

---

## 📊 에이전트 벤치마크 및 패밀리 라인업

### 📈 에이전트 능력 향상 (Solar Pro 3 대비)
- **터미널 작업 (Terminal Tasks):** **+13.7점 향상**
- **웹 리서치 (BrowseComp):** **+11.9점 향상**
- **실무 산출물 완주율 (GDPval):** **+9.7점 향상**
- **한국어 실무 (법률, 의료, 사무):** 국내 최고 수준 성적 기록

### 👥 Solar 4 세대 패밀리 라인업
| 모델 | 파라미터 / 특징 | 주 용도 |
| :--- | :--- | :--- |
| **Solar Pro 4** | 512K 컨텍스트 / 최상위 에이전트 지능 | 긴 문서 검토, 터미널 실행, 상용 API 워크로드 |
| **Solar Mini 4** | **3B 활성 파라미터** 초경량 모델 | 고빈도 비용 민감 작업, 대규모 에이전트 스케일링 |
| **Solar Open 2** | 범용 오픈 웨이트 (직접 배포형) | 자체 하드웨어 온프레미스 운영, 망분리 보안 환경 |

---

## 💻 Upstage Console API 호출 예시

```typescript
import OpenAI from 'openai';

// Upstage API는 표준 OpenAI 인터페이스를 지원합니다
const upstage = new OpenAI({
  apiKey: process.env.UPSTAGE_API_KEY,
  baseURL: 'https://api.upstage.ai/v1/solar'
});

async function runSolarPro4() {
  const completion = await upstage.chat.completions.create({
    model: 'solar-pro-4',
    messages: [
      {
        role: 'system',
        content: '당신은 실무 에이전트 Solar Pro 4입니다. 근거가 없는 내용은 절대 추측하지 말고 반드시 확인 불가로 표시하세요.'
      },
      {
        role: 'user',
        content: '첨부된 용역계약서 조항 중 지체상금율과 하자보수보증기간을 찾아 요약해줘.'
      }
    ],
    // reasoning effort 지원 (low, medium, high)
    // @ts-ignore
    reasoning_effort: 'high',
    temperature: 0.1,
  });

  console.log(completion.choices[0].message.content);
}

runSolarPro4();
```

---

## 🔗 공식 링크 및 리소스
- [업스테이지 Solar Pro 4 공식 발표 블로그](https://www.upstage.ai/blog/ko/solar-pro-4)
- [Upstage Console 공식 포털](https://console.upstage.ai)
- [Solar Pro 4 Agent Cookbook](https://github.com/UpstageAI)
- [OpenRouter 및 Hermes Agent 연동 포털](https://openrouter.ai)
