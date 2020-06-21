import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@mdi/react';
import {
    mdiHeart,
    mdiHeartOutline,
    mdiCommentOutline,
    mdiImageBrokenVariant,
} from '@mdi/js';

import ProfileToolTip from '../elements/ProfileTooltip';

import './Post.scss';

const { REACT_APP_AWS_S3_ENDPOINT, REACT_APP_AWS_BUCKET_NAME } = process.env;

export default ({ data }) => {
    const {
        user: { kordy, profile },
        content,
        images,
    } = data;

    const hasImages = !!images.length;

    return (
        <div className="post-wrapper elevation">
            <div className="post-header">
                <Avatar src={profile} />

                <ProfileToolTip data={{ kordy }}>
                    <p className="kordy">{kordy}</p>
                </ProfileToolTip>
            </div>
            <div className={`post-body ${hasImages && 'has-images'}`}>
                {content && <p>{content}</p>}

                {hasImages && (
                    <div className="post-images-wrapper">
                        <Carousel
                            showIndicators={images.length > 1}
                            showStatus={images.length > 1}
                            showThumbs={false}
                            showArrows={false}
                            emulateTouch
                            swipeScrollTolerance={10}
                            statusFormatter={(current, total) =>
                                `${current} / ${total}`
                            }
                        >
                            {images.map(({ key }) => (
                                <div className="post-image">
                                    <img
                                        src={`${REACT_APP_AWS_S3_ENDPOINT}${REACT_APP_AWS_BUCKET_NAME}/${key}`}
                                        alt={kordy}
                                    />
                                </div>
                            ))}
                        </Carousel>
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
