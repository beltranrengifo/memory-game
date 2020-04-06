import brands from '@/js/lib/brands'
import _ from 'lodash'
import Card from '@/js/classes/Card'

export default class Board {
  constructor (game) {
    this.game = game
    this.level = game.config.level
    this.domElement = document.getElementById(game.config.element)
    this.cards = this.generateCards()
    this.resetBoard()
    this.drawBoard()
  }

  generateCards () {
    const a = _.shuffle(brands).slice(0, this.level * 2)
    const b = _.shuffle(a.slice(0))
    return _.shuffle(a.concat(b))
  }

  resetBoard () {
    if (!this.domElement) return
    this.domElement.innerHTML = ''
  }

  drawBoard () {
    this.cards.forEach(card => {
      if (!this.domElement) return
      const cardElement = new Card(card, this.game.cardClickHandler)
      this.domElement.appendChild(cardElement.generateCard())
      this.domElement.classList.add(`main__board--${this.cards.length}`)
    })
  }
}
