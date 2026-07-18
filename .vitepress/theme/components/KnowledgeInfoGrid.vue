<template>
  <div class="ki-container">
    <!-- 토스트 알림 -->
    <Transition name="toast">
      <div class="ki-toast" v-if="toastVisible">{{ toastMsg }}</div>
    </Transition>

    <!-- 상단 액션 바 -->
    <div class="ki-topbar">
      <div class="ki-search">
        <svg class="search-svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
        <input type="text" v-model="searchQuery" placeholder="사이트명, 글 제목, 요약으로 검색..." class="search-input" />
        <span v-if="searchQuery" class="search-clear" @click="searchQuery = ''">✕</span>
      </div>
      <div class="ki-actions">
        <label class="btn btn-ghost" title="XML 파일 가져오기">
          📥 가져오기
          <input type="file" accept=".xml" @change="importXml" style="display:none" />
        </label>
        <button class="btn btn-ghost" @click="exportXml" title="현재 데이터를 XML로 내보내기">📤 내보내기</button>
        <button class="btn btn-primary" @click="openRegisterModal">
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
          </svg>
          지식정보 등록
        </button>
      </div>
    </div>

    <!-- 건수 및 정렬 바 -->
    <div class="ki-meta-bar">
      <div class="ki-count">
        총 <strong>{{ filteredList.length }}</strong>건
        <span v-if="searchQuery" class="ki-count-filter"> (검색 결과)</span>
      </div>
      <div class="ki-sort-buttons" v-if="list.length > 0">
        <button class="sort-btn" :class="{ active: sortField === 'siteName' }" @click="setSort('siteName')">
          사이트명 {{ sortIcon('siteName') }}
        </button>
        <button class="sort-btn" :class="{ active: sortField === 'title' }" @click="setSort('title')">
          글 제목 {{ sortIcon('title') }}
        </button>
        <button class="sort-btn" :class="{ active: sortField === 'date' }" @click="setSort('date')">
          등록일자 {{ sortIcon('date') }}
        </button>
      </div>
    </div>

    <!-- 1줄 카드 그리드 리스트 (Modern List Row) -->
    <div class="ki-list-wrap">
      <div v-if="list.length > 0" class="ki-list">
        <div v-for="(item, idx) in sortedAndFilteredList" :key="item.id" class="ki-row-card" :style="{ animationDelay: idx * 0.04 + 's' }">
          
          <!-- 왼쪽 영역: 사이트 칩 + 글 제목 -->
          <div class="ki-col-main">
            <span class="site-chip">{{ item.siteName }}</span>
            <div class="title-container">
              <a :href="item.url" target="_blank" rel="noopener noreferrer" class="title-link" :title="item.title">
                {{ item.title }}
                <svg class="ext-icon" viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- 중간 영역: 한줄 요약 -->
          <div class="ki-col-summary" :title="item.summary || '요약 없음'">
            {{ item.summary || '—' }}
          </div>

          <!-- 오른쪽 영역: 등록 일자 + 관리 버튼 -->
          <div class="ki-col-side">
            <span class="ki-date">{{ item.date }}</span>
            <div class="ki-row-actions">
              <button class="act-btn act-edit" @click="openEditModal(item)" title="수정">
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                수정
              </button>
              <button class="act-btn act-del" @click="handleDelete(item.id)" title="삭제">
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                삭제
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- 빈 상태 -->
      <div class="ki-empty" v-else>
        <div class="ki-empty-icon">
          <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
            <rect x="10" y="18" width="60" height="48" rx="6" stroke="currentColor" stroke-width="2" opacity=".3"/>
            <line x1="22" y1="32" x2="58" y2="32" stroke="currentColor" stroke-width="2" opacity=".2"/>
            <line x1="22" y1="42" x2="50" y2="42" stroke="currentColor" stroke-width="2" opacity=".15"/>
            <line x1="22" y1="52" x2="42" y2="52" stroke="currentColor" stroke-width="2" opacity=".1"/>
            <circle cx="58" cy="58" r="14" fill="var(--vp-c-brand-soft, rgba(99,102,241,.14))" stroke="var(--vp-c-brand-1, #6366f1)" stroke-width="2"/>
            <path d="M54 58h8M58 54v8" stroke="var(--vp-c-brand-1, #6366f1)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>등록된 지식정보가 없습니다</h3>
        <p>상단의 <strong>지식정보 등록</strong> 버튼을 눌러 첫 번째 정보를 추가해 보세요.</p>
      </div>
    </div>

    <!-- 모달 -->
    <Transition name="modal">
      <div class="ki-overlay" v-if="isModalOpen" @click.self="closeModal">
        <div class="ki-modal">
          <div class="ki-modal-head">
            <h2>{{ isEditMode ? '✏️ 지식정보 수정' : '📝 지식정보 등록' }}</h2>
            <button class="ki-close" @click="closeModal">&times;</button>
          </div>
          <form @submit.prevent="handleSubmit" class="ki-form">
            <div class="ki-field-row">
              <div class="ki-field">
                <label>사이트명 <span class="req">*</span></label>
                <input type="text" v-model="form.siteName" placeholder="예: 카카오 기술 블로그" required />
              </div>
              <div class="ki-field">
                <label>등록일자</label>
                <input type="text" v-model="form.date" placeholder="YYYY.MM.DD" />
              </div>
            </div>
            <div class="ki-field">
              <label>URL <span class="req">*</span></label>
              <input type="url" v-model="form.url" placeholder="https://tech.kakao.com/posts/123" required />
            </div>
            <div class="ki-field">
              <label>글 제목 <span class="req">*</span></label>
              <input type="text" v-model="form.title" placeholder="아티클의 제목을 입력하세요" required />
            </div>
            <div class="ki-field">
              <label>한줄요약</label>
              <textarea v-model="form.summary" placeholder="해당 글의 핵심 내용을 한 줄로 요약해 주세요" rows="2"></textarea>
            </div>
            <div class="ki-form-footer">
              <button type="button" class="btn btn-ghost" @click="closeModal">취소</button>
              <button type="submit" class="btn btn-success">{{ isEditMode ? '💾 저장' : '✅ 등록' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const STORAGE_KEY = 'knowledge_info_xml_v6'

const list = ref([])
const isModalOpen = ref(false)
const isEditMode = ref(false)
const activeId = ref(null)
const searchQuery = ref('')
const sortField = ref('date')
const sortDir = ref('desc')
const toastMsg = ref('')
const toastVisible = ref(false)
let toastTimer = null

const form = ref({ siteName: '', url: '', title: '', date: '', summary: '' })

// ─── 토스트 알림 ──────────────────────────────────────────────────────
const showToast = (msg) => {
  toastMsg.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2500)
}

// ─── XML 유틸 ───────────────────────────────────────────────────────────
const listToXml = (items) => {
  const nodes = items.map(item => `  <item>
    <id>${item.id}</id>
    <siteName>${escapeXml(item.siteName)}</siteName>
    <url>${escapeXml(item.url)}</url>
    <title>${escapeXml(item.title)}</title>
    <date>${escapeXml(item.date)}</date>
    <summary>${escapeXml(item.summary)}</summary>
  </item>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<knowledge-info-list>\n${nodes}\n</knowledge-info-list>`
}

const escapeXml = (str) => String(str ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const xmlToList = (xmlStr) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlStr, 'application/xml')
  if (doc.querySelector('parsererror')) return null
  return Array.from(doc.querySelectorAll('item')).map(el => ({
    id: Number(el.querySelector('id')?.textContent ?? Date.now()),
    siteName: el.querySelector('siteName')?.textContent ?? '',
    url: el.querySelector('url')?.textContent ?? '',
    title: el.querySelector('title')?.textContent ?? '',
    date: el.querySelector('date')?.textContent ?? '',
    summary: el.querySelector('summary')?.textContent ?? ''
  }))
}

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, listToXml(list.value))
}

