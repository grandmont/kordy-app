import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layouts
import Auth from './layouts/Auth';
import Dashboard from './layouts/Dashboard';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
);
