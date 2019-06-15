import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Operation} from '../../reducer/data/data';
import {Operation as UserOperation} from '../../reducer/user/user';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import FavoriteList from '../favorite-list/favorite-list.jsx';
import ApartmentPage from '../apartment-page/apartment-page.jsx';
import {getCities, getCity, getCityApartments, getActiveApartment} from '../../reducer/data/selectors';
import {getUser} from '../../reducer/user/selectors';
import {apartmentProps, mapSettingsProps, userProps, cityProps} from '../../props';

class App extends Component {
  componentDidMount() {
    this.props.checkAuthorization();
  }

  componentDidUpdate(prevProps) {
    const {city, cities, switchCity} = this.props;
    const shouldSwitchToDefaultCity = cities.length > 0 && Object.keys(city).length === 0;

    if (prevProps.city.name !== city.name) {
      switchCity(city);
    }

    if (shouldSwitchToDefaultCity) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      switchCity(randomCity);
    }
  }

  render() {
    const {
      mapSettings,
      apartments,
      city,
      cities,
      user,
      switchCity,
      setApartment,
      activeApartment
    } = this.props;
    const isCityExist = Object.keys(city).length > 0;
    const isUserExist = Object.keys(user).length > 0;

    const Main = () => {
      if (apartments.length > 0 && isCityExist) {
        return <MainPage
          user={user}
          cities={cities}
          city={city}
          apartments={apartments}
          switchCity={switchCity}
          setApartment={setApartment}
          activeApartment={activeApartment}
          mapSettings={mapSettings}
        />;
      } else {
        return <React.Fragment />;
      }
    };

    return <React.Fragment>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" render={() => {
          if (isUserExist) {
            return <Redirect to="/" />;
          }

          return <SignIn />;
        }} />
        <Route path="/favorites" render={() => {
          return <FavoriteList user={user} />;
        }} />
        <Route path="/offer/:id" render={(props) => {
          return <ApartmentPage
            {...props}
            user={user}
            mapSettings={mapSettings}
            isUserAuthorized={isUserExist}
          />;
        }} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>;
  }
}

App.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  activeApartment: PropTypes.oneOfType([
    apartmentProps,
    PropTypes.any
  ]),
  mapSettings: mapSettingsProps,
  cities: PropTypes.arrayOf(cityProps).isRequired,
  city: cityProps,
  user: userProps,
  loadApartments: PropTypes.func.isRequired,
  switchCity: PropTypes.func.isRequired,
  setApartment: PropTypes.func.isRequired,
  checkAuthorization: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    cities: getCities(state),
    city: getCity(state),
    apartments: getCityApartments(state),
    activeApartment: getActiveApartment(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkAuthorization: () => dispatch(UserOperation.checkAuthorization()),
  loadApartments: () => dispatch(Operation.loadApartments()),
  switchCity: (city) => dispatch(Operation.switchCity(city)),
  setApartment: (apartment) => dispatch(Operation.setApartment(apartment))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
