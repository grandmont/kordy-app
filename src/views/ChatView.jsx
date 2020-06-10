import React, { useState, useEffect, useContext, useRef } from 'react';

import { WebSocketContext } from '../config/contexts/WebSocketContext';
import { AuthContext } from '../config/contexts/AuthContext';

import Chat from '../components/layouts/Chat';

import './ChatView.scss';

// <ChatView> component
export default () => {
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    // Contexts
    const { data, send } = useContext(WebSocketContext);
    const { currentUser } = useContext(AuthContext);

    const chatDataRef = useRef(chat);
    const chatRef = useRef(null);

    useEffect(() => {
        chatDataRef.current = chat;
    }, [chat]);

    useEffect(() => {
        document.onkeydown = ({ keyCode }) => {
            if (keyCode === 27) {
                handleLeave();
            }
        };

        send({
            action: 'join-waiting-list',
        });

        return () => {
            document.onkeydown = null;
            // Leave the chat on unmount
            send({
                action: 'left-chat',
                data: { room: chatDataRef.current.room },
            });
        };
    }, [send]);

    useEffect(() => {
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

                // const {
                //     current: { scrollHeight, clientHeight },
                // } = chatRef;

                // chatRef.current.scrollTo({
                //     top: scrollHeight + clientHeight,
                //     left: 0,
                //     behavior: 'smooth',
                // });

                chatRef.current.querySelector('#dummy').scrollIntoView();
            }

            if (action === 'join-chat') {
                setChat(data.data);
                setLoading(false);
            }

            if (['left-chat', 'disconnect'].includes(action)) {
                console.log(`${data.data.user.kordy} left the chat.`);
            }
        }
    }, [data, currentUser]);

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

    // TODO: Show a confirmation when leaving
    const handleLeave = () => {
        console.log('Leaving...');
    };

    const handleScroll = () => {};

    return (
        <div className="view chat">
            <Chat
                data={chat}
                messages={messages}
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onSubmit={handleSendMessage}
                onLeave={handleLeave}
                onScroll={handleScroll}
                loading={loading}
                ref={chatRef}
            />
        </div>
    );
};
