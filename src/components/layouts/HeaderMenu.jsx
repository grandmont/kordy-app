import React from 'react';

import { Button } from '../';

import MoreVert from '@material-ui/icons/MoreVert';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';

export default () => (
    <div className="header-menu">
        <Button
            className="option in-row"
            circular
            label={
                <ForumRoundedIcon style={{ fontSize: 20 }} fontSize="inherit" />
            }
        />
        <Button
            className="option"
            circular
            label={
                <NotificationsRoundedIcon
                    style={{ fontSize: 20 }}
                    fontSize="inherit"
                />
            }
        />
        <div className="divider" />
        <Button className="option" circular label={<MoreVert />} />
    </div>
);
