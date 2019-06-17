import React from 'react';
import {Link} from 'react-router-dom';

const errorDivStyle = {
  color: `#FF0000`,
  textAlign: `center`,
  marginTop: `10em`,
  fontSize: `2em`
};

const errorLinkStyle = {
  textDecoration: `underline`,
  color: `#000000`
};

const ErrorPage = () => {
  return (
    <div style={errorDivStyle}>
      Something goes wrong. Please try again later.
      <br />
      <Link to={`/`} style={errorLinkStyle}>Return to the main page</Link>
    </div>
  );
};

export default ErrorPage;
