import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <h1>Auth</h1>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
};
