import * as React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';

const GRAPHQL_ENDPOINT_URL = '/api/graphql';
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT_URL, fetch });
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default App;
