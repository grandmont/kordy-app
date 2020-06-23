import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import './ProfileTooltip.scss';

export default ({ children, data: { kordy } }) => (
    <Tooltip
        enterDelay={500}
        title={
            <div className="profile-tooltip">
                <p className="kordy">{kordy}</p>
            </div>
        }
        interactive
    >
        {children}
    </Tooltip>
);
