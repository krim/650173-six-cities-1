import camelcaseKeys from 'camelcase-keys';

const initialState = {
  favorites: []
};

const ActionType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`
};

const ActionCreator = {
  loadFavorites: (data) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: data
  }),
};

const Operation = {
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const favoritesData = camelcaseKeys(response.data);
        dispatch(ActionCreator.loadFavorites(favoritesData));
      }).
      catch((_error) => {});
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES: return {...state, favorites: action.payload};
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
