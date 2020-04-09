import { geolocationUrl } from '../js/utils/locationiq'

describe('Location fn', () => {
  test('geolocationUrl function', () => {
    expect(typeof geolocationUrl).toBe('function')
  })

  test('geolocationUrl to be defined', () => {
    expect(geolocationUrl).toBeDefined()
  })

  test('geolocationUrl to return a string', () => {
    const a = geolocationUrl()
    expect(typeof a).toBe('string')
  })

  test('geolocationUrl should match snapshot', () => {
    const a = geolocationUrl('123', '123')
    expect(a).toMatchSnapshot()
  })
})
