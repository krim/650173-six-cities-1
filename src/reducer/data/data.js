import camelcaseKeys from 'camelcase-keys';

const initialState = {
  apartments: [],
  city: {},
  isAuthorizationRequired: true
};

const ActionType = {
  LOAD_APARTMENTS: `LOAD_APARTMENTS`,
  SWITCH_CITY: `SWITCH_CITY`
};

const ActionCreator = {
  switchCity: (city) => ({
    type: ActionType.SWITCH_CITY,
    payload: city
  }),
  loadApartments: (apartments) => ({
    type: ActionType.LOAD_APARTMENTS,
    payload: apartments
  }),
  requireAuthorization: (isAuthorizationRequired) => ({
    type: ActionType.LOAD_APARTMENTS,
    payload: isAuthorizationRequired
  })
};

const Operation = {
  switchCity: (city) => (dispatch) => {
    dispatch(ActionCreator.switchCity(city));
  },
  loadApartments: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const data = camelcaseKeys(response.data);
        dispatch(ActionCreator.loadApartments(data));
      }).
      catch((_error) => {});
  },
  requireAuthorization: (isAuthorizationRequired) => (dispatch) => {
    dispatch(ActionCreator.requireAuthorization(isAuthorizationRequired));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SWITCH_CITY: return {...state, city: action.payload};
    case ActionType.LOAD_APARTMENTS: return {...state, apartments: action.payload};
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
