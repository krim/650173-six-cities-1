import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;
const MAX_CITIES_COUNT = 6;
const MAX_REVIEWS_COUNT = 10;
const MAX_NEAR_APARTMENTS_COUNT = 3;

const prepareFavorites = (favorites) => {
  return favorites.reduce((result, apartment) => {
    const foundObject = result.find((res) => res.city === apartment.city.name);

    if (foundObject) {
      foundObject.apartments.push(apartment);
    } else {
      result.push({city: apartment.city.name, apartments: [apartment]});
    }

    return result;
  }, []);
};

export const getApartments = (state) => state[NAME_SPACE].apartments;
export const getActiveApartment = (state) => state[NAME_SPACE].apartment;
export const getReviews = (state) => state[NAME_SPACE].reviews;
export const getFavorites = (state) => prepareFavorites(state[NAME_SPACE].favorites);
export const getCity = (state) => state[NAME_SPACE].city;
export const getActiveSort = (state) => state[NAME_SPACE].activeSort;
export const getApartmentId = (_, props) => parseInt(props.id, 10);

export const getSortedReviews = createSelector(
    getReviews,
    (reviews) => reviews
      .sort((first, second) => first.date < second.date ? 1 : -1)
      .slice(0, MAX_REVIEWS_COUNT)
);

export const getApartmentById = createSelector(
    getApartments,
    getApartmentId,
    (apartments, id) => apartments.find((apartment) => apartment.id === id)
);

export const getNearApartments = createSelector(
    getApartments,
    getApartmentById,
    (apartments, currentApartment) => apartments
      .filter((apartment) => {
        return apartment.city.name === currentApartment.city.name && apartment.id !== currentApartment.id;
      })
      .slice(0, MAX_NEAR_APARTMENTS_COUNT)
);

export const getCities = createSelector(
    getApartments,
    (apartments) => apartments
      .map(({city}) => city)
      .filter((city, index, cities) => {
        return cities.findIndex((value) => value.name === city.name) === index;
      })
      .slice(0, MAX_CITIES_COUNT)
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
