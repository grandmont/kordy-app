import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../components';

import './FeedView.scss';

export default () => {
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
