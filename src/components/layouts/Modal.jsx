import React from 'react';
import Portal from '@material-ui/core/Portal';

export default ({ show, onClose, className, children }) => {
    const container = document.querySelector('#modal');

    const handleOutterClick = () => {
        onClose && onClose();
    };

    const handleInnerClick = (event) => {
        event.stopPropagation();
    };

    return (
        <Portal container={container}>
            <div
                onClick={handleOutterClick}
                className={`backdrop-container ${show ? 'open' : ''}`}
            >
                <div
                    onClick={handleInnerClick}
                    className={`modal animate-bottom${
                        className ? ` ${className}` : ''
                    }`}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
