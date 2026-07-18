import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "개발자를 위한 지식DB",
  description: "개발자들이 매일 활용할 수 있는 국내외 지식 베이스",

  head: [
    // Google Fonts: Inter + Noto Sans KR
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap', rel: 'stylesheet' }],
    // Favicon (emoji-based)
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>' }],
    // Security Meta Tags (로컬 개발 및 SPA 라우팅 작동을 방해할 수 있으므로 주석 처리 또는 제거)
    // ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' ws://localhost:* ws://127.0.0.1:* http://localhost:* http://127.0.0.1:*;" }],
    // ['meta', { 'http-equiv': 'X-Frame-Options', content: 'DENY' }],
    // ['meta', { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' }]
  ],

  themeConfig: {
    // 로고 & 사이트 타이틀
    siteTitle: '지식DB',

    // 상단 네비게이션
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '📋 지식콘텐츠', link: '/docs/knowledge-info/' },
      { text: '📚 지식 데이터', link: '/docs/domestic/' },
      { text: '⚙️ 가이드라인', link: '/guidelines/Agent' },
      { text: '🛠️ 개발자툴', link: '/docs/tools/devtools' },
      { text: '💎 컬렉션', link: '/docs/collections/github-stars-global' },
      { text: '🎮 게임', link: '/docs/mini-games/' }
    ],

    // 사이드바
    sidebar: [
      {
        text: '📋 지식 콘텐츠',
        items: [
          { text: '지식콘텐츠 관리', link: '/docs/knowledge-info/' },
          { text: '백엔드 개발에 대한 정보', link: '/docs/knowledge-info/backend-roadmap' },
          { text: '프론트엔드 개발에 대한 정보', link: '/docs/knowledge-info/frontend-roadmap' },
          { text: '데이터베이스 정보', link: '/docs/knowledge-info/database' }
        ]
      },
      {
        text: '📚 지식 데이터',
        items: [
          { text: '프로그래밍 언어', link: '/docs/programming-languages/' },
          { text: '국내 사이트 (Domestic)', link: '/docs/domestic/' },
          { text: '해외 사이트 (International)', link: '/docs/international/' },
          { text: '개발정보 (Dev Info)', link: '/docs/prompts/' },
          { text: '유용한 도구 (Tools)', link: '/docs/tools/' },
          { text: '아키텍처 (Architecture)', link: '/docs/architecture/' },
          { text: '베스트 프랙티스', link: '/docs/best-practices/' },
          { text: '기업별 기술스택', link: '/docs/company-tech-stack' },
          { text: 'LLM (대규모 언어 모델)', link: '/docs/llm/' }
        ]
      },
      {
        text: '⚙️ 가이드라인 및 규칙',
        items: [
          { text: 'AI Agent 지침', link: '/guidelines/Agent' },
          { text: 'Gemini 특화 가이드', link: '/guidelines/GEMINI' },
          { text: '스킬 정의서', link: '/guidelines/SKILL' },
          { text: '보안가이드', link: '/guidelines/SECURITY' },
          { text: '프롬프트 템플릿', link: '/templates/PROMPT-TEMPLATE' },
          { text: '디자인 및 마크다운', link: '/DESIGN' },
          { text: '폴더 구조 안내', link: '/FOLDER-STRUCTURE' },
          { text: '개발 및 빌드', link: '/DEVELOPMENT' }
        ]
      },
      {
        text: '💎 컬렉션',
        items: [
          { text: '🌍 깃허브 스타(해외)', link: '/docs/collections/github-stars-global' },
          { text: '🇰🇷 깃허브 스타(국내)', link: '/docs/collections/github-stars-korea' },
          { text: '🔥 SourceForge', link: '/docs/collections/sourceforge' }
        ]
      }
    ],

    // 로컬 검색 활성화
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '검색', buttonAriaLabel: '검색' },
          modal: {
            noResultsText: '검색 결과가 없습니다',
            resetButtonTitle: '초기화',
            footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' }
          }
        }
      }
    },

    // 소셜 링크
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    // 푸터
    footer: {
      message: '개발자를 위한 지식DB — 더 나은 개발 경험을 위해',
      copyright: '© 2026 Dev Knowledge DB. Built with VitePress.'
    },

    // 마지막 업데이트 표시
    lastUpdated: {
      text: '최종 수정일'
    },

    // 이전/다음 페이지 텍스트
    docFooter: {
      prev: '이전 페이지',
      next: '다음 페이지'
    },

    // 목차 (Table of Contents)
    outline: {
      label: '목차',
      level: [2, 3]
    }
  }
})
