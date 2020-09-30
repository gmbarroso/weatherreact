import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('first App test', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Weather Channel/i)
    expect(linkElement).toBeInTheDocument()
  })
})
