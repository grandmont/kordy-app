import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline, mdiCommentOutline } from '@mdi/js';

import ProfileToolTip from '../elements/ProfileTooltip';

import './Post.scss';

export default ({ data }) => {
    const {
        REACT_APP_AWS_S3_ENDPOINT,
        REACT_APP_AWS_BUCKET_NAME,
    } = process.env;

    const {
        user: { kordy, profile },
        content,
        images,
    } = data;

    return (
        <div className="post-wrapper elevation">
            <div className="post-header">
                <Avatar src={profile} />

                <ProfileToolTip data={{ kordy }}>
                    <p className="kordy">{kordy}</p>
                </ProfileToolTip>
            </div>
            <div className="post-body">
                {content && <p>{content}</p>}

                {images &&
                    images.map(({ key }) => (
                        <img
                            src={`${REACT_APP_AWS_S3_ENDPOINT}${REACT_APP_AWS_BUCKET_NAME}/${key}`}
                            alt={kordy}
                        />
                    ))}
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