// ─── 초기 로딩 ─────────────────────────────────────────────────────────
onMounted(async () => {
  const cached = localStorage.getItem(STORAGE_KEY)
  if (cached) {
    const parsed = xmlToList(cached)
    if (parsed) { list.value = parsed; return }
  }
  try {
    const res = await fetch('/data/knowledge-info.xml')
    if (res.ok) {
      const text = await res.text()
      const parsed = xmlToList(text)
      if (parsed) {
        list.value = parsed
        saveToStorage()
      }
    }
  } catch (e) {
    list.value = []
  }
})

// ─── 정렬 & 검색 ─────────────────────────────────────────────────────
const filteredList = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list.value
  return list.value.filter(it =>
    it.siteName.toLowerCase().includes(q) ||
    it.title.toLowerCase().includes(q) ||
    it.summary.toLowerCase().includes(q)
  )
})

const sortedAndFilteredList = computed(() => {
  const result = [...filteredList.value]
  result.sort((a, b) => {
    const va = String(a[sortField.value] ?? '').toLowerCase()
    const vb = String(b[sortField.value] ?? '').toLowerCase()
    const cmp = va < vb ? -1 : va > vb ? 1 : 0
    return sortDir.value === 'asc' ? cmp : -cmp
  })
  return result
})

const setSort = (field) => {
  if (sortField.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDir.value = 'asc'
  }
}

