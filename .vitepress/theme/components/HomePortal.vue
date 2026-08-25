<template>
  <div class="home-portal-wrapper">
    <!-- ═══════════════════════════════════════════════════════
         1. 퀵 액세스 허브 (20개 항목 / 2줄)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section hub-section">
      <div class="section-head">
        <div class="badge-row">
          <span class="portal-badge primary">⚡ QUICK ACCESS</span>
        </div>
        <h2 class="section-heading">퀵 액세스 허브</h2>
        <p class="section-desc">자주 찾는 20대 핵심 지식 콘텐츠를 한 번의 클릭으로 빠르게 탐색하세요</p>
      </div>

      <div class="quick-grid">
        <a 
          v-for="(item, idx) in quickItems" 
          :key="idx" 
          :href="item.link" 
          class="quick-card"
          :class="'theme-' + item.theme"
        >
          <span class="quick-icon">{{ item.icon }}</span>
          <span class="quick-label">{{ item.name }}</span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         2. 지금 주목해야 할 기술 트렌드 (8개 항목 / 2줄)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section trend-section">
      <div class="section-head">
        <div class="badge-row">
          <span class="portal-badge hot">🔥 TRENDING 2026</span>
        </div>
        <h2 class="section-heading">지금 주목해야 할 기술 트렌드</h2>
        <p class="section-desc">빠르게 변화하는 개발 생태계에서 놓치지 말아야 할 8대 핵심 기술 키워드</p>
      </div>

      <div class="trend-grid">
        <a 
          v-for="(trend, idx) in trendItems" 
          :key="idx" 
          :href="trend.link" 
          class="trend-card"
        >
          <div class="trend-top">
            <span class="trend-tag" :class="trend.tagClass">{{ trend.tag }}</span>
            <span class="trend-icon">{{ trend.icon }}</span>
          </div>
          <h3 class="trend-title">{{ trend.title }}</h3>
          <p class="trend-desc">{{ trend.desc }}</p>
          <div class="trend-link-text">
            <span>자세히 보기</span>
            <span class="arrow">→</span>
          </div>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         3. 2026 특집 하이라이트 배너
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section feature-spotlight">
      <div class="spotlight-card">
        <div class="spotlight-content">
          <span class="spotlight-badge">🚀 2026 SPECIAL REPORT</span>
          <h3 class="spotlight-title">최신 글로벌·국내 LLM 30선 & Agentic OS 집중 분석</h3>
          <p class="spotlight-desc">
            OpenAI GPT-5.6, Google Gemini 3.7 Flash, DeepSeek-R1, o3-mini부터 LG EXAONE 3.5 및 다중 에이전트 오케스트레이션 Agentic OS까지 실무 개발자를 위한 최신 AI 패러다임을 한눈에 파악하세요.
          </p>
          <div class="spotlight-actions">
            <a href="/docs/llm/" class="btn-primary">🧠 LLM 30선 탐색하기 →</a>
            <a href="/docs/knowledge-info/agentic-os" class="btn-secondary">🤖 Agentic OS 가이드</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         4. 인터랙티브 대시보드 (오늘의 퀴즈 & 나의 학습 진도)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section interactive-section">
      <div class="interactive-grid">
        <div class="interactive-col">
          <TodayDevQuiz />
        </div>
        <div class="interactive-col">
          <LearningProgress />
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         5. 플랫폼 현황 & 지식 아키텍처 요약
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section summary-section">
      <div class="section-head">
        <div class="badge-row">
          <span class="portal-badge">💡 KNOWLEDGE BASE STATS</span>
        </div>
        <h2 class="section-heading">개발자를 위한 통합 지식 플랫폼</h2>
        <p class="section-desc">
          실무에서 마주치는 파편화된 기술 자료, 최신 법률 규제 및 아키텍처 트렌드를 체계적으로 수집·관리합니다.
        </p>
      </div>

      <!-- 핵심 통계 8종 -->
      <div class="stats-grid">
        <div class="stat-box" v-for="(stat, idx) in stats" :key="idx">
          <div class="stat-num">{{ stat.num }}</div>
          <div class="stat-title">{{ stat.label }}</div>
        </div>
      </div>

      <!-- 콘텐츠 및 기술 스택 개요 -->
      <div class="overview-grid">
        <div class="overview-card">
          <div class="overview-header">
            <span class="overview-icon">📚</span>
            <h3>주요 지식 콘텐츠</h3>
          </div>
          <ul class="overview-list">
            <li><b>15종+ 프로그래밍 언어</b> — Python, JS, TypeScript, Rust, Go, Swift 등 심층 가이드</li>
            <li><b>7대 IT 법률 가이드</b> — 오픈소스 라이선스, AI 저작권, 개인정보보호법, SI 도급계약</li>
            <li><b>DB 아키텍처 비교</b> — RDBMS, NoSQL, NewSQL, Vector DB 선택 가이드</li>
            <li><b>기업별 기술스택</b> — 네이버·카카오 등 13개 국내 대표 IT 기업 실무 스택 분석</li>
            <li><b>오픈소스 80선</b> — 해외 20선, 국내 20선, SourceForge, Awesome 오픈소스 분석</li>
            <li><b>개발자 유틸리티</b> — JSON 포맷터, Base64/URL 변환, 정규식, JWT 디코더 (100% 로컬)</li>
          </ul>
        </div>

        <div class="overview-card">
          <div class="overview-header">
            <span class="overview-icon">⚡</span>
            <h3>기술 스택 & 아키텍처</h3>
          </div>
          <ul class="overview-list">
            <li><b>프레임워크</b> — VitePress 1.6 + Vue 3 Composition API 기반 정적 사이트</li>
            <li><b>디자인 시스템</b> — 인디고-바이올렛 모던 테마, 반응형 2줄 그리드 레이아웃</li>
            <li><b>초고속 로컬 검색</b> — 전체 기술 문서 및 키워드 실시간 오프라인 인덱싱</li>
            <li><b>데이터 영속성</b> — 브라우저 localStorage 기반 안전한 무로그인 진도 보관</li>
            <li><b>보안성</b> — 제로 트러스트 기반 로컬 유틸리티 및 클라이언트 사이드 실행</li>
            <li><b>글로벌 배포</b> — Vercel Edge Network 최적화 및 지속적 통합(CI/CD)</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TodayDevQuiz from './TodayDevQuiz.vue'
