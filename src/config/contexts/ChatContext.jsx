import React, { useState, createContext, useContext, useEffect } from 'react';

import { WebSocketContext } from './WebSocketContext';

export const ChatContext = createContext();

export default ({ children }) => {
    const { data, send } = useContext(WebSocketContext);
    const [chatData, setChatData] = useState(null);

    useEffect(() => {
        if (data) {
            ['join-chat', 'left-chat', 'chat-message', 'disconnect'].includes(
                data.action,
            ) && setChatData(data);
        }
    }, [data]);

    const providerValue = {
        joinChat: (data) =>
            send({
                action: 'join-chat',
                data,
            }),
        leftChat: (data) =>
            send({
                action: 'left-chat',
                data,
            }),
        sendChatMessage: (data) => {
            console.log(data);
            send({
                action: 'chat-message',
                data,
            });
        },
        disconnect: (data) =>
            send({
                action: 'disconnect',
                data,
            }),
        data: chatData,
    };

    return (
        <ChatContext.Provider value={providerValue}>
            {children}
        </ChatContext.Provider>
    );
};
