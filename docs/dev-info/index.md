# 💻 개발정보 (Development Info)

<SecureGuard>

본 페이지는 이 사이트를 개발하기 위해 사용된 환경 정보와, 향후 유사한 사이트를 쉽게 복제 및 응용할 수 있도록 도와주는 **핵심 AI 프롬프트** 모음집입니다.

우측 상단의 복사(Copy) 버튼을 통해 프롬프트를 즉시 재사용할 수 있습니다.

---

## 🛠️ 개발 환경 스택
- **사용된 IDE**: [Antigravity IDE](https://antigravity.dev) (AI 페어 프로그래밍 환경)
- **정적 사이트 제너레이터**: VitePress (Vue 3 기반)
- **언어 및 스타일**: HTML, Markdown, Vue 3 (Composition API), Vanilla CSS
- **핵심 특징**:
  - `localStorage`를 이용한 No-DB 클라이언트 사이드 로깅 구현
  - 외부 API (`ipify`) 및 `.env` 파일 기반의 접근 제어
  - 모던 다크모드/라이트모드 자동 대응 UI 적용

---

## 🚀 개발용 핵심 프롬프트 모음

### 1. 지식정보 XML 관리 및 UI 컴포넌트 생성
정적인 XML 파일을 읽어와서 검색/정렬이 가능한 1줄 리스트 카드 UI로 표시하고, 모달을 통해 새 데이터를 등록하는 프롬프트입니다.

```text
public/data/knowledge-info.xml 파일을 읽어와서 1줄씩 깔끔한 카드 형태로 보여주는 지식정보 관리 UI를 만들어줘.
1. 제목, 사이트명, 요약, 날짜가 포함되어야 하고 검색과 정렬이 가능해야 해.
2. 상단에 '지식정보 등록' 버튼을 누르면 모달 창이 뜨고 URL, 제목 등을 입력받게 해줘.
3. 데이터는 localStorage에 캐시하되, 가져오기/내보내기 기능도 추가해줘.
4. CSS는 최신 글래스모피즘 트렌드를 적용해줘.
```

### 2. 로컬스토리지 기반 웹 애널리틱스 (측정도구) 구현
구글 애널리틱스 등 외부 도구 없이, 자체 라우터 훅과 로컬스토리지를 이용해 사이트 통계 및 타임라인을 구축하는 프롬프트입니다.

```text
VitePress 라우터를 활용해서, 사용자가 페이지를 이동할 때마다 이동 경로(URL) 대신 '페이지 타이틀'과 현재 시각을 localStorage에 저장해줘.
그리고 이 데이터를 기반으로 '총 방문 수', '조회된 고유 페이지', '가장 많이 방문한 페이지(Top 5)', '최근 10건의 방문 타임라인'을 보여주는 멋진 대시보드 Vue 컴포넌트를 작성해줘.
```

### 3. 정적 사이트(Static Site) 접근 제어 로직
정적 웹사이트에서 서버사이드 검증 없이 프론트엔드 환경에서 외부 API를 활용해 IP 제한 및 시크릿 코드 접근을 제어하는 프롬프트입니다.

```text
.env 파일에 VITE_ALLOWED_IPS와 VITE_SECURE_CODE를 세팅했어.
대시보드 Vue 컴포넌트가 마운트될 때 ipify API를 호출해서 내 접속 IP를 확인해줘.
만약 내 IP가 허용된 IP라면 즉시 화면을 띄우고, 허용되지 않았다면 prompt 창을 띄워 Secure Code를 물어봐 줘.
코드를 맞게 입력하면 통과시키고, 틀리거나 취소하면 강제로 '/' (Home)으로 리다이렉트 시키는 보안 코드를 작성해줘.
```

### 4. 딥링크 접근 방지 및 프론트엔드 보안 정책
외부에 특정 폴더(URL)가 직접 공유되는 것을 방지하고 초기 진입 시 무조건 Home으로 보내는 라우팅 프롬프트입니다.

```text
sessionStorage를 활용해서 이 사이트를 처음 접속하는 거라면 무조건 Home('/')으로 강제 리다이렉트 시켜줘.
또한, .vitepress/config.mts 파일의 <head> 설정에 강력한 Content-Security-Policy (CSP) 메타 태그와 X-Frame-Options 설정(클릭재킹 방지)을 추가해서 보안을 강화해줘.
```

---

## ☁️ Vercel 배포 가이드

본 프로젝트는 Vercel을 통해 정적 사이트로 쉽게 배포할 수 있습니다.

1. **GitHub 연동**: Vercel에 로그인 후 GitHub 저장소(`dev-knowledge-db`)를 Import 합니다.
2. **빌드 설정**:
   - Framework Preset: `Vite` (또는 Other)
   - Build Command: `npm run docs:build`
   - Output Directory: `.vitepress/dist`
3. **환경 변수 (Environment Variables)**:
   - 보안 인증 기능을 위해 Vercel 환경 변수에 아래 두 가지를 반드시 등록해야 합니다.
   - `VITE_ALLOWED_IPS`: 허용할 접속 IP 주소 (예: `61.36.35.11`)
   - `VITE_SECURE_CODE`: 허용되지 않은 IP 접근 시 물어볼 시크릿 코드
4. **Deploy**: 설정 완료 후 [Deploy] 버튼을 누르면 배포가 진행됩니다.

</SecureGuard>
