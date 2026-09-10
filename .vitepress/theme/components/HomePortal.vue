<template>
  <div class="home-portal-container">
    <!-- ═══════════════════════════════════════════════════════
         1. 4대 핵심 지식 카테고리 (4 Core Knowledge Pillars)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section">
      <div class="section-header">
        <span class="section-badge">CORE KNOWLEDGE</span>
        <h2 class="section-title">핵심 지식 영역 둘러보기</h2>
        <p class="section-subtitle">개발 실무에 즉시 활용할 수 있는 핵심 지식을 4대 분야로 체계화했습니다.</p>
      </div>

      <div class="pillars-grid">
        <div v-for="pillar in pillars" :key="pillar.id" class="pillar-card" :class="pillar.theme">
          <div class="pillar-icon-box">
            <span class="pillar-icon">{{ pillar.icon }}</span>
          </div>
          <div class="pillar-content">
            <h3 class="pillar-title">{{ pillar.title }}</h3>
            <p class="pillar-desc">{{ pillar.desc }}</p>
            <div class="pillar-links">
              <a v-for="link in pillar.links" :key="link.url" :href="link.url" class="pillar-link-item">
                <span class="link-dot"></span>
                <span class="link-text">{{ link.label }}</span>
                <span class="link-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         2. 엄선된 최신 트렌드 하이라이트 (Curated Trending 4)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section">
      <div class="section-header">
        <span class="section-badge accent">TRENDING SPOTLIGHT</span>
        <h2 class="section-title">지금 가장 주목받는 기술 트렌드</h2>
        <p class="section-subtitle">2025~2026년 개발 생태계를 이끄는 핵심 아키텍처와 AI 기술입니다.</p>
      </div>

      <div class="trending-grid">
        <a v-for="item in trendingItems" :key="item.title" :href="item.link" class="trend-card">
          <div class="trend-card-top">
            <span class="trend-tag" :class="item.tagClass">{{ item.tag }}</span>
            <span class="trend-icon">{{ item.icon }}</span>
          </div>
          <h3 class="trend-card-title">{{ item.title }}</h3>
          <p class="trend-card-desc">{{ item.desc }}</p>
          <div class="trend-card-action">
            <span>문서 바로가기</span>
            <span class="arrow">→</span>
          </div>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         3. 탭형 인터랙티브 위젯 (오늘의 퀴즈 & 나의 학습 진도)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section">
      <div class="interactive-panel">
        <div class="panel-header">
          <div class="panel-tabs">
            <button 
              class="panel-tab-btn" 
              :class="{ active: activeTab === 'quiz' }"
              @click="activeTab = 'quiz'"
            >
              🎯 오늘의 개발 상식 퀴즈
            </button>
            <button 
              class="panel-tab-btn" 
              :class="{ active: activeTab === 'progress' }"
              @click="activeTab = 'progress'"
            >
              📈 나의 지식 학습 진도
            </button>
          </div>
          <span class="panel-hint">※ 모든 데이터는 브라우저 로컬 스토리지에 안전하게 저장됩니다.</span>
        </div>

        <div class="panel-body">
          <transition name="fade" mode="out-in">
            <div v-if="activeTab === 'quiz'" key="quiz" class="tab-content">
              <TodayDevQuiz />
            </div>
            <div v-else key="progress" class="tab-content">
              <LearningProgress />
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         4. 미니멀 플랫폼 통계 바 (Minimal Stats Bar)
         ═══════════════════════════════════════════════════════ -->
    <section class="portal-section stats-section">
      <div class="stats-bar">
        <div v-for="stat in quickStats" :key="stat.label" class="stat-item">
          <div class="stat-num">{{ stat.num }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodayDevQuiz from './TodayDevQuiz.vue'
import LearningProgress from './LearningProgress.vue'

const activeTab = ref('quiz')

// 1. 4대 핵심 지식 카테고리
const pillars = [
  {
    id: 'ai-llm',
    title: 'AI & 최신 세대 LLM 총람',
    desc: 'GPT-6, Claude 5.1, Gemini 3.1 Pro, DeepSeek-V4 등 완전 자율 에이전트와 차세대 MoE 플래그십 분석',
    icon: '🧠',
    theme: 'theme-purple',
    links: [
      { label: '최신 LLM 총람 (GPT-6 / Claude 5.1)', url: '/docs/llm/' },
      { label: 'OpenAI GPT-6 (자율 엔지니어링)', url: '/docs/llm/gpt-6' },
      { label: 'Claude 5.1 (SWE-bench 88.5% 1위)', url: '/docs/llm/claude-5-1' },
      { label: 'Google Gemini 3.1 Pro & 3.8 Flash', url: '/docs/llm/gemini-3-1-pro' },
      { label: 'xAI Grok 4.6 (Colossus 슈퍼컴)', url: '/docs/llm/grok-4-6' },
      { label: '🇨🇳 중국 대표 LLM 11선 (DeepSeek/Qwen)', url: '/docs/llm/#_2-중국-대표-최신-세대-llm-진영-china-leading-ai-models' }
    ]
  },
  {
    id: 'prog-arch',
    title: '언어 & 시스템 아키텍처',
    desc: '모던 프로그래밍 언어 15종 가이드와 대규모 분산 아키텍처, 국내 빅테크 실무 기술 스택',
    icon: '💻',
    theme: 'theme-blue',
    links: [
      { label: '15+ 프로그래밍 언어 가이드', url: '/docs/programming-languages/' },
      { label: '네이버·카카오 등 기업 기술스택', url: '/docs/company-tech-stack' },
      { label: '대규모 분산 시스템 아키텍처', url: '/docs/architecture/' },
      { label: '실무 베스트 프랙티스', url: '/docs/best-practices/' }
    ]
  },
  {
    id: 'backend-db',
    title: '백엔드 & 데이터베이스',
    desc: 'RDBMS부터 Vector DB, NewSQL까지 최신 DB 아키텍처와 엔터프라이즈 백엔드 로드맵',
    icon: '🗄️',
    theme: 'theme-emerald',
    links: [
      { label: '데이터베이스 아키텍처 가이드', url: '/docs/knowledge-info/database' },
      { label: '백엔드 엔지니어링 로드맵', url: '/docs/knowledge-info/backend-roadmap' },
      { label: '프론트엔드 모던 로드맵', url: '/docs/knowledge-info/frontend-roadmap' },
      { label: 'Agentic OS 오케스트레이션', url: '/docs/knowledge-info/agentic-os' }
    ]
  },
  {
    id: 'legal-tools',
    title: 'IT 법률 & 개발자 도구',
    desc: '오픈소스 라이선스, AI 저작권, GDPR 등 필수 법률 정보와 브라우저 내장 클라이언트 DevTools',
    icon: '⚖️',
    theme: 'theme-amber',
    links: [
      { label: '개발자 IT 법률정보 7대 가이드', url: '/docs/legal/' },
      { label: '클라이언트 전용 DevTools', url: '/docs/tools/devtools' },
      { label: 'AI 코딩 도구 & 유용한 도구', url: '/docs/tools/' },
      { label: 'GitHub Stars 글로벌 TOP 30', url: '/docs/collections/github-stars-global' }
    ]
  }
]

// 2. 엄선된 트렌딩 토픽 4선
const trendingItems = [
  {
    tag: 'GLOBAL NO.1 CODING',
    tagClass: 'tag-purple',
    icon: '🏆',
    title: 'Claude 5.1 & Extended Thinking 4.0',
    desc: 'SWE-bench 88.5% 달성, OS 및 IDE 완전 제어와 다중 경로 자가 교정 엔진 탑재',
    link: '/docs/llm/claude-5-1'
  },
  {
    tag: 'AUTONOMOUS AGI',
    tagClass: 'tag-blue',
    icon: '🚀',
    title: 'OpenAI GPT-6 & 자율 에이전트 OS',
    desc: '기획부터 빌드·테스트·배포까지 전 과정을 인간 개입 없이 완결하는 1,000만 토큰 플래그십',
    link: '/docs/llm/gpt-6'
  },
  {
    tag: '1T OPEN SOURCE',
    tagClass: 'tag-emerald',
    icon: '🌟',
    title: 'DeepSeek-V4 & MLA 2.0 아키텍처',
    desc: '1조 파라미터 MoE의 초저비용 구동, KV 캐시 메모리 95% 압축과 완전한 MIT 오픈 가중치',
    link: '/docs/llm/deepseek-v4'
  },
  {
    tag: 'LEGAL & SECURITY',
    tagClass: 'tag-indigo',
    icon: '⚖️',
    title: '오픈소스 라이선스 & AI 저작권',
    desc: 'GPL/MIT 라이선스 의무 고지, 생성형 AI 학습 데이터 저작권 분쟁, 해외 서비스 GDPR 규제 대응',
    link: '/docs/legal/'
  }
]

// 3. 미니멀 통계 지표
const quickStats = [
  { num: '34종', label: '최신 LLM 모델 정밀 분석' },
  { num: '15+', label: '프로그래밍 언어 가이드' },
  { num: '120선', label: '엄선된 오픈소스 컬렉션' },
  { num: '100%', label: '클라이언트 로컬 보안 준수' }
]
</script>

<style scoped>
.home-portal-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* ═══════════════════════════════════════════════════════
   공통 섹션 헤더
   ═══════════════════════════════════════════════════════ */
.section-header {
  margin-bottom: 1.75rem;
}

.section-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  margin-bottom: 0.5rem;
}

