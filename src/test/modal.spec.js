import Modal from '@/js/classes/Modal'

describe('Modal class', () => {
  let modal

  beforeEach(() => {
    modal = new Modal()
    document.body.innerHTML = `
      <div class="header__info" />
      <div id="main-board" />
    `
    modal.createModal()
  })

  test('Modal function', () => {
    expect(typeof Modal).toBe('function')
  })

  test('modal to be defined', () => {
    expect(modal).toBeDefined()
  })

  test('modal to match snapshot', () => {
    expect(modal).toMatchSnapshot()
  })

  test('spyOn createModal on new Modal()', () => {
    const spy = jest.spyOn(modal, 'createModal')
    modal.createModal()
    expect(spy).toHaveBeenCalled()
  })

  test('check overlay creation', () => {
    const a = document.body.querySelector('.modal__overlay')
    expect(a).toBeTruthy()
  })

  test('check modal body creation', () => {
    const a = document.body.querySelector('.modal__body')
    expect(a).toBeTruthy()
  })

  test('check showModal fn', () => {
    modal.showModal()
    const a = document.body.querySelector('.modal__overlay')
    const hasClass = a.classList.contains('modal__overlay--visible')
    expect(hasClass).toBe(true)
  })

  test('check hideModal fn', () => {
    modal.showModal()
    const a = document.body.querySelector('.modal__overlay')
    modal.hideModal()
    const hasClass = a.classList.contains('modal__overlay--visible')
    expect(hasClass).toBe(false)
  })

  test('check showLoader fn', () => {
    modal.showLoader()
    const modalBody = document.body.querySelector('.modal__body')
    const loader = modalBody.querySelector('.modal__loader')
    expect(loader).toBeTruthy()
  })

  test('showLoader should match snapshot', () => {
    modal.showLoader()
    const modalBody = document.body.querySelector('.modal__body')
    expect(modalBody).toMatchSnapshot()
  })

  test('check hideLoader fn', () => {
    modal.showLoader()
    const modalBody = document.body.querySelector('.modal__body')
    modal.hideLoader()
    const loader = modalBody.querySelector('.modal__loader')
    expect(loader).toBeFalsy()
  })

  test('check setContent fn', () => {
    const html = '<div class="demo-class">Hi there</div>'
    modal.setContent(html)
    expect(modal.modalBody.innerHTML).toBe(html)
  })

  test('check deleteContent fn', () => {
    const html = '<div class="demo-class">Hi there</div>'
    modal.setContent(html)
    modal.deleteContent()
    expect(modal.modalBody.innerHTML).toBe('')
  })
})
