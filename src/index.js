import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from './components/app/app.jsx';
import apartments from './mocks/apartments';
import {reducer} from "./reducer";

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          apartments={apartments}
          mapSettings={
            {builder: leaflet, zoom: 12, center: [52.38333, 4.9], zoomControl: false, marker: true}
          }
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
