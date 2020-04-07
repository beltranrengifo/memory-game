import Board from '../js/classes/Board'
import Game from '../js/classes/Game'

describe('Board', () => {
  let gameConfig
  let game
  let board
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6
    }
    game = new Game(gameConfig)
    board = new Board(game)
    document.body.innerHTML = `
      <div class="header__info" />
      <div id="main-board" />
    `
  })

  test('Board is a function', () => {
    expect(typeof Board).toBe('function')
  })

  test('Board is defined', () => {
    expect(Board).toBeDefined()
  })

  test('Game is defined in Board', () => {
    expect(board.game).toBeDefined()
  })

  test('Reset the DOM element', () => {
    board.resetBoard()
    expect(board.domElement.innerHTML).toBe('')
  })

  test('Icons should have the right length', () => {
    const brands = board.generateCards()
    expect(brands).toHaveLength((board.level * 2) * 2)
  })

  test('lockBoard should add the right class', () => {
    board.lockBoard()
    expect(board.domElement.classList.contains('main__board--locked')).toBeTruthy()
  })

  test('unlockBoard should remove the right class', () => {
    board.lockBoard()
    board.unlockBoard()
    setTimeout(() => expect(board.domElement.classList.contains('main__board--locked')).toBeFalsy(), 0)
  })

  test('boardFinished should add the right classes', () => {
    board.boardFinished()
    expect(board.domElement.classList.contains('animated', 'flash', 'delay-1s')).toBeTruthy()
  })
})
