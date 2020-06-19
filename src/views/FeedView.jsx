import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { Post } from '../components';

import { fakePosts } from '../utils/data';

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

    console.log(fakePosts);

    return (
        <section className="view feed">
            <div className="feed-posts">
                {fakePosts.map((data, i) => (
                    <Post key={i} data={data} />
                ))}
            </div>
        </section>
    );
};
