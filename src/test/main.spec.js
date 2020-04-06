import Game from '../js/classes/Game.js'

describe('Main', () => {
  let gameConfig
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6
    }
  })
  test('Onload should have been called', () => {
    global.onload = jest.fn()
    global.onload()
    expect(global.onload).toHaveBeenCalled()
  })

  test('New Game should be defined', () => {
    const game = new Game(gameConfig)
    expect(game).toBeDefined()
  })
  test('Config should be defined', () => {
    expect(gameConfig).toBeDefined()
  })
})
