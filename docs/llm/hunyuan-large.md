---
layout: doc
title: Hunyuan-Large / Hunyuan 시리즈 (Tencent / 腾讯混元)
description: 텐센트(Tencent)의 389B 오픈소스 MoE 파운데이션 모델 Hunyuan-Large 및 위챗 생태계 AI 상세 안내
---

# Hunyuan-Large / Hunyuan 시리즈 (Tencent) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Hunyuan-Large**는 글로벌 빅테크 기업 텐센트(Tencent / 腾讯)가 오픈소스로 공개한 **총 389B(3,890억 파라미터) 규모의 최신 MoE(Mixture of Experts) 파운데이션 모델**입니다.

활성 파라미터는 토큰당 52B 수준으로 억제하면서도 전 세계 오픈소스 MoE 모델 중 최상위 수준의 코딩, 수학, 언어 이해 성능을 구현했으며, 위챗(WeChat), 텐센트 클라우드, 게임 엔터테인먼트 등 수억 명이 사용하는 대규모 서비스 생태계의 기반 두뇌로 검증되었습니다.

---

## 🔍 상세 심층 분석

### 🌟 4대 핵심 특징

1. **389B MoE 아키텍처 (토큰당 52B 활성화)**
   - 대규모 전문가 라우팅 알고리즘을 최적화하여 밀집(Dense) 모델 대비 연산 비용을 1/4 수준으로 낮추면서도 초거대 모델의 지능을 온전히 발휘합니다.

2. **256K 컨텍스트 윈도우 지원**
   - 256,000 토큰에 달하는 긴 문맥을 완벽히 소화하여, 대규모 기업용 문서 검색 및 멀티턴 대화 히스토리를 안정적으로 유지합니다.

3. **강력한 코드 생성 및 수학 계산력**
   - HumanEval 및 GSM8K 벤치마크에서 Llama 3.1 70B를 능가하며 상용 최상위 모델과 대등한 성적을 기록합니다.

4. **멀티모달 이미지 및 비디오 생성 연동 (Hunyuan-Dit / Hunyuan-Video)**
   - 텍스트 생성뿐만 아니라 오픈소스로 선풍적인 인기를 끈 고품질 비디오 생성 모델 Hunyuan-Video와의 시너지를 제공합니다.

---

## 🔗 관련 링크
* **Hunyuan 공식 플랫폼:** [Tencent Hunyuan AI Platform](https://hunyuan.tencent.com/)
* **GitHub 오픈소스 레포지토리:** [Tencent Hunyuan GitHub](https://github.com/Tencent/Hunyuan-Large)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
