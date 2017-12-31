import * as utils from './utils'

import '../style/button.scss'

export default MakeButton

function ButtonStruct (el) {
  return {
    el
  }
}

function MakeButton (contents, click = undefined, prefix = undefined) {
  let el = utils.divWithClass('button-border')
  let innerEl = utils.divWithClass('button')
  utils.addClasses(contents, ['button-text'])
  if (prefix) {
    utils.addClasses(el, [prefix + 'button-border'])
    utils.addClasses(innerEl, [prefix + 'button'])
    utils.addClasses(contents, [prefix + 'button-text'])
  }
  if (click) {
    innerEl.onclick = click
  }
  innerEl.appendChild(contents)
  el.appendChild(innerEl)
  return ButtonStruct(el)
}
