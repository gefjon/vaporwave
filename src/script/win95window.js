const utils = require('./utils.js')
const button = require('./button.js')

module.exports = {
  Win95WindowFromContents,
  Win95Window
}

function CloseWindowButton (parent) {
  let contents = document.createElement('span')
  contents.appendChild(document.createTextNode('x'))
  return button.MakeButton(contents, e => parent.toggleDisplay(), 'close-window-')
}

function Win95Window (el, title) {
  return {
    el,
    title,
    toggleDisplay: function () {
      if (this.el.style['visibility'] === 'hidden') {
        this.el.style['visibility'] = 'visible'
      } else {
        this.el.style['visibility'] = 'hidden'
      }
    }
  }
}

function Win95WindowFromContents (
  upperLeft,
  dimensions,
  title,
  contents,
  parentEl,
  taskbar
) {
  let el = utils.divWithClass('window-border')
  utils.setElementPos(el, upperLeft)

  let win95Window = Win95Window(el, title)

  let innerEl = utils.divWithClass('window')
  utils.setElementDimensions(innerEl, dimensions)
  el.appendChild(innerEl)

  let titleBar = utils.divWithClass('window-title')
  innerEl.appendChild(titleBar)
  let titleText = utils.divWithClass('window-title-text')
  titleText.appendChild(document.createTextNode(title))

  titleBar.appendChild(titleText)

  titleBar.appendChild(CloseWindowButton(win95Window).el)

  innerEl.appendChild(contents)

  parentEl.appendChild(el)

  taskbar.addButtonForWindow(win95Window)

  return win95Window
}
