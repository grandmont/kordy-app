import React, { useState, useContext, createContext } from 'react';
import api from '../../services/api';

import { StatusContext } from './StatusContext';

export const AuthContext = createContext();

export default ({ children }) => {
    const [logged, setLogged] = useState(false);

    const { setBackdrop } = useContext(StatusContext);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (values) => {
        setBackdrop(true);
        api.post('/auth', { ...values })
            .then(({ data }) => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setBackdrop(false));
    };

    const refreshToken = () =>
        api
            .get('/refreshToken')
            .then(({ data }) => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setBackdrop(false));

    const logout = () => {
        localStorage.removeItem('token');
    };

    const setData = ({ token, user }) => {
        localStorage.token = token;
        setLogged(true);
        setCurrentUser(user);
    };

    const providerValue = {
        logged,
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
