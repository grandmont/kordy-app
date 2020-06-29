import React, { useState, cloneElement } from 'react';

export default ({ anchor, items, onClick }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {anchor && cloneElement(anchor, { onClick: () => setOpen(!open) })}
            {open && (
                <div className="dropdown">
                    {items.map(
                        (
                            {
                                title,
                                description,
                                leftIcon = null,
                                rightIcon = null,
                            },
                            i,
                        ) => (
                            <div
                                key={i}
                                onClick={onClick}
                                className="dropdown-item"
                            >
                                {leftIcon}
                                {title && <p className="title">{title}</p>}
                                {description && (
                                    <p className="description">{title}</p>
                                )}
                                {rightIcon}
                            </div>
                        ),
                    )}
                </div>
            )}
        </>
    );
};
