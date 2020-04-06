import Board from '@/js/classes/Board'

export default class Game {
  constructor (config) {
    this.config = config
    this.board = new Board(this)
  }

  cardClickHandler (el) {
    console.log(el)
  }
}
