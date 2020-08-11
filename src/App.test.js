import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
// import Card from '../src/components/CardComponent'

describe('App', () => {
  it('first App test', () => {
    const { getByText } = render(<App />)
    const linkElement = getByText(/Weather Channel/i)
    expect(linkElement).toBeInTheDocument()
  })

  // it('first Card test', () => {
  //   const { debug } = render(<Card />)
  //   debug()
  // })
})
