import { genSudoku, deleteBoard } from './initGame.js'
import { initInteraction } from './interaction.js'
import { resetTimer } from './timer.js'

const control = {
  resolve: document.getElementById('resolve'),
  reset: document.getElementById('reset'),
  hearts: document.querySelectorAll('.hearts'),
}

let attempts = 2

control.reset.addEventListener('click', () => {
  deleteBoard()
  genSudoku()
  initInteraction()
  resetTimer()
})

control.resolve.addEventListener('click', () => {})

export const lose = () => {
  if (attempts >= 0) {
    control.hearts[attempts].innerHTML = '🖤'
    attempts -= 1
  }

  if (attempts === -1) {
    alert('f')
  }
}
