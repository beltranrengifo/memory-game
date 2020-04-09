import { finishGame, getUser, getLocation, getGameLevel, getRankingTable } from '../js/utils/modal-templates'

describe('finishGame template', () => {
  let results
  beforeEach(() => {
    results = {
      attempts: 10,
      time: 15,
      level: 5,
      total: 1000,
      ranking: '<h1>Ranking</h1>'
    }
  })

  test('finishGame function', () => {
    expect(typeof finishGame).toBe('function')
  })
  test('finishGame to be defined', () => {
    expect(finishGame).toBeDefined()
  })
  test('finishGame should return a string', () => {
    const a = finishGame(results)
    expect(typeof a).toBe('string')
  })
  test('getUser should match snapshot', () => {
    const a = finishGame(results)
    expect(a).toMatchSnapshot()
  })
})

describe('getUser template', () => {
  test('getUser function', () => {
    expect(typeof getUser).toBe('function')
  })
  test('getUser to be defined', () => {
    expect(getUser).toBeDefined()
  })
  test('getUser should return a string', () => {
    const a = getUser()
    expect(typeof a).toBe('string')
  })
  test('getUser should match snapshot', () => {
    const a = getUser()
    expect(a).toMatchSnapshot()
  })
})

describe('getLocation template', () => {
  test('getLocation function', () => {
    expect(typeof getLocation).toBe('function')
  })
  test('getLocation to be defined', () => {
    expect(getLocation).toBeDefined()
  })
  test('getLocation should return a string', () => {
    const a = getLocation()
    expect(typeof a).toBe('string')
  })
  test('getLocation should match snapshot', () => {
    const a = getLocation()
    expect(a).toMatchSnapshot()
  })
})

describe('getGameLevel template', () => {
  test('getGameLevel function', () => {
    expect(typeof getGameLevel).toBe('function')
  })
  test('getGameLevel to be defined', () => {
    expect(getGameLevel).toBeDefined()
  })
  test('getGameLevel should return a string', () => {
    const a = getGameLevel('Pepe', 'Soria')
    expect(typeof a).toBe('string')
  })
  test('getGameLevel should match snapshot', () => {
    const a = getGameLevel('Pepe', 'Soria')
    expect(a).toMatchSnapshot()
  })
  test('getGameLevel without city should match snapshot', () => {
    const a = getGameLevel('Pepe')
    expect(a).toMatchSnapshot()
  })
})

describe('getRankingTable template', () => {
  let list
  let levels
  beforeEach(() => {
    list = [
      {
        userLocation: {
          geocode: {
            address: {
              city: 'Soria'
            }
          }
        },
        level: 5,
        attempts: 10,
        time: 55,
        total: 100
      }
    ]

    levels = {
      2: 'easiest',
      3: 'easy',
      4: 'medium',
      5: 'hard',
      6: 'hardest'
    }
  })

  test('getRankingTable function', () => {
    expect(typeof getRankingTable).toBe('function')
  })
  test('getRankingTable to be defined', () => {
    expect(getRankingTable).toBeDefined()
  })
  test('getRankingTable should return a string', () => {
    const a = getRankingTable(list, levels)
    expect(typeof a).toBe('string')
  })
  test('getRankingTable should match snapshot', () => {
    const a = getRankingTable(list, levels)
    expect(a).toMatchSnapshot()
  })
  test('getRankingTable should have top-five css class', () => {
    const a = getRankingTable(list, levels)
    const b = a.includes('top-five')
    expect(b).toBe(true)
  })

  test('getRankingTable should have last-five css class', () => {
    const a = getRankingTable(list, levels)
    const b = a.includes('last-five')
    expect(b).toBe(false)
  })
})
