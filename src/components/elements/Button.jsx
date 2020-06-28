import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

export default ({
    label,
    onClick,
    style,
    className,
    elevation,
    circular = false,
    light = false,
    ...props
}) => (
    <ButtonBase
        {...props}
        className={`button ${elevation ? 'elevation' : ''} ${className} ${
            circular ? 'circular' : ''
        } ${light ? ' light' : ''}`}
        onClick={onClick}
        focusRipple
    >
        {label}
    </ButtonBase>
);
