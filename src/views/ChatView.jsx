import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { AuthContext } from '../config/contexts/AuthContext';

import Chat from '../components/layouts/Chat';

import './ChatView.scss';

export default () => {
    const { chatId } = useParams();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const { joinChat, leftChat, sendChatMessage, data } = useContext(
        ChatContext,
    );

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        joinChat({ chatId });

        return () => leftChat({ chatId });
    }, [chatId]);

    useEffect(() => {
        console.log(data);
        if (data && data.action === 'chat-message') {
            const {
                data: {
                    user: { id, kordy },
                    content,
                },
            } = data;

            setMessages((messages) => [
                ...messages,
                {
                    user: { kordy, isCurrentUser: id === currentUser.id },
                    content,
                },
            ]);
        }
    }, [data]);

    const handleChangeMessage = ({ target: { value } }) =>
        value.length && setMessage(value);

    const handleSendMessage = (event) => {
        event.preventDefault();
        sendChatMessage({ chatId, content: message });
        setMessage('');
    };

    return (
        <div className="view chat">
            <Chat
                messages={messages}
                value={message}
                onChange={handleChangeMessage}
                onSubmit={handleSendMessage}
            />
        </div>
    );
};
