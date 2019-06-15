import React from 'react';
import PropTypes from 'prop-types';

import City from '../city/city.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {cityProps} from '../../props';

const CityList = (props) => {
  const {cities, activeItem, onClick} = props;

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
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(cityProps).isRequired,
  activeItem: cityProps,
  onClick: PropTypes.func.isRequired
};

export {CityList};
export default withActiveItem(CityList);
