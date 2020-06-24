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
                    autoComplete="email"
                    leftIcon={
                        <Icon path={mdiAccount} size={1} color="#303030" />
                    }
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
                    autoComplete="current-password"
                    leftIcon={<Icon path={mdiLock} size={1} color="#303030" />}
                />
            </Grid>
            <Grid className="grid-item" item xs={12}>
                <Button type="submit" label="Sign In" />
            </Grid>
        </form>
    </Grid>
);
