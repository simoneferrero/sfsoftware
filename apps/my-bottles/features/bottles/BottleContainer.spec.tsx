import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import render from '../../helpers/testHelpers'

import BottleContainer from './BottleContainer'

const data = [
  {
    _id: '6148c1d3d8dca3b026473059',
    name: 'Langhe Nebbiolo',
    volume: 12,
    category: 'WINE',
    type: 'RED',
    quantity: 10,
    year: 2019,
    imageUrl:
      'https://my-bottles-dev.s3.eu-west-2.amazonaws.com/1632158162851_nebbiolo.jpeg',
    user: 'google-oauth2|117056464638104411978',
    rating: 5,
  },
  {
    _id: '6148c210d8dca3b02647305a',
    name: '8.6 Bionda',
    volume: 4,
    category: 'BEER',
    type: 'LAGER',
    quantity: 1,
    imageUrl:
      'https://my-bottles-dev.s3.eu-west-2.amazonaws.com/1632158502477_bionda.jpeg',
    user: 'google-oauth2|117056464638104411978',
    rating: 4,
    year: null,
  },
  {
    _id: '6149e32967c565035fdb5aa5',
    name: 'Russian Standard Vodka',
    volume: 40,
    category: 'SPIRIT',
    quantity: 2,
    imageUrl:
      'https://my-bottles-dev.s3.eu-west-2.amazonaws.com/1632232232866_russian_standard_original.jpg',
    user: 'google-oauth2|117056464638104411978',
    rating: 5,
  },
]

export const handlers = [
  rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.json({ success: true, data: [] }), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)

describe('Given <BottleContainer />', () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('When there are NO bottles', () => {
    it('should render correctly', async () => {
      const loadingText = 'Loading...'
      const noBottlesText = 'Add a bottle to see it here.'

      render(<BottleContainer />)

      const { findByText, getByText, queryByText } = screen

      expect(getByText(loadingText)).toBeInTheDocument()
      expect(queryByText(noBottlesText)).not.toBeInTheDocument()

      await waitForElementToBeRemoved(() => queryByText(loadingText))
      expect(await findByText(noBottlesText)).toBeInTheDocument()
    })
  })

  describe('When there are bottles', () => {
    beforeEach(() => {
      server.use(
        rest.get('/api/bottles', (req, res, ctx) => {
          return res(ctx.json({ success: true, data }), ctx.delay(150))
        })
      )
    })

    it('should render correctly', async () => {
      render(<BottleContainer />)

      const bottles = await screen.findAllByTestId('bottleCard')

      expect(bottles.length).toBe(data.length)

      expect(within(bottles[0]).getByText('8.6 Bionda')).toBeInTheDocument()
      expect(
        within(bottles[1]).getByText('Langhe Nebbiolo')
      ).toBeInTheDocument()
      expect(
        within(bottles[2]).getByText('Russian Standard Vodka')
      ).toBeInTheDocument()
    })
  })
})
