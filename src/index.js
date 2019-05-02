import App from './components/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const init = () => {
  ReactDOM.render(
      <App />,
      document.querySelector(`#root`)
  );
};

init();
