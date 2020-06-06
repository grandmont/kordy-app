import React from 'react';
import Routes from './routes';

import AuthProvider from './config/contexts/AuthContext';

export default () => (
    <AuthProvider>
        <Routes />
    </AuthProvider>
);
