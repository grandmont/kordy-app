import React, { useState, useEffect, useContext, useRef } from 'react';

import { WebSocketContext } from '../config/contexts/WebSocketContext';
import { AuthContext } from '../config/contexts/AuthContext';

import Chat from '../components/layouts/Chat';

import './ChatView.scss';

// <ChatView> component
export default () => {
    // type === loading | on | off
    const [status, setStatus] = useState('loading');
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);

    // Contexts
    const { data, send } = useContext(WebSocketContext);
    const { currentUser } = useContext(AuthContext);

    const chatStateRef = useRef(chat);
    const chatRef = useRef(null);

    useEffect(() => {
        chatStateRef.current = chat;
    }, [chat]);

    useEffect(() => {
        document.onkeydown = ({ keyCode }) => {
            console.log(keyCode);
        };

        send({
            action: 'join-waiting-list',
        });

        return () => {
            document.onkeydown = null;

            // Leave the chat on unmount
            send({
                action: 'left-chat',
                data: { room: chatStateRef.current.room },
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
            }

            if (action === 'join-chat') {
                setChat(data.data);
                setStatus('on');
            }

            if (['left-chat', 'disconnect'].includes(action)) {
                console.log(`${data.data.user.kordy} left the chat.`);
                setStatus('off');
                send({
                    action: 'left-chat',
                    data: { room: chatStateRef.current.room },
                });
            }
        }
    }, [data, currentUser]);

    // Scroll to bottom when a new message is received
    useEffect(() => {
        messages.length &&
            chatRef.current.querySelector('#dummy').scrollIntoView();
    }, [messages]);

    // Send a new message
    const handleSendMessage = (content) =>
        send({
            action: 'chat-message',
            data: {
                room: chat.room,
                content,
            },
        });

    return (
        <div className="view chat">
            <Chat
                data={chat}
                messages={messages}
                onSubmit={handleSendMessage}
                // onLeave={handleLeave}
                status={status}
                ref={chatRef}
            />
        </div>
    );
};
