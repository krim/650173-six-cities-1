import {ActionType, Operation} from './user';
import MockAdapter from 'axios-mock-adapter';
import camelcaseKeys from 'camelcase-keys';
import api from '../../api';

const userResponse = {
  "id": 1,
  "name": `user name`,
  "email": `example@email.comu`,
  "avatar_url": `user_url`,
  "is_pro": true
};

describe(`Operation.authorize`, () => {
  it(`authorizes a user`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const history = {push: jest.fn()};
    const userData = {email: `example@email.com`, password: `password`};
    const authorize = Operation.authorize(userData, {history});

    apiMock
      .onPost(`/login`, userData)
      .reply(200, JSON.stringify(userResponse));

    authorize(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.AUTHORIZATION,
          payload: camelcaseKeys(userResponse),
        });
      });
  });
});

describe(`Operation.checkAuthorization`, () => {
  it(`check user authorization status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authorize = Operation.checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(200, JSON.stringify(userResponse));

    authorize(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.AUTHORIZATION,
          payload: camelcaseKeys(userResponse),
        });
      });
  });
});
