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
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        <Route path={"*"} element={<MainFrame />} />
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
