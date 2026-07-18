<template>
  <div v-if="showButtons" class="doc-action-container">
    <!-- 인쇄/PDF 저장 시 본문 최상단에 자동 출력될 출처 블록 (일반 화면에서는 숨김) -->
    <div class="print-source-info">
      <div class="print-source-header">📢 본 기술 문서는 <b>개발자를 위한 지식DB</b> 아카이브 자료입니다.</div>
      <div class="print-source-body">
        <ul>
          <li><b>사이트 출처:</b> 개발자를 위한 지식DB</li>
          <li><b>제공 카테고리:</b> {{ docCategory }}</li>
          <li><b>작성 기준일:</b> 2026년 최신 가이드라인</li>
        </ul>
      </div>
    </div>

    <!-- 일반 브라우저 화면의 액션 버튼 영역 -->
    <div class="doc-action-buttons">
      <!-- 학습 완료 상태 토글 버튼 -->
      <button 
        class="action-btn check-btn" 
        :class="{ 'is-completed': isCurrentPageCompleted }" 
        @click="toggleCompletion" 
        :title="isCurrentPageCompleted ? '학습 완료 취소' : '학습 완료로 표시'"
      >
        <svg v-if="isCurrentPageCompleted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <span>{{ isCurrentPageCompleted ? '학습 완료됨' : '학습 완료' }}</span>
      </button>

      <button class="action-btn pdf-btn" @click="printPdf" title="PDF로 저장 / 인쇄">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9V2h12v7"></path>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        <span>PDF 저장</span>
      </button>

      <button class="action-btn md-btn" @click="downloadMarkdown" title="출처가 포함된 원본 마크다운(.md) 파일 다운로드">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Markdown 다운로드</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// 홈 화면(/)이나 메인 인덱스에서는 버튼을 숨김
const showButtons = computed(() => {
  const path = route.path
  return path !== '/' && path !== '/index.html' && path !== ''
})

const isCurrentPageCompleted = ref(false)

const normalizePath = (path) => {
  let p = path;
  if (p.endsWith('.html')) p = p.slice(0, -5);
  if (p.endsWith('index')) p = p.slice(0, -5);
  if (!p.endsWith('/')) p += '/';
  return p.toLowerCase();
}

const getCompletedPages = () => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('dev-knowledge-db-completed')
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

const toggleCompletion = () => {
  if (typeof window === 'undefined') return
  const currentPath = normalizePath(route.path)
  let completed = getCompletedPages()
  
  if (completed.includes(currentPath)) {
    completed = completed.filter(p => p !== currentPath)
    isCurrentPageCompleted.value = false
  } else {
    completed.push(currentPath)
    isCurrentPageCompleted.value = true
  }
  
  localStorage.setItem('dev-knowledge-db-completed', JSON.stringify(completed))
  window.dispatchEvent(new Event('storage-completed-updated'))
}

// 방문 기록 추가 기능
const addToRecentlyViewed = () => {
  if (typeof window === 'undefined') return
  const currentPath = normalizePath(route.path)
  if (currentPath === '/' || currentPath === '/index/' || currentPath.includes('404')) return

  let title = document.title || ''
  if (title.includes(' | ')) {
    title = title.split(' | ')[0]
  }

  let recent = []
  try {
    const data = localStorage.getItem('dev-knowledge-db-recent')
    recent = data ? JSON.parse(data) : []
  } catch (e) {}

  recent = recent.filter(item => item.path !== currentPath)
  recent.unshift({ 
    path: currentPath, 
    title: title || currentPath, 
    date: new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }) 
  })
  
  if (recent.length > 5) recent = recent.slice(0, 5)

  localStorage.setItem('dev-knowledge-db-recent', JSON.stringify(recent))
  window.dispatchEvent(new Event('storage-recent-updated'))
}

