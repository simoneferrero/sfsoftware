import { screen } from '@testing-library/react'
import render from '../../helpers/testHelpers'

import AppHeader from '.'

describe('AppHeader', () => {
  it('should render successfully', () => {
    render(<AppHeader />)

    const { getByRole } = screen
    expect(getByRole('banner')).toBeInTheDocument()
  })
})
