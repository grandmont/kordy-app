import React from 'react';
import Grid from '@material-ui/core/Grid';

import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';

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
                    leftIcon={<Icon path={mdiAccount} color="#ffffff" />}
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
                    leftIcon={<Icon path={mdiLock} color="#ffffff" />}
                />
            </Grid>
            <Grid className="grid-item" item xs={12}>
                <Button type="submit" label="Sign In" />
            </Grid>
        </form>
    </Grid>
);
