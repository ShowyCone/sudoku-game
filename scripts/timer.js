let seconds = 0
let minutes = 0
let timer
export function initTimer() {
  const cells = document.querySelectorAll('.child-cell')

  cells.forEach((cell) => {
    cell.addEventListener('click', handleClickOnce)
  })

  function handleClickOnce() {
    cells.forEach((cell) => {
      cell.removeEventListener('click', handleClickOnce)
    })

    timer = setInterval(() => {
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
}

export function resetTimer() {
  clearInterval(timer)
  seconds = 0
  minutes = 0
  document.getElementById('seconds').innerHTML = '00'
  document.getElementById('minutes').innerHTML = '00'
  initTimer()
}

export function pausedTimer() {
  clearInterval(timer)
}
