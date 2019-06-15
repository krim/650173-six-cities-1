import Map from '../map/map.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import CityList from '../city-list/city-list.jsx';

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {userProps, cityProps, apartmentProps, mapSettingsProps} from '../../props';
import SortVariants from '../sort-variants/sort-variants.jsx';
import MainPageEmpty from '../main-page-empty/main-page-empty.jsx';
import Header from '../header/header.jsx';

class MainPage extends PureComponent {
  render() {
    const {cities, city, switchCity, apartments, user} = this.props;

    return (
      <div className="page page--gray page--main">
        <Header user={user} />
        <main className={`page__main page__main--index${this._getMainPageClass()}`}>
          <h1 className="visually-hidden">Cities</h1>
          <CityList cities={cities} activeItem={city} switchCity={switchCity} />
          { apartments.length === 0 ? <MainPageEmpty /> : this._renderMainFull() }
        </main>
      </div>
    );
  }

  _renderMainFull() {
    const {
      city,
      setApartment,
      apartments,
      mapSettings,
      activeApartment
    } = this.props;

    return (
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{apartments.length} places to stay in {city.name}</b>
            <SortVariants />
            <div className="cities__places-list places__list tabs__content">
              <ApartmentList
                apartments={apartments}
                setApartment={setApartment}
                onImageClick={() => {}}
                className={`cities`}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              apartments={apartments}
              activeApartment={activeApartment}
              mapSettings={
                {...mapSettings, location: city.location}
              }
              pageType={`cities`}
            />
          </div>
        </div>
      </div>
    );
  }

  _getMainPageClass() {
    return this.props.apartments.length === 0 ? ` page__main--index-empty` : ``;
  }
}

MainPage.propTypes = {
  user: userProps,
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeApartment: PropTypes.oneOfType([
    apartmentProps,
    PropTypes.any
  ]),
  mapSettings: mapSettingsProps,
  cities: PropTypes.arrayOf(cityProps).isRequired,
  city: cityProps,
  switchCity: PropTypes.func.isRequired,
  setApartment: PropTypes.func.isRequired
};

export default MainPage;
