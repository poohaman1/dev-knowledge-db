<template>
  <div class="banner-slider-container">
    <div class="slider-wrapper" ref="sliderRef" @mouseenter="pauseAutoPlay" @mouseleave="startAutoPlay" @touchstart="pauseAutoPlay" @touchend="startAutoPlay">
      <div 
        class="slide-item" 
        v-for="(slide, index) in slides" 
        :key="index"
        :class="{ active: currentSlide === index }"
        @click="goTo(slide.link)"
      >
        <div class="slide-content" :style="{ background: slide.bg }">
          <div class="slide-badge">{{ slide.category }}</div>
          <h2 class="slide-title">{{ slide.icon }} {{ slide.title }}</h2>
          <p class="slide-desc">{{ slide.desc }}</p>
          <div class="slide-action">
            자세히 보기 <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 좌우 이동 화살표 -->
    <button class="nav-btn prev" @click="prevSlide" aria-label="이전 배너">❮</button>
    <button class="nav-btn next" @click="nextSlide" aria-label="다음 배너">❯</button>

    <!-- 하단 도트 인디케이터 -->
    <div class="dots-container">
      <span 
        v-for="(_, index) in slides" 
        :key="index" 
        class="dot" 
        :class="{ active: currentSlide === index }"
        @click="currentSlide = index"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sliderRef = ref(null)
const currentSlide = ref(0)
let autoPlayTimer = null

const slides = [
  {
    category: '🔥 HOT',
    icon: '⭐',
    title: '깃허브 스타 오픈소스 TOP 30',
    desc: '해외·국내 개발자가 만든 깃허브 스타 최상위 프로젝트 30선! 소스코드를 뜯어보고 나만의 서비스로 발전시켜 보세요.',
    link: '/docs/collections/github-stars-global',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.02) 100%)'
  },
  {
    category: '지식 콘텐츠',
    icon: '🗄️',
    title: '데이터베이스 아키텍처 및 가이드',
    desc: 'RDBMS부터 최신 AI 트렌드인 Vector DB, NewSQL까지 아키텍처별 맞춤 DB 선택 기준과 가이드를 확인하세요.',
    link: '/docs/knowledge-info/database',
    bg: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(88, 101, 242, 0.02) 100%)'
  },
  {
    category: '지식 데이터',
    icon: '💻',
    title: '15+ 프로그래밍 언어 생태계',
    desc: '웹, 모바일, AI 개발에 특화된 최신 언어 트렌드와 현업 노하우가 담긴 15종 이상의 상세 언어 가이드를 탐색하세요.',
    link: '/docs/programming-languages/',
    bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.02) 100%)'
  },
  {
    category: '지식 데이터',
    icon: '🏢',
    title: '국내 IT 기업별 기술 스택',
    desc: '네이버, 카카오, 우아한형제들 등 국내 최상위 IT 기업들이 실무에서 채택한 기술 스택과 트렌드를 분석합니다.',
    link: '/docs/company-tech-stack',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%)'
  },
  {
    category: '지식 콘텐츠',
    icon: '🗺️',
    title: '백엔드 개발 로드맵',
    desc: '기초 웹 서버 설계부터 대규모 분산 시스템 아키텍처까지, 전문 백엔드 개발자로 성장하기 위한 단계별 로드맵입니다.',
    link: '/docs/knowledge-info/backend-roadmap',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%)'
  },
  {
    category: '가이드 라인',
    icon: '🤖',
    title: 'AI 에이전트 전용 지침서',
    desc: '실무 개발 자동화를 극대화하는 Antigravity 에이전트 지침과 제로 트러스트 보안 프롬프트 템플릿을 제공합니다.',
    link: '/guidelines/Agent',
    bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.02) 100%)'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(nextSlide, 5000) // 5초마다 슬라이드
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
.banner-slider-container {
  position: relative;
  width: 100%;
  max-width: 1152px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 240px; /* 고정 높이 */
}

@media (min-width: 768px) {
  .slider-wrapper {
    height: 280px;
  }
}

.slide-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease, visibility 0.6s;
  cursor: pointer;
}

.slide-item.active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.slide-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 2.5rem;
  box-sizing: border-box;
}

.slide-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  margin-bottom: 1rem;
}

.slide-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

@media (min-width: 768px) {
  .slide-title {
    font-size: 2rem;
  }
}

.slide-desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 700px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 768px) {
  .slide-desc {
    font-size: 1.1rem;
    -webkit-line-clamp: 3;
  }
}

.slide-action {
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
}

.slide-item:hover .slide-action .arrow {
  transform: translateX(4px);
}

.arrow {
  transition: transform 0.2s ease;
}

/* 네비게이션 버튼 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  opacity: 0; /* 평소엔 숨김 */
  transition: opacity 0.3s, background 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner-slider-container:hover .nav-btn {
  opacity: 0.8;
}

.nav-btn:hover {
  opacity: 1 !important;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.prev { left: 1rem; }
.next { right: 1rem; }

/* 모바일에서는 화살표 항상 숨김 (터치/도트로 조작 유도) */
@media (max-width: 768px) {
  .nav-btn { display: none; }
  .slide-content { padding: 1.5rem; }
}

/* 도트 인디케이터 */
.dots-container {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--vp-c-brand-1);
  width: 24px;
  border-radius: 4px;
}
</style>
