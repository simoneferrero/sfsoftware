import { useUser } from '@auth0/nextjs-auth0'
import { useAppDispatch } from '../../app/hooks/redux'

import { setVisibleForm } from '../../features/bottles/slice'

import { Button, Header, Icon } from 'semantic-ui-react'
import Popup from './Popup'

import styled from 'styled-components'

const StyledHeader = styled.header`
  position: fixed;
  height: 110px;
  top: 0;
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
  z-index: 900;
  background-color: #fff;
  display: grid;
  grid-template-columns: 60px auto 60px;
  grid-template-areas: 'addBtnContainer appTitle userBtnContainer';
  width: 100%;
  grid-gap: 1rem;
  box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);

  .addBtnContainer {
    grid-area: addBtnContainer;
  }

  .appTitle {
    grid-area: appTitle;
    margin: 0 auto !important;

    i {
      font-size: 0.8em !important;
    }
  }

  .userBtnContainer {
    grid-area: userBtnContainer;
    text-align: right;

    > * {
      text-align: right;
    }

    .userBtn {
      padding: 0 !important;
      border-radius: 100%;
      background-color: transparent;
      margin-right: 0 !important;

      :hover,
      :focus {
        background-color: transparent;
      }
    }
`

const AppHeader = () => {
  const dispatch = useAppDispatch()
  const { user } = useUser()

  return (
    <StyledHeader>
      <div className="addBtnContainer">
        {user && (
          <Button
            aria-label="Add Bottle"
            circular
            icon="add"
            size="medium"
            className="menu-button"
            onClick={() => dispatch(setVisibleForm(true))}
          />
        )}
      </div>
      <Header as="h1" icon textAlign="center" className="appTitle">
        <Icon name="glass martini" circular />
        MY BOTTLES
      </Header>
      {user && (
        <div className="userBtnContainer">
          <Popup user={user} />
        </div>
      )}
    </StyledHeader>
  )
}

export default AppHeader
