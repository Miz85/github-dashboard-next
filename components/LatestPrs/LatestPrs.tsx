import * as React from 'react';
import { Query, QueryResult, OperationVariables } from 'react-apollo';
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
                createdAt
              }
            }
          }
        }
      `}
      variables={{
        query: `is:pr is:open author:${user}`
      }}
    >
      {({ loading, error, data }: QueryResult<any, OperationVariables>) => {
        if (error) {
          console.error(error);
          return <div />;
        }
        return (
          <div>
            {loading ? (
              'Loading....'
            ) : (
              <table
                css={{
                  width: '700px',
                  border: '1px solid #555',
                  borderCollapse: 'collapse'
                }}
              >
                <thead
                  css={{
                    '& th': {
                      padding: '5px'
                    }
                  }}
                >
                  <tr>
                    <th>Title</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {data.search.nodes.map((pr: any) => (
                    <tr key={pr.title} css={{ '& td': { padding: '5px' } }}>
                      <td style={{ width: '500px', border: '1px solid' }}>
                        <a
                          href={pr.url}
                          css={{
                            textDecoration: 'none',
                            color: '#0086e6',
                            '&:hover': {
                              color: '#555'
                            }
                          }}
                        >
                          {pr.title}
                        </a>
                      </td>
                      <td style={{ width: '200px', border: '1px solid #555' }}>
                        {pr.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      }}
    </Query>
  );
};
