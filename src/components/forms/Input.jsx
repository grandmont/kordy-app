import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

export default ({ leftIcon, rightIcon, className, value, ...props }) => (
    <Paper className={`input ${className}`}>
        {leftIcon}
        <InputBase {...props} value={value} className="input-base" fullWidth />
        {rightIcon}
    </Paper>
);
