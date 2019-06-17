import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
  return (
    <div style={{color: `#FF0000`, marginBottom: `1em`}}>
      {props.message}
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
