import { Flex, Box, Button } from '@chakra-ui/core';

const Login = () => <Flex justifyContent="center" height="100vh" alignItems="center">
  <Box width="60%">
    <h1 css={{ textAlign: 'center' }}>Welcome to Github tools</h1>
    <Flex border="none" justifyContent="center" alignItems="baseline">
      <Button
        variantColor="purple"
        marginRight="2"
        onClick={() => (window.location.href = '/api/login')}
      >
        Sign in
      </Button>
      <Button variantColor="black" variant="link">
        Create an account
      </Button>
    </Flex>
  </Box>
</Flex>;

export default Login;
