import React, { useState, createContext } from 'react';
import api from '../../services/api';

export const AuthContext = createContext();

export default ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('currentUser')),
    );

    const login = (values) =>
        new Promise((resolve, reject) => {
            api.post('/auth', { ...values })
                .then(({ data: { token, user } }) => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    setCurrentUser(user);
                    return resolve(token);
                })
                .catch((error) => reject(error));
        });

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    const providerValue = {
        login,
        logout,
        currentUser,
    };

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};
