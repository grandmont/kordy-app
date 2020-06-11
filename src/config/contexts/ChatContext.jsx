import React, { useEffect, createContext, useState, useContext } from 'react';

import { WebSocketContext } from './WebSocketContext';

export const ChatContext = createContext();

export default ({ children }) => {
    const { send, data } = useContext(WebSocketContext);

    const [chatData, setChatData] = useState({});
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        console.log('chatData:', chatData);
    }, [chatData]);

    useEffect(() => {
        console.log('status:', status);
    }, [status]);

    const providerValue = {
        chatData,
        setChatData,
        status,
        setStatus,
        // create an abstraction over the WebSocketContext
        send,
        data,
    };

    return (
        <ChatContext.Provider value={providerValue}>
            {children}
        </ChatContext.Provider>
    );
};
