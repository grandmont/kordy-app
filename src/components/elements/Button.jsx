import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

export default ({ label, onClick }) => (
    <ButtonBase
        type="submit"
        className="button elevation"
        onClick={onClick}
        focusRipple
    >
        {label}
    </ButtonBase>
);
