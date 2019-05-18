import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';

import App from './components/app/app.jsx';
import apartments from './mocks/apartments';

const init = () => {
  ReactDOM.render(
      <App
        apartments={apartments}
        mapBuilder={leaflet}
      />,
      document.querySelector(`#root`)
  );
};

init();
