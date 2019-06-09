import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Operation} from '../../reducer/data/data';
import {Operation as UserOperation} from '../../reducer/user/user';
import Header from '../header/header.jsx';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sing-in/sing-in.jsx';
import FavoriteList from '../favorite-list/favorite-list.jsx';
import ApartmentPage from '../apartment-page/apartment-page.jsx';
import {getCities, getCity, getCityApartments} from '../../reducer/data/selectors';
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

    return <React.Fragment>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            ></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            ></path>
          </symbol>
        </svg>
      </div>
      <Header user={user}/>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" render={() => {
          if (Object.keys(this.props.user).length > 0) {
            return <Redirect to="/" />;
          }

          return <SignIn />;
        }} />
        <Route path="/favorites" component={FavoriteList} />
        <Route path="/offer/:id" render={(props) => {
          return <ApartmentPage {...props} mapSettings={mapSettings} />;
        }} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>;
  }
}

App.propTypes = {
  apartments: PropTypes.arrayOf(apartmentProps).isRequired,
  mapSettings: mapSettingsProps,
  cities: PropTypes.arrayOf(cityProps).isRequired,
  city: cityProps,
  user: userProps,
  loadApartments: PropTypes.func.isRequired,
  switchCity: PropTypes.func.isRequired,
  checkAuthorization: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    cities: getCities(state),
    city: getCity(state),
    apartments: getCityApartments(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkAuthorization: () => dispatch(UserOperation.checkAuthorization()),
  loadApartments: () => dispatch(Operation.loadApartments()),
  switchCity: (city) => dispatch(Operation.switchCity(city))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
