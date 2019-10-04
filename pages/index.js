import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';

class Home extends React.Component {
  render() {
    return (
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
          {
            <Query
              query={gql`
                query {
                  viewer {
                    avatarUrl
                  }
                }
              `}
            >
              {({ data }) => {
                return data && data.viewer ? (
                  <img
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '100%'
                    }}
                    src={data.viewer.avatarUrl}
                    alt="avatar"
                  />
                ) : null;
              }}
            </Query>
          }
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
    );
  }
}

export default withApollo(Home);
