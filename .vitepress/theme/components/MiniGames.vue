<template>
  <div class="mini-games-center">
    <div class="header-section">
      <h1 class="main-title">일하다 잠깐 머리 식히는 요즘IT 미니 게임</h1>
      <p class="subtitle">스트레스 해소와 두뇌 회전을 위한 9가지 미니 게임을 즐겨보세요!</p>
    </div>

    <!-- 로비 화면 (게임 목록) -->
    <div v-if="gameStage === 'lobby'" class="lobby-container">
      <div class="games-grid">
        <div 
          v-for="game in games" 
          :key="game.id" 
          class="game-card" 
          @click="selectGame(game)"
        >
          <div class="game-icon-wrapper" :style="{ background: game.colorBg }">
            <span class="game-icon">{{ game.icon }}</span>
          </div>
          <h3 class="game-title">{{ game.name }}</h3>
          <p class="game-desc">{{ game.desc }}</p>
        </div>
      </div>

      <!-- 최근 전적 기록 섹션 -->
      <div class="history-section">
        <div class="section-header">
          <h2>🕒 나의 게임 플레이 기록 (최근 10건)</h2>
          <button v-if="history.length > 0" class="btn btn-clear-history" @click="clearHistory">기록 초기화</button>
        </div>
        <div class="card history-card">
          <table v-if="history.length > 0" class="history-table">
            <thead>
              <tr>
                <th>게임명</th>
                <th>결과</th>
                <th>세부 기록</th>
                <th>소요 시간</th>
                <th>플레이 일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, idx) in history.slice(0, 10)" :key="idx" :class="record.status">
                <td><strong>{{ record.gameName }}</strong></td>
                <td>
                  <span :class="['status-badge', record.status]">
                    {{ record.statusText }}
                  </span>
                </td>
                <td>{{ record.score }}</td>
                <td>{{ record.duration }}</td>
                <td>{{ formatDate(record.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="empty-msg">아직 기록된 게임 전적이 없습니다. 첫 게임을 시작해보세요!</p>
        </div>
      </div>
    </div>

    <!-- 게임 준비 화면 (대기방) -->
    <div v-else-if="gameStage === 'ready'" class="ready-container">
      <div class="card ready-card">
        <div class="back-btn-wrapper">
          <button class="btn btn-outline" @click="goLobby">◀ 게임 목록으로</button>
        </div>
        <div class="ready-info">
          <div class="game-big-icon" :style="{ background: selectedGameData.colorBg }">{{ selectedGameData.icon }}</div>
          <h2 class="ready-title">{{ selectedGameData.name }}</h2>
          <p class="ready-desc">{{ selectedGameData.desc }}</p>
          
          <div class="how-to-play">
            <h4 class="how-to-title">💡 플레이 가이드</h4>
            <div class="instruction-steps">
              <div v-for="(instruction, idx) in selectedGameData.instructions" :key="idx" class="step-item">
                <span class="step-number">{{ idx + 1 }}</span>
                <span class="step-text">{{ instruction }}</span>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-start-game" @click="startGame">게임 시작하기 🚀</button>
        </div>
      </div>
    </div>

    <!-- 실제 게임 플레이 화면 -->
    <div v-else-if="gameStage === 'playing'" class="playing-container">
      <div class="card game-play-card">
        <div class="game-header">
          <div class="game-header-info">
            <span class="game-icon-small">{{ selectedGameData.icon }}</span>
            <span class="game-title-small">{{ selectedGameData.name }}</span>
          </div>
          <div class="game-timer" v-if="selectedGameId !== 'reaction_time'">
            ⏱️ 경과 시간: <strong>{{ formattedTimer }}</strong>
          </div>
          <button class="btn btn-outline btn-stop-abort" @click="abortGame">포기하기</button>
        </div>

        <div class="game-stage-wrapper">
          <!-- 1. 스도쿠 게임 -->
          <div v-if="selectedGameId === 'sudoku'" class="sudoku-board-wrapper">
            <div class="sudoku-grid">
              <div 
                v-for="(cell, idx) in sudokuBoard" 
                :key="idx" 
                :class="['sudoku-cell', { readonly: cell.readonly, selected: sudokuSelectedIndex === idx, error: cell.error }]"
                @click="selectSudokuCell(idx)"
              >
                {{ cell.value || '' }}
              </div>
            </div>
            <div class="sudoku-keypad">
              <button 
                v-for="num in [1, 2, 3, 4]" 
                :key="num" 
                class="keypad-btn"
                @click="inputSudokuNumber(num)"
              >
                {{ num }}
              </button>
              <button class="keypad-btn btn-clear" @click="inputSudokuNumber(0)">지우기</button>
            </div>
            <button class="btn btn-primary" style="margin-top: 20px; width: 100%;" @click="checkSudokuComplete">정답 확인</button>
          </div>

          <!-- 2. 숫자 기억 게임 -->
          <div v-else-if="selectedGameId === 'remember_numbers'" class="remember-numbers-wrapper">
            <div class="game-status-info">
              <span>레벨: <strong>{{ rnLevel }} / 5</strong></span>
              <span>남은 생명: <strong style="color: #ef4444;">{{ '❤️'.repeat(rnLives) }}</strong></span>
            </div>

            <!-- 숫자 노출 화면 -->
            <div v-if="rnStatus === 'show'" class="rn-number-display-box">
              <div class="rn-number-display">{{ rnTargetNumber }}</div>
              <div class="rn-progress-container">
                <div class="rn-progress-bar" :style="{ width: rnProgressWidth + '%' }"></div>
              </div>
              <p class="rn-status-text">이 숫자를 기억하세요!</p>
            </div>

            <!-- 숫자 입력 화면 -->
            <div v-else-if="rnStatus === 'input'" class="rn-input-box">
              <div class="rn-masked-display">{{ rnUserInput || '숫자를 입력하세요' }}</div>
              
              <div class="rn-keyboard">
                <button v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="n" class="keypad-btn" @click="pressRnKey(n)">{{ n }}</button>
                <button class="keypad-btn btn-danger" @click="pressRnKey('clear')">C</button>
                <button class="keypad-btn" @click="pressRnKey(0)">0</button>
                <button class="keypad-btn btn-primary-color" @click="submitRnAnswer">확인</button>
              </div>
            </div>
          </div>

          <!-- 3. 색깔-글자 불일치 게임 (Stroop) -->
          <div v-else-if="selectedGameId === 'stroop_test'" class="stroop-wrapper">
            <div class="stroop-status">
              <span>현재 점수: <strong>{{ stScore }} / 15</strong></span>
              <span>남은 시간: <strong :style="{ color: stTimeLeft <= 10 ? '#ef4444' : '' }">{{ stTimeLeft }}초</strong></span>
            </div>

            <div class="stroop-word-card">
              <h1 class="stroop-word" :style="{ color: stTargetColor.hex }">{{ stTargetWord }}</h1>
            </div>
            <p class="stroop-question">위 단어의 <strong style="color: var(--vp-c-brand-1);">실제 글자 색상</strong>은 무엇일까요?</p>

            <div class="stroop-buttons">
              <button 
                v-for="color in stColors" 
                :key="color.name" 
                class="stroop-btn"
                :style="{ borderLeft: `6px solid ${color.hex}` }"
                @click="submitStroopAnswer(color.name)"
              >
                {{ color.name }}
              </button>
            </div>
          </div>

          <!-- 4. 반응속도 게임 -->
          <div v-else-if="selectedGameId === 'reaction_time'" class="reaction-wrapper">
            <div class="reaction-status">
              <span>시도: <strong>{{ rtAttemptCount }} / 3</strong></span>
              <span v-if="rtAttempts.length > 0">이전 기록: {{ rtAttempts.map(a => a + 'ms').join(', ') }}</span>
            </div>

            <div 
              class="reaction-box" 
              :class="rtState"
              @click="clickReactionBox"
            >
              <div v-if="rtState === 'waiting'" class="rt-box-content">
                <span class="rt-icon">🔴</span>
                <h3>대기하세요...</h3>
                <p>배경이 초록색이 되면 즉시 클릭하세요!</p>
              </div>
              <div v-else-if="rtState === 'ready'" class="rt-box-content">
                <span class="rt-icon">🟢</span>
                <h3>지금 클릭하세요!!!</h3>
                <p>배경색이 바뀌는 순간 누르세요!</p>
              </div>
              <div v-else-if="rtState === 'early'" class="rt-box-content">
                <span class="rt-icon">⚠️</span>
                <h3>부정 출발!</h3>
                <p>초록색이 되기 전에 누르면 안 됩니다. 화면을 클릭해 다시 준비하세요.</p>
              </div>
              <div v-else-if="rtState === 'result'" class="rt-box-content">
                <span class="rt-icon">⚡</span>
                <h3>반응속도: {{ rtLastTime }}ms</h3>
                <p>화면을 클릭하면 다음 테스트가 시작됩니다.</p>
              </div>
            </div>
          </div>

          <!-- 5. 오목 -->
          <div v-else-if="selectedGameId === 'omok'" class="omok-wrapper">
            <div class="omok-status">
              <span>상태: <strong :style="{ color: omokTurn === 'player' ? 'var(--vp-c-brand-1)' : '#ef4444' }">{{ omokTurn === 'player' ? '내 차례 (흑돌 ⚫)' : 'AI 차례 (백돌 ⚪)' }}</strong></span>
            </div>
            <div class="omok-board-container">
              <div class="omok-grid">
                <div 
                  v-for="(cell, idx) in omokBoard" 
                  :key="idx" 
                  class="omok-cell"
                  @click="playOmok(idx)"
                >
                  <div class="omok-stone" :class="cell" v-if="cell"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. AI 가위바위보 심리전 -->
          <div v-else-if="selectedGameId === 'rps_psychology'" class="rps-wrapper">
            <div class="rps-scoreboard">
              <div class="rps-score-item player">
                <span class="rps-score-label">플레이어</span>
                <span class="rps-score-value">{{ rpsPlayerScore }}</span>
              </div>
              <div class="rps-score-vs">VS</div>
              <div class="rps-score-item ai">
                <span class="rps-score-label">심리분석 AI</span>
                <span class="rps-score-value">{{ rpsAiScore }}</span>
              </div>
            </div>

            <div class="rps-board">
              <div class="rps-status-bubble">
                <div v-if="rpsLastResult" class="rps-result-text">{{ rpsLastResult }}</div>
                <div v-else class="rps-intro-text">가위, 바위, 보 중 하나를 선택해 주세요 (5선승제)</div>
              </div>

              <div class="rps-hands-display" v-if="rpsPlayerChoice && rpsAiChoice">
                <div class="hand-card">
                  <div class="hand-icon">{{ rpsHandIcons[rpsPlayerChoice] }}</div>
                  <div class="hand-owner">나</div>
                </div>
                <div class="hand-card">
                  <div class="hand-icon">{{ rpsHandIcons[rpsAiChoice] }}</div>
                  <div class="hand-owner">AI</div>
                </div>
              </div>
            </div>

            <div class="rps-buttons">
              <button class="rps-action-btn" @click="playRps('rock')">✊<br>바위</button>
              <button class="rps-action-btn" @click="playRps('scissors')">✌️<br>가위</button>
              <button class="rps-action-btn" @click="playRps('paper')">✋<br>보</button>
            </div>
          </div>

          <!-- 7. 카드 뒤집기 (카드 매칭) -->
          <div v-else-if="selectedGameId === 'card_match'" class="card-match-wrapper">
            <div class="card-match-status">
              <span>매칭 성공: <strong>{{ cmMatchedCount }} / 8 쌍</strong></span>
            </div>
            <div class="card-match-grid">
              <div 
                v-for="(card, idx) in cmCards" 
                :key="idx" 
                class="match-card-item"
                :class="{ flipped: card.isFlipped || card.isMatched, matched: card.isMatched }"
                @click="flipCmCard(idx)"
              >
                <div class="card-inner">
                  <div class="card-front">❓</div>
                  <div class="card-back">{{ card.emoji }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 8. 틱택토 -->
          <div v-else-if="selectedGameId === 'tic_tac_toe'" class="ttt-wrapper">
            <div class="ttt-status">
              <span>상태: <strong :style="{ color: tttTurn === 'player' ? 'var(--vp-c-brand-1)' : '#ef4444' }">{{ tttTurn === 'player' ? '내 차례 (X)' : 'AI 차례 (O)' }}</strong></span>
            </div>
            <div class="ttt-grid">
              <div 
                v-for="(cell, idx) in tttBoard" 
                :key="idx" 
                class="ttt-cell"
                :class="{ 'x-mark': cell === 'X', 'o-mark': cell === 'O' }"
                @click="playTtt(idx)"
              >
                {{ cell }}
              </div>
            </div>
          </div>

          <!-- 9. 10초 맞추기 -->
          <div v-else-if="selectedGameId === 'ten_seconds'" class="ten-seconds-wrapper">
            <div class="ts-display-box">
              <div v-if="tsState === 'running' && tsElapsedTime >= 3000" class="ts-time-text blind">
                ⏱️ ??.??
              </div>
              <div v-else class="ts-time-text" :class="{ success: tsState === 'stopped' && tsIsSuccess }">
                ⏱️ {{ (tsElapsedTime / 1000).toFixed(2) }}s
              </div>
              <p class="ts-helper-text" v-if="tsState === 'running' && tsElapsedTime >= 3000">
                ⚠️ 3초 이후부터 타이머가 보이지 않습니다! 감각에 의존하세요!
              </p>
              <p class="ts-helper-text" v-else-if="tsState === 'ready'">
                시작 버튼을 누르면 타이머가 돌기 시작합니다.
              </p>
              <p class="ts-helper-text" v-else-if="tsState === 'stopped'">
                목표: 10.00초 | 내 기록: {{ (tsElapsedTime / 1000).toFixed(2) }}초
              </p>
            </div>
            
            <div class="ts-actions">
              <button v-if="tsState === 'ready'" class="btn btn-primary btn-large" @click="startTs">시작 ⏱️</button>
              <button v-else-if="tsState === 'running'" class="btn btn-danger btn-large" @click="stopTs">정지 🛑</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 게임 결과 화면 -->
    <div v-else-if="gameStage === 'result'" class="result-container">
      <div class="card result-card" :class="gameResult.status">
        <h2 class="result-title">{{ gameResult.title }}</h2>
        <div class="result-icon-big">
          {{ gameResult.status === 'win' ? '🎉' : gameResult.status === 'tie' ? '🤝' : '😢' }}
        </div>
        <p class="result-message">{{ gameResult.message }}</p>

        <div class="result-details">
          <div class="detail-item">
            <span class="detail-label">게임 명</span>
            <span class="detail-value">{{ selectedGameData.name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">결과</span>
            <span class="detail-value status-text" :class="gameResult.status">{{ gameResult.statusText }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">상세 기록</span>
            <span class="detail-value">{{ gameResult.score }}</span>
          </div>
          <div class="detail-item" v-if="gameResult.duration">
            <span class="detail-label">소요 시간</span>
            <span class="detail-value">{{ gameResult.duration }}</span>
          </div>
        </div>

        <div class="result-buttons">
          <button class="btn btn-primary" @click="retryGame">다시 하기 🔄</button>
          <button class="btn btn-outline" @click="goLobby">게임 목록으로 🏠</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const gameStage = ref('lobby') // 'lobby', 'ready', 'playing', 'result'
const selectedGameId = ref('')
const history = ref([])

// 게임 정보 정의 (9종 구성 - 방탈출 대신 오목 탑재)
const games = [
  {
    id: 'sudoku',
    name: '스도쿠',
    desc: '뇌가 좋아하는 규칙적인 숫자 장난감',
    icon: '🔢',
    colorBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    instructions: [
      '4x4 크기의 격자 내 비어 있는 칸에 1부터 4까지의 숫자를 알맞게 채웁니다.',
      '각 행, 각 열, 그리고 2x2 내부 블록들에 1부터 4까지의 숫자가 중복 없이 하나씩 들어가야 합니다.',
      '입력할 칸을 클릭한 후, 아래 키패드에서 입력할 숫자를 누르거나 지우기를 눌러 채워보세요.',
      '모두 채우고 "정답 확인"을 누르면 정답 검증이 진행됩니다.'
    ]
  },
  {
    id: 'remember_numbers',
    name: '숫자 기억 게임',
    desc: '순식간에 지나가는 암호를 정확히 복구하기',
    icon: '🧠',
    colorBg: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
    instructions: [
      '게임이 시작되면 화면에 임의의 숫자가 수 초간 표시된 후 가려집니다.',
      '숫자가 표시되는 시간 동안 숫자를 눈과 마음속으로 기억해 두세요.',
      '숫자가 가려진 후, 표시되었던 숫자를 키패드를 이용해 똑같이 입력하세요.',
      '총 5단계의 레벨(4자리부터 8자리까지)을 성공해야 하며, 라이프는 총 3개 제공됩니다.'
    ]
  },
  {
    id: 'stroop_test',
    name: '색깔-글자 불일치',
    desc: '글자의 색상을 신속하게 맞추는 고도의 집중력 훈련',
    icon: '🎨',
    colorBg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    instructions: [
      '화면에 색상 단어(예: 빨강, 파랑 등)가 특정 색상을 띤 글자로 제시됩니다.',
      '글자가 의미하는 의미와 관계없이, 글자의 실제 "글자 색상"을 버튼에서 찾아 클릭해야 합니다.',
      '제한시간 40초 내에 집중력을 유지하여 15점을 빠르게 달성하면 탈출 및 승리합니다.',
      '오답 시 점수가 1점 감점되고, 2초가 추가 감점되므로 신중하게 판단해야 합니다.'
    ]
  },
  {
    id: 'reaction_time',
    name: '반응속도 테스트',
    desc: '빨간색에서 초록색으로 변하는 번개의 찰나 클릭',
    icon: '⚡',
    colorBg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    instructions: [
      '화면이 빨간색일 때는 클릭을 자제하고 긴장하며 대기하세요.',
      '예고 없이 화면이 초록색("지금 클릭하세요!!!")으로 변경되는 순간 마우스 또는 화면을 신속하게 터치하세요.',
      '초록색이 되기 전에 누르면 "부정출발"이 되며 기회가 재설정됩니다.',
      '총 3회를 테스트하며, 3회 평균 반응속도가 320ms 이하면 성공 판정을 받습니다.'
    ]
  },
  {
    id: 'omok',
    name: '오목',
    desc: '바둑판 위에서 다섯 개의 돌을 먼저 일렬로 늘어놓는 두뇌 싸움',
    icon: '⚫',
    colorBg: 'linear-gradient(135deg, #475569 0%, #0f172a 100%)',
    instructions: [
      '20x20 격자 바둑판의 빈 교차점을 터치하여 흑돌(⚫)을 놓습니다.',
      '플레이어가 돌을 놓으면 AI가 백돌(⚪)을 놓습니다.',
      '가로, 세로, 혹은 대각선 방향으로 같은 색깔의 돌 5개를 끊김 없이 일렬로 배치하면 승리합니다.',
      '상대방(인공지능)의 길을 사전에 예측하고 차단하며 최선의 수를 겨뤄보세요.'
    ]
  },
  {
    id: 'rps_psychology',
    name: 'AI 가위바위보',
    desc: '사용자의 패턴을 분석하는 똑똑한 AI와의 심리 싸움',
    icon: '✊',
    colorBg: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
    instructions: [
      '일반 가위바위보와 달리, 상대 AI는 플레이어가 이전에 냈던 패를 학습하고 예측하여 가중치를 둡니다.',
      'AI의 분석 패턴을 역이용하여 심리전에서 이겨보세요.',
      '5선승제(먼저 5판을 이기는 사람이 최종 승자)로 대국이 진행됩니다.'
    ]
  },
  {
    id: 'card_match',
    name: '카드 뒤집기',
    desc: '눈 깜짝할 사이에 짝을 맞추는 개발자 로고 매칭',
    icon: '🃏',
    colorBg: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    instructions: [
      '16장의 뒤집힌 카드 중 두 개를 차례로 클릭해 뒤집습니다.',
      '두 카드의 아이콘이 일치하면 오픈된 상태로 고정됩니다.',
      '일치하지 않으면 카드가 잠깐 노출된 후 다시 원래대로 뒤집힙니다.',
      '최대한 적은 실수와 최단 시간으로 8쌍의 카드를 모두 맞추세요.'
    ]
  },
  {
    id: 'tic_tac_toe',
    name: '틱택토',
    desc: '인공지능과 한 수 한 수 겨루는 3x3 바둑',
    icon: '❌',
    colorBg: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    instructions: [
      '3x3 격자판에 플레이어는 X를, AI는 O를 번갈아 놓습니다.',
      '가로, 세로, 혹은 대각선으로 자신의 기호 3개를 먼저 일렬로 배치하면 승리합니다.',
      '빈 칸 중 놓을 곳을 클릭해 수를 둡니다. AI는 플레이어의 수를 예측해 방어하고 공격합니다.',
      '모든 칸이 채워졌으나 일렬 배치가 없으면 무승부 처리됩니다.'
    ]
  },
  {
    id: 'ten_seconds',
    name: '10초 맞추기',
    desc: '정밀한 감각으로 정확히 10.00초에 멈추기',
    icon: '⏱️',
    colorBg: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
    instructions: [
      '시작 버튼을 누르면 타이머가 0.00초부터 째깍거리며 올라갑니다.',
      '시작 후 3.00초가 지나면 타이머가 가려지며 보이지 않게 됩니다.',
      '마음속이나 감각에 의존해 시간을 재다 정확히 10.00초가 되었다고 생각될 때 "정지" 버튼을 누르세요.',
      '오차범위 +/- 0.15초 이내(9.85초 ~ 10.15초 사이)에 정지하면 클리어입니다!'
    ]
  }
]

const selectedGameData = computed(() => {
  return games.find(g => g.id === selectedGameId.value) || {}
})

// 타이머 및 결과 변수들
const timerInterval = ref(null)
const startTime = ref(null)
const elapsedTime = ref(0)
const gameResult = ref({
  status: '', // 'win', 'lose', 'tie'
  statusText: '',
  title: '',
  message: '',
  score: '',
  duration: ''
})

const formattedTimer = computed(() => {
  const totalSeconds = Math.floor(elapsedTime.value / 1000)
  const ms = Math.floor((elapsedTime.value % 1000) / 10)
  const min = Math.floor(totalSeconds / 60)
  const sec = totalSeconds % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
})

const selectGame = (game) => {
  selectedGameId.value = game.id
  gameStage.value = 'ready'
}

const goLobby = () => {
  resetGameStates()
  gameStage.value = 'lobby'
}

const startGame = () => {
  gameStage.value = 'playing'
  startTime.value = Date.now()
  elapsedTime.value = 0
  
  if (selectedGameId.value !== 'reaction_time' && selectedGameId.value !== 'ten_seconds') {
    timerInterval.value = setInterval(() => {
      elapsedTime.value = Date.now() - startTime.value
    }, 50)
  }

  // 각 게임별 개별 초기화
  if (selectedGameId.value === 'sudoku') {
    initSudoku()
  } else if (selectedGameId.value === 'remember_numbers') {
    initRememberNumbers()
  } else if (selectedGameId.value === 'stroop_test') {
    initStroop()
  } else if (selectedGameId.value === 'reaction_time') {
    initReaction()
  } else if (selectedGameId.value === 'omok') {
    initOmok()
  } else if (selectedGameId.value === 'rps_psychology') {
    initRps()
  } else if (selectedGameId.value === 'card_match') {
    initCardMatch()
  } else if (selectedGameId.value === 'tic_tac_toe') {
    initTtt()
  } else if (selectedGameId.value === 'ten_seconds') {
    initTenSeconds()
  }
}

const retryGame = () => {
  resetGameStates()
  startGame()
}

const resetGameStates = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  
  // 숫자 기억 게임 정리
  if (rnShowTimer) {
    clearTimeout(rnShowTimer)
  }
  if (rnTickInterval) {
    clearInterval(rnTickInterval)
  }

  // 스트룹 타이머 정리
  if (stTimer) {
    clearInterval(stTimer)
  }

  // 반응속도 타이머 정리
  if (rtTimeout) {
    clearTimeout(rtTimeout)
  }

  // 10초 맞추기 타이머 정리
  if (tsTimer) {
    clearInterval(tsTimer)
    tsTimer = null
  }
}

const abortGame = () => {
  resetGameStates()
  gameStage.value = 'lobby'
}

const finishGame = (status, statusText, title, message, score) => {
  const endTime = Date.now()
  const durationMs = endTime - startTime.value
  resetGameStates()

  const min = Math.floor(durationMs / 60000)
  const sec = Math.floor((durationMs % 60000) / 1000)
  const durationStr = min > 0 ? `${min}분 ${sec}초` : `${sec}초`

  gameResult.value = {
    status,
    statusText,
    title,
    message,
    score,
    duration: durationStr
  }

  // 히스토리에 기록 저장
  const record = {
    gameName: selectedGameData.value.name,
    status,
    statusText,
    score,
    duration: durationStr,
    timestamp: Date.now()
  }

  history.value.unshift(record)
  localStorage.setItem('mini_game_history', JSON.stringify(history.value))

  gameStage.value = 'result'
}

// ----------------------------------------------------
// 1. 스도쿠 게임 상세 로직
// ----------------------------------------------------
const sudokuBoard = ref([])
const sudokuSelectedIndex = ref(null)
const sudokuSolutions = [
  [
    1, 2, 3, 4,
    3, 4, 1, 2,
    2, 1, 4, 3,
    4, 3, 2, 1
  ],
  [
    4, 3, 2, 1,
    2, 1, 4, 3,
    3, 4, 1, 2,
    1, 2, 3, 4
  ],
  [
    2, 1, 4, 3,
    4, 3, 2, 1,
    1, 2, 3, 4,
    3, 4, 1, 2
  ]
]
let currentSudokuSolution = []

const initSudoku = () => {
  sudokuSelectedIndex.value = null
  const solutionIdx = Math.floor(Math.random() * sudokuSolutions.length)
  currentSudokuSolution = sudokuSolutions[solutionIdx]
  
  const board = currentSudokuSolution.map(val => ({
    value: val,
    readonly: true,
    error: false
  }))

  const emptyIndices = []
  while (emptyIndices.length < 5) {
    const randIdx = Math.floor(Math.random() * 16)
    if (!emptyIndices.includes(randIdx)) {
      emptyIndices.push(randIdx)
    }
  }

  emptyIndices.forEach(idx => {
    board[idx].value = 0
    board[idx].readonly = false
  })

  sudokuBoard.value = board
}

const selectSudokuCell = (idx) => {
  if (sudokuBoard.value[idx].readonly) return
  sudokuSelectedIndex.value = idx
}

const inputSudokuNumber = (num) => {
  if (sudokuSelectedIndex.value === null) return
  sudokuBoard.value[sudokuSelectedIndex.value].value = num
  sudokuBoard.value[sudokuSelectedIndex.value].error = false
}

const checkSudokuComplete = () => {
  let hasEmpty = false
  let hasError = false

  sudokuBoard.value.forEach((cell, idx) => {
    if (!cell.readonly) {
      if (cell.value === 0 || !cell.value) {
        hasEmpty = true
      } else if (cell.value !== currentSudokuSolution[idx]) {
        cell.error = true
        hasError = true
      }
    }
  })

  if (hasEmpty) {
    alert('비어있는 칸이 있습니다. 모든 칸을 채워주세요!')
    return
  }

  if (hasError) {
    alert('잘못 채워진 칸이 존재합니다. 빨간색 칸을 확인하고 다시 수정해보세요.')
    return
  }

  finishGame('win', '성공', '스도쿠 클리어! 🧠', '완벽하게 논리적인 두뇌 회전이었습니다!', '4x4 완벽 성공')
}

// ----------------------------------------------------
// 2. 숫자 기억 게임 상세 로직
// ----------------------------------------------------
const rnLevel = ref(1)
const rnLives = ref(3)
const rnTargetNumber = ref('')
const rnUserInput = ref('')
const rnStatus = ref('show') // 'show', 'input'
const rnProgressWidth = ref(100)

let rnShowTimer = null
let rnTickInterval = null

const initRememberNumbers = () => {
  rnLevel.value = 1
  rnLives.value = 3
  generateRnStage()
}

const generateRnStage = () => {
  rnUserInput.value = ''
  rnStatus.value = 'show'
  rnProgressWidth.value = 100

  // 레벨에 맞는 자릿수 설정
  const digitCount = rnLevel.value + 3 // 4, 5, 6, 7, 8자리
  let numStr = ''
  for (let i = 0; i < digitCount; i++) {
    numStr += Math.floor(Math.random() * 10)
  }
  rnTargetNumber.value = numStr

  // 레벨별 노출 시간 (밀리초)
  const displayTime = rnLevel.value <= 2 ? 2200 : rnLevel.value <= 4 ? 1700 : 1300
  
  if (rnShowTimer) clearTimeout(rnShowTimer)
  if (rnTickInterval) clearInterval(rnTickInterval)

  const step = 50
  let spent = 0
  rnTickInterval = setInterval(() => {
    spent += step
    rnProgressWidth.value = Math.max(0, 100 - (spent / displayTime) * 100)
  }, step)

  rnShowTimer = setTimeout(() => {
    clearInterval(rnTickInterval)
    rnStatus.value = 'input'
  }, displayTime)
}

const pressRnKey = (val) => {
  if (val === 'clear') {
    rnUserInput.value = ''
  } else {
    if (rnUserInput.value.length < rnTargetNumber.value.length) {
      rnUserInput.value += String(val)
    }
  }
}

const submitRnAnswer = () => {
  if (rnUserInput.value.length === 0) return

  if (rnUserInput.value === rnTargetNumber.value) {
    if (rnLevel.value === 5) {
      finishGame('win', '완벽성공', '인간 메모리 칩! 🧠', '8자리 숫자를 완벽히 복원하는 강력한 인지 능력!', '최종 레벨 5 올클리어')
    } else {
      rnLevel.value++
      alert('정답입니다! 다음 레벨로 넘어갑니다.')
      generateRnStage()
    }
  } else {
    rnLives.value--
    if (rnLives.value <= 0) {
      finishGame('lose', '실패', '기억력 한계 도달 😢', `아쉽지만 숫자를 틀렸습니다. (정답: ${rnTargetNumber.value})`, `레벨 ${rnLevel.value}에서 게임 오버`)
    } else {
      alert(`틀렸습니다! 남은 라이프: ${rnLives.value} (정답: ${rnTargetNumber.value})`)
      generateRnStage()
    }
  }
}

// ----------------------------------------------------
// 3. 색깔-글자 불일치 게임 (Stroop) 상세 로직
// ----------------------------------------------------
const stScore = ref(0)
const stTimeLeft = ref(40)
const stTargetWord = ref('')
const stTargetColor = ref({})
const stColors = [
  { name: '빨강', hex: '#ef4444' },
  { name: '파랑', hex: '#3b82f6' },
  { name: '초록', hex: '#22c55e' },
  { name: '노랑', hex: '#facc15' }
]
let stTimer = null

const initStroop = () => {
  stScore.value = 0
  stTimeLeft.value = 40
  generateStroopQuestion()

  if (stTimer) clearInterval(stTimer)
  stTimer = setInterval(() => {
    stTimeLeft.value--
    if (stTimeLeft.value <= 0) {
      clearInterval(stTimer)
      if (stScore.value >= 15) {
        finishGame('win', '성공', '스트룹 지배자! 🎨', '색상 인지 왜곡 간섭을 완전히 극복하셨습니다.', `최종 스코어: ${stScore.value}점`)
      } else {
        finishGame('lose', '실패', '시간 초과 😢', '아쉽게도 시간 내에 15점에 도달하지 못했습니다.', `최종 스코어: ${stScore.value}점`)
      }
    }
  }, 1000)
}

const generateStroopQuestion = () => {
  const wordIdx = Math.floor(Math.random() * stColors.length)
  const colorIdx = Math.floor(Math.random() * stColors.length)

  stTargetWord.value = stColors[wordIdx].name
  stTargetColor.value = stColors[colorIdx]
}

const submitStroopAnswer = (chosenColorName) => {
  if (chosenColorName === stTargetColor.value.name) {
    stScore.value++
    if (stScore.value >= 15) {
      clearInterval(stTimer)
      finishGame('win', '성공', '스트룹 완파! 🎨', '순간 판별 인지력이 최고 수준이시네요!', '15점 만점 도달 클리어')
      return
    }
  } else {
    stScore.value = Math.max(0, stScore.value - 1)
    stTimeLeft.value = Math.max(0, stTimeLeft.value - 2)
  }
  generateStroopQuestion()
}

// ----------------------------------------------------
// 4. 반응속도 테스트 상세 로직
// ----------------------------------------------------
const rtState = ref('waiting')
const rtAttempts = ref([])
const rtAttemptCount = ref(0)
const rtLastTime = ref(0)
let rtTimeout = null
let rtStartTime = 0

const initReaction = () => {
  rtAttempts.value = []
  rtAttemptCount.value = 0
  startRtRound()
}

const startRtRound = () => {
  rtState.value = 'waiting'
  if (rtTimeout) clearTimeout(rtTimeout)

  const randDelay = 1500 + Math.random() * 3000
  rtTimeout = setTimeout(() => {
    rtState.value = 'ready'
    rtStartTime = Date.now()
  }, randDelay)
}

const clickReactionBox = () => {
  if (rtState.value === 'waiting') {
    if (rtTimeout) clearTimeout(rtTimeout)
    rtState.value = 'early'
  } else if (rtState.value === 'ready') {
    const reactionTime = Date.now() - rtStartTime
    rtLastTime.value = reactionTime
    rtAttempts.value.push(reactionTime)
    rtAttemptCount.value++
    rtState.value = 'result'

    if (rtAttemptCount.value >= 3) {
      const avg = Math.round(rtAttempts.value.reduce((a, b) => a + b, 0) / rtAttempts.value.length)
      setTimeout(() => {
        if (avg <= 320) {
          finishGame('win', '성공', '빛의 도전자! ⚡', `반응속도가 매우 민첩합니다.`, `평균 속도: ${avg}ms (성공)`)
        } else {
          finishGame('lose', '실패', '둔한 손가락 😢', '평균 반응속도 기준(320ms)을 넘지 못했습니다.', `평균 속도: ${avg}ms (실패)`)
        }
      }, 1000)
    }
  } else if (rtState.value === 'early' || rtState.value === 'result') {
    if (rtAttemptCount.value < 3) {
      startRtRound()
    }
  }
}

// ----------------------------------------------------
// 5. 오목 상세 로직 (방탈출 대신 신규 탑재)
// ----------------------------------------------------
const omokBoard = ref(Array(400).fill(''))
const omokTurn = ref('player') // 'player', 'ai'

const initOmok = () => {
  omokBoard.value = Array(400).fill('')
  omokTurn.value = 'player'
}

const playOmok = (idx) => {
  if (omokBoard.value[idx] !== '' || omokTurn.value !== 'player') return
  
  omokBoard.value[idx] = 'black'
  
  if (checkOmokWin(omokBoard.value, 'black')) {
    finishGame('win', '승리', '오목 승리! ⚫', '탁월한 형세 판단력으로 인공지능을 굴복시켰습니다!', '플레이어 흑돌 승리')
    return
  }
  
  if (checkOmokDraw()) {
    finishGame('tie', '무승부', '용호상박! 🤝', '판 위를 꽉 채우는 치열한 난전 속에 비겼습니다.', '20x20 판 무승부')
    return
  }
  
  omokTurn.value = 'ai'
  setTimeout(makeOmokAiMove, 600)
}

const makeOmokAiMove = () => {
  if (gameStage.value !== 'playing' || selectedGameId.value !== 'omok') return
  
  let bestScore = -1
  let bestIndices = []
  
  for (let i = 0; i < 400; i++) {
    if (omokBoard.value[i] === '') {
      const score = evaluateOmokCell(omokBoard.value, i)
      if (score > bestScore) {
        bestScore = score
        bestIndices = [i]
      } else if (score === bestScore) {
        bestIndices.push(i)
      }
    }
  }
  
  if (bestIndices.length > 0) {
    const move = bestIndices[Math.floor(Math.random() * bestIndices.length)]
    omokBoard.value[move] = 'white'
    
    if (checkOmokWin(omokBoard.value, 'white')) {
      finishGame('lose', '패배', 'AI 오목 승.. 😢', '인공지능의 5목 완성 공격을 막지 못했습니다.', 'AI 백돌 승리')
      return
    }
    
    if (checkOmokDraw()) {
      finishGame('tie', '무승부', '용호상박! 🤝', '판 위를 꽉 채우는 치열한 난전 속에 비겼습니다.', '20x20 판 무승부')
      return
    }
  }
  
  omokTurn.value = 'player'
}

const checkOmokWin = (board, player) => {
  const SIZE = 20
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 }
  ]
  
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r * SIZE + c] !== player) continue
      
      for (const { dr, dc } of directions) {
        let count = 1
        for (let i = 1; i < 5; i++) {
          const nr = r + dr * i
          const nc = c + dc * i
          if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
            if (board[nr * SIZE + nc] === player) count++
            else break
          } else break
        }
        if (count === 5) return true
      }
    }
  }
  return false
}

