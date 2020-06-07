import React from 'react';
import Routes from './routes';

import AuthProvider from './config/contexts/AuthContext';
import StatusProvider from './config/contexts/StatusContext';

export default () => (
    <StatusProvider>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </StatusProvider>
);
