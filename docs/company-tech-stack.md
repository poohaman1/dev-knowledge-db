# 🏢 기업별 기술스택 (Company Tech Stacks)

국내 주요 기업 및 스타트업이 서비스 개발에서 실제로 채택하고 있는 기술 스택과 아키텍처, 권장 역량을 정리한 페이지입니다. (2024~2025년 기준 최신 정보 업데이트 반영)

---

## 🏢 대기업 & IT 서비스 기업

### 1. 삼성SDS (Samsung SDS)
엔터프라이즈 통합 IT 서비스 및 클라우드 솔루션을 공급하는 삼성SDS의 주요 직무별 기술 스택 매핑 가이드라인입니다.

*   **Java / Spring**
    *   **영역:** ICT개발 및 운영, 엔터프라이즈
    *   **설명:** 대규모 백엔드 엔터프라이즈 시스템 구축에 최적화된 메인 스택입니다.
*   **Python / Go**
    *   **영역:** 클라우드 자동화 및 생성형 AI
    *   **설명:** 자체 생성형 AI 플랫폼인 **FabriX** 서비스 개발 및 자동화 로직에 핵심 활용됩니다.
*   **AWS / Kubernetes (K8s) / Linux**
    *   **영역:** 클라우드 인프라 운영 & SCP/MSP 기술 지원
    *   **설명:** 인프라 자원의 오케스트레이션 및 삼성 클라우드 플랫폼(SCP) 기술 고도화를 목표로 합니다.
*   **React / Vue.js**
    *   **영역:** 프론트엔드 UX/UI 고도화
    *   **설명:** **첼로스퀘어(Cello Square)** 물류 대시보드 및 사내 대규모 플랫폼의 화면단 설계에 채택되었습니다.
*   **데이터 & AI**
    *   **영역:** 데이터 파이프라인 & LLM 응용
    *   **설명:** 데이터 엔지니어링 파이프라인 설계 및 **Brity Copilot** 등 기업형 거대언어모델(LLM) 활용 기능 개발에 활용됩니다.
*   **보안 (Security)**
    *   **영역:** 클라우드 보안 관제 및 엔터프라이즈 보안 컨설팅

---

### 2. 네이버 (NAVER)
*   **iOS / 모바일 분야 핵심 역량**
    *   **기초:** CS 전반 기초 지식 (알고리즘, 자료구조, 메모리 모델, 운영체제), Swift 프로그래밍 언어의 탄탄한 이해.
    *   **아키텍처:** 객체지향 설계 이론 및 **Clean Architecture** 기반의 안정적이고 유연한 모듈형 구조 설계 지식.
    *   **UI & 비동기 패턴:** **MVVM 패턴**, **SwiftUI + Combine** 프레임워크 기반의 반응형 레이아웃 설계.
    *   **확장:** 크로스 플랫폼 프레임워크인 **Flutter** 활용 경험 우대.

---

### 3. 카카오뱅크 (KakaoBank)
*   **주요 기술 스택**
    *   **프레임워크 및 라이브러리:** Swift, RxSwift, RIBs, MVVM, SnapKit, FlexLayout, SwiftUI
    *   **테스트:** XCTest, Quick, Nimble 기반의 견고한 단위/UI 테스트 코드 작성
    *   **DevOps & 빌드:** Jenkins, fastlane, Tuist, Carthage, SPM(Swift Package Manager)을 활용한 모듈화 및 자동 빌드 파이프라인 구축.
*   **자격 및 우대:** 대규모 트래픽 환경에서의 모듈러 아키텍처(Modular Architecture) 설계 경험 선호.

---

### 4. 당근 (Daangn)
*   **주요 기술 스택**
    *   **핵심 라이브러리:** Swift, RxSwift, FlexLayout, PinLayout, Alamofire
    *   **개발/빌드 도구:** Tuist (프로젝트 생성기), GitHub Actions, Firebase, fastlane
    *   **협업 도구:** Slack, GitHub, JIRA, Figma
*   **개발 문화:** 의존성 주입(DI, Dependency Injection)을 적극 도입하여 결합도를 낮추며, 새로운 도구와 효율적인 기술 시도를 적극 지지하고 응원하는 수평적인 엔지니어링 문화를 가지고 있습니다.

---

### 5. 블라인드 (Blind)
*   **주요 기술 스택**
    *   **핵심 스택:** Swift, UIKit 기반 UI 구현, RxSwift 반응형 프로그래밍
    *   **자격요건:** Apple Human Interface Guidelines(HIG) 표준 준수 설계 역량, 코드 리뷰를 통한 고품질 프로덕트 완성.
*   **개발 환경:** 글로벌 리모트(재택근무) 기반의 코드 통합 및 비동기 협업에 특화되어 있습니다.

---

## 🦄 테크 스타트업 & 핀테크 / 플랫폼

### 1. 뱅크샐러드 (Banksalad) — *2025년 기준 업데이트*
*   **주요 기술 스택**
    *   **언어 및 UI:** Swift, SnapKit, SwiftUI
    *   **비동기 & 아키텍처:** RxSwift, Combine 기반의 반응형 프로그래밍, MVVM 및 MVI 디자인 패턴 설계
    *   **테스트:** XCTest, Quick/Nimble, AXSnapshot (접근성 스냅샷 테스트)
    *   **배포 및 빌드:** GitHub Actions, Fastlane match, Cocoapods, SPM, Tuist를 통한 모듈화 아키텍처 운영.
