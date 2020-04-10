import Board from '@/js/classes/Board'
import Modal from '@/js/classes/Modal'
import { finishGame, getRankingTable } from '@/js/utils/modal-templates'
import { database } from '@/js/utils/database'
import { init } from '@/js/main'
import _ from 'lodash'

export default class Game {
  constructor (config) {
    this.config = config
    this.board = new Board(this)
    this.modal = new Modal()
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
    this.getRanking()
      .then(data => {
        console.log('hi')
        this.modal.setContent(
          finishGame({
            attempts: this.attempts,
            time: this.time,
            level: this.board.levels[this.config.level],
            total: this.calculateTotalResult(),
            ranking: data
          })
        )
        const playAgainButton = this.modal.modalBody.querySelector('#play-again')
        playAgainButton.addEventListener('click', () => this.createNewGame())
      })
    this.saveGameData()
    setTimeout(() => {
      this.modal.showModal()
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
    return ((this.config.level * 75) - (this.attempts * 1.3 + (this.time * 1.1)))
  }

  saveGameData () {
    database.ref().push({
      user: this.config.user,
      userLocation: this.config.userLocation,
      level: this.config.level,
      attempts: this.attempts,
      time: this.time,
      total: this.calculateTotalResult()
    })
  }

  getRanking () {
    return new Promise(resolve => {
      database.ref().once('value', data => {
        const list = _.sortBy(data.val(), item => item.total).reverse()
        resolve(getRankingTable(list, this.board.levels))
      })
    })
  }

  createNewGame () {
    this.modal.destroyModal()
    this.board.cleanBoard()
    init()
  }
}
