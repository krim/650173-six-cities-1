import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import history from './history';

import App from './components/app/app.jsx';
import reducer from './reducer';
import api from './api';
import {Operation} from './reducer/data/data';

const init = () => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
  );
  /* eslint-enable */

  store.dispatch(Operation.loadApartments());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App
            mapSettings={
              {builder: leaflet, zoomControl: false, marker: true}
            }
          />
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
