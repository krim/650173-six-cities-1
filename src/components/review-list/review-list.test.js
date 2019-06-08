import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewList} from './review-list';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';

const reviews = [review];

describe(`ReviewList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <ReviewList
          apartmentId={apartment.id}
          reviews={reviews}
          loadReviews={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
