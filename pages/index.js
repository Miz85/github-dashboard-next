import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEWER_AVATAR } from 'lib/queries';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';
import { ThemeProvider } from '@chakra-ui/core';
import { UserProvider } from 'components/UserProvider';
import { LogInButton } from 'components/LogInButton/LoginButton';

const Home = () => {
  // const { data } = useQuery(GET_VIEWER_AVATAR);

  if (typeof document !== 'undefined') {

    console.log(sessionStorage.getItem('token'))
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
          <LogInButton></LogInButton>
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
        </div>

        {typeof document !== 'undefined' && sessionStorage.getItem('token') ? <div css={{ padding: '0px 32px' }}>
          <h3>Renaud</h3>
          <LatestPrs user="evilduckling" />

          <h3>Lancelot</h3>
          <LatestPrs user="lancelotimb" />

          <h3>Julien</h3>
          <LatestPrs user="themouette" />

          <h3>Nicolas</h3>
          <LatestPrs user="nicolaschenet" />
        </div> : null}
      </UserProvider>
    </ThemeProvider>
  );
};

export default withApollo(Home);
