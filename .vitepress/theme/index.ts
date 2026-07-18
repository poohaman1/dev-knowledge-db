import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CustomLayout from './components/CustomLayout.vue'
import KnowledgeInfoGrid from './components/KnowledgeInfoGrid.vue'
import SiteAnalyticsDashboard from './components/SiteAnalyticsDashboard.vue'
import SecureGuard from './components/SecureGuard.vue'
import HomeBannerSlider from './components/HomeBannerSlider.vue'
import MiniGames from './components/MiniGames.vue'
import TodayDevQuiz from './components/TodayDevQuiz.vue'
import DocActionButtons from './components/DocActionButtons.vue'
import LearningProgress from './components/LearningProgress.vue'
import DevTools from './components/DevTools.vue'


export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router }) {
    app.component('KnowledgeInfoGrid', KnowledgeInfoGrid)
    app.component('SiteAnalyticsDashboard', SiteAnalyticsDashboard)
    app.component('SecureGuard', SecureGuard)
    app.component('HomeBannerSlider', HomeBannerSlider)
    app.component('TodayDevQuiz', TodayDevQuiz)
    app.component('MiniGames', MiniGames)
    app.component('DocActionButtons', DocActionButtons)
    app.component('LearningProgress', LearningProgress)
    app.component('DevTools', DevTools)


    if (typeof window !== 'undefined') {
      // 1. 초기 진입 시 특정 폴더로의 다이렉트 접근 차단 로직 (Home으로 강제 이동) 및 로컬스토리지 캐시 초기화
      if (!sessionStorage.getItem('site_accessed')) {
        sessionStorage.setItem('site_accessed', 'true')
        try {
          localStorage.removeItem('knowledge_info_xml_v4')
        } catch (e) {
          console.error(e)
        }

        // 유입경로(Referrer) 및 유입 키워드 파싱 및 캐시
        let rawReferrer = document.referrer || ''
        let parsedReferrer = 'Direct'
        let parsedKeyword = 'N/A'

        if (rawReferrer && !rawReferrer.includes(window.location.host)) {
          try {
            const urlObj = new URL(rawReferrer)
            const hostname = urlObj.hostname.toLowerCase()
            
            if (hostname === 'blog.naver.com' || hostname.includes('.blog.naver.com')) {
              parsedReferrer = 'Naver Blog'
            } else if (hostname.endsWith('tistory.com')) {
              parsedReferrer = 'Tistory Blog'
            } else {
              parsedReferrer = hostname.replace('www.', '')
            }

            const searchParams = urlObj.searchParams
            const keywordParam = searchParams.get('q') || searchParams.get('query') || searchParams.get('wd')
            if (keywordParam) {
              parsedKeyword = decodeURIComponent(keywordParam).trim()
            }
          } catch (e) {
            console.error('Referrer parsing error:', e)
          }
        }

        // 현재 URL 파라미터에서 UTM / 검색어 파싱
        try {
          const currentUrlParams = new URLSearchParams(window.location.search)
          const utmTerm = currentUrlParams.get('utm_term') || currentUrlParams.get('q') || currentUrlParams.get('query')
          if (utmTerm) {
            parsedKeyword = decodeURIComponent(utmTerm).trim()
          }
          const utmSource = currentUrlParams.get('utm_source')
          if (utmSource) {
            parsedReferrer = utmSource.trim()
          }
        } catch (e) {
          console.error('Current URL parsing error:', e)
        }

        sessionStorage.setItem('entry_referrer', parsedReferrer)
        sessionStorage.setItem('entry_keyword', parsedKeyword)

        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          window.location.href = '/'
          return
        }
      }

      // IP 분석 및 제외 여부 검증 헬퍼 함수
      const isExcludedIp = async (): Promise<boolean> => {
        try {
          let cachedIp = sessionStorage.getItem('user_ip')
          if (!cachedIp) {
            const res = await fetch('https://api.ipify.org?format=json')
            const data = await res.json()
            cachedIp = data.ip
            if (cachedIp) {
              sessionStorage.setItem('user_ip', cachedIp)
            }
          }
          return cachedIp === '112.186.113.99'
        } catch (e) {
          console.error('IP fetch error for exclusion:', e)
          return false
        }
      }

      // 2. 라우터 변경 시 URL 마스킹 및 방문 기록
      router.onAfterRouteChanged = (to) => {
        // 브라우저 주소창의 URL을 항상 루트('/')로 덮어씌워 내부 디렉터리 경로 노출 방지
        if (window.location.pathname !== '/') {
          window.history.replaceState(null, '', '/');
        }

        // localhost로 접속한 경우에는 로그를 수집하지 않음
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          return;
        }

        // 타이틀이 브라우저 탭에 업데이트될 시간을 위해 약간 지연
        setTimeout(async () => {
          try {
            // 특정 관리자 IP(112.186.113.99)인 경우 방문 기록 수집 제외
            if (await isExcludedIp()) {
              return
            }

            const logsStr = localStorage.getItem('site_analytics_logs')
            const logs = logsStr ? JSON.parse(logsStr) : []
            
            // "타이틀 | 지식DB" 형식에서 "타이틀"만 추출
            const pageTitle = document.title.split('|')[0].trim() || 'Home'
            const referrer = sessionStorage.getItem('entry_referrer') || 'Direct'
            const keyword = sessionStorage.getItem('entry_keyword') || 'N/A'
            
            logs.push({ 
              path: pageTitle, 
              timestamp: Date.now(),
              referrer,
              keyword
            })
            // Limit logs to last 5000 entries
            if (logs.length > 5000) logs.shift()
            localStorage.setItem('site_analytics_logs', JSON.stringify(logs))
          } catch (e) {
            console.error('Analytics error:', e)
          }
        }, 100)
      }
      
      // 3. 해킹 방지 (개발자도구 F12 및 우클릭 방지 - 선택적 적용)
      // window.addEventListener('contextmenu', e => e.preventDefault());
      // window.addEventListener('keydown', e => {
      //   if(e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) e.preventDefault();
      // });

      // 5. 홈 링크(/) 클릭 가로채기 및 강제 라우팅 이동 (URL 마스킹 호환용)
      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const anchor = target.closest('a')
        if (anchor) {
          const href = anchor.getAttribute('href')
          if (href === '/' || href === '/index.html' || href === '') {
            if (router.route.path !== '/' && router.route.path !== '/index.html') {
              e.preventDefault()
              router.go('/')
            }
          }
        }
      }, { capture: true })

      // 4. 검색어 로깅 감지
      let searchTimeout: any = null
      let lastLoggedSearch = ''
      
      const logSearchQuery = async (query: string) => {
        // localhost로 접속한 경우에는 검색어 로그를 수집하지 않음
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;

        // 특정 관리자 IP(112.186.113.99)인 경우 검색 로그 수집 제외
        if (await isExcludedIp()) return

        const cleaned = query.trim()
        if (!cleaned || cleaned.length < 2 || cleaned === lastLoggedSearch) return
        
        try {
          const searchLogsStr = localStorage.getItem('site_search_logs')
          const searchLogs = searchLogsStr ? JSON.parse(searchLogsStr) : []
          searchLogs.push({ query: cleaned, timestamp: Date.now() })
          
          if (searchLogs.length > 1000) searchLogs.shift()
          localStorage.setItem('site_search_logs', JSON.stringify(searchLogs))
          lastLoggedSearch = cleaned
        } catch (e) {
          console.error('Search log error:', e)
        }
      }

      window.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        if (target && target.tagName === 'INPUT' && (
          target.classList.contains('VPLocalSearchBox-input') || 
          (target.placeholder && (target.placeholder.includes('검색') || target.placeholder.toLowerCase().includes('search')))
        )) {
          clearTimeout(searchTimeout)
          searchTimeout = setTimeout(() => {
            logSearchQuery(target.value)
          }, 1200) // 1.2초간 입력이 멈추면 검색어로 기록
        }
      })

      window.addEventListener('keydown', (e) => {
        const target = e.target as HTMLInputElement
        if (e.key === 'Enter' && target && target.tagName === 'INPUT' && (
          target.classList.contains('VPLocalSearchBox-input') || 
          (target.placeholder && (target.placeholder.includes('검색') || target.placeholder.toLowerCase().includes('search')))
        )) {
          clearTimeout(searchTimeout)
          logSearchQuery(target.value)
        }
      })
    }
  }
}
