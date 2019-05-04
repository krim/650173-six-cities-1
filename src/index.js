import App from './components/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const init = () => {
  ReactDOM.render(
      <App
        appartments={[
          `Beautiful & luxurious apartment at great location`,
          `Wood and stone place`,
          `Canal View Prinsengracht`,
          `Nice, cozy, warm big bed apartment`
        ]}
      />,
      document.querySelector(`#root`)
  );
};

init();
