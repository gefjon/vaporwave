const utils = require('./utils.js')
const button = require('./button.js')
const windowsLogoUri = '/assets/win95logo.png'
const windowsLogoBigUri = '/assets/win95logo2x.png'

module.exports = {
  MakeTaskbar
}

function Taskbar (el, innerEl) {
  return {
    el,
    innerEl,
    addButton: function (button) {
      this.innerEl.appendChild(button.el)
    },
    addButtonForWindow: function (window) {
      let contents = document.createElement('div')
      contents.appendChild(document.createTextNode(window.title))
      let buttonEl = button.MakeButton(
        contents,
        e => window.toggleDisplay(),
        'taskbar-'
      )
      this.addButton(buttonEl)
    }
  }
}

function makeStartButton () {
  let contents = document.createElement('div')

  let logo = document.createElement('img')
  logo.src = windowsLogoBigUri
  logo.alt = 'Windows 95 logo'
  utils.addClasses(logo, ['start-button-logo', 'start-button-sub-content'])
  contents.appendChild(logo)

  let text = document.createElement('span')
  utils.addClasses(text, ['start-button-sub-content'])
  text.appendChild(document.createTextNode('Start'))
  contents.appendChild(logo)
  contents.appendChild(text)

  return button.MakeButton(contents, undefined, 'start-')
}

function MakeTaskbar (parent) {
  let el = utils.divWithClass('taskbar-border')
  let innerEl = utils.divWithClass('taskbar')
  el.appendChild(innerEl)
  let taskbar = Taskbar(el, innerEl)
  taskbar.addButton(makeStartButton())
  parent.appendChild(el)

  return taskbar
}
