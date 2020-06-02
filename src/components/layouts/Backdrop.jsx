import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ open }) => (
    <div className={`backdrop ${open && 'visible'}`} open={open}>
        <CircularProgress color="inherit" />
    </div>
);
