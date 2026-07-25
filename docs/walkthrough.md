# 개발 및 검증 인도서 (walkthrough.md)

## 구현 결과 요약

상단 메뉴의 **"컬렉션"과 "게임" 사이**에 **"⚖️ 법률정보"** 그룹 메뉴 및 서브메뉴가 신규 추가되었으며, 개발자를 위한 7가지 카테고리의 법률/규제 지식DB 문서 구축이 완료되었습니다.

### 1. 상단 네비게이션 및 사이드바 구조
- **위치**: 상단 네비게이션 `💎 컬렉션` ➜ `⚖️ 법률정보` ➜ `🎮 게임`
- **구조**:
  - `⚖️ 법률정보 (그룹 메뉴)`
    - 법률정보 개요 및 면책고지 (`/docs/legal/`)
    - 지식재산권(IP) (`/docs/legal/ip`)
    - 개인정보보호 및 데이터 규제 (`/docs/legal/privacy-data`)
    - 계약 및 노무 (`/docs/legal/contracts-labor`)
    - 정보보안 및 컴플라이언스 (`/docs/legal/security-compliance`)
    - AI 및 생성형 AI 관련 법률 이슈 (`/docs/legal/ai-legal`)
    - 전자상거래 및 서비스 운영 (`/docs/legal/ecommerce-operations`)
    - 국제 규제 및 수출입 (`/docs/legal/international-regulations`)

---

## 신규 생성된 아티팩트 및 문서 목록

| 파일 경로 | 내용 설명 | 적용 관할권 |
| :--- | :--- | :---: |
| `docs/legal/index.md` | 법률정보 지식DB 메인 개요, 면책 고지 및 관할권 기호 안내 | 🌐 종합 |
| `docs/legal/ip.md` | 오픈소스 라이선스 비교, Copyleft 전염성, 고지의무, 특허 vs 저작권, 영업비밀, 직무발명 | 🇰🇷 🇺🇸 🌐 |
| `docs/legal/privacy-data.md` | 개인정보보호법 핵심, 국외이전, GDPR 역외적용, CCPA, 가명/익명정보, 쿠키/트래킹, 유출통지 | 🇰🇷 🇪🇺 🇺🇸 |
| `docs/legal/contracts-labor.md` | SI/용역 도급계약 분쟁, 프리랜서 하도급법, 근로자성 판단, NDA/경업금지, 하자담보책임, 저작권 양도 | 🇰🇷 |
| `docs/legal/security-compliance.md` | 정보통신망법, CSAP 클라우드 인증, 개인정보영향평가(PIA), 화이트해커 면책, ISMS-P 인증 | 🇰🇷 |
| `docs/legal/ai-legal.md` | AI 학습데이터 TDM 면책, AI 생성물 저작권, EU AI Act, 오픈소스 LLM 가중치, AI 책임 | 🇰🇷 🇪🇺 🇺🇸 |
| `docs/legal/ecommerce-operations.md` | 이용약관 필수/무효 조항, 통신판매업, 앱스토어 심사, 웹 접근성, 다크패턴 규제 | 🇰🇷 🌐 |
| `docs/legal/international-regulations.md` | EAR 수출통제/암호화 예외, CLOUD Act/데이터 주권, 국가별 데이터 로컬라이제이션 요건 | 🇰🇷 🇺🇸 🌐 |

---

## 주요 법적/기능적 특징

1. **법적 면책 고지 명시 (Legal Disclaimer)**:
   - 각 마크다운 문서 상단 및 메인 페이지에 "본 자료는 일반 정보 제공용이며 변호사/변리사/노무사의 정식 법률 자문을 대체할 수 없음"을 명시하였습니다.
2. **관할권 표기 체계 (Jurisdiction)**:
   - 🇰🇷 **[한국 기준]**, 🇪🇺 **[EU 기준]**, 🇺🇸 **[미국 기준]**, 🌐 **[국제 기준]** 등 이모지 태그를 사용하여 각 항목별 적용 법령 관할권을 쉽게 구분할 수 있도록 작성했습니다.
3. **Localhost 전용 동일 개발날짜 통합 개발이력 팝업 기능 (`DevHistoryModal.vue`)**:
   - `window.location.hostname`이 `localhost` 또는 `127.0.0.1`인 경우 상단 네비바 우측(Github 아이콘 옆)에 📋 히스토리 아이콘이 노출됩니다.
   - 동일한 개발날짜(예: `2026-07-25`)에 진행된 여러 버전 작업(`v1.4.0` & `v1.3.0`)을 단일 날짜 타임라인 카드로 통합하고 버전별 태그(`[v1.4.0]`, `[v1.3.0]`)와 함께 요약 표시합니다.

4. **공식 법령 원문 가이드**:
   - 국가법령정보센터(`law.go.kr`), EU 법령 포털(`eur-lex.europa.eu`), 미국 `govinfo.gov` 등 원문 확인 사이트를 안내하였습니다.

---

## 실행 및 확인 방법

1. **로컬 개발 서버 확인**:
   ```bash
   npm run docs:dev
   ```
   브라우저에서 `http://localhost:5173` 접속 후 상단 메뉴의 **"컬렉션"과 "게임" 사이**에 위치한 **"법률정보"** 드롭다운 메뉴 및 좌측 사이드바를 확인합니다.

2. **생성물 프로덕션 빌드 검증**:
   ```bash
   npm run docs:build
   ```
   오류 없이 클라이언트/서버 번들 생성 및 페이지 렌더링이 정상 완료되는 것을 보장합니다.
