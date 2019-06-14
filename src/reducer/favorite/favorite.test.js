import {ActionType, Operation} from './favorite';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import apartment from '../../__fixtures__/apartment';

const favorites = [apartment];

describe(`Operation`, () => {
  describe(`loadFavorites`, () => {
    it(`loads favorites`, () => {
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
            payload: favorites,
          });
        });
    });
  });
});
