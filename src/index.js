import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import styles from './index.css';
import 'modern-normalize/modern-normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <App className={styles.App} />
  </React.StrictMode>,
  document.getElementById('root'),
);
