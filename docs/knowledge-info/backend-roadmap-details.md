# 백엔드 개발 필수 용어 상세정보

본 문서는 [백엔드 개발 로드맵](/docs/knowledge-info/backend-roadmap)에서 언급된 주요 핵심 용어들에 대한 상세하고 쉬운 설명을 제공합니다. 초보 개발자부터 일반 개발자까지 백엔드의 기반 지식을 탄탄하게 다지는 데 도움이 되도록 작성되었습니다.

---

## 1. 운영체제 및 인프라

### 리눅스(Linux) {#linux}
서버 운영체제의 표준입니다. 윈도우나 맥과 달리 주로 마우스 없이 키보드 명령어(CLI)로 조작하며, 무료이면서 가볍고 매우 안정적이기 때문에 전 세계 대부분의 백엔드 서버가 리눅스 위에서 구동됩니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

---

## 2. 네트워크와 통신

### OSI 7계층 {#osi-7}
컴퓨터 간 통신 과정을 7개의 단계로 나눈 국제 표준 모델입니다. 문제가 생겼을 때 "어느 계층에서 문제가 발생했는가?"(예: 물리적 선이 끊겼는지, 응용 프로그램 오류인지)를 빠르게 파악하기 위한 지도 역할을 합니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### DNS(Domain Name System) {#dns}
인터넷의 '전화번호부'입니다. 사람이 기억하기 쉬운 도메인 이름(예: `google.com`)을 컴퓨터가 이해할 수 있는 IP 주소(예: `142.250.190.46`)로 변환해 주는 시스템입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### HTTP 프로토콜 {#http}
클라이언트(브라우저)와 웹 서버 간에 데이터를 주고받기 위한 통신 규칙(언어)입니다. '요청(Request)'과 '응답(Response)'의 형태로 이루어지며, 웹을 작동시키는 가장 핵심적인 규약입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

---

## 3. 웹 서버와 애플리케이션 서버

### 웹서버 {#web-server}
클라이언트의 HTTP 요청을 받아 HTML, CSS, 이미지 같은 '정적인(변하지 않는) 파일'을 매우 빠르게 제공하는 문지기 역할을 하는 소프트웨어입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### Nginx {#nginx}
현재 전 세계에서 가장 많이 쓰이는 웹 서버입니다. 비동기 이벤트 기반 구조를 사용하여, 동시에 수만 명의 접속자가 몰려도 적은 메모리로 빠르고 안정적으로 처리할 수 있는 것이 특징입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### Apache {#apache}
Nginx 이전에 시장을 주도하던 전통적이고 강력한 웹 서버입니다. 다양한 확장 모듈을 제공하여 호환성과 안정성이 매우 뛰어나지만, 대규모 동시 접속 처리에는 Nginx보다 상대적으로 무겁다는 평가를 받습니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### WAS (Web Application Server) {#was}
웹 서버가 정적 파일을 처리한다면, WAS는 DB에서 데이터를 조회하거나 비즈니스 로직을 계산하여 '동적인(사용자마다 다른) 페이지'를 만들어내는 역할을 합니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### Tomcat {#tomcat}
자바(Java) 진영에서 가장 대표적으로 사용되는 WAS입니다. 스프링(Spring) 프레임워크로 만든 애플리케이션을 실행하기 위한 필수적인 엔진 역할을 합니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

---

## 4. 백엔드 아키텍처 및 언어

