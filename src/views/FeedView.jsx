import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components';

import { WebSocketContext } from '../config/contexts/WebSocketContext';

import './FeedView.scss';

export default () => {
    const { data, send } = useContext(WebSocketContext);
    const { push } = useHistory();

    useEffect(() => {
        if (data) {
            const {
                data: { chatId },
            } = data;
            chatId && push(`/chat/${chatId}`);
        }
    }, [data]);

    const handleJoinWaitingList = () => {
        send({ action: 'join-waiting-list' });
    };

    return (
        <section className="view feed">
            <div className="feed-posts">
                <Button
                    label="Start Chatting!"
                    onClick={handleJoinWaitingList}
                />
            </div>
        </section>
    );
};
