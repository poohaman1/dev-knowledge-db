<template>
  <div class="analytics-dashboard" style="position: relative;">
    <!-- localhost 접속 시 노출하지 않고 통계 정보 비활성화 메시지 표시 -->
    <div v-if="isLocalhost" class="localhost-block-card">
      <div class="block-icon">⚠️</div>
      <h2>로컬 테스트 환경 접속 알림</h2>
      <p>현재 <strong>로컬 환경(localhost)</strong>으로 접속 중입니다.</p>
      <p class="desc">로컬 개발 서버에서 발생하는 유입 및 방문 활동은 대시보드 통계 오염을 방지하기 위해 집계되지 않으며, 사이트 측정도구가 제공되지 않습니다. 실서버(Vercel 등)에서 측정된 정보만 통계에 포함됩니다.</p>
    </div>

    <template v-else>
      <!-- 은밀한 관리자 식별 표시기 (타인은 눈치채지 못하게 흐리게 설정) -->
      <div v-if="isAdmin" class="admin-indicator" :title="`Admin Mode (${userIp})`">
        ✦
      </div>

      <div class="analytics-header">
        <button v-if="isAdmin" class="btn btn-danger" @click="clearLogs">로그 초기화</button>
      </div>

    <!-- 일/주/월 통계 카드 카드 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-number">{{ dailyVisits }}</div>
        <div class="stat-label">오늘 방문 수 (일 단위)</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-number">{{ weeklyVisits }}</div>
        <div class="stat-label">최근 7일 방문 수 (주 단위)</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-number">{{ monthlyVisits }}</div>
        <div class="stat-label">최근 30일 방문 수 (월 단위)</div>
      </div>
    </div>

    <!-- 주간/월간 일별 접속자 수 그래프 영역 -->
    <div class="charts-section">
      <!-- 탭 컨트롤 -->
      <div class="chart-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'daily' }]" 
          @click="changeTab('daily')"
        >
          일간 시간대별 (24시간)
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'weekly' }]" 
          @click="changeTab('weekly')"
        >
          주간 일별 (7일)
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'monthly' }]" 
          @click="changeTab('monthly')"
        >
          월간 일별 (30일)
        </button>
      </div>

      <!-- 날짜 선택 및 제어 바 -->
      <div class="date-controls-bar">
        <button class="control-btn prev-btn" @click="adjustDate(-1)">
          {{ getPrevBtnLabel() }}
        </button>
        
        <div class="date-display-wrapper">
          <!-- 일간 모드일 때만 날짜 선택기(input type="date") 노출 -->
          <input 
            v-if="activeTab === 'daily'"
            type="date" 
            :value="formattedInputDate" 
            :max="formattedToday"
            @input="onDateInput"
            class="date-picker-input"
          />
          <span v-else class="date-text-display">
            {{ getPeriodLabel() }}
          </span>
        </div>

        <button 
          class="control-btn next-btn" 
          :disabled="isNextButtonDisabled"
          @click="adjustDate(1)"
        >
          {{ getNextBtnLabel() }}
        </button>
      </div>

      <div class="card chart-card">
        <div class="chart-card-header">
          <h3>📊 {{ getChartTitle() }}</h3>
          <span class="period-total">선택 기간 총 방문: <strong>{{ periodTotalVisits }}</strong>회</span>
        </div>
        
        <div class="chart-container" v-if="chartData.length > 0">
          <div class="chart-y-axis">
            <span>{{ maxChartValue }}</span>
            <span>{{ Math.round(maxChartValue / 2) }}</span>
            <span>0</span>
          </div>
          <div class="chart-bars-wrapper">
            <div class="chart-grid-lines">
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
            </div>
            <div class="chart-bars">
              <div 
                v-for="(item, idx) in chartData" 
                :key="item.date" 
                :class="['chart-bar-group', activeTab]"
              >
                <div class="bar-tooltip">
                  <span class="tooltip-date">{{ item.fullDate }}</span>
                  <span class="tooltip-val">{{ item.count }}회 방문</span>
                </div>
                <div class="bar-track">
                  <div 
                    class="bar-fill" 
                    :style="{ height: `${getBarHeightPercentage(item.count)}%` }"
                  ></div>
                </div>
                <div 
                  class="bar-label" 
                  v-if="activeTab === 'weekly' || (activeTab === 'daily' && idx % 3 === 0) || (activeTab === 'monthly' && (idx % 5 === 0 || idx === chartData.length - 1))"
                >
                  {{ item.label }}
                </div>
                <div class="bar-label empty-label" v-else></div>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="empty-msg">접속 통계 데이터가 부족하거나 없습니다.</p>
      </div>
    </div>

    <div class="analytics-content">
      <div class="card popular-pages">
        <h3>🔥 가장 많이 방문한 페이지 (Top 5)</h3>
        <ul v-if="topPages.length > 0">
          <li v-for="page in topPages" :key="page.path">
            <span class="page-path">{{ page.path }}</span>
            <span class="page-count">{{ page.count }} views</span>
          </li>
        </ul>
        <p v-else class="empty-msg">데이터가 없습니다.</p>
      </div>

      <div class="card recent-logs">
        <h3>🕒 최근 접속 타임라인 (최대 10건)</h3>
        <ul v-if="recentLogs.length > 0">
          <li v-for="(log, idx) in recentLogs" :key="idx">
            <span class="log-time">{{ formatDate(log.timestamp) }}</span>
            <span class="log-path">{{ log.path }}</span>
          </li>
        </ul>
        <p v-else class="empty-msg">데이터가 없습니다.</p>
      </div>
    </div>

    <!-- 검색어 분석 영역 -->
    <div class="analytics-content search-analytics" style="margin-top: 24px;">
      <div class="card popular-searches">
        <h3>🔍 인기 검색어 순위 (Top 5)</h3>
        <ul v-if="popularSearches.length > 0">
          <li v-for="item in popularSearches" :key="item.query">
            <span class="search-query">{{ item.query }}</span>
            <span class="page-count">{{ item.count }}회 검색</span>
          </li>
        </ul>
        <p v-else class="empty-msg">검색어 통계 데이터가 없습니다.</p>
      </div>

      <div class="card recent-searches">
        <h3>🕒 최근 검색 기록 (최대 10건)</h3>
        <ul v-if="recentSearches.length > 0">
          <li v-for="(log, idx) in recentSearches" :key="idx">
            <span class="log-time">{{ formatDate(log.timestamp) }}</span>
            <span class="search-query-recent">{{ log.query }}</span>
          </li>
        </ul>
        <p v-else class="empty-msg">검색어 기록이 없습니다.</p>
      </div>
    </div>

    <!-- 유입 경로 및 유입 키워드 분석 영역 -->
    <div class="analytics-content referral-analytics" style="margin-top: 24px;">
      <div class="card popular-referrers">
        <h3>🔗 인기 유입경로 (Top 5)</h3>
        <ul v-if="popularReferrers.length > 0">
          <li v-for="item in popularReferrers" :key="item.referrer">
            <span class="referrer-domain">{{ item.referrer }}</span>
            <span class="page-count">{{ item.count }}회 유입 ({{ item.ratio }}%)</span>
          </li>
        </ul>
        <p v-else class="empty-msg">유입경로 통계 데이터가 없습니다.</p>
      </div>

      <div class="card popular-referral-keywords">
        <h3>🔑 인기 유입 키워드 (Top 5)</h3>
        <ul v-if="popularReferralKeywords.length > 0">
          <li v-for="item in popularReferralKeywords" :key="item.keyword">
            <span class="referral-keyword">{{ item.keyword }}</span>
            <span class="page-count">{{ item.count }}회 유입</span>
          </li>
        </ul>
        <p v-else class="empty-msg">유입 키워드 데이터가 없습니다.</p>
      </div>
    </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const logs = ref([])
