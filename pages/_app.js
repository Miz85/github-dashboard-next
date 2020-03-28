// import App from 'next/app';
import { ThemeProvider } from '@chakra-ui/core';
import { Navigation } from 'components/Navigation/Navigation';
import { PageLayout } from 'components/PageLayout/PageLayout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Navigation {...pageProps}></Navigation>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
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
