import '@testing-library/jest-dom'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn(() => ({
    user: undefined,
  })),
}))
