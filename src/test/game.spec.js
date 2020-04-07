import Game from '../js/classes/Game'
import Board from '../js/classes/Board'

describe('Game class', () => {
  let gameConfig = {}
  let game
  // eslint-disable-next-line no-unused-vars
  let board
  let event
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6
    }
    // eslint-disable-next-line no-unused-vars
    game = new Game(gameConfig)
    board = new Board(game)

    document.body.innerHTML = `
      <div class="header__info" />
      <div id="main-board" />
    `

    event = {
      target: {
        closest () {
          const template = document.createElement('template')
          let html = '<article class="card"></article>'
          html = html.trim()
          template.innerHTML = html
          return template.content.firstChild
        }
      }
    }
  })

  test('Create Game', () => {
    expect(typeof Game).toBe('function')
  })

  test('Game config should be defined', () => {
    expect(game.config).toBeDefined()
  })

  test('Game board should be defined', () => {
    expect(game.board).toBeDefined()
  })

  test('Game pickedCards should be an array', () => {
    expect(typeof game.pickedCards).toBe('object')
  })

  test('Game attempts should be a number', () => {
    expect(typeof game.attempts).toBe('number')
  })

  test('Game achievements should be a number', () => {
    expect(typeof game.achievements).toBe('number')
  })

  test('Game defaultDelay should be a number', () => {
    expect(game.defaultDelay).toBe(800)
  })

  test('Game cardClickHandler should push card element to pickedCards array', () => {
    game.cardClickHandler(event, 'twitter')
    expect(game.pickedCards).toHaveLength(1)
  })

  test('Game cardClickHandler should empty pickedCards array after 2 clicks', () => {
    game.cardClickHandler(event, 'twitter')
    expect(game.pickedCards).toHaveLength(1)
    game.cardClickHandler(event, 'facebook')
    expect(game.pickedCards).toHaveLength(0)
  })

  test('Game cardClickHandler after 2 clicks => nextTurn should been called', () => {
    const spyOnNextTurn = jest.spyOn(game, 'nextTurn')
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'facebook')
    expect(spyOnNextTurn).toHaveBeenCalled()
  })

  test('Game checkIfWin should been called if cards match', () => {
    const spy = jest.spyOn(game, 'checkIfWin')
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'twitter')
    expect(spy).toHaveBeenCalled()
  })
})