const checkOmokDraw = () => {
  return omokBoard.value.every(cell => cell !== '')
}

const evaluateOmokCell = (board, idx) => {
  const SIZE = 20
  const r = Math.floor(idx / 20)
  const c = idx % 20
  
  let maxWhiteLine = 0
  let maxBlackLine = 0
  
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 }
  ]
  
  for (const { dr, dc } of directions) {
    let whiteCount = 1
    for (const step of [1, -1]) {
      for (let i = 1; i < 5; i++) {
        const nr = r + dr * i * step
        const nc = c + dc * i * step
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
          if (board[nr * SIZE + nc] === 'white') whiteCount++
          else break
        } else break
      }
    }
    maxWhiteLine = Math.max(maxWhiteLine, whiteCount)
  }

  for (const { dr, dc } of directions) {
    let blackCount = 1
    for (const step of [1, -1]) {
      for (let i = 1; i < 5; i++) {
        const nr = r + dr * i * step
        const nc = c + dc * i * step
        if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
          if (board[nr * SIZE + nc] === 'black') blackCount++
          else break
        } else break
      }
    }
    maxBlackLine = Math.max(maxBlackLine, blackCount)
  }

  if (maxWhiteLine >= 5) return 100000
  if (maxBlackLine >= 5) return 50000
  if (maxWhiteLine === 4) return 10000
  if (maxBlackLine === 4) return 5000
  if (maxWhiteLine === 3) return 1000
  if (maxBlackLine === 3) return 800

  let closeness = 0
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
        if (board[nr * SIZE + nc] !== '') closeness += 2
      }
    }
  }
  
  const distCenter = Math.abs(r - 9.5) + Math.abs(c - 9.5)
  closeness += (20 - distCenter)
  
  return closeness
}

