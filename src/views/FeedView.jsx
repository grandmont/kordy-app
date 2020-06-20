import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { Button, Post } from '../components';

import './FeedView.scss';

export default () => {
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);

    const {
        actions: { reset },
    } = useContext(ChatContext);

    const getPosts = async () => {
        const { data } = await api.get('/getPosts', { headers: { offset } });
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setOffset(offset + 10);
    };

    useEffect(() => {
        getPosts();
        // Reset the chat data
        // This is due to react-router state persistence
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="view feed">
            <div className="feed-header">
                <Link to="/chat">
                    <Button label="Start Chatting!" />
                </Link>
            </div>
            <div className="feed-posts">
                {posts.map((data, i) => (
                    <Post key={i} data={data} />
                ))}
            </div>
        </section>
    );
};
