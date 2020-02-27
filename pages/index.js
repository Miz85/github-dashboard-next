import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEWER_AVATAR } from 'lib/queries';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';
import { ThemeProvider, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/core';
import auth0 from 'lib/auth0';
import { UserProvider } from 'components/UserProvider/UserProvider';

const Home = ({ nickname, picture }) => {
  const { data } = useQuery(GET_VIEWER_AVATAR);
  const onLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/login';
    }
  }
  return (
    <ThemeProvider>
      <UserProvider>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #dedede',
            padding: '0px 16px'
          }}
        >
          <p>Github Dashboard</p>
          {/* {data && data.viewer ? (
            <img
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100%'
              }}
              src={data.viewer.avatarUrl}
              alt="avatar"
            />
          ) : null} */}
          {nickname ?
            <Menu>
              <MenuButton as={(props) => <div {...props} />} size="sm">
                <Avatar size="sm" name={nickname} src={picture}></Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem>Test</MenuItem>
              </MenuList>
            </Menu> :
            <Button variantColor="purple" onClick={onLogin}>Login</Button>}
        </div>

        <div css={{ padding: '0px 32px' }}>
          <h3>Renaud</h3>
          <LatestPrs user="evilduckling" />

          <h3>Lancelot</h3>
          <LatestPrs user="lancelotimb" />

          <h3>Julien</h3>
          <LatestPrs user="themouette" />

          <h3>Nicolas</h3>
          <LatestPrs user="nicolaschenet" />
        </div>
      </UserProvider>
    </ThemeProvider >
  );
};

Home.getInitialProps = async (ctx) => {
  if (ctx && ctx.req) {
    const session = await auth0.getSession(ctx.req);
    return {
      picture: session?.user?.picture,
      nickname: session?.user?.nickname
    }
  }
}

export default withApollo(Home);