*   **최신 트렌드:** 대규모 아키텍처 마이그레이션(하위 호환성 유지) 및 사용자 행동 분석 툴킷 연동 고도화.

---

### 2. 페이타랩 (패스오더 / Paytalab) — *2025년 기준 업데이트*
*   **주요 기술 스택**
    *   **주요 언어:** Swift (기본 스택), TypeScript (점진적 도입/부차적 스택), Objective-C (기존 유산 관리)
    *   **아키텍처:** MVVM, Clean Architecture, Tuist/SPM을 활용한 모듈화(Modularization) 설계
    *   **개발 문화 (AI-First):** **Cursor, Claude Code, Claude/GPT** 등 최신 AI 코딩 도구를 개발 전 과정에 활용하여 생산성을 극대화하는 혁신적인 업무 방식을 지향합니다.
*   **지향점:** 네이티브 역량을 바탕으로 React Native 등 크로스플랫폼 변화에 유연하고 긍정적인 태도를 가진 엔지니어링.

---

### 3. 웰트 (WELT)
*   **주요 기술 스택**
    *   **주요 언어:** Swift (iOS), Kotlin (Android)
    *   **UI 프레임워크:** SwiftUI 및 Jetpack Compose를 활용한 전면 선언형 UI(Declarative UI) 구현
    *   **모바일 아키텍처:** MVVM, MVI 설계 패턴, 동시성 제어(async/await, Actor, Coroutine)
    *   **분석 도구:** 웰트 자체 개발 **MCP Server**를 도입하여 로그 수집, 사용자 행동 분석 및 디지털 치료제(DTx) 의사결정에 데이터 활용.
*   **개발 도구:** Xcode, Android Studio, Confluence, Slack, Figma 및 AI 어시스턴트(Cursor, Gemini CLI) 적극 채택.

---

### 4. 번개장터 (BGZT)
*   **주요 기술 스택**
    *   **프론트/앱:** Swift, RxSwift, ReactorKit, SnapKit, Then, FlexLayout, PinLayout, Moya
    *   **아키텍처:** RIBs, MVVM 기반 설계 및 Tuist를 활용한 모듈러 아키텍처(Modular Architecture), Unit Test 자동화
    *   **기타:** SwiftUI, Combine 적극 병행 및 도입 중.

---

### 5. 다방 (Dabang)
*   **주요 기술 스택**
    *   **핵심 도구:** Swift, RxSwift, MVVM, ReactorKit
    *   **UI 및 통신:** Auto Layout, Storyboard, Rest API, Alamofire, Sativa, ReSwift, Kingfisher
    *   **의존성 관리:** Carthage, CocoaPods

---

### 6. 리디북스 (RIDI)
*   **주요 기술 스택 및 역량**
    *   **핵심 스택:** Swift, SwiftUI, Custom View 컴포넌트 직접 설계, 외부 오픈소스 라이브러리 커스터마이징 능력.
    *   **디자인 패턴:** MVVM, TCA (The Composable Architecture), Clean Architecture 실무 적용.
*   **우대 분야:** 영상/오디오 미디어 처리 및 뷰어 개발 성능 고도화.

---

### 7. 똑똑보카
*   **주요 기술 스택**
    *   **핵심 도구:** Swift, RxSwift, Combine
    *   **UI 구성:** 스토리보드 배제, 순수 **코드 기반의 UIKit 레이아웃(Code-based Layout)** 구현력 중시.

---

### 8. 트래블월렛 (Travel Wallet)
*   **주요 기술 스택**
    *   **핵심 스택:** Swift, Combine, RxSwift 기반 비동기 데이터 처리
    *   **아키텍처:** ReactorKit 실무 활용 및 데이터 바인딩 최적화.

---

### 9. 드림어스컴퍼니 (플로 / FLO)
*   **주요 기술 스택**
    *   **핵심 도구:** Swift, RxSwift, ReactorKit, RealmSwift (로컬 데이터베이스)
    *   **아키텍처:** MVVM Architecture
    *   **CI/CD & 테스트:** XCTest, Quick, Nimble, GitHub Actions, Fastlane, CocoaPods

---

### 10. 슬링 (수능 공부 앱 오르조)
*   **주요 기술 스택**
    *   **핵심 도구:** SwiftUI (선언형 UI), Combine, TCA (The Composable Architecture)
    *   **인프라:** Fastlane, CI/CD 배포 자동화, 모듈러 설계, Firebase Functions & Firestore.

---

### 11. 굿닥 (Goodoc)
*   **주요 기술 스택**
    *   **크로스 플랫폼:** React, React Native, TypeScript
    *   **네트워킹 & 배포:** GraphQL, WebSocket (실시간 통신), AppCenter Codepush (실시간 앱 업데이트)

---

### 12. 픽소 (PIXO)
*   **주요 기술 스택**
    *   **핵심 도구:** Swift, Swift Concurrency (async/await 비동기 처리), UIKit, SwiftUI, Git/GitHub
