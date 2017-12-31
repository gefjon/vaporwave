export function Pos (x, y) {
  return { x, y }
}

export function setElementPos (el, pos) {
  el.style['left'] = pos.x + 'px'
  el.style['top'] = pos.y + 'px'
}

export function setElementDimensions (el, dims) {
  el.style['width'] = dims.x + 'px'
  el.style['height'] = dims.y + 'px'
}

export function addClasses (el, classes) {
  classes.map(c => { el.classList.add(c) })
}

export function addClass (el, c) {
  el.classList.add(c)
}

export function divWithClass (c) {
  let el = document.createElement('div')
  addClass(el, c)
  return el
}

export function divWithClasses (classes) {
  let el = document.createElement('div')
  addClasses(el, classes)
  return el
}