.section-badge.accent {
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.12);
}

.section-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem 0;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ═══════════════════════════════════════════════════════
   1. 4대 핵심 지식 기둥 (Pillars Grid)
   ═══════════════════════════════════════════════════════ */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pillar-card {
  position: relative;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 1.75rem;
  display: flex;
  gap: 1.25rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, box-shadow;
}

.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.dark .pillar-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.pillar-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
}

.theme-purple:hover { border-color: rgba(139, 92, 246, 0.4); }
.theme-blue:hover { border-color: rgba(59, 130, 246, 0.4); }
.theme-emerald:hover { border-color: rgba(16, 185, 129, 0.4); }
.theme-amber:hover { border-color: rgba(245, 158, 11, 0.4); }

.pillar-content {
  flex: 1;
  min-width: 0;
}

.pillar-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.pillar-desc {
  margin: 0 0 1rem 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.pillar-links {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.pillar-link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  transition: all 0.15s ease;
  padding: 0.2rem 0;
}

.pillar-link-item:hover {
  color: var(--vp-c-brand-2);
  transform: translateX(3px);
}

.link-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.6;
}

.link-arrow {
  margin-left: auto;
  font-size: 0.8rem;
  opacity: 0.4;
  transition: opacity 0.15s, transform 0.15s;
}

