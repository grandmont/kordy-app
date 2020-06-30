import React, { useState } from 'react';
import api from '../../services/api';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@mdi/react';
import {
    mdiHeart,
    mdiHeartOutline,
    mdiCommentOutline,
    mdiDotsVertical,
} from '@mdi/js';

import { formatDate } from '../../utils/formatters';
import Carousel from '../elements/Carousel';

import { PostModal } from './';
import { Button, Dropdown } from '../elements';
import { Modal } from '../layouts';

import './Post.scss';

const Post = ({ data }) => {
    const [postData, setPostData] = useState(null);
    const [showPost, setShowPost] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);

    const {
        id: postId,
        user: { kordy, profile },
        content,
        images,
        createdAt,
    } = data;

    const hasImages = !!images.length;

    const handleOpenPost = () => {
        if (showPost) return;

        setShowPost(true);

        api.get(`/getPostById/${postId}`)
            .then(({ data }) => {
                console.log(data);
                setPostData(data);
                setTimeout(() => {
                    setShowPostModal(true);
                }, 250);
            })
            .catch((error) => console.error(error));
    };

    const handleClosePostModal = () => {
        setShowPostModal(false);

        setTimeout(() => {
            setShowPost(false);
        }, 250);
    };

    return (
        <>
            <div className="post-wrapper elevation">
                <div className="post-header">
                    <Avatar className="profile" src={profile} />

                    <div className="post-info">
                        <p className="kordy">{kordy}</p>
                        <p className="post-time">{formatDate(createdAt)}</p>
                    </div>

                    <Dropdown
                        items={[]}
                        anchor={
                            <Button
                                className="option 2"
                                circular
                                light
                                label={
                                    <Icon
                                        path={mdiDotsVertical}
                                        size={1}
                                        color="#303030"
                                    />
                                }
                            />
                        }
                    />
                </div>
                <div onClick={handleOpenPost} className="post-body">
                    {content && <p className="content">{content}</p>}

                    {hasImages && (
                        <div className="post-images-wrapper">
                            <Carousel
                                images={images}
                                imageClassName="post-image"
                            />
                        </div>
                    )}
                </div>
                <div className="post-footer">
                    <div className="action">
                        <Icon
                            className="outline"
                            path={mdiHeartOutline}
                            size={1}
                            color="#303030"
                        />
                        <Icon
                            className="full"
                            path={mdiHeart}
                            size={1}
                            color="#303030"
                        />
                    </div>
                    <Icon
                        className="action"
                        path={mdiCommentOutline}
                        size={0.92}
                        color="#303030"
                    />
                </div>
            </div>

            {showPost && (
                <Modal
                    show={showPostModal}
                    className="post-modal"
                    onClose={handleClosePostModal}
                >
                    <PostModal data={postData} />
                </Modal>
            )}
        </>
    );
};

const PostSkeleton = ({ times }) =>
    [...Array(times).keys()].map((i) => (
        <div key={i} className="post-wrapper skeleton">
            <div className="post-header">
                <Avatar className="shine" />
                <div className="post-info">
                    <div className="line p shine" />
                    <div className="line p shine" />
                </div>
            </div>
            <div className="post-body shine" />
            <div className="post-footer shine" />
        </div>
    ));

export default ({ data, skeleton, times = 1 }) => {
    return !skeleton ? <Post data={data} /> : <PostSkeleton times={times} />;
};
