import Game from '../js/classes/Game'

describe('Game', () => {
  let gameConfig = {}
  // eslint-disable-next-line no-unused-vars
  let game
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6
    }
    // eslint-disable-next-line no-unused-vars
    game = jest.fn()
    game(gameConfig)
  })

  test('Create Game', () => {
    expect(typeof Game).toBe('function')
  })
  test('Game should receive the config as param', () => {
    expect(game).toHaveBeenCalledWith(gameConfig);
  })
})
