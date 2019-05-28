import {
  ActionType,
  Operation
} from './data';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import apartment from '../../__fixtures__/apartment';

const apartments = [apartment];

describe(`Operation`, () => {
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

  describe(`loadApartments`, () => {
    it(`loads apartments`, () => {
      const dispatch = jest.fn();
      const api = createAPI(dispatch);
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
            payload: apartments,
          });
        });
    });
  });
});
