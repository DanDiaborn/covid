import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/redux';
import { BrowserRouter } from 'react-router-dom';

//test vranch
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);
