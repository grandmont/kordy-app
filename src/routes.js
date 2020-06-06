import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthContext } from './config/contexts/AuthContext';

import { Backdrop } from './components';

// layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const NoRoute = () => <div>404 - Not found.</div>;

export default () => {
    const { loading, logged, refreshToken } = useContext(AuthContext);

    useEffect(() => {
        refreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <Backdrop open={loading} />
            {!loading &&
                (!logged ? (
                    <Switch>
                        <Route exact path="/" component={AuthLayout} />
                        <Route component={NoRoute} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/" component={DashboardLayout} />
                    </Switch>
                ))}
        </Router>
    );
};
