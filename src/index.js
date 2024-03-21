import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import MainFrame from './routes/MainFrame';
import LoginPage from './routes/Login';
import { ROUTES } from './Routes.constants';
import { CommonUtils } from './utils/commonUtils';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        <Route path={ROUTES.INDEX} element={<MainFrame />} />
        <Route path="*" element={<Navigate to={ROUTES.INDEX} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
