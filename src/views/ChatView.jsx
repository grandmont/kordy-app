import React, { useState, useEffect, useContext, useRef } from 'react';

import { WebSocketContext } from '../config/contexts/WebSocketContext';
import { AuthContext } from '../config/contexts/AuthContext';

import Chat from '../components/layouts/Chat';

import './ChatView.scss';

export default () => {
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const { data, send } = useContext(WebSocketContext);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        send({
            action: 'join-waiting-list',
        });

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            chat && send({ action: 'left-chat', data: { room: chat.room } });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(data);

        if (data) {
            const { action } = data;

            if (action === 'chat-message') {
                const {
                    data: {
                        user: { id, kordy },
                        content,
                    },
                } = data;

                setMessages((messages) => [
                    ...messages,
                    {
                        user: {
                            id,
                            kordy,
                            isCurrentUser: id === currentUser.id,
                        },
                        content,
                    },
                ]);
            }

            if (action === 'join-chat') {
                setChat(data.data);
                setLoading(false);
            }

            if (['left-chat', 'disconnect'].includes(action)) {
                console.log(`${data.data.user.kordy} left the chat.`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleChangeMessage = ({ target: { value } }) => setMessage(value);

    const handleSendMessage = (event) => {
        event.preventDefault();
        message.length &&
            send({
                action: 'chat-message',
                data: {
                    room: chat.room,
                    content: message,
                },
            });

        setMessage('');
    };

    const handleEscape = (event) => {
        event.keyCode === 27 && handleLeave();
    };

    const handleLeave = () => {
        console.log('opa ta saindo eh?');
    };

    return (
        <div className="view chat">
            <Chat
                data={chat}
                messages={messages}
                value={message}
                onChange={handleChangeMessage}
                onSubmit={handleSendMessage}
                onLeave={handleLeave}
                loading={loading}
            />
        </div>
    );
};
