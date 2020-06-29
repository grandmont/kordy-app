import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@mdi/react';
import {
    mdiHeart,
    mdiHeartOutline,
    mdiCommentOutline,
    mdiDotsVertical,
    // mdiPencil,
} from '@mdi/js';

import { formatDate } from '../../utils/formatters';
import Carousel from '../elements/Carousel';

import { Button, Dropdown } from '../elements';

import './Post.scss';

// const postOptions = [
//     {
//         title: 'Edit',
//         description: 'Edit the post content.',
//         leftIcon: <Icon path={mdiPencil} size={1} color="#303030" />,
//     },
// ];

const Post = ({ data }) => {
    const {
        user: { kordy, profile },
        content,
        images,
        createdAt,
    } = data;

    const hasImages = !!images.length;

    return (
        <div className="post-wrapper elevation">
            <div className="post-header">
                <Avatar src={profile} />

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
            <div className="post-body">
                {content && <p className="content">{content}</p>}

                {hasImages && (
                    <div className="post-images-wrapper">
                        <Carousel images={images} imageClassName="post-image" />
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
    );
};

const PostSkeleton = () => (
    <div className="post-wrapper skeleton">
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
);

export default ({ data, skeleton }) => {
    return !skeleton ? <Post data={data} /> : <PostSkeleton />;
};
