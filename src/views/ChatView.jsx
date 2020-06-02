import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { WebSocketContext } from '../config/contexts/WebSocketContext';

export default () => {
    const { chatId } = useParams();

    const { data } = useContext(WebSocketContext);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <div>Chat {chatId}</div>;
};
