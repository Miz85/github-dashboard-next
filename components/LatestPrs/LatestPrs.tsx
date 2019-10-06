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
            width: '700px',
            border: '1px solid #555',
            borderCollapse: 'collapse'
          }}
        >
          <thead
            css={{
              '& th': {
                padding: '5px'
              },
              border: 'none'
            }}
          >
            <tr>
              <th>Title</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.search.nodes.map((pr: any) => (
              <tr
                key={pr.title}
                css={{ '& td': { padding: '5px', fontSize: '14px' } }}
              >
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
                <td
                  style={{
                    width: '200px',
                    border: '1px solid #555'
                  }}
                >
                  {`${formatDistanceToNow(parseISO(pr.createdAt))} ago`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
