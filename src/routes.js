import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import AuthProvider, { AuthContext } from './config/contexts/AuthContext';

// Layouts
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';

const PrivateRoute = ({ component, ...options }) => {
    const { getToken } = useContext(AuthContext);

    const token = getToken();

    // Find some way to validate the token

    return token ? (
        <Route {...options} component={component} />
    ) : (
        <Redirect to="/" />
    );
};

export default () => (
    <Router>
        <Switch>
            <AuthProvider>
                <Route exact path="/" component={Auth} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </AuthProvider>
        </Switch>
    </Router>
);
