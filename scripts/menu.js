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
    game.classList.add('goLeftGame')
  }, 500)
})
