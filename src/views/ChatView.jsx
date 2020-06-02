import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { WebSocketContext } from '../config/contexts/WebSocketContext';

export default () => {
    const { chatId } = useParams();

    const { data, send } = useContext(WebSocketContext);

    useEffect(() => {
        send({
            action: 'join-chat',
            data: {
                chatId,
            },
        });

        return () =>
            send({
                action: 'left-chat',
                data: {
                    chatId,
                },
            });
    }, [chatId]);

    useEffect(() => {
        data && console.log(data);
    }, [data]);

    return <div>Chat {chatId}</div>;
};
