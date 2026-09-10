<template>
  <div class="devtools-container">
    <div class="devtools-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        class="tab-btn" 
        :class="{ active: activeTab === tab.id }" 
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.name }}</span>
      </button>
    </div>

    <!-- 탭 본문 영역 -->
    <div class="devtools-body">
      <!-- 1. JSON 포맷터 -->
      <div v-if="activeTab === 'json'" class="tool-panel">
        <div class="tool-header">
          <h4>🧩 JSON 포맷터 & 뷰어</h4>
          <p class="tool-desc">지저분한 JSON 데이터를 보기 좋게 정렬하거나 압축하고 문법 에러를 진단합니다.</p>
        </div>
        <div class="tool-workspace">
          <div class="input-area">
            <label>원본 JSON 입력</label>
            <textarea 
              v-model="jsonInput" 
              placeholder='여기에 JSON 텍스트를 붙여넣으세요... (예: {"id": 1, "name": "Antigravity"})'
              spellcheck="false"
            ></textarea>
            <div class="tool-actions-row">
              <button class="tool-btn secondary" @click="clearJson">지우기</button>
              <button class="tool-btn secondary" @click="loadJsonSample">샘플 데이터</button>
              <button class="tool-btn" @click="formatJson(2)">2칸 들여쓰기</button>
              <button class="tool-btn" @click="formatJson(4)">4칸 들여쓰기</button>
              <button class="tool-btn" @click="minifyJson">한 줄 압축</button>
            </div>
          </div>
          <div class="output-area">
            <div class="output-label-row">
              <label>결과 출력</label>
              <button v-if="jsonOutput" class="copy-btn" @click="copyToClipboard(jsonOutput)">복사</button>
            </div>
            <pre class="output-pre" :class="{ error: jsonError }"><code>{{ jsonOutput || (jsonError ? jsonError : '결과가 여기에 표시됩니다.') }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 2. Base64 / URL 인코더 & 디코더 -->
      <div v-if="activeTab === 'codec'" class="tool-panel">
        <div class="tool-header">
          <h4>🔗 Base64 / URL 인코더 & 디코더</h4>
          <p class="tool-desc">텍스트를 Base64 포맷 또는 URL-Safe 포맷으로 즉시 변환하거나 복원합니다.</p>
        </div>
        <div class="tool-workspace">
          <div class="input-area">
            <label>대상 텍스트 입력</label>
            <textarea 
              v-model="codecInput" 
              placeholder="변환 또는 복원할 일반 텍스트나 인코딩된 코드를 입력하세요..."
              spellcheck="false"
            ></textarea>
            <div class="tool-actions-row">
              <button class="tool-btn secondary" @click="clearCodec">지우기</button>
              <button class="tool-btn secondary" @click="loadCodecSample">샘플 데이터</button>
              <button class="tool-btn" @click="processCodec('base64-encode')">Base64 인코딩</button>
              <button class="tool-btn" @click="processCodec('base64-decode')">Base64 디코딩</button>
              <button class="tool-btn" @click="processCodec('url-encode')">URL 인코딩</button>
              <button class="tool-btn" @click="processCodec('url-decode')">URL 디코딩</button>
            </div>
          </div>
          <div class="output-area">
            <div class="output-label-row">
              <label>결과 출력</label>
              <button v-if="codecOutput" class="copy-btn" @click="copyToClipboard(codecOutput)">복사</button>
            </div>
            <pre class="output-pre" :class="{ error: codecError }"><code>{{ codecOutput || (codecError ? codecError : '결과가 여기에 표시됩니다.') }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 3. 정규표현식 테스터 -->
      <div v-if="activeTab === 'regex'" class="tool-panel">
        <div class="tool-header">
          <h4>🔍 정규표현식(Regex) 테스터</h4>
          <p class="tool-desc">정규표현식 패턴과 플래그를 입력하고 매칭 대상 문장과 실시간 비교 및 검증을 수행합니다.</p>
        </div>
        <div class="tool-workspace regex-layout">
          <div class="regex-inputs">
            <div class="regex-row">
              <div class="regex-pattern-box">
                <span class="regex-slash">/</span>
                <input 
                  v-model="regexPattern" 
                  type="text" 
                  placeholder="정규표현식 패턴 입력 (예: [a-zA-Z0-9]+)"
                  class="regex-input-field"
                  @input="runRegex"
                >
                <span class="regex-slash">/</span>
              </div>
              <div class="regex-flags-box">
                <input 
                  v-model="regexFlags" 
                  type="text" 
                  placeholder="flags (g, i, m)"
                  class="regex-flags-field"
                  @input="runRegex"
                >
              </div>
            </div>
            <div class="target-text-box">
              <div class="output-label-row">
                <label>매칭 대상 텍스트</label>
                <button class="copy-btn" @click="loadRegexSample" style="margin-bottom: 4px;">샘플 데이터 불러오기</button>
              </div>
              <textarea 
                v-model="regexTarget" 
                placeholder="정규표현식으로 매칭을 검증할 텍스트를 입력해 보세요..."
                class="regex-target-area"
                @input="runRegex"
              ></textarea>
            </div>
          </div>
          <div class="regex-results">
            <label>매칭 결과 요약 및 하이라이트</label>
            <div v-if="regexError" class="regex-error-msg">
              ⚠️ 잘못된 정규표현식 형식입니다: {{ regexError }}
            </div>
            <div v-else class="regex-success-box">
              <div class="match-stats">
                매칭된 개수: <b>{{ regexMatches.length }}개</b>
              </div>
              <div class="match-render-preview" v-html="highlightedRegexTarget"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. JWT 디코더 -->
      <div v-if="activeTab === 'jwt'" class="tool-panel">
        <div class="tool-header">
          <h4>🔑 JWT 디코더 (JSON Web Token)</h4>
          <p class="tool-desc">인증 토큰(JWT)을 붙여넣으면 백엔드 서버 전송 없이 로컬에서 헤더와 페이로드를 안전하게 디코딩합니다.</p>
        </div>
        <div class="tool-workspace">
          <div class="input-area">
            <label>JWT 토큰 입력</label>
            <textarea 
              v-model="jwtInput" 
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi... 형식의 JWT를 입력하세요."
              spellcheck="false"
              @input="decodeJwt"
            ></textarea>
            <div class="tool-actions-row" style="margin-top: 10px;">
              <button class="tool-btn secondary" @click="clearJwt">지우기</button>
              <button class="tool-btn secondary" @click="loadJwtSample">샘플 데이터</button>
            </div>
          </div>
          <div class="output-area jwt-outputs">
            <div class="jwt-block">
              <label>Header (헤더 - 알고리즘 및 유형)</label>
              <pre class="output-pre compact"><code>{{ jwtHeader || '토큰을 파싱하면 헤더 정보가 노출됩니다.' }}</code></pre>
            </div>
            <div class="jwt-block">
              <label>Payload (페이로드 - 데이터 및 클레임)</label>
              <pre class="output-pre compact" :class="{ error: jwtError }"><code>{{ jwtPayload || (jwtError ? jwtError : '토큰을 파싱하면 페이로드 정보가 노출됩니다.') }}</code></pre>
            </div>
            <div v-if="jwtExpDate" class="jwt-expiry-banner" :class="{ expired: isJwtExpired }">
              📢 토큰 만료 기한: <b>{{ jwtExpDate }}</b> ({{ isJwtExpired ? '만료됨 ❌' : '유효함 ✅' }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  { id: 'json', name: 'JSON 포맷터', icon: '🧩' },
  { id: 'codec', name: 'Base64/URL 변환', icon: '🔗' },
  { id: 'regex', name: '정규표현식 테스트', icon: '🔍' },
  { id: 'jwt', name: 'JWT 디코더', icon: '🔑' }
]

const activeTab = ref('json')

// 클립보드 복사 유틸리티
const copyToClipboard = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => alert('클립보드에 성공적으로 복사되었습니다.'))
      .catch(err => console.error('복사 실패:', err))
  }
}

