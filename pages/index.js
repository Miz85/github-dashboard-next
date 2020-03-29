import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';
import { withAuth } from 'lib/withAuth';
import { Flex, Box, Heading, Text, Input, Button } from '@chakra-ui/core';

const getTokenFromLocalStorage = () =>
  typeof window !== 'undefined'
    ? window.localStorage.getItem('ghtools_token')
    : null;

const Home = ({ user }) => {
  const [ghToken, setGhToken] = React.useState(getTokenFromLocalStorage());
  const [tokenInputValue, setTokenInputValue] = React.useState('');

  return (
    <>
      <Heading as="h1" size="lg">
        Welcome to github tools {user.nickname}!
      </Heading>

      {!ghToken ? (
        <>
          <Text>To get you started, please enter your github token below</Text>
          <Box w="40%">
            <Flex alignItems="center">
              <Input
                value={tokenInputValue}
                onChange={event => setTokenInputValue(event.target.value)}
                placeholder="your token"
                borderColor="gray.300"
                mr="2"
              />
              <Button
                variantColor="purple"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem(
                      'ghtools_token',
                      tokenInputValue
                    );
                    setGhToken(tokenInputValue);
                  }
                }}
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </>
      ) : (
        <Box>
          <h3>Renaud</h3>
          <LatestPrs user="evilduckling" />

          <h3>Lancelot</h3>
          <LatestPrs user="lancelotimb" />

          <h3>Julien</h3>
          <LatestPrs user="themouette" />

          <h3>Nicolas</h3>
          <LatestPrs user="nicolaschenet" />
        </Box>
      )}
    </>
  );
};

export default withAuth(Home);
