import DefaultTheme from 'vitepress/theme'
import './custom.css'
import CustomLayout from './components/CustomLayout.vue'
import KnowledgeInfoGrid from './components/KnowledgeInfoGrid.vue'
import SiteAnalyticsDashboard from './components/SiteAnalyticsDashboard.vue'
import SecureGuard from './components/SecureGuard.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router }) {
    app.component('KnowledgeInfoGrid', KnowledgeInfoGrid)
    app.component('SiteAnalyticsDashboard', SiteAnalyticsDashboard)
    app.component('SecureGuard', SecureGuard)

    if (typeof window !== 'undefined') {
      // 1. 초기 진입 시 특정 폴더로의 다이렉트 접근 차단 로직 (Home으로 강제 이동) 및 로컬스토리지 캐시 초기화
      if (!sessionStorage.getItem('site_accessed')) {
        sessionStorage.setItem('site_accessed', 'true')
        try {
          localStorage.removeItem('knowledge_info_xml_v4')
        } catch (e) {
          console.error(e)
        }
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          window.location.href = '/'
          return
        }
      }

      // 2. 라우터 변경 시 URL 마스킹 및 방문 기록
      router.onAfterRouteChanged = (to) => {
        // 브라우저 주소창의 URL을 항상 루트('/')로 덮어씌워 내부 디렉터리 경로 노출 방지
        if (window.location.pathname !== '/') {
          window.history.replaceState(null, '', '/');
        }

        // 타이틀이 브라우저 탭에 업데이트될 시간을 위해 약간 지연
        setTimeout(() => {
          try {
            const logsStr = localStorage.getItem('site_analytics_logs')
            const logs = logsStr ? JSON.parse(logsStr) : []
            
            // "타이틀 | 지식DB" 형식에서 "타이틀"만 추출
            const pageTitle = document.title.split('|')[0].trim() || 'Home'
            
            logs.push({ path: pageTitle, timestamp: Date.now() })
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
      
      const logSearchQuery = (query: string) => {
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
