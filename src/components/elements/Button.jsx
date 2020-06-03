import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

export default ({ label, onClick, className, ...props }) => (
    <ButtonBase
        {...props}
        type="submit"
        className={`button elevation ${className}`}
        onClick={onClick}
        focusRipple
    >
        {label}
    </ButtonBase>
);
