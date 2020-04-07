import Game from '../js/classes/Game.js'

describe('Main script', () => {
  let gameConfig
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6
    }
  })
  test('Game should be defined', () => {
    expect(Game).toBeDefined()
  })
  test('New Game should be defined', () => {
    const game = new Game(gameConfig)
    expect(game).toBeDefined()
  })
  test('Config should be defined', () => {
    expect(gameConfig).toBeDefined()
  })
})
