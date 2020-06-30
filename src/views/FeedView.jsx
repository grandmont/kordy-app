import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
} from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

import { ChatContext } from '../config/contexts/ChatContext';
import { Button } from '../components';
import { CreatePost, Post } from '../components/feed';
import { Modal } from '../components/layouts';

import './FeedView.scss';

const FETCH_LIMIT = 10;
const BOTTOM_PADDING = 50;

export default () => {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [overload, setOverload] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const feedRef = useRef(null);

    const {
        actions: { reset },
    } = useContext(ChatContext);

    const fetchPosts = () => {
        setLoading(true);
        api.get('/getPosts', { headers: { offset } })
            .then(({ data }) => {
                setOverload(data.length < FETCH_LIMIT || data.length === 0);
                setPosts((prevPosts) => [...prevPosts, ...data]);
                setOffset(offset + FETCH_LIMIT);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const handleScroll = useCallback(() => {
        if (overload || loading) {
            window.onscroll = null;
            return;
        }

        const { scrollY, innerHeight } = window;
        const {
            current: { scrollHeight },
        } = feedRef;

        scrollY + innerHeight + BOTTOM_PADDING > scrollHeight && fetchPosts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overload, loading]);

    useEffect(() => {
        window.onscroll = handleScroll;

        return () => {
            window.onscroll = null;
        };
    }, [handleScroll]);

    useEffect(() => {
        reset();
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreatePost = (postId) => {
        api.get(`/getPostById/${postId}`)
            .then(({ data }) => {
                setPosts((prevPosts) => [data, ...prevPosts]);
                setShowCreatePost(false);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <section ref={feedRef} className="view feed">
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
                    {!posts.length && <Post skeleton times={3} />}
                    {posts.map((data, i) => (
                        <Post key={i} data={data} />
                    ))}
                    {!overload ? <Post skeleton /> : <div></div>}
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
