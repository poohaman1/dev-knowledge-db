<template>
  <Teleport to="body">
    <div v-if="isOpen" class="history-modal-overlay" @click.self="closeModal">
      <div class="history-modal-content">
        <div class="history-modal-header">
          <div class="header-title-group">
            <span class="modal-badge">LOCAL DEV ONLY</span>
            <h2>📋 버전별 개발이력 (Changelog)</h2>
          </div>
          <button class="close-btn" @click="closeModal" title="닫기">&times;</button>
        </div>

        <div class="history-modal-body">
          <div class="timeline">
            <div v-for="(item, index) in historyList" :key="index" class="timeline-item">
              <div class="timeline-badge" :class="{ 'latest': index === 0 }">
                {{ item.date }}
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="version-tag">{{ item.versions.join(' / ') }}</span>
                  <span class="version-date">{{ item.date }}</span>
                  <span v-if="index === 0" class="current-badge">LATEST</span>
                </div>
                <h3 class="version-title">{{ item.title }}</h3>
                <ul class="changelog-list">
                  <li v-for="(log, logIdx) in item.highlights" :key="logIdx">
                    <strong v-if="log.ver" class="log-ver-tag">[{{ log.ver }}]</strong>
                    {{ log.text }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="history-modal-footer">
          <span class="footer-note">💡 동일한 개발날짜의 개발 내역은 하나로 합쳐서 표기됩니다. (Localhost 전용)</span>
          <button class="confirm-btn" @click="closeModal">확인</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// 동일 개발 날짜 항목을 하나로 합친 개발 이력 데이터
const historyList = [
  {
    date: '2026-07-25',
    versions: ['v1.4.0', 'v1.3.0'],
    title: '⚖️ IT 법률정보 7종 구축 & 🎮 미니게임 센터 & 메인 그리드 최적화',
    highlights: [
      { ver: 'v1.4.0', text: '상단 네비게이션 및 사이드바에 "⚖️ 법률정보" 메뉴 신규 추가 ("컬렉션"과 "게임" 사이)' },
      { ver: 'v1.4.0', text: '7대 IT 법률 가이드 작성 (지식재산권, 개인정보보호법, 계약·노무, 정보보안, AI 저작권, 전자상거래, 국제 규제)' },
      { ver: 'v1.4.0', text: '메인 피처 카드 12개(3x4), 기술 트렌드 8개(2x4), 퀵 액세스 16개(2x8) 완벽 그리드 최적화' },
      { ver: 'v1.4.0', text: 'Localhost 전용 날짜별/버전별 개발이력 팝업 모달 추가' },
      { ver: 'v1.3.0', text: '1~3분 소요 미니게임 5종(숫자 기억, 반응속도, 색상 매칭, 미니 방탈출, 심리전) 개발 및 미니게임 센터 릴리즈' },
      { ver: 'v1.3.0', text: '게임 완료 시 결과(점수, 시간) localStorage 자동 저장 및 전적 보존 기록판 개발' },
      { ver: 'v1.3.0', text: '특정 관리자 IP(112.186.113.99) 및 Localhost 방문/검색어 수집 제외 로직 적용' }
    ]
  },
  {
    date: '2026-07-24',
    versions: ['v1.2.0'],
    title: '🧠 2026 최신 LLM 20선 심층 분석 & 깃허브 스타 큐레이션',
    highlights: [
      { ver: 'v1.2.0', text: 'GPT-5.5, Gemini 3.5, Claude 5, Llama 5 등 2026년 최신 20대 LLM 모델 비교 분석 라인업 구축' },
      { ver: 'v1.2.0', text: '해외/국내 최상위 깃허브 스타 오픈소스 프로젝트 80선 4대 테마별 심층 큐레이션' }
    ]
  },
  {
    date: '2026-07-23',
    versions: ['v1.1.0'],
    title: '🛠️ 100% 로컬 보안 개발자 유틸리티 & 지식 데이터 백업',
    highlights: [
      { ver: 'v1.1.0', text: '서버 전송 없는 브라우저 기반 JSON 포맷터, Base64/URL 변환기, 정규식 매칭, JWT 디코더 개발' },
      { ver: 'v1.1.0', text: '지식 아티클 CRUD 관리 그리드 및 XML 파일 가져오기/내보내기 기능 개발' }
    ]
  },
  {
    date: '2026-07-20',
    versions: ['v1.0.0'],
    title: '🚀 개발자를 위한 지식DB (dev-knowledge-db) 최초 릴리즈',
    highlights: [
      { ver: 'v1.0.0', text: 'VitePress 1.6 기반 모던 지식 플랫폼 최초 구축' },
      { ver: 'v1.0.0', text: '15종 프로그래밍 언어 생태계 가이드, DB 선택 가이드, 네이버/카카오 등 13개 IT 기업 기술스택 구축' }
    ]
  }
]
</script>

<style scoped>
.history-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.history-modal-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translateY(20px) scale(0.97); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.history-modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--vp-c-bg-soft);
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.modal-badge {
  display: inline-block;
  width: fit-content;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.12);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.history-modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.history-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* 타임라인 스타일 */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 45px;
  width: 2px;
  background: var(--vp-c-divider);
}

.timeline-item {
  display: flex;
  gap: 1.25rem;
  position: relative;
}

.timeline-badge {
  width: 90px;
  height: 28px;
  border-radius: 20px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  z-index: 1;
  flex-shrink: 0;
}

.timeline-badge.latest {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
}

.timeline-content {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.version-tag {
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
}

.version-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.current-badge {
  font-size: 0.6rem;
  font-weight: 800;
  background: #22c55e;
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.version-title {
  margin: 0 0 0.6rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.changelog-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.83rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

.changelog-list li {
  margin-bottom: 0.35rem;
}

.log-ver-tag {
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  margin-right: 0.25rem;
}

.history-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-note {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.confirm-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.confirm-btn:hover {
  opacity: 0.9;
}
</style>
