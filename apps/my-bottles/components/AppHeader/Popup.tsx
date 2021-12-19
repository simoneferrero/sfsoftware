import { UserProfile } from '@auth0/nextjs-auth0'

import { Button, Image, Popup } from 'semantic-ui-react'

import styled from 'styled-components'

interface Props {
  user: UserProfile
}

const StyledPopup = styled(Popup)`
  text-align: right;
`

const AppHeaderPopup = ({ user }: Props) => (
  <StyledPopup
    header={`Hello, ${user?.given_name || user.nickname}!`}
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    content={<a href="/api/auth/logout">Logout</a>}
    size="small"
    on="click"
    trigger={
      <Button
        className="userBtn"
        icon={
          <Image src={user.picture} avatar alt="User picture" size="mini" />
        }
      ></Button>
    }
  />
)

export default AppHeaderPopup
