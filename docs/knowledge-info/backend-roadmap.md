# 백엔드 개발에 대한 정보 (로드맵 및 심층 가이드)

백엔드 개발은 클라이언트(웹 브라우저, 모바일 앱 등)의 요청을 처리하고, 비즈니스 로직을 수행하며, 데이터를 영구적으로 저장하는 서버 사이드(Server-side) 영역입니다.

본 가이드는 [요즘IT: 누구도 알려주지 않는 백엔드 로드맵](https://yozm.wishket.com/magazine/detail/2064/) 아티클의 기본 지식을 요약하고, 그에 더해 **현업 시니어 전문 개발자의 관점에서 반드시 알아야 할 대규모/고성능 시스템 아키텍처**를 심층적으로 다룹니다.

---

## 1. 백엔드 개발 기본 로드맵 (아티클 요약)

백엔드 개발자가 되기 위해 넓고 얕게 알아야 하는 필수 지식 체계입니다.

- **운영체제 및 인프라**: 백엔드 서버는 24시간 꺼지지 않는 [리눅스(Linux)](/docs/knowledge-info/backend-roadmap-details#linux) 환경에서 구동됩니다. CLI(Command-Line Interface) 환경에 익숙해져야 하며, 기본 리눅스 명령어와 Vim 등의 에디터를 다룰 줄 알아야 합니다.
- **네트워크 프로토콜**: 클라이언트와 서버, 서버와 서버 간의 통신은 주로 [HTTP 프로토콜](/docs/knowledge-info/backend-roadmap-details#http)을 사용합니다. HTTP 메서드(GET, POST 등)의 역할, [DNS(Domain Name System)](/docs/knowledge-info/backend-roadmap-details#dns), IP, [OSI 7계층](/docs/knowledge-info/backend-roadmap-details#osi-7)에 대한 이해가 필수적입니다.
- **서버의 역할 (Web Server vs WAS)**:
  - **[웹서버](/docs/knowledge-info/backend-roadmap-details#web-server)([Nginx](/docs/knowledge-info/backend-roadmap-details#nginx), [Apache](/docs/knowledge-info/backend-roadmap-details#apache))**: 이미지, HTML 등 정적인 파일을 클라이언트에게 매우 빠르게 전달합니다.
  - **[WAS (Web Application Server)](/docs/knowledge-info/backend-roadmap-details#was)**: 클라이언트의 요청에 따라 데이터를 가공하고 동적인 로직을 실행합니다. ([Tomcat](/docs/knowledge-info/backend-roadmap-details#tomcat) 등)
- **데이터베이스와 캐시**: 영구적인 데이터 보관을 위해 DB를 사용하며, 자주 찾는 데이터는 메모리 기반의 캐시(Cache)에 저장하여 응답 속도를 비약적으로 높입니다.
- **개발 언어와 프레임워크**: Java(Spring Boot), Python(Django/[FastAPI](/docs/knowledge-info/backend-roadmap-details#fastapi)), Node.js(NestJS), Go 등 비즈니스 요구사항에 맞는 언어와 프레임워크를 선택합니다.
- **버전 관리 및 배포**: Git/GitHub을 통한 소스코드 형상 관리 및 Pull Request(PR) 협업, [Docker](/docs/knowledge-info/backend-roadmap-details#docker) 및 [Kubernetes](/docs/knowledge-info/backend-roadmap-details#kubernetes)를 이용한 컨테이너 기반 배포와 테스트 환경(CI/CD) 구축이 요구됩니다.

> **💡 개발자의 라이프사이클**: 
> 과제 할당 → 과제 분석 → 로직 개발 → 단위/통합 테스트 → QA → 배포 → 유지보수

---

## 2. 전문 개발자 관점의 심화 아키텍처 가이드 (Beyond the Basics)

단순히 코드를 짜고 서버를 띄우는 것을 넘어, 수십만 트래픽을 감당하는 시스템을 설계하고 운영하기 위해 전문 백엔드 개발자가 갖추어야 할 시야입니다.

### 2.1 마이크로서비스 아키텍처 (MSA) 및 비동기 처리
- **[도메인 주도 설계 (DDD)](/docs/knowledge-info/backend-roadmap-details#ddd)**: 방대한 시스템을 결제, 회원, 상품 등 의미 있는 도메인 단위로 쪼개어 각각 독립적인 서버(서비스)로 구축해야 합니다.
- **[메시지 큐(Message Queue)](/docs/knowledge-info/backend-roadmap-details#message-queue)**: 서비스 간 강한 결합(Coupling)을 피하기 위해 **Kafka, RabbitMQ, SQS** 등을 도입합니다. 예를 들어 주문 서버가 결제 서버를 직접 호출하는 대신, 주문 완료 이벤트를 Kafka에 던지면 결제 서버가 이를 비동기적으로 가져가서 처리하는 이벤트 기반 아키텍처(EDA)를 설계해야 병목과 장애 전파를 막을 수 있습니다.

### 2.2 클라우드 네이티브와 인프라 자동화 (IaC)
- 서버를 마우스로 직접 클릭해서 띄우는 시대는 지났습니다. **Terraform, AWS CloudFormation, Ansible** 등의 코드로 된 인프라(Infrastructure as Code) 도구를 사용하여 동일한 서버 환경을 몇 초 만에 복제하고 삭제할 수 있어야 합니다.
- [AWS](/docs/knowledge-info/backend-roadmap-details#aws), [GCP](/docs/knowledge-info/backend-roadmap-details#gcp), [Azure](/docs/knowledge-info/backend-roadmap-details#azure)가 제공하는 관리형 서비스(RDS, S3, ElastiCache 등)의 한계와 비용 구조를 명확히 이해하고, 벤더 종속성을 최소화하는 아키텍처를 고민해야 합니다.

### 2.3 성능 최적화(Tuning)와 데이터베이스 딥다이브
- **DB 쿼리 최적화**: ORM(JPA, Prisma 등)이 만들어내는 N+1 문제 같은 비효율적 쿼리를 찾아내고, 적절한 복합 인덱스(Index) 설계와 실행 계획(Explain) 분석을 통해 슬로우 쿼리를 박멸해야 합니다.
- **분산 환경의 데이터 정합성**: 서버가 여러 대일 때 발생하는 [동시성(Concurrency)](/docs/knowledge-info/backend-roadmap-details#concurrency) 문제를 해결하기 위해 Redis 분산 락(Distributed Lock), 비관적/낙관적 락(Pessimistic/Optimistic Lock), 트랜잭션 격리 수준(Isolation Level)을 완벽히 이해해야 합니다.

### 2.4 관측 가능성 (Observability) 및 모니터링
- 에러가 발생했을 때 서버에 접속해서 로그 파일을 읽는 것은 하수입니다.
- **[APM(Application Performance Management)](/docs/knowledge-info/backend-roadmap-details#apm)**: Datadog, Prometheus, Grafana, ELK(Elasticsearch, Logstash, Kibana) 스택을 연동해 모든 서버의 로그, 메트릭, 분산 추적(Distributed Tracing) 데이터를 대시보드에 통합하고, 장애 발생 시 자동으로 Slack 등으로 알람이 가도록 구성해야 합니다.

### 2.5 보안 원칙의 내재화 (DevSecOps)
- API 엔드포인트를 열 때마다 [OAuth 2.0](/docs/knowledge-info/backend-roadmap-details#oauth2), JWT 기반의 인증(Authentication)과 인가(Authorization)를 검증합니다.
- 외부에서 들어오는 파라미터는 무조건 불신하며, [SQL Injection](/docs/knowledge-info/backend-roadmap-details#sql-injection)과 [XSS 공격](/docs/knowledge-info/backend-roadmap-details#xss)을 프레임워크 단에서 방어합니다. 
- 대량의 트래픽을 유발하는 디도스(DDoS) 공격이나 무차별 대입 공격에 대비해 [API Gateway](/docs/knowledge-info/backend-roadmap-details#api-gateway)에서 Rate Limiting(요청 횟수 제한)을 설정해야 합니다.