import LearningProgress from './LearningProgress.vue'

// 1. 퀵 액세스 허브 20개 항목 (10개씩 2줄)
const quickItems = [
  // 1행 (10개)
  { name: '법률정보', icon: '⚖️', link: '/docs/legal/', theme: 'indigo' },
  { name: 'LLM 20선', icon: '🧠', link: '/docs/llm/', theme: 'purple' },
  { name: 'Agentic OS', icon: '🤖', link: '/docs/knowledge-info/agentic-os', theme: 'blue' },
  { name: '언어가이드', icon: '💻', link: '/docs/programming-languages/', theme: 'emerald' },
  { name: '프론트엔드', icon: '🎨', link: '/docs/knowledge-info/frontend-roadmap', theme: 'cyan' },
  { name: '백엔드로드맵', icon: '🗺️', link: '/docs/knowledge-info/backend-roadmap', theme: 'orange' },
  { name: '데이터베이스', icon: '🗄️', link: '/docs/knowledge-info/database', theme: 'indigo' },
  { name: '기업기술스택', icon: '🏢', link: '/docs/company-tech-stack', theme: 'slate' },
  { name: '아키텍처', icon: '🏛️', link: '/docs/architecture/', theme: 'violet' },
  { name: '모범사례', icon: '💡', link: '/docs/best-practices/', theme: 'amber' },

  // 2행 (10개)
  { name: '깃허브스타', icon: '⭐', link: '/docs/collections/github-stars-global', theme: 'amber' },
  { name: '국내오픈소스', icon: '🇰🇷', link: '/docs/collections/github-stars-korea', theme: 'blue' },
  { name: 'SourceForge', icon: '🔥', link: '/docs/collections/sourceforge', theme: 'orange' },
  { name: 'Awesome OSS', icon: '😎', link: '/docs/collections/awesome-open-source', theme: 'purple' },
  { name: '개발자 툴', icon: '🛠️', link: '/docs/tools/devtools', theme: 'emerald' },
  { name: '프롬프트', icon: '💬', link: '/docs/prompts/', theme: 'cyan' },
  { name: '국내 사이트', icon: '🌐', link: '/docs/domestic/', theme: 'indigo' },
  { name: '해외 사이트', icon: '🌍', link: '/docs/international/', theme: 'teal' },
  { name: '미니게임', icon: '🎮', link: '/docs/mini-games/', theme: 'rose' },
  { name: 'AI 지침서', icon: '⚙️', link: '/guidelines/Agent', theme: 'slate' }
]

