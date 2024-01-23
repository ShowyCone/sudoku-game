import { lose } from './control.js'
import { shake } from './effects.js'
import { isValid } from './generateSudoku.js'
import { sudokuToResolve } from './fillSudoku.js'
import { pausedTimer } from './timer.js'

let firstTimeEvent = true
export function initInteraction() {
  console.log(sudokuToResolve)
  const numberCells = document.querySelectorAll('.child-cell')
  const NUMBER_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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
    const numberClicked = event.target.textContent

    if (NUMBER_OPTIONS.includes(numberClicked) && selectedCell) {
      let id = selectedCell.id.split('-')
      let row = parseInt(id[0])
      let col = parseInt(id[1])

      if (isValid(sudokuToResolve, row, col, parseInt(numberClicked))) {
        sudokuToResolve[row][col] = parseInt(numberClicked)
        selectedCell.textContent = numberClicked
        if (checkWin(sudokuToResolve)) {
          pausedTimer()
          alert('¡Has ganado!')
        }
      } else {
        shake(document.body)
        lose()
      }
    }
  }

  function checkWin(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let cell = board[i][j]
        if (cell === 0 || cell === '') {
          return false
        }
        let temp = board[i][j]
        board[i][j] = 0
        if (!isValid(board, i, j, temp)) {
          return false
        }
        board[i][j] = temp
      }
    }
    return true
  }

  function handleKeyPress(event) {
    const keyPressed = event.key
    // console.log(`Tecla presionada: ${keyPressed}`) // Agrega esta línea

    if (NUMBER_OPTIONS.includes(keyPressed) && selectedCell) {
      // console.log('Tecla presionada es un número y hay una celda seleccionada') // Agrega esta línea

      // Check if the selected cell has an ID in the correct format
      if (selectedCell.id.match(/^[0-8]-[0-8]$/)) {
        let id = selectedCell.id.split('-')
        let row = parseInt(id[0])
        let col = parseInt(id[1])
        console.log(`
        row: ${row} 
        col: ${col} 
        id: ${id}
        es correcto?: ${isValid(
          sudokuToResolve,
          row,
          col,
          parseInt(keyPressed)
        )}
        `)
        if (isValid(sudokuToResolve, row, col, parseInt(keyPressed))) {
          console.log('¡Número correcto!')
          sudokuToResolve[row][col] = parseInt(keyPressed)
          selectedCell.textContent = keyPressed
          if (checkWin(sudokuToResolve)) {
            pausedTimer()
            alert('¡Has ganado!')
          }
        } else {
          console.log('¡Número incorrecto!')
          console.table(sudokuToResolve)
          shake(document.body)
          lose()
        }

        // Don't remove the selected cell here, because we want to keep it selected
        // so that the user can enter another number in the same cell if they want to
      } else {
        console.log(
          'El formato de la ID de la celda seleccionada no es correcto'
        )
      }
    }
  }

  const numberPanelCells = document.querySelectorAll('.number-cell')
  numberPanelCells.forEach((numberCell) => {
    numberCell.addEventListener('click', handleNumberClick)
  })

  numberCells.forEach((numberCell) => {
    numberCell.addEventListener('click', handleClick)
  })

  if (firstTimeEvent) {
    document.addEventListener('keyup', handleKeyPress)
    firstTimeEvent = false
  }
}
