import { deleteBoard, resolveSudoku } from './fillSudoku.js'
import { initInteraction } from './interaction.js'
import { difficultyLevel, difficultySelected } from './playByDifficulty.js'
import { backMenu } from './menu.js'
import { modal } from './windowModal.js'
import { modalProperties } from './modalControl.js'

export const control = {
  resolve: document.getElementById('resolve'),
  reset: document.getElementById('reset'),
  hearts: document.querySelectorAll('.hearts'),
  back: document.getElementById('backMenu'),
  fullscreen: document.getElementById('fullscreen'),
}

control.reset.addEventListener('click', () => {
  modal(modalProperties.reset)
})
export function reset() {
  deleteBoard()
  difficultyLevel(difficultySelected)
  initInteraction()
  resetHearts()
}

control.resolve.addEventListener('click', () => {
  modal(modalProperties.resolve)
})
export function resolve() {
  deleteBoard()
  resolveSudoku()
}

control.back.addEventListener('click', () => {
  modal(modalProperties.goBackMenu)
})
export function goBackMenu() {
  backMenu()
  deleteBoard()
  resetHearts()
}

let icon = control.fullscreen.querySelector('i')
control.fullscreen.addEventListener('click', function () {
  // Dentro de este evento, verificamos si el documento ya está en pantalla completa
  if (!document.fullscreenElement) {
    // Si no está en pantalla completa, solicitamos pantalla completa
    document.documentElement.requestFullscreen()
    // Cambiamos el ícono a 'fa-down-left-and-up-right-to-center'
    icon.className = 'fa-solid fa-down-left-and-up-right-to-center'
  } else {
    // Si ya está en pantalla completa, salimos de la pantalla completa
    if (document.exitFullscreen) {
      document.exitFullscreen()
      // Cambiamos el ícono de nuevo a 'fa-up-right-and-down-left-from-center'
      icon.className = 'fa-solid fa-up-right-and-down-left-from-center'
    }
  }
})

let attempts = 2
export const lose = () => {
  if (attempts >= 0) {
    control.hearts[attempts].innerHTML = '🖤'
    attempts -= 1
  }

  if (attempts === -1) {
    modal(modalProperties.lose)
  }
}

const resetHearts = () => {
  attempts = 2
  for (let index = 0; index < control.hearts.length; index++) {
    control.hearts[index].innerHTML = '❤'
  }
}