// 최종 수정일 강제 재매핑 기능
const updateLastUpdatedDate = () => {
  if (typeof window === 'undefined') return
  
  // 오늘 날짜 기준 계산 (2026년 7월 18일 기준)
  const today = new Date('2026-07-18T00:00:00')
  
  const getFormattedDate = (daysAgo, hours = 10, minutes = 30) => {
    const targetDate = new Date(today.getTime())
    targetDate.setDate(today.getDate() - daysAgo)
    
    const year = String(targetDate.getFullYear()).slice(-2)
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const date = String(targetDate.getDate()).padStart(2, '0')
    
    const isPm = hours >= 12
    const displayHours = hours % 12 === 0 ? 12 : hours % 12
    const displayMinutes = String(minutes).padStart(2, '0')
    const ampm = isPm ? '오후' : '오전'
    
    return `${year}.${month}.${date} ${ampm} ${displayHours}:${displayMinutes}`
  }

  const currentPath = normalizePath(route.path)
  let customDate = ''

  // 1. SourceForge -> 26.07.19 오후 8:16
  if (currentPath.includes('/sourceforge')) {
    customDate = '26.07.19 오후 8:16'
  }
  // 2. 깃허브 스타(국내) -> 오늘날짜 - 1일 (26.07.17)
  else if (currentPath.includes('/github-stars-korea')) {
    customDate = getFormattedDate(1, 14, 25)
  }
  // 3. 깃허브 스타(해외) -> 오늘날짜 - 2일 (26.07.16)
  else if (currentPath.includes('/github-stars-global') || currentPath.includes('/github-stars.html')) {
    customDate = getFormattedDate(2, 11, 40)
  }
  // 4. 나머지 화면에 대한 고유 날짜 매핑 (오늘날짜 - N일)
  else {
    const dateMappings = {
      '/docs/knowledge-info/backend-roadmap': 4, // 백엔드 로드맵
      '/docs/knowledge-info/frontend-roadmap': 5, // 프론트엔드 로드맵
      '/docs/knowledge-info/database': 6, // 데이터베이스 정보
      '/docs/knowledge-info/': 3, // 지식콘텐츠 관리 (대분류)
      '/docs/programming-languages/': 7, // 프로그래밍 언어
      '/docs/domestic/': 8, // 국내 사이트
      '/docs/international/': 9, // 해외 사이트
      '/docs/prompts/': 10, // 개발정보
      '/docs/tools/devtools': 12, // 개발자툴
      '/docs/tools/': 11, // 유용한 도구
      '/docs/architecture/': 13, // 아키텍처
      '/docs/best-practices/': 14, // 베스트 프랙티스
      '/docs/company-tech-stack': 15, // 기업별 기술스택
      '/docs/llm/': 16, // LLM
      '/guidelines/agent': 17, // AI Agent 지침
      '/guidelines/gemini': 18, // Gemini 특화 가이드
      '/guidelines/skill': 19, // 스킬 정의서
      '/guidelines/security': 20, // 보안가이드
      '/templates/prompt-template': 21, // 프롬프트 템플릿
      '/design': 22, // 디자인 및 마크다운
      '/folder-structure': 23, // 폴더 구조 안내
      '/development': 24, // 개발 및 빌드
    }

    let daysAgo = 0
    let found = false
    const sortedKeys = Object.keys(dateMappings).sort((a, b) => b.length - a.length)
    
    for (const key of sortedKeys) {
      if (currentPath.includes(key)) {
        daysAgo = dateMappings[key]
        found = true
        break
      }
    }

    if (found) {
      // 고정적이지만 페이지별로 다른 시간/분 생성
      const hour = (14 + daysAgo) % 12 || 12
      const isPm = (14 + daysAgo) % 24 >= 12
      const min = (25 + daysAgo * 7) % 60
      customDate = getFormattedDate(daysAgo, isPm ? hour + 12 : hour, min)
    } else {
      // 그 외 기타 페이지 기본값
      customDate = getFormattedDate(0, 9, 15)
    }
  }

  // DOM 요소를 찾아 텍스트 교체 (VitePress 렌더링 대기)
  setTimeout(() => {
    const timeEl = document.querySelector('.vp-doc-footer-last-updated .time, .last-updated .time, .vp-doc-footer-last-updated, .last-updated')
    if (timeEl) {
      const timeSpan = timeEl.querySelector('.time') || timeEl
      if (timeSpan) {
        timeSpan.textContent = customDate
      }
    }
  }, 150)
}

// 상태 동기화 함수
const syncState = () => {
  const currentPath = normalizePath(route.path)
  const completed = getCompletedPages()
  isCurrentPageCompleted.value = completed.includes(currentPath)
}

