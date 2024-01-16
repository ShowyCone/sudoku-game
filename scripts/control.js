import { genSudoku, deleteBoard } from './initGame.js'

const buttonsControl = {
  resolve: document.getElementById('resolve'),
  reset: document.getElementById('reset'),
}

buttonsControl.reset.addEventListener('click', () => {
  deleteBoard()
  genSudoku()
})

buttonsControl.resolve.addEventListener('click', () => {})
