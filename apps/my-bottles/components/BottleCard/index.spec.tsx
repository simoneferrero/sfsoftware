import userEvent from '@testing-library/user-event'
import { render, screen } from '../../utils/test-utils'

import * as actions from '../../features/bottles/slice'

import BottleCard from '.'

const setSelectedBottleMock = jest.spyOn(
  actions,
  'setSelectedBottle'
) as unknown as jest.MockedFunction<() => void>

describe('Given <BottleCard />', () => {
  const testCases = [
    {
      bottle: {
        _id: '61c8704eb610a03f9e6f5e0f',
        category: 'WINE',
        imageUrl: '/wineBottle.jpg',
        name: 'Barolo',
        quantity: 2,
        rating: 4,
        type: 'RED',
        volume: 13,
        user: 'testUser',
        year: 2018,
      },
      descriptionText: '2018 Red Wine',
    },
    {
      bottle: {
        _id: '61c8704eb610a03f9e6f5e0g',
        category: 'BEER',
        imageUrl: '/beerBottle.jpg',
        name: 'Heineken',
        quantity: 6,
        rating: 3,
        type: 'LAGER',
        volume: 4.5,
        user: 'testUser',
      },
      descriptionText: 'Lager Beer',
    },
    {
      bottle: {
        _id: '61c8704eb610a03f9e6f5e0h',
        category: 'SPIRIT',
        imageUrl: '/spiritBottle.jpg',
        name: 'Russian Standard Vodka',
        quantity: 1,
        rating: 5,
        volume: 40,
        user: 'testUser',
      },
      descriptionText: 'Spirit',
    },
  ]

  testCases.forEach(({ bottle, descriptionText }) => {
    it(`should render a ${bottle.category} correctly`, () => {
      render(<BottleCard {...bottle} />)

      const { getAllByRole, getByAltText, getByText, getByLabelText } = screen

      const rating = getAllByRole('radio')

      expect(rating.length).toEqual(5)
      expect(rating[bottle.rating - 1]).toHaveAttribute('aria-checked', 'true')

      const image = getByAltText(`${bottle.name} image`)

      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', bottle.imageUrl)

      expect(getByText(bottle.name)).toBeInTheDocument()
      expect(getByText(descriptionText)).toBeInTheDocument()
      expect(getByText(`${String(bottle.quantity)}x`)).toBeInTheDocument()
      expect(getByText(`${String(bottle.volume)}%`)).toBeInTheDocument()

      userEvent.click(getByLabelText(`Edit ${bottle.name}`))

      expect(setSelectedBottleMock).toHaveBeenCalledWith(bottle._id)
    })
  })

  describe('When the bottle has NO image', () => {
    it('should render the placeholder image correctly', () => {
      const bottle = {
        _id: '61c8704eb610a03f9e6f5e0z',
        category: 'SPIRIT',
        name: 'Russian Standard Vodka',
        quantity: 1,
        rating: 5,
        volume: 40,
        user: 'testUser',
      }
      render(<BottleCard {...bottle} />)

      expect(screen.getByAltText(`${bottle.name} image`)).toHaveAttribute(
        'src',
        '/placeholder.jpg'
      )
    })
  })
})