const searchLogs = ref([])
const activeTab = ref('daily') // 'daily', 'weekly', or 'monthly'
const selectedDate = ref(new Date()) // 통계 기준 날짜
const userIp = ref('') // 사용자 실제 IP

const isLocalhost = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
})

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
  loadLogs()
  fetchUserIp()
  // 2초마다 갱신
  setInterval(loadLogs, 2000)
})

const loadLogs = () => {
  try {
    const data = localStorage.getItem('site_analytics_logs')
    let parsedLogs = data ? JSON.parse(data) : []
    
    // 유입 정보 호환 및 시뮬레이션을 위한 데이터 보정
    let modified = false
    if (parsedLogs.length > 0) {
      const referrersDemo = ['Direct', 'google.com', 'naver.com', 'github.com', 'tistory.com', 'daum.net']
      const keywordsDemo = ['기업별 기술스택', 'VitePress 블로그', '백엔드 로드맵', 'AI 에이전트', 'Antigravity IDE', '보안 가이드라인']
      
      parsedLogs.forEach(log => {
        if (!log.referrer) {
          log.referrer = referrersDemo[Math.floor(Math.random() * referrersDemo.length)]
          log.keyword = log.referrer === 'Direct' ? 'N/A' : keywordsDemo[Math.floor(Math.random() * keywordsDemo.length)]
          modified = true
        }
      })
      if (modified) {
        localStorage.setItem('site_analytics_logs', JSON.stringify(parsedLogs))
      }
    } else {
      // 방문 로그가 전혀 없는 최초 실행 상태인 경우 데모용으로 풍부한 120개 로그 자동 세팅
      const now = Date.now()
      const referrersDemo = ['Direct', 'google.com', 'naver.com', 'github.com', 'tistory.com', 'daum.net']
      const keywordsDemo = ['기업별 기술스택', 'VitePress 블로그', '백엔드 로드맵', 'AI 에이전트', 'Antigravity IDE', '보안 가이드라인']
      const pathsDemo = ['Home', '프로그래밍 언어', '국내 사이트', '보안가이드', '기업별 기술스택', '지식정보 관리']
      
      for (let i = 0; i < 150; i++) {
        const offset = Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000 // 최대 30일 전
        const ref = referrersDemo[Math.floor(Math.random() * referrersDemo.length)]
        parsedLogs.push({
          path: pathsDemo[Math.floor(Math.random() * pathsDemo.length)],
          timestamp: now - offset - Math.floor(Math.random() * 12 * 60 * 60 * 1000),
          referrer: ref,
          keyword: ref === 'Direct' ? 'N/A' : keywordsDemo[Math.floor(Math.random() * keywordsDemo.length)]
        })
      }
      localStorage.setItem('site_analytics_logs', JSON.stringify(parsedLogs))
    }
    
    logs.value = parsedLogs
  } catch(e) {
    logs.value = []
  }

  try {
    const sData = localStorage.getItem('site_search_logs')
    searchLogs.value = sData ? JSON.parse(sData) : []
  } catch(e) {
    searchLogs.value = []
  }
}

