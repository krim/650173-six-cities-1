import camelcaseKeys from 'camelcase-keys';

const initialState = {
  user: {},
  isAuthorizationRequired: false
};

const ActionType = {
  AUTHORIZATION: `AUTHORIZATION`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  authorize: (data) => ({
    type: ActionType.AUTHORIZATION,
    payload: data
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status
  })
};

const Operation = {
  authorize: (data) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        const userData = camelcaseKeys(response.data);
        dispatch(ActionCreator.authorize(userData));
        dispatch(ActionCreator.requireAuthorization(false));
      }).
      catch((_error) => {});
  },
  requireAuthorization: (status) => (dispatch) => {
    dispatch(ActionCreator.requireAuthorization(status));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZATION: return {...state, user: action.payload};
    case ActionType.REQUIRE_AUTHORIZATION: return {...state, isAuthorizationRequired: action.payload};
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
