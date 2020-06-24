import React, { useState, useEffect, useContext, createContext } from 'react';
import api from '../../services/api';

import { StatusContext } from './StatusContext';

export const AuthContext = createContext();

export default ({ children }) => {
    const [logged, setLogged] = useState(false);

    const { setStatus } = useContext(StatusContext);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const refreshToken = () => {
            api.get('/refreshToken')
                .then(({ data }) => setData(data))
                .catch((error) => error)
                .finally(() => setStatus('DONE'));
        };

        refreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (values) => {
        setStatus('LOADING');
        api.post('/auth', { ...values })
            .then(({ data }) => setData(data))
            .catch((error) => error)
            .finally(() => setStatus('DONE'));
    };

    const resetData = () => {
        localStorage.removeItem('token');
        setLogged(false);
        setCurrentUser(null);
    };

    const setData = ({ token, user }) => {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        localStorage.token = token;
        setLogged(true);
        setCurrentUser({ ...user, token });
    };

    const providerValue = {
        logged,
        login,
        logout: resetData,
        currentUser,
    };

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};
