import 'reset-css'
import '@/scss/index.scss'
import '@fortawesome/fontawesome-pro/js/all.min.js'
import '@fortawesome/fontawesome-pro/css/all.min.css'
import 'animate.css/animate.min.css'
import Setup from '@/js/classes/Setup'
import Game from '@/js/classes/Game'
import { setBrowserInDom } from '@/js/utils/browsers'

window.onload = () => {
  init()
  setBrowserInDom()
}

const init = () => {
  const setup = new Setup()
  setup.getUser()
    .then(() => setup.getUserLocation())
    .then(() => setup.getGameLevel())
    .then(config => {
      // eslint-disable-next-line no-unused-vars
      const game = new Game({
        element: 'main-board',
        user: config.user,
        userLocation: config.userLocation,
        level: config.level
      })
    })
}

const detectDevTool = allow => {
  if (isNaN(+allow)) allow = 100
  const start = +new Date()
  // eslint-disable-next-line
  debugger
  const end = +new Date()
  if (isNaN(start) || isNaN(end) || end - start > allow) {
    alert('DEVTOOLS detected. all operations will be terminated.')
    document.write('DEVTOOLS detected.')
  }
}

if (window.attachEvent) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    detectDevTool()
    window.attachEvent('onresize', detectDevTool)
    window.attachEvent('onmousemove', detectDevTool)
    window.attachEvent('onfocus', detectDevTool)
    window.attachEvent('onblur', detectDevTool)
  } else {
    // eslint-disable-next-line no-undef
    setTimeout(argument.callee, 0)
  }
} else {
  window.addEventListener('load', detectDevTool)
  window.addEventListener('resize', detectDevTool)
  window.addEventListener('mousemove', detectDevTool)
  window.addEventListener('focus', detectDevTool)
  window.addEventListener('blur', detectDevTool)
}

export {
  init
}