### 도메인 주도 설계 (DDD) {#ddd}
소프트웨어의 복잡성을 해결하기 위해, 현실 세계의 비즈니스 영역(도메인 - 예: 주문, 결제, 배송)을 중심으로 코드를 쪼개고 설계하는 방법론입니다. 마이크로서비스(MSA)를 나눌 때 핵심 기준이 됩니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### 메시지 큐(Message Queue) {#message-queue}
서버 간에 데이터를 직접 주고받지 않고, 중간에 우체통(Queue)을 두어 비동기적으로 메시지를 전달하는 시스템입니다. 한 서버가 죽어도 메시지가 보존되며, 트래픽 폭주 시 방파제 역할을 합니다. (Kafka, RabbitMQ 등)
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### FastAPI {#fastapi}
파이썬(Python) 기반의 최신 백엔드 프레임워크입니다. 이름처럼 매우 빠르며, 비동기 처리를 완벽하게 지원하고 API 문서를 자동으로 만들어주어 최근 AI 연동 및 마이크로서비스 개발에 각광받고 있습니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### 동시성(Concurrency) {#concurrency}
수많은 사용자가 '동시에' 같은 데이터(예: 수강신청, 콘서트 티켓 예매)에 접근할 때 발생하는 충돌 문제입니다. 이를 락(Lock)이나 트랜잭션을 통해 안전하게 처리하는 것이 시니어 개발자의 핵심 역량입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

---

## 5. 인프라 및 데브옵스 (DevOps)

### Docker {#docker}
내 컴퓨터, 테스트 서버, 실제 운영 서버 어디서든 똑같은 환경에서 프로그램이 돌아가도록 박스(컨테이너)에 포장해 주는 마법 같은 기술입니다. "내 PC에선 되는데요?"라는 변명을 사라지게 만들었습니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### Kubernetes {#kubernetes}
수십, 수백 개의 Docker 컨테이너들을 자동으로 관리(오케스트레이션)해주는 지휘자입니다. 트래픽이 몰리면 서버를 자동으로 늘리고, 서버가 죽으면 스스로 재시작하는 강력한 기능을 제공합니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### AWS (Amazon Web Services) {#aws}
아마존이 제공하는 세계 1위의 클라우드 컴퓨팅 서비스입니다. 물리적인 서버 장비를 사지 않고도 인터넷을 통해 서버, DB, 스토리지 등을 빌려 쓸 수 있습니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### GCP (Google Cloud Platform) {#gcp}
구글이 제공하는 클라우드 서비스입니다. 유튜브나 구글 검색엔진을 구동하는 기술력을 바탕으로 하며, 특히 빅데이터 분석과 AI/머신러닝 분야에서 강점을 가집니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### Azure {#azure}
마이크로소프트가 제공하는 클라우드 서비스입니다. 윈도우 서버 및 기존 MS 기업용 소프트웨어 환경과의 완벽한 통합을 무기로 기업 시장에서 빠르게 성장 중인 세계 2위 클라우드입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

---

## 6. 모니터링 및 보안

### APM(Application Performance Management) {#apm}
운영 중인 애플리케이션의 성능(응답 속도, 병목 현상, 에러율 등)을 실시간으로 감시하고 시각화해 주는 도구입니다. 의사가 환자의 심전도를 보듯 서버의 건강 상태를 파악하게 해줍니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### API Gateway {#api-gateway}
마이크로서비스 환경에서 수많은 개별 서버로 가는 요청을 가장 앞단에서 받아 정리해 주는 정문 역할을 합니다. 여기서 인증, 라우팅, 트래픽 제한 등을 일괄적으로 처리합니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### SQL Injection {#sql-injection}
해커가 웹사이트 검색창이나 로그인 창에 악의적인 SQL 데이터베이스 명령어를 몰래 끼워 넣어, 비밀번호를 털어가거나 데이터를 삭제하는 대표적인 해킹 기법입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### XSS 공격 (Cross-Site Scripting) {#xss}
해커가 게시판 글이나 댓글에 악성 자바스크립트 코드를 심어, 다른 정상적인 사용자가 그 글을 읽을 때 코드가 실행되게 만들어 세션(로그인) 정보를 탈취하는 공격입니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)

### OAuth 2.0 {#oauth2}
"Google로 로그인하기", "카카오로 로그인하기"의 기반이 되는 글로벌 표준 인증 프로토콜입니다. 내 서비스가 사용자 비밀번호를 직접 보관하지 않고도 안전하게 사용자를 식별하게 해줍니다.
[← 백엔드 개발 로드맵으로 돌아가기](/docs/knowledge-info/backend-roadmap)