// ----------------------------------------------------
// 6. AI 가위바위보 심리전 상세 로직
// ----------------------------------------------------
const rpsPlayerScore = ref(0)
const rpsAiScore = ref(0)
const rpsPlayerChoice = ref('')
const rpsAiChoice = ref('')
const rpsLastResult = ref('')
const rpsHistory = ref([])
const rpsHandIcons = {
  rock: '✊',
  scissors: '✌️',
  paper: '✋'
}

const initRps = () => {
  rpsPlayerScore.value = 0
  rpsAiScore.value = 0
  rpsPlayerChoice.value = ''
  rpsAiChoice.value = ''
  rpsLastResult.value = ''
  rpsHistory.value = []
}

const playRps = (playerPick) => {
  rpsPlayerChoice.value = playerPick
  
  const aiPick = predictRpsAiChoice()
  rpsAiChoice.value = aiPick
  
  let roundRes = ''
  if (playerPick === aiPick) {
    roundRes = 'draw'
    rpsLastResult.value = '🤝 서로 비겼습니다!'
  } else if (
    (playerPick === 'rock' && aiPick === 'scissors') ||
    (playerPick === 'scissors' && aiPick === 'paper') ||
    (playerPick === 'paper' && aiPick === 'rock')
  ) {
    roundRes = 'player'
    rpsPlayerScore.value++
    rpsLastResult.value = '🎉 당신이 이겼습니다!'
  } else {
    roundRes = 'ai'
    rpsAiScore.value++
    rpsLastResult.value = '😢 AI가 이겼습니다!'
  }

  rpsHistory.value.push(playerPick)

  if (rpsPlayerScore.value >= 5) {
    setTimeout(() => {
      finishGame('win', '승리', 'AI 심리 분석가! ✊', '패턴 학습 예측 장치를 따돌리고 최종 승리하셨습니다.', `최종 스코어: ${rpsPlayerScore.value} 대 ${rpsAiScore.value}`)
    }, 1200)
  } else if (rpsAiScore.value >= 5) {
    setTimeout(() => {
      finishGame('lose', '패배', 'AI가 심리 정복.. 😢', 'AI에게 가위바위보 전술 패턴을 간파당했습니다.', `최종 스코어: ${rpsPlayerScore.value} 대 ${rpsAiScore.value}`)
    }, 1200)
  }
}

