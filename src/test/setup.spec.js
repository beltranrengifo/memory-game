import Setup from '@/js/classes/Setup'
import { getUser, getLocation, getGameLevel } from '@/js/utils/modal-templates'

describe('Setup Constructor', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
    setup.user = 'Pepe'
    setup.userLocation = {
      lat: 123,
      long: 123
    }
    setup.level = 5
  })

  test('Setup class should be a function', () => {
    expect(typeof Setup).toBe('function')
  })

  test('Setup should be defined after creation', () => {
    expect(setup).toBeDefined()
  })

  test('Setup should create modal', () => {
    expect(setup.modal).toBeDefined()
  })
})

describe('getUser method', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
    setup.user = 'Pepe'
    setup.userLocation = {
      lat: 123,
      long: 123
    }
    setup.level = 5
  })

  test('Setup getUser should be fn', () => {
    expect(typeof setup.getUser).toBe('function')
  })

  test('Setup getUser should set the value of the user asynchronous', () => {
    const name = 'John'
    // eslint-disable-next-line jest/valid-expect-in-promise
    setup.getUser().then(user => {
      expect(user).toBe(name)
    })
    const input = setup.modal.modalBody.querySelector('#input-user')
    input.value = name
    setup.modal.modalBody.querySelector('#user-modal .button').click()
  })

  test('Setup getUser should control the input value', () => {
    const newSetup = new Setup()
    newSetup.modal.modalBody.innerHTML = getUser()
    newSetup.getUser()
    const input = newSetup.modal.modalBody.querySelector('#input-user')
    input.value = ''
    const button = newSetup.modal.modalBody.querySelector('#user-modal .button')
    button.click()
    expect(button.innerText).toBe('Please, type your name')
  })
})

describe('getUserLocation method', () => {
  let setup
  let mockGeolocation
  beforeEach(() => {
    setup = new Setup()
    setup.modal.modalBody.innerHTML = getLocation()
    const position = jest.fn()
    const error = jest.fn()
    mockGeolocation = {
      getCurrentPosition: jest.fn(position, error),
      watchPosition: jest.fn()
    }
    global.navigator.geolocation = mockGeolocation
  })

  test('Setup getUserLocation should be fn', () => {
    expect(typeof setup.getUserLocation).toBe('function')
  })

  test('Button 1 (true) should fire the right event', () => {
    setup.getUserLocation()
    const buttons = setup.modal.modalBody.querySelectorAll('#location-modal .button')
    buttons[0].click()
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled()
  })

  test('Button 2 (false) should fire the right event', () => {
    setup.modal.modalBody.innerHTML = getLocation()
    setup.getUserLocation()
    const buttons = setup.modal.modalBody.querySelectorAll('#location-modal .button')
    buttons[1].click()
    expect(setup.userLocation).toBe(false)
  })
})

describe('getGameLevel method', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
    setup.modal.modalBody.innerHTML = getGameLevel()
  })

  test('Setup getGameLevel should be fn', () => {
    expect(typeof setup.getGameLevel).toBe('function')
  })

  const levels = [0, 1, 2, 3, 4]

  levels.forEach(level => {
    test(`Level: ${level + 2} - Buttons should fire the right event and set the right level (${level + 2})`, () => {
      setup.getGameLevel()
      const buttons = setup.modal.modalBody.querySelectorAll('#level-modal button.levels__level')
      buttons[level].click()
      expect(setup.level).toBe(level + 2)
    })
  })

  test('getGameLevel should destroy the modal', () => {
    setup.getGameLevel()
    const buttons = setup.modal.modalBody.querySelectorAll('#level-modal button.levels__level')
    buttons[0].click()
    setTimeout(() => expect(setup.modal.modalBody.innerHTML).toBeFalsy(), 100)
  })
})

describe('getGameConfig method', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
  })

  test('Setup getGameConfig should be fn', () => {
    expect(typeof setup.getGameConfig).toBe('function')
  })

  test('Setup getGameConfig should return an obj', () => {
    const a = setup.getGameConfig()
    expect(typeof a).toBe('object')
  })

  test('Setup getGameConfig should match snapshot', () => {
    const a = setup.getGameConfig()
    expect(a).toMatchSnapshot()
  })
})
