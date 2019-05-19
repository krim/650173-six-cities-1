import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';

import App from './components/app/app.jsx';
import apartments from './mocks/apartments';

const init = () => {
  ReactDOM.render(
      <App
        apartments={apartments}
        mapSettings={
          {builder: leaflet, zoom: 12, center: [52.38333, 4.9], zoomControl: false, marker: true}
        }
      />,
      document.querySelector(`#root`)
  );
};

init();
