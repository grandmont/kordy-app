import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AuthProvider from './config/contexts/AuthContext';

// Layouts
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';

export default () => (
    <Router>
        <Switch>
            <AuthProvider>
                <Route exact path="/" component={Auth} />
                <Route path="/dashboard" component={Dashboard} />
            </AuthProvider>
        </Switch>
    </Router>
);
