import type { CookieAttributes } from 'js-cookie'
import Cookies from 'js-cookie'

/**
 * @description Mimics the State storage interface from zustand
 * @see https://github.com/pmndrs/zustand/blob/main/src/middleware/persist.ts#L7
 */
interface StateStorage {
  getItem: (name: string) => string | null | Promise<string | null>
  setItem: (name: string, value: string, attributes: CookieAttributes) => unknown | Promise<unknown>
  removeItem: (name: string) => unknown | Promise<unknown>
}

const cookie: StateStorage = {
  getItem: async (name: string) => {
    const value = Cookies.get(name)
    return value ?? null
  },
  removeItem: async (name: string) => {
    Cookies.remove(name)
  },
  setItem: async (name: string, value: string, attributes: CookieAttributes) => {
    Cookies.set(name, value, attributes)
  }
}

/**
 * Zustand plugin to persist state to cookies using the js-cookie library.
 *
 * This class implements the StateStorage interface from Zustand's persist middleware,
 * providing cookie-based state persistence with configurable attributes.
 */
export class CookieStorage implements StateStorage {
  attributes: CookieAttributes

  /**
   * Creates a new CookieStorage instance with optional custom cookie attributes.
   *
   * @param attributes - Optional custom cookie attributes to override defaults.
   *                    If not provided, secure defaults will be used.
   * @see https://github.com/js-cookie/js-cookie/tree/main?tab=readme-ov-file#cookie-attributes
   */
  constructor(attributes?: CookieAttributes) {
    this.attributes = attributes
      ? // Prevent httpOnly to be set by the user
        { ...(attributes ?? {}), httpOnly: false }
      : {
          expires: 30,
          httpOnly: false,
          path: '/',
          sameSite: 'strict',
          secure: true
        }
  }

  async getItem(name: string) {
    return cookie.getItem(name)
  }

  async setItem(name: string, value: string) {
    return cookie.setItem(name, value, this.attributes)
  }

  async removeItem(name: string) {
    cookie.removeItem(name)
  }
}
