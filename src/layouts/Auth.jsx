/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { AuthForm, Logo, Backdrop } from '../components';

import { AuthContext } from '../config/contexts/AuthContext';

import './Auth.scss';

export default () => {
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { push } = useHistory();

    const { login, logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, []);

    const handleChange = ({ target: { name, value } }) =>
        setValues((values) => ({ ...values, [name]: value }));

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true);

        login(values)
            .then(() => push('/dashboard'))
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
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
