import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import {reducer} from './reducer';

const Settings = {
  ZOOM: 12
};

const init = () => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  /* eslint-enable */
  ReactDOM.render(
      <Provider store={store}>
        <App
          mapSettings={
            {builder: leaflet, zoom: Settings.ZOOM, zoomControl: false, marker: true}
          }
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
