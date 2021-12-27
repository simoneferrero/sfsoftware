import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from '../../helpers/testHelpers'

import { useUser } from '@auth0/nextjs-auth0'
import * as actions from '../../features/bottles/slice'

import AppHeader from '.'

const useUserMock = useUser as unknown as jest.MockedFunction<
  () => {
    user: {
      given_name?: string
      nickname: string
      picture: string
    }
  }
>

const setVisibleFormMock = jest.spyOn(
  actions,
  'setVisibleForm'
) as unknown as jest.MockedFunction<() => void>

describe('Given <AppHeader />', () => {
  const user = {
    nickname: 'Spider-Man',
    picture: '/spider-man.jpg',
  }

  describe('When the user is NOT logged in', () => {
    it('should render successfully', () => {
      render(<AppHeader />)

      const { getByRole, getByText, queryByLabelText } = screen

      expect(getByRole('banner')).toBeInTheDocument()
      expect(getByText('MY BOTTLES')).toBeInTheDocument()
      expect(queryByLabelText('Add Bottle')).not.toBeInTheDocument()
      expect(queryByLabelText('User Menu')).not.toBeInTheDocument()
    })
  })

  describe('When a user is logged in', () => {
    describe('and the user has a given name', () => {
      it('should render successfully', async () => {
        useUserMock.mockImplementation(() => ({
          user: {
            ...user,
            given_name: 'Peter',
          },
        }))
        render(<AppHeader />)

        const {
          findByText,
          getByAltText,
          getByRole,
          getByText,
          getByLabelText,
        } = screen

        const addBottleBtn = getByLabelText('Add Bottle')
        const userMenuBtn = getByLabelText('User Menu')
        expect(getByRole('banner')).toBeInTheDocument()
        expect(getByText('MY BOTTLES')).toBeInTheDocument()
        expect(addBottleBtn).toBeInTheDocument()
        expect(userMenuBtn).toBeInTheDocument()

        userEvent.click(addBottleBtn)

        expect(setVisibleFormMock).toHaveBeenCalledWith(true)
        expect(getByAltText('User Image')).toHaveAttribute(
          'src',
          '/spider-man.jpg'
        )

        userEvent.click(userMenuBtn)

        expect(await findByText('Hello, Peter!')).toBeInTheDocument()
        expect(await findByText('Logout')).toHaveAttribute(
          'href',
          '/api/auth/logout'
        )
      })
    })

    describe('and the user does NOT have a given name', () => {
      it('should render successfully', async () => {
        useUserMock.mockImplementation(() => ({
          user,
        }))
        render(<AppHeader />)

        const { findByText, getByLabelText } = screen

        userEvent.click(getByLabelText('User Menu'))

        expect(await findByText('Hello, Spider-Man!')).toBeInTheDocument()
      })
    })
  })
})