// 2. 지금 주목해야 할 기술 트렌드 8개 항목 (4개씩 2줄)
const trendItems = [
  {
    tag: 'LEGAL & COMPLIANCE',
    tagClass: 'tag-legal',
    icon: '⚖️',
    title: '개발자를 위한 IT 법률정보',
    desc: '오픈소스 라이선스 고지 의무, AI 학습 데이터 저작권, GDPR, SI 도급계약 및 노무 분쟁까지 7대 법률 가이드',
    link: '/docs/legal/'
  },
  {
    tag: 'AI / LLM',
    tagClass: 'tag-ai',
    icon: '🧠',
    title: '2026 최신 LLM 30선',
    desc: 'GPT-5.6, Gemini 3.7 Flash, DeepSeek-R1, o3-mini부터 Llama 3.3까지 차세대 AI 파운데이션 모델 심층 분석',
    link: '/docs/llm/'
  },
  {
    tag: 'AI / OS',
    tagClass: 'tag-os',
    icon: '🤖',
    title: 'Agentic OS & AI 에이전트',
    desc: 'LLM을 두뇌로 다중 AI 에이전트를 자율 조율하는 차세대 지능형 운영체제 및 오케스트레이션 패러다임',
    link: '/docs/knowledge-info/agentic-os'
  },
  {
    tag: 'WEB & FRONTEND',
    tagClass: 'tag-web',
    icon: '⚛️',
    title: 'React 19 & Next.js 15',
    desc: '서버 컴포넌트(RSC), 스트리밍 SSR, Core Web Vitals 최적화 및 최신 프론트엔드 엔지니어링',
    link: '/docs/knowledge-info/frontend-roadmap'
  },
  {
    tag: 'INFRA & CLOUD',
    tagClass: 'tag-infra',
    icon: '⚡',
    title: '클라우드 인프라 & 엣지',
    desc: 'Cloud Native, Serverless, Edge 컴퓨팅 및 분산 시스템 확장성을 고려한 백엔드 아키텍처 전략',
    link: '/docs/knowledge-info/backend-roadmap'
  },
  {
    tag: 'OPEN SOURCE',
    tagClass: 'tag-oss',
    icon: '⭐',
    title: '오픈소스 & 깃허브 스타',
    desc: '국내외 깃허브 스타 최상위 및 추천 오픈소스 120선(4대 컬렉션 각 30선) 심층 분석 및 실무 활용 팁',
    link: '/docs/collections/github-stars-global'
  },
  {
    tag: 'DATABASE',
    tagClass: 'tag-db',
    icon: '🗄️',
    title: 'Vector DB & 시맨틱 검색',
    desc: 'RDBMS부터 생성형 AI 필수 요소인 벡터 임베딩, 시맨틱 검색 DB 및 분산 데이터 아키텍처',
    link: '/docs/knowledge-info/database'
  },
  {
    tag: 'ARCHITECTURE',
    tagClass: 'tag-arch',
    icon: '🏢',
    title: '기업별 기술스택 & EDA',
    desc: '네이버·카카오 등 빅테크 실무 기술 스택과 이벤트 기반 마이크로서비스(EDA) 모범 사례',
    link: '/docs/company-tech-stack'
  }
]

