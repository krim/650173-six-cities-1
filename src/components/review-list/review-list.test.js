import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import {ReviewList} from './review-list';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';

const reviews = [review];
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe(`ReviewList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <ReviewList
            apartmentId={apartment.id}
            reviews={reviews}
            loadReviews={jest.fn()}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
