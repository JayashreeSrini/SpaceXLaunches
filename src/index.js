import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './styles/stylesheet.scss'
import Launches from './view/launches/launches';

ReactDOM.render(
  <React.StrictMode>
    <Launches />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