const predictRpsAiChoice = () => {
  if (rpsHistory.value.length < 3) {
    const choices = ['rock', 'scissors', 'paper']
    return choices[Math.floor(Math.random() * choices.length)]
  }

  const counts = { rock: 0, scissors: 0, paper: 0 }
  rpsHistory.value.forEach(p => {
    counts[p]++
  })

  let playerLikely = 'rock'
  if (counts.scissors > counts.rock && counts.scissors > counts.paper) {
    playerLikely = 'scissors'
  } else if (counts.paper > counts.rock && counts.paper > counts.scissors) {
    playerLikely = 'paper'
  }

  if (Math.random() < 0.7) {
    if (playerLikely === 'rock') return 'paper'
    if (playerLikely === 'scissors') return 'rock'
    return 'scissors'
  } else {
    const choices = ['rock', 'scissors', 'paper']
    return choices[Math.floor(Math.random() * choices.length)]
  }
}

// ----------------------------------------------------
// 7. 카드 뒤집기 (카드 매칭) 상세 로직
// ----------------------------------------------------
const cmCards = ref([])
const cmMatchedCount = ref(0)
const cmSelectedIndices = ref([])
const cmEmojis = ['⚛️', '🐍', '🦀', '☕', '🐘', '🟢', '🟦', '🦊']