const sortIcon = (field) => {
  if (sortField.value !== field) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}

// ─── CRUD ─────────────────────────────────────────────────────────────
const openRegisterModal = () => {
  isEditMode.value = false
  activeId.value = null
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  form.value = { siteName: '', url: '', title: '', date: `${yyyy}.${mm}.${dd}`, summary: '' }
  isModalOpen.value = true
}

const openEditModal = (item) => {
  isEditMode.value = true
  activeId.value = item.id
  form.value = { ...item }
  isModalOpen.value = true
}

const closeModal = () => { isModalOpen.value = false }

const handleSubmit = () => {
  if (!form.value.siteName || !form.value.url || !form.value.title) {
    showToast('⚠️ 사이트명, URL, 글 제목은 필수 입력 사항입니다.')
    return
  }
  if (isEditMode.value) {
    const idx = list.value.findIndex(it => it.id === activeId.value)
    if (idx !== -1) list.value[idx] = { ...form.value, id: activeId.value }
    showToast('✅ 지식정보가 수정되었습니다.')
  } else {
    list.value.push({ ...form.value, id: Date.now() })
    showToast('✅ 지식정보가 등록되었습니다.')
  }
  saveToStorage()
  closeModal()
}

const handleDelete = (id) => {
  if (confirm('해당 지식정보를 삭제하시겠습니까?')) {
    list.value = list.value.filter(it => it.id !== id)
    saveToStorage()
    showToast('🗑️ 지식정보가 삭제되었습니다.')
  }
}

