import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../config/contexts/AuthContext';

import { Button } from '..';

export default () => {
    const { currentUser } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log(currentUser);
    // }, [currentUser]);

    return (
        <div className="side-nav">
            <div className="user-section">
                <div className="profile-image elevation"></div>
                <h1 className="sub-title">{currentUser?.kordy}</h1>
            </div>
            <Link to="/chat">
                <Button label="Start Chatting!" />
            </Link>
        </div>
    );
};
