import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';

import { Button } from '../components';

import './FeedView.scss';

export default () => {
    const { chatData, setChatData, status, send } = useContext(ChatContext);

    useEffect(() => {
        console.log(chatData);

        // Leave any chat that may be open
        // This is due to react-router state persistence
        chatData &&
            send({
                action: 'left-chat',
                data: { room: chatData.room },
            });

        setChatData({});
    }, []);

    useEffect(() => {
        console.log(status);
    }, [status]);

    return (
        <section className="view feed">
            <div className="feed-posts">
                <Link to="/chat">
                    <Button label="Start Chatting!" />
                </Link>
            </div>
        </section>
    );
};
