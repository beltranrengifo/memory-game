import 'reset-css'
import '@/scss/index.scss'
import '@fortawesome/fontawesome-pro/js/all.min.js'
import Game from '@/js/classes/Game'

window.onload = () => {
  const gameConfig = {
    element: 'main-board',
    level: 6
  }
  // eslint-disable-next-line no-unused-vars
  const game = new Game(gameConfig)
}
