import * as React from 'react';
import { Box, Avatar, Flex, Heading, Button } from '@chakra-ui/core';

export const Navigation = ({ user }) => {
  return (
    <Box
      css={{ position: 'sticky', top: 0 }}
      bg="white"
      px={4}
      py={1}
      border="1px"
      borderColor="gray.200"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md">Github Tools</Heading>
        <div css={{ display: 'inline', cursor: 'pointer' }}>
          <Avatar size="md" name={user.nickname} src={user.picture}></Avatar>
        </div>
      </Flex>
    </Box>
  );
};
