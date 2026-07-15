# Antigravity 스킬 정의서 (SKILL.md)

이 문서는 Antigravity IDE 내부에서 활용할 수 있는  **업무 자동화 스킬(Skill)** 을 웹(Web) 프로그램과 앱(App) 프로그램 용도로 분리하여 정의하고 관리하는 지침입니다.

---

## 1. 🌐 웹 자동화 특화 스킬

웹 프로젝트의 빌드, 배포, 테스트 자동화를 위해 구성하는 스킬 구조입니다.

### 대표적인 웹 스킬 예시
- **web-build-and-lint**: `npm run build` 및 `npm run lint`를 순차적으로 실행하여 컴파일 에러와 코드 컨벤션 오류를 한 번에 검출합니다.
- **component-generator**: 입력된 컴포넌트 이름에 따라 React/Vue 파일 구조(tsx, CSS/SCSS, 테스트 파일)를 자동으로 스캐폴딩(Scaffolding)합니다.
- **browser-e2e-test**: Cypress나 Playwright를 백그라운드로 실행하고 브라우저 통합 테스트 결과(성공/실패)를 요약해 줍니다.

### SKILL.md 작성 템플릿 (웹)
```yaml
---
name: web-component-generator
description: 프론트엔드 프로젝트에서 표준 규격의 새로운 UI 컴포넌트(TSX, CSS, Test) 세트를 자동 생성합니다.
---

# 웹 컴포넌트 생성 스킬 가이드

## 필수 입력 조건
- 컴포넌트 이름 (PascalCase)
- 디렉토리 경로 (예: `src/components/ui/`)

## 실행 절차
1. 지정된 경로에 폴더를 생성합니다.
2. `index.tsx`, `style.module.css`, `index.test.tsx` 파일을 템플릿에 맞추어 생성합니다.
3. 생성된 컴포넌트를 부모 `index.ts` (Barrel file)에 export 구문으로 추가합니다.
```

---

## 2. 📱 모바일 자동화 특화 스킬

모바일 개발 시 번거로운 에뮬레이터 실행, 네이티브 빌드, 로그 추출을 자동화하는 스킬 구조입니다.

### 대표적인 앱 스킬 예시
- **app-run-android**: Android Emulator를 부팅하고 `gradlew assembleDebug` 후 에뮬레이터에 앱을 설치 및 실행합니다.
- **app-run-ios**: iOS Simulator를 부팅하고 `pod install` 후 Xcode 빌드를 수행하여 앱을 띄웁니다.
- **fetch-crash-logs**: 연결된 모바일 기기의 크래시 로그(Logcat dump 또는 크래시 리포트)를 추출하여 마크다운 파일로 저장합니다.

### SKILL.md 작성 템플릿 (앱)
```yaml
---
name: app-fetch-logcat
description: 안드로이드 에뮬레이터 또는 디바이스에서 현재 실행 중인 앱의 에러(E/F) 로그만 필터링하여 가져옵니다.
---

# 안드로이드 로그 추출 스킬 가이드

## 필수 입력 조건
- 앱 패키지명 (예: `com.example.myapp`)

## 실행 절차
1. `adb devices` 명령어로 연결된 모바일 기기가 있는지 확인합니다.
2. `adb logcat -d | grep [패키지명]` 명령어를 실행하여 최근 로그를 캡처합니다.
3. 치명적 오류(Exception, FATAL EXCEPTION 등) 키워드가 있는 부분을 추출하여 에이전트의 컨텍스트에 추가합니다.
4. 사용자에게 주요 크래시 원인을 브리핑합니다.
```

---

## 3. 새로운 SKILL 등록 규칙 (공통)

1. 스킬은 `skills/[스킬명]/SKILL.md` 구조로 생성합니다.
2. 각 스킬은 웹/앱 중 어느 환경에 해당하는지 `description`이나 제목에 명시해야 합니다.
3. 스크립트는 가급적 OS 독립적인 파이썬(`python`) 또는 Node.js 스크립트로 작성하여 호환성을 확보합니다.
