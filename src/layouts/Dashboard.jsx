import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import useWebSocket from 'react-use-websocket';

import WebSocketProvider from '../config/contexts/WebSocketContext';

// Views
import ChatView from '../views/ChatView';

export default () => {
    const ws = useWebSocket(
        `${process.env.REACT_APP_WSS}?token=${localStorage.token}`,
    );

    return (
        <WebSocketProvider connection={ws}>
            <div>
                <h1>Dashboard</h1>

                <Link to="/dashboard/chat/1">Chat 1</Link>
                <Link to="/dashboard/chat/2">Chat 2</Link>

                <Switch>
                    <Route
                        path="/dashboard/chat/:chatId"
                        component={ChatView}
                    />
                </Switch>
            </div>
        </WebSocketProvider>
    );
};