watch(() => route.path, (newPath) => {
  syncState()
  setTimeout(addToRecentlyViewed, 600)
  updateLastUpdatedDate()
}, { immediate: true })

onMounted(() => {
  syncState()
  setTimeout(addToRecentlyViewed, 600)
  updateLastUpdatedDate()
  
  // 외부 초기화 감지
  window.addEventListener('storage-completed-updated', syncState)
})

// 현재 문서의 풀 URL 주소 (출처 표기용)
const currentFullUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://dev-knowledge-db.vercel.app${route.path}`
})

// 문서 대분류 카테고리 추출
const docCategory = computed(() => {
  const path = route.path
  if (path.includes('/programming-languages/')) return '프로그래밍 언어 생태계'
  if (path.includes('/knowledge-info/')) return '개발 지식 콘텐츠'
  if (path.includes('/guidelines/')) return '시스템 가이드라인'
  if (path.includes('/llm/')) return 'LLM 심층 분석 가이드'
  return '개발 지식 정보'
})

// GitHub 원문 Markdown 파일 raw 경로 생성
const mdUrl = computed(() => {
  let path = route.path
  
  if (path.endsWith('.html')) {
    path = path.slice(0, -5)
  }
  
  if (path.endsWith('/')) {
    path += 'index'
  }
  
  return `https://raw.githubusercontent.com/poohaman1/dev-knowledge-db/main${path}.md`
})

// 마크다운 소스 다운로드 기능 (상단에 출처 주석 자동 포함)
const downloadMarkdown = async () => {
  try {
    const response = await fetch(mdUrl.value)
    if (!response.ok) throw new Error('Markdown 소스 획득 실패')
    const originalText = await response.text()
    
    // 출처 헤더 템플릿 생성
    const sourceHeader = `---
출처: 개발자를 위한 지식DB
카테고리: ${docCategory.value}
작성일: 2026년 최신 가이드라인
본 기술 문서는 '개발자를 위한 지식DB' 오픈소스 플랫폼에서 제공하는 지식 콘텐츠입니다.
---

`
    const combinedContent = sourceHeader + originalText
    
    // 파일명 추출
    const urlParts = route.path.split('/')
    let fileName = urlParts[urlParts.length - 1] || 'document'
    if (fileName.endsWith('.html')) {
      fileName = fileName.slice(0, -5)
    }
    if (!fileName || fileName === '') fileName = 'index'
    fileName = `${fileName}.md`
    
    // Blob 파일 다운로드 트리거
    const blob = new Blob([combinedContent], { type: 'text/markdown;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Failed to download markdown with source:', error)
    // 실패 시 raw 깃허브 페이지로 우회 연결
    window.open(mdUrl.value, '_blank')
  }
}

const printPdf = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
/* 인쇄용 출처 정보 스타일 (브라우저에서는 숨김) */
.print-source-info {
  display: none;
}

/* 일반 브라우저 UI */
.doc-action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2) !important;
}

.action-btn:hover {
  color: var(--vp-c-brand-1) !important;
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.check-btn.is-completed {
  background: var(--vp-c-brand-soft) !important;
  border-color: var(--vp-c-brand-1) !important;
  color: var(--vp-c-brand-1) !important;
}

.action-btn svg {
  flex-shrink: 0;
  transition: transform 0.2s;
}

.action-btn:hover svg {
  transform: translateY(1px);
}

.pdf-btn:hover svg {
  transform: scale(1.1);
}

/* ═══════════════════════════════════════════════════════
   인쇄시 출처 박스 인쇄용 미디어 쿼리
   ═══════════════════════════════════════════════════════ */
@media print {
  .print-source-info {
    display: block !important;
    margin-bottom: 2rem;
    padding: 1.2rem;
    border-radius: 8px;
    border: 1px dashed #6366f1;
    background-color: #f9fafb !important;
    color: #1f2937 !important;
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  .print-source-header {
    font-weight: 800;
    color: #4f46e5;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.4rem;
  }

  .print-source-body ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .print-source-body li {
    margin-bottom: 0.25rem;
  }

  .doc-action-buttons {
    display: none !important; /* 액션 버튼은 인쇄에서 제외 */
  }
}

@media (max-width: 768px) {
  .doc-action-buttons {
    justify-content: flex-start;
  }
}
</style>
