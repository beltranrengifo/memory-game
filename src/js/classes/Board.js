import brands from '@/js/lib/brands'
import _ from 'lodash'
import Card from '@/js/classes/Card'

export default class Board {
  constructor (game) {
    this.game = game
    this.level = game.config.level
    this.domElement = document.getElementById(game.config.element)
    this.headerInfoElement = document.querySelector('.header__info')
    this.attemptsElement = null
    this.achievementsElement = null
    this.cards = this.generateCards()
    this.resetBoard()
    this.drawBoard()
    this.createAttemptsBox()
    this.createAchievementsBox()
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
      const cardElement = new Card(card, this.game)
      this.domElement.appendChild(cardElement.generateCard())
      this.domElement.classList.add(`main__board--${this.cards.length}`)
    })
  }

  createAttemptsBox () {
    if (!this.headerInfoElement) return
    this.attemptsElement = document.createElement('div')
    this.attemptsElement.id = 'attempts'
    this.attemptsElement.classList.add('header__attempts')
    this.headerInfoElement.appendChild(this.attemptsElement)
  }

  createAchievementsBox () {
    if (!this.headerInfoElement) return
    this.achievementsElement = document.createElement('div')
    this.achievementsElement.id = 'achievements'
    this.achievementsElement.classList.add('header__achievements')
    this.headerInfoElement.appendChild(this.achievementsElement)
  }

  setAttempts (attempts) {
    if (!this.attemptsElement) return
    this.attemptsElement.innerHTML = attempts
  }

  setAchievements (achievements) {
    if (!this.achievementsElement) return
    this.achievementsElement.innerHTML = achievements
  }

  lockBoard () {
    this.domElement.classList.add('main__board--locked')
  }

  unlockBoard () {
    setTimeout(() => this.domElement.classList.remove('main__board--locked'), this.game.defaultDelay)
  }

  boardFinished () {
    this.domElement.classList.add('animated', 'flash', 'delay-1s')
    setTimeout(() => document.querySelector('body').classList.add('show-results'), 2500)
  }
}
