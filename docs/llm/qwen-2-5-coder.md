---
layout: doc
title: Qwen 2.5-Coder (Alibaba)
description: 오픈소스 코딩 모델의 정점, 알리바바의 Qwen 2.5-Coder 시리즈 상세 안내
---

# Qwen 2.5-Coder (Alibaba) 상세 정보

[🔙 이전 화면으로 돌아가기](/docs/llm/)

---

## 📌 모델 개요
**Qwen 2.5-Coder**는 알리바바 클라우드(Qwen 팀)가 5.5조 개 이상의 고품질 코드 토큰으로 사전 학습시켜 공개한 코드 생성 및 디버깅 전용 오픈소스 파운데이션 모델입니다.

## 🔍 상세 심층 분석
0.5B부터 32B까지 다양한 체급을 제공하며, 특히 **Qwen 2.5-Coder-32B** 모델은 오픈소스 코딩 벤치마크(EvalPlus, MultiPL-E, SWE-bench)에서 독보적인 성능을 달성하여 전 세계 개발자 커뮤니티의 로컬 코딩 모델 1위로 자리잡았습니다.

**심층 특징:**
- **128k 컨텍스트 윈도우 지원:** 대규모 코드베이스 전체를 한 번에 프롬프트로 입력받아 다중 파일 간의 참조와 버그를 정확히 추적합니다.
- **다양한 프로그래밍 언어 숙달:** Python, TypeScript, C++, Java, Go, Rust, SQL 등 90개 이상의 언어를 네이티브 수준으로 이해하고 작성합니다.
- **코드 어시스턴트 생태계 연동:** Continue, Cursor, Ollama, vLLM 등에 완벽 호환되어 사내 프라이빗 코딩 AI 구축에 최적입니다.

---

## 🔗 관련 링크
* **공식 깃허브:** [Qwen 2.5-Coder GitHub](https://github.com/QwenLM/Qwen2.5-Coder)
* **Hugging Face 모델 허브:** [Qwen Collection on Hugging Face](https://huggingface.co/Qwen)

---

[🔙 이전 화면으로 돌아가기](/docs/llm/)
