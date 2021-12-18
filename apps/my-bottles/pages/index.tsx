import { useUser } from '@auth0/nextjs-auth0'

import { Header } from 'semantic-ui-react'
import SidePanel from '../features/sidePanel/SidePanel'
import BottleForm from '../features/bottles/BottleForm'
import AppHeader from '../components/AppHeader'
import BottleContainer from '../features/bottles/BottleContainer'

import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
  align-content: stretch;

  main {
    padding-top: 1em;
  }
`

const Index = () => {
  const { user } = useUser()

  return (
    <StyledContainer>
      <AppHeader />
      <SidePanel>
        <main>
          {!user ? (
            <Header as="h3" textAlign="center" className="loginHeader">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/login">Login here</a> to see your bottles.
            </Header>
          ) : (
            <BottleContainer />
          )}
        </main>
      </SidePanel>
      <BottleForm />
    </StyledContainer>
  )
}

export default Index
