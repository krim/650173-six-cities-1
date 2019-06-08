import camelcaseKeys from 'camelcase-keys';

const initialState = {
  apartments: [],
  apartmentId: -1,
  city: {},
  reviews: []
};

const ActionType = {
  LOAD_APARTMENTS: `LOAD_APARTMENTS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SWITCH_CITY: `SWITCH_CITY`,
  SET_APARTMENT_ID: `SET_APARTMENT_ID`
};

const ActionCreator = {
  switchCity: (city) => ({
    type: ActionType.SWITCH_CITY,
    payload: city
  }),
  setApartmentId: (id) => ({
    type: ActionType.SET_APARTMENT_ID,
    payload: id
  }),
  loadApartments: (apartments) => ({
    type: ActionType.LOAD_APARTMENTS,
    payload: apartments
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  })
};

const Operation = {
  switchCity: (city) => (dispatch) => {
    dispatch(ActionCreator.switchCity(city));
  },
  setApartmentId: (id) => (dispatch) => {
    dispatch(ActionCreator.setApartmentId(id));
  },
  loadApartments: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const data = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.loadApartments(data));
      }).
      catch((_error) => {});
  },
  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const data = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.loadReviews(data));
      }).
      catch((_error) => {});
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SWITCH_CITY: return {...state, city: action.payload};
    case ActionType.LOAD_APARTMENTS: return {...state, apartments: action.payload};
    case ActionType.LOAD_REVIEWS: return {...state, reviews: action.payload};
    case ActionType.SET_APARTMENT_ID: return {...state, apartmentId: action.payload};
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
