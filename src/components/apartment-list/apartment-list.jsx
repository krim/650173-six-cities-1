import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Apartment from '../apartment/apartment.jsx';
import {range} from 'react-range-proptypes';

class ApartmentList extends PureComponent {
  render() {
    const {apartments} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        onClick={() => {}}
        mouseOver={this._mouseOver(apartment)}
        mouseOut={this._mouseOut()}
        key={apartment.title}
      />;
    });
  }

  _mouseOver(apartment) {
    return () => this.setState({activeItem: apartment});
  }

  _mouseOut() {
    return () => this.setState({activeItem: undefined});
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
};

export default ApartmentList;
