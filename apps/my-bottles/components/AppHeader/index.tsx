import { useUser } from '@auth0/nextjs-auth0';
import { useDispatch } from 'react-redux';
import { toggle } from '../../features/sidePanel/sidePanelSlice';

import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import styled from 'styled-components';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  padding: 0.5rem 1rem;
  display: flex;
  margin-bottom: 1rem;

  .menu-button {
    height: max-content;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  h1 {
    margin: 0 auto !important;

    i {
      font-size: 0.8em !important;
    }
  }
`;

const AppHeader = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  return (
    <StyledHeader>
      {user && (
        <Button
          circular
          icon="bars"
          size="large"
          className="menu-button"
          onClick={() => dispatch(toggle())}
        />
      )}
      <Header as="h1" icon textAlign="center">
        <Icon name="glass martini" circular />
        MY BOTTLES
      </Header>
    </StyledHeader>
  );
};

export default AppHeader;
