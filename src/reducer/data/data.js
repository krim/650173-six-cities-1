import camelcaseKeys from 'camelcase-keys';

const initialState = {
  apartments: [],
  city: {}
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
  })
};

const Operation = {
  switchCity: (city) => (dispatch) => {
    dispatch(ActionCreator.switchCity(city));
  },
  loadApartments: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const data = camelcaseKeys(response.data, {deep: true});
        dispatch(ActionCreator.loadApartments(data));
      }).
      catch((_error) => {});
  }
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
