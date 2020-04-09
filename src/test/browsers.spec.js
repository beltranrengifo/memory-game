import { setBrowserInDom } from '../js/utils/browsers'

describe('Browsers', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="header__info" />
      <div id="main-board" />
    `
  })

  test('setBrowserInDom function', () => {
    expect(typeof setBrowserInDom).toBe('function')
  })

  test('setBrowserInDom to be defined', () => {
    expect(setBrowserInDom).toBeDefined()
  })

  test('setBrowserInDom should work with Firefox', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Firefox',
      writable: true,
      enumerable: true,
      configurable: true
    })
    setBrowserInDom()
    expect(document.body.classList.contains('firefox')).toBe(true)
    document.body.classList = []
  })

  test('setBrowserInDom should not work in other cases', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'Grijander' })
    setBrowserInDom()
    expect(document.body.classList).toHaveLength(0)
  })
})
