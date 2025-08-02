// setup-vitest.ts
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.mock('zustand') // to make it work like Jest (auto-mocking)