// ── 1. JSON 포맷터 ──
const jsonInput = ref('')
const jsonOutput = ref('')
const jsonError = ref('')

const clearJson = () => {
  jsonInput.value = ''
  jsonOutput.value = ''
  jsonError.value = ''
}

const formatJson = (space) => {
  jsonError.value = ''
  if (!jsonInput.value.trim()) {
    jsonOutput.value = ''
    return
  }
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(parsed, null, space)
  } catch (e) {
    jsonError.value = '❌ 올바르지 않은 JSON 데이터 형식입니다: ' + e.message
    jsonOutput.value = ''
  }
}

const minifyJson = () => {
  jsonError.value = ''
  if (!jsonInput.value.trim()) {
    jsonOutput.value = ''
    return
  }
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(parsed)
  } catch (e) {
    jsonError.value = '❌ 올바르지 않은 JSON 데이터 형식입니다: ' + e.message
    jsonOutput.value = ''
  }
}

const loadJsonSample = () => {
  jsonInput.value = JSON.stringify({
    site: "개발자를 위한 지식DB",
    version: "2026.7.18",
    active: true,
    features: ["Learn Progress Dashboard", "DevTools Utility Kit", "PDF/Markdown Archive"],
    author: {
      name: "Antigravity",
      type: "AI Assistant"
    }
  })
  formatJson(2)
}

