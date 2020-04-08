export default class Modal {
  constructor () {
    this.overlay = document.createElement('div')
    this.modalBody = document.createElement('div')
    this.loader = document.createElement('div')
    this.createModal()
  }

  createModal () {
    const body = document.querySelector('body')

    this.overlay.classList.add('modal__overlay')
    this.modalBody.classList.add('modal__body')

    this.overlay.appendChild(this.modalBody)
    body.appendChild(this.overlay)
  }

  showModal () {
    this.overlay.classList.add('modal__overlay--visible')
  }

  hideModal () {
    this.overlay.classList.remove('modal__overlay--visible')
  }

  showLoader () {
    this.loader = document.createElement('div')
    this.loader.classList.add('modal__loader')
    this.loader.innerHTML = '<i class="fal fa-spinner-third fa-spin"></i>'
    this.modalBody.appendChild(this.loader)
  }

  hideLoader () {
    this.modalBody.removeChild(this.loader)
  }

  setContent (content) {
    this.modalBody.innerHTML = content
  }

  deleteContent () {
    this.modalBody.innerHTML = ''
  }

  destroyModal () {
    this.hideModal()
    setTimeout(() => this.overlay.remove(), 800)
  }
}
