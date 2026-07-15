# 빌드 및 배포 파이프라인 (DEVELOPMENT.md)

이 문서는 Antigravity 환경에서 진행하는 프로젝트의 로컬 환경 설정, 빌드 프로세스, 커밋 규칙 및 자동화된 배포 파이프라인을 **웹(Web)** 과 **앱(App)** 으로 분리하여 가이드합니다.

---

## 1. 🌐 웹 프론트엔드/백엔드 개발 및 배포

### 1.1 로컬 개발 환경
- **패키지 매니저**: 빠르고 안정적인 종속성 관리를 위해 `pnpm` 사용을 적극 권장합니다.
- **개발 서버 구동**: 
  ```bash
  npm install (또는 pnpm install)
  npm run dev (Vite, Next.js 등 프레임워크 구동)
  ```
- **Hot Module Replacement (HMR)**: 파일 저장 시 브라우저가 자동 갱신되므로 실시간으로 UI 변경사항을 확인할 수 있습니다.

### 1.2 빌드 및 최적화
- **정적 빌드**: 배포 전 `npm run build`를 통해 프로덕션용 번들을 생성합니다.
- **최적화 기법**: Antigravity를 통해 Webpack/Vite 설정 파일에 **트리 쉐이킹(Tree Shaking)**, **이미지 지연 로딩**, **번들 사이즈 분석기(Analyzer)** 설정을 추가하여 초기 렌더링 성능(FCP, TTI)을 높입니다.

### 1.3 배포 파이프라인 (CI/CD)
- **추천 호스팅**: 프론트엔드 프로젝트의 경우 **Vercel**, **Netlify**, 또는 **AWS CloudFront + S3** 기반의 배포를 지향합니다.
- **GitHub Actions 연동**: `main` 브랜치에 코드가 푸시되면 자동으로 `npm run build`를 수행하고 Vercel에 배포되도록 `.github/workflows/deploy-web.yml` 파이프라인을 구성합니다.

---

## 2. 📱 모바일 애플리케이션 개발 및 배포

### 2.1 로컬 개발 환경 및 에뮬레이터
- **환경 설정 (Android)**: JDK 17 이상, Android Studio 및 Android SDK가 설치되어 있어야 합니다.
- **환경 설정 (iOS)**: macOS 환경에서 Xcode 및 CocoaPods 설치가 필수입니다.
- **로컬 실행**:
  ```bash
  # Android (에뮬레이터 또는 실기기 연결 상태)
  npx react-native run-android (또는 flutter run)
  
  # iOS (시뮬레이터)
  npx react-native run-ios (또는 flutter run)
  ```

### 2.2 빌드 및 서명 (Code Signing)
앱 배포는 웹과 달리 각 스토어의 인증서 및 서명 파일이 필수적으로 요구됩니다.
- **Android 빌드**: `android/app/build.gradle`에서 버전(versionCode/versionName)을 올리고, Release용 KeyStore를 적용하여 AAB 파일(`gradlew bundleRelease`)을 추출합니다.
- **iOS 빌드**: Apple Developer 계정을 연동한 후, Xcode를 통해 프로비저닝 프로파일을 적용하고 TestFlight용 Archive 번들을 생성합니다.

### 2.3 배포 파이프라인 (CI/CD)
- **추천 툴**: 모바일 배포 자동화에 특화된 **Fastlane** 도입을 적극 권장합니다.
- **자동화 스크립트**: App Store Connect와 Google Play Console API 키를 CI 서버(GitHub Actions, Bitrise 등)에 등록하고, 원클릭으로 베타 버전 배포 및 스토어 스크린샷 캡처를 수행합니다.

---

## 3. 브랜치 전략 및 커밋 규칙 (공통)

안정적인 협업과 버전 관리를 위해 웹/앱 공통으로 아래 규칙을 준수합니다.

### 3.1 브랜치 전략 (Git Flow 기반)
- `main` : 언제든 배포 가능한 상태를 유지 (웹 프로덕션 배포, 앱 스토어 심사 제출본)
- `develop` : 다음 릴리즈를 위해 개발 중인 최신 코드가 모이는 브랜치
- `feature/*` : 개별 기능 개발 (예: `feature/web-login`, `feature/app-push-noti`)
- `hotfix/*` : 운영 서버(또는 라이브 앱)의 긴급 버그 수정

### 3.2 커밋 메시지 규칙 (Conventional Commits)
- `feat:` 새로운 기능 추가
- `fix:` 버그, 오류, UI 깨짐 현상 수정
- `docs:` 현재 문서와 같은 가이드라인이나 README 수정
- `chore:` 빌드 업무, 패키지 매니저(package.json, gradle) 설정 변경 등
- *예시: `feat: [App] 안드로이드 푸시 알림 수신 로직 추가`*
