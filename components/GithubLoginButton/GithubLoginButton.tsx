import * as React from 'react';
import { Button } from 'components/Button/Button';

const redirectToGithubLogin = () => {
  const origin = window.location.origin;

  fetch(`${origin}/github-login`)
    .then(encodedResponse => encodedResponse.json())
    .then(response => {
      window.location.href =
        `https://github.com/login/oauth/authorize?` +
        `client_id=${response.clientID}&` +
        `redirect_uri=${origin}/auth/callback&` +
        `scope=user,repo`;
    });
};

const githubButtonStyles = {
  backgroundColor: '#24292D',
  padding: '5px 10px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '2px',
  color: '#efefef'
};

export const GithubLoginButton: React.FunctionComponent = () => {
  return (
    <Button
      className="github-login-button"
      style={githubButtonStyles}
      onClick={redirectToGithubLogin}
    >
      Login with github
    </Button>
  );
};
