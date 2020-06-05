import React, { useState, createContext } from 'react';
import api from '../../services/api';

export const AuthContext = createContext();

export default ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.currentUser || null),
    );

    const login = (values) =>
        new Promise((resolve, reject) => {
            api.post('/auth', { ...values })
                .then(({ data: { token, user } }) => {
                    localStorage.token = token;
                    localStorage.currentUser = JSON.stringify(user);
                    setLogged(true);
                    setCurrentUser(user);
                    return resolve(token);
                })
                .catch((error) => reject(error))
                .finally(() => setLoading(false));
        });

    const refreshToken = () =>
        new Promise((resolve, reject) => {
            api.get('/refreshToken')
                .then(({ data: { token, user } }) => {
                    console.log(token);
                    console.log(user);
                    localStorage.token = token;
                    localStorage.currentUser = JSON.stringify(user);
                    setLogged(true);
                    setCurrentUser(user);
                    return resolve(token);
                })
                .catch((error) => reject(error))
                .finally(() => setLoading(false));
        });

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    const providerValue = {
        logged,
        loading,
        login,
        logout,
        refreshToken,
        currentUser,
    };

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};
