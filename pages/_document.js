import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Global, css } from '@emotion/core';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    let initialProps;
    try {
      initialProps = await Document.getInitialProps(ctx);
    } catch (error) {
      console.error(error);
    }
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway"
            rel="stylesheet"
          />
        </Head>
        <Global
          styles={css`
            * {
              font-family: Raleway, sans-serif;
            }
            button {
              border: none;
            }
          `}
        />
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
