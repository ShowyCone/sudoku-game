import { lose } from './control.js'
import { shake } from './effects.js'
import { isValid } from './generateSudoku.js'
import { sudokuToResolve } from './fillSudoku.js'
import { pausedTimer } from './timer.js'

let firstTimeEvent = true
export function initInteraction() {
  const numberCells = document.querySelectorAll('.child-cell')
  const NUMBER_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const numberButtons = document.querySelectorAll('.number-cell')

  let selectedCell = null

  function handleClick(event) {
    if (this.textContent !== '') {
      return
    }

    if (selectedCell) {
      selectedCell.classList.remove('selected-cell')
    }

    selectedCell = event.target
    selectedCell.classList.add('selected-cell')
  }

  function handleNumberClick(event) {
    const keyPressed = this.textContent
    handleKeyPress(keyPressed)
  }

  function handleKeyPress(keyPressed) {
    if (NUMBER_OPTIONS.includes(keyPressed) && selectedCell) {
      if (selectedCell.id.match(/^[0-8]-[0-8]$/)) {
        let id = selectedCell.id.split('-')
        let row = parseInt(id[0])
        let col = parseInt(id[1])

        if (isValid(sudokuToResolve, row, col, parseInt(keyPressed))) {
          alert('¡Número correcto!')
          sudokuToResolve[row][col] = parseInt(keyPressed)
          selectedCell.textContent = keyPressed
          if (checkWin(sudokuToResolve)) {
            pausedTimer()
            alert('¡Has ganado!')
          }
        } else {
          shake(document.body)
          lose()
        }
      } else {
        console.log('El formato de la ID de la celda seleccionada no es correcto')
      }
    }
  }

  numberCells.forEach((numberCell) => {
    numberCell.addEventListener('click', handleClick)
  })

  numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', handleNumberClick)
  })

  if (firstTimeEvent) {
    document.addEventListener('keyup', (event) => {
      handleKeyPress(event.key)
    })
    firstTimeEvent = false
  }
}

initInteraction()