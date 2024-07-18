import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const authContextDefaultValues = {
    user: {
        role: null,
    },
    updateUserDetails: (data) => { },
};

const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    const updateUserDetails = ( data = {} ) =>
    {
        setUser(data);
    };
    const value = {
        user,
        updateUserDetails,
    };

    return (
        <React.Fragment>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </React.Fragment>
    );
}