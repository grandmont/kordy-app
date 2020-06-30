import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import Carousel from '../elements/Carousel';

import './PostModal.scss';
const comments = ['Opa', 'Eae doge kk', 'carai mlk comentario meomo'];

export default ({ data }) => {
    if (!data) return null;

    const {
        id: postId,
        user: { kordy, profile },
        content,
        images,
        createdAt,
        // comments,
        likes,
    } = data;

    const hasImages = !!images.length;

    return (
        <div className="post-modal-wrapper post-wrapper elevation">
            <div className="post-modal-images">
                {hasImages && (
                    <div className="post-images-wrapper">
                        <Carousel images={images} imageClassName="post-image" />
                    </div>
                )}
            </div>
            <div className="post-modal-info">
                <div className="info-header">
                    <div className="post-header">
                        <Avatar src={profile} />

                        <div className="post-info">
                            <p className="kordy">{kordy}</p>
                        </div>
                    </div>
                    <div className="post-content">
                        {content && <p className="content">{content}</p>}
                    </div>
                </div>
                <div className="info-comments">
                    {comments.map((comment) => (
                        <div className="content">{comment}</div>
                    ))}
                </div>
                <div className="info-stats"></div>
            </div>
        </div>
    );
};
