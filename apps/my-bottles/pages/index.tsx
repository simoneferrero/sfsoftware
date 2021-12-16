import { useUser } from '@auth0/nextjs-auth0';

import { Header } from 'semantic-ui-react';
import SidePanel from '../features/sidePanel/SidePanel';
import AppHeader from '../components/AppHeader';
import BottleContainer from '../features/bottleContainer/BottleContainer';

import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
  align-content: stretch;
`;

const Index = () => {
  const { user } = useUser();

  return (
    <StyledPage>
      <SidePanel>
        <AppHeader />
        <main>
          {!user ? (
            <Header as="h3" textAlign="center">
              <a href="/api/auth/login">Login here</a> to see your bottles.
            </Header>
          ) : (
            <BottleContainer />
          )}
        </main>
      </SidePanel>
    </StyledPage>
  );
};

export default Index;
