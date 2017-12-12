module.exports = {
  Pos: function (x, y) {
    return { x, y }
  },

  setElementPos: function (el, pos) {
    el.style['left'] = pos.x + 'px'
    el.style['top'] = pos.y + 'px'
  },

  setElementDimensions: function (el, dims) {
    el.style['width'] = dims.x + 'px'
    el.style['height'] = dims.y + 'px'
  },

  addClasses: function (el, classes) {
    classes.map(c => { el.classList.add(c) })
  },

  divWithClass: function (c) {
    let el = document.createElement('div')
    el.classList.add(c)
    return el
  }
}