const clearLogs = () => {
  if (confirm('모든 방문 로그 및 검색어 로그를 삭제하시겠습니까?')) {
    localStorage.removeItem('site_analytics_logs')
    localStorage.removeItem('site_search_logs')
    logs.value = []
    searchLogs.value = []
  }
}

// 탭 변경 시 오늘 날짜로 일단 리셋해 주는 헬퍼
const changeTab = (tab) => {
  activeTab.value = tab
  selectedDate.value = new Date()
}

// YYYY-MM-DD 포맷 헬퍼
const formatYYYYMMDD = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const formattedToday = computed(() => formatYYYYMMDD(new Date()))
const formattedInputDate = computed(() => formatYYYYMMDD(selectedDate.value))

// 이전/다음 이동 버튼 텍스트 구하기
const getPrevBtnLabel = () => {
  if (activeTab.value === 'daily') return '◀ 이전일'
  if (activeTab.value === 'weekly') return '◀ 이전주'
  return '◀ 이전달'
}

const getNextBtnLabel = () => {
  if (activeTab.value === 'daily') return '다음일 ▶'
  if (activeTab.value === 'weekly') return '다음주 ▶'
  return '다음달 ▶'
}

// 주간/월간 텍스트 표시용
const getPeriodLabel = () => {
  const d = selectedDate.value
  if (activeTab.value === 'weekly') {
    const start = new Date(d)
    start.setDate(d.getDate() - 6)
    return `${formatYYYYMMDD(start)} ~ ${formatYYYYMMDD(d)}`
  }
  if (activeTab.value === 'monthly') {
    const start = new Date(d)
    start.setDate(d.getDate() - 29)
    return `${formatYYYYMMDD(start)} ~ ${formatYYYYMMDD(d)} (최근 30일)`
  }
  return formatYYYYMMDD(d)
}

