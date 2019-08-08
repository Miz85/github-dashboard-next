import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export class UserInfo extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          query {
            viewer {
              login
              name
              repositories(
                first: 10
                orderBy: { field: CREATED_AT, direction: DESC }
              ) {
                nodes {
                  name
                }
              }
            }
          }
        `}
      >
        {({
          loading,
          error,
          data
        }: {
          loading: boolean;
          error?: any;
          data?: any;
        }) => {
          return (
            <>
              {loading ? <p>Loading...</p> : null}
              {error ? <p>Error: {JSON.stringify(error)}</p> : null}
              {!loading && !error && data ? (
                <>
                  <h3>{data.viewer.name}'s repositories:</h3>
                  <ul>
                    {data.viewer.repositories.nodes.map((repo: any) => (
                      <li>{repo.name}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          );
        }}
      </Query>
    );
  }
}
