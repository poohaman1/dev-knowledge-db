---
layout: doc
title: 🇰🇷 깃허브 스타(국내) - 한국 개발자 오픈소스 TOP 10
description: 한국 개발자들이 만든 깃허브 스타 최상위 오픈소스 TOP 10. 코드를 직접 뜯어보고 자신만의 서비스로 발전시킬 수 있는 가이드를 제공합니다.
---

# 🇰🇷 깃허브 스타(국내) — 한국 개발자 오픈소스 TOP 10

한국 개발자들이 만들어 전 세계의 뜨거운 호응을 받은 **오픈소스 프로젝트 10선**입니다.
이 프로젝트들은 한국의 업무 환경, 결제 시스템, 서비스 기획 특징 등을 잘 담고 있습니다. 우리나라 개발자 선배들의 시각과 코딩 스타일을 벤치마킹할 수 있도록 각 프로젝트 분석에 필요한 **개발 환경**과 **사전 지식**을 함께 정리했습니다.

---

## 1. Kakao Bootpay (부트페이) 💳
> **한국 결제 환경에 최적화된 통합 결제 SDK**
> **GitHub**: [bootpay/bootpay-javascript](https://github.com/bootpay/bootpay-javascript)

카드, 가상계좌, 카카오페이, 토스페이 등 복잡한 국내 PG(결제대행) 연동을 단 몇 줄의 코드로 구현할 수 있게 해주는 통합 결제 SDK입니다.

- **⚙️ 개발 환경 (Tech Stack)**: TypeScript, JavaScript, Webpack
- **🧠 사전에 이해해야 하는 내용들**:
  - **결제 흐름(Payment Flow)과 콜백**: 클라이언트에서 결제창을 띄운 뒤, 결제 완료/실패 여부를 서버와 비동기 콜백으로 어떻게 주고받고 무결성을 검증하는지 아키텍처를 이해해야 합니다.
  - **크로스 도메인과 iframe**: 외부 PG사의 결제창 모달을 우리 웹사이트 위에 띄울 때 발생하는 도메인 간(Cross-Origin) 통신 정책을 어떻게 해결하고 있는지 파악하면 좋습니다.
  - **이벤트 기반 프로그래밍 (Event-driven)**: SDK 내부에 이벤트 리스너를 바인딩하여 결제 상태 변화를 추적하는 패턴을 살펴봐야 합니다.
- **💡 활용 팁**: 결제 연동 UI 팝업의 DOM 주입 방식을 분석하여, 결제뿐 아니라 **나만의 커스텀 인증 모달창(로그인, 본인인증) SDK**를 별도로 만들어 볼 수 있습니다.

---

## 2. Naver/egjs-flicking 🎠
> **무한 스크롤 지원 고성능 카드 슬라이더 라이브러리**
> **GitHub**: [naver/egjs-flicking](https://github.com/naver/egjs-flicking)

네이버 FE Platform 팀이 개발한 플리킹(Flicking) 카드 슬라이더 라이브러리입니다. 모바일 환경의 터치 제스처를 부드럽게 처리하며 수십만 건의 다운로드를 기록하는 실무급 프로젝트입니다.

- **⚙️ 개발 환경 (Tech Stack)**: TypeScript, Rollup, Jest, 다양한 프레임워크 래퍼(React, Vue, Angular)
- **🧠 사전에 이해해야 하는 내용들**:
  - **터치 및 포인터 이벤트**: 브라우저의 `touchstart`, `touchmove`, `touchend`와 `pointer` 이벤트를 이용해 사용자의 손가락 드래그 궤적과 속도를 계산하는 물리학적 로직을 이해해야 합니다.
  - **관성(Inertia) 스크롤 애니메이션**: 손가락을 뗐을 때 멈추지 않고 가속도에 따라 미끄러지듯 멈추는 애니메이션의 수학적 감쇠 알고리즘(`requestAnimationFrame` 활용)을 살펴보세요.
  - **프레임워크 Agnostic 설계**: 코어 로직은 순수 JS로 작성하고, 이를 React나 Vue용 래퍼로 어떻게 포장하여 제공하는지 아키텍처 구조를 학습해야 합니다.
- **💡 활용 팁**: `@egjs/react-flicking` 예제 코드를 바탕으로 스와이프 기능이 들어간 **틴더(Tinder) 스타일의 데이팅/상품 매칭 앱 UI**를 토이 프로젝트로 구현해 보세요.

---

## 3. Naver/billboard.js 📊
> **D3.js 기반의 모던 인터랙티브 차트 라이브러리**
> **GitHub**: [naver/billboard.js](https://github.com/naver/billboard.js)

네이버가 과거 유행했던 C3.js를 하드 포크하여 TypeScript와 모던 환경에 맞게 업그레이드한 D3.js 기반의 데이터 시각화 라이브러리입니다.

- **⚙️ 개발 환경 (Tech Stack)**: TypeScript, D3.js v6+, SCSS, Webpack
- **🧠 사전에 이해해야 하는 내용들**:
  - **D3.js의 Enter-Update-Exit 패턴**: 데이터의 배열 길이에 맞춰 SVG DOM 요소를 생성, 수정, 삭제하는 D3 고유의 데이터 바인딩 철학을 반드시 선행 학습해야 합니다.
  - **SVG 좌표계 및 트랜스폼**: 픽셀이 아닌 벡터 기반으로 선, 원, 다각형을 그리기 위한 SVG의 `path`, `d` 속성 연산과 `viewBox` 개념을 숙지해야 합니다.
  - **이벤트 위임과 툴팁**: 수천 개의 차트 데이터 포인트에 마우스를 올렸을 때 성능 저하 없이 툴팁을 띄우는 이벤트 위임(Event Delegation) 처리 기법을 눈여겨보세요.
- **💡 활용 팁**: 실시간 주식 가격이나 가상화폐 시세를 웹소켓으로 받아, 실시간으로 갱신되는 **대시보드 트레이딩 차트**를 구현해 보면 D3와 비동기 데이터의 융합을 마스터할 수 있습니다.

---

## 4. kakao-clone (by 박훈) 💬
> **카카오톡 UI를 그대로 구현한 클론 코딩 프로젝트**
> **GitHub**: [nomadcoders/kakao-clone](https://github.com/nomadcoders/kakao-clone)

국내 프론트엔드 입문자들 사이에서 전설처럼 회자되는, HTML과 CSS만으로 데스크톱/모바일 카카오톡의 픽셀 UI를 완벽하게 재현한 기초 학습 프로젝트입니다.

- **⚙️ 개발 환경 (Tech Stack)**: HTML5, CSS3, FontAwesome
- **🧠 사전에 이해해야 하는 내용들**:
  - **CSS Flexbox Layout**: 친구 목록, 채팅 말풍선, 하단 네비게이션 바 등 화면 요소를 수직/수평으로 유연하게 배치하는 `display: flex`의 심화 속성들을 완전히 꿰뚫어야 합니다.
  - **CSS Position 속성**: 프로필 사진 위의 알림 뱃지(빨간색 N 마크) 등을 띄우기 위한 `relative`, `absolute`, `fixed` 의 위치 지정 상호작용을 파악해야 합니다.
  - **가상 요소와 애니메이션**: `::before`, `::after`를 이용한 말풍선 꼬리 그리기와 `@keyframes`를 활용한 자연스러운 팝업 전환 애니메이션 코드를 분석해 보세요.
- **💡 활용 팁**: 카카오톡의 CSS 구조를 파악한 뒤 코드를 모두 지우고, 자신이 자주 쓰는 **인스타그램, 당근마켓, 토스 앱의 특정 화면을 픽셀 단위로 직접 클론**해보며 레이아웃 감각을 키워보세요.

---

## 5. D2Coding Font 🖋️
> **개발자를 위한 나눔고딕 기반 코딩 전용 폰트**
> **GitHub**: [naver/d2codingfont](https://github.com/naver/d2codingfont)

네이버가 개발한 코딩 전용 폰트로, 한글 가독성을 극대화하고 알파벳 'l(엘)', 'I(아이)', 숫자 '1' 등의 오독을 방지하도록 세심하게 설계되었습니다.

- **⚙️ 개발 환경 (Tech Stack)**: FontForge, Python (빌드 자동화 스크립트)
- **🧠 사전에 이해해야 하는 내용들**:
  - **합자(Ligature) 기능**: `==`, `!=`, `=>` 등의 프로그래밍 기호를 하나의 예쁜 수식 기호처럼 합쳐서 렌더링하는 OpenType 폰트의 합자 설계 원리를 이해해 보세요.
  - **서브셋(Subset) 폰트와 경량화**: 불필요한 한글 글리프를 제거하여 웹 폰트 용량을 메가바이트(MB) 단위에서 킬로바이트(KB) 단위로 최적화하는 과정을 스크립트로 어떻게 자동화하는지 살펴보면 좋습니다.
- **💡 활용 팁**: D2Coding 폰트를 WOFF2 형식으로 변환한 뒤, 내 기술 블로그의 `<pre><code>` 블록 CSS 설정에 `@font-face`로 직접 적용하여 **코드 가독성이 뛰어난 한국형 기술 블로그**를 디자인해 보세요.

---

## 6. Toss/es-toolkit ⚙️
> **현대적이고 고성능인 JavaScript 유틸리티 라이브러리**
> **GitHub**: [toss/es-toolkit](https://github.com/toss/es-toolkit)

토스(Toss) 프론트엔드 팀이 기존의 무거운 Lodash를 대체하고자 자체 개발한 라이브러리로, 번들 사이즈를 97% 줄이면서도 실행 속도를 2~3배 높여 전 세계적인 찬사를 받았습니다.

- **⚙️ 개발 환경 (Tech Stack)**: TypeScript, Vitest, TSDoc, GitHub Actions
- **🧠 사전에 이해해야 하는 내용들**:
  - **Tree Shaking 최적화**: 모듈 번들러(Webpack, Vite 등)가 사용하지 않는 코드를 빌드 과정에서 효과적으로 걷어낼 수 있도록 ES 모듈 시스템으로 순수 함수를 설계하는 기법을 깊이 파고들어야 합니다.
  - **TypeScript 타입 추론 극대화**: 제네릭(Generic)과 조건부 타입(Conditional Types)을 적극 활용하여 개발자가 IDE에서 완벽한 자동완성과 타입 에러 검사를 받게 해주는 고급 타입 선언 기술을 학습해야 합니다.
  - **V8 엔진 최적화 원리**: 루프 방식이나 배열 할당 방식을 어떻게 수정했을 때 브라우저 엔진(V8)이 가장 빠르게 파싱하고 실행하는지 자바스크립트의 숨겨진 퍼포먼스 이슈를 배울 수 있습니다.
- **💡 활용 팁**: `chunk`, `debounce`, `throttle` 등 가장 많이 쓰이는 함수들의 내부 구현체를 들여다보고, 나만의 **사이드 프로젝트용 미니 유틸리티 패키지**를 npm에 직접 배포해 보는 경험을 쌓아보세요.

---

## 7. Toss/slash 🛠️
> **토스 서비스 개발에서 추출된 React/TypeScript 모노레포**
> **GitHub**: [toss/slash](https://github.com/toss/slash)

토스 팀이 수많은 웹 서비스를 개발하며 공통으로 사용하던 React 훅, 유틸리티 함수, TypeScript 헬퍼 모듈 등을 모아 오픈소스화한 거대한 모노레포 프로젝트입니다.

- **⚙️ 개발 환경 (Tech Stack)**: React, TypeScript, Turborepo, Yarn Berry, Jest
- **🧠 사전에 이해해야 하는 내용들**:
  - **에러 바운더리와 비동기 처리(Suspense)**: 토스는 선언적 비동기 프로그래밍을 적극 활용합니다. `@toss/error-boundary`와 Suspense를 결합하여 로딩 상태와 에러 화면을 컴포넌트 레벨에서 우아하게 처리하는 철학을 이해해야 합니다.
  - **모노레포(Monorepo) 아키텍처**: 수십 개의 독립된 패키지가 하나의 저장소에서 어떻게 의존성을 공유하고 Turborepo를 통해 초고속으로 빌드되는지 거시적인 인프라 구조를 분석해 보세요.
  - **Compound Component 패턴**: `@toss/use-overlay`나 각종 UI 컴포넌트들이 어떻게 상태를 캡슐화하고 유연한 확장을 제공하는지 React 고급 디자인 패턴을 학습할 수 있습니다.
- **💡 활용 팁**: 토스의 선언적 설계 방식을 참고하여, 현재 진행 중인 React 프로젝트의 스파게티 비동기 코드(수많은 if-else 로딩 체크)를 **Suspense와 ErrorBoundary 기반의 깔끔한 구조로 리팩토링**해 보세요.

---

## 8. Kakao/react-query-toolkit 🔄 (kakao.maps.sdk 커뮤니티 래퍼)
> **카카오 팀의 실전 React 상태 관리 및 지도 연동 패턴**
> **GitHub**: [JaeSeoKim/kakao.maps.sdk](https://github.com/JaeSeoKim/kakao.maps.sdk) (유사 커뮤니티 래퍼 기준 설명)

한국 개발자라면 피해갈 수 없는 '카카오맵 API'를 순수 바닐라 JS가 아닌 React 생태계의 선언적 문법과 React Query 등을 활용해 어떻게 우아하게 래핑할 수 있는지 보여주는 모범 사례입니다.

- **⚙️ 개발 환경 (Tech Stack)**: React, TypeScript, Kakao Map SDK
- **🧠 사전에 이해해야 하는 내용들**:
  - **서드파티 DOM 제어와 React 라이프사이클의 충돌**: React의 Virtual DOM이 아닌 카카오 지도의 실제 DOM 조작 로직이 `useEffect` 라이프사이클 내에서 어떻게 초기화되고 파괴(Cleanup)되는지 숙지해야 메모리 누수를 막을 수 있습니다.
  - **선언적 컴포넌트 래핑(Wrapper) 기법**: `new kakao.maps.Marker()` 형태의 명령형 코드를 `<MapMarker position={...} />` 라는 형태의 React 선언적 컴포넌트로 포장하는 설계 패턴을 눈여겨보세요.
  - **전역 스크립트 비동기 로딩**: `<script>` 태그로 가져오는 카카오 맵 라이브러리가 로드되기 전에 React 컴포넌트가 렌더링될 때 발생하는 타이밍 이슈를 해결하는 훅스(Hooks) 로직을 분석해야 합니다.
- **💡 활용 팁**: 이 래퍼의 코드를 참고하여 공공데이터 포털의 데이터를 받아 지도 위에 시각화하는 **동네 맛집 지도, 혹은 부동산 실거래가 매물 지도 앱**을 개발해 포트폴리오를 채워보세요.

---

## 9. NHN/toast-ui.editor ✏️
> **마크다운과 WYSIWYG을 동시 지원하는 강력한 웹 에디터**
> **GitHub**: [nhn/tui.editor](https://github.com/nhn/tui.editor)

NHN이 개발한 에디터로, 개발자 친화적인 마크다운 편집 모드와 비개발자를 위한 WYSIWYG(위지윅) 모드를 버튼 하나로 자연스럽게 전환하며 쓸 수 있는 고급 텍스트 에디터입니다.

- **⚙️ 개발 환경 (Tech Stack)**: TypeScript, ProseMirror, Markdown-it
- **🧠 사전에 이해해야 하는 내용들**:
  - **추상 구문 트리 (AST)**: 마크다운 텍스트가 어떻게 AST 노드 구조로 파싱되고, 이를 바탕으로 HTML 요소가 렌더링되는지 컴파일러 기초 이론을 이해해야 에디터 커스터마이징이 가능합니다.
  - **ProseMirror 코어 아키텍처**: 위지윅 에디터계의 표준 라이브러리인 ProseMirror의 State, View, Schema, Transaction 개념을 이해해야 플러그인을 개발하거나 동작을 뜯어고칠 수 있습니다.
  - **이벤트 기반 플러그인 시스템**: 차트 삽입, 표 병합 등 확장 기능들이 에디터 코어 시스템에 어떻게 플러그인 형태로 주입되고 실행되는지 관찰해 보세요.
- **💡 활용 팁**: 이미지 복사+붙여넣기 시 자동으로 AWS S3로 업로드되는 커스텀 플러그인을 직접 개발하여 붙여보고, 이를 기반으로 **사내 공유용 마크다운 위키 페이지 게시판**을 풀스택으로 만들어 보세요.

---

## 10. Yorkie (야키) 🐶
> **카카오가 만든 오픈소스 분산 문서 동시 편집 플랫폼**
> **GitHub**: [yorkie-team/yorkie](https://github.com/yorkie-team/yorkie)

카카오의 엔지니어들이 주축이 되어 개발한 CRDT(Conflict-free Replicated Data Type) 기반의 분산 데이터 동기화 엔진입니다. Google Docs처럼 여러 명이 동시에 문서를 편집하는 기능을 내 앱에 쉽게 탑재할 수 있습니다.

- **⚙️ 개발 환경 (Tech Stack)**: Go (백엔드 서버), TypeScript (클라이언트 SDK), gRPC
- **🧠 사전에 이해해야 하는 내용들**:
  - **CRDT 분산 알고리즘**: 여러 사용자가 오프라인 상태에서 제각각 데이터를 수정한 뒤 서버에 연결되어도, 충돌(Conflict) 없이 동일한 결과물을 도출해내는 CRDT 수학적/자료구조적 이론(예: Logical Clock)을 꼭 학습해야 합니다.
  - **WebSocket 및 gRPC 스트리밍**: 클라이언트와 서버 간에 지연 없는 실시간 양방향 데이터 통신이 어떻게 이루어지는지 네트워크 프로토콜 계층에 대한 이해가 필요합니다.
  - **오프라인 퍼스트(Offline-First)**: 네트워크가 끊긴 상황에서도 로컬 스토리지에 변경 사항을 누적(Document Replica)시켰다가 연결 시 병합하는 설계 철학을 이해해 보세요.
- **💡 활용 팁**: Yorkie JS 클라이언트 SDK를 연동하여, 팀원들이 브라우저상에서 실시간으로 마우스 커서를 공유하며 글을 작성하는 **실시간 협업 메모장이나 아이디어 화이트보드 앱**을 토이 프로젝트로 구축해 보세요.
