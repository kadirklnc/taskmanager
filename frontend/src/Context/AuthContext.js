import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || '',
        roles: JSON.parse(localStorage.getItem('roles')) || [],
    });

    useEffect(() => {
        if (authState.token) {
            localStorage.setItem('token', authState.token);
            localStorage.setItem('username', authState.username);
            localStorage.setItem('roles', JSON.stringify(authState.roles));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('roles');
        }
    }, [authState]);

    const login = (token, username, roles) => {
        setAuthState({ token, username, roles });
    };

    const logout = () => {
        setAuthState({ token: null, username: '', roles: [] });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
