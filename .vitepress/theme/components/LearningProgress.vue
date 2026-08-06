<template>
  <div class="learning-progress-card">
    <!-- 카드 헤더 -->
    <div class="card-header">
      <div class="header-left">
        <span class="header-icon">📈</span>
        <h3 class="header-title">나의 학습 현황 및 진도율</h3>
      </div>
      <button class="reset-btn" @click="resetAllData" title="학습 진도 및 방문 기록 초기화">
        데이터 초기화
      </button>
    </div>

    <!-- 진도율 프로그레스 바 -->
    <div class="progress-section">
      <div class="progress-info">
        <span class="progress-label">전체 핵심 지식 이수율</span>
        <span class="progress-percentage">{{ completionRate }}% <span class="progress-count">({{ completedCount }} / {{ totalCount }}개)</span></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: completionRate + '%' }"></div>
      </div>
    </div>

    <!-- 탭 전환 네비게이션 -->
    <div class="tabs-nav">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'recent' }"
        @click="activeTab = 'recent'"
      >
        <span>🕒 최근 방문 기록</span>
        <span class="tab-badge">{{ recentPagesList.length }}</span>
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'completed' }"
        @click="activeTab = 'completed'"
      >
        <span>✅ 완료한 지식</span>
        <span class="tab-badge" :class="{ highlight: completedPagesList.length > 0 }">{{ completedPagesList.length }}</span>
      </button>
    </div>

    <!-- 탭 콘텐츠 영역 -->
    <div class="tab-content">
      <!-- 1. 최근 방문 기록 탭 -->
      <div v-if="activeTab === 'recent'" class="list-wrapper">
        <ul v-if="recentPagesList.length > 0" class="record-list">
          <li v-for="page in recentPagesList.slice(0, 5)" :key="page.path" class="record-item">
            <a @click.prevent="navigate(page.path)" href="#" class="record-link">
              <span class="record-dot"></span>
              <span class="record-title">{{ page.title }}</span>
            </a>
            <span class="record-tag recent">{{ page.date }}</span>
          </li>
        </ul>
        <div v-else class="empty-state">
          <span class="empty-icon">📂</span>
          <p class="empty-text">최근에 방문한 문서 기록이 없습니다.<br>원하는 지식 문서를 자유롭게 탐색해보세요!</p>
        </div>
      </div>

      <!-- 2. 완료한 지식 탭 -->
      <div v-else-if="activeTab === 'completed'" class="list-wrapper">
        <ul v-if="completedPagesList.length > 0" class="record-list">
          <li v-for="page in completedPagesList" :key="page.path" class="record-item">
            <a @click.prevent="navigate(page.path)" href="#" class="record-link">
              <span class="record-dot completed"></span>
              <span class="record-title">{{ page.title }}</span>
            </a>
            <span class="record-tag completed">학습 완료</span>
          </li>
        </ul>
        <div v-else class="empty-state">
          <span class="empty-icon">🎯</span>
          <p class="empty-text">
            아직 완료로 체크한 핵심 문서가 없습니다.<br>
            각 문서 상단의 <b>[학습 완료]</b> 버튼을 눌러 달성률을 올려보세요!
          </p>
        </div>
      </div>
    </div>

    <!-- 컴팩트 안내 풋터 -->
    <div class="info-footer">
      <span class="info-badge">🔒 로컬 스토리지 보관</span>
      <span class="info-desc">로그인 없이 브라우저에 안전하게 저장됩니다</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const activeTab = ref('recent')

// 학습을 추적할 핵심 22개 주요 문서 목록 정의
const TRACKABLE_PAGES = [
  { path: '/docs/knowledge-info/backend-roadmap', title: '백엔드 개발 로드맵' },
  { path: '/docs/knowledge-info/frontend-roadmap', title: '프론트엔드 개발 로드맵' },
  { path: '/docs/knowledge-info/database', title: '데이터베이스 정보' },
  { path: '/docs/programming-languages/', title: '프로그래밍 언어 생태계' },
  { path: '/docs/domestic/', title: '국내 개발 사이트' },
  { path: '/docs/international/', title: '해외 개발 사이트' },
  { path: '/docs/prompts/', title: '개발정보 (Dev Info)' },
  { path: '/docs/tools/', title: '유용한 도구 (Tools)' },
  { path: '/docs/architecture/', title: '아키텍처 (Architecture)' },
  { path: '/docs/best-practices/', title: '베스트 프랙티스' },
  { path: '/docs/company-tech-stack', title: '기업별 기술스택' },
  { path: '/docs/llm/', title: 'LLM (대규모 언어 모델)' },
  { path: '/guidelines/Agent', title: 'AI Agent 지침' },
  { path: '/guidelines/GEMINI', title: 'Gemini 특화 가이드' },
  { path: '/guidelines/SKILL', title: '스킬 정의서' },
  { path: '/guidelines/SECURITY', title: '보안가이드' },
  { path: '/templates/PROMPT-TEMPLATE', title: '프롬프트 템플릿' },
  { path: '/DESIGN', title: '디자인 및 마크다운' },
  { path: '/FOLDER-STRUCTURE', title: '폴더 구조 안내' },
  { path: '/DEVELOPMENT', title: '개발 및 빌드' },
  { path: '/docs/collections/github-stars-global', title: '🌍 깃허브 스타(해외)' },
  { path: '/docs/collections/github-stars-korea', title: '🇰🇷 깃허브 스타(국내)' }
]

