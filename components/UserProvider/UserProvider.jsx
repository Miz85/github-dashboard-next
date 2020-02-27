import * as React from 'react';
import auth0 from 'lib/auth0';

export const UserContext = React.createContext(undefined);

const UserProvider = ({ children }) => {
    console.log('>>>>>>> UserProvider renders')
    return (
        <UserContext.Provider value={undefined}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.getInitialProps = async (ctx) => {
    if (ctx && ctx.req) {
        const { user } = await auth0.getSession(ctx.req);
        console.log('>>>> UserProvider', user)
    }
}

export { UserProvider }