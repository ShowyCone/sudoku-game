import { playGame, deleteBoard, resolveSudoku } from './fillSudoku.js'
import { resetTimer } from './timer.js'
import { initInteraction } from './interaction.js'
import { difficultyLevel, difficultySelected } from './playByDifficulty.js'

const control = {
  resolve: document.getElementById('resolve'),
  reset: document.getElementById('reset'),
  hearts: document.querySelectorAll('.hearts'),
}

control.reset.addEventListener('click', () => {
  deleteBoard()
  difficultyLevel(difficultySelected)
  initInteraction()
  resetTimer()
  resetHearts()
})

control.resolve.addEventListener('click', () => {
  deleteBoard()
  resolveSudoku()
})

let attempts = 2
export const lose = () => {
  if (attempts >= 0) {
    control.hearts[attempts].innerHTML = '🖤'
    attempts -= 1
  }

  if (attempts === -1) {
    alert('f')
  }
}

const resetHearts = () => {
  attempts = 2
  for (let index = 0; index < control.hearts.length; index++) {
    control.hearts[index].innerHTML = '❤'
  }
}
