---
layout: home

hero:
  name: "개발자를 위한 지식DB"
  text: "국내외 최고의 개발 자료를 한 곳에서"
  tagline: "프론트엔드, 백엔드, AI, 생산성 도구 등 매일 활용할 수 있는 개발 지식을 제공합니다."
  actions:
    - theme: brand
      text: 시작하기
      link: /docs/domestic/
    - theme: alt
      text: 가이드라인 보기
      link: /guidelines/Agent

features:
  - title: 🇰🇷 국내 개발 자료
    details: 한국어로 제공되는 블로그, 커뮤니티, 필수 라이브러리 모음.
  - title: 🌐 글로벌 공식 문서
    details: 전 세계에서 가장 널리 쓰이는 글로벌 스탠다드 문서와 도구.
  - title: 🤖 AI & 프롬프트
    details: AI 어시스턴트의 성능을 극대화하기 위한 최적의 프롬프트 템플릿 제공.
---

# 📚 개발자를 위한 지식DB (Dev Knowledge DB)

개발자들이 매일 활용할 수 있는 국내외 최고의 개발 관련 사이트, 도구, 자료, 프롬프트, 지침 등을 체계적으로 수집·관리·활용하는 지식 베이스 프로젝트입니다.

## 🎯 목적
- 파편화된 개발 지식과 도구들을 하나의 중앙 저장소로 모읍니다.
- 국내(Korean) 자료와 해외(Global) 자료를 분리하여 빠른 검색과 접근성을 제공합니다.
- AI 에이전트(Claude, Gemini 등)가 이 지식DB를 쉽게 학습하고 활용할 수 있도록 Markdown 기반으로 최적화합니다.

## 📂 프로젝트 구조 안내

상세한 폴더 구조와 분류 기준은 [`FOLDER-STRUCTURE.md`](./FOLDER-STRUCTURE.md)를 참고하세요.

- `docs/`: 실제 지식 데이터가 카테고리별로 저장되는 핵심 디렉토리입니다.
- `guidelines/`: AI 에이전트 프롬프트, 스킬 정의 등 프로젝트 운영 지침이 있습니다.
- `templates/`: 마크다운 양식 및 공통 프롬프트 템플릿이 위치합니다.

## 🚀 사용법 및 로컬 테스트

이 지식DB는 추후 VitePress나 Docusaurus와 같은 정적 사이트 생성기(SSG)를 통해 웹사이트로 배포되도록 설계되었습니다.

> [!NOTE]  
> 로컬 환경 설정 및 개발(빌드) 방법은 [`DEVELOPMENT.md`](./DEVELOPMENT.md)를 참고하세요.

## 🎨 디자인 및 컴포넌트 가이드

문서 작성 시 사용할 마크다운 스타일, 경고문구 포맷, 다크모드 대응 방법 등은 [`DESIGN.md`](./DESIGN.md)를 확인하세요.

## 🤝 기여 방법 (Contributing)

이 프로젝트는 누구나 기여할 수 있습니다. 
새로운 도구나 좋은 사이트를 발견하셨다면 다음 절차를 따라 기여해 주세요:

1. 이 저장소를 Fork 합니다.
2. 새 브랜치를 생성합니다. (`git checkout -b feature/add-new-tool`)
3. `docs/` 하위의 적절한 카테고리 내 `README.md` (또는 새 파일)에 내용을 추가합니다.
4. 커밋 후 Pull Request를 엽니다. (커밋 규칙은 `DEVELOPMENT.md` 참조)

> [!TIP]  
> 문서를 작성하실 때는 `templates/INDEX_TEMPLATE.md`의 양식을 참고하시면 통일성을 유지할 수 있습니다.

## 📄 라이선스

이 프로젝트는 [MIT License](https://opensource.org/licenses/MIT)를 따릅니다.
