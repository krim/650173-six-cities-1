import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import {getApartmentById} from '../../reducer/data/selectors';

const withApartment = (WrappedComponent) => {
  class WithApartment extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {apartment} = this.props;
      const isApartmentExist = apartment && Object.keys(apartment).length > 0;

      if (!isApartmentExist) {
        return <></>;
      }

      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }

  WithApartment.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }),
    apartment: apartmentProps
  };

  return WithApartment;
};

const mapStateToProps = (state, props) => ({
  apartment: getApartmentById(state, props.match.params)
});

const composedWithApartment = compose(
    connect(mapStateToProps, null),
    withApartment
);

export {withApartment};
export default composedWithApartment;
