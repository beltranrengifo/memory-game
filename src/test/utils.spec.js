import { capitalize, deKebabCase } from '@/js/utils/functions'

describe('capitalize', () => {
  test('capitalize should be a function', () => {
    expect(typeof capitalize).toBe('function')
  })

  test('capitalize should return empty string if no value', () => {
    const val = capitalize()
    expect(val).toBe('')
  })

  test('capitalize should capitalize', () => {
    const val = capitalize('pepe')
    expect(val).toBe('Pepe')
  })
})

describe('deKebabCase', () => {
  test('deKebabCase should be a function', () => {
    expect(typeof deKebabCase).toBe('function')
  })

  test('deKebabCase should return empty string if no value', () => {
    const val = deKebabCase()
    expect(val).toBe('')
  })

  test('deKebabCase should deKebabCase', () => {
    const val = deKebabCase('pepe-pepe')
    expect(val).toBe('pepe pepe')
  })
})