// ── 2. Base64 / URL 인코더 & 디코더 ──
const codecInput = ref('')
const codecOutput = ref('')
const codecError = ref('')

const clearCodec = () => {
  codecInput.value = ''
  codecOutput.value = ''
  codecError.value = ''
}

const processCodec = (action) => {
  codecError.value = ''
  if (!codecInput.value) {
    codecOutput.value = ''
    return
  }
  try {
    if (action === 'base64-encode') {
      codecOutput.value = btoa(encodeURIComponent(codecInput.value).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16))
      }))
    } else if (action === 'base64-decode') {
      codecOutput.value = decodeURIComponent(atob(codecInput.value).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
    } else if (action === 'url-encode') {
      codecOutput.value = encodeURIComponent(codecInput.value)
    } else if (action === 'url-decode') {
      codecOutput.value = decodeURIComponent(codecInput.value)
    }
  } catch (e) {
    codecError.value = '❌ 인코딩/디코딩 실패: 제공된 문자열이 올바른 규격이 아닙니다. (' + e.message + ')'
    codecOutput.value = ''
  }
}

const loadCodecSample = () => {
  codecInput.value = "Hello, World! 개발자를 위한 지식DB 유틸리티 센터에 오신 것을 환영합니다. 🚀"
  codecOutput.value = ""
  codecError.value = ""
}

// ── 3. 정규표현식 테스터 ──
const regexPattern = ref('[a-zA-Z0-9]+')
const regexFlags = ref('g')
const regexTarget = ref('Hello World! 2026 DevTools.')
const regexMatches = ref([])
const regexError = ref('')

const runRegex = () => {
  regexError.value = ''
  regexMatches.value = []
  if (!regexPattern.value) return

  try {
    const re = new RegExp(regexPattern.value, regexFlags.value || '')
    const target = regexTarget.value
    
    if (regexFlags.value.includes('g')) {
      let match
      let safetyCounter = 0
      while ((match = re.exec(target)) !== null) {
        if (match[0] === '') {
          re.lastIndex++ // 무한루프 방지
        }
        regexMatches.value.push({
          text: match[0],
          index: match.index,
          length: match[0].length
        })
        safetyCounter++
        if (safetyCounter > 1000) break // 무한 루프 안전 장치
      }
    } else {
      const match = re.exec(target)
      if (match) {
        regexMatches.value.push({
          text: match[0],
          index: match.index,
          length: match[0].length
        })
      }
    }
  } catch (e) {
    regexError.value = e.message
  }
}

const escapeHtml = (str) => {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const highlightedRegexTarget = computed(() => {
  if (!regexTarget.value) return ''
  const escapedTarget = escapeHtml(regexTarget.value)
  if (regexError.value || !regexPattern.value) {
    return escapedTarget
  }
  try {
    const re = new RegExp(`(${regexPattern.value})`, regexFlags.value)
    // 안전하게 이스케이프된 텍스트 기반으로만 mark 태그 감싸기
    const replaced = escapedTarget.replace(re, '<mark class="regex-highlight">$1</mark>')
    return replaced
  } catch (e) {
    return escapedTarget
  }
})

const loadRegexSample = () => {
  regexPattern.value = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b"
  regexFlags.value = "g"
  regexTarget.value = "문의사항이 있으시면 support@dev-knowledge.app 혹은 admin@example.com 으로 이메일을 보내주세요. 감사합니당!"
  runRegex()
}

// 초기 정규식 동작
runRegex()

// ── 4. JWT 디코더 ──
const jwtInput = ref('')
const jwtHeader = ref('')
const jwtPayload = ref('')
const jwtExpDate = ref('')
const isJwtExpired = ref(false)
const jwtError = ref('')

const clearJwt = () => {
  jwtInput.value = ''
  jwtHeader.value = ''
  jwtPayload.value = ''
  jwtExpDate.value = ''
  isJwtExpired.value = false
  jwtError.value = ''
}

const decodeJwt = () => {
  jwtError.value = ''
  jwtHeader.value = ''
  jwtPayload.value = ''
  jwtExpDate.value = ''
  isJwtExpired.value = false

  const token = jwtInput.value.trim()
  if (!token) return

  const parts = token.split('.')
  if (parts.length !== 3) {
    jwtError.value = '❌ JWT 토큰은 세 부분(Header, Payload, Signature)으로 마침표(.)로 구분되어야 합니다.'
    return
  }

  try {
    // base64url 디코딩 헬퍼
    const base64UrlDecode = (str) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
      // 패딩 맞추기
      while (base64.length % 4) {
        base64 += '='
      }
      return decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
    }

    const headerDecoded = JSON.parse(base64UrlDecode(parts[0]))
    const payloadDecoded = JSON.parse(base64UrlDecode(parts[1]))

    jwtHeader.value = JSON.stringify(headerDecoded, null, 2)
    jwtPayload.value = JSON.stringify(payloadDecoded, null, 2)

    // 만료 기한 파싱
    if (payloadDecoded.exp) {
      const expTimestamp = payloadDecoded.exp * 1000
      const date = new Date(expTimestamp)
      jwtExpDate.value = date.toLocaleString('ko-KR')
      isJwtExpired.value = Date.now() > expTimestamp
    }
  } catch (e) {
    jwtError.value = '❌ JWT 디코딩 실패: 올바르지 않은 토큰입니다. (' + e.message + ')'
  }
}

