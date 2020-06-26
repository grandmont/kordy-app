import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '../';

import { AuthContext } from '../../config/contexts/AuthContext';

import './CreatePost.scss';

export default () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="create-post-wrapper post-wrapper elevation">
            <div className="post-header">
                <Avatar src={currentUser?.profile} />

                <p className="kordy">{currentUser?.kordy}</p>
            </div>

            <div className="post-body"></div>

            <div className="post-footer">
                <Button label="Create post" />
            </div>
        </div>
    );
};
