# 🗂️ 디렉토리 구조 및 관리 규칙 (FOLDER-STRUCTURE.md)

이 문서는 **Antigravity를 활용한 프로그램 개발**을 위해 권장되는 웹(Web) 및 앱(App) 프로그램의 디렉토리 구조와 관리 규칙을 안내합니다.

---

## 1. 🌐 웹 플랫폼 폴더 구조

웹 프로젝트(React, Vue, Next.js, Vite 등) 개발 시 Antigravity가 이해하고 접근하기 쉬운 표준화된 프론트엔드/백엔드 구조입니다.

```text
/my-web-project
├── src/
│   ├── assets/          # 이미지, 폰트, 글로벌 CSS 등 정적 자원
│   ├── components/      # 재사용 가능한 UI 컴포넌트 (원자 단위)
│   ├── views/ (pages/)  # 라우팅 단위의 페이지 컴포넌트
│   ├── layouts/         # 공통 레이아웃 (Header, Footer, Sidebar 등)
│   ├── hooks/           # 커스텀 훅스 (상태 및 생명주기 로직)
│   ├── store/           # 전역 상태 관리 (Redux, Pinia, Zustand 등)
│   ├── services/ (api/) # API 통신 로직 및 Axios/Fetch 설정
│   ├── utils/           # 날짜 포맷 변환, 유효성 검사 등 헬퍼 함수
│   └── types/           # TypeScript 인터페이스 및 타입 정의
├── public/              # 빌드 시 루트 경로로 복사되는 정적 파일 (favicon 등)
├── .env                 # 환경 변수 설정
├── package.json         # 의존성 및 스크립트 정보
├── vite.config.ts       # 프레임워크별 빌드 설정 (Vite, Webpack 등)
└── README.md            # 웹 프로젝트 개요 및 실행 방법
```

### 웹 프로젝트 관리 규칙
- **컴포넌트 분리**: UI와 비즈니스 로직(Custom Hook)을 철저히 분리하여 렌더링 성능을 최적화합니다.
- **경로 별칭 (Path Alias)**: `import` 지옥을 피하기 위해 `vite.config.ts` 및 `tsconfig.json`에서 `@/` 경로 별칭을 반드시 설정합니다.
- **상태 관리**: 컴포넌트 내부에서만 쓰이는 상태는 `useState`, 여러 뎁스를 넘나드는 상태는 전역 상태 관리 도구를 활용합니다.

---

## 2. 📱 모바일 플랫폼 폴더 구조

모바일 앱(Android, iOS 네이티브 또는 Flutter, React Native 등의 크로스플랫폼) 개발 시 활용되는 권장 구조입니다. 

```text
/my-app-project
├── android/             # Android 네이티브 코드 및 빌드 설정 (Gradle)
│   ├── app/src/main/
│   │   ├── java/        # Kotlin/Java 소스 코드 (액티비티, 프래그먼트)
│   │   ├── res/         # 레이아웃(XML), 드로어블, 밸류, 테마 자원
│   │   └── AndroidManifest.xml # 권한 및 앱 기본 속성 정의
├── ios/                 # iOS 네이티브 코드 및 빌드 설정 (Xcode, CocoaPods)
│   ├── Runner/
│   │   ├── Assets.xcassets/ # 앱 아이콘 및 이미지 리소스
│   │   ├── Info.plist   # 권한 및 앱 메타데이터 정의
│   │   └── AppDelegate.swift
├── src/ (크로스플랫폼)   # 크로스플랫폼 프레임워크 메인 소스
│   ├── screens/         # 앱의 각 화면(Screen) UI
│   ├── navigation/      # 라우터 및 네비게이션 스택 설정
│   ├── components/      # 재사용 가능한 UI 모듈
│   ├── store/           # 전역 상태 관리
│   ├── services/        # 네트워크 및 로컬 DB(SQLite, Room 등) 통신
│   └── theme/           # 앱의 색상, 타이포그래피, 스타일 상수
├── package.json (또는 pubspec.yaml) # 라이브러리 및 패키지 관리
└── App.tsx (또는 main.dart) # 애플리케이션 진입점(Entry Point)
```

### 앱 프로젝트 관리 규칙
- **플랫폼별 분리**: 크로스플랫폼 프레임워크를 사용하더라도 네이티브(Android/iOS) 설정 파일(퍼미션, 아이콘, 스플래시 화면)은 분리하여 관리해야 합니다.
- **메모리 최적화**: 모바일 환경 특성상 메모리 누수 방지를 위해 이벤트 리스너 해제와 무거운 리소스(이미지)의 캐싱을 담당할 폴더를 구분해야 합니다.
- **반응형 제약**: 기기별 노치(Notch) 및 하단 홈 인디케이터에 대응하기 위해 `SafeArea`를 적용한 공통 레이아웃 컴포넌트를 사용합니다.

---

## 3. 공통 규칙 (단일 진실 공급원)

1. **파일 명명 규칙(Naming Convention)**
   - **웹**: 컴포넌트 파일명은 **PascalCase**(`HeaderMenu.tsx`), 유틸/훅스는 **camelCase**(`useAuth.ts`), 설정 파일은 **kebab-case**(`vite.config.ts`)를 지향합니다.
   - **앱**: 모바일 네이티브 레이아웃 파일은 **snake_case**(`activity_main.xml`), 화면 컴포넌트는 **PascalCase**(`LoginScreen.tsx`)를 따릅니다.
2. **SSOT 원칙**: 데이터 구조, API 엔드포인트 상수는 하나의 파일(예: `constants/api.ts`)에서 전역적으로 관리하여 유지보수를 용이하게 합니다.
