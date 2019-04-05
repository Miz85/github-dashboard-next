// import Link from "next/link";
import * as React from 'react';
import { GithubLoginButton } from 'components/GithubLoginButton/GithubLoginButton';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withData from 'lib/apollo';

import fetch from 'node-fetch';

class UserInfo extends React.Component {
  render() {
    return typeof window !== 'undefined' ? (
      <Query
        query={gql`
          query {
            viewer {
              login
              name
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          return (
            <>
              {loading ? <p>Loading...</p> : null}
              {error ? <p>Error: {JSON.stringify(error)}</p> : null}
              {!loading && !error && data ? <p>{data.viewer.login}</p> : null}
            </>
          );
        }}
      </Query>
    ) : null;
  }
}

class App extends React.Component {
  state = {
    isAuthenticated: false,
    currentUser: null
  };
  componentDidMount() {
    fetch(`${window.location.origin}/is-authenticated`)
      .then(res => res.json())
      .then(response =>
        this.setState({
          isAuthenticated: response.isAuthenticated
        })
      )
      .catch(error => console.error(error));
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <>
        <h1>Github Dashboard</h1>
        <div>{!isAuthenticated && <GithubLoginButton />}</div>

        {isAuthenticated && <UserInfo />}
      </>
    );
  }
}

export default withData(App);
