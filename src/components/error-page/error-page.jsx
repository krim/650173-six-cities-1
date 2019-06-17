import React from 'react';

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
      <a href={`/`} style={errorLinkStyle}>Return to the main page</a>
    </div>
  );
};

export default ErrorPage;
