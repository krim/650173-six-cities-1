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
        disableActive={disableActive}
        key={`apartment-${apartment.id}`}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    rating: range(0, 100).isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }),
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired
    }),
  }),
  setActive: PropTypes.func.isRequired,
  disableActive: PropTypes.func.isRequired
};

export {ApartmentList};
export default withActiveItem(ApartmentList);
