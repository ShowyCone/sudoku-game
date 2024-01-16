//GENERAR SUDOKU

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function isSafe(board, row, col, num) {
  // Check if the board is valid
  if (!Array.isArray(board) || board.length !== board[0].length) {
    throw new Error('Board is not valid')
  }

  // Check if the row and col parameters are within the bounds of the board
  if (row < 0 || row >= board.length || col < 0 || col >= board[row].length) {
    throw new Error('Row or column is out of bounds')
  }

  // Check if the number is already in the row
  for (let d = 0; d < board.length; d++) {
    if (board[row][d] == num) {
      return false
    }
  }

  // Check if the number is already in the column
  for (let d = 0; d < board.length; d++) {
    if (board[d][col] == num) {
      return false
    }
  }

  // Check if the number is already in the box
  let sqrt = Math.sqrt(board.length)
  let boxRowStart = row - (row % sqrt)
  let boxColStart = col - (col % sqrt)
  for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
    for (let d = boxColStart; d < boxColStart + sqrt; d++) {
      if (board[r][d] == num) {
        return false
      }
    }
  }

  // If the number doesn't exist in the current row, column, or box, it's safe to place it
  return true
}

function solveSudoku(board, n) {
  let row = -1
  let col = -1
  let isEmpty = true
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == 0) {
        row = i
        col = j
        isEmpty = false
        break
      }
    }
    if (!isEmpty) {
      break
    }
  }

  if (isEmpty) {
    return true
  }

  for (let num = 1; num <= n; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num
      if (solveSudoku(board, n)) {
        return true
      }
      board[row][col] = ''
    }
  }
  return false
}

function fillCell(board, n) {
  let row = Math.floor(Math.random() * n)
  let col = Math.floor(Math.random() * n)

  while (true) {
    for (let num = 1; num <= n; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num
        if (solveSudoku(board, n)) {
          return true
        }
        board[row][col] = ''
      }
    }

    // If no safe number was found, try a different cell
    row = Math.floor(Math.random() * n)
    col = Math.floor(Math.random() * n)
  }
}

function generateRandomSudoku(solvedBoard, n, k) {
  let count = k
  while (count != 0) {
    let cellId = Math.floor(Math.random() * 0.8 * n * n)
    let i = Math.floor(cellId / n)
    let j = cellId % 9
    if (j != 0) j = j - 1

    if (solvedBoard[i][j] != 0) {
      count--
      solvedBoard[i][j] = ''
    }
  }
  return solvedBoard
}

function fillBoard(matrix) {
  const sudokuContainer = document.querySelector('.sudoku-container')
  for (const row in matrix) {
    const sudokuRow = document.createElement('div')
    sudokuRow.classList.add('parent-cell')
    sudokuContainer.appendChild(sudokuRow)
    for (const column in matrix[row]) {
      const sudokuColumn = document.createElement('div')
      sudokuColumn.classList.add('child-cell')
      sudokuColumn.textContent = matrix[row][column]
      sudokuColumn.id = row + '-' + column // Set the ID of the cell here
      sudokuRow.appendChild(sudokuColumn)
    }
  }
}

let n = board.length
let k = 20 // Número de celdas que quieres eliminar

if (fillCell(board, n) && solveSudoku(board, n)) {
  let randomBoard = generateRandomSudoku(board, n, k)
  fillBoard(randomBoard)
} else {
  console.log('No solution exists')
}

//INTERACCION CON EL SUDOKU

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

function checkWin(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = board[i][j]
      if (cell === 0 || cell === '') {
        return false
      }
      let temp = board[i][j]
      board[i][j] = 0
      if (!isSafe(board, i, j, temp)) {
        return false
      }
      board[i][j] = temp
    }
  }
  return true
}

function handleKeyPress(event) {
  const keyPressed = event.key
  console.log(`Tecla presionada: ${keyPressed}`) // Agrega esta línea

  if (NUMBER_OPTIONS.includes(keyPressed) && selectedCell) {
    console.log('Tecla presionada es un número y hay una celda seleccionada') // Agrega esta línea

    // Check if the selected cell has an ID in the correct format
    if (selectedCell.id.match(/^[0-8]-[0-8]$/)) {
      let id = selectedCell.id.split('-')
      let row = parseInt(id[0])
      let col = parseInt(id[1])

      if (isSafe(board, row, col, parseInt(keyPressed))) {
        alert('¡Número correcto!')
        board[row][col] = parseInt(keyPressed)
        selectedCell.textContent = keyPressed
        if (checkWin(board)) {
          console.log('¡Has ganado!')
        }
      } else {
        shake(document.body)
      }

      // Don't remove the selected cell here, because we want to keep it selected
      // so that the user can enter another number in the same cell if they want to
    } else {
      console.log('El formato de la ID de la celda seleccionada no es correcto')
    }
  }
}

numberCells.forEach((numberCell) => {
  numberCell.addEventListener('click', handleClick)
})

document.addEventListener('keydown', handleKeyPress)

function shake(element) {
  let interval = 100
  let distance = 10
  let times = 4

  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      element.style.transform = `translate(${distance * -1}px, 0)`
    }, interval * i)
    setTimeout(() => {
      element.style.transform = `translate(${distance}px, 0)`
    }, interval * i + interval / 2)
  }

  setTimeout(() => {
    element.style.transform = 'translate(0, 0)'
  }, interval * times)
}
