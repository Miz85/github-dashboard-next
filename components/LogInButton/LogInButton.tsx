import React from 'react';
import { UserContext } from 'components/UserProvider';
import { Button } from '@chakra-ui/core';

export const LogInButton: React.FunctionComponent = () => {
    const user = React.useContext(UserContext);
    const login = async () => {
        if (typeof window !== undefined) {
            const { loginUrl } = await (await fetch('/api/login')).json();
            window.location.href = loginUrl;
        }
    }
    return user && user.isLoggedIn
        ? <span>Logged in</span>
        : <Button variantColor="purple" size="sm" onClick={login}>Log in</Button>

}