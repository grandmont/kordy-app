import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import useWebSocket from 'react-use-websocket';

import WebSocketProvider from '../config/contexts/WebSocketContext';
import ChatProvider from '../config/contexts/ChatContext';

import { Header, Friends } from '../components';
import Menu from '../components/layouts/Menu';

// Views
import ChatView from '../views/ChatView';
import FeedView from '../views/FeedView';

import './Dashboard.scss';

export default () => {
    const ws = useWebSocket(
        `${process.env.REACT_APP_WSS}?token=${localStorage.token}`,
    );

    return (
        <WebSocketProvider connection={ws}>
            <div className="layout dashboard">
                <Header />

                <div className="dashboard-wrapper">
                    <Container className="dashboard-container">
                        <Menu />
                        <Switch>
                            <Route exact path="/" component={FeedView} />
                            <ChatProvider>
                                <Route
                                    exact
                                    path="/chat/:chatId"
                                    component={ChatView}
                                />
                            </ChatProvider>
                        </Switch>

                        <Friends />
                    </Container>
                </div>
            </div>
        </WebSocketProvider>
    );
};
