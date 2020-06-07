import React, { useState, createContext } from 'react';

export const StatusContext = createContext();

// <StatusProvider> component
export default ({ children }) => {
    // status === NONE | LOADING | ERROR
    const [status, setStatus] = useState('LOADING');
    const [backdrop, setBackdrop] = useState(true);

    const providerValue = {
        loading: status === 'LOADING',
        error: status === 'ERROR',
        status,
        setStatus,
        backdrop,
        setBackdrop,
    };

    return (
        <StatusContext.Provider value={providerValue}>
            {children}
        </StatusContext.Provider>
    );
};
