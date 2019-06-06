import {
  ActionType,
  Operation
} from './user';

describe(`Operation`, () => {
  describe(`authorize`, () => {
    xit(`authorizes a user`, () => {
      const dispatch = jest.fn();
      Operation.authorize()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZATION,
        payload: true
      });
    });
  });
});
