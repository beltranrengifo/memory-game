import Board from '@/js/classes/Board'
import Modal from '@/js/classes/Modal'
import { finishGame } from '@/js/utils/modal-templates'
// import { database } from '@/js/utils/database'

export default class Game {
  constructor (config) {
    this.config = config
    this.board = new Board(this)
    this.pickedCards = []
    this.attempts = 0
    this.achievements = 0
    this.defaultDelay = 800
    this.time = 0
    this.paused = false
    this.chronoInterval = null
    this.firstClick = true
    this.board.setAttempts(this.attempts)
    this.board.setAchievements(this.achievements)
    this.board.setTime(this.time)
  }

  cardClickHandler (event, element) {
    if (this.firstClick) {
      this.chronometer()
      this.firstClick = false
    }

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
    this.paused = true
    clearInterval(this.chronoInterval)
    const gameFinishedModal = new Modal()
    gameFinishedModal.setContent(finishGame({
      attempts: this.attempts,
      time: this.time,
      level: this.config.level,
      total: this.calculateTotalResult()
    })
    )
    setTimeout(() => {
      gameFinishedModal.showModal()
    }, 2500)
  }

  chronometer () {
    this.chronoInterval = setInterval(() => {
      if (!this.paused) {
        this.board.setTime(this.time)
        this.time++
      }
    }, 1000)
  }

  calculateTotalResult () {
    return this.attempts * this.time / this.config.level
  }

  saveGame () {
    /* const data = {
      user: 'pepe'
    }
    database.ref().push(data) */
  }
}