// 3. 통계 데이터
const stats = [
  { num: '15+', label: '프로그래밍 언어' },
  { num: '7종', label: 'IT 개발자 법률정보' },
  { num: '6+', label: 'DB 아키텍처 분석' },
  { num: '13+', label: '국내 기업 기술스택' },
  { num: '80선', label: '추천 오픈소스' },
  { num: '5종', label: '두뇌회복 미니게임' },
  { num: '20종', label: '2026 최신 LLM 분석' },
  { num: '100%', label: '로컬 데이터 보안' }
]
</script>

<style scoped>
.home-portal-wrapper {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* ════ 공통 섹션 헤더 ════ */
.portal-section {
  display: flex;
  flex-direction: column;
}

.section-head {
  text-align: center;
  margin-bottom: 1.5rem;
}

.badge-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.portal-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.portal-badge.primary {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.25);
}

.portal-badge.hot {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  border-color: rgba(245, 158, 11, 0.25);
}

.section-heading {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem 0;
  letter-spacing: -0.02em;
}

.section-desc {
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ════ 1. 퀵 액세스 허브 (10열 x 2행) ════ */
.hub-section {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 2rem 1.5rem;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.65rem;
}

.quick-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.9rem 0.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-align: center;
}

.quick-card:hover {
  transform: translateY(-3px);
  border-color: #6366f1;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.12);
  background: var(--vp-c-bg-alt);
}

.quick-icon {
  font-size: 1.45rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.quick-card:hover .quick-icon {
  transform: scale(1.15);
}

.quick-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.quick-card:hover .quick-label {
  color: #6366f1;
}

@media (max-width: 1080px) {
  .quick-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 600px) {
  .quick-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  .quick-card {
    padding: 0.75rem 0.2rem;
  }
  .quick-icon {
    font-size: 1.25rem;
  }
  .quick-label {
    font-size: 0.68rem;
  }
}

/* ════ 2. 지금 주목해야 할 기술 트렌드 (4열 x 2행) ════ */
.trend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.trend-card {
  display: flex;
  flex-direction: column;
  padding: 1.35rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.25s ease;
  cursor: pointer;
}

.trend-card:hover {
  transform: translateY(-4px);
  border-color: #6366f1;
  box-shadow: 0 10px 24px rgba(99, 102, 241, 0.08);
  background: var(--vp-c-bg);
}

.trend-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.trend-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.trend-icon {
  font-size: 1.25rem;
}

.trend-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem 0;
  line-height: 1.35;
}

.trend-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.trend-link-text {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #6366f1;
  transition: gap 0.2s ease;
}

.trend-card:hover .trend-link-text .arrow {
  transform: translateX(4px);
}

.arrow {
  transition: transform 0.2s ease;
}

@media (max-width: 960px) {
  .trend-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .trend-grid {
    grid-template-columns: 1fr;
  }
}

/* ════ 3. 스포트라이트 배너 ════ */
.spotlight-card {
  background: linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%);
  border-radius: 16px;
  padding: 2.2rem 2rem;
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.spotlight-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.spotlight-title {
  font-size: 1.55rem;
  font-weight: 800;
  margin: 0 0 0.6rem 0;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.spotlight-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  max-width: 850px;
}

.spotlight-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-block;
  padding: 0.65rem 1.4rem;
  background: #ffffff;
  color: #4f46e5 !important;
  font-weight: 800;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  display: inline-block;
  padding: 0.65rem 1.4rem;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff !important;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 8px;
  text-decoration: none !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* ════ 4. 인터랙티브 대시보드 (퀴즈 & 진도율 2열 배치) ════ */
.interactive-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: stretch;
}

.interactive-col {
  display: flex;
  flex-direction: column;
}

.interactive-col :deep(.quiz-card-container),
.interactive-col :deep(.learning-progress-card) {
  margin: 0 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .interactive-grid {
    grid-template-columns: 1fr;
  }
}

/* ════ 5. 통계 & 플랫폼 개요 ════ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem 0.5rem;
  text-align: center;
}

.stat-num {
  font-size: 1.35rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.2rem;
}

.stat-title {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

@media (max-width: 960px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 520px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.overview-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
}

.overview-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.overview-icon {
  font-size: 1.3rem;
}

.overview-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
}

.overview-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.overview-list li {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  padding-left: 1rem;
  position: relative;
}

.overview-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: bold;
}

.overview-list li b {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
