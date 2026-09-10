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
    // Security Meta Tags
    ['meta', { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' }],
    ['meta', { 'http-equiv': 'X-Frame-Options', content: 'DENY' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }]
  ],

  themeConfig: {
    // 로고 & 사이트 타이틀
    siteTitle: '지식DB',

    // 상단 네비게이션
    nav: [
      { text: '🏠 Home', link: '/' },
      {
        text: '🧠 LLM가이드',
        items: [
          { text: '📖 LLM 가이드 총람', link: '/docs/llm/' },
          { text: '⚡ GPT-6 (OpenAI 최신)', link: '/docs/llm/gpt-6' },
          { text: '⚡ Claude 5.1 (Anthropic 최신)', link: '/docs/llm/claude-5-1' },
          { text: '⚡ Gemini 3.1 Pro (Google 플래그십)', link: '/docs/llm/gemini-3-1-pro' },
          { text: '⚡ Gemini 3.8 Flash (Google 실시간)', link: '/docs/llm/gemini-3-8-flash' },
          { text: '⚡ Grok 4.6 (xAI 최신)', link: '/docs/llm/grok-4-6' },
          { text: '⚡ DeepSeek-V3 & R1 (오픈소스 1위)', link: '/docs/llm/deepseek-v3' },
          { text: '⚡ Qwen 2.5-Max / Coder (알리바바)', link: '/docs/llm/qwen-2-5-max' },
          { text: '⚡ Kimi k1.5 (200만 롱컨텍스트)', link: '/docs/llm/kimi-k1-5' },
          { text: '⚡ Llama 5.1 (Meta 온프레미스)', link: '/docs/llm/llama-5-1' },
          { text: '⚡ HyperCLOVA X 3 (네이버)', link: '/docs/llm/hyperclova-x-3' },
          { text: '⚡ Solar 3 (업스테이지)', link: '/docs/llm/solar-3' }
        ]
      },
      { text: '📋 지식콘텐츠', link: '/docs/knowledge-info/' },
      { text: '📚 지식 데이터', link: '/docs/domestic/' },
      { text: '⚙️ 가이드라인', link: '/guidelines/Agent' },
      { text: '🛠️ 개발자툴', link: '/docs/tools/devtools' },
      { text: '💎 컬렉션', link: '/docs/collections/github-stars-global' },
      {
        text: '⚖️ 법률정보',
        items: [
          { text: '법률정보 개요', link: '/docs/legal/' },
          { text: '지식재산권(IP)', link: '/docs/legal/ip' },
          { text: '개인정보보호 및 데이터 규제', link: '/docs/legal/privacy-data' },
          { text: '계약 및 노무', link: '/docs/legal/contracts-labor' },
          { text: '정보보안 및 컴플라이언스', link: '/docs/legal/security-compliance' },
          { text: 'AI 및 생성형 AI 관련 법률 이슈', link: '/docs/legal/ai-legal' },
          { text: '전자상거래 및 서비스 운영', link: '/docs/legal/ecommerce-operations' },
          { text: '국제 규제 및 수출입', link: '/docs/legal/international-regulations' }
        ]
      },
      { text: '🎮 게임', link: '/docs/mini-games/' }
    ],

    // 사이드바
    sidebar: [
      {
        text: '🧠 최신 플래그십 LLM',
        collapsed: false,
        items: [
          { text: '📋 LLM 가이드 총람', link: '/docs/llm/' },
          { text: '⚡ GPT-6 (OpenAI 최신)', link: '/docs/llm/gpt-6' },
          { text: '⚡ Claude 5.1 (Anthropic 최신)', link: '/docs/llm/claude-5-1' },
          { text: '⚡ Gemini 3.1 Pro (Google 플래그십)', link: '/docs/llm/gemini-3-1-pro' },
          { text: '⚡ Gemini 3.8 Flash (Google 실시간)', link: '/docs/llm/gemini-3-8-flash' },
          { text: '⚡ Grok 4.6 (xAI 최신)', link: '/docs/llm/grok-4-6' },
          { text: '⚡ Llama 5.1 (Meta 온프레미스)', link: '/docs/llm/llama-5-1' },
          { text: '⚡ HyperCLOVA X 3 (네이버)', link: '/docs/llm/hyperclova-x-3' },
          { text: '⚡ Solar 3 (업스테이지)', link: '/docs/llm/solar-3' }
        ]
      },
      {
        text: '🇨🇳 중국 대표 혁신 LLM',
        collapsed: false,
        items: [
          { text: '🌟 DeepSeek-V3 (671B MoE 오픈)', link: '/docs/llm/deepseek-v3' },
          { text: '🧠 DeepSeek-R1 (o1급 심층 추론)', link: '/docs/llm/deepseek-r1' },
          { text: '👑 Qwen 2.5-Max (알리바바 플래그십)', link: '/docs/llm/qwen-2-5-max' },
          { text: '💻 Qwen 2.5-Coder (글로벌 코딩 1위)', link: '/docs/llm/qwen-2-5-coder' },
          { text: '🌕 Kimi k1.5 (200만 롱컨텍스트)', link: '/docs/llm/kimi-k1-5' },
          { text: '🎓 GLM-4-Plus (칭화대 즈푸 AI)', link: '/docs/llm/glm-4-plus' },
          { text: '⚡ MiniMax-Text-01 (400만 토큰)', link: '/docs/llm/minimax-text-01' },
          { text: '⚡ Yi-Lightning (01.AI 초고속)', link: '/docs/llm/yi-lightning' },
          { text: '🏥 Baichuan 4 (백천지능 의료/RAG)', link: '/docs/llm/baichuan-4' },
          { text: '🪐 Step-2 (지웨스단 1조 MoE)', link: '/docs/llm/step-2' },
          { text: '🐧 Hunyuan-Large (텐센트 389B)', link: '/docs/llm/hunyuan-large' }
        ]
      },
      {
        text: '📋 지식 콘텐츠',
        items: [
          { text: '지식콘텐츠 관리', link: '/docs/knowledge-info/' },
          { text: 'Agentic OS', link: '/docs/knowledge-info/agentic-os' },
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
          { text: '기업별 기술스택', link: '/docs/company-tech-stack' }
        ]
      },
      {
        text: '⚖️ 법률정보',
        items: [
          { text: '법률정보 개요 및 면책고지', link: '/docs/legal/' },
          { text: '지식재산권(IP)', link: '/docs/legal/ip' },
          { text: '개인정보보호 및 데이터 규제', link: '/docs/legal/privacy-data' },
          { text: '계약 및 노무', link: '/docs/legal/contracts-labor' },
          { text: '정보보안 및 컴플라이언스', link: '/docs/legal/security-compliance' },
          { text: 'AI 및 생성형 AI 관련 법률 이슈', link: '/docs/legal/ai-legal' },
          { text: '전자상거래 및 서비스 운영', link: '/docs/legal/ecommerce-operations' },
          { text: '국제 규제 및 수출입', link: '/docs/legal/international-regulations' }
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
          { text: '🔥 SourceForge', link: '/docs/collections/sourceforge' },
          { text: '😎 Awesome Open Source', link: '/docs/collections/awesome-open-source' }
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
