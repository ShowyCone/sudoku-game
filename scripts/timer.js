const cells = document.querySelectorAll('.child-cell')

cells.forEach((cell) => {
  cell.addEventListener('click', handleClickOnce)
})

function handleClickOnce() {
  cells.forEach((cell) => {
    cell.removeEventListener('click', handleClickOnce)
  })

  let seconds = 0
  let minutes = 0
  const timer = setInterval(() => {
    seconds++
    if (seconds === 60) {
      seconds = 0
      minutes++
    }
    document.getElementById('seconds').innerHTML =
      seconds < 10 ? '0' + seconds : seconds
    document.getElementById('minutes').innerHTML =
      minutes < 10 ? '0' + minutes : minutes
  }, 1000)
}
