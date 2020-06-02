import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

export default ({ leftIcon, rightIcon, ...props }) => (
    <Paper className="elevation input">
        {leftIcon && leftIcon}
        <InputBase {...props} className="input-base" fullWidth />
        {rightIcon && rightIcon}
    </Paper>
);