const completedPaths = ref([])
const recentPagesList = ref([])

const normalizePath = (path) => {
  let p = path;
  if (p.endsWith('.html')) p = p.slice(0, -5);
  if (p.endsWith('index')) p = p.slice(0, -5);
  if (!p.endsWith('/')) p += '/';
  return p.toLowerCase();
}

// 데이터 로드 함수
const loadData = () => {
  if (typeof window === 'undefined') return

  // 1. 완료 데이터 로드
  try {
    const compData = localStorage.getItem('dev-knowledge-db-completed')
    completedPaths.value = compData ? JSON.parse(compData).map(p => normalizePath(p)) : []
  } catch (e) {
    completedPaths.value = []
  }

  // 2. 최근 방문 데이터 로드
  try {
    const recData = localStorage.getItem('dev-knowledge-db-recent')
    recentPagesList.value = recData ? JSON.parse(recData) : []
  } catch (e) {
    recentPagesList.value = []
  }
}

// 전체 개수
const totalCount = computed(() => TRACKABLE_PAGES.length)

// 완료된 핵심 문서 개수
const completedCount = computed(() => {
  return TRACKABLE_PAGES.filter(page => {
    const norm = normalizePath(page.path)
    return completedPaths.value.includes(norm)
  }).length
})

// 진도율 백분율
const completionRate = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

// 완료한 핵심 문서 리스트
const completedPagesList = computed(() => {
  return TRACKABLE_PAGES.filter(page => {
    const norm = normalizePath(page.path)
    return completedPaths.value.includes(norm)
  }).slice(0, 5)
})

// 페이지 이동
const navigate = (path) => {
  router.go(path)
}

// 전체 데이터 초기화
const resetAllData = () => {
  if (typeof window === 'undefined') return
  
  if (confirm('학습 완료 상태 및 최근 방문 기록을 모두 삭제하고 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem('dev-knowledge-db-completed')
    localStorage.removeItem('dev-knowledge-db-recent')
    loadData()
    window.dispatchEvent(new Event('storage-completed-updated'))
    window.dispatchEvent(new Event('storage-recent-updated'))
    alert('모든 학습 데이터가 안전하게 초기화되었습니다.')
  }
}

onMounted(() => {
  loadData()
  if (typeof window !== 'undefined') {
    window.addEventListener('storage-completed-updated', loadData)
    window.addEventListener('storage-recent-updated', loadData)
  }
})
</script>

<style scoped>
.learning-progress-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

/* 카드 헤더 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.reset-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
}

/* 프로그레스 바 */
.progress-section {
  margin-bottom: 1.1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.progress-label {
  color: var(--vp-c-text-2);
}

.progress-percentage {
  color: #6366f1;
  font-weight: 800;
}

.progress-count {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
  margin-left: 0.25rem;
}

.progress-bar-bg {
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
  border-radius: 9999px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 탭 네비게이션 */
.tabs-nav {
  display: flex;
  gap: 0.4rem;
  background: var(--vp-c-bg);
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 1rem;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.5rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #6366f1;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
}

.tab-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.tab-btn.active .tab-badge {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.tab-badge.highlight {
  background: #10b981;
  color: #ffffff;
}

/* 리스트 영역 */
.tab-content {
  flex-grow: 1;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.list-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.record-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.record-item:hover {
  border-color: #6366f1;
  background: var(--vp-c-bg-alt);
}

.record-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  font-size: 0.85rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
  padding-right: 0.5rem;
}

.record-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
  flex-shrink: 0;
}

.record-dot.completed {
  background: #10b981;
}

.record-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-tag {
  font-size: 0.72rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  flex-shrink: 0;
}

.record-tag.recent {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.record-tag.completed {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

/* 빈 상태 */
.empty-state {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  text-align: center;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
}

.empty-icon {
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
}

.empty-text {
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  margin: 0;
}

.empty-text b {
  color: #6366f1;
}

/* 안내 풋터 */
.info-footer {
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
}

.info-badge {
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.info-desc {
  color: var(--vp-c-text-3);
}

@media (max-width: 600px) {
  .info-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
}
</style>
