import React from 'react';
import Grid from '@material-ui/core/Grid';

import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';

import { Button } from '../';
import Input from './Input';

export default ({ onChange, onSubmit, onFocus, onBlur }) => (
    <Grid container justify="center" alignItems="center">
        <form
            className="form"
            onChange={onChange}
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
        >
            <Grid className="grid-item" item xs={12}>
                <Input
                    className="elevation"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    leftIcon={<Email />}
                />
            </Grid>
            <Grid className="grid-item" item xs={12}>
                <Input
                    className="elevation"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type="password"
                    name="password"
                    placeholder="Password"
                    leftIcon={<Lock />}
                />
            </Grid>
            <Grid className="grid-item" item xs={12}>
                <Button label="Sign In" />
            </Grid>
        </form>
    </Grid>
);
