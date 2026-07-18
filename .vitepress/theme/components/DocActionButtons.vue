<template>
  <div v-if="showButtons" class="doc-action-buttons">
    <button class="action-btn pdf-btn" @click="printPdf" title="PDF로 저장 / 인쇄">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9V2h12v7"></path>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      <span>PDF 저장</span>
    </button>
    <a :href="mdUrl" target="_blank" download class="action-btn md-btn" title="원본 마크다운(.md) 파일 다운로드">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <span>Markdown</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

// 홈 화면(/)이나 메인 인덱스에서는 버튼을 숨김
const showButtons = computed(() => {
  const path = route.path
  return path !== '/' && path !== '/index.html' && path !== ''
})

// GitHub 원문 Markdown 파일 raw 경로 생성
const mdUrl = computed(() => {
  let path = route.path
  
  // .html 확장자 제거
  if (path.endsWith('.html')) {
    path = path.slice(0, -5)
  }
  
  // 디렉터리 루트 경로의 경우 index.md로 매핑
  if (path.endsWith('/')) {
    path += 'index'
  }
  
  return `https://raw.githubusercontent.com/poohaman1/dev-knowledge-db/main${path}.md`
})

const printPdf = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .doc-action-buttons {
    justify-content: flex-start;
  }
}
</style>
