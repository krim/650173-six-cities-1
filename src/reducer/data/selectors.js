import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;
const MAX_CITIES_COUNT = 6;

export const getApartments = (state) => state[NAME_SPACE].apartments;
export const getActiveApartment = (state) => state[NAME_SPACE].apartment;
export const getReviews = (state) => state[NAME_SPACE].reviews;
export const getCity = (state) => state[NAME_SPACE].city;
export const getActiveSort = (state) => state[NAME_SPACE].activeSort;
export const getApartmentId = (_, props) => parseInt(props.id, 10);

export const getApartmentById = createSelector(
    getApartments,
    getApartmentId,
    (apartments, id) => apartments.find((apartment) => apartment.id === id)
);

export const getNearApartments = createSelector(
    getApartments,
    getApartmentId,
    getCity,
    (apartments, apartmentId, city) => apartments.filter((apartment) => {
      return apartment.city.name === city.name && apartment.id !== apartmentId;
    })
);

export const getCities = createSelector(
    getApartments,
    (apartments) => apartments
      .map(({city}) => city)
      .filter((city, index, cities) => {
        return cities.findIndex((value) => value.name === city.name) === index;
      }).slice(0, MAX_CITIES_COUNT)
);

export const getApartmentsByPrice = (apartments, direction) => {
  return apartments.sort((first, second) => {
    if (direction === `asc`) {
      return (first.price > second.price) ? 1 : -1;
    } else {
      return (first.price < second.price) ? 1 : -1;
    }
  });
};

export const getApartmentsByRating = (apartments) => apartments.sort((first, second) => {
  return (first.rating < second.rating) ? 1 : -1;
});

export const getCityApartments = createSelector(
    getApartments,
    getCity,
    getActiveSort,
    (apartments, city, activeSort) => {
      const cityApartments = apartments.filter((apartment) => apartment.city.name === city.name);
      switch (activeSort) {
        case `Price: low to high`: return getApartmentsByPrice(cityApartments, `asc`);
        case `Price: high to low`: return getApartmentsByPrice(cityApartments, `desc`);
        case `Top rated first`: return getApartmentsByRating(cityApartments);
        default: return cityApartments;
      }
    }
);
