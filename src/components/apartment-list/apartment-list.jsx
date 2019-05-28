import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {range} from 'react-range-proptypes';

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
        disableActive={() => disableActive()}
        key={apartment.title}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    image: PropTypes.string.isRequired,
    rating: range(0, 100).isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.oneOf([`euro`, `usd`]).isRequired,
    priceText: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  setActive: PropTypes.func.isRequired,
  disableActive: PropTypes.func.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
