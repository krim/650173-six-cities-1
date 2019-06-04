import {
  ActionType,
  Operation
} from './user';

describe(`Operation`, () => {
  describe(`requireAuthorization`, () => {
    it(`requires authorization`, () => {
      const dispatch = jest.fn();
      Operation.requireAuthorization(true)(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: true
      });
    });
  });
});
