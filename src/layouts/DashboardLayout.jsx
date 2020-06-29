import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import useWebSocket from 'react-use-websocket';

import WebSocketProvider from '../config/contexts/WebSocketContext';
import ChatProvider from '../config/contexts/ChatContext';

import { Header, Friends } from '../components';
import Sidenav from '../components/layouts/Sidenav';

// Views
import ChatView from '../views/ChatView';
import FeedView from '../views/FeedView';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './DashboardLayout.scss';

export default () => {
    const ws = useWebSocket(
        `${process.env.REACT_APP_WSS}?token=${localStorage.token}`,
    );

    useEffect(() => {
        document.body.classList.add('overflow');

        return () => {
            document.body.classList.remove('overflow');
        };
    }, []);

    return (
        <WebSocketProvider connection={ws}>
            <ChatProvider>
                <div className="layout dashboard">
                    <Header />

                    <div className="dashboard-wrapper">
                        <Container className="nav-container">
                            <Sidenav />
                            <div className="view nonexistent" />
                            <Friends />
                        </Container>

                        <Container className="dashboard-container">
                            <div className="nav nonexistent" />
                            <Switch>
                                <Route exact path="/" component={FeedView} />
                                <Route
                                    exact
                                    path="/chat"
                                    component={ChatView}
                                />
                            </Switch>
                            <div className="nav nonexistent" />
                        </Container>
                    </div>
                </div>
            </ChatProvider>
        </WebSocketProvider>
    );
};
