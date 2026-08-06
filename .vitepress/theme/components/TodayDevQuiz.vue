<template>
  <div class="quiz-card-container">
    <div class="quiz-header">
      <div class="header-left">
        <span class="header-icon">🧠</span>
        <h3 class="header-title">오늘의 개발 퀴즈</h3>
      </div>
      <span class="quiz-date">{{ todayString }}</span>
    </div>

    <!-- 1. 문제 풀이 화면 -->
    <div v-if="!isAnswered" class="quiz-body">
      <h4 class="quiz-question">{{ currentQuiz.question }}</h4>
      
      <div class="options-list">
        <button 
          v-for="(option, index) in currentQuiz.options" 
          :key="index"
          class="option-btn"
          :class="{ selected: selectedOption === index }"
          @click="selectOption(index)"
        >
          <span class="option-num">{{ index + 1 }}</span>
          <span class="option-text">{{ option }}</span>
        </button>
      </div>

      <button 
        class="submit-btn" 
        :disabled="selectedOption === null"
        @click="checkAnswer"
      >
        <span v-if="selectedOption === null">👉 보기를 먼저 선택해주세요</span>
        <span v-else>✨ 정답 확인하기</span>
      </button>
    </div>

    <!-- 2. 결과 및 해설 화면 -->
    <div v-else class="quiz-result-body">
      <div class="result-status" :class="{ correct: isCorrect }">
        <span class="result-icon">{{ isCorrect ? '🎉 정답입니다! 멋진 실력이네요.' : '😢 오답입니다. 해설을 확인해보세요!' }}</span>
      </div>

      <h4 class="quiz-question">{{ currentQuiz.question }}</h4>
      
      <div class="options-list static">
        <div 
          v-for="(option, index) in currentQuiz.options" 
          :key="index"
          class="option-result-item"
          :class="{ 
            correct: index === currentQuiz.answer, 
            incorrect: index === selectedOption && index !== currentQuiz.answer 
          }"
        >
          <span class="option-num">{{ index + 1 }}</span>
          <span class="option-text">{{ option }}</span>
          <span v-if="index === currentQuiz.answer" class="badge-status">정답</span>
          <span v-else-if="index === selectedOption" class="badge-status incorrect">선택</span>
        </div>
      </div>

      <div class="explanation-box">
        <h5 class="explanation-title">💡 정답 해설</h5>
        <p class="explanation-desc">{{ currentQuiz.explanation }}</p>
      </div>

      <div class="action-footer">
        <button class="retry-btn" @click="resetQuiz">다시 풀기</button>
        <a :href="currentQuiz.link" class="shortcut-link">
          📘 관련 지식 문서 읽기 <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 퀴즈 데이터셋
const quizzes = [
  {
    question: '자바스크립트의 비동기 처리 중 Microtask Queue에 들어가며 Macrotask Queue보다 우선적으로 처리되는 것은?',
    options: ['setTimeout', 'Promise.then / await', 'setInterval', 'requestAnimationFrame'],
    answer: 1, // Promise.then
    explanation: 'Promise의 콜백(then/catch)이나 async/await 이후의 작업은 Microtask Queue에 분류되어 일반적인 setTimeout, setInterval 같은 Macrotask보다 항상 먼저 처리됩니다.',
    link: '/docs/programming-languages/'
  },
  {
    question: '웹 보안 취약점 중 사용자가 입력한 폼 데이터에 악의적인 SQL 명령어를 주입하여 데이터베이스를 탈취/파괴하는 공격은?',
    options: ['XSS (Cross-Site Scripting)', 'CSRF (Cross-Site Request Forgery)', 'SQL Injection', 'DDoS 공격'],
    answer: 2, // SQL Injection
    explanation: 'SQL Injection은 사용자의 입력값을 적절히 검증하지 않고 쿼리 문자열에 합칠 때 발생하며, Prepared Statement(매개변수화된 쿼리)를 사용하는 등 방어 코딩이 필수적입니다.',
    link: '/docs/knowledge-info/backend-roadmap-details#sql-injection'
  },
  {
    question: 'HTTP 프로토콜 메서드 중 리소스를 생성할 때 주로 사용하며, 여러 번 호출 시 매번 새로운 리소스가 생성되어 멱등성(Idempotency)을 가지지 않는 것은?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    answer: 1, // POST
    explanation: 'POST는 서버 데이터 생성을 유발하며 멱등성이 없습니다. 반면 PUT은 특정 리소스를 덮어쓰기 때문에 여러 번 호출해도 결과가 동일한 멱등적 성격을 지닙니다.',
    link: '/docs/knowledge-info/backend-roadmap-details#http'
  },
  {
    question: '데이터베이스 트랜잭션의 ACID 성질 중, 트랜잭션이 비정상적으로 종료될 경우 전체 작업을 취소하고 이전 상태로 되돌려야(Rollback) 함을 보장하는 성질은?',
    options: ['원자성 (Atomicity)', '일관성 (Consistency)', '격리성 (Isolation)', '지속성 (Durability)'],
    answer: 0, // 원자성
    explanation: '원자성(Atomicity)은 트랜잭션 내 작업들이 "전부 실행되거나 아니면 전혀 실행되지 않아야(All or Nothing)" 함을 보장하는 특성입니다.',
    link: '/docs/knowledge-info/database'
  },
  {
    question: 'Docker 컨테이너 기술의 핵심으로, 하나의 호스트 OS 안에서 각 프로세스가 독립된 컴퓨터(네트워크, 파일시스템 등)처럼 격리되어 작동하게 하는 리눅스 커널의 기능은?',
    options: ['cgroups', 'Namespaces', 'Hypervisor', 'KVM'],
    answer: 1, // Namespaces
    explanation: 'Namespaces는 시스템 자원(PID, Network, Mount 등)을 프로세스별로 독립 격리하는 역할을 하며, cgroups는 CPU나 메모리의 물리적 할당 한계를 조율합니다.',
    link: '/docs/knowledge-info/backend-roadmap-details#docker'
  }
]

