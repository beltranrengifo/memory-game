import { brands } from '../js/utils/brands'

describe('Brands array', () => {
  test('brands to be defined', () => {
    expect(brands).toBeDefined()
  })

  test('brands is a string', () => {
    expect(typeof brands).toBe('object')
  })

  test('brands should match snapshot', () => {
    expect(brands).toMatchSnapshot()
  })
})
