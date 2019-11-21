import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
};

const app = (
  <Provider store={store}>
    <Grommet theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Grommet>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
