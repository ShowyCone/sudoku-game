const numberCells = document.querySelectorAll('.child-cell')
const NUMBER_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function handleClick() {
  this.classList.add('selected-cell')
  console.log(1)
  document.addEventListener('keydown', handleKeyPressOnce)
  this.removeEventListener('click', handleClick)
}

function handleKeyPressOnce(event) {
  const keyPressed = event.key

  if (NUMBER_OPTIONS.includes(keyPressed)) {
    alert(`Clic en la celda y presionada la tecla ${keyPressed}`)
    const selectedCell = document.querySelector('.selected-cell')

    if (selectedCell) {
      selectedCell.classList.remove('selected-cell')
    }

    document.removeEventListener('keydown', handleKeyPressOnce)

    numberCells.forEach((numberCell) => {
      numberCell.addEventListener('click', handleClick)
    })
  }
}

numberCells.forEach((numberCell) => {
  numberCell.addEventListener('click', handleClick)
})
