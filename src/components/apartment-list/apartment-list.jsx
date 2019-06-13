import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import history from '../../history';
import Apartment from '../apartment/apartment.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class ApartmentList extends PureComponent {
  render() {
    const {apartments, onImageClick} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        onClick={(event) => {
          event.preventDefault();
          history.push(`/offer/${apartment.id}`);
        }}
        onImageClick={() => onImageClick(apartment)}
        key={`apartment-${apartment.id}`}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeItem: apartmentProps,
  onImageClick: PropTypes.func.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
