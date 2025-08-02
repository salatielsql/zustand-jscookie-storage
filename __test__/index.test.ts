import Cookies from 'js-cookie'
import { vi } from 'vitest'
import { CookieStorage } from '../src/index'

describe('CookieStorage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should call js-cookie get when getItem is called', async () => {
    const jscookie = vi.spyOn(Cookies, 'get')
    const storage = new CookieStorage()

    await storage.getItem('test')
    expect(jscookie).toHaveBeenCalledWith('test')
  })

  it('should call js-cookie set when setItem is called', async () => {
    const jscookie = vi.spyOn(Cookies, 'set')
    const storage = new CookieStorage()

    await storage.setItem('test', 'test')
    expect(jscookie).toHaveBeenCalledWith('test', 'test')
  })

  it('should call js-cookie remove when removeItem is called', async () => {
    const jscookie = vi.spyOn(Cookies, 'remove')
    const storage = new CookieStorage()

    await storage.removeItem('test')
    expect(jscookie).toHaveBeenCalledWith('test')
  })
})
