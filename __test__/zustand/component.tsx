'use client'

import { useCookieStore } from './cookie-store'

export const TestComponent = () => {
  const { bool, number, string, array, setBool, setNumber, setString, setArray } = useCookieStore()

  return (
    <div>
      <h2>Cookie Store</h2>
      <ul>
        <li data-testid="bool">{JSON.stringify(bool)}</li>
        <li data-testid="number">{number}</li>
        <li data-testid="string">{string}</li>
        <li data-testid="array">{array.join(', ')}</li>
      </ul>
      <button onClick={() => setBool(!bool)} type="button">
        Toggle Bool
      </button>
      <button onClick={() => setNumber(number + 1)} type="button">
        Increment Number
      </button>
      <button onClick={() => setString(string + 'a')} type="button">
        Append String
      </button>
      <button onClick={() => setArray([...array, 'a'])} type="button">
        Append Array
      </button>
    </div>
  )
}
