import 'reset-css'
import '@/scss/index.scss'
import '@fortawesome/fontawesome-pro/js/all.min.js'
import '@fortawesome/fontawesome-pro/css/all.min.css'
import 'animate.css/animate.min.css'
import Setup from '@/js/classes/Setup'
import Game from '@/js/classes/Game'

window.onload = () => {
  init()
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

export {
  init
}
