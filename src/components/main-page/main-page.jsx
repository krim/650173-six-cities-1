import Map from '../map/map.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import CityList from '../city-list/city-list.jsx';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {cityProps, apartmentProps, mapSettingsProps} from '../../props';

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
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <ApartmentList apartments={apartments}/>
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  apartments={apartments}
                  mapSettings={
                    {...mapSettings, location: city.location}
                  }
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
