import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CookieStorage } from '../../src'

interface CookieStoreTest {
  bool: boolean
  number: number
  string: string
  array: string[]
  setBool: (bool: boolean) => void
  setNumber: (number: number) => void
  setString: (string: string) => void
  setArray: (array: string[]) => void
}

const initialState: Omit<CookieStoreTest, 'setBool' | 'setNumber' | 'setString' | 'setArray'> = {
  bool: false,
  number: 0,
  string: '',
  array: []
}

const cookieStorage = new CookieStorage()

export const useCookieStore = create<CookieStoreTest>()(
  persist(
    (set) => ({
      ...initialState,
      setBool: (bool) => set({ bool }),
      setNumber: (number) => set({ number }),
      setString: (string) => set({ string }),
      setArray: (array) => set({ array })
    }),
    {
      name: 'cookie-store-component-test',
      storage: createJSONStorage(() => cookieStorage)
    }
  )
)
