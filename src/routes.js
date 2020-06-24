import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext } from './config/contexts/AuthContext';
import { StatusContext } from './config/contexts/StatusContext';

import { Backdrop } from './components';

// layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const NoRouteComponent = () => <div>404 - Not found.</div>;

export default () => {
    const { logged } = useContext(AuthContext);
    const { loading } = useContext(StatusContext);

    return (
        <Router>
            <Backdrop open={loading} />
            {!logged ? (
                <Switch>
                    <Route exact path="/" component={AuthLayout} />
                    <Route component={NoRouteComponent} />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" component={DashboardLayout} />
                </Switch>
            )}
        </Router>
    );
};
