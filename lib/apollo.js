import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

// can also be a function that accepts a `context` object (SSR only) and returns a config
const config = {
  link: new HttpLink({
    uri: `https://w6wzry23wk.sse.codesandbox.io/graphql`,
    credentials: 'same-origin',
    fetch
  })
};

export default withData(config);
