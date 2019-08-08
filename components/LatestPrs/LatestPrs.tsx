import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface ILatestPrs {
  user: string;
}
export const LatestPrs: React.FunctionComponent<ILatestPrs> = ({ user }) => {
  return (
    <Query
      query={gql`
        query search($query: String!) {
          search(query: $query, type: ISSUE, last: 10) {
            nodes {
              ... on PullRequest {
                title
                url
              }
            }
          }
        }
      `}
      variables={{
        query: `is:pr is:open author:${user}`
      }}
    >
      {({ loading, error, data }) => {
        if (error) {
          console.error(error);
          return <div />;
        }
        console.log(data);
        return (
          <div>
            {loading ? (
              'Loading....'
            ) : (
              <ul>
                {data.search.nodes.map((pr: any) => (
                  <li>
                    <a href={pr.url}>{pr.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    </Query>
  );
};
