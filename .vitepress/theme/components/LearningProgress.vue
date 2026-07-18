<template>
  <div class="learning-progress-card">
    <div class="card-header">
      <div class="header-left">
        <span class="header-icon">📈</span>
        <h3>나의 학습 현황 및 진도율</h3>
      </div>
      <button class="reset-btn" @click="resetAllData" title="학습 진도 및 방문 기록 초기화">
        데이터 초기화
      </button>
    </div>

    <!-- 진도율 프로그레스 바 -->
    <div class="progress-section">
      <div class="progress-info">
        <span class="progress-label">전체 핵심 지식 이수율</span>
        <span class="progress-percentage">{{ completionRate }}% ({{ completedCount }} / {{ totalCount }}개)</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: completionRate + '%' }"></div>
      </div>
    </div>

    <div class="lists-grid">
      <!-- 최근 완료한 핵심 지식 -->
      <div class="list-container">
        <h4>✅ 최근 완료한 지식</h4>
        <ul v-if="completedPagesList.length > 0">
          <li v-for="page in completedPagesList" :key="page.path">
            <a @click.prevent="navigate(page.path)" href="#">{{ page.title }}</a>
            <span class="date-tag">완료</span>
          </li>
        </ul>
        <div v-else class="empty-state">
          아직 완료로 체크한 핵심 문서가 없습니다.<br>
          각 문서 상단의 <b>[학습 완료]</b> 버튼을 눌러보세요!
        </div>
      </div>

      <!-- 최근 방문한 문서 -->
      <div class="list-container">
        <h4>🕒 최근 방문 기록</h4>
        <ul v-if="recentPagesList.length > 0">
          <li v-for="page in recentPagesList" :key="page.path">
            <a @click.prevent="navigate(page.path)" href="#">{{ page.title }}</a>
            <span class="date-tag recent">{{ page.date }}</span>
          </li>
        </ul>
        <div v-else class="empty-state">
          최근에 읽은 문서 기록이 없습니다.
        </div>
      </div>
    </div>

    <!-- 로컬 스토리지 안내 영역 -->
    <div class="info-footer">
      <div class="info-icon">💡</div>
      <div class="info-text">
        본 사이트는 회원가입과 로그인 기능이 없으며, 학습 진도 및 방문 기록은 브라우저의 <b>로컬 데이터(localStorage)</b>에만 보관됩니다. 
        브라우저 캐시를 청소하거나 로컬 스토리지를 지우면 데이터가 초기화될 수 있습니다. 
        기록을 완전히 지우고 싶으실 때에는 우측 상단의 <b>[데이터 초기화]</b> 버튼을 이용하십시오.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

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
  }).slice(0, 5) // 최근 완료 5개만 노출
})

// 페이지 이동 (VitePress 라우터 활용)
const navigate = (path) => {
  router.go(path)
}

// 전체 데이터 초기화
const resetAllData = () => {
  if (typeof window === 'undefined') return
  
  if (confirm('학습 완료 상태 및 최근 방문 기록을 모두 삭제하고 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem('dev-knowledge-db-completed')
    localStorage.removeItem('dev-knowledge-db-recent')
    
    // 로컬 상태 갱신
    loadData()
    
    // 이벤트를 브로드캐스팅하여 다른 활성 컴포넌트(예: 본문의 완료 버튼) 동기화
    window.dispatchEvent(new Event('storage-completed-updated'))
    window.dispatchEvent(new Event('storage-recent-updated'))
    alert('모든 학습 데이터가 안전하게 초기화되었습니다.')
  }
}

onMounted(() => {
  loadData()

  // 변경 감지용 이벤트 리스너 추가
  window.addEventListener('storage-completed-updated', loadData)
  window.addEventListener('storage-recent-updated', loadData)
})
</script>

<style scoped>
.learning-progress-card {
  margin: 30px auto;
  max-width: 1152px;
  padding: 24px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(99, 102, 241, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.dark .learning-progress-card {
  background: rgba(23, 23, 30, 0.5);
  backdrop-filter: blur(16px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 1.3rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.reset-btn {
  font-size: 0.75rem;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

/* 프로그레스 바 스타일 */
.progress-section {
  margin-bottom: 24px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.progress-label {
  color: var(--vp-c-text-2);
}

.progress-percentage {
  color: var(--vp-c-brand-1);
}

.progress-bar-bg {
  height: 8px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 99px;
  overflow: hidden;
}

.dark .progress-bar-bg {
  background: rgba(255, 255, 255, 0.08);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-2) 0%, var(--vp-c-brand-1) 100%);
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 그리드 레이아웃 */
.lists-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .lists-grid {
    grid-template-columns: 1fr;
  }
}

.list-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 16px;
  border-radius: 12px;
  min-height: 160px;
}

.list-container h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 6px;
}

.list-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-container li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 0.85rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.list-container li:last-child {
  border-bottom: none;
}

.list-container li a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
}

.list-container li a:hover {
  color: var(--vp-c-brand-1);
}

.date-tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.date-tag.recent {
  background: rgba(0, 0, 0, 0.05);
  color: var(--vp-c-text-2);
}

.dark .date-tag.recent {
  background: rgba(255, 255, 255, 0.05);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 안내 영역 */
.info-footer {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 8px;
}

.info-icon {
  font-size: 1rem;
  margin-top: 2px;
}

.info-text {
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
</style>
