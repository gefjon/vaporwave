import * as utils from './utils'
import * as Win95Window from './win95window'
import Taskbar from './taskbar'

import '../style/vaporwave.scss'

window.onload = e => {
  let body = document.getElementById('body-wrapper')
  let taskbar = Taskbar(body)

  let elems = document.getElementById('window-contents').children
  for (let i = 0; i < elems.length; i++) {
    console.log('iterating')
    Win95Window.fromContents(
      utils.Pos(30 * i, 30 * i),
      utils.Pos(500, 500),
      'Window title',
      elems[i],
      body,
      taskbar
    )
    i += 1
  }
}
