import React from 'react';

import './Post.scss';

export default ({ data }) => {
    const {
        user: { kordy },
        content,
    } = data;

    return (
        <div className="post-wrapper elevation">
            <div className="post-header">{kordy}</div>
            <div className="post-body">{content}</div>
            <div className="post-footer">
                <div>ACTIONS</div>
            </div>
        </div>
    );
};
