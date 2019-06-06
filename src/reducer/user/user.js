import camelcaseKeys from 'camelcase-keys';

const initialState = {
  user: {}
};

const ActionType = {
  AUTHORIZATION: `AUTHORIZATION`
};

const ActionCreator = {
  authorize: (data) => ({
    type: ActionType.AUTHORIZATION,
    payload: data
  })
};

const Operation = {
  authorize: (data, ownProps) => (dispatch, _getState, api) => {
    return api.post(`/login`, data)
      .then((response) => {
        const userData = camelcaseKeys(response.data);
        dispatch(ActionCreator.authorize(userData));
        ownProps.history.push(`/`);
      }).
      catch((_error) => {});
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZATION: return {...state, user: action.payload};
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
