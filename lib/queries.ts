import gql from 'graphql-tag';

export const GET_LATEST_PRS = gql`
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
`;

export const GET_VIEWER_AVATAR = gql`
  query {
    viewer {
      avatarUrl
    }
  }
`;
