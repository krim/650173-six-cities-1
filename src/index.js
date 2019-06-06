import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import App from './components/app/app.jsx';
import reducer from './reducer';
import {createAPI} from './api';
import {Operation} from './reducer/data/data';

const init = () => {
  const history = createBrowserHistory();
  const api = createAPI(history);

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
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
