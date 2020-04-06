import Board from '../js/classes/Board'
import Game from '../js/classes/Game'

describe('Board', () => {
  let gameConfig
  let game
  let board
  beforeEach(() => {
    gameConfig = {
      element: '<div id="main-board" />',
      level: 6
    }
    game = new Game(gameConfig)
    // eslint-disable-next-line no-unused-vars
    board = new Board(game)
  })

  test('Create Board', () => {
    expect(typeof Board).toBe('function')
  })

  test('Icons should have the right length', () => {
    const brands = board.generateCards()
    expect(brands).toHaveLength((board.level * 2) * 2)
  })

  test('Reset the DOM element', () => {
    board.domElement = document.createElement('div')
    board.domElement.appendChild = document.createElement('div')
    board.resetBoard()
    expect(board.domElement.innerHTML).toBe('')
  })
  // test('Create the DOM element', () => {})
})
