import React from 'react';
import Image from 'react-shimmer';
import Icon from '@mdi/react';
import { mdiImageBrokenVariant } from '@mdi/js';

export default ({ url }) => {
    return (
        url && (
            <Image
                src={url}
                fallback={<div className="image-wrapper shine" />}
                errorFallback={() => (
                    <div className="image-wrapper error">
                        <Icon
                            path={mdiImageBrokenVariant}
                            size={2}
                            color="#ffffff"
                        />
                    </div>
                )}
            />
        )
    );
};
