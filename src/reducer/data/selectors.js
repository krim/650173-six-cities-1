import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;
const MAX_CITIES_COUNT = 6;
const MAX_NEAR_APARTMENTS_COUNT = 3;

export const getApartments = (state) => state[NAME_SPACE].apartments;
export const getCity = (state) => state[NAME_SPACE].city;
export const getApartmentId = (state) => state[NAME_SPACE].apartmentId;

export const getApartmentById = createSelector(
    getApartments,
    getApartmentId,
    (apartments, id) => apartments.find((apartment) => apartment.id === id)
);

export const getNearApartmentsById = createSelector(
    getApartments,
    getApartmentId,
    getCity,
    (apartments, apartmentId, city) => apartments.filter((apartment) => {
      return apartment.city.id === city.id && apartment.id !== apartmentId;
    }).slice(0, MAX_NEAR_APARTMENTS_COUNT)
);

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
