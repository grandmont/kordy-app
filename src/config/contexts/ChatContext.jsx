import React, { useEffect, createContext, useState, useContext } from 'react';

import { WebSocketContext } from './WebSocketContext';

export const ChatContext = createContext();

export default ({ children }) => {
    const { send, data: wsData } = useContext(WebSocketContext);

    // Intermediate WebSocket data
    const [data, setData] = useState(null);

    const [chat, setChat] = useState({});
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        setData(wsData);
    }, [wsData]);

    const providerValue = {
        chat,
        setChat,
        status,
        setStatus,
        actions: {
            joinWaitingList: () => {
                send({ action: 'join-waiting-list' });
            },

            leaveChat: () => {
                send({
                    action: 'left-chat',
                    data: {
                        room: chat.room,
                    },
                });
                setChat({});
            },

            joinChat: (room) =>
                send({
                    action: 'join-chat',
                    data: {
                        room,
                    },
                }),

            sendMessage: (content) =>
                send({
                    action: 'chat-message',
                    data: {
                        room: chat.room,
                        content,
                    },
                }),

            reset: () => {
                providerValue.actions.leaveChat();
                setStatus('loading');
                setData(null);
            },
        },
        data,
    };

    return (
        <ChatContext.Provider value={providerValue}>
            {children}
        </ChatContext.Provider>
    );
};
