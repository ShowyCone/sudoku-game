const modalControl = {
  containerButtons: document.getElementById('modalContainerButtons'),
  modal: document.getElementById('modal'),
  modalContainer: document.getElementById('modalContainer'),
}

/**
 * Creates a modal element with optional title and buttons
 * @param {HTMLElement} buttonToOpen - The HTML element that opens the modal
 * @param {Object} param0 - The object containing the modal properties
 * @param {String} [param0.title] - The title of the modal
 * @param {Object} [param0.button] - The object containing the button properties
 * @param {String[]} [param0.button.text] - The array of texts for the buttons
 * @param {String[]} [param0.button.color] - The array of colors for the buttons
 * @param {String[]} [param0.button.hover] - The array of hover colors for the buttons
 * @param {Function[]} [param0.button.eventFunc] - The array of event functions for the buttons
 * @param {Number} [param0.button.toClose] - The index of the button that closes the modal
 * @example
 * // Creates a modal with title 'Hola' and two buttons 'Si' and 'No'
 * const objectTest = {
 *   button: {
 *     text: ['Si', 'No'],
 *     color: ['#98FF98', '#FF91A4'],
 *     hover: ['#76DD76', '#FF7082'],
 *     eventFunc: [test1, test2],
 *     toClose: 1,
 *   },
 *   title: 'Hola',
 * }
 * modal(objectTest)
 */
export function modal(buttonToOpen, { title, button }) {
  title ? createTitle(title) : ''
  button ? createButtons(button) : ''

  buttonToOpen.addEventListener('click', () => {
    modalControl.modal.classList.remove('hide')
  })
}

function createTitle(title) {
  const titleElement = document.createElement('h3')
  titleElement.classList.add('modal-title')
  titleElement.textContent = title

  let firstChildElement = modalControl.modalContainer.firstChild

  modalControl.modalContainer.insertBefore(titleElement, firstChildElement)
}

function createButtons({
  text,
  color,
  borderColor,
  hover,
  eventFunc,
  toClose,
}) {
  for (let i = 0; i < text.length; i++) {
    let button = document.createElement('button')
    button.classList.add('modal-button')
    button.textContent = text[i]
    button.style.backgroundColor = color[i]
    borderColor ? (button.style.borderColor = borderColor[i]) : ''

    button.dataset.hover = hover[i]
    button.addEventListener('mouseover', function () {
      this.style.backgroundColor = this.dataset.hover
    })
    button.addEventListener('mouseout', function () {
      this.style.backgroundColor = color[i]
    })

    console.log(i, toClose)
    button.addEventListener('click', eventFunc[i])
    i === toClose ? button.addEventListener('click', close) : ''
    modalControl.containerButtons.appendChild(button)
  }
}

function close() {
  modalControl.modal.classList.add('hide')
}
