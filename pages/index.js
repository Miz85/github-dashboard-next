import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEWER_AVATAR } from 'lib/queries';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';
import { ThemeProvider } from '@chakra-ui/core';

const Home = () => {
  const { data } = useQuery(GET_VIEWER_AVATAR);
  return (
    <ThemeProvider>
      <div>
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
          {data && data.viewer ? (
            <img
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100%'
              }}
              src={data.viewer.avatarUrl}
              alt="avatar"
            />
          ) : null}
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
      </div>
    </ThemeProvider>
  );
};

export default withApollo(Home);
