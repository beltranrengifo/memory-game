import { init } from '@/js/main'
import { setBrowserInDom } from '@/js/utils/browsers'
import Game from '@/js/classes/Game'
import Setup from '@/js/classes/Setup'

describe('init function', () => {
  test('init should be defined', () => {
    expect(init).toBeDefined()
  })

  test('init should be a function', () => {
    expect(typeof init).toBe('function')
  })

  test('setBrowserInDom should be defined', () => {
    expect(setBrowserInDom).toBeDefined()
  })

  test('setBrowserInDom should be a function', () => {
    expect(typeof setBrowserInDom).toBe('function')
  })

  test('Setup should be defined', () => {
    expect(Setup).toBeDefined()
  })

  test('Setup should be a function', () => {
    expect(typeof Setup).toBe('function')
  })

  test('Game should be defined', () => {
    expect(Game).toBeDefined()
  })

  test('Game should be a function', () => {
    expect(typeof Game).toBe('function')
  })
})
