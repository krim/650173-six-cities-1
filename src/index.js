import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  ReactDOM.render(
      <App
        apartments={[
          {name: `Beautiful & luxurious apartment at great location`},
          {name: `Wood and stone place`},
          {name: `Canal View Prinsengracht`},
          {name: `Nice, cozy, warm big bed apartment`}
        ]}
      />,
      document.querySelector(`#root`)
  );
};

init();
