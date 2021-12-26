import { EnhancedStore } from '@reduxjs/toolkit'
import { render as originalRender } from '@testing-library/react'
import { JSXElementConstructor, ReactElement } from 'react'

import { Provider } from 'react-redux'
import { store as originalStore } from '../app/store'

const render = (
  component: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  store?: EnhancedStore
) =>
  originalRender(
    <Provider store={store || originalStore}>{component}</Provider>
  )

export default render
