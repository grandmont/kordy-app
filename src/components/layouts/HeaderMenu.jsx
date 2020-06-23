import React from 'react';

import { Button } from '../';

import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';

export default () => (
    <div className="header-menu">
        <Button
            className="option"
            circular
            label={<Icon path={mdiDotsVertical} size={1} color="#ffffff" />}
        />
    </div>
);
