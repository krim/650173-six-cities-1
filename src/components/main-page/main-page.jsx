import Map from '../map/map.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import CityList from '../city-list/city-list.jsx';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {cityProps, apartmentProps, mapSettingsProps} from '../../props';
import SortVariants from '../sort-variants/sort-variants.jsx';

class MainPage extends PureComponent {
  render() {
    const {cities, city, switchCity, apartments, mapSettings} = this.props;

    return (
      <React.Fragment>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CityList cities={cities} activeItem={city} switchCity={switchCity}/>
          <div className="cities__places-wrapper">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{apartments.length} places to stay in {city.name}</b>
                <SortVariants />
                <div className="cities__places-list places__list tabs__content">
                  <ApartmentList apartments={apartments} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  apartments={apartments}
                  mapSettings={
                    {...mapSettings, location: city.location}
                  }
                  pageType={`cities`}
                />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  mapSettings: mapSettingsProps,
  cities: PropTypes.arrayOf(cityProps).isRequired,
  city: cityProps,
  switchCity: PropTypes.func.isRequired
};

export default MainPage;
