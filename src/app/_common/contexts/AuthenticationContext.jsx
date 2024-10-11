import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthenticationContext = React.createContext({});

export const AuthenticationStatus = {
    INITIAL: "INITIAL",
    IS_FETCHING: "IS_FETCHING",
    NOT_AUTHENTICATED: "IS_NOT_AUTHENTICATED",
    IS_AUTHENTICATED: "IS_AUTHENTICATED",
    FAILURE: "FAILURE",
};

function AuthenticationProvider({ children }) {
    const [authenticationStatus, setAuthenticationStatus] = useState(AuthenticationStatus.INITIAL);

    const fetchIsAuthenticated = async () => {
        setAuthenticationStatus(AuthenticationStatus.IS_FETCHING);

        try {
            const response = await fetch(`/personbruker/api/isAuthenticated`, {
                credentials: "include",
                cache: "no-store",
            });

            if (response.status === 200) setAuthenticationStatus(AuthenticationStatus.IS_AUTHENTICATED);
            else if (response.status === 401) setAuthenticationStatus(AuthenticationStatus.NOT_AUTHENTICATED);
            else setAuthenticationStatus(AuthenticationStatus.FAILURE);
        } catch (error) {
            setAuthenticationStatus(AuthenticationStatus.FAILURE);
        }
    };

    useEffect(() => {
        fetchIsAuthenticated();
    }, []);

    return (
        // eslint-disable-next-line
        <AuthenticationContext.Provider value={{ authenticationStatus }}>{children}</AuthenticationContext.Provider>
    );
}

AuthenticationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AuthenticationProvider;
