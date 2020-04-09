import Setup from '@/js/classes/Setup'

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
    // eslint-disable-next-line jest/valid-expect-in-promise
    setup.getUser().then(user => {
      expect(user).toBe('Luis')
    })
    setup.modal.modalBody.querySelector('#input-user').value = 'Luis'
    setup.modal.modalBody.querySelector('#user-modal .button').click()
  })
})

describe('getUserLocation method', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
  })

  test('Setup getUserLocation should be fn', () => {
    expect(typeof setup.getUserLocation).toBe('function')
  })
})

describe('getGameLevel method', () => {
  let setup
  beforeEach(() => {
    setup = new Setup()
  })

  test('Setup getGameLevel should be fn', () => {
    expect(typeof setup.getGameLevel).toBe('function')
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
