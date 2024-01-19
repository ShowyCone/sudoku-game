import { difficultyLevel } from './playByDifficulty.js'
import { initInteraction } from './interaction.js'

const playGameButton = document.getElementById('playGame')
const difficulty = document.getElementById('difficulty')
const difficultyButtonEasy = document.getElementById('difficultyButtonEasy')
const difficultyButtonNormal = document.getElementById('difficultyButtonNormal')
const difficultyButtonHard = document.getElementById('difficultyButtonHard')
const menu = document.getElementById('menu')
const game = document.getElementById('game')

playGameButton.addEventListener('click', () => {
  difficulty.classList.remove('hide')
  setTimeout(() => {
    difficulty.classList.add('difficulty-open')
  }, 100)
})

difficultyButtonEasy.addEventListener('click', () => {
  menu.classList.add('goLeftMenu')
  setTimeout(() => {
    difficultyLevel(1)
    initInteraction()
    game.classList.add('goLeftGame')
  }, 500)
})

difficultyButtonNormal.addEventListener('click', () => {
  menu.classList.add('goLeftMenu')
  setTimeout(() => {
    difficultyLevel(2)
    initInteraction()
    game.classList.add('goLeftGame')
  }, 500)
})

difficultyButtonHard.addEventListener('click', () => {
  menu.classList.add('goLeftMenu')
  setTimeout(() => {
    difficultyLevel(3)
    initInteraction()
    game.classList.add('goLeftGame')
  }, 500)
})
