import React from 'react';

interface UserContextData {
    isLoggedIn: boolean;
}

export const UserContext = React.createContext<UserContextData | undefined>(undefined);
type CookieMap = { [key: string]: string }

export const UserProvider: React.FunctionComponent = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    if (typeof document !== 'undefined') {
        const cookies: string[] = document.cookie.split('; ');
        const cookieMap: CookieMap = cookies.reduce((acc: CookieMap, cookie: string): CookieMap => {
            const [key, value] = cookie.split('=');
            acc[key] = value;
            return acc;
        }, {});

        if (cookieMap.token && !isLoggedIn) {
            sessionStorage.setItem('token', cookieMap.token);
            setIsLoggedIn(true);
        }
    }

    const contextValue = React.useMemo(() => ({
        isLoggedIn
    }), [isLoggedIn]);

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}