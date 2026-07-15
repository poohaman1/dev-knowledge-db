<template>
  <div v-if="isAuthorized" class="secure-content-wrapper">
    <slot></slot>
  </div>
  <div v-else class="secure-loading">
    <p>🔒 접근 권한을 확인 중입니다...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isAuthorized = ref(false)

onMounted(async () => {
  const allowedIpsStr = import.meta.env.VITE_ALLOWED_IPS || ''
  const secureCode = import.meta.env.VITE_SECURE_CODE || ''
  const allowedIps = allowedIpsStr.split(',').map(ip => ip.trim())

  let hasAccess = false

  // 로컬 호스트인 경우 무조건 패스
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    hasAccess = true
  } 
  // 이미 세션 내에서 한 번 인증을 통과했다면 (IP 혹은 패스워드로) 빠르게 패스
  else if (sessionStorage.getItem('secure_authorized_session') === 'true') {
    hasAccess = true
  } else {
    // 1. IP 체크
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      if (allowedIps.includes(data.ip)) {
        hasAccess = true
      }
    } catch (e) {
      console.error('IP check failed', e)
    }

    // 2. IP가 다르면 Secure Code 물어보기
    if (!hasAccess) {
      const userInput = prompt("이 페이지는 허용된 사용자만 접근할 수 있습니다.\n접근 코드를 입력하세요 (Secure Code):")
      if (userInput && userInput === secureCode) {
        hasAccess = true
      }
    }
  }

  // 3. 결과 처리
  if (hasAccess) {
    sessionStorage.setItem('secure_authorized_session', 'true')
    isAuthorized.value = true
  } else {
    alert("접근이 거부되었습니다.")
    window.location.href = '/'
  }
})
</script>

<style scoped>
.secure-content-wrapper {
  animation: fadeIn 0.3s ease-out;
}
.secure-loading {
  padding: 60px 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
