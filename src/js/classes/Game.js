import Board from '@/js/classes/Board'

export default class Game {
  constructor (config) {
    this.config = config
    this.board = new Board(this)
    this.pickedCards = []
    this.attempts = 0
    this.achievements = 0
    this.board.setAttempts(this.attempts)
    this.board.setAchievements(this.achievements)
    this.defaultDelay = 800
  }

  cardClickHandler (event, element) {
    const card = event.target.closest('.card')
    card.classList.add('visible')

    this.pickedCards.push({
      name: element,
      card: card
    })

    if (this.pickedCards.length === 2) {
      this.board.lockBoard()
      this.attempts++
      this.board.setAttempts(this.attempts)

      if (this.pickedCards.every(e => e.name === element)) {
        this.achievements++
        this.board.setAchievements(this.achievements)
        this.setCardsClasses(['blocked', 'animated', 'bounce'])

        if (this.checkIfWin()) {
          this.gameFinished()
        }
      } else {
        this.setCardsClasses(['animated', 'shake', 'delay-sm'])
        this.removeCardsClasses(['visible', 'animated', 'shake', 'delay-sm'])
      }
      this.nextTurn()
      this.board.unlockBoard()
    }
  }

  setCardsClasses (css) {
    this.pickedCards.forEach(e => {
      e.card.classList.add(...css)
    })
  }

  removeCardsClasses (css) {
    this.pickedCards.forEach(e => {
      setTimeout(() => e.card.classList.remove(...css), this.defaultDelay)
    })
  }

  checkIfWin () {
    return this.board.cards.length / 2 === this.achievements
  }

  nextTurn () {
    this.pickedCards = []
  }

  gameFinished () {
    this.board.boardFinished()
  }
}
