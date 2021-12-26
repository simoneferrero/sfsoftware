import '@testing-library/jest-dom'

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: () => ({
    user: undefined,
  }),
}))
