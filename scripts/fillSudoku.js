import { generateSudoku } from './generateSudoku.js'

export let sudokuToResolve = []

export function playGame() {
  const sudokuResolved = generateSudoku()
  sudokuToResolve = removeCells(sudokuResolved, 5)
  console.table(sudokuToResolve)
  console.table(sudokuResolved)
  fillBoard(sudokuToResolve)
}

playGame()

function copySudoku(grid) {
  // Crea una copia de la matriz original
  const copy = grid.map((row) => [...row])
  return copy
}

function removeCells(grid, n) {
  // Crea una copia de la matriz original
  const copy = copySudoku(grid)
  // Obtiene una lista de todas las celdas
  const cells = []
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push([row, col])
    }
  }
  // Baraja la lista para obtener un orden aleatorio
  shuffle(cells)
  // Reemplaza las primeras n celdas con un string vacío
  for (let i = 0; i < n; i++) {
    const [row, col] = cells[i]
    copy[row][col] = ''
  }
  // Devuelve la matriz resultante
  return copy
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function fillBoard(matrix) {
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

// Delete board

export function deleteBoard() {
  const sudokuContainer = document.querySelector('.sudoku-container')
  while (sudokuContainer.firstChild) {
    sudokuContainer.removeChild(sudokuContainer.firstChild)
  }
}
