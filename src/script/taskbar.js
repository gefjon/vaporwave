const utils = require('./utils.js')
const button = require('./button.js')
const windowsLogoUri = '/assets/win95logo.png'
const windowsLogoBigUri = '/assets/win95logo2x.png'

module.exports = {
  MakeTaskbar
}

function Taskbar (el, innerEl, clock) {
  return {
    el,
    innerEl,
    clock,
    addButton: function (button) {
      if (this.clock) {
        this.innerEl.insertBefore(button.el, clock.el)
      } else {
        this.innerEl.appendChild(button.el)
      }
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

function Clock (el, textEl) {
  return {
    el,
    textEl
  }
}

function MakeClock () {
  let el = utils.divWithClass('sunken-element-border')
  utils.addClasses(el, ['clock-border'])
  let innerEl = utils.divWithClass('sunken-element')
  utils.addClasses(innerEl, ['clock'])
  el.appendChild(innerEl)
  let textEl = utils.divWithClass('sunken-element-text')
  utils.addClasses(textEl, ['clock-text'])
  innerEl.appendChild(textEl)
  let clock = Clock(el, textEl)
  let adjustClock = () => {
    let now = new Date()
    let hours = now.getHours()
    let halfOfDay = (hours > 11) ? 'PM' : 'AM'
    hours %= 12
    if (hours === 0) {
      hours = 12
    }
    let minutes = now.getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (clock.textEl.firstChild != null) {
      clock.textEl.removeChild(clock.textEl.firstChild)
    }
    clock.textEl.appendChild(document.createTextNode(
      `${hours}:${minutes} ${halfOfDay}`
    ))
  }
  window.setInterval(adjustClock, 5000)
  adjustClock()

  return clock
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
  let taskbar = Taskbar(el, innerEl, MakeClock())
  innerEl.appendChild(taskbar.clock.el)
  taskbar.addButton(makeStartButton())
  parent.appendChild(el)

  return taskbar
}
