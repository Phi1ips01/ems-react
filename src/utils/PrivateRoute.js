import React from 'react';
import { Route,Navigate } from 'react-router-dom';

import { ROUTES } from '../Routes.constants';
import { CommonUtils } from './commonUtils';

export default function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => CommonUtils.isLoggedIn()
                ? <Component {...props} />
                : <Navigate to="/login" replace />}
        />
    );
}