import { belt } from '../js/utils/belt'

describe('Belt logo', () => {
  test('belt to be defined', () => {
    expect(belt).toBeDefined()
  })

  test('belt is a string', () => {
    expect(typeof belt).toBe('string')
  })

  test('belt should match snapshot', () => {
    expect(belt).toMatchSnapshot()
  })
})
