import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';

import { Button } from '../components';

import './FeedView.scss';

export default () => {
    const {
        actions: { reset },
    } = useContext(ChatContext);

    useEffect(() => {
        // Reset the chat data
        // This is due to react-router state persistence
        reset();
    }, []);

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
