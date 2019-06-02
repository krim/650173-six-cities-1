import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;
const MAX_CITIES_COUNT = 6;

export const getApartments = (state) => state[NAME_SPACE].apartments;

export const getCity = (state) => state[NAME_SPACE].city;

export const getAuthorizationRequired = (state) => state[NAME_SPACE].isAuthorizationRequired;

export const getCities = createSelector(
    getApartments,
    (apartments) => apartments
      .map(({city}) => city)
      .filter((city, index, cities) => {
        return cities.findIndex((value) => value.name === city.name) === index;
      }).slice(0, MAX_CITIES_COUNT)
);

export const getCityApartments = createSelector(
    getApartments,
    getCity,
    (apartments, city) => apartments.filter((apartment) => apartment.city.name === city.name)
);
