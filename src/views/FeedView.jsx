import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { Button } from '../components';
import { CreatePost, Post } from '../components/feed';

import './FeedView.scss';

export default () => {
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);

    const {
        actions: { reset },
    } = useContext(ChatContext);

    const getPosts = () => {
        api.get('/getPosts', { headers: { offset } })
            .then(({ data }) => {
                setPosts((prevPosts) => [...prevPosts, ...data]);
                setOffset(offset + 10);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        reset();
        getPosts();
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
                <CreatePost />
                {!loading
                    ? posts.map((data, i) => <Post key={i} data={data} />)
                    : [...Array(3).keys()].map((i) => (
                          <Post key={i} skeleton />
                      ))}
                <Post skeleton />
            </div>
        </section>
    );
};
