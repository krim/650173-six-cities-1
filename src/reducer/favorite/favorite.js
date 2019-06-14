import camelcaseKeys from 'camelcase-keys';
import apartment from "../../__fixtures__/apartment";

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
  })
};

const prepareFavorites = (favorites) => {
  const favoritesData = camelcaseKeys(favorites, {deep: true});

  return favoritesData.reduce((result, a) => {
    const foundObject = result.find((res) => res.city === a.city.name);
    if (foundObject) {
      foundObject.apartments.push(a);
    } else {
      result.push({city: a.city.name, apartments: [a] })
    }

    return result;
  }, []);
};

const Operation = {
  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const favoritesData = prepareFavorites(response.data);
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
