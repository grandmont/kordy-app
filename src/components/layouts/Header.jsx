import React from 'react';
import Container from '@material-ui/core/Container';

import { Logo } from '../';
import HeaderMenu from './HeaderMenu';

export default () => (
    <header className="header elevation">
        <Container className="header-container">
            <Logo color="#ffffff" />
            <HeaderMenu />
        </Container>
    </header>
);
