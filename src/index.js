import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './styles/stylesheet.scss'
import LaunchesForm from './view/launches/launches-form';

ReactDOM.render(
  <React.StrictMode>
    <LaunchesForm />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
