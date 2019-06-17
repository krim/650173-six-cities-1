import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import {ReviewList} from './review-list';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';
import NameSpace from '../../reducer/name-spaces';

const reviews = [review];
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
initialState[NameSpace.DATA] = {error: null};
const store = mockStore(initialState);

describe(`ReviewList`, () => {
  describe(`when user is authorized`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <ReviewList
              apartmentId={apartment.id}
              reviews={reviews}
              loadReviews={jest.fn()}
              isUserAuthorized={true}
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when user is not authorized`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <ReviewList
              apartmentId={apartment.id}
              reviews={reviews}
              loadReviews={jest.fn()}
              isUserAuthorized={false}
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
