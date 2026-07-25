<template>
  <Layout>
    <template #doc-before>
      <DocActionButtons />
    </template>
    <template #nav-bar-content-after>
      <div class="custom-nav-icons">
        <!-- Localhost 환경에서만 표시되는 버전별 개발이력 아이콘 -->
        <button
          v-if="isLocalhost"
          type="button"
          class="nav-icon-btn history-btn"
          title="📋 버전별 개발이력 (Localhost 전용)"
          @click="isHistoryOpen = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span class="version-dot"></span>
        </button>

        <a v-if="isAdmin" href="/docs/dev-info/" class="nav-icon-btn" title="💻 개발정보">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </a>
        <a href="/docs/analytics/" class="nav-icon-btn" title="📊 사이트 측정도구">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </a>
      </div>
    </template>
  </Layout>

  <!-- 버전별 개발이력 모달 -->
  <DevHistoryModal :is-open="isHistoryOpen" @close="isHistoryOpen = false" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DevHistoryModal from './DevHistoryModal.vue'

const { Layout } = DefaultTheme

const userIp = ref('')
const isLocalhost = ref(false)
const isHistoryOpen = ref(false)

const isAdmin = computed(() => {
  const adminIpsEnv = import.meta.env.VITE_ADMIN_IPS || '112.186.113.99'
  const allowedIps = adminIpsEnv.split(',').map(ip => ip.trim())
  return allowedIps.includes(userIp.value)
})

const fetchUserIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const data = await res.json()
    userIp.value = data.ip
  } catch (e) {
    console.error('IP fetch error:', e)
    userIp.value = '127.0.0.1'
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    isLocalhost.value = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  }
  fetchUserIp()
})
</script>

<style scoped>
.custom-nav-icons {
  display: flex;
  align-items: center;
  margin-left: 8px;
  gap: 4px;
}
.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.2s, background-color 0.2s;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
}
.nav-icon-btn:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.history-btn {
  color: #6366f1;
}
.history-btn:hover {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.1);
}
.version-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 6px #22c55e;
}
</style>
