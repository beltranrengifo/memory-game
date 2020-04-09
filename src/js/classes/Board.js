import { brands } from '@/js/utils/brands'
import _ from 'lodash'
import Card from '@/js/classes/Card'
import { capitalize } from '@/js/utils/functions'

export default class Board {
  constructor (game) {
    this.game = game
    this.level = game.config.level
    this.levels = {
      2: 'easiest',
      3: 'easy',
      4: 'medium',
      5: 'hard',
      6: 'hardest'
    }
    this.domElement = document.getElementById(game.config.element)
    this.headerInfoElement = document.querySelector('.header__info')
    this.headerTitleElement = document.querySelector('.header__title')
    this.attemptsElement = null
    this.achievementsElement = null
    this.cards = this.generateCards()
    this.resetBoard()
    this.drawBoard()
    this.createAttemptsBox()
    this.createAchievementsBox()
    this.createTimeBox()
    this.createLevelBox()
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

  createTimeBox () {
    if (!this.headerInfoElement) return
    this.timeElement = document.createElement('div')
    this.timeElement.id = 'time'
    this.timeElement.classList.add('header__time')
    this.headerInfoElement.appendChild(this.timeElement)
  }

  createLevelBox () {
    if (!this.headerTitleElement) return
    this.levelElement = document.createElement('div')
    this.levelElement.id = 'level'
    this.levelElement.classList.add('header__level', `header__level--${this.levels[this.level]}`)
    this.levelElement.innerText = capitalize(this.levels[this.level])
    this.headerTitleElement.appendChild(this.levelElement)
  }

  setAttempts (attempts) {
    if (!this.attemptsElement) return
    this.attemptsElement.innerHTML = attempts
  }

  setAchievements (achievements) {
    if (!this.achievementsElement) return
    this.achievementsElement.innerHTML = achievements
  }

  setTime (time) {
    if (!this.timeElement) return
    this.timeElement.innerHTML = time
  }

  lockBoard () {
    this.domElement.classList.add('main__board--locked')
  }

  unlockBoard () {
    setTimeout(() => this.domElement.classList.remove('main__board--locked'), this.game.defaultDelay)
  }

  boardFinished () {
    this.domElement.classList.add('animated', 'tada', 'delay-1s')
    setTimeout(() => document.querySelector('body').classList.add('show-results'), 2500)
  }

  cleanBoard () {
    this.domElement.innerHTML = ''
    this.domElement.classList = ['main__board']
    this.attemptsElement && this.attemptsElement.remove()
    this.achievementsElement && this.achievementsElement.remove()
    this.timeElement && this.timeElement.remove()
    this.levelElement && this.levelElement.remove()
  }
}
