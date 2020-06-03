import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="friends-nav">
            <h1>Friends</h1>

            <div>
                <Link to="/dashboard/chat/1">Chat 1</Link>
                <Link to="/dashboard/chat/1">Chat 2</Link>
            </div>
        </div>
    );
};
