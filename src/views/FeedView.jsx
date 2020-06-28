import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { Button } from '../components';
import { CreatePost, Post } from '../components/feed';
import { Modal } from '../components/layouts';

import './FeedView.scss';

export default () => {
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const [showCreatePost, setShowCreatePost] = useState(false);

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

    const handleCreatePost = async (postId) => {
        if (!postId) return;

        const { data } = await api.get(`/getPostById/${postId}`);

        setPosts((prevPosts) => [data, ...prevPosts]);

        setShowCreatePost(false);
    };

    return (
        <>
            <section className="view feed">
                <div className="feed-header">
                    <Link to="/chat">
                        <Button label="Start Chatting!" />
                    </Link>

                    <Button
                        label="Create a new post"
                        onClick={() => setShowCreatePost(true)}
                    />
                </div>
                <div className="feed-posts">
                    {!loading
                        ? posts.map((data, i) => <Post key={i} data={data} />)
                        : [...Array(3).keys()].map((i) => (
                              <Post key={i} skeleton />
                          ))}
                    <Post skeleton />
                </div>
            </section>

            <Modal
                className="create-post-modal"
                show={showCreatePost}
                onClose={() => setShowCreatePost(false)}
            >
                <CreatePost
                    onSuccess={handleCreatePost}
                    onClose={() => setShowCreatePost(false)}
                />
            </Modal>
        </>
    );
};
