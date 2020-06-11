import React, { useState, useEffect, useContext, useRef } from 'react';

import { ChatContext } from '../config/contexts/ChatContext';
import { AuthContext } from '../config/contexts/AuthContext';

import Chat from '../components/layouts/Chat';

import './ChatView.scss';

// <ChatView> component
export default () => {
    // States
    const [messages, setMessages] = useState([]);

    // Contexts
    const { chatData, setChatData, status, setStatus, send, data } = useContext(
        ChatContext,
    );
    const { currentUser } = useContext(AuthContext);

    // Refs
    const chatRef = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        send({
            action: 'join-waiting-list',
        });

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [send]);

    useEffect(() => {
        if (data) {
            console.log(data);
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
                setChatData(data.data);
                setStatus('on');
            }

            if (action === 'left-chat') {
                send({
                    action: 'left-chat',
                    data: { room: chatData?.room },
                });
                setStatus('off');
            }

            if (action === 'disconnect') {
                setStatus('disconnected');
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
                room: chatData.room,
                content,
            },
        });

    const handleEscape = ({ keyCode }) => {
        // console.log(keyCode);
    };

    return (
        <div className="view chat">
            <Chat
                data={chatData}
                messages={messages}
                onSubmit={handleSendMessage}
                // onLeave={handleLeave}
                status={status}
                ref={chatRef}
            />
        </div>
    );
};
