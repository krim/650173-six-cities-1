import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from './components/app/app.jsx';
import apartments from './mocks/apartments';
import {reducer} from "./reducer";

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
          apartments={apartments}
          mapSettings={
            {builder: leaflet, zoom: 12, coordinates: [52.38333, 4.9], zoomControl: false, marker: true}
          }
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
