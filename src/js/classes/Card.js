export default class Card {
  constructor (name, clickHandler) {
    this.name = name
    this.clickHandler = clickHandler
    this.domElement = null
  }

  generateCard () {
    this.domElement = document.createElement('div')
    this.domElement.classList.add('card')
    this.domElement.setAttribute('brand', this.name)
    const cardElWrap = document.createElement('div')
    cardElWrap.classList.add('card__wrap')
    const cardElBrand = document.createElement('i')
    cardElBrand.classList.add('card__brand', 'fab', `fa-${this.name}`)
    cardElWrap.appendChild(cardElBrand)
    this.domElement.appendChild(cardElWrap)
    this.setListener()
    return this.domElement
  }

  setListener () {
    this.domElement.addEventListener('click', () => this.clickHandler(this.name), false)
  }
}