const initCardMatch = () => {
  cmMatchedCount.value = 0
  cmSelectedIndices.value = []
  
  let pool = [...cmEmojis, ...cmEmojis]
  
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  
  cmCards.value = pool.map((emoji, idx) => ({
    id: idx,
    emoji,
    isFlipped: false,
    isMatched: false
  }))
}

const flipCmCard = (idx) => {
  const card = cmCards.value[idx]
  if (card.isFlipped || card.isMatched || cmSelectedIndices.value.length >= 2) return
  
  card.isFlipped = true
  cmSelectedIndices.value.push(idx)
  
  if (cmSelectedIndices.value.length === 2) {
    const firstIdx = cmSelectedIndices.value[0]
    const secondIdx = cmSelectedIndices.value[1]
    
    if (cmCards.value[firstIdx].emoji === cmCards.value[secondIdx].emoji) {
      cmCards.value[firstIdx].isMatched = true
      cmCards.value[secondIdx].isMatched = true
      cmMatchedCount.value++
      cmSelectedIndices.value = []
      
      if (cmMatchedCount.value === 8) {
        setTimeout(() => {
          finishGame('win', '매칭완료', '천재적인 기억력! 🃏', '16장의 카드를 완벽하게 매칭하여 기억의 신으로 증명되었습니다.', '8쌍 매칭 완료')
        }, 800)
      }
    } else {
      setTimeout(() => {
        cmCards.value[firstIdx].isFlipped = false
        cmCards.value[secondIdx].isFlipped = false
        cmSelectedIndices.value = []
      }, 800)
    }
  }
}

