import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import apartments from './mocks/apartments';

const init = () => {
  ReactDOM.render(
      <App
        apartments={apartments}
      />,
      document.querySelector(`#root`)
  );
};

init();
