import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {apartmentProps} from '../../props';

import Apartment from '../apartment/apartment.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class ApartmentList extends PureComponent {
  render() {
    const {apartments, onMouseOver, onMouseOut} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        onClick={() => {}}
        onMouseOver={() => onMouseOver(apartment)}
        onMouseOut={onMouseOut}
        key={`apartment-${apartment.id}`}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeItem: apartmentProps,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