// ----------------------------------------------------
// 8. 틱택토 상세 로직
// ----------------------------------------------------
const tttBoard = ref(Array(9).fill(''))
const tttTurn = ref('player') // 'player', 'ai'

const initTtt = () => {
  tttBoard.value = Array(9).fill('')
  tttTurn.value = 'player'
}

const playTtt = (idx) => {
  if (tttBoard.value[idx] !== '' || tttTurn.value !== 'player') return
  
  tttBoard.value[idx] = 'X'
  
  if (checkTttWin('X')) {
    finishGame('win', '승리', '틱택토 승리! ❌', '완벽한 계산으로 인공지능을 격파하셨습니다!', '플레이어 X 승리')
    return
  }
  
  if (checkTttDraw()) {
    finishGame('tie', '무승부', '용호상박! 🤝', '인공지능과 한 수 한 수 대등하게 맞겨루며 비겼습니다.', '3x3 무승부')
    return
  }
  
  tttTurn.value = 'ai'
  setTimeout(makeTttAiMove, 500)
}

const makeTttAiMove = () => {
  if (gameStage.value !== 'playing' || selectedGameId.value !== 'tic_tac_toe') return
  
  // 1. 내가 이길 수 있는 수가 있는지 확인
  for (let i = 0; i < 9; i++) {
    if (tttBoard.value[i] === '') {
      tttBoard.value[i] = 'O'
      if (checkTttWin('O')) {
        finishGame('lose', '패배', 'AI에게 함락.. 😢', '인공지능의 맹공에 외통수에 걸리고 말았습니다.', 'AI O 승리')
        return
      }
      tttBoard.value[i] = ''
    }
  }
  
  // 2. 상대방이 이기려는 수가 있으면 방어
  for (let i = 0; i < 9; i++) {
    if (tttBoard.value[i] === '') {
      tttBoard.value[i] = 'X'
      if (checkTttWin('X')) {
        tttBoard.value[i] = 'O'
        tttTurn.value = 'player'
        return
      }
      tttBoard.value[i] = ''
    }
  }
  
  // 3. 중앙 선점
  if (tttBoard.value[4] === '') {
    tttBoard.value[4] = 'O'
    tttTurn.value = 'player'
    return
  }
  
  // 4. 빈 곳 임의 탐색
  const empties = tttBoard.value.map((cell, idx) => cell === '' ? idx : null).filter(val => val !== null)
  if (empties.length > 0) {
    const randIdx = empties[Math.floor(Math.random() * empties.length)]
    tttBoard.value[randIdx] = 'O'
  }
  
  if (checkTttWin('O')) {
    finishGame('lose', '패배', 'AI에게 함락.. 😢', '인공지능의 맹공에 외통수에 걸리고 말았습니다.', 'AI O 승리')
    return
  }
  
  if (checkTttDraw()) {
    finishGame('tie', '무승부', '용호상박! 🤝', '인공지능과 한 수 한 수 대등하게 맞겨루며 비겼습니다.', '3x3 무승부')
    return
  }
  
  tttTurn.value = 'player'
}

