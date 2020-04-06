import Card from '@/js/classes/Card'

describe('Card', () => {
  let card
  let cardElement

  beforeEach(() => {
    card = new Card('twitter', jest.fn)
    cardElement = card.generateCard()
  })

  test('Card function', () => {
    expect(typeof Card).toBe('function')
  })

  test('Card name to be defined', () => {
    expect(card.name).toBeDefined()
  })

  test('Card DOM element to be defined', () => {
    expect(card.domElement).toBeDefined()
  })

  test('Card DOM element to be truthy', () => {
    expect(card.domElement).toBeTruthy()
  })

  test('Card handler to be defined', () => {
    expect(card.clickHandler).toBeDefined()
  })

  test('Card handler to be a function', () => {
    expect(typeof card.clickHandler).toBe('function')
  })

  test('Card generates DOM element and matches', () => {
    expect(cardElement).toMatchSnapshot()
  })

  test('spyOn card setListener', () => {
    const spyOnSetListener = jest.spyOn(card, 'setListener')
    card.setListener()
    expect(spyOnSetListener).toHaveBeenCalled()
  })

  test('spyOn card generateCard', () => {
    const spyOnGenerateCard = jest.spyOn(card, 'generateCard')
    card.generateCard()
    expect(spyOnGenerateCard).toHaveBeenCalled()
  })

  test('spyOn card clickHandler', () => {
    const spyOnClickHandler = jest.spyOn(card, 'clickHandler')
    card.domElement.click()
    expect(spyOnClickHandler).toHaveBeenCalled()
  })
})