// ─── XML 내보내기 / 가져오기 ──────────────────────────────────────────
const exportXml = () => {
  const xml = listToXml(list.value)
  const blob = new Blob([xml], { type: 'application/xml' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `knowledge-info-${new Date().toISOString().substring(0,10)}.xml`
  a.click()
  URL.revokeObjectURL(a.href)
  showToast('📤 XML 파일을 내보냈습니다.')
}

const importXml = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    const parsed = xmlToList(ev.target.result)
    if (!parsed) {
      showToast('⚠️ 올바른 XML 형식이 아닙니다.')
      return
    }
    if (confirm(`${parsed.length}건의 데이터를 가져옵니다. 기존 데이터를 덮어씌울까요?`)) {
      list.value = parsed
      saveToStorage()
      showToast(`📥 ${parsed.length}건의 데이터를 가져왔습니다.`)
    }
  }
  reader.readAsText(file, 'UTF-8')
  e.target.value = ''
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   지식정보 그리드 — 1줄 카드 리스트형 프리미엄 리디자인 (라이트/다크 대응)
   ═══════════════════════════════════════════════════════ */

/* ── 컨테이너 ── */
.ki-container {
  margin-top: 1.5rem;
  position: relative;
  font-family: var(--vp-font-family-base);
}

/* ── 토스트 알림 ── */
.ki-toast {
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 500;
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-brand-1, #6366f1);
  color: var(--vp-c-text-1, #3c3c43);
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.dark .ki-toast {
  background: rgba(17, 17, 24, 0.92);
  color: #e8eaed;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}

.toast-enter-active { animation: toastIn 0.35s cubic-bezier(0.16,1,0.3,1); }
.toast-leave-active { animation: toastOut 0.25s ease forwards; }
@keyframes toastIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
@keyframes toastOut { to { opacity: 0; transform: translateX(40px); } }

/* ── 상단 바 ── */
.ki-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: nowrap;
}

.ki-search {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
  border-radius: 12px;
  padding: 0 0.9rem;
  height: 42px;
  flex: 1;
  min-width: 150px;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.ki-search:focus-within {
  border-color: var(--vp-c-brand-1, #6366f1);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.search-svg {
  opacity: 0.5;
  color: var(--vp-c-text-2, #3c3c43);
  flex-shrink: 0;
}

.search-input {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  color: var(--vp-c-text-1, #3c3c43) !important;
  font-size: 0.88rem !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: none !important;
}
.dark .search-input {
  color: var(--vp-c-text-1, #e8eaed) !important;
}

.search-input::placeholder {
  color: var(--vp-c-text-2) !important;
  opacity: 0.55;
}

.search-clear {
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.5;
  color: var(--vp-c-text-2);
  transition: opacity 0.15s;
  padding: 0.2rem;
}
.search-clear:hover { opacity: 1; }

.ki-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── 버튼 ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0 1.1rem;
  height: 42px;
  font-size: 0.84rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  box-sizing: border-box;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff !important;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}
.btn-primary svg {
  fill: #fff !important;
}

.btn-ghost {
  background: var(--vp-c-bg-mute, #f6f6f7);
  color: var(--vp-c-text-1, #3c3c43);
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
}
.btn-ghost:hover {
  background: var(--vp-c-bg-soft, #eef0f2);
  border-color: rgba(99,102,241,0.25);
  color: var(--vp-c-brand-1, #6366f1);
}
.dark .btn-ghost {
  background: var(--vp-c-bg-mute, #1e1e28);
  color: var(--vp-c-text-1, #e8eaed);
  border-color: var(--vp-c-divider);
}
.dark .btn-ghost:hover {
  background: var(--vp-c-bg-soft, #17171e);
  border-color: rgba(99,102,241,0.25);
}

/* ── 건수 및 정렬 영역 ── */
.ki-meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
  padding: 0 0.25rem;
}

.ki-count {
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
}
.ki-count strong {
  color: var(--vp-c-brand-1, #6366f1);
  font-size: 0.95rem;
}
.ki-count-filter {
  opacity: 0.75;
  font-size: 0.8rem;
}

.ki-sort-buttons {
  display: flex;
  gap: 0.35rem;
}

.sort-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.sort-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute, #f6f6f7);
}
.dark .sort-btn:hover {
  background: var(--vp-c-bg-mute, #1e1e28);
}
.sort-btn.active {
  color: var(--vp-c-brand-1, #6366f1);
  background: var(--vp-c-brand-soft, rgba(99,102,241,0.08));
  border-color: rgba(99, 102, 241, 0.15);
  font-weight: 600;
}

/* ── 1줄 리스트 뷰포트 (Modern List Row Grid) ── */
.ki-list-wrap {
  display: flex;
  flex-direction: column;
}

.ki-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

/* 1줄 카드 행 */
.ki-row-card {
  display: grid;
  grid-template-columns: 4.5fr 4fr 1.5fr;
  align-items: center;
  padding: 0.85rem 1.15rem;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
  border-radius: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.dark .ki-row-card {
  background: var(--vp-c-bg-soft, #17171e);
  border-color: var(--vp-c-divider, rgba(255,255,255,0.06));
}

.ki-row-card:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.35);
  background: rgba(99, 102, 241, 0.02);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.05);
}
.dark .ki-row-card:hover {
  background: rgba(99, 102, 241, 0.03);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.06);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

/* 컬럼 1: 메인 영역 (사이트 칩 + 글 제목) */
.ki-col-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 0;
}

.site-chip {
  flex-shrink: 0;
  display: inline-block;
  padding: 0.25rem 0.65rem;
  background: var(--vp-c-brand-soft, rgba(99,102,241,0.08));
  color: var(--vp-c-brand-1, #6366f1);
  border-radius: 20px;
  font-size: 0.74rem;
  font-weight: 700;
  white-space: nowrap;
}
.dark .site-chip {
  background: var(--vp-c-brand-soft, rgba(99,102,241,0.14));
  color: var(--vp-c-brand-2, #818cf8);
}

.title-container {
  min-width: 0;
  flex: 1;
}

.title-link {
  color: var(--vp-c-text-1, #2c3e50) !important;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.15s;
}
.dark .title-link {
  color: var(--vp-c-text-1, #e8eaed) !important;
}

.title-link:hover {
  color: var(--vp-c-brand-1, #6366f1) !important;
  text-decoration: none;
}

.ext-icon {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.2rem;
  opacity: 0.35;
  flex-shrink: 0;
  transition: opacity 0.15s;
  fill: currentColor;
}
.title-link:hover .ext-icon {
  opacity: 0.85;
}

/* 컬럼 2: 한줄 요약 영역 */
.ki-col-summary {
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #4e5968);
  padding: 0 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
}
.dark .ki-col-summary {
  color: var(--vp-c-text-2, #9ca3af);
}

/* 컬럼 3: 날짜 및 관리 버튼 영역 */
.ki-col-side {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  flex-shrink: 0;
}

.ki-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.ki-row-actions {
  display: flex;
  gap: 0.3rem;
  opacity: 0.35;
  transition: opacity 0.2s ease;
}

.ki-row-card:hover .ki-row-actions {
  opacity: 1;
}

/* 미니 관리 버튼 */
.act-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  white-space: nowrap;
  font-family: inherit;
}

.act-edit {
  color: var(--vp-c-brand-1, #6366f1);
  border-color: rgba(99, 102, 241, 0.15);
}
.act-edit:hover {
  background: var(--vp-c-brand-soft, rgba(99,102,241,0.06));
  border-color: rgba(99, 102, 241, 0.3);
}
.dark .act-edit {
  color: #818cf8;
}
.dark .act-edit:hover {
  background: var(--vp-c-brand-soft, rgba(99,102,241,0.1));
}

.act-del {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.15);
}
.act-del:hover {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.3);
}

/* ── 빈 상태 ── */
.ki-empty {
  padding: 5rem 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
  border-radius: 12px;
}
.dark .ki-empty {
  background: var(--vp-c-bg-soft, #17171e);
  border-color: var(--vp-c-divider, rgba(255,255,255,0.06));
}
.ki-empty h3 { margin: 0 0 0.5rem; font-size: 1.15rem; color: var(--vp-c-text-1); font-weight: 700; }
.ki-empty p { font-size: 0.9rem; max-width: 380px; margin: 0 auto; line-height: 1.6; }

/* ── 모달 ── */
.ki-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
}
.dark .ki-overlay {
  background: rgba(0, 0, 0, 0.6);
}

.modal-enter-active .ki-modal { animation: modalIn 0.3s cubic-bezier(0.16,1,0.3,1); }
.modal-leave-active { transition: opacity 0.2s; opacity: 0; }
.modal-leave-active .ki-modal { animation: modalOut 0.2s ease forwards; }
@keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes modalOut { to { opacity: 0; transform: scale(0.96) translateY(12px); } }

.ki-modal {
  width: 100%;
  max-width: 540px;
  margin: 0 1rem;
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
.dark .ki-modal {
  background: rgba(22, 22, 30, 0.96);
  border-color: rgba(99, 102, 241, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.ki-modal-head {
  padding: 1.1rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12));
  background: var(--vp-c-bg-mute, #f6f6f7);
}
.dark .ki-modal-head {
  background: rgba(99, 102, 241, 0.04);
}
.ki-modal-head h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #2c3e50);
}
.dark .ki-modal-head h2 {
  color: #fff;
}
.ki-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--vp-c-text-2, #888);
  cursor: pointer;
  transition: all 0.15s;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
.ki-close:hover {
  color: var(--vp-c-text-1);
  background: rgba(0, 0, 0, 0.05);
}
.dark .ki-close:hover {
  color: #fff;
  background: rgba(255,255,255,0.06);
}

.ki-form {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.ki-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}
.ki-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.ki-field label {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #4e5968);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.dark .ki-field label {
  color: #9ca3af;
}
.req {
  color: #ef4444;
  margin-left: 2px;
}
.ki-field input, .ki-field textarea {
  background: var(--vp-c-bg-mute, #ffffff) !important;
  border: 1px solid var(--vp-c-divider, rgba(60,60,67,0.12)) !important;
  border-radius: 8px !important;
  padding: 0.55rem 0.8rem !important;
  color: var(--vp-c-text-1, #3c3c43) !important;
  font-size: 0.86rem !important;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  box-shadow: none !important;
}
.dark .ki-field input, .dark .ki-field textarea {
  background: rgba(0, 0, 0, 0.25) !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
  color: #e8eaed !important;
}

.ki-field input:focus, .ki-field textarea:focus {
  border-color: var(--vp-c-brand-1, #6366f1) !important;
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
}
.ki-field input::placeholder, .ki-field textarea::placeholder {
  color: var(--vp-c-text-3, #999) !important;
  opacity: 0.6;
}
.dark .ki-field input::placeholder, .dark .ki-field textarea::placeholder {
  color: #555860 !important;
}

.ki-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

/* ── 반응형 모바일 뷰 ── */
@media (max-width: 768px) {
  .ki-topbar {
    flex-wrap: wrap;
  }
  .ki-search {
    flex: none;
    width: 100%;
  }
  .ki-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .ki-row-card {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
  }
  
  .ki-col-summary {
    padding: 0;
    white-space: normal;
  }
  
  .ki-col-side {
    justify-content: space-between;
    width: 100%;
    margin-top: 0.25rem;
    border-top: 1px dashed var(--vp-c-divider, rgba(60,60,67,0.12));
    padding-top: 0.5rem;
  }
  
  .ki-field-row {
    grid-template-columns: 1fr;
  }
}
</style>
