<template>
  <Layout>
    <template #nav-bar-content-after>
      <div class="custom-nav-icons">
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

const userIp = ref('')
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
  transition: color 0.2s;
  text-decoration: none;
}
.nav-icon-btn:hover {
  color: var(--vp-c-brand-1);
}
</style>
