import * as utils from './utils'
import Button from './button'

import '../style/window.scss'

function CloseWindowButton (parent) {
  let contents = document.createElement('span')
  contents.appendChild(document.createTextNode('x'))
  return Button(contents, e => parent.toggleDisplay(), 'close-window-')
}

export function New (el, title) {
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

export function fromContents (
  upperLeft,
  dimensions,
  title,
  contents,
  parentEl,
  taskbar
) {
  let el = utils.divWithClass('window-border')
  utils.setElementPos(el, upperLeft)

  let win95Window = New(el, title)

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
