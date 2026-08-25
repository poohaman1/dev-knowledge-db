---
layout: doc
title: MiniMax-Text-01 (MiniMax)
description: Lightning Attention 기반 400만 토큰 초고속 처리 차세대 선형 어텐션 모델 MiniMax-Text-01 안내
---

# MiniMax-Text-01 (MiniMax) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**MiniMax-Text-01**은 미니맥스(MiniMax)가 자체 개발한 **Lightning Attention(선형 어텐션)** 아키텍처를 기반으로, 최대 400만 토큰(약 300만 단어)의 초대용량 컨텍스트를 기존 트랜스포머 대비 획기적인 속도와 저비용으로 처리하는 456B MoE 모델입니다.

## 🔍 상세 심층 분석
전통적인 소프트맥스 어텐션의 $O(N^2)$ 계산 복잡도 한계를 선형 시간 $O(N)$ 복잡도로 극복하여, 초장문 문서 분석에서도 메모리 폭증 없이 초고속 추론을 지속합니다.

**심층 특징:**
- **400만 토큰 컨텍스트:** 깃허브 저장소 수십 개 전체, 수년 치의 사내 슬랙 대화록이나 이메일 로그를 손실 없이 통째로 입력할 수 있습니다.
- **MoE(전문가 혼합) 구조의 고효율:** 총 4,560억 개 파라미터 중 토큰당 459억 개의 활성 파라미터만 가동하여 매우 경제적인 추론 단가를 자랑합니다.
- **뛰어난 다국어 및 지식 벤치마크:** MMLU, GSM8K, HumanEval 등 주요 벤치마크에서 글로벌 최상위 모델들과 어깨를 나란히 합니다.

---

## 🔗 관련 링크
* **공식 웹 플랫폼:** [MiniMax 공식 사이트](https://www.minimax.io)
* **MiniMax 개발자 플랫폼:** [MiniMax Open Platform](https://platform.minimaxi.com)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
