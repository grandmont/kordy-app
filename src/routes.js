import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AuthProvider, { AuthContext } from './config/contexts/AuthContext';

// Layouts
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';

const NoRoute = () => <div>404 - Oporra</div>;

const Routes = () => {
    const { loading, logged, refreshToken } = useContext(AuthContext);

    useEffect(() => {
        refreshToken();
    }, []);

    return loading ? (
        <div>Loading</div>
    ) : !logged ? (
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route component={NoRoute} />
        </Switch>
    ) : (
        <Switch>
            <Route path="/" component={Dashboard} />
        </Switch>
    );
};

export default () => (
    <Router>
        <Switch>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Switch>
    </Router>
);