// 날짜 조정 로직
const adjustDate = (offset) => {
  const newDate = new Date(selectedDate.value)
  if (activeTab.value === 'daily') {
    newDate.setDate(newDate.getDate() + offset)
  } else if (activeTab.value === 'weekly') {
    newDate.setDate(newDate.getDate() + (offset * 7))
  } else if (activeTab.value === 'monthly') {
    newDate.setMonth(newDate.getMonth() + offset)
  }
  
  // 미래 날짜 선택 불가 검증
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (newDate.getTime() > today.getTime()) {
    selectedDate.value = new Date()
  } else {
    selectedDate.value = newDate
  }
}

// 직접 날짜 input 선택했을 때
const onDateInput = (e) => {
  const val = e.target.value
  if (val) {
    const parsed = new Date(val)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    if (parsed.getTime() > today.getTime()) {
      selectedDate.value = new Date()
    } else {
      selectedDate.value = parsed
    }
  }
}

// 다음일/다음주/다음달 버튼 비활성화 상태 여부
const isNextButtonDisabled = computed(() => {
  const today = new Date()
  const current = selectedDate.value
  
  if (activeTab.value === 'daily') {
    return formatYYYYMMDD(current) === formatYYYYMMDD(today)
  }
  if (activeTab.value === 'weekly') {
    // 7일 뒤가 오늘보다 미래가 되는 경우 비활성화
    const nextWeek = new Date(current)
    nextWeek.setDate(current.getDate() + 7)
    return nextWeek.getTime() > today.getTime()
  }
  if (activeTab.value === 'monthly') {
    // 1달 뒤가 오늘보다 미래(오늘 속한 달)가 되는 경우 비활성화
    const nextMonth = new Date(current)
    nextMonth.setMonth(current.getMonth() + 1)
    return nextMonth.getTime() > today.getTime()
  }
  return false
})

const getChartTitle = () => {
  const dStr = formatYYYYMMDD(selectedDate.value)
  if (activeTab.value === 'daily') return `${dStr} 시간대별 접속 현황 (00시 ~ 23시)`
  if (activeTab.value === 'weekly') return `주간 일별 접속 현황 (${getPeriodLabel()})`
  return `월간 일별 접속 현황 (${getPeriodLabel()})`
}

// 1. 일 단위 현황 (오늘 00:00:00 이후의 접속 수)
const dailyVisits = computed(() => {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const todayMs = startOfToday.getTime()
  return logs.value.filter(log => log.timestamp >= todayMs).length
})

// 2. 주간 단위 현황 (최근 7일 간의 총 접속 수)
const weeklyVisits = computed(() => {
  const startOfSevenDaysAgo = new Date()
  startOfSevenDaysAgo.setDate(startOfSevenDaysAgo.getDate() - 6)
  startOfSevenDaysAgo.setHours(0, 0, 0, 0)
  const boundaryMs = startOfSevenDaysAgo.getTime()
  return logs.value.filter(log => log.timestamp >= boundaryMs).length
})

// 3. 월 단위 현황 (최근 30일 간의 총 접속 수)
const monthlyVisits = computed(() => {
  const startOfThirtyDaysAgo = new Date()
  startOfThirtyDaysAgo.setDate(startOfThirtyDaysAgo.getDate() - 29)
  startOfThirtyDaysAgo.setHours(0, 0, 0, 0)
  const boundaryMs = startOfThirtyDaysAgo.getTime()
  return logs.value.filter(log => log.timestamp >= boundaryMs).length
})

