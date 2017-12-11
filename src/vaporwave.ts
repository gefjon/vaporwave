const windowsLogoUri: string = '/assets/win95logo.png'
const windowsLogoBigUri: string = '/assets/win95logo2x.png'

let draggingElement: HTMLElement = undefined

class Pos {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Win95Window {
    el: HTMLElement
    title: string
    toggleDisplay() {
        if (this.el.style['visibility'] === 'hidden') {
            this.el.style['visibility'] = 'visible'
        } else {
            this.el.style['visibility'] = 'hidden'
        }
    }
    constructor(upperLeft: Pos, dimensions: Pos, title: string, wrapperEl: HTMLElement, taskbar: TaskBar) {
        console.log(`making a window at position ${upperLeft}, dims ${dimensions}, title ${title}`)
        let el = document.createElement('div')
        el.classList.add('window-border')
        el.style['left'] = upperLeft.x + 'px'
        el.style['top'] = upperLeft.y + 'px'

        let windowEl = document.createElement('div')
        windowEl.classList.add('window')
        windowEl.style['width'] = dimensions.x + 'px'
        windowEl.style['height'] = dimensions.y + 'px'
        
        let titleBar = document.createElement('div')
        titleBar.classList.add('window-title')

        let titleText = document.createElement('div')
        titleText.classList.add('window-title-text')
        titleText.appendChild(
            document.createTextNode(
                title
            )
        )

        titleBar.appendChild(titleText)

        let closeButtonBorder = document.createElement('div')
        closeButtonBorder.classList.add('close-window-button-border')
        closeButtonBorder.classList.add('button-border')

        let closeButton = document.createElement('div')
        closeButton.classList.add('close-window-button')
        closeButton.classList.add('button')

        let closeText = document.createElement('span')
        closeText.classList.add('button-text')
        closeText.appendChild(document.createTextNode('x'))

        closeButton.appendChild(closeText)
        closeButton.onclick = (e: MouseEvent) => {
            this.toggleDisplay()
        }

        closeButtonBorder.appendChild(closeButton)
        titleBar.appendChild(closeButtonBorder)
        windowEl.appendChild(titleBar)
        
        let contentEl = document.createElement('div')
        contentEl.classList.add('window-content')

        windowEl.appendChild(contentEl)

        el.appendChild(windowEl)

        wrapperEl.appendChild(el)
        
        this.el = el
        this.title = title

        taskbar.addButton(new TaskBarButton(this))
    }
}

class TaskBar {
    el: HTMLElement
    innerEl: HTMLElement
    constructor(bodyEl: HTMLElement) {
        console.log('making taskbar')
        let el = document.createElement('div')
        el.id = 'taskbar-border'
        let innerEl = document.createElement('div')
        innerEl.id = 'taskbar'
        el.appendChild(innerEl)
        innerEl.appendChild(makeStartButton())
        bodyEl.appendChild(el)

        this.el = el
        this.innerEl = innerEl
    }
    addButton(button: TaskBarButton) {
        this.innerEl.appendChild(button.el)
    }
}

function makeStartButton(): HTMLElement {
    let el = document.createElement('div')
    el.id = 'startButtonBorder'
    el.classList.add('button-border')

    let innerEl = document.createElement('div')
    innerEl.classList.add('startButton')
    innerEl.classList.add('button')

    let logo = document.createElement('img')
    logo.src = windowsLogoBigUri
    logo.alt = 'Windows 95 logo'
    logo.classList.add('startButtonLogo')
    logo.classList.add('button-text')

    innerEl.appendChild(logo)

    let startText = document.createElement('span')
    startText.classList.add('startButtonText')
    startText.classList.add('button-text')
    startText.appendChild(document.createTextNode('Start'))

    innerEl.appendChild(startText)

    el.appendChild(innerEl)

    return el
}
    
    
class TaskBarButton {
    el: HTMLElement
    associatedWindow: Win95Window
    constructor(win95Window: Win95Window) {
        console.log(`creating a TaskBarButton for window ${win95Window.title}`)
        let el = document.createElement('div')
        el.classList.add('button-border')
        el.classList.add('taskbar-button-border')
        let button = document.createElement('div')
        button.onclick = function(e: MouseEvent): void {
            win95Window.toggleDisplay()
        }
        button.classList.add('button')
        button.classList.add('taskbar-button')
        let buttonText = document.createElement('span')
        buttonText.appendChild(
            document.createTextNode(
                win95Window.title
            )
        )
        button.appendChild(buttonText)
        el.appendChild(button)
        this.el = el
        this.associatedWindow = win95Window
    }
}

let draggingMouseStart: Pos = undefined
let draggingElementStart: Pos = undefined

function toggleDrag(e: MouseEvent, windowBorderID: string): void {
    if (draggingElement === undefined) {
        draggingElement = document.getElementById(windowBorderID)
        draggingMouseStart = new Pos(e.clientX, e.clientY)
        draggingElementStart = new Pos(
            parseInt(draggingElement.style['left'], 10),
            parseInt(draggingElement.style['top'], 10)
        )
    } else {
        draggingElement = undefined
        draggingMouseStart = undefined
        draggingElementStart = undefined
    }
}

function handleDrag(e: MouseEvent): void {
    if (draggingElement !== undefined) {
        let dx: number = e.clientX - draggingMouseStart.x
        let dy: number = e.clientY - draggingMouseStart.y
        draggingElement.style['left'] = (draggingElementStart.x + dx).toString(10)
        draggingElement.style['top'] = (draggingElementStart.y + dy).toString(10)
    }
}

window.onload = (e: Event) => {
    console.log('onload called')
    let body = document.getElementById('body-wrapper')
    let taskbar: TaskBar = new TaskBar(body)

    let myWindow: Win95Window = new Win95Window(
        new Pos(30, 30),
        new Pos(500, 500),
        'Window title',
        body,
        taskbar
    )
}
