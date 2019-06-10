import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import history from '../../history';
import Apartment from '../apartment/apartment.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withFavorite from '../../hocs/with-favorite/with-favorite';

class ApartmentList extends PureComponent {
  render() {
    const {apartments, onMouseOver, onMouseOut, onBookmarkClick} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        onClick={(event) => {
          event.preventDefault();
          history.push(`/offer/${apartment.id}`);
        }}
        onBookmarkClick={() => onBookmarkClick(apartment)}
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
  onMouseOut: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired
};

export {ApartmentList};
export default withFavorite(withActiveItem(ApartmentList));