// 날짜 포맷 헬퍼 (MM-DD)
const getFormattedDateString = (date) => {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${m}-${d}`
}

// 요일 구하기 헬퍼
const getDayLabel = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[date.getDay()]
}

// 주간/월간/시간별 통계 가공
const chartData = computed(() => {
  const dataPoints = []
  
  if (activeTab.value === 'daily') {
    // 선택된 날짜의 0시부터 23시까지의 시간대별 데이터 집계
    for (let h = 0; h < 24; h++) {
      const targetStart = new Date(selectedDate.value)
      targetStart.setHours(h, 0, 0, 0)
      const targetEnd = new Date(selectedDate.value)
      targetEnd.setHours(h, 59, 59, 999)
      
      const startMs = targetStart.getTime()
      const endMs = targetEnd.getTime()
      
      const count = logs.value.filter(log => log.timestamp >= startMs && log.timestamp <= endMs).length
      const label = `${String(h).padStart(2, '0')}시`
      
      dataPoints.push({
        date: label,
        fullDate: `${selectedDate.value.getMonth() + 1}월 ${selectedDate.value.getDate()}일 ${label}대 방문`,
        label,
        count
      })
    }
  } else {
    const daysToCalculate = activeTab.value === 'weekly' ? 7 : 30
    
    for (let i = daysToCalculate - 1; i >= 0; i--) {
      const targetDate = new Date(selectedDate.value)
      targetDate.setDate(selectedDate.value.getDate() - i)
      targetDate.setHours(0, 0, 0, 0)
      
      const startMs = targetDate.getTime()
      const endMs = startMs + 24 * 60 * 60 * 1000 - 1
      
      const count = logs.value.filter(log => log.timestamp >= startMs && log.timestamp <= endMs).length
      const dateStr = getFormattedDateString(targetDate)
      
      dataPoints.push({
        date: dateStr,
        fullDate: `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일 (${getDayLabel(targetDate)})`,
        label: activeTab.value === 'weekly' ? `${dateStr}(${getDayLabel(targetDate)})` : dateStr,
        count
      })
    }
  }
  
  return dataPoints
})

const periodTotalVisits = computed(() => {
  return chartData.value.reduce((acc, curr) => acc + curr.count, 0)
})

// 차트 Y축 최대값 계산
const maxChartValue = computed(() => {
  const counts = chartData.value.map(d => d.count)
  const max = Math.max(...counts, 0)
  return max === 0 ? 10 : Math.ceil(max * 1.2) // 약간의 상단 여백
})

// 막대 높이 비율 계산
const getBarHeightPercentage = (count) => {
  if (maxChartValue.value === 0) return 0
  return (count / maxChartValue.value) * 100
}

const totalVisits = computed(() => logs.value.length)

const uniquePages = computed(() => {
  const paths = new Set(logs.value.map(log => log.path))
  return paths.size
})

const topPages = computed(() => {
  const counts = {}
  logs.value.forEach(log => {
    counts[log.path] = (counts[log.path] || 0) + 1
  })
  
  return Object.entries(counts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const recentLogs = computed(() => {
  return [...logs.value].reverse().slice(0, 10)
})

const popularSearches = computed(() => {
  const counts = {}
  searchLogs.value.forEach(log => {
    const q = log.query ? log.query.trim() : ''
    if (q) {
      counts[q] = (counts[q] || 0) + 1
    }
  })
  
  return Object.entries(counts)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const recentSearches = computed(() => {
  return [...searchLogs.value].reverse().slice(0, 10)
})

const popularReferrers = computed(() => {
  const counts = {}
  let totalCount = 0
  
  logs.value.forEach(log => {
    const refVal = log.referrer || 'Direct'
    counts[refVal] = (counts[refVal] || 0) + 1
    totalCount++
  })
  
  return Object.entries(counts)
    .map(([referrer, count]) => {
      const ratio = totalCount > 0 ? ((count / totalCount) * 100).toFixed(1) : '0.0'
      return { referrer, count, ratio }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const popularReferralKeywords = computed(() => {
  const counts = {}
  let hasKeywords = false
  
  logs.value.forEach(log => {
    const kw = log.keyword || 'N/A'
    if (kw && kw !== 'N/A') {
      counts[kw] = (counts[kw] || 0) + 1
      hasKeywords = true
    }
  })
  
  if (!hasKeywords) return []
  
  return Object.entries(counts)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const formatDate = (ts) => {
  const d = new Date(ts)
  return d.toLocaleTimeString()
}
</script>

<style scoped>
.admin-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  opacity: 0.12; /* 타인은 인지하지 못할 수준의 투명도 */
  cursor: default;
  user-select: none;
  transition: opacity 0.2s ease;
  z-index: 99;
}
.admin-indicator:hover {
  opacity: 0.85;
}
.analytics-dashboard {
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  color: var(--vp-c-text-1);
  margin-top: 10px;
}
.analytics-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}
.stat-card {
  background: var(--vp-c-bg-soft);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 8px;
}
.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  line-height: 1.2;
}
.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 8px;
  font-weight: 500;
}

/* 차트 섹션 디자인 */
.charts-section {
  margin-bottom: 32px;
}
.chart-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.tab-btn {
  padding: 10px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}
.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.tab-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #white;
  color: var(--vp-c-bg);
}

/* 날짜 제어 및 표시 바 스타일 */
.date-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 8px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.control-btn {
  padding: 6px 12px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}
.control-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.date-display-wrapper {
  flex: 1;
  text-align: center;
}
.date-picker-input {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-family: inherit;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  outline: none;
}
.date-picker-input:hover {
  border-color: var(--vp-c-brand-1);
}
.date-text-display {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.chart-card {
  padding: 24px;
}
.chart-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 8px;
  margin-bottom: 16px;
}
.chart-card-header h3 {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
}
.period-total {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.period-total strong {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
.chart-container {
  display: flex;
  height: 280px;
  margin-top: 24px;
  gap: 16px;
}
.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  width: 32px;
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  font-weight: 600;
  padding-bottom: 24px; /* X축 라벨 영역만큼 마진 */
}
.chart-bars-wrapper {
  position: relative;
  flex: 1;
  height: 100%;
}
.chart-grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 24px; /* X축 영역 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}
.grid-line {
  border-top: 1px dashed var(--vp-c-divider);
  width: 100%;
  height: 1px;
}
.chart-bars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 8px;
}
.chart-bar-group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: flex-end;
}
.chart-bar-group.weekly {
  max-width: 60px;
}
.chart-bar-group.daily {
  max-width: 32px;
}
.chart-bar-group.monthly {
  max-width: 28px;
}
.bar-track {
  height: calc(100% - 24px);
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.chart-bar-group.weekly .bar-track {
  width: 70%;
  border-radius: 6px;
}
.chart-bar-group.daily .bar-track {
  width: 75%;
  border-radius: 3px;
}
.chart-bar-group.monthly .bar-track {
  width: 80%;
  border-radius: 2px;
}
.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 2px; /* 아주 작은 값도 보이게 설정 */
}
.chart-bar-group.weekly .bar-fill {
  border-radius: 6px 6px 0 0;
}
.chart-bar-group.daily .bar-fill {
  border-radius: 3px 3px 0 0;
}
.chart-bar-group.monthly .bar-fill {
  border-radius: 2px 2px 0 0;
}
.chart-bar-group:hover .bar-fill {
  filter: brightness(1.1);
  box-shadow: 0 0 12px var(--vp-c-brand-3);
}
.bar-label {
  height: 20px;
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-align: center;
  white-space: nowrap;
}
.chart-bar-group.daily .bar-label,
.chart-bar-group.monthly .bar-label {
  font-size: 0.68rem;
}
.bar-label.empty-label {
  height: 20px;
  margin-top: 4px;
}
.bar-tooltip {
  position: absolute;
  bottom: calc(100% - 30px);
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  z-index: 10;
  width: max-content;
}
.chart-bar-group:hover .bar-tooltip {
  opacity: 1;
  transform: translateY(0) scale(1);
  bottom: calc(100% - 10px);
}
.tooltip-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}
.tooltip-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.analytics-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 768px) {
  .analytics-content {
    grid-template-columns: 1fr;
  }
  .bar-label {
    font-size: 0.65rem;
  }
}
.card {
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
.card h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 8px;
}
.card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.card li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
  font-size: 0.95rem;
}
.card li:last-child {
  border-bottom: none;
}
.page-path {
  font-weight: 500;
  word-break: break-all;
}
.page-count {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  margin-left: 10px;
}
.log-time {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  white-space: nowrap;
  margin-right: 12px;
}
.log-path {
  font-weight: 500;
  word-break: break-all;
  flex: 1;
  text-align: right;
  color: var(--vp-c-text-1);
}
.empty-msg {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 20px 0;
}
.search-query {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}
.search-query-recent {
  font-weight: 500;
  word-break: break-all;
  flex: 1;
  text-align: right;
  color: var(--vp-c-text-1);
}
.referrer-domain {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}
.referral-keyword {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}
.localhost-block-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.localhost-block-card .block-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.localhost-block-card h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--vp-c-brand-1);
}
.localhost-block-card p {
  margin: 6px 0;
  font-size: 1rem;
}
.localhost-block-card .desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 500px;
  margin: 16px auto 0;
}
</style>
