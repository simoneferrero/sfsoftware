import { useUser } from '@auth0/nextjs-auth0';

import { Header, Segment } from 'semantic-ui-react';
import SidePanel from '../features/sidePanel/SideBar';
import AppHeader from '../components/AppHeader';

import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
  align-content: stretch;
`;

const Index = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);

  if (isLoading) console.log('loading...');
  if (error) return console.log(error.message);

  return (
    <StyledPage>
      <SidePanel>
        <AppHeader />
        <main>
          <Segment basic>
            <Header as="h3" textAlign="center">
              {user ? (
                'Add a bottle to see it here.'
              ) : (
                <>
                  <a href="/api/auth/login">Login here</a> to see your bottles.
                </>
              )}
            </Header>
          </Segment>
        </main>
      </SidePanel>
    </StyledPage>
  );
};

export default Index;
