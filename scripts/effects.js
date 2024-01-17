export function shake(element) {
  let interval = 100
  let distance = 10
  let times = 4

  for (let i = 0; i < times; i++) {
    setTimeout(() => {
      element.style.transform = `translate(${distance * -1}px, 0)`
    }, interval * i)
    setTimeout(() => {
      element.style.transform = `translate(${distance}px, 0)`
    }, interval * i + interval / 2)
  }

  setTimeout(() => {
    element.style.transform = 'translate(0, 0)'
  }, interval * times)
}
