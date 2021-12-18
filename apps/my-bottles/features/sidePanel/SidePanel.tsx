import { RootState } from '../../app/store';

import { useUser } from '@auth0/nextjs-auth0';
import { useSelector, useDispatch } from 'react-redux';
import { setVisible } from './sidePanelSlice';
import { setVisibleForm } from '../bottles/slice';

import { Header, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

interface Props {
  children: React.ReactNode;
}

const SidePanel = ({ children }: Props) => {
  const visible = useSelector((state: RootState) => state.sidePanel.visible);
  const dispatch = useDispatch();
  const { user } = useUser();

  const handleAddBottle = () => {
    dispatch(setVisible(false));
    dispatch(setVisibleForm(true));
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        compact
        icon
        onHide={() => dispatch(setVisible(false))}
        vertical
        visible={visible}
      >
        <Menu.Header as={Segment} compact basic>
          <span>
            <Image
              src={user?.picture}
              avatar
              alt={`${user?.given_name} avatar`}
            />
            Welcome back, {user?.given_name || user?.nickname}!
          </span>
        </Menu.Header>
        <Menu.Item name="add" onClick={handleAddBottle} position="left">
          <Header as="h5" icon="add" content="Add Bottle" />
        </Menu.Item>
        <Menu.Item link href="/api/auth/logout">
          <Header as="h5" icon="external" content="Logout" />
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={visible}>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SidePanel;
