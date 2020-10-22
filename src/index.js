import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/app/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'
import './styles/stylesheet.scss'

const store = configureStore()
ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
