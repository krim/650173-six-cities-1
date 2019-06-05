import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Operation} from '../../reducer/data/data';
import Header from '../header/header.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sing-in/sing-in.jsx';
import {getCities, getCity, getCityApartments} from '../../reducer/data/selectors';
import {getUser} from '../../reducer/user/selectors';
import {apartmentProps, mapSettingsProps, userProps, cityProps} from '../../props';

class App extends Component {
  componentDidUpdate(prevProps) {
    const {city, cities, switchCity} = this.props;
    const shouldSwitchToDefaultCity = cities.length > 0 && Object.keys(city).length === 0;

    if (prevProps.city.name !== city.name) {
      switchCity(city);
    }

    if (shouldSwitchToDefaultCity) {
      switchCity(cities[0]);
    }
  }

  render() {
    const {
      mapSettings,
      apartments,
      city,
      cities,
      user,
      switchCity
    } = this.props;
    const isCityExist = Object.keys(city).length > 0;

    const Main = () => {
      return isCityExist && apartments.length > 0 &&
        <MainPage
          cities={cities}
          city={city}
          apartments={apartments}
          switchCity={switchCity}
          mapSettings={mapSettings}
        />;
    };

    return <>
      <Header user={user}/>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" component={SignIn} />
        <Redirect to="/" />
      </Switch>
    </>;
  }
}

App.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  mapSettings: mapSettingsProps,
  cities: PropTypes.arrayOf(cityProps).isRequired,
  city: cityProps,
  user: userProps,
  loadApartments: PropTypes.func.isRequired,
  switchCity: PropTypes.func.isRequired
};

export {App};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    cities: getCities(state),
    city: getCity(state),
    apartments: getCityApartments(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadApartments: () => dispatch(Operation.loadApartments()),
  switchCity: (city) => dispatch(Operation.switchCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
