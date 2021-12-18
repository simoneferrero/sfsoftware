import { useUser } from '@auth0/nextjs-auth0';

import { Header } from 'semantic-ui-react';
import SidePanel from '../features/sidePanel/SidePanel';
import BottleForm from '../features/bottles/BottleForm';
import AppHeader from '../components/AppHeader';
import BottleContainer from '../features/bottles/BottleContainer';

const Index = () => {
  const { user } = useUser();

  return (
    <div>
      <AppHeader />
      <SidePanel>
        <main>
          {!user ? (
            <Header as="h3" textAlign="center">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/login">Login here</a> to see your bottles.
            </Header>
          ) : (
            <BottleContainer />
          )}
        </main>
      </SidePanel>
      <BottleForm />
    </div>
  );
};

export default Index;
