import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import { TestComponent } from './component'

describe('Component using zustand cookie store', () => {
  test('should render with initial state', async () => {
    render(<TestComponent />)

    expect(await screen.findByTestId('bool')).toHaveTextContent('false')
    expect(await screen.findByTestId('number')).toHaveTextContent('0')
    expect(await screen.findByTestId('string')).toHaveTextContent('')
    expect(await screen.findByTestId('array')).toHaveTextContent('')
  })

  test('should toggle bool value by clicking the button', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)

    await user.click(await screen.findByRole('button', { name: /toggle bool/i }))

    expect(await screen.findByTestId('bool')).toHaveTextContent('true')
  })

  test('should increase number count by clicking the button', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)

    await user.click(await screen.findByRole('button', { name: /increment number/i }))

    expect(await screen.findByTestId('number')).toHaveTextContent('1')
  })

  test('should append string by clicking the button', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)

    await user.click(await screen.findByRole('button', { name: /append string/i }))

    expect(await screen.findByTestId('string')).toHaveTextContent('a')
  })

  test('should append array by clicking the button', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)

    await user.click(await screen.findByRole('button', { name: /append array/i }))
    await user.click(await screen.findByRole('button', { name: /append array/i }))

    expect(await screen.findByTestId('array')).toHaveTextContent('a, a')
  })
})
