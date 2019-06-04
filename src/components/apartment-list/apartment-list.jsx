import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {apartmentProps} from '../../props';

import Apartment from '../apartment/apartment.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class ApartmentList extends PureComponent {
  render() {
    const {apartments, setActive, disableActive} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        onClick={() => {}}
        setActive={() => setActive(apartment)}
        disableActive={disableActive}
        key={`apartment-${apartment.id}`}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeItem: apartmentProps,
  setActive: PropTypes.func.isRequired,
  disableActive: PropTypes.func.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