const checkTttWin = (mark) => {
  const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
    [0, 4, 8], [2, 4, 6]             // 대각선
  ]
  return winLines.some(line => {
    return line.every(idx => tttBoard.value[idx] === mark)
  })
}

const checkTttDraw = () => {
  return tttBoard.value.every(cell => cell !== '')
}

// ----------------------------------------------------
// 9. 10초 맞추기 상세 로직
// ----------------------------------------------------
const tsState = ref('ready') // 'ready', 'running', 'stopped'
const tsElapsedTime = ref(0)
const tsIsSuccess = ref(false)
let tsTimer = null
let tsStartTime = 0

const initTenSeconds = () => {
  tsState.value = 'ready'
  tsElapsedTime.value = 0
  tsIsSuccess.value = false
}

const startTs = () => {
  tsState.value = 'running'
  tsStartTime = Date.now()
  
  if (tsTimer) clearInterval(tsTimer)
  tsTimer = setInterval(() => {
    tsElapsedTime.value = Date.now() - tsStartTime
  }, 10)
}

const stopTs = () => {
  if (tsTimer) {
    clearInterval(tsTimer)
    tsTimer = null
  }
  tsState.value = 'stopped'
  
  const finalTime = tsElapsedTime.value
  const diff = Math.abs(finalTime - 10000)
  
  if (diff <= 150) { // 10.00초 기준 +/- 0.15초 오차 이내
    tsIsSuccess.value = true
    setTimeout(() => {
      finishGame('win', '완벽클리어', '시간의 지배자! ⏱️', `정확히 10.00초 근접하게 시계를 멈추셨습니다.`, `내 기록: ${(finalTime / 1000).toFixed(2)}초 (성공)`)
    }, 1200)
  } else {
    tsIsSuccess.value = false
    setTimeout(() => {
      finishGame('lose', '실패', '시간 감각 왜곡 😢', `아쉽지만 10.00초 기준 오차범위(150ms)를 벗어났습니다.`, `내 기록: ${(finalTime / 1000).toFixed(2)}초 (실패)`)
    }, 1200)
  }
}

// ----------------------------------------------------
// 공통 라이프사이클 및 헬퍼
// ----------------------------------------------------
onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mini_game_history')
    history.value = saved ? JSON.parse(saved) : []
  }
})

onUnmounted(() => {
  resetGameStates()
})

const clearHistory = () => {
  if (confirm('모든 플레이 기록을 삭제하시겠습니까?')) {
    history.value = []
    localStorage.removeItem('mini_game_history')
  }
}

