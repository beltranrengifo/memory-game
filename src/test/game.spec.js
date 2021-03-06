import Game from '../js/classes/Game'
import Board from '../js/classes/Board'
import Modal from '../js/classes/Modal'
import { finishGame } from '../js/utils/modal-templates'

describe('Game class', () => {
  let gameConfig = {}
  let game
  // eslint-disable-next-line no-unused-vars
  let board
  let modal
  let event
  beforeEach(() => {
    gameConfig = {
      element: 'main-board',
      level: 6,
      user: 'John',
      userLocation: false
    }
    // eslint-disable-next-line no-unused-vars
    game = new Game(gameConfig)
    board = new Board(game)
    modal = new Modal()
    game.board = board
    game.modal = modal

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

  test('config should be defined', () => {
    expect(game.config).toBeDefined()
  })

  test('board should be defined', () => {
    expect(game.board).toBeDefined()
  })

  test('gameFinished should be defined', () => {
    expect(typeof game.gameFinished).toBe('function')
  })

  test('pickedCards should be an array', () => {
    expect(typeof game.pickedCards).toBe('object')
  })

  test('attempts should be a number', () => {
    expect(typeof game.attempts).toBe('number')
  })

  test('achievements should be a number', () => {
    expect(typeof game.achievements).toBe('number')
  })

  test('defaultDelay should be a number', () => {
    expect(game.defaultDelay).toBe(800)
  })

  test('cardClickHandler should push card element to pickedCards array', () => {
    game.cardClickHandler(event, 'twitter')
    expect(game.pickedCards).toHaveLength(1)
  })

  test('cardClickHandler should empty pickedCards array after 2 clicks', () => {
    game.cardClickHandler(event, 'twitter')
    expect(game.pickedCards).toHaveLength(1)
    game.cardClickHandler(event, 'facebook')
    expect(game.pickedCards).toHaveLength(0)
  })

  test('cardClickHandler after 2 clicks => nextTurn should been called', () => {
    const spyOnNextTurn = jest.spyOn(game, 'nextTurn')
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'facebook')
    expect(spyOnNextTurn).toHaveBeenCalled()
  })

  test('nextTurn should empty array', () => {
    game.pickedCards = ['a', 'b']
    game.nextTurn()
    expect(game.pickedCards).toHaveLength(0)
  })

  test('checkIfWin should been called if cards match', () => {
    const spy = jest.spyOn(game, 'checkIfWin')
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'twitter')
    expect(spy).toHaveBeenCalled()
  })

  test('checkIfWin should be true if length matches', () => {
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'twitter')
    game.achievements = 12
    expect(game.checkIfWin()).toBe(true)
  })

  test('checkIfWin should be false if length doen not match', () => {
    game.cardClickHandler(event, 'twitter')
    game.cardClickHandler(event, 'twitter')
    game.achievements = 11
    expect(game.checkIfWin()).toBe(false)
  })

  test('gameFinished should be called if win', () => {
    const newGame = new Game(gameConfig)
    newGame.gameFinished = jest.fn()
    newGame.checkIfWin = () => true
    newGame.cardClickHandler(event, 'twitter')
    newGame.cardClickHandler(event, 'twitter')
    expect(newGame.gameFinished).toHaveBeenCalled()
  })

  test('getRanking return data', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    game.getRanking = () => new Promise((resolve, reject) => resolve({}))
    game.getRanking().then(data => expect(data).toBeDefined())
  })

  test('createNewGame should call cleanBoard', () => {
    const spy = jest.spyOn(board, 'cleanBoard')
    game.createNewGame()
    expect(spy).toHaveBeenCalled()
  })

  test('createNewGame should call destroyModal', () => {
    const spy = jest.spyOn(modal, 'destroyModal')
    game.createNewGame()
    expect(spy).toHaveBeenCalled()
  })

  test('setCardsClasses should set classes', () => {
    game.pickedCards = [
      { card: document.createElement('div') },
      { card: document.createElement('div') }
    ]
    game.setCardsClasses(['class'])
    game.pickedCards.forEach(e => {
      expect(e.card.classList.contains('class')).toBe(true)
    })
  })

  test('removeCardsClasses should remove classes', () => {
    game.pickedCards = [
      { card: document.createElement('div') },
      { card: document.createElement('div') }
    ]
    game.setCardsClasses(['class'])
    game.removeCardsClasses(['class'])
    game.pickedCards.forEach(e => {
      setTimeout(() => expect(e.card.classList.contains('class')).toBe(false), 800)
    })
  })

  test('gameFinished should pause the timer', () => {
    game.gameFinished()
    expect(game.paused).toBe(true)
  })

  test('gameFinished should call boardFinished', () => {
    const spy = jest.spyOn(game.board, 'boardFinished')
    game.gameFinished()
    expect(spy).toHaveBeenCalled()
  })

  test('gameFinished should call saveGameData', () => {
    game.saveGameData = jest.fn()
    game.gameFinished()
    expect(game.saveGameData).toHaveBeenCalled()
  })

  test('gameFinished should call modal.showModal', () => {
    game.modal.showModal = jest.fn()
    game.gameFinished()
    setTimeout(() => {
      expect(game.modal.showModal).toHaveBeenCalled()
    }, 2500)
  })

  test('playAgainButton should empty modal', () => {
    game.modal.setContent(
      finishGame({
        attempts: 10,
        time: 100,
        level: 5,
        total: 1500,
        ranking: false
      })
    )
    const button = game.modal.modalBody.querySelector('#play-again')
    button.click()
    setTimeout(() => expect(game.modal.modalBody.innerHTML).toBeFalsy(), 800)
  })

  test('chronometer should create the interval', () => {
    game.chronometer()
    expect(game.chronoInterval).toBeTruthy()
  })

  test('chronometer should check if is paused', () => {
    const spy = jest.spyOn(game.board, 'setTime')
    game.chronometer()
    game.paused = false
    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})
