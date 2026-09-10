<template>
  <div class="slim-banner-container">
    <div 
      class="slim-banner-card"
      @mouseenter="pauseAutoPlay" 
      @mouseleave="startAutoPlay"
      @click="goTo(currentSlideData.link)"
    >
      <div class="banner-badge-wrapper">
        <span class="banner-badge">{{ currentSlideData.category }}</span>
      </div>

      <div class="banner-text-content">
        <h3 class="banner-title">
          <span class="banner-icon">{{ currentSlideData.icon }}</span>
          {{ currentSlideData.title }}
        </h3>
        <p class="banner-desc">{{ currentSlideData.desc }}</p>
      </div>

      <div class="banner-controls" @click.stop>
        <button class="ctrl-btn" @click="prevSlide" aria-label="이전 배너">❮</button>
        <span class="slide-indicator">{{ currentSlide + 1 }} / {{ slides.length }}</span>
        <button class="ctrl-btn" @click="nextSlide" aria-label="다음 배너">❯</button>
      </div>

      <div class="banner-action-link">
        <span>살펴보기</span>
        <span class="arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let autoPlayTimer = null

const slides = [
  {
    category: '🧠 NEW GENERATION',
    icon: '🚀',
    title: 'GPT-6 & Claude 5.1 최신 세대 LLM 총람',
    desc: 'GPT-6, Claude 5.1, Gemini 3.1 Pro & 3.8 Flash, DeepSeek-V4, Grok 5 등 완전 자율 에이전트 및 대용량 컨텍스트 심층 분석',
    link: '/docs/llm/'
  },
  {
    category: '⭐ RECOMMENDED',
    icon: '💎',
    title: '글로벌 깃허브 스타 오픈소스 TOP 30',
    desc: '전 세계 최상위 깃허브 스타 프로젝트 30선! 실무 아키텍처 분석과 나만의 서비스 구축 가이드',
    link: '/docs/collections/github-stars-global'
  },
  {
    category: '🤖 AGENTIC SYSTEM',
    icon: '⚡',
    title: 'Agentic OS & AI 에이전트 오케스트레이션',
    desc: 'LLM을 두뇌로 파일 수정, 터미널 명령, 외부 도구(MCP)를 자율 조율하는 차세대 운영체제 가이드',
    link: '/docs/knowledge-info/agentic-os'
  },
  {
    category: '⚖️ COMPLIANCE',
    icon: '🛡️',
    title: '개발자를 위한 IT 법률정보 & 보안 가이드',
    desc: '오픈소스 라이선스 고지 의무, AI 학습 데이터 저작권 분쟁, GDPR 규제 및 클라이언트 보안 수칙',
    link: '/docs/legal/'
  }
]

const currentSlideData = computed(() => slides[currentSlide.value])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(nextSlide, 5000)
}

const pauseAutoPlay = () => {
  if (autoPlayTimer) clearInterval(autoPlayTimer)
}

const goTo = (link) => {
  window.location.href = link
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  pauseAutoPlay()
})
</script>

<style scoped>
.slim-banner-container {
  width: 100%;
  max-width: 1152px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.slim-banner-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 1rem 1.5rem;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.slim-banner-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08);
}

.dark .slim-banner-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .slim-banner-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.banner-badge-wrapper {
  flex-shrink: 0;
}

.banner-badge {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  letter-spacing: 0.04em;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.banner-text-content {
  flex: 1;
  min-width: 0;
}

.banner-title {
  margin: 0 0 0.2rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.banner-icon {
  font-size: 1.1rem;
}

.banner-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.banner-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  background: var(--vp-c-bg-mute);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  padding: 0.15rem 0.35rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.ctrl-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.slide-indicator {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  min-width: 36px;
  text-align: center;
}

.banner-action-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.slim-banner-card:hover .banner-action-link .arrow {
  transform: translateX(3px);
}

.arrow {
  transition: transform 0.2s ease;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .slim-banner-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1.25rem;
  }
  .banner-title, .banner-desc {
    white-space: normal;
  }
  .banner-action-link {
    display: none;
  }
  .banner-controls {
    align-self: flex-end;
  }
}
</style>