.pillar-link-item:hover .link-arrow {
  opacity: 1;
  transform: translateX(2px);
}

/* ═══════════════════════════════════════════════════════
   2. 트렌딩 스포트라이트 (Trending Grid)
   ═══════════════════════════════════════════════════════ */
.trending-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .trending-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .trending-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.trend-card {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  text-decoration: none !important;
  transition: all 0.25s ease;
}

.trend-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.dark .trend-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.trend-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
}

.trend-tag {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.tag-purple { color: #8b5cf6; background: rgba(139, 92, 246, 0.1); }
.tag-blue { color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
.tag-indigo { color: #6366f1; background: rgba(99, 102, 241, 0.1); }
.tag-emerald { color: #10b981; background: rgba(16, 185, 129, 0.1); }

.trend-icon {
  font-size: 1.25rem;
}

.trend-card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.trend-card-desc {
  margin: 0 0 1.25rem 0;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  flex: 1;
}

.trend-card-action {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.trend-card:hover .trend-card-action .arrow {
  transform: translateX(3px);
}

.arrow {
  transition: transform 0.15s ease;
}

/* ═══════════════════════════════════════════════════════
   3. 탭형 인터랙티브 패널 (Interactive Panel)
   ═══════════════════════════════════════════════════════ */
.interactive-panel {
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.panel-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  gap: 0.75rem;
}

.panel-tabs {
  display: flex;
  gap: 0.5rem;
}

.panel-tab-btn {
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.panel-tab-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.panel-tab-btn.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.panel-hint {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.panel-body {
  padding: 1.5rem;
}

.tab-content {
  width: 100%;
}

/* 트랜지션 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ═══════════════════════════════════════════════════════
   4. 미니멀 플랫폼 통계 바 (Stats Bar)
   ═══════════════════════════════════════════════════════ */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

@media (min-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-num {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.02em;
  margin-bottom: 0.2rem;
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
</style>
