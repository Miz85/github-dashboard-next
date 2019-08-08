const fetch = require('node-fetch');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/graphql') {
      let rawData = '';
      req.on('data', chunk => {
        rawData += chunk;
      });
      req.on('end', () => {
        const parsedData = JSON.parse(rawData);

        return fetch('https://api.github.com/graphql', {
          method: 'POST',
          body: JSON.stringify(parsedData),
          headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`
          }
        })
          .then(response => response.json())
          .then(response => {
            res.end(JSON.stringify(response));
          })
          .catch(error => res.end(JSON.stringify(error)));
      });
    }

    /* if (pathname === '/github-login') {
      res.end(JSON.stringify({ clientID: process.env.GITHUB_CLIENT_ID }));
    }

    if (pathname === '/is-authenticated') {
      res.end(
        JSON.stringify({
          isAuthenticated: session.token !== undefined
        })
      );
    }
 */
    // if (pathname === '/auth/callback') {
    //   console.log('???????', query);
    //   if (query && query.code) {
    //     fetch(
    //       `https://github.com/login/oauth/access_token?client_id=${
    //         process.env.GITHUB_CLIENT_ID
    //       }&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${
    //         query.code
    //       }&redirect_uri=https://w6wzry23wk.sse.codesandbox.io/auth/callback`,
    //       {
    //         method: 'POST',
    //         // body: JSON.stringify(params),
    //         headers: {
    //           Accept: 'application/json'
    //         }
    //       }
    //     )
    //       .then(response => response.json())
    //       .then(response => {
    //         session.token = response.access_token;
    //         res.writeHead(302, {
    //           Location: '/'
    //         });
    //         res.end();
    //       })
    //       .catch(error => {
    //         res.end(JSON.stringify(error));
    //       });
    //   } else {
    //     res.end('500');
    //   }
    // }

    if (!['/graphql'].includes(pathname)) {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
