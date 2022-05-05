import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();

  if (fetching) {
    return <span>loading...</span>;
  }
  console.log('fetching', fetching);
  console.log('data', data);

  if (!data?.me) {
    return (
      <Flex bg="teal" p={4}>
        <Box ml="auto">
          <NextLink href="/login">
            <Link color="white" mr={2}>
              login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white">register</Link>
          </NextLink>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex bg="teal" p={4}>
      <Box mr="2" ml="auto" color="white">
        {data.me.username}
      </Box>
      <Button
        variant="link"
        color="white"
        isLoading={fetchingLogout}
        onClick={() => logout()}
      >
        logout
      </Button>
    </Flex>
  );
};

export default NavBar;
