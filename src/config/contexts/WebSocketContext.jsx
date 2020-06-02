import React, { createContext } from 'react';

export const WebSocketContext = createContext();

export default ({ connection, children }) => {
    const { lastJsonMessage, sendJsonMessage } = connection;

    const providerValue = {
        data: lastJsonMessage,
        send: sendJsonMessage,
    };

    return (
        <WebSocketContext.Provider value={providerValue}>
            {children}
        </WebSocketContext.Provider>
    );
};
