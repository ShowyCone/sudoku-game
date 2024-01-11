function initMatrix() {
  let solvedMatrix = Array.from({ length: 9 }, () => Array.from({ length: 9 }))
  matrixFill(solvedMatrix)
  fillBoard(solvedMatrix)
}

function getUniqueRandomNum(usedNumbers) {
  let availableNum = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (num) => !usedNumbers.includes(num)
  )
  availableNum = availableNum.sort(() => Math.random() - 0.5)

  return availableNum[0]
}

function matrixFill(matrix) {
  for (let blockRow = 0; blockRow < 9; blockRow += 3) {
    for (let blockCol = 0; blockCol < 9; blockCol += 3) {
      let usedNumbers = []
      for (let i = blockRow; i < blockRow + 3; i++) {
        for (let j = blockCol; j < blockCol + 3; j++) {
          let uniqueRandomNum = getUniqueRandomNum(usedNumbers)
          matrix[i][j] = uniqueRandomNum
          usedNumbers.push(uniqueRandomNum)
        }
      }
    }
  }
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
      sudokuColumn.innerHTML = matrix[row][column]
      sudokuRow.appendChild(sudokuColumn)
    }
  }
}

initMatrix()
