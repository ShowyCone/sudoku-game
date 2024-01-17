export function generateSudoku() {
  // Inicializa una matriz de 9x9 con ceros
  const grid = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  )
  // Llama a la función de backtracking para llenar la matriz
  backtrack(grid, 0, 0)
  // Devuelve la matriz resultante
  return grid
}

function backtrack(grid, row, col) {
  // Si hemos llegado al final de la fila, pasamos a la siguiente fila
  if (col === 9) {
    row++
    col = 0
  }
  // Si hemos llegado al final de la matriz, hemos terminado
  if (row === 9) {
    return true
  }
  // Genera una lista de números del 1 al 9
  const nums = shuffle([...Array(9)].map((_, i) => i + 1))
  // Intenta colocar cada número en la celda actual
  for (const num of nums) {
    // Si el número es válido, colócalo en la celda
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num
      // Si podemos completar el resto de la matriz, hemos terminado
      if (backtrack(grid, row, col + 1)) {
        return true
      }
      // Si no podemos completar el resto de la matriz, retrocede y prueba otro número
      grid[row][col] = 0
    }
  }
  // Si no podemos colocar ningún número en la celda actual, retrocede y prueba otro número
  return false
}

export function isValid(grid, row, col, num) {
  // Comprueba si el número ya está en la fila
  if (grid[row].includes(num)) {
    return false
  }
  // Comprueba si el número ya está en la columna
  if (grid.some((r) => r[col] === num)) {
    return false
  }
  // Comprueba si el número ya está en el bloque de 3x3
  const blockRow = Math.floor(row / 3) * 3
  const blockCol = Math.floor(col / 3) * 3
  if (
    grid
      .slice(blockRow, blockRow + 3)
      .some((r) => r.slice(blockCol, blockCol + 3).includes(num))
  ) {
    return false
  }
  // Si el número no está en la fila, columna o bloque, es válido
  return true
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
