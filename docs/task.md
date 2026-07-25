# 작업 명세서 (task.md)

## 개요
1. 상단 메뉴 및 사이드바에 "법률정보" 그룹 메뉴를 추가합니다. ("컬렉션"과 "게임" 사이에 배치)
2. 법률정보 하위에 7개의 서브메뉴(지식재산권, 개인정보보호, 계약·노무, 정보보안, AI 법률, 전자상거래, 국제 규제) 및 관련 마크다운 문서들을 생성하고 세부 콘텐츠를 체계적으로 정리합니다.
3. 각 문서 상단 및 메인 페이지에 법적 면책 고지(Legal Disclaimer) 및 관할권(한국, EU, 미국 등) 표기 체계를 도입합니다.

## 요구사항
1. 상단 네비게이션(`nav`)에 "컬렉션"과 "게임" 사이 "⚖️ 법률정보" 메뉴 배치.
2. 사이드바(`sidebar`)에 "⚖️ 법률정보" 그룹 추가.
3. `docs/legal/index.md` (개요 및 면책 고지, 관할권 안내) 작성.
4. `docs/legal/ip.md` (지식재산권 - IP) 작성.
5. `docs/legal/privacy-data.md` (개인정보보호 및 데이터 규제) 작성.
6. `docs/legal/contracts-labor.md` (계약 및 노무) 작성.
7. `docs/legal/security-compliance.md` (정보보안 및 컴플라이언스) 작성.
8. `docs/legal/ai-legal.md` (AI 및 생성형 AI 관련 법률 이슈) 작성.
9. `docs/legal/ecommerce-operations.md` (전자상거래 및 서비스 운영) 작성.
10. `docs/legal/international-regulations.md` (국제 규제 및 수출입) 작성.
11. 모든 법률 문서 상단에 법률 자문 대체 불가 면책 문구 및 관할권(🇰🇷, 🇪🇺, 🇺🇸, 🌐) 표기 적용.

## 체크리스트
- [x] `docs/legal/index.md` 개요 및 메인 페이지 생성
- [x] `docs/legal/ip.md` 지식재산권 문서 작성
- [x] `docs/legal/privacy-data.md` 개인정보보호 및 데이터 규제 문서 작성
- [x] `docs/legal/contracts-labor.md` 계약 및 노무 문서 작성
- [x] `docs/legal/security-compliance.md` 정보보안 및 컴플라이언스 문서 작성
- [x] `docs/legal/ai-legal.md` AI 법률 이슈 문서 작성
- [x] `docs/legal/ecommerce-operations.md` 전자상거래 및 서비스 운영 문서 작성
- [x] `docs/legal/international-regulations.md` 국제 규제 및 수출입 문서 작성
- [x] `.vitepress/config.mts` 상단 `nav` ("컬렉션"과 "게임" 사이) 및 `sidebar` 설정 반영
- [x] Localhost 환경(`localhost` / `127.0.0.1`) 전용 동일 개발날짜 기준 통합 버전별 개발이력 팝업 모달(`DevHistoryModal.vue`) 추가
- [x] VitePress 빌드 검증 (`npm run docs:build`) 완료
