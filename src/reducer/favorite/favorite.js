import camelcaseKeys from 'camelcase-keys';

const initialState = {
  favorites: []
};

const ActionType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`,
  REMOVE_FROM_FAVORITES: `REMOVE_FROM_FAVORITES`
};

const ActionCreator = {
  loadFavorites: (data) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: data
  }),
  addToFavorites: (data) => ({
    type: ActionType.ADD_TO_FAVORITES,
    payload: data
  }),
  removeFromFavorites: (data) => ({
    type: ActionType.REMOVE_FROM_FAVORITES,
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
  },
  addToFavorites: (hotelId) => (dispatch, _getState, api) => {
    console.log(`addToFavorites`);
    return api.post(`/favorite/${hotelId}/1`)
      .then((response) => {
        const userData = camelcaseKeys(response.data);
        dispatch(ActionCreator.addToFavorites(userData));
      }).
      catch((_error) => {});
  },
  removeFromFavorites: (hotelId) => (dispatch, _getState, api) => {
    console.log(`removeFromFavorites`);
    return api.post(`/favorite/${hotelId}/0`)
      .then((response) => {
        const userData = camelcaseKeys(response.data);
        dispatch(ActionCreator.removeFromFavorites(userData));
      }).
      catch((_error) => {});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES: return {...state, favorites: action.payload};
    case ActionType.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.push(action.payload)
      };
    case ActionType.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite.id === action.payload.id)
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
