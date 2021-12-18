import { AppProps } from 'next/app'

import { UserProvider } from '@auth0/nextjs-auth0'
import { Provider } from 'react-redux'
import { store } from '../app/store'

import Head from 'next/head'

import './styles.css'
import 'semantic-ui-css/semantic.min.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to My Bottles!</title>
      </Head>
      <main className="app">
        <UserProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </UserProvider>
      </main>
    </>
  )
}

export default CustomApp
