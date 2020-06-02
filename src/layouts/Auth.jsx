import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import {
    Container,
    Grid,
    Paper,
    Snackbar,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { AuthForm, Logo, Backdrop } from '../components';

import './Auth.scss';

export default () => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { push } = useHistory();

    const handleChange = ({ target: { name, value } }) =>
        setValues((values) => ({ ...values, [name]: value }));

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        console.log(values);
        setTimeout(() => {
            api.post('/auth', { ...values })
                .then(({ data: { token } }) => {
                    token && localStorage.setItem('token', token);
                    push('/dashboard');
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }, 1000);
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

            <Backdrop open={loading} />

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                message="Invalid credentials"
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setError(null)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Container>
    );
};
