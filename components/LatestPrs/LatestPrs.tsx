import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_LATEST_PRS } from 'lib/queries';
import { formatDistanceToNow, parseISO } from 'date-fns';
interface ILatestPrs {
  user: string;
}

export const LatestPrs: React.FunctionComponent<ILatestPrs> = ({ user }) => {
  const { data, loading, error } = useQuery(GET_LATEST_PRS, {
    variables: {
      query: `is:pr is:open author:${user}`
    }
  });

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
              width: '100%',
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
                <th>My Review</th>
                <th>Other Reviews</th>
              </tr>
            </thead>
            <tbody>
              {data.search.nodes.length > 0 ? (
                data.search.nodes.map((pr: any) => {
                  const viewerReview = pr.reviews.nodes.find(
                    (review: any) => review.viewerDidAuthor
                  );
                  return (
                    <tr
                      key={pr.title}
                      css={{
                        '& td': {
                          padding: '5px',
                          fontSize: '14px',
                          border: '1px solid #555'
                        }
                      }}
                    >
                      <td>
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
                      <td
                        style={{
                          width: '200px'
                        }}
                      >
                        {`${formatDistanceToNow(parseISO(pr.createdAt))} ago`}
                      </td>
                      <td>
                        <span>
                          {viewerReview !== undefined
                            ? viewerReview.state
                            : 'Not reviewed yet'}
                        </span>
                      </td>
                      <td>
                        {pr.reviewRequests.nodes.map((reviewRequest: any) => (
                          <div
                            key={reviewRequest.requestedReviewer.name}
                            css={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              css={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '100%'
                              }}
                              src={reviewRequest.requestedReviewer.avatarUrl}
                              alt="reviewer avatar"
                            />
                            <span css={{ whiteSpace: 'nowrap' }}>
                              {reviewRequest.requestedReviewer.name}
                            </span>
                          </div>
                        ))}
                      </td>
                    </tr>
                  );
                })
              ) : (
                  <tr>
                    <td
                      colSpan={5}
                      css={{
                        width: '100%',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: '#999'
                      }}
                    >
                      No open Pull Requests
                </td>
                  </tr>
                )}
            </tbody>
          </table>
        )}
    </div>
  );
};
