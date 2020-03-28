import * as React from 'react';
import auth0 from 'lib/auth0';

export const withAuth = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = async ctx => {
    if (ctx && ctx.req) {
      const session = await auth0.getSession(ctx.req);

      if (!session) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
      }

      return {
        isLoggedIn: session && session.user,
        user: session?.user
      };
    }
  };

  return wrapper;
};