const today = new Date()
const todayIndex = computed(() => today.getDate() % quizzes.length)
const currentQuiz = computed(() => quizzes[todayIndex.value])

const todayString = computed(() => {
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
})

const selectedOption = ref(null)
const isAnswered = ref(false)
const isCorrect = ref(false)

const selectOption = (index) => {
  selectedOption.value = index
}

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  isCorrect.value = selectedOption.value === currentQuiz.value.answer
  isAnswered.value = true

  if (typeof window !== 'undefined') {
    const quizState = {
      date: todayString.value,
      selectedOption: selectedOption.value,
      isCorrect: isCorrect.value
    }
    localStorage.setItem(`dev_quiz_${todayString.value}`, JSON.stringify(quizState))
  }
}

const resetQuiz = () => {
  selectedOption.value = null
  isAnswered.value = false
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`dev_quiz_${todayString.value}`)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`dev_quiz_${todayString.value}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        selectedOption.value = parsed.selectedOption
        isCorrect.value = parsed.isCorrect
        isAnswered.value = true
      } catch (e) {
        console.error('Saved quiz parsing error', e)
      }
    }
  }
})
</script>

<style scoped>
.quiz-card-container {
  width: 100%;
  padding: 1.5rem;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  font-size: 1.25rem;
}

.header-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.quiz-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.quiz-body, .quiz-result-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.quiz-question {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.55;
  margin: 0 0 1rem 0;
  word-break: keep-all;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.1rem;
}

.option-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.87rem;
}

.option-btn:hover {
  border-color: #6366f1;
  background: var(--vp-c-bg-alt);
}

.option-btn.selected {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  font-weight: 700;
}

.option-num {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  font-weight: 700;
  margin-right: 0.65rem;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.option-btn.selected .option-num {
  background: #6366f1;
  color: #ffffff;
}

.option-text {
  font-weight: 500;
  line-height: 1.4;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: #6366f1;
  color: #ffffff;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.88rem;
  margin-top: auto;
}

.submit-btn:disabled {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
  font-weight: 500;
}

.submit-btn:not(:disabled):hover {
  background: #4f46e5;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* 결과 화면 */
.result-status {
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
}

.result-status.correct {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.result-status:not(.correct) {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.option-result-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.87rem;
  position: relative;
}

.option-result-item.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.option-result-item.incorrect {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.badge-status {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #10b981;
  color: #ffffff;
}

.badge-status.incorrect {
  background: #ef4444;
}

.explanation-box {
  background: var(--vp-c-bg);
  padding: 0.85rem 1rem;
  border-radius: 8px;
  margin-top: 0.8rem;
  border-left: 3px solid #6366f1;
}

.explanation-title {
  margin: 0 0 0.35rem 0;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.explanation-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.action-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.retry-btn {
  font-size: 0.78rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.retry-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.shortcut-link {
  font-weight: 600;
  color: #6366f1;
  text-decoration: none !important;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.shortcut-link:hover {
  text-decoration: underline !important;
}
</style>
