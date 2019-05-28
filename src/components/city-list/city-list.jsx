import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import City from '../city/city.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class CityList extends PureComponent {
  render() {
    const {cities, activeItem, onClick} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              cities.map((city) => {
                return <City
                  key={city.name}
                  name={city.name}
                  onClick={() => onClick(city)}
                  active={activeItem.name === city.name}
                />;
              })
            }
          </ul>
        </section>
      </div>
    );
  }
}

CityList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    })
  }),
  onClick: PropTypes.func.isRequired
};

export {CityList};
export default withActiveItem(CityList);
