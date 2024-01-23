import { reset, resolve, goBackMenu } from './control.js'

export const modalProperties = {
  reset: {
    title: '¿Desea reiniciar el juego?',
    button: {
      text: ['Si', 'No'],
      color: ['#98FF98', '#FF91A4'],
      hover: ['#76DD76', '#FF7082'],
      eventFunc: [reset],
      toClose: 1,
    },
  },
  resolve: {
    title: '¿Desea resolver el Super Sudoku?',
    button: {
      text: ['Si', 'No'],
      color: ['#98FF98', '#FF91A4'],
      hover: ['#76DD76', '#FF7082'],
      eventFunc: [resolve],
      toClose: 1,
    },
  },
  goBackMenu: {
    title: '¿Desea volver al menú principal?',
    button: {
      text: ['Si', 'No'],
      color: ['#98FF98', '#FF91A4'],
      hover: ['#76DD76', '#FF7082'],
      eventFunc: [goBackMenu],
      toClose: 1,
    },
  },
  win: {
    title: '¡Has ganado!',
    button: {
      text: ['Reiniciar', 'Volver'],
      color: ['#98FF98', '#98FF98'],
      hover: ['#76DD76', '#76DD76'],
      eventFunc: [reset, goBackMenu],
    },
  },
  lose: {
    title: '¡Has perdido!',
    button: {
      text: ['Reiniciar', 'Volver'],
      color: ['#FF91A4', '#FF91A4'],
      hover: ['#FF7082', '#FF7082'],
      eventFunc: [reset, goBackMenu],
    },
  },
}
