import React from 'react'
import { render } from '@testing-library/react'
import Landing from './Landing'

describe('Landing component', () => {
  it('renders without crashing', () => {
    render(
          <Landing />
    )
  })
})