import 'reset-css'
import '@/scss/index.scss'
import '@fortawesome/fontawesome-pro/js/all.min.js'
import 'animate.css/animate.min.css'
import Game from '@/js/classes/Game'

window.onload = () => {
  const gameConfig = {
    element: 'main-board',
    level: 2
  }
  // eslint-disable-next-line no-unused-vars
  const game = new Game(gameConfig)
}
