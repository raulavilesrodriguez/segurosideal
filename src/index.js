import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

import './index.css';
import App from './App';
import rootReducer from './slices'

const store = configureStore({reducer:rootReducer})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


