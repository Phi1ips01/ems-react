import React, { Component, Fragment } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import User from '../User/user'
import PrivateRoute from '../../utils/PrivateRoute';
import './travel.css'
import { ROUTES } from '../../Routes.constants';
import Admin from '../Admin/admin';
import landingPage from '../lnding';

class MainFrame extends Component {
  render() {
    console.log("mainframe")
    return (
      <Fragment>
        <div>
          <Routes>
            <Route path={ROUTES.USER} element={<User />} />
            <Route path={ROUTES.ADMIN} element={<Admin />} />
            <Route path={ROUTES.INDEX} element={<landingPage />} />
          </Routes>
        </div>
      </Fragment>
    );
  }
}

export default MainFrame;
