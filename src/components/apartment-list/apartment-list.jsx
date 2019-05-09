import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Apartment from '../apartment/apartment.jsx';

class ApartmentList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeApartment: undefined
    };
  }

  render() {
    const {apartments} = this.props;

    return apartments.map((apartment) => {
      return <Apartment
        apartment={apartment}
        apartmentNameClick={() => {}}
        apartmentMouserEnter={
          () => {
            this.setState({
              activeApartment: apartment
            });
          }
        }
        apartmentMouserOver={
          () => {
            this.setState({
              activeApartment: undefined
            });
          }
        }
        key={apartment.title}
      />;
    });
  }
}

ApartmentList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ApartmentList;