const loadJwtSample = () => {
  jwtInput.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImRldmVsb3BlciIsImV4cCI6MjUyNDYwODAwMH0.dummy-signature"
  decodeJwt()
}
</script>

<style scoped>
.devtools-container {
  margin: 20px 0;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}

.devtools-tabs {
  display: flex;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--vp-c-brand-1);
  background: rgba(99, 102, 241, 0.04);
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.devtools-body {
  padding: 24px;
}

.tool-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tool-header h4 {
  margin: 0 0 6px 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.tool-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.tool-workspace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .tool-workspace {
    grid-template-columns: 1fr;
  }
}

.input-area, .output-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

textarea {
  width: 100%;
  height: 250px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  resize: vertical;
  line-height: 1.5;
}

textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.tool-actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.tool-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.tool-btn.secondary {
  background: transparent;
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}

.tool-btn.secondary:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

.output-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy-btn {
  padding: 2px 8px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--vp-c-text-2);
}

.copy-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.output-pre {
  height: 250px;
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  overflow: auto;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  word-break: break-all;
}

.output-pre code {
  font-family: var(--vp-font-family-mono) !important;
  color: inherit !important;
  background: transparent !important;
  padding: 0 !important;
}

.output-pre.error {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.02);
}

/* 정규식 레이아웃 커스텀 */
.regex-layout {
  grid-template-columns: 1fr;
}

.regex-inputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.regex-row {
  display: flex;
  gap: 10px;
}

.regex-pattern-box {
  flex-grow: 1;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0 10px;
}

.regex-slash {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  user-select: none;
}

.regex-input-field {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 10px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  outline: none;
}

.regex-flags-box {
  width: 110px;
}

.regex-flags-field {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 10px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  outline: none;
  text-align: center;
}

.regex-flags-field:focus {
  border-color: var(--vp-c-brand-1);
}

.target-text-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.regex-target-area {
  height: 120px;
}

.regex-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.regex-error-msg {
  padding: 10px;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.05);
  color: #ef4444;
  font-size: 0.8rem;
  border: 1px solid rgba(239, 68, 68, 0.15);
}

.regex-success-box {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 16px;
}

.match-stats {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
}

.match-stats b {
  color: var(--vp-c-brand-1);
}

.match-render-preview {
  min-height: 80px;
  font-size: 0.88rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vp-c-text-1);
}

/* 정규식 하이라이트 스타일 */
:deep(.regex-highlight) {
  background: rgba(99, 102, 241, 0.25);
  color: var(--vp-c-brand-1);
  border-radius: 3px;
  padding: 1px 2px;
  font-weight: 600;
  border-bottom: 1.5px solid var(--vp-c-brand-1);
}

/* JWT 출력 스타일 */
.jwt-outputs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.jwt-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.output-pre.compact {
  height: 110px;
}

.jwt-expiry-banner {
  padding: 10px 14px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #10b981;
  font-size: 0.8rem;
}

.jwt-expiry-banner.expired {
  background: rgba(239, 68, 68, 0.06);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}
</style>
