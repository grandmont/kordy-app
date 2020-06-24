import React, { useState, createContext } from 'react';

export const StatusContext = createContext();

// <StatusProvider> component
export default ({ children }) => {
    const [status, setStatus] = useState('LOADING');

    const providerValue = {
        loading: status === 'LOADING',
        error: status === 'ERROR',
        status,
        setStatus,
    };

    return (
        <StatusContext.Provider value={providerValue}>
            {children}
        </StatusContext.Provider>
    );
};
