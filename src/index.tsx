import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './components/app/app';

import HistoryRouter from './components/history-route/history-route';
import { browserHistory } from './browser-history';
import { store } from './store/store';

import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
