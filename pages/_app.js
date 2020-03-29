// import App from 'next/app';
import { ThemeProvider } from '@chakra-ui/core';
import { Navigation } from 'components/Navigation/Navigation';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT_URL = 'https://api.github.com/graphql';
const getTokenFromLocalStorage = () =>
  typeof window !== 'undefined'
    ? window.localStorage.getItem('ghtools_token')
    : '';
// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT_URL,
    fetch,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`
    }
  }),
  cache: new InMemoryCache(),
  fetch
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        {pageProps.isLoggedIn ? (
          <>
            <Navigation {...pageProps}></Navigation>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     return { ...appProps }
// }

export default MyApp;
