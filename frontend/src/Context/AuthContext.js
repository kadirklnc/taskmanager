// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        username: '',
        roles: [],
    });

    const login = (token, username, roles) => {
        setAuthState({ token, username, roles });
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(roles));
    };

    const logout = () => {
        setAuthState({ token: null, username: '', roles: [] });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
