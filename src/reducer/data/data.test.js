import {ActionType, Operation} from './data';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';
import camelcaseKeys from "../user/user.test";

describe(`Operation`, () => {
  describe(`setApartment`, () => {
    it(`sets apartments`, () => {
      const dispatch = jest.fn();
      Operation.setApartment(apartment)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_APARTMENT,
        payload: apartment
      });
    });
  });

  describe(`switchCity`, () => {
    it(`switches the city to the new one`, () => {
      const dispatch = jest.fn();
      Operation.switchCity({name: `Amsterdam`})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SWITCH_CITY,
        payload: {name: `Amsterdam`}
      });
    });
  });

  describe(`switchSort`, () => {
    it(`switches the sort to the new one`, () => {
      const dispatch = jest.fn();
      Operation.switchSort(`test`)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SWITCH_SORT,
        payload: `test`
      });
    });
  });

  describe(`loadApartments`, () => {
    it(`loads apartments`, () => {
      const apartments = [apartment];
      const dispatch = jest.fn();
      const apiMock = new MockAdapter(api);
      const apartmentsLoader = Operation.loadApartments();

      apiMock
        .onGet(`/hotels`)
        .reply(200, JSON.stringify(apartments));

      apartmentsLoader(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_APARTMENTS,
            payload: apartments
          });
        });
    });
  });

  describe(`loadReviews`, () => {
    it(`loads reviews`, () => {
      const reviews = [review];
      const dispatch = jest.fn();
      const apiMock = new MockAdapter(api);
      const apartmentsLoader = Operation.loadReviews(apartment.id);

      apiMock
        .onGet(`/comments/${apartment.id}`)
        .reply(200, JSON.stringify(reviews));

      apartmentsLoader(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_REVIEWS,
            payload: reviews
          });
        });
    });
  });

  describe(`addToFavorites`, () => {
    it(`adds an apartment to favorites`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const addToFavoritesAction = Operation.addToFavorites(apartment.id);

      apiMock
        .onPost(`/favorite/${apartment.id}/1`)
        .reply(200, JSON.stringify(apartment));

      addToFavoritesAction(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.ADD_TO_FAVORITES,
            payload: camelcaseKeys(apartment),
          });
        });
    });
  });

  describe(`removeFromFavorites`, () => {
    it(`removes an apartment from favorites`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const removeFromFavoritesAction = Operation.removeFromFavorites(apartment.id);

      apiMock
        .onPost(`/favorite/${apartment.id}/0`)
        .reply(200, JSON.stringify(apartment));

      removeFromFavoritesAction(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REMOVE_FROM_FAVORITES,
            payload: camelcaseKeys(apartment),
          });
        });
    });
  });

  describe(`loadFavorites`, () => {
    it(`loads favorites`, () => {
      const favorites = [apartment];
      const dispatch = jest.fn();
      const apiMock = new MockAdapter(api);
      const favoritesLoader = Operation.loadFavorites();

      apiMock
        .onGet(`/favorite`)
        .reply(200, JSON.stringify(favorites));

      favoritesLoader(dispatch, jest.fn(), api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_FAVORITES,
            payload: favorites
          });
        });
    });
  });
});
