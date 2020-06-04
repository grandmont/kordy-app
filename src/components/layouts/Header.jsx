import React from 'react';
import Container from '@material-ui/core/Container';

import { Logo } from '../';

export default () => (
    <header className="header elevation">
        <Container>
            <Logo color="#ffffff" />
        </Container>
    </header>
);
