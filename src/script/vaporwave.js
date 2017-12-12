const utils = require('./utils.js')
const win95window = require('./win95window.js')
const taskbar = require('./taskbar.js')

window.onload = e => {
  let body = document.getElementById('body-wrapper')
  let taskbarEl = taskbar.MakeTaskbar(body)

  let myWindow = win95window.Win95WindowFromContents(
    utils.Pos(30, 30),
    utils.Pos(500, 500),
    'Window title',
    utils.divWithClass('foo'),
    body,
    taskbarEl
  )
}