const formatDate = (ts) => {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dateVal = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${dateVal} ${h}:${min}`
}
</script>

<style scoped>
.mini-games-center {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  color: var(--vp-c-text-1);
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.main-title {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--vp-c-brand-1), #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
  line-height: 1.4;
  padding: 6px 0;
  display: block;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

/* 카드 및 레이아웃 */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.game-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.game-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.game-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.game-icon {
  font-size: 2.2rem;
}

.game-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
}

.game-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* 준비 화면 */
.ready-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.back-btn-wrapper {
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.btn-outline:hover {
  background: var(--vp-c-bg-alt);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.ready-info {
  text-align: center;
}

.game-big-icon {
  width: 96px;
  height: 96px;
  font-size: 3rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.ready-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  line-height: 1.4;
  word-break: keep-all;
}

.ready-desc {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

/* 플레이 방법 가이드 예쁜 디자인 적용 */
.how-to-play {
  text-align: left;
  max-width: 550px;
  margin: 0 auto 32px;
  background: var(--vp-c-bg-alt);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

.how-to-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-3);
  padding-bottom: 6px;
}

.instruction-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border-left: 4px solid var(--vp-c-brand-1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
  transition: transform 0.2s;
}

.step-item:hover {
  transform: translateX(4px);
}

.step-number {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-text {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.btn-start-game {
  font-size: 1.1rem;
  padding: 14px 36px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.3);
}

/* 게임 플레이 영역 */
.game-play-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.game-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.game-icon-small {
  font-size: 1.6rem;
}

.game-title-small {
  font-size: 1.25rem;
  font-weight: 700;
}

.game-timer {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.game-timer strong {
  color: var(--vp-c-brand-1);
  font-family: monospace;
}

.game-stage-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 350px;
}

/* 1. 스도쿠 CSS */
.sudoku-board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  gap: 2px;
  background: #cbd5e1;
  border: 4px solid #475569;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.sudoku-cell {
  background: white;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.sudoku-cell.readonly {
  background: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}

.sudoku-cell:not(.readonly):hover {
  background: #e2e8f0;
}

.sudoku-cell.selected {
  background: #bfdbfe !important;
}

.sudoku-cell.error {
  background: #fecaca;
  color: #dc2626;
}

/* 2x2 테두리 구분선 강화 */
.sudoku-cell:nth-child(even) {
  border-right: 2px solid #94a3b8;
}
.sudoku-cell:nth-child(4n) {
  border-right: none;
}
.sudoku-grid > div:nth-child(n+5):nth-child(-n+8),
.sudoku-grid > div:nth-child(n+13):nth-child(-n+16) {
  border-bottom: 2px solid #94a3b8;
}

.sudoku-keypad {
  display: flex;
  gap: 8px;
}

.keypad-btn {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.keypad-btn:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.keypad-btn.btn-clear {
  width: 80px;
  font-size: 0.95rem;
  background: #94a3b8;
  color: white;
}

.keypad-btn.btn-clear:hover {
  background: #64748b;
}

/* 2. 숫자 기억 게임 CSS */
.remember-numbers-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-status-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 24px;
  color: var(--vp-c-text-2);
}

.rn-number-display-box {
  width: 100%;
  padding: 40px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.rn-number-display {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--vp-c-brand-1);
  margin-bottom: 24px;
  font-family: monospace;
}

.rn-progress-container {
  width: 100%;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
}

.rn-progress-bar {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.05s linear;
}

.rn-status-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.rn-input-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.rn-masked-display {
  width: 100%;
  padding: 16px;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1em;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  border: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.rn-keyboard {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 12px;
  justify-content: center;
}

.rn-keyboard .keypad-btn {
  width: 80px;
  height: 60px;
  font-size: 1.5rem;
}

.keypad-btn.btn-primary-color {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.keypad-btn.btn-primary-color:hover {
  background: var(--vp-c-brand-2);
}

/* 3. 스트룹 테스트 CSS */
.stroop-wrapper {
  width: 100%;
  max-width: 480px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stroop-status {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
  font-size: 1rem;
}

.stroop-word-card {
  width: 100%;
  padding: 48px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.stroop-word {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: 0.05em;
}

.stroop-question {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.stroop-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
}

.stroop-btn {
  padding: 16px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.stroop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-alt);
}

/* 4. 반응속도 테스트 CSS */
.reaction-wrapper {
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reaction-status {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.reaction-box {
  width: 100%;
  height: 280px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.1s ease;
  text-align: center;
  padding: 24px;
}

.reaction-box.waiting {
  background: #fecaca;
  color: #991b1b;
  border: 2px solid #fca5a5;
}

.reaction-box.ready {
  background: #a7f3d0;
  color: #065f46;
  border: 2px solid #6ee7b7;
}

.reaction-box.early {
  background: #fef08a;
  color: #854d0e;
  border: 2px solid #fde047;
}

.reaction-box.result {
  background: #dbeafe;
  color: #1e40af;
  border: 2px solid #bfdbfe;
}

.rt-box-content h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 12px 0 8px;
}

.rt-box-content p {
  font-size: 1rem;
  opacity: 0.85;
}

.rt-icon {
  font-size: 3rem;
}

/* 5. 오목 CSS (방탈출 대신 신규 탑재) */
.omok-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.omok-status {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 1.05rem;
}

.omok-board-container {
  background: #dfb15b; /* 따뜻한 나무색 바둑판 */
  border: 4px solid #854d0e;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.omok-grid {
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 0px;
}

.omok-cell {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 바둑판 격자선 구현 */
.omok-cell::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: #475569;
  z-index: 1;
}

.omok-cell::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: #475569;
  z-index: 1;
}

.omok-stone {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.3);
}

.omok-stone.black {
  background: radial-gradient(circle at 30% 30%, #4b5563 0%, #111827 80%);
}

.omok-stone.white {
  background: radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d5db 80%);
  border: 1px solid #9ca3af;
}

/* 6. AI 가위바위보 CSS */
.rps-wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rps-scoreboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px 32px;
  margin-bottom: 24px;
}

.rps-score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rps-score-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.rps-score-value {
  font-size: 2rem;
  font-weight: 800;
}

.rps-score-item.player .rps-score-value { color: var(--vp-c-brand-1); }
.rps-score-item.ai .rps-score-value { color: #eab308; }

.rps-score-vs {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
}

.rps-board {
  width: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.rps-status-bubble {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 12px 24px;
  border-radius: 20px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  max-width: 80%;
}

.rps-result-text {
  color: var(--vp-c-brand-1);
}

.rps-hands-display {
  display: flex;
  gap: 40px;
}

.hand-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hand-icon {
  font-size: 3.5rem;
  line-height: 1;
}

.hand-owner {
  margin-top: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.rps-buttons {
  display: flex;
  gap: 16px;
  width: 100%;
}

.rps-action-btn {
  flex: 1;
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.rps-action-btn:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.05);
}

/* 7. 카드 뒤집기 CSS */
.card-match-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-match-status {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.card-match-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  aspect-ratio: 1;
}

.match-card-item {
  position: relative;
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.match-card-item.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
}

.card-front {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
}

.card-back {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: rotateY(180deg);
}

.match-card-item.matched .card-back {
  background: #a7f3d0 !important;
  color: #047857 !important;
  border-color: #34d399 !important;
}

/* 8. 틱택토 CSS */
.ttt-wrapper {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ttt-status {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.ttt-grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 8px;
  background: var(--vp-c-divider);
  padding: 8px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
}

.ttt-cell {
  background: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 800;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

.ttt-cell:hover:empty {
  background: var(--vp-c-bg-alt);
}

.ttt-cell.x-mark {
  color: var(--vp-c-brand-1);
}

.ttt-cell.o-mark {
  color: #ef4444;
}

/* 9. 10초 맞추기 CSS */
.ten-seconds-wrapper {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.ts-display-box {
  width: 100%;
  padding: 48px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ts-time-text {
  font-size: 3.5rem;
  font-weight: 800;
  font-family: monospace;
  color: var(--vp-c-text-1);
}

.ts-time-text.blind {
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
  animation: pulse 1.5s infinite;
}

.ts-time-text.success {
  color: #22c55e !important;
}

.ts-helper-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.ts-actions {
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-large {
  font-size: 1.2rem;
  padding: 16px 48px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 결과 화면 */
.result-card {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 32px;
  border-radius: 20px;
  border: 2px solid var(--vp-c-divider);
}

.result-card.win {
  border-color: #22c55e;
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.05) 0%, var(--vp-c-bg-soft) 100%);
}

.result-card.lose {
  border-color: #ef4444;
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, var(--vp-c-bg-soft) 100%);
}

.result-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.3;
  display: block;
}

.result-icon-big {
  font-size: 4.5rem;
  margin-bottom: 24px;
  line-height: 1;
  display: block;
}

.result-message {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}

.result-details {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 32px;
  text-align: left;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.detail-value.status-text.win { color: #22c55e; }
.detail-value.status-text.lose { color: #ef4444; }
.detail-value.status-text.tie { color: #6b7280; }

.result-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* 기록 영역 */
.history-section {
  margin-top: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 1.35rem;
  font-weight: 700;
}

.btn-clear-history {
  padding: 6px 12px;
  font-size: 0.85rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.btn-clear-history:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.history-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  text-align: left;
}

.history-table th {
  padding: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.history-table td {
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.history-table tr.win { background-color: rgba(34, 197, 94, 0.02); }
.history-table tr.lose { background-color: rgba(239, 68, 68, 0.02); }

.status-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.win {
  background: rgba(34, 197, 94, 0.15);
  color: #15803d;
}

.status-badge.lose {
  background: rgba(239, 68, 68, 0.15);
  color: #b91c1c;
}

.status-badge.tie {
  background: rgba(107, 114, 128, 0.15);
  color: #4b5563;
}

.empty-msg {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 32px 0;
  font-size: 0.95rem;
}
</style>
