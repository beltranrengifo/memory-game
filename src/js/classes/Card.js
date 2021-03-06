import { capitalize, deKebabCase } from '@/js/utils/functions'
import { belt } from '@/js/utils/belt'
export default class Card {
  constructor (name, game) {
    this.name = name
    this.game = game
    this.domElement = null
    this.clickHandler = this.game.cardClickHandler
  }

  generateCard () {
    this.domElement = document.createElement('article')
    this.domElement.classList.add('card')
    this.domElement.setAttribute('brand', this.name)

    const cardElWrap = document.createElement('div')
    cardElWrap.classList.add('card__wrap')

    const cardElFront = document.createElement('div')
    cardElFront.classList.add('card__front')
    cardElFront.setAttribute('brand-display', capitalize(deKebabCase(this.name)))

    const cardElBrand = document.createElement('i')
    cardElBrand.classList.add('card__brand', 'fab', `fa-${this.name}`)
    cardElFront.appendChild(cardElBrand)

    const cardElBack = document.createElement('div')
    cardElBack.classList.add('card__back')

    const cardElBackLogo = document.createElement('span')
    cardElBackLogo.classList.add('card__belt')
    cardElBackLogo.innerHTML = belt
    cardElBack.appendChild(cardElBackLogo)

    cardElWrap.appendChild(cardElFront)
    cardElWrap.appendChild(cardElBack)

    this.domElement.appendChild(cardElWrap)
    this.setListener()
    return this.domElement
  }

  setListener () {
    this.domElement.addEventListener('click', event => this.clickHandler.call(this.game, event, this.name), false)
  }
}
