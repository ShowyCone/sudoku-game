import { playGame } from './fillSudoku.js'
import { initTimer } from './timer.js'

const difficulties = {
  1: 15,
  2: 30,
  3: 45,
}

export let difficultySelected

/**
 *
 * @param {number} level
 */
export const difficultyLevel = (level = 1) => {
  difficultySelected = level
  // console.log(difficulties[level])
  playGame(difficulties[level])
  initTimer()
}
