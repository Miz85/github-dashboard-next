import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_VIEWER_AVATAR } from 'lib/queries';
import { LatestPrs } from 'components/LatestPrs/LatestPrs';
import { withApollo } from 'lib/withApollo';
import { withAuth } from 'lib/withAuth';
import { Flex, Box, Heading, Text, Input, Button } from '@chakra-ui/core';

const Home = ({ user }) => {
  const [ghToken, setGhToken] = React.useState(null);
  const [existingToken, setExistingToken] = React.useState(
    typeof window !== 'undefined'
      ? window.localStorage.getItem('ghtools_token')
      : undefined
  );

  return (
    <>
      <Heading as="h1" size="lg">
        Welcome to github tools {user.nickname}!
      </Heading>

      {!existingToken ? (
        <>
          <Text>To get you started, please enter your github token below</Text>
          <Box w="40%">
            <Flex alignItems="center">
              <Input
                value={ghToken}
                onChange={event => setGhToken(event.target.value)}
                placeholder="your token"
                borderColor="gray.300"
                mr="2"
              />
              <Button
                variantColor="purple"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.localStorage.setItem('ghtools_token', ghToken);
                    setExistingToken(ghToken);
                  }
                }}
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </>
      ) : null}
    </>
  );
  {
    /* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #dedede',
            padding: '0px 16px'
          }}
        >
          <p>Github Dashboard</p>
          {data && data.viewer ? (
            <img
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100%'
              }}
              src={data.viewer.avatarUrl}
              alt="avatar"
            />
          ) : null}
          {nickname ?
            <Menu>
              <MenuButton as={(props) => <div {...props} />} size="sm">
                <Avatar size="sm" name={nickname} src={picture}></Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem>Test</MenuItem>
              </MenuList>
            </Menu> :
            <Button variantColor="purple" onClick={onLogin}>Login</Button>}
        </div>

        <div css={{ padding: '0px 32px' }}>
          <h3>Renaud</h3>
          <LatestPrs user="evilduckling" />

          <h3>Lancelot</h3>
          <LatestPrs user="lancelotimb" />

          <h3>Julien</h3>
          <LatestPrs user="themouette" />

          <h3>Nicolas</h3>
          <LatestPrs user="nicolaschenet" />
        </div> */
  }
};

export default withAuth(Home);
