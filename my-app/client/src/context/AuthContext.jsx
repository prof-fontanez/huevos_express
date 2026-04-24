import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, username: null, isAdmin: false });

    const login = (data) => {
        setAuth({ token: data.token, username: data.username, isAdmin: data.is_admin });
    };

    const logout = () => {
        setAuth({ token: null, username: null, isAdmin: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
