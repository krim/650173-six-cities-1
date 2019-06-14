import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import history from '../../history';
import Apartment from '../apartment/apartment.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class ApartmentList extends PureComponent {
  render() {
    const {apartments, onImageClick, className} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        className={className}
        apartment={apartment}
        onClick={(event) => {
          event.preventDefault();
          history.push(`/offer/${apartment.id}`);
        }}
        onImageClick={(event) => {
          event.preventDefault();
          onImageClick(apartment);
        }}
        key={`apartment-${apartment.id}`}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeItem: apartmentProps,
  onImageClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
