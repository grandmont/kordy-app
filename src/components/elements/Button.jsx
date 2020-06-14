import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

export default ({
    label,
    onClick,
    style,
    color,
    textColor,
    className,
    elevation,
    circular = false,
    ...props
}) => (
    <ButtonBase
        {...props}
        className={`button ${elevation ? 'elevation' : ''} ${className} ${
            circular ? 'circular' : 'default'
        }`}
        onClick={onClick}
        focusRipple
    >
        {label}
    </ButtonBase>
);
