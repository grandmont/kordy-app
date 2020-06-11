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
    const { chat, setChat, status, setStatus, actions, data } = useContext(
        ChatContext,
    );

    const { joinWaitingList, leaveChat, sendMessage } = actions;

    const { currentUser } = useContext(AuthContext);

    // Refs
    const chatRef = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);

        joinWaitingList();

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

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

            if (action === 'left-chat') {
                leaveChat();
                setStatus('off');
            }

            if (action === 'disconnect') {
                leaveChat();
                setStatus('off');
            }
        }
    }, [data, currentUser]);

    // Scroll to bottom when a new message is received
    useEffect(() => {
        messages.length &&
            chatRef.current.querySelector('#dummy').scrollIntoView();
    }, [messages]);

    const handleEscape = ({ keyCode }) => {
        // console.log(keyCode);
    };

    return (
        <div className="view chat">
            <Chat
                data={chat}
                messages={messages}
                onSubmit={(message) => sendMessage(message)}
                // onLeave={handleLeave}
                status={status}
                ref={chatRef}
            />
        </div>
    );
};
