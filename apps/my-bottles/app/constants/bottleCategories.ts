import { BottleType, BottleCategory } from '../../types/Bottle';

export const WINE_TYPES: BottleType[] = [
  {
    text: 'Red',
    value: 'RED',
  },
  {
    text: 'White',
    value: 'WHITE',
  },
  {
    text: 'Rosé',
    value: 'ROSE',
  },
  {
    text: 'Sparkling',
    value: 'SPARKLING',
  },
  {
    text: 'Dessert',
    value: 'DESSERT',
  },
  {
    text: 'Other',
    value: 'OTHER',
  },
];

export const BEER_TYPES: BottleType[] = [
  {
    text: 'Lager',
    value: 'LAGER',
  },
  {
    text: 'Porter',
    value: 'PORTER',
  },
  {
    text: 'Stout',
    value: 'STOUT',
  },
  {
    text: 'Blonde Ale',
    value: 'BLONDE_ALE',
  },
  {
    text: 'Brown Ale',
    value: 'BROWN_ALE',
  },
  {
    text: 'Pale Ale',
    value: 'PALE_ALE',
  },
  {
    text: 'Sour Ale',
    value: 'SOUR_ALE',
  },
  {
    text: 'IPA',
    value: 'IPA',
  },
  {
    text: 'Wheat',
    value: 'WHEAT',
  },
  {
    text: 'Other',
    value: 'OTHER',
  },
];

export const BOTTLE_CATEGORIES: BottleCategory[] = [
  {
    text: 'Wine',
    value: 'WINE',
    showYear: true,
    types: WINE_TYPES,
  },
  {
    text: 'Beer',
    value: 'BEER',
    types: BEER_TYPES,
  },
  {
    text: 'Spirit',
    value: 'SPIRIT',
  },
];
