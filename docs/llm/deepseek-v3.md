---
layout: doc
title: DeepSeek-V3 (DeepSeek)
description: 671B MoE 아키텍처와 혁신적 MLA 기술로 글로벌 AI 생태계를 뒤흔든 오픈소스 플래그십 DeepSeek-V3 상세 안내
---

# DeepSeek-V3 (DeepSeek) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**DeepSeek-V3**는 중국의 AI 연구소 DeepSeek가 발표한 **6,710억 개(671B) 파라미터 규모의 차세대 전문가 혼합(MoE, Mixture-of-Experts)** 오픈소스 플래그십 모델입니다.

총 671B 파라미터 중 각 토큰을 처리할 때 필요한 **37B 파라미터만 동적으로 활성화**하여 상용 폐쇄형 최상위 모델(GPT-4o, Claude 3.5 Sonnet 등)에 필적하는 지능을 자랑하면서도, 추론 비용을 극단적으로 낮추어 전 세계 오픈소스 생태계에 거대한 충격을 안겼습니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 아키텍처 혁신

1. **Multi-head Latent Attention (MLA, 다중 헤드 잠재 어텐션)**
   - 기존 MHA(Multi-Head Attention) 대비 **KV 캐시(Key-Value Cache) 메모리 점유율을 90% 이상 압축**했습니다.
   - 덕분에 대규모 동시 접속자가 몰리거나 수만 줄의 대용량 코드를 처리할 때도 서버 메모리 병목 없이 초고속 추론이 가능합니다.

2. **Fine-Grained DeepSeekMoE Architecture**
   - 소수의 거대 전문가 대신 수많은 '미세 전문가(Fine-grained Experts)'로 나누고 공유 전문가(Shared Experts)를 병행 배치하여, 특정 분야의 전문 지식과 일반 상식을 균형 있게 학습했습니다.

3. **무손실 FP8 혼합 정밀도 훈련 및 파격적인 훈련 비용**
   - 훈련 전 과정에 FP8(8비트 부동소수점)을 안정적으로 적용하여 GPU 메모리와 통신 대역폭을 절반으로 절약했습니다.
   - 단 **2,048개의 H800 GPU로 약 2개월, 총 비용 약 600만 달러(한화 약 80억 원)** 수준으로 훈련을 완료하여 빅테크의 수천억~수조 원대 투자 패러다임을 완전히 바꿨습니다.

4. **MIT 라이선스 기반의 완전 공개**
   - 모델 가중치, 기술 백서, 추론 코드 일체를 상업적 이용이 가능한 라이선스로 완전 공개하여 사내 구축(On-Premise) 및 프라이빗 클라우드 도입의 사실상 글로벌 표준이 되었습니다.

---

## 📊 주요 사양 요약

| 항목 | 스펙 |
| :--- | :--- |
| **전체 파라미터** | 671B (6,710억 개) |
| **토큰당 활성화 파라미터** | 37B (370억 개) |
| **컨텍스트 윈도우** | 128,000 토큰 |
| **핵심 기술** | Multi-head Latent Attention (MLA), DeepSeekMoE, DualPipe 통신 중첩 |
| **자매 추론 모델** | **[DeepSeek-R1](/docs/llm/deepseek-r1.md)** (DeepSeek-V3 기반 순수 강화학습 추론 모델) |

---

## 🔗 관련 링크
- **공식 깃허브 레포지토리:** [DeepSeek-V3 GitHub](https://github.com/deepseek-ai/DeepSeek-V3)
- **DeepSeek 웹 챗 플랫폼:** [DeepSeek AI 공식 사이트](https://www.deepseek.com)
- **Hugging Face 모델 허브:** [DeepSeek-V3 on Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V3)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
