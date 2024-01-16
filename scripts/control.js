import { genSudoku } from './initGame.js'

const buttonsControl = {
  resolve: document.getElementById('resolve'),
  reset: document.getElementById('reset'),
}

buttonsControl.reset.addEventListener('click', () => {
  genSudoku()
})

buttonsControl.reset.addEventListener('click', () => {})
