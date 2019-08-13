import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT="/api/graphql";

// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
    fetch
  })
};

export default withData(config);
