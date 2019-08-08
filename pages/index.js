import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withData from 'lib/apollo';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
class App extends React.Component {
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

        <div>
          <h2>Renaud</h2>
          <LatestPrs user="evilduckling" />

          <h2>Lancelot</h2>
          <LatestPrs user="lancelotimb" />

          <h2>Julien</h2>
          <LatestPrs user="themouette" />

          <h2>Nicolas</h2>
          <LatestPrs user="nicolaschenet" />
        </div>
      </div>
    );
  }
}

export default withData(App);
