import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { AuthForm, Logo } from '../components';

import { AuthContext } from '../config/contexts/AuthContext';

import './AuthLayout.scss';

export default () => {
    const [values, setValues] = useState({});
    const { login } = useContext(AuthContext);

    const handleChange = ({ target: { name, value } }) =>
        setValues((values) => ({ ...values, [name]: value }));

    const handleSubmit = async (event) => {
        event.preventDefault();

        await login(values);
    };

    return (
        <Container className="layout auth">
            <Grid
                container
                justify="center"
                alignItems="center"
                className="grid"
            >
                <Grid item xs={12}>
                    <Paper className="paper">
                        <Logo color="#303030" />
                        <AuthForm
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
