import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewForm} from '../../components/review-form/review-form';
import {withPostReview} from './with-post-review';

describe(`withActiveItem`, () => {
  it(`renders component correctly`, () => {
    const WrappedReviewForm = withPostReview(ReviewForm);
    const tree = renderer.create(
        <WrappedReviewForm
          apartmentId={1}
          postReview={jest.fn()}
          setError={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

