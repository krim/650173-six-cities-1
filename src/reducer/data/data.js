import camelcaseKeys from 'camelcase-keys';

const initialState = {
  apartments: [],
  apartment: {},
  favorites: [],
  city: {},
  reviews: [],
  activeSort: `Popular`,
  error: null
};

const ActionType = {
  LOAD_APARTMENTS: `LOAD_APARTMENTS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  SWITCH_CITY: `SWITCH_CITY`,
  SET_APARTMENT: `SET_APARTMENT`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`,
  REMOVE_FROM_FAVORITES: `REMOVE_FROM_FAVORITES`,
  SWITCH_SORT: `SWITCH_SORT`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  SET_ERROR: `SET_ERROR`
};

const ActionCreator = {
  setApartment: (apartment) => ({
    type: ActionType.SET_APARTMENT,
    payload: apartment
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
  switchCity: (city) => ({
    type: ActionType.SWITCH_CITY,
    payload: city
  }),
  switchSort: (data) => ({
    type: ActionType.SWITCH_SORT,
    payload: data
  }),
  loadApartments: (apartments) => ({
    type: ActionType.LOAD_APARTMENTS,
    payload: apartments
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),
  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: reviews
  }),
  loadFavorites: (favorites) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: favorites
  }),
  addToFavorites: (data) => ({
    type: ActionType.ADD_TO_FAVORITES,
    payload: data
  }),
  removeFromFavorites: (data) => ({
    type: ActionType.REMOVE_FROM_FAVORITES,
    payload: data
  })
};

const prepareReviews = (reviewsData) => {
  const reviews = camelcaseKeys(reviewsData, {deep: true});
  return reviews.map((review) => {
    return {...review, date: Date.parse(review.date)};
  });
};

const Operation = {
  setApartment: (apartment) => (dispatch) => {
    dispatch(ActionCreator.setApartment(apartment));
  },
  setError: (apartment) => (dispatch) => {
    dispatch(ActionCreator.setError(apartment));
  },
  switchCity: (city) => (dispatch) => {
    dispatch(ActionCreator.switchCity(city));
  },
  switchSort: (city) => (dispatch) => {
    dispatch(ActionCreator.switchSort(city));
  },
  loadApartments: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const apartmentsData = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.loadApartments(apartmentsData));
      }).
      catch((_error) => {});
  },
  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const preparedReviews = prepareReviews(response.data);
        dispatch(ActionCreator.loadReviews(preparedReviews));
      }).
      catch((_error) => {});
  },
  postReview: (reviewData, apartmentId) => (dispatch, _getState, api) => {
    return api.post(`/comments/${apartmentId}`, reviewData)
      .then((response) => {
        const preparedReviews = prepareReviews(response.data);
        dispatch(ActionCreator.postReview(preparedReviews));
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const favoritesData = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.loadFavorites(favoritesData));
      }).
      catch((_error) => {});
  },
  addToFavorites: (apartmentId) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${apartmentId}/1`)
      .then((response) => {
        const userData = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.addToFavorites(userData));
      }).
      catch((_error) => {});
  },
  removeFromFavorites: (apartmentId) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${apartmentId}/0`)
      .then((response) => {
        const userData = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.removeFromFavorites(userData));
      }).
      catch((_error) => {});
  }
};

const replaceApartment = (state, newApartment) => {
  return state.apartments.map((apartment) => {
    return apartment.id === newApartment.id ? newApartment : apartment;
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SWITCH_CITY: return {...state, city: action.payload};
    case ActionType.SWITCH_SORT: return {...state, activeSort: action.payload};
    case ActionType.LOAD_APARTMENTS: return {...state, apartments: action.payload};
    case ActionType.LOAD_REVIEWS: return {...state, reviews: action.payload};
    case ActionType.POST_REVIEW: return {...state, reviews: action.payload};
    case ActionType.SET_APARTMENT: return {...state, apartment: action.payload};
    case ActionType.SET_ERROR: return {...state, error: action.payload};
    case ActionType.LOAD_FAVORITES: return {...state, favorites: action.payload};
    case ActionType.ADD_TO_FAVORITES:
      return {...state, apartments: replaceApartment(state, action.payload)};
    case ActionType.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        apartments: replaceApartment(state, action.payload),
        favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id)
      };
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